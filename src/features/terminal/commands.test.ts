import { describe, expect, it } from "vitest";
import { executeTerminalCommand } from "./commands";
import { profile } from "../../data/profile";

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

  it("whoami derives identity from canonical profile data", () => {
    const result = executeTerminalCommand("whoami");
    expect(result).toMatchObject({
      type: "output",
      lines: [profile.identity.name, profile.identity.role],
    });
  });

  it("about derives text from canonical profile data", () => {
    const result = executeTerminalCommand("about");
    expect(result).toMatchObject({
      type: "scroll",
      sectionId: "summary",
      lines: [`${profile.identity.name} — ${profile.identity.role}.`],
    });
  });
});
