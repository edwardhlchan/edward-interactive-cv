# A4 Monochrome CV Print Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the existing interactive portfolio export as a complete, selectable, black-and-white A4 portrait PDF in no more than two pages while hiding interactive-only UI during print.

**Architecture:** Keep one shared semantic React document driven by [`profile`](../../../src/data/profile.ts:45). Add a focused print stylesheet and only the minimal class hooks needed to distinguish printable CV content from navigation, terminal, status chrome, and controls; do not create a duplicate print component or alter the screen layout.
**Tech Stack:** React 19, TypeScript, Vite, CSS [`@page`](../../../src/styles/global.css:1), browser Print to PDF, Vitest where DOM behavior can be tested.


## Global Constraints

- Use A4 portrait paper.
- Target one to two printed pages.
- Use black text on a white background, with grayscale-safe borders and no dependence on colour.
- Preserve every current education entry, project, skills group, achievement, contact method, and project link.
- Keep all text selectable and searchable in the generated PDF for ATS compatibility.
- Hide the interactive terminal, navigation rail, site chrome, print controls, and interactive-only footer content when printing.
- Retain the existing screen experience without visual regression.
- Do not use CSS scaling, screenshots, image conversion, absolute positioning, fixed heights, `100vh`, or transforms for print pagination.
- Run the existing project checks after implementation: `npm run build`, `npm run check:css`, `npm run check:content`, and `npm run check:routes`.

---

## File Map

- Modify: [`src/components/AppShell.tsx`](../../../src/components/AppShell.tsx:12) — add stable semantic print-targeting hooks while preserving the existing component structure and screen behavior.
- Create or modify: [`src/styles/global.css`](../../../src/styles/global.css:1) — define A4 page geometry, monochrome print overrides, visibility rules, and content-aware pagination.
- Modify: the existing stylesheet entry point that is imported by the application — import the print stylesheet exactly once so it is included in the Vite bundle.
- Modify: the existing CV component styles only when required by the print rules — keep screen rules unchanged and use print overrides rather than rewriting the interactive design.
- Create or modify: the existing test location for [`AppShell`](../../../src/components/AppShell.tsx:12), if present — assert print-targeting hooks and content preservation using the project’s current Vitest/testing-library conventions.

## Interfaces

- [`AppShell`](../../../src/components/AppShell.tsx:12) continues to accept `{ profile: Profile }` and returns the same interactive React tree.
- Print hooks are ordinary class names or `data-print-role` attributes; they do not create runtime APIs.
- [`profile`](../../../src/data/profile.ts:45) remains the single source of truth for all CV content.
- The print stylesheet is activated by the browser’s `print` media context and has no effect on screen media.

---

### Task 1: Add stable print-region hooks to the shared document

**Files:**
- Modify: [`src/components/AppShell.tsx`](../../../src/components/AppShell.tsx:17)
- Test: existing AppShell/component test file, if present; otherwise add a focused test beside the component using the repository’s established test naming convention.

**Interfaces:**
- Consumes: existing [`AppShell`](../../../src/components/AppShell.tsx:12), [`PrintControls`](../../../src/components/PrintControls.tsx:1), and [`TerminalPanel`](../../../src/features/terminal/TerminalPanel.tsx:1) component boundaries.
- Produces: stable selectors for the print stylesheet, including a printable shell/content region and explicit interactive-only regions.

- [ ] **Step 1: Inspect the current stylesheet import and component test conventions**

  Identify the existing global stylesheet import and any AppShell tests before editing. Do not introduce a second styling entry point or a new test framework.

- [ ] **Step 2: Add minimal print hooks**

  Keep the current DOM order and behavior, but add semantic hooks equivalent to:

  ```tsx
  <div className="app-shell print-document">
    <div className="site-chrome print-only-screen">...</div>
    <aside className="navigation-rail print-only-screen">...</aside>
    <div className="reading-column">
      <div className="top-actions print-only-screen">...</div>
      ...printable header and sections...
      <footer className="site-footer">
        <div className="print-only-screen">...</div>
        <div className="site-footer__meta print-only-screen">...</div>
      </footer>
    </div>
  </div>
  ```

  Use the real existing nesting and component boundaries; do not add duplicate text or a second CV renderer. If the terminal is the only child of the footer, apply the hook to its wrapper rather than modifying terminal behavior.

