# Interactive CV — 04 Terminal Interaction Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `superpowers:subagent-driven-development` or `superpowers:executing-plans` to execute each checked step in order.

**Goal:** Add the safe, keyboard-accessible terminal-style command palette specified for the interactive CV.

**Architecture:** A pure command parser produces typed local effects. `TerminalPanel` owns input and bounded history, while `AppShell` supplies scrolling, contact focus, and print callbacks. No command is sent to the Worker or evaluated as code.

**Tech Stack:** React, TypeScript, Vitest, Testing Library.

## Global Constraints

- Execute Plans 01–03 first.
- Accept only `help`, `about`, `projects`, `skills`, `contact`, `print`, `clear`, and `whoami` commands after trimming and lowercasing input.
- Empty input is a no-op; unknown input produces a help hint.
- Never use `eval`, `Function`, shell execution, network calls, Worker APIs, or arbitrary command evaluation.
- Keep terminal history bounded to 30 entries.
- The prompt must be `root@edward-ops:~$`.

---

## Files

- Create: [`src/features/terminal/commands.ts`](../../src/features/terminal/commands.ts)
- Create: [`src/features/terminal/commands.test.ts`](../../src/features/terminal/commands.test.ts)
- Create: [`src/features/terminal/TerminalPanel.tsx`](../../src/features/terminal/TerminalPanel.tsx)
- Create: [`src/features/terminal/TerminalPanel.test.tsx`](../../src/features/terminal/TerminalPanel.test.tsx)
- Modify: [`src/components/AppShell.tsx`](../../src/components/AppShell.tsx)
- Modify: [`src/styles/global.css`](../../src/styles/global.css)

## Interfaces

```ts
export type TerminalEffect =
  | { type: "output"; lines: string[] }
  | { type: "scroll"; sectionId: SectionId; lines: string[] }
  | { type: "contact"; lines: string[] }
  | { type: "print"; lines: string[] }
  | { type: "clear" }
  | { type: "noop" };

export function executeTerminalCommand(input: string): TerminalEffect;

export type TerminalPanelProps = {
  onScrollToSection: (sectionId: SectionId) => void;
  onFocusContact: () => void;
  onPrint: () => void;
};
```

### Task 1: Test-drive the pure command parser

- [ ] **Step 1: Write parser tests before implementation.**

Create [`src/features/terminal/commands.test.ts`](../../src/features/terminal/commands.test.ts):

```ts
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
    expect(executeTerminalCommand("rm -rf /")).toMatchObject({
      type: "output",
      lines: [expect.stringMatching(/unknown command/i)],
    });
  });
});
```

- [ ] **Step 2: Run the parser test and confirm failure.**

```bash
npm run test:run -- src/features/terminal/commands.test.ts
```

Expected: FAIL because `commands.ts` does not exist.

- [ ] **Step 3: Implement the parser with a closed switch statement.**

Create `commands.ts` with a `normalizeCommand` helper that trims and lowercases input, then a `switch` covering exactly the supported commands. Return these effects:

```ts
"about" => { type: "scroll", sectionId: "summary", lines: ["Edward Chan — Information Technology Student."] }
"projects" => { type: "scroll", sectionId: "projects", lines: ["Opening Key Projects."] }
"skills" => { type: "scroll", sectionId: "skills", lines: ["Opening Skills."] }
"contact" => { type: "contact", lines: ["Focusing contact links."] }
"print" => { type: "print", lines: ["Opening browser print dialog."] }
"clear" => { type: "clear" }
"whoami" => { type: "output", lines: ["Edward Chan", "Information Technology Student"] }
```

`help` returns one output entry listing every supported command. Unknown commands return `command not found: <normalized input>` followed by `Type help to list available commands.`

- [ ] **Step 4: Run parser tests.**

```bash
npm run test:run -- src/features/terminal/commands.test.ts
```

Expected: PASS.

### Task 2: Test-drive terminal panel rendering and callbacks

- [ ] **Step 1: Create the terminal panel test.**

Write [`src/features/terminal/TerminalPanel.test.tsx`](../../src/features/terminal/TerminalPanel.test.tsx):

```tsx
import { fireEvent, render, screen } from "@testing-library/react";
import { vi } from "vitest";
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
    fireEvent.change(input, { target: { value: "clear" } });
    fireEvent.keyDown(input, { key: "Enter" });
    expect(screen.queryByText(/available commands/i)).not.toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run and confirm failure.**

```bash
npm run test:run -- src/features/terminal/TerminalPanel.test.tsx
```

Expected: FAIL because `TerminalPanel` is not implemented.

- [ ] **Step 3: Implement `TerminalPanel`.**

Requirements:

- Render a `<section aria-label="Interactive terminal">` containing a `role="log"` region for output and a labelled native `<input>`.
- Display `root@edward-ops:~$` next to the input.
- Submit only when the user presses Enter.
- Use a controlled string input.
- Store output history as `string[]`; add command and result lines as a single history update.
- Trim history to the latest 30 lines with `history.slice(-30)`.
- Clear the input after non-empty command submission.
- For `scroll`, call `onScrollToSection`; for `contact`, call `onFocusContact`; for `print`, call `onPrint`; for `clear`, erase history; for `noop`, do nothing.
- Do not use `dangerouslySetInnerHTML`.

- [ ] **Step 4: Run terminal tests.**

```bash
npm run test:run -- src/features/terminal/commands.test.ts src/features/terminal/TerminalPanel.test.tsx
```

Expected: PASS.

### Task 3: Connect terminal actions to the CV application

- [ ] **Step 1: Add scroll and focus callbacks in `AppShell`.**

Implement:

```ts
const scrollToSection = (sectionId: SectionId) => {
  document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth", block: "start" });
};

const focusContact = () => {
  document.getElementById("contact-links")?.focus();
};
```

Give the contact `<address>` `id="contact-links"` and `tabIndex={-1}` in `ProfileHeader`. Pass `window.print` through `onPrint`.

- [ ] **Step 2: Mount `TerminalPanel` in the application footer.**

Keep it outside `<main>` but inside the app shell footer. It must not be included in core reading order before the CV content.

- [ ] **Step 3: Add integration test for print/contact callbacks.**

Extend `TerminalPanel.test.tsx` with a `print` Enter test asserting `onPrint` is called once, and a `contact` test asserting `onFocusContact` is called once.

- [ ] **Step 4: Add terminal styles.**

Add styles for the terminal surface, monospaced text, bounded scrollable history, prompt/input row, and visible focus. Ensure the panel does not horizontally overflow at 320px width.

- [ ] **Step 5: Run tests and build.**

```bash
npm run test:run && npm run build
```

Expected: PASS.

- [ ] **Step 6: Commit terminal interaction.**

```bash
git add src/components/AppShell.tsx src/components/ProfileHeader.tsx src/features/terminal src/styles/global.css
git commit -m "feat: add safe interactive CV terminal"
```

## Completion Gate

- The terminal shows the exact approved prompt.
- Every documented command works via Enter and produces the specified local effect.
- Unknown commands are safely rejected.
- History cannot grow beyond 30 output lines.
- No terminal command uses networking, Worker calls, shell execution, dynamic code evaluation, or DSE routing.
