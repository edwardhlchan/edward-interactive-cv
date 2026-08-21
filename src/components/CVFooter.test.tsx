import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { CVFooter } from "./CVFooter";

describe("CVFooter", () => {
  it("renders link to /demo", () => {
    const { container } = render(
      <BrowserRouter>
        <CVFooter />
      </BrowserRouter>
    );
    const link = container.querySelector('a[href="/demo"]');
    expect(link).toBeInTheDocument();
    expect(link?.textContent).toContain("Interactive Demo");
  });

  it("renders contentinfo landmark", () => {
    const { container } = render(
      <BrowserRouter>
        <CVFooter />
      </BrowserRouter>
    );
    const footer = container.querySelector('footer[role="contentinfo"]');
    expect(footer).toBeInTheDocument();
  });

  it("does not render hardcoded last updated date", () => {
    const { container } = render(
      <BrowserRouter>
        <CVFooter />
      </BrowserRouter>
    );
    expect(container.textContent).not.toContain("Last updated");
    expect(container.textContent).not.toContain("2026");
  });

  it("has print-hide class for print output", () => {
    const { container } = render(
      <BrowserRouter>
        <CVFooter />
      </BrowserRouter>
    );
    const footer = container.querySelector('footer');
    expect(footer).toHaveClass("print-hide");
  });
});
