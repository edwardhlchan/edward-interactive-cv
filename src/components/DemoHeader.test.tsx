import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { DemoHeader } from "./DemoHeader";

describe("DemoHeader", () => {
  it('renders "Back to CV" link to /', () => {
    const { container } = render(
      <BrowserRouter>
        <DemoHeader />
      </BrowserRouter>
    );
    const link = container.querySelector('a[href="/"]');
    expect(link).toBeInTheDocument();
    expect(link?.textContent).toContain("CV");
  });

  it("renders navigation landmark", () => {
    const { container } = render(
      <BrowserRouter>
        <DemoHeader />
      </BrowserRouter>
    );
    const nav = container.querySelector("nav");
    expect(nav).toBeInTheDocument();
  });

  it("title uses proper heading level", () => {
    const { container } = render(
      <BrowserRouter>
        <DemoHeader />
      </BrowserRouter>
    );
    const heading = container.querySelector("h1");
    expect(heading).toBeInTheDocument();
    expect(heading?.textContent).toContain("Interactive Demo");
  });
});
