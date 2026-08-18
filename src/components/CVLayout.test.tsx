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

  it("renders the approved external contact and project links", () => {
    render(<App />);
    expect(screen.getByRole("link", { name: /contact@edwardchan\.dev/i })).toHaveAttribute(
      "href",
      "mailto:contact@edwardchan.dev",
    );
    expect(screen.getByRole("link", { name: /linkedin\.com\/in\/edhlchan/i })).toHaveAttribute(
      "href",
      "https://linkedin.com/in/edhlchan",
    );
    expect(screen.getByRole("link", { name: /interactive cv/i })).toHaveAttribute(
      "href",
      "https://edward-portfolio.runs-as-a-cloudflare.workers.dev/cv",
    );
  });

  it("does not render the excluded DSE route", () => {
    render(<App />);
    expect(screen.queryByRole("link", { name: /dse calculator/i })).not.toBeInTheDocument();
    expect(document.body.textContent).not.toContain("/dse-calculator/");
  });

  it("renders education, projects, skills, and achievements from profile data", () => {
    render(<App />);
    expect(screen.getAllByRole("article")).toHaveLength(11);
    expect(screen.getAllByRole("heading", { level: 3 })).toHaveLength(11);
    expect(screen.getByText("Top 10 Finalist – Splunk Boss of the SOC (BOTS) Hong Kong (2025)")).toBeInTheDocument();
    expect(screen.getByText("Distinction Award – Canadian Computing Competition (2025)")).toBeInTheDocument();
  });
});
