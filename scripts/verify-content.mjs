import fs from "node:fs";
import { approvedEvidenceManifest, approvedRenderedLinks } from "./approved-evidence-manifest.mjs";

const source = fs.readFileSync("src/data/profile.ts", "utf8");
const required = [
  ...Object.values(approvedEvidenceManifest.identity),
  ...approvedRenderedLinks.flatMap(({ label, href }) => [label, href]),
  ...approvedEvidenceManifest.unavailableProjectLabels,
];
const forbidden = [
  "lmaodick1239",
  "yusixian",
  "余弦",
  "cosine",
  "Information Technology Student\",\n    aspiration",
];
const missing = required.filter((value) => !source.includes(value));
const present = forbidden.filter((value) => source.includes(value));
const unavailableHasHref = approvedEvidenceManifest.unavailableProjectLabels.some((label) => {
  const labelPosition = source.indexOf(label);
  const nextEntry = source.indexOf("}", labelPosition);
  return labelPosition >= 0 && source.slice(labelPosition, nextEntry).includes("href:");
});

if (unavailableHasHref) {
  console.error("Unavailable project evidence must not be treated as a live link");
  process.exit(1);
}
if (missing.length > 0 || present.length > 0) {
  if (missing.length > 0) console.error(`Missing required CV content: ${missing.join(", ")}`);
  if (present.length > 0) console.error(`Forbidden or inaccurate CV content: ${present.join(", ")}`);
  process.exit(1);
}

console.log("CV data verification passed (declared evidence only; URL liveness is not verified)");
