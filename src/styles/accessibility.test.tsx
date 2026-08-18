import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import App from "../App";

describe("accessibility contract", () => {
  it("provides a skip link, labelled controls, and active navigation", () => {
    render(<App />);
    expect(screen.getByRole("link", { name: /skip to content/i })).toHaveAttribute("href", "#main-content");
    expect(screen.getByRole("button", { name: /print cv/i })).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: /terminal command/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /summary/i })).toHaveAttribute("aria-current", "location");
  });
});
