# Resume Visual Rhythm Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rework the existing resume HTML into a consistent one-page A4 layout with unified typography, line-height, and spacing.

**Architecture:** Keep the existing semantic content and self-contained document, but replace the current CSS rhythm and Skills markup. Use one single-column flow for Summary, Projects, Skills, and Achievements; use only Education's aligned date/details grid. All visual values are controlled by a small set of CSS custom properties.

**Tech Stack:** HTML5, native CSS, CSS custom properties, CSS Grid, browser print preview.

## Global Constraints

- Modify only `Black and White Clean Professional A4 Resume.html`.
- Preserve the existing resume wording, contact values, technologies, URLs, dates, and achievements.
- Keep the output exactly one A4 page with 14mm horizontal and 12mm vertical print padding.
- Use one body size of `9.5pt` and one body line-height of `1.35` across screen and print.
- Use a 21pt name, 10.5pt professional title, and identical 11pt section headings.
- Stack Projects, Skills, and Achievements vertically; Education alone may use a two-column internal grid.
- Do not add external CSS, JavaScript, Canva assets, icons, colors, animations, or content claims.

---

### Task 1: Replace the CSS with a unified rhythm system

**Files:**
- Modify: `Black and White Clean Professional A4 Resume.html:8-246`

**Interfaces:**
- Consumes: Existing semantic selectors `.resume-page`, `.resume-header`, `.headline`, `.contact-list`, `.resume-section`, `.education-entry`, `.entry-meta`, `.entry-content`, `.project-entry`, `.skills-list`, `.portfolio`, and `.achievements`.
- Produces: A single consistent typography and spacing system for the existing content.

- [ ] Replace the current style block with CSS using these exact values:

```css
:root {
  --ink: #171e1c;
  --muted-ink: #53605a;
  --rule: #9aa39e;
  --paper: #fff;
  --screen: #eef0ee;
  --page-width: 210mm;
  --page-height: 297mm;
  --page-padding-x: 14mm;
  --page-padding-y: 12mm;
  --body-size: 9.5pt;
  --body-leading: 1.35;
  --space-intra: 4px;
  --space-entry: 10px;
  --space-section: 18px;
  --space-heading: 5px;
}

* { box-sizing: border-box; }
html { background: var(--screen); }
body {
  margin: 0;
  color: var(--ink);
  background: var(--screen);
  font-family: Arial, Helvetica, sans-serif;
  font-size: var(--body-size);
  line-height: var(--body-leading);
}
a { color: inherit; text-decoration: none; }
a:hover, a:focus-visible { text-decoration: underline; text-underline-offset: .14em; }
.resume-page {
  width: var(--page-width);
  min-height: var(--page-height);
  margin: 10mm auto;
  padding: var(--page-padding-y) var(--page-padding-x);
  background: var(--paper);
}
.resume-header {
  padding-bottom: 12px;
  border-bottom: 1px solid var(--rule);
}
.resume-header h1 {
  margin: 0;
  font-size: 21pt;
  line-height: 1.05;
  letter-spacing: .06em;
  text-transform: uppercase;
}
.headline {
  margin: 4px 0 8px;
  font-size: 10.5pt;
  line-height: var(--body-leading);
}
.contact-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0 8px;
  margin: 0;
  color: var(--muted-ink);
  font-size: var(--body-size);
  font-style: normal;
}
.contact-list a:not(:last-child)::after {
  content: '|';
  margin-left: 8px;
  color: var(--rule);
}
.resume-section { margin-top: var(--space-section); }
.resume-section h2 {
  margin: 0 0 var(--space-heading);
  padding-bottom: 4px;
  border-bottom: 1px solid var(--rule);
  font-size: 11pt;
  line-height: 1.1;
  letter-spacing: .04em;
  text-transform: uppercase;
}
.resume-section > p { margin: 0; }
.education-entry {
  display: grid;
  grid-template-columns: 28mm minmax(0, 1fr);
  gap: 10px;
  margin-top: var(--space-entry);
  break-inside: avoid;
  page-break-inside: avoid;
}
.entry-meta,
.entry-content,
.entry-meta p,
.entry-content p { margin: 0; }
.entry-meta { color: var(--muted-ink); }
.entry-meta .entry-date { color: var(--ink); font-weight: 700; }
.entry-content h3,
.project-entry h3 {
  margin: 0;
  font-size: var(--body-size);
  line-height: var(--body-leading);
  font-weight: 700;
}
.entry-content p + p { margin-top: var(--space-intra); }
.project-entry {
  margin-top: var(--space-entry);
  break-inside: avoid;
  page-break-inside: avoid;
}
.project-entry ul,
.achievements ul {
  margin: var(--space-intra) 0 0;
  padding-left: 18px;
}
.project-entry li,
.achievements li { margin: 0; }
.project-entry li + li,
.achievements li + li { margin-top: var(--space-intra); }
.skills-list {
  display: block;
  margin: 0;
  padding: 0;
  list-style: none;
}
.skills-list li { margin: 0; }
.skills-list li + li { margin-top: var(--space-intra); }
.portfolio {
  margin: var(--space-intra) 0 0;
  color: var(--muted-ink);
}
@media screen and (max-width: 720px) {
  html, body { background: var(--paper); }
  .resume-page {
    width: 100%;
    min-height: 0;
    margin: 0;
    padding: 8mm 6mm;
  }
  .education-entry { grid-template-columns: 1fr; gap: var(--space-intra); }
  .contact-list { row-gap: var(--space-intra); }
}
@page { size: A4; margin: 0; }
@media print {
  html, body {
    width: var(--page-width);
    height: var(--page-height);
    background: var(--paper);
  }
  .resume-page {
    width: var(--page-width);
    min-height: var(--page-height);
    margin: 0;
    padding: var(--page-padding-y) var(--page-padding-x);
  }
  a { text-decoration: none; }
}
```

- [ ] Verify no old selector still overrides the new system, especially `.skills-list` grid rules, tiny entry-specific font sizes, or separate print font sizes.

### Task 2: Validate the redesigned document

**Files:**
- Inspect: `Black and White Clean Professional A4 Resume.html`

- [ ] Run a Python HTMLParser check that asserts one `h1`, one `main`, five sections, seven articles, four links, required resume text, no Canva tokens, and required CSS tokens.
- [ ] Confirm Skills has no `grid-template-columns` rule and that all project/achievement list items use the shared body line-height.
- [ ] Confirm the file contains no `<script>`, external `<link>`, modal, footer, or Canva asset references.
- [ ] Open browser print preview manually at A4, 100% scale, with headers and footers disabled. Verify one page, comfortable margins, uniform line spacing, no clipped content, and no awkward project/skills wrapping.
- [ ] If the page is slightly too tall, reduce only `--space-entry` or `--space-section`; do not introduce a second font scale.

### Self-review

The plan covers the approved spec: page geometry, unified typography, spacing tokens, header, identical section headings, aligned education rows, stacked projects, stacked skills, stacked achievements, responsive behavior, print behavior, preserved content, and source-level verification. No additional files or dependencies are required.
