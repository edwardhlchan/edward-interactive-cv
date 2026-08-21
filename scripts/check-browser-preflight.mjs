import { approvedEvidenceManifest, approvedRenderedLinks } from "./approved-evidence-manifest.mjs";

const candidates = ["playwright", "playwright-core", "@playwright/test"];
let browserModule;
for (const candidate of candidates) {
  try {
    browserModule = await import(candidate);
    break;
  } catch {
    // Browser automation is intentionally optional for this repository.
  }
}

if (!browserModule) {
  console.error(
    "Browser preflight not run: no Playwright package is installed. Install an authorized browser test dependency before using this opt-in check.",
  );
  process.exit(2);
}

const browser = await browserModule.chromium.launch({ headless: true });
try {
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  const baseUrl = process.argv[2] ?? "http://localhost:5173";
  
  // Test CV route (/)
  const response = await page.goto(baseUrl, { waitUntil: "networkidle" });
  if (!response || response.status() < 200 || response.status() >= 300) {
    throw new Error(`Browser app unavailable or invalid HTTP status: ${response?.status() ?? "no response"}`);
  }

  const rendered = await page.locator("body").innerText();
  const hrefs = await page.locator("a").evaluateAll((links) => links.map((link) => ({
    text: link.textContent?.replace(/↗/g, "").trim() ?? "",
    href: link.getAttribute("href"),
  })));
  for (const value of Object.values(approvedEvidenceManifest.identity)) {
    if (!rendered.includes(value)) throw new Error(`CV route is missing approved content: ${value}`);
  }
  if (/\uFFFD/.test(rendered) || /linkedinhttps|githubgithub|JavaScriptFull-Stack/.test(rendered)) {
    throw new Error("Rendered page contains replacement or concatenated labels");
  }
  for (const expected of approvedRenderedLinks) {
    const actual = hrefs.find((link) => link.text === expected.label);
    if (!actual || actual.href !== expected.href) {
      throw new Error(`Rendered ${expected.label} link does not match the approved evidence manifest`);
    }
  }
  for (const unavailable of approvedEvidenceManifest.unavailableProjectLabels) {
    const actual = hrefs.find((link) => link.text === unavailable);
    if (actual?.href) throw new Error(`${unavailable} must not render as a live link`);
  }

  const layout = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    clientWidth: document.documentElement.clientWidth,
    scrollHeight: document.documentElement.scrollHeight,
    clientHeight: document.documentElement.clientHeight,
  }));
  if (layout.scrollWidth > layout.clientWidth + 1) throw new Error("Rendered page has horizontal overflow");
  if (layout.scrollHeight < layout.clientHeight) throw new Error("Rendered page has invalid vertical dimensions");

  await page.emulateMedia({ media: "print" });
  const printState = await page.evaluate(() => {
    const hidden = [".site-chrome", ".navigation-rail", ".top-actions", ".terminal-panel", ".skip-link", ".cv-footer"];
    const visibleContent = [".cv-header", "main", ".cv-header__contact"];
    return {
      hidden: hidden.map((selector) => {
        const el = document.querySelector(selector);
        return [selector, el ? getComputedStyle(el).display : 'element-not-found'];
      }),
      visible: visibleContent.map((selector) => {
        const el = document.querySelector(selector);
        return [selector, el ? getComputedStyle(el).display : 'element-not-found'];
      }),
      pageWidth: document.documentElement.scrollWidth,
      bodyWidth: document.body.scrollWidth,
    };
  });
  for (const [selector, display] of printState.hidden) {
    if (display !== "none" && display !== "element-not-found") {
      throw new Error(`${selector} is not hidden in print mode (display: ${display})`);
    }
  }
  for (const [selector, display] of printState.visible) {
    if (display === "none") throw new Error(`${selector} is hidden in print mode`);
    if (display === "element-not-found") throw new Error(`${selector} not found in DOM`);
  }
  if (printState.bodyWidth > printState.pageWidth + 1) throw new Error("Print layout overflows horizontally");

  // Test Demo route (/demo)
  const demoResponse = await page.goto(`${baseUrl}/demo`, { waitUntil: "networkidle" });
  if (!demoResponse || demoResponse.status() < 200 || demoResponse.status() >= 300) {
    throw new Error(`Demo route unavailable or invalid HTTP status: ${demoResponse?.status() ?? "no response"}`);
  }
  const demoRendered = await page.locator("body").innerText();
  if (!demoRendered.includes("Interactive Demo")) {
    throw new Error("Demo route is missing 'Interactive Demo' heading");
  }
  const terminal = await page.locator('.terminal-panel').count();
  if (terminal === 0) {
    throw new Error("Demo route is missing terminal panel");
  }
  const backLink = await page.locator('a[href="/"]').count();
  if (backLink === 0) {
    throw new Error("Demo route is missing 'Back to CV' link");
  }

  // Test unknown route (should render NotFound)
  const unknownResponse = await page.goto(`${baseUrl}/unknown-route-test`, { waitUntil: "networkidle" });
  if (!unknownResponse || unknownResponse.status() < 200 || unknownResponse.status() >= 300) {
    throw new Error(`Unknown route handling failed: ${unknownResponse?.status() ?? "no response"}`);
  }
  const unknownRendered = await page.locator("body").innerText();
  if (!unknownRendered.includes("Page Not Found")) {
    throw new Error("Unknown route does not render NotFound component");
  }

  console.log(`browser preflight passed for ${baseUrl}; print DOM checks passed; route validation passed (/, /demo, unknown route)`);
} finally {
  await browser.close();
}
