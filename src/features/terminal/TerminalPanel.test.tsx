import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { TerminalPanel } from "./TerminalPanel";

function renderPanel() {
  const onScrollToSection = vi.fn();
  const onFocusContact = vi.fn();
  const onPrint = vi.fn();
  render(
    <TerminalPanel
      onScrollToSection={onScrollToSection}
      onFocusContact={onFocusContact}
      onPrint={onPrint}
    />,
  );
  return { onScrollToSection, onFocusContact, onPrint };
}

describe("TerminalPanel", () => {
  it("renders the prompt and executes navigation commands with Enter", () => {
    const { onScrollToSection } = renderPanel();
    const input = screen.getByRole("textbox", { name: /terminal command/i });
    fireEvent.change(input, { target: { value: "projects" } });
    fireEvent.keyDown(input, { key: "Enter" });
    expect(onScrollToSection).toHaveBeenCalledWith("projects");
    expect(screen.getByText(/opening key projects/i)).toBeInTheDocument();
  });

  it("handles clear without leaving prior command output", () => {
    renderPanel();
    const input = screen.getByRole("textbox", { name: /terminal command/i });
    fireEvent.change(input, { target: { value: "help" } });
    fireEvent.keyDown(input, { key: "Enter" });
    expect(screen.getByText(/^available commands:$/i)).toBeInTheDocument();
    fireEvent.change(input, { target: { value: "clear" } });
    fireEvent.keyDown(input, { key: "Enter" });
    expect(screen.queryByText(/^available commands:$/i)).not.toBeInTheDocument();
  });

  it("invokes contact and print callbacks", () => {
    const { onFocusContact, onPrint } = renderPanel();
    const input = screen.getByRole("textbox", { name: /terminal command/i });
    fireEvent.change(input, { target: { value: "contact" } });
    fireEvent.keyDown(input, { key: "Enter" });
    fireEvent.change(input, { target: { value: "print" } });
    fireEvent.keyDown(input, { key: "Enter" });
    expect(onFocusContact).toHaveBeenCalledTimes(1);
    expect(onPrint).toHaveBeenCalledTimes(1);
  });
});
