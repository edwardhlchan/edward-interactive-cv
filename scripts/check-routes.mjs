import http from "node:http";
import https from "node:https";

const baseUrl = process.argv[2] ?? "http://localhost:8787";

function requestText(path, headers = {}) {
  return new Promise((resolve, reject) => {
    const url = new URL(path, baseUrl);
    const requestClient = url.protocol === "https:" ? https : http;
    const request = requestClient.request(url, { headers }, (response) => {
      let body = "";
      response.setEncoding("utf8");
      response.on("data", (chunk) => { body += chunk; });
      response.on("end", () => resolve({ status: response.statusCode ?? 0, body, contentType: response.headers["content-type"] ?? "" }));
    });
    request.setTimeout(5000, () => request.destroy(new Error("request timed out")));
    request.on("error", reject);
    request.end();
  });
}

function assertResponse(path, result, { status, identity, absent = [] }) {
  if (!status.includes(result.status)) throw new Error(`${path} returned HTTP ${result.status}; expected ${status.join(" or ")}`);
  if (identity && (!result.contentType.includes("text/html") || !result.body.includes(identity))) {
    throw new Error(`${path} returned HTTP ${result.status} but not the expected response identity: ${identity}`);
  }
  for (const value of absent) if (result.body.includes(value)) throw new Error(`${path} unexpectedly contains ${value}`);
}

try {
  const result = await requestText("/", { Accept: "text/html", "Sec-Fetch-Mode": "navigate" });
  assertResponse("/", result, { status: [200], identity: "Edward Chan" });
  if (!result.body.includes("Interactive CV")) throw new Error(`/ is missing the interactive CV identity`);

  // SPA fallback routes: wrangler.toml sets not_found_handling = "single-page-application"
  // so /dse and /dse-calculator/ return the CV shell (200 + Edward Chan header) with client-side routing.
  // These checks verify the SPA shell is served correctly on unmatched paths.
  for (const path of ["/dse", "/dse-calculator/"]) {
    const result = await requestText(path, { Accept: "text/html" });
    assertResponse(path, result, { status: [200], identity: "Edward Chan" });
    if (!result.body.includes("Interactive CV")) throw new Error(`${path} SPA fallback is missing the CV shell identity`);
  }

  console.log(`route verification passed for ${baseUrl}`);
} catch (error) {
  console.error(`Route verification failed for ${baseUrl}: ${error instanceof Error ? error.message : error}`);
  console.error("Required local server or authorized deployment is unavailable, or returned an unexpected response.");
  process.exit(1);
}