- [ ] **Step 3: Add record-level hooks without changing content**

  Add a class or data attribute to the wrappers rendered by education and project list components so each education/project record can receive `break-inside: avoid`. Preserve every item from [`profile.education`](../../../src/data/profile.ts:59) and [`profile.projects`](../../../src/data/profile.ts:88).

- [ ] **Step 4: Add or update a component test**

  Assert that rendered output still contains the profile name, every section heading, and the print selectors. The test should verify that adding hooks did not remove or duplicate content.

- [ ] **Step 5: Run the focused test**

  Run the repository’s focused Vitest command for the discovered test file, for example:

  ```bash
  npm test -- --run src/components/AppShell.test.tsx
  ```

  Expected: PASS with all existing and new assertions passing.

- [ ] **Step 6: Commit the structural hooks**

  ```bash
  git add src/components/AppShell.tsx src/components src/features
  git commit -m "refactor: add print region hooks"
  ```

---

### Task 2: Implement the A4 monochrome print stylesheet

**Files:**
- Create or modify: [`src/styles/global.css`](../../../src/styles/global.css:1)
- Modify: existing stylesheet entry point to import [`global.css`](../../src/styles/global.css:1)

**Interfaces:**
- Consumes: selectors added in Task 1 and the existing component class names.
- Produces: browser print output with A4 portrait geometry, monochrome styling, hidden interactive UI, and controlled pagination.

- [ ] **Step 1: Add the print stylesheet import**

  Import the print stylesheet from the existing application stylesheet entry point. Keep the import deterministic and avoid importing it from multiple React components.

- [ ] **Step 2: Define A4 page geometry**

  Start the stylesheet with a physical page rule equivalent to:

  ```css
  @page {
    size: A4 portrait;
    margin: 12mm 14mm;
  }
  ```

  Use the project’s existing spacing conventions if they already define a compatible margin scale, but preserve physical A4 units for print reliability.

- [ ] **Step 3: Hide interactive-only regions**

  Under `@media print`, hide `.print-only-screen`, `.site-chrome`, `.navigation-rail`, `.top-actions`, terminal controls, and interactive instruction content. Ensure the printable reading column remains visible and does not retain desktop grid offsets.

- [ ] **Step 4: Normalize the page to monochrome**

  Under `@media print`, set the page and printable shell to white, set text and borders to black or neutral grayscale, remove shadows/gradients/background images, and disable decorative effects. Preserve sufficient contrast for body text, headings, links, rules, and list markers.

- [ ] **Step 5: Convert the layout to a document flow**

  Remove print-time desktop width constraints, side rails, fixed viewport sizing, and large screen-only gaps. Use a single readable column with compact margins, typography, line-height, list indentation, and section spacing. Do not apply a transform or browser zoom substitute.

- [ ] **Step 6: Preserve ATS-readable links**

  Keep contact and project anchors as real HTML links with selectable labels. Do not replace them with icons or images. If existing styles suppress link text or rely on colour alone, override them for print so the labels remain visibly readable.

- [ ] **Step 7: Add pagination safeguards**

  Apply both modern and legacy break-inside declarations to education/project records:

  ```css
  .print-education-entry,
  .print-project-entry {
    break-inside: avoid;
    page-break-inside: avoid;
  }
  ```

  Keep section headings with their first content item using `break-after: avoid` where supported. Permit normal page breaks between records to avoid large blank regions.

- [ ] **Step 8: Add a CSS contract test or update the existing one**

  Extend the project’s CSS check, if it has explicit selectors/contracts, to verify the stylesheet contains `@page`, `size: A4 portrait`, `@media print`, monochrome declarations, hidden interactive selectors, and break protection. Keep assertions aligned with actual class names rather than testing implementation comments.

