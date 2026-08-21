import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { DemoRoute } from "./DemoRoute";

describe("DemoRoute", () => {
  it("renders DemoHeader component", () => {
    const { container } = render(
      <BrowserRouter>
        <DemoRoute />
      </BrowserRouter>
    );
    expect(container.querySelector(".demo-header")).toBeInTheDocument();
  });

  it("renders TerminalPanel component", () => {
    const { container } = render(
      <BrowserRouter>
        <DemoRoute />
      </BrowserRouter>
    );
    const terminal = container.querySelector('.terminal-panel');
    expect(terminal).toBeInTheDocument();
  });

  it("has Back to CV link", () => {
    render(
      <BrowserRouter>
        <DemoRoute />
      </BrowserRouter>
    );
    const backLink = screen.getByRole("link", { name: /back to cv/i });
    expect(backLink).toHaveAttribute("href", "/");
  });

  it("terminal is focusable for accessibility", () => {
    const { container } = render(
      <BrowserRouter>
        <DemoRoute />
      </BrowserRouter>
    );
    const terminalInput = container.querySelector('.terminal-panel__input-row input');
    expect(terminalInput).toBeInTheDocument();
  });
});
