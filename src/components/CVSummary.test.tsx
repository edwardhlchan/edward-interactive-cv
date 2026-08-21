import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { CVSummary } from "./CVSummary";

describe("CVSummary", () => {
  it("renders summary text", () => {
    const summary = "Information Technology and Data Science student combining practical experience";
    const { container } = render(<CVSummary summary={summary} />);
    expect(container.textContent).toContain(summary);
  });

  it("uses section wrapper", () => {
    const { container } = render(<CVSummary summary="Test summary" />);
    const section = container.querySelector(".cv-summary");
    expect(section).toBeInTheDocument();
  });

  it("renders with data-evidence-category attribute", () => {
    const { container } = render(<CVSummary summary="Test summary" />);
    const section = container.querySelector(".cv-summary");
    expect(section).toHaveAttribute("data-evidence-category", "summary");
  });
});
