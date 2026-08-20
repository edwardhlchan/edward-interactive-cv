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
    if (!rendered.includes(value)) throw new Error(`Rendered page is missing approved content: ${value}`);
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
    const hidden = [".site-chrome", ".navigation-rail", ".top-actions", ".terminal-panel", ".skip-link"];
    const visibleContent = [".profile-header", "main", ".contact-links"];
    return {
      hidden: hidden.map((selector) => [selector, getComputedStyle(document.querySelector(selector)).display]),
      visible: visibleContent.map((selector) => [selector, getComputedStyle(document.querySelector(selector)).display]),
      pageWidth: document.documentElement.scrollWidth,
      bodyWidth: document.body.scrollWidth,
    };
  });
  for (const [selector, display] of printState.hidden) if (display !== "none") throw new Error(`${selector} is not hidden in print mode`);
  for (const [selector, display] of printState.visible) if (display === "none") throw new Error(`${selector} is hidden in print mode`);
  if (printState.bodyWidth > printState.pageWidth + 1) throw new Error("Print layout overflows horizontally");

  console.log(`browser preflight passed for ${baseUrl}; print DOM checks passed (PDF bytes remain manual) `);
} finally {
  await browser.close();
}
