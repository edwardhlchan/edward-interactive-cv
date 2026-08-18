# Interactive CV — 05 Responsive Accessibility and Print Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `superpowers:subagent-driven-development` or `superpowers:executing-plans` to execute each checked step in order.

**Goal:** Finish the visual system for desktop, tablet, mobile, keyboard, reduced-motion, and print presentation.

**Architecture:** One global style system uses CSS custom properties and media queries. Screen layout uses a two-zone desktop composition and one-column mobile flow; print CSS removes interactive chrome and preserves readable CV content.

**Tech Stack:** CSS, React semantic markup, Vitest/Testing Library, browser print preview.

## Global Constraints

- Execute Plans 01–04 first.
- Preserve the reference-inspired high-contrast developer-console visual language while keeping CV content primary.
- Maintain readable contrast, visible focus states, no horizontal overflow, touch-sized controls, and reduced-motion support.
- Hide navigation, terminal controls/history, decorative console chrome, and print controls in print.
- Keep CV content, contact links, project details, achievements, and the approved CV demo URL in print output.
- Do not solve layout overflow by making body text unreasonably small.

---

## Files

- Modify: [`src/styles/global.css`](../../src/styles/global.css)
- Modify: [`src/components/AppShell.tsx`](../../src/components/AppShell.tsx)
- Modify: [`src/components/ProfileHeader.tsx`](../../src/components/ProfileHeader.tsx)
- Modify: [`src/components/SectionNav.tsx`](../../src/components/SectionNav.tsx)
- Modify: [`src/components/PrintControls.tsx`](../../src/components/PrintControls.tsx)
- Modify: [`src/features/terminal/TerminalPanel.tsx`](../../src/features/terminal/TerminalPanel.tsx)
- Create: [`src/styles/accessibility.test.tsx`](../../src/styles/accessibility.test.tsx)
- Create: [`scripts/check-css-contract.mjs`](../../scripts/check-css-contract.mjs)

## Interfaces

CSS contract:

```text
--color-bg
--color-surface
--color-surface-elevated
--color-ink
--color-muted
--color-accent
--color-rule
--content-max
--rail-width
--space-1 through --space-6
--text-body
--text-small
--text-heading
--line-body
```

DOM contract:

- `.app-shell` wraps the application.
- `.layout-grid` contains navigation/status rail and reading column.
- `.screen-only` marks interactive-only controls.
- `.print-only` is reserved for print labels/URLs if required.
- `#main-content` is the main landmark target.
- `#contact-links` is the focus target for `contact`.

### Task 1: Define the desktop visual system

- [ ] **Step 1: Add CSS contract validation.**

Create [`scripts/check-css-contract.mjs`](../../scripts/check-css-contract.mjs):

```js
import fs from "node:fs";

const css = fs.readFileSync("src/styles/global.css", "utf8");
const required = [
  "--color-bg",
  "--color-surface",
  "--color-ink",
  "--color-accent",
  "--content-max",
  "@media (prefers-reduced-motion: reduce)",
  "@media print",
];
const missing = required.filter((token) => !css.includes(token));
if (missing.length > 0) {
  console.error(`Missing CSS contract tokens: ${missing.join(", ")}`);
  process.exit(1);
}
```

Add an npm script:

```json
"check:css": "node scripts/check-css-contract.mjs"
```

- [ ] **Step 2: Define root variables and reset.**

Use near-black/green-black ink, a neutral page background, elevated surfaces, muted text, a restrained accent, and visible rules. Apply `box-sizing: border-box`, remove default body margin, set a system sans-serif body stack, and set consistent body line-height. Use `:focus-visible` outlines with sufficient contrast.

- [ ] **Step 3: Style the desktop layout.**

At widths above 960px:

