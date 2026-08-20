import { spawn } from "node:child_process";
import { mandatoryPreflightChecks } from "./preflight-lib.mjs";

const npm = process.platform === "win32" ? "npm.cmd" : "npm";
const env = { ...process.env, PREFLIGHT: "1" };

for (const script of mandatoryPreflightChecks) {
  console.log(`\n[preflight] ${script}`);
  const result = await new Promise((resolve) => {
    const child = spawn(npm, ["run", script], { stdio: "inherit", env });
    child.on("error", (error) => resolve({ code: 127, error }));
    child.on("exit", (code, signal) => resolve({ code: code ?? 1, signal }));
  });
  if (result.code !== 0) {
    const reason = result.error?.message ?? (result.signal ? `terminated by ${result.signal}` : `exit code ${result.code}`);
    console.error(`[preflight] FAILED: ${script} (${reason})`);
    if (script === "check:routes") console.error("[preflight] Required local server is unavailable or returned an invalid response.");
    if (script === "check:browser") console.error("[preflight] Required browser automation, browser binary, or local app is unavailable.");
    process.exit(result.code);
  }
}

console.log("\n[preflight] all mandatory local checks passed");
