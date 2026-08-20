import { describe, it, expect } from "vitest";
// @ts-ignore - jsdom v27+ ships with types but may require explicit module resolution
import { JSDOM } from "jsdom";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { profile } from "../data/profile.js";

describe("HTML metadata contract", () => {
  it("index.html meta description matches canonical identity from profile.ts", () => {
    const indexPath = resolve(process.cwd(), "index.html");
    const indexContent = readFileSync(indexPath, "utf-8");
    const dom = new JSDOM(indexContent);
    const metaDescription = dom.window.document.querySelector('meta[name="description"]');

    expect(metaDescription).toBeTruthy();
    const content = metaDescription?.getAttribute("content") ?? "";

    // Metadata must reference the canonical identity facts
    expect(content).toContain(profile.identity.name);
    expect(content).toContain("Secondary School Student");
    expect(content).toContain("Data Science");
    expect(content).toContain("Technology Operations");
    expect(content).toContain("Cybersecurity");
  });

  it("index.html title contains canonical name", () => {
    const indexPath = resolve(process.cwd(), "index.html");
    const indexContent = readFileSync(indexPath, "utf-8");
    const dom = new JSDOM(indexContent);
    const title = dom.window.document.querySelector("title");

    expect(title).toBeTruthy();
    expect(title?.textContent).toContain(profile.identity.name);
    expect(title?.textContent).toContain("Interactive CV");
  });
});