- Center `.app-shell` at `--content-max`.
- Use `.layout-grid { display: grid; grid-template-columns: var(--rail-width) minmax(0, 1fr); }`.
- Keep navigation/status rail sticky within the viewport where it does not interfere with print.
- Use a wider reading column for profile and sections.
- Apply stable surfaces and spacing so terminal output does not move primary content unexpectedly.

- [ ] **Step 4: Style header, contact links, sections, projects, skills, and achievements.**

Use one strong `h1`, a visually distinct role/aspiration line, readable summary width, compact link row, consistent section headings, technology tags, project cards, skill category groupings, and achievement list rhythm. Do not use icon-only links or decorative copy that is not present in profile data.

- [ ] **Step 5: Run CSS contract validation and tests.**

```bash
npm run check:css && npm run test:run
```

Expected: PASS.

### Task 2: Implement tablet/mobile responsive behavior

- [ ] **Step 1: Add tablet breakpoint.**

Between 700px and 959px, collapse the rail into a compact horizontal navigation/control row, keep the reading surface fluid, and allow contact/project metadata to wrap naturally.

- [ ] **Step 2: Add mobile breakpoint.**

Below 699px:

- Use one column.
- Remove fixed rail widths.
- Reduce side padding without reducing readable text size below the defined body token.
- Make buttons and terminal input at least 44px high.
- Allow contact links, tags, and education metadata to wrap.
- Set `overflow-wrap: anywhere` only on long URLs and terminal output.
- Prevent horizontal page overflow.

- [ ] **Step 3: Add reduced-motion rules.**

Add:

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    scroll-behavior: auto !important;
    transition-duration: 0.01ms !important;
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
  }
}
```

- [ ] **Step 4: Add responsive test assertions.**

In [`src/styles/accessibility.test.tsx`](../../src/styles/accessibility.test.tsx), assert skip link, labelled terminal input, visible button labels, descriptive external link names, and `aria-current` behavior. CSS viewport behavior remains a browser verification step.

- [ ] **Step 5: Run tests and build.**

```bash
npm run test:run && npm run build
```

Expected: PASS.

### Task 3: Implement print output

- [ ] **Step 1: Add A4 page and print rules.**

Use:

```css
@page {
  size: A4;
  margin: 14mm;
}

@media print {
  html,
  body {
    background: #fff;
    color: #000;
  }

  .screen-only,
  .section-nav,
  .terminal-panel,
  .print-controls,
  .decorative-console {
    display: none !important;
  }

  .app-shell,
  .layout-grid,
  .reading-column {
    display: block;
    max-width: none;
    width: auto;
    margin: 0;
    padding: 0;
    box-shadow: none;
    background: #fff;
  }

  a {
    color: inherit;
    text-decoration: underline;
  }

  article,
  section {
    break-inside: avoid;
    page-break-inside: avoid;
  }
}
```

- [ ] **Step 2: Keep useful print links visible.**

Ensure phone, email, LinkedIn, GitHub, and the approved CV demo link remain readable/selectable in print. If URL text is visually hidden on screen, add a `.print-only` text representation instead of relying on generated CSS content.

- [ ] **Step 3: Add print regression assertions.**

Assert that the DOM retains all required headings, project details, contact links, and the approved CV demo URL; CSS contract validation confirms `@page` and `@media print` are present.

- [ ] **Step 4: Run print contract, tests, and build.**

```bash
npm run check:css && npm run test:run && npm run build
```

Expected: PASS.

- [ ] **Step 5: Commit visual/accessibility/print work.**

```bash
git add src/styles/global.css src/components src/features/terminal/TerminalPanel.tsx scripts/check-css-contract.mjs package.json src/styles/accessibility.test.tsx
git commit -m "style: make interactive CV responsive and printable"
```

## Completion Gate

- Desktop, tablet, and mobile layout rules exist.
- Keyboard and reduced-motion requirements are encoded.
- Print output hides only interactive chrome and preserves CV content.
- CSS contract and automated tests pass.
- No horizontal overflow is introduced by long contact URLs, project tags, or terminal lines.
