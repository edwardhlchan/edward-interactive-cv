import { describe, expect, it } from "vitest";
import { executeTerminalCommand } from "./commands";

describe("executeTerminalCommand", () => {
  it.each([
    ["help", "output"],
    ["whoami", "output"],
    ["about", "scroll"],
    ["projects", "scroll"],
    ["skills", "scroll"],
    ["contact", "contact"],
    ["print", "print"],
    ["clear", "clear"],
  ] as const)("maps %s to %s", (input, type) => {
    expect(executeTerminalCommand(input)).toMatchObject({ type });
  });

  it("normalizes whitespace and casing", () => {
    expect(executeTerminalCommand("  PROJECTS  ")).toMatchObject({
      type: "scroll",
      sectionId: "projects",
    });
  });

  it("returns no-op for blank input", () => {
    expect(executeTerminalCommand("   ")).toEqual({ type: "noop" });
  });

  it("rejects unknown input without evaluating it", () => {
    const result = executeTerminalCommand("rm -rf /");
    expect(result).toMatchObject({ type: "output" });
    expect(result.type === "output" && result.lines).toEqual(
      expect.arrayContaining([expect.stringMatching(/unknown command/i)]),
    );
  });
});
