import fs from "node:fs";

const packageJson = JSON.parse(fs.readFileSync("package.json", "utf8"));
const viteConfig = fs.readFileSync("vite.config.ts", "utf8");
const wranglerConfig = fs.readFileSync("wrangler.toml", "utf8");
const workerSource = fs.readFileSync("worker/index.ts", "utf8");

const failures = [];

if (packageJson.scripts.build !== "tsc --noEmit && vite build") {
  failures.push("package.json build script must type-check and build the Vite app");
}
if (packageJson.scripts["check:content"] !== "node scripts/verify-content.mjs") {
  failures.push("package.json must expose check:content for static profile data verification");
}
if (packageJson.scripts["check:css"] !== "node scripts/check-css-contract.mjs") {
  failures.push("package.json must expose check:css for print stylesheet contract verification");
}
if (packageJson.scripts["check:config"] !== "node scripts/check-config-contract.mjs") {
  failures.push("package.json must expose check:config for Vite/Workers configuration contract verification");
}
if (packageJson.scripts["check:routes"] !== "node scripts/check-routes.mjs") {
  failures.push("package.json must expose check:routes for live route verification");
}
if (packageJson.scripts["check:browser"] !== "node scripts/check-browser-preflight.mjs") {
  failures.push("package.json must expose check:browser for rendered DOM/print verification");
}
if (packageJson.scripts["check:preflight"] !== "node scripts/check-preflight.mjs") {
  failures.push("package.json must expose check:preflight as the aggregate local verification suite");
}
if (!viteConfig.includes('outDir: "dist"')) {
  failures.push("Vite must build assets into dist");
}
if (!wranglerConfig.includes('main = "worker/index.ts"')) {
  failures.push("Wrangler must use worker/index.ts as its entry point");
}
if (!wranglerConfig.includes('directory = "./dist"')) {
  failures.push("Wrangler assets must serve the Vite dist directory");
}
if (!wranglerConfig.includes('not_found_handling = "single-page-application"')) {
  failures.push("Wrangler must retain SPA fallback handling for CV routes");
}
if (!workerSource.includes("async fetch")) {
  failures.push("Worker entry point must export a fetch handler");
}

if (failures.length > 0) {
  console.error(`Configuration contract failures:\n- ${failures.join("\n- ")}`);
  process.exit(1);
}

console.log("configuration contract verification passed");