- [ ] **Step 9: Run the CSS check**

  ```bash
  npm run check:css
  ```

  Expected: PASS with the new print stylesheet included and no existing CSS contract regressions.

- [ ] **Step 10: Commit the print CSS**

  ```bash
  git add src/styles/global.css src
  git commit -m "feat: add A4 monochrome print layout"
  ```

---

### Task 3: Verify content, build, and route compatibility

**Files:**
- Modify: only files required to fix failures found by the checks; do not change CV copy solely to make a test pass.
- Test: existing project checks and component tests.

**Interfaces:**
- Consumes: the completed shared document hooks and print stylesheet.
- Produces: a buildable application with unchanged content, routes, and interactive behavior.

- [ ] **Step 1: Run the complete automated verification suite**

  ```bash
  npm run build
  npm run check:css
  npm run check:content
  npm run check:routes
  npm run test:run
  ```

  Expected: all commands exit successfully. A failure must be fixed at its source, then the failed command rerun before continuing.

- [ ] **Step 2: Verify content parity against [`profile`](../../../src/data/profile.ts:45)**

  Confirm the rendered print DOM includes:

  - all four project titles and all project detail bullets;
  - all three education entries and their details;
  - all four skill categories and their items;
  - both achievements;
  - all four contact links;
  - all three links under the full-stack project.

  Use the existing content verification conventions rather than duplicating profile data in a test.

- [ ] **Step 3: Verify normal screen rendering is not altered**

  Run the development or preview server using the existing package script and inspect the normal viewport. Confirm navigation, terminal interaction, section scrolling, print controls, and screen colours still behave as before.

- [ ] **Step 4: Commit verification fixes, if any**

  ```bash
  git add src
  git commit -m "test: verify printable CV content"
  ```

  If no fixes are needed, do not create an empty commit.

---

### Task 4: Manually validate browser Print to PDF output

**Files:**
- No source changes unless manual inspection identifies a concrete pagination or visibility defect.
- Output: a temporary local PDF or browser print preview; do not commit generated PDFs unless the repository explicitly requires them.

**Interfaces:**
- Consumes: the built application from Tasks 1–3.
- Produces: confirmed A4, monochrome, one-to-two-page PDF output with selectable content.

- [ ] **Step 1: Open the built portfolio in a Chromium-based browser**

  Use the project’s existing preview workflow. Do not start a second server if an active development/preview terminal is already running.

- [ ] **Step 2: Configure print preview**

  Set paper size to A4, orientation to Portrait, scale to 100 percent/default, margins to Default or browser-controlled, and disable background graphics. Confirm the preview shows one or two pages.

- [ ] **Step 3: Check hidden UI and monochrome output**

  Confirm the preview contains no navigation rail, site chrome, print controls, terminal panel, terminal instructions, or interactive footer. Confirm the page is white with black/neutral-gray text and rules, and that no meaning depends on colour.

- [ ] **Step 4: Check pagination and bounds**

  Inspect both pages for clipped content, orphaned section headings, split education/project records, excessive blank space, and text outside the A4 printable margins. Confirm the final section and all links are present.

- [ ] **Step 5: Confirm selectable PDF content**

  Save a temporary PDF, select/copy text from the name, summary, project details, education details, skills, achievements, and links, and confirm the copied text is present and in reading order.

- [ ] **Step 6: Adjust only targeted print rules if needed**

  If preview exceeds two pages or produces an orphan, adjust print-only spacing/typography or one targeted break rule. Do not remove profile content, use transforms, or introduce a duplicate print component. Rerun automated checks after every CSS change.

- [ ] **Step 7: Commit the final print adjustments**

  ```bash
  git add src
  git commit -m "fix: refine CV print pagination"
  ```

  Omit this commit when the initial print rules pass without adjustment.

## Final Definition of Done

- Automated build, CSS, content, route, and test checks pass.
- Browser Print to PDF is A4 portrait, black-and-white, and no more than two pages at default scale.
- All current CV content remains present and selectable.
- Interactive-only UI is absent from print output.
- No project or education record is awkwardly split, clipped, or pushed outside the printable area.
- Normal interactive screen behavior remains unchanged.
