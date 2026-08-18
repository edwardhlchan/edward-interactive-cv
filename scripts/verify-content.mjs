import fs from "node:fs";

const source = fs.readFileSync("src/data/profile.ts", "utf8");
const required = [
  "Edward Chan",
  "Information Technology Student",
  "edward.hl.chan@gmail.com",
  "www.linkedin.com/in/edward-chan-hl",
  "github.com/edwardhlchan",
  "edward-interactive-cv.despacito777x.workers.dev",
  "Full-Stack Web Apps & Digital Portfolio",
  "Security Log Analysis & Incident Response Simulation",
  "Automated Data Parsing Desktop Application",
  "Real-Time Input-Translation Engine",
  "Top 10 Finalist",
  "Distinction Award",
];
const forbidden = ["lmaodick1239", "yusixian", "余弦", "cosine"];
const missing = required.filter((value) => !source.includes(value));
const present = forbidden.filter((value) => source.includes(value));

if (missing.length > 0 || present.length > 0) {
  if (missing.length > 0) console.error(`Missing required CV content: ${missing.join(", ")}`);
  if (present.length > 0) console.error(`Forbidden CV content: ${present.join(", ")}`);
  process.exit(1);
}

console.log("content verification passed");
