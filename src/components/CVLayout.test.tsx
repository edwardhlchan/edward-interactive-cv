import { expect, describe, it } from "vitest";
import { render } from "@testing-library/react";
import App from "../App";

describe("CV layout", () => {
  it("renders the CV landmarks and every required section", () => {
    const { container } = render(<App />);
    const banner = container.querySelector('[role="banner"]');
    expect(banner).toBeInTheDocument();
    
    const main = container.querySelector('main[aria-label="CV"]');
    expect(main).toBeInTheDocument();
    
    for (const title of ["Professional Summary", "Key Projects", "Skills", "Education", "Achievements & Awards"]) {
      const heading = Array.from(container.querySelectorAll("h2")).find(h => h.textContent === title);
      expect(heading).toBeInTheDocument();
    }
  });

  it("renders evidence-backed contacts and semantic project-link labels", () => {
    const { container } = render(<App />);

    const h1 = container.querySelector("h1");
    expect(h1?.textContent).toBe("Edward Chan");
    expect(container.textContent).toContain("Aspiring Technology Operations & Cybersecurity Professional");
    
    const phoneLink = container.querySelector('a[href="tel:+85255117745"]');
    expect(phoneLink).toBeInTheDocument();
    
    const emailLink = container.querySelector('a[href="mailto:edward.hl.chan@gmail.com"]');
    expect(emailLink).toBeInTheDocument();
    
    const githubLink = container.querySelector('a[href="https://github.com/edwardhlchan"]');
    expect(githubLink).toBeInTheDocument();
    
    const cvLink = container.querySelector('a[href="https://edward-interactive-cv.despacito777x.workers.dev/"]');
    expect(cvLink).toBeInTheDocument();
    
    const dseLink = container.querySelector('a[href="https://www.mzki.moe/projects/dma/"]');
    expect(dseLink).toBeInTheDocument();
    
    const ninjaLink = container.querySelector('a[href="https://www.mzki.moe/projects/maf/"]');
    expect(ninjaLink).toBeInTheDocument();
    
    // The project title is "Full-Stack Web Apps & Digital Portfolio" - check for parts
    expect(container.textContent).toContain("Digital");
  });

  it("does not render replacement characters or concatenated contact and technology labels", () => {
    const { container } = render(<App />);
    const renderedText = container.textContent ?? "";

    expect(renderedText).not.toMatch(/[\uFFFD]/u);
    expect(renderedText).not.toMatch(/linkedinhttps|githubgithub|JavaScriptFull-Stack/u);
  });

  it("renders education, projects, skills, and achievements from profile data", () => {
    const { container } = render(<App />);
    const articles = container.querySelectorAll("article");
    expect(articles.length).toBeGreaterThanOrEqual(3); // At least 3 projects
    
    const h3s = container.querySelectorAll("h3");
    expect(h3s.length).toBeGreaterThanOrEqual(7); // Projects + education + skill categories
    
    expect(container.textContent).toContain("Top 10 Finalist");
    expect(container.textContent).toContain("Certificate of Distinction");
    expect(container.textContent).toContain("Canadian Computing Competition");
  });

  it("marks CV records for print styling", () => {
    const { container } = render(<App />);

    expect(container.querySelector(".print-document")).toBeInTheDocument();
    expect(container.querySelectorAll(".print-education-entry")).toHaveLength(3);
    expect(container.querySelectorAll(".print-project-entry").length).toBeGreaterThanOrEqual(3);
    
    // Terminal should not be on CV route
    expect(container.querySelector(".terminal-panel")).not.toBeInTheDocument();
  });
});
