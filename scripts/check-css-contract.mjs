import fs from "node:fs";

const css = fs.readFileSync("src/styles/global.css", "utf8");
const required = [
  "--color-bg",
  "--color-surface",
  "--color-ink",
  "--color-accent",
  "--content-max",
  "@media (prefers-reduced-motion: reduce)",
  "@media print",
  "@page",
  "size: A4 portrait",
  ".print-only-screen",
  ".print-education-entry",
  ".print-project-entry",
  "break-inside: avoid",
  "page-break-inside: avoid",
  "background: #fff",
  "color: #000",
  ".site-chrome",
  ".navigation-rail",
  ".top-actions",
  ".terminal-panel",
  "display: none !important",
  "max-width: none",
  "overflow: visible",
];
const missing = required.filter((token) => !css.includes(token));
if (missing.length > 0) {
  console.error(`Missing CSS contract tokens: ${missing.join(", ")}`);
  process.exit(1);
}
console.log("CSS contract verification passed");
