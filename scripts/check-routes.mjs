import http from "node:http";

const baseUrl = process.argv[2] ?? "http://localhost:8787";

function requestText(path, headers = {}) {
  return new Promise((resolve, reject) => {
    const request = http.request(new URL(path, baseUrl), { headers }, (response) => {
      let body = "";
      response.setEncoding("utf8");
      response.on("data", (chunk) => { body += chunk; });
      response.on("end", () => resolve({ status: response.statusCode ?? 0, body }));
    });
    request.on("error", reject);
    request.end();
  });
}

async function fetchText(path, headers = {}) {
  const result = await requestText(path, headers);
  if (result.status < 200 || result.status >= 300) throw new Error(`${path} returned ${result.status}`);
  return result.body;
}

for (const path of ["/", "/cv"]) {
  const text = await fetchText(path, {
    Accept: "text/html",
    "Sec-Fetch-Mode": "navigate",
  });
  if (!text.includes("Edward Chan") || !text.includes("Interactive CV")) {
    throw new Error(`${path} did not return the interactive CV application`);
  }
}

for (const path of ["/dse", "/dse-calculator/"]) {
  const result = await requestText(path, { Accept: "text/html" });
  if (result.body.includes("DSE Score Calculator") || result.body.includes("Percentile Ranking")) {
    throw new Error(`${path} unexpectedly returned a DSE calculator application`);
  }
}

console.log(`route verification passed for ${baseUrl}`);
