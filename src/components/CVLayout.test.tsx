import { expect, describe, it } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "../App";

describe("CV layout", () => {
  it("renders the CV landmarks and every required section", () => {
    render(<App />);
    expect(screen.getByRole("banner")).toBeInTheDocument();
    expect(screen.getByRole("navigation", { name: /cv sections/i })).toBeInTheDocument();
    expect(screen.getByRole("main", { name: /interactive cv/i })).toBeInTheDocument();
    for (const title of ["Professional Summary", "Education", "Key Projects", "Skills", "Achievements & Awards"]) {
      expect(screen.getByRole("heading", { name: title })).toBeInTheDocument();
    }
  });

  it("renders the current external contact and project links", () => {
    render(<App />);
    expect(screen.getByRole("link", { name: /edward\.hl\.chan@gmail\.com/i })).toHaveAttribute(
      "href",
      "mailto:edward.hl.chan@gmail.com",
    );
    expect(screen.getByRole("link", { name: /linkedinhttps:\/\/www\.linkedin\.com\/in\/edward-chan-hl\//i })).toHaveAttribute(
      "href",
      "https://www.linkedin.com/in/edward-chan-hl/",
    );
    expect(screen.getByRole("link", { name: /interactive cv/i })).toHaveAttribute(
      "href",
      "https://edward-interactive-cv.despacito777x.workers.dev/",
    );
    expect(screen.getByRole("link", { name: /dse score calculator/i })).toHaveAttribute(
      "href",
      "https://www.mzki.moe/projects/dma/",
    );
  });

  it("renders education, projects, skills, and achievements from profile data", () => {
    render(<App />);
    expect(screen.getAllByRole("article")).toHaveLength(11);
    expect(screen.getAllByRole("heading", { level: 3 })).toHaveLength(11);
    expect(screen.getByText("Top 10 Finalist – Splunk Boss of the SOC (BOTS) Hong Kong (2025)")).toBeInTheDocument();
    expect(screen.getByText("Distinction Award – Canadian Computing Competition (2025)")).toBeInTheDocument();
  });

  it("marks interactive regions and CV records for print styling", () => {
    const { container } = render(<App />);

    expect(container.querySelector(".print-document")).toBeInTheDocument();
    expect(container.querySelector(".site-chrome.print-only-screen")).toBeInTheDocument();
    expect(container.querySelector(".navigation-rail.print-only-screen")).toBeInTheDocument();
    expect(container.querySelector(".top-actions.print-only-screen")).toBeInTheDocument();
    expect(container.querySelectorAll(".print-education-entry")).toHaveLength(3);
    expect(container.querySelectorAll(".print-project-entry")).toHaveLength(4);
    expect(container.querySelector(".terminal-panel")?.parentElement).toHaveClass("print-only-screen");
  });
});
