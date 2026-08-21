import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import App from "../App";

describe("accessibility contract", () => {
  it("provides a skip link and labelled controls on CV route", () => {
    const { container } = render(<App />);
    const skipLink = container.querySelector('a[href="#main-content"]');
    expect(skipLink).toBeInTheDocument();
    expect(skipLink?.textContent).toContain("Skip to content");
    
    const printButton = container.querySelector('button[type="button"]');
    expect(printButton).toBeInTheDocument();
    expect(printButton?.textContent).toContain("Print");
  });
});
