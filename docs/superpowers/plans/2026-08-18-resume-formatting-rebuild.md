# Resume HTML Formatting Rebuild Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the Canva-exported resume page with a semantic, self-contained, monochrome HTML resume that prints cleanly on one A4 page.

**Architecture:** Rebuild the existing HTML document as a standalone document instead of overriding its generated coordinate-based layout. One focused file will contain semantic resume markup and its scoped stylesheet; CSS Grid handles education and skills, while print-specific CSS establishes A4 pagination and prevents individual entries splitting.

**Tech Stack:** HTML5, native CSS, CSS Grid, CSS custom properties, browser print preview.

## Global Constraints

- Modify only `Black and White Clean Professional A4 Resume.html`; do not edit the PPTX, PDF, Canva asset directory, or unrelated website files.
- Preserve all existing resume wording, dates, qualifications, technologies, project statements, skills, and achievement statements.
- Do not add facts, achievements, experience claims, images, color accents, animations, JavaScript, or external dependencies.
- Preserve a black-and-white visual style using near-black text, gray rules, and a white page.
- Produce a single A4 page at 100% scale in browser print preview; do not solve overflow by making body text unreasonably small.
- The final file must be self-contained and must not load Canva CSS, JavaScript, fonts, scripts, footer, terms, or privacy modal markup.
- Support normal browser viewing and narrow screens; print remains the primary presentation.

---

## File Structure

- Modify: `Black and White Clean Professional A4 Resume.html`
  - Owns the entire final document: metadata, a single embedded stylesheet, semantic resume content, screen responsiveness, and print rules.
  - No new source files are needed because the document is intentionally portable and static.
- Inspect only: `about.md`
  - Cross-checks the intended wording of the summary, capability groups, projects, qualifications, and achievements if source extraction from the exported HTML is difficult.
- Inspect only: `docs/superpowers/specs/2026-08-18-resume-formatting-design.md`
  - Defines the approved document structure, layout rules, and acceptance criteria.

## Validation Method

There is no application runtime or automated test framework in this static HTML workspace. Validation is performed with the browser developer tools, DOM inspection, responsive preview, and browser print preview. Do not introduce a test framework for this one-document formatting correction.

### Task 1: Establish the self-contained semantic document and preserve resume content

**Files:**
- Modify: `Black and White Clean Professional A4 Resume.html`
- Inspect: `about.md:9-43`
- Inspect: `docs/superpowers/specs/2026-08-18-resume-formatting-design.md:1-94`

**Interfaces:**
- Consumes: Existing resume wording in `Black and White Clean Professional A4 Resume.html` and corroborating content from `about.md`.
- Produces: A valid, dependency-free HTML5 document with structured resume content that Task 2 styles.

- [ ] **Step 1: Record the text that must be retained before removing the export markup**

Create a scratch checklist outside the repository or use the editor selection to confirm these content groups before replacing the document:

```text
Identity
- Edward Chan
- IT Operations, Cybersecurity & Automation Assistant
- Existing phone number, email address, and GitHub URL

Sections
- Professional Summary
- Education
- Projects
- Skills
- Achievements

Education
- Higher Diploma in Data Science (CLAP-TECH Pathway)
- Tech Basics (CLAP-TECH Pathway)
- Secondary Education

Projects
- Security Log Analysis & Incident Response Simulation | Splunk BOTS
- Automated Data Parsing Desktop Application | Python, PyQt
- Real-Time Input-Translation Engine | C#
- Serverless Web Functions | JavaScript, Cloudflare Workers

Achievements
- Top 10 Finisher — Splunk Boss of the SOC (BOTS) (2025)
- Distinction - Canadian Computing Competition (2025)
```

- [ ] **Step 2: Replace the Canva export shell with a standards-compliant HTML5 document shell**

Rewrite the file from `<!doctype html>` through `</html>`. Keep only a compact document head and one empty style block ready for Task 2:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="Resume of Edward Chan, IT Operations, Cybersecurity, and Automation Assistant.">
    <title>Edward Chan — Resume</title>
    <style>
      /* Task 2 adds all styling here. */
    </style>
  </head>
  <body>
    <div class="resume-page">
      <!-- Task 1 adds the semantic resume content here. -->
    </div>
  </body>
</html>
```

- [ ] **Step 3: Add semantic header, contact, and summary markup**

Inside `.resume-page`, add a header followed by a summary section. Use clickable links for phone, email, and GitHub. Keep the exact existing contact values; use the displayed GitHub URL as the link text.

```html
<header class="resume-header">
  <h1>Edward Chan</h1>
  <p class="headline">IT Operations, Cybersecurity & Automation Assistant</p>
  <address class="contact-list">
    <a href="tel:+85255117745">+852 5511 7745</a>
    <a href="mailto:edwardcc082009@gmail.com">edwardcc082009@gmail.com</a>
    <a href="https://github.com/lmaodick1239">github.com/lmaodick1239</a>
  </address>
</header>

<main>
  <section class="resume-section" aria-labelledby="summary-heading">
    <h2 id="summary-heading">Professional Summary</h2>
    <p>Computer Science and IT student with hands-on experience in SIEM-based event-log analysis, incident-response workflows, network fundamentals, Python automation, and application development. Analyzed raw event logs and reconstructed multi-stage attack scenarios in Splunk Boss of the SOC (BOTS), finishing in the Top 10 in 2025. Also developed Python and C# tools, PyQt desktop applications, and serverless functions, bringing a practical programming and automation mindset to IT operations and security problem-solving.</p>
  </section>
</main>
```

- [ ] **Step 4: Add Education and Projects as independent semantic entries**

Add a section for Education containing three `.education-entry` articles. Each article contains a `.entry-meta` div for date and institution, plus a `.entry-content` div for qualification title and detail text. Add a Projects section containing four `.project-entry` articles with one `h3` and one `ul` each.

Use this markup shape for every education entry:

```html
<article class="education-entry">
  <div class="entry-meta">
    <p class="entry-date">2026–2028</p>
    <p>Hong Kong Baptist University - School of Continuing Education</p>
  </div>
  <div class="entry-content">
    <h3>Higher Diploma in Data Science (CLAP-TECH Pathway)</h3>
    <p>Expected Start Date: 2026/09/01</p>
  </div>
</article>
```

Use this markup shape for every project entry:

```html
<article class="project-entry">
  <h3>Security Log Analysis & Incident Response Simulation | Splunk BOTS</h3>
  <ul>
    <li>Analyzed raw event logs in a competitive SIEM environment to investigate simulated enterprise security incidents.</li>
    <li>Executed incident-response workflows and reconstructed multi-stage attack scenarios.</li>
    <li>Achieved a Top 10 finish in Splunk Boss of the SOC (BOTS), 2025.</li>
  </ul>
</article>
```

Populate the remaining entries using the exact source wording. Preserve the Tech Basics qualification details, secondary education results, and the two or three bullets associated with each remaining project.

- [ ] **Step 5: Add Skills and Achievements markup and close the document hierarchy**

Add a Skills section containing `ul.skills-list` with three `li` entries. Each entry must preserve the existing skill group label and technologies. Add an Achievements section containing an unordered list with the two original achievement statements.

```html
<section class="resume-section" aria-labelledby="skills-heading">
  <h2 id="skills-heading">Skills</h2>
  <ul class="skills-list">
    <li><strong>Cybersecurity & IT Operations:</strong> Splunk SIEM, event-log analysis, incident-response workflows, network fundamentals</li>
    <li><strong>Programming:</strong> Python, C#, JavaScript</li>
    <li><strong>Data & Automation:</strong> PyQt, Pandas, Excel, data parsing, data formatting</li>
  </ul>
</section>

<section class="resume-section achievements" aria-labelledby="achievements-heading">
  <h2 id="achievements-heading">Achievements</h2>
  <ul>
    <li>Top 10 Finisher — Splunk Boss of the SOC (BOTS) (2025)</li>
    <li>Distinction - Canadian Computing Competition (2025)</li>
  </ul>
</section>
```

Ensure `<main>` closes after all resume sections and `.resume-page`, `body`, and `html` close in that order.

- [ ] **Step 6: Validate semantic content and dependency removal in a browser**

Open `Black and White Clean Professional A4 Resume.html` in a browser and use the Elements panel. Verify:

```text
- There is exactly one h1 with Edward Chan.
- Each resume section has an h2 and an aria-labelledby value that points to it.
- Education and projects are represented by article elements.
- Contact information contains tel:, mailto:, and GitHub links.
- No network requests target Canva CSS, JavaScript, _footer, or _assets.
- No footer, Terms & Support modal, or Privacy Policy modal is visible or present.
- All source text from the Step 1 checklist is visible.
```

- [ ] **Step 7: Commit the semantic content baseline**

```bash
git add "Black and White Clean Professional A4 Resume.html"
git commit -m "refactor: replace Canva resume export markup"
```

### Task 2: Add the monochrome A4 layout, typography, and responsive behavior

**Files:**
- Modify: `Black and White Clean Professional A4 Resume.html`
- Inspect: `docs/superpowers/specs/2026-08-18-resume-formatting-design.md:15-73`

**Interfaces:**
- Consumes: Semantic classes from Task 1: `.resume-page`, `.resume-header`, `.contact-list`, `.resume-section`, `.education-entry`, `.entry-meta`, `.entry-content`, `.project-entry`, `.skills-list`, and `.achievements`.
- Produces: Screen and responsive visual presentation. Task 3 adds print-specific rules to this stylesheet.

- [ ] **Step 1: Add global reset, custom properties, and baseline typography to the existing style block**

Replace the Task 1 style comment with the following foundational rules:

```css
:root {
  --ink: #171e1c;
  --muted-ink: #4d5652;
  --rule: #87908c;
  --paper: #ffffff;
  --screen: #ecefed;
  --page-width: 210mm;
  --page-height: 297mm;
  --page-padding-x: 15mm;
  --page-padding-y: 13mm;
}

* {
  box-sizing: border-box;
}

html {
  background: var(--screen);
}

body {
  margin: 0;
  color: var(--ink);
  background: var(--screen);
  font-family: Arial, Helvetica, sans-serif;
  font-size: 9.35pt;
  line-height: 1.28;
}

a {
  color: inherit;
  text-decoration: none;
}

a:hover,
a:focus-visible {
  text-decoration: underline;
  text-underline-offset: 0.14em;
}
```

- [ ] **Step 2: Implement the centered A4 page and compact header**

Add the page and header rules. Do not use absolute positioning, transforms, fixed heights for individual content blocks, or pixel-based placement.

```css
.resume-page {
  width: var(--page-width);
  min-height: var(--page-height);
  margin: 10mm auto;
  padding: var(--page-padding-y) var(--page-padding-x);
  background: var(--paper);
  box-shadow: 0 1mm 5mm rgb(23 30 28 / 18%);
}

.resume-header {
  padding-bottom: 3.5mm;
  border-bottom: 0.35mm solid var(--rule);
}

.resume-header h1 {
  margin: 0;
  font-size: 26pt;
  line-height: 1;
  letter-spacing: 0.075em;
  text-transform: uppercase;
}

.headline {
  margin: 2.2mm 0 3.1mm;
  font-size: 12pt;
  letter-spacing: 0.025em;
}

.contact-list {
  display: flex;
  flex-wrap: wrap;
  gap: 1.25mm 6mm;
  margin: 0;
  color: var(--muted-ink);
  font-size: 8.6pt;
  font-style: normal;
}
```

- [ ] **Step 3: Implement section, education, project, skill, and achievement component rules**

Add the following component rules. They preserve visual hierarchy while controlling vertical density for a one-page document.

```css
.resume-section {
  margin-top: 3.3mm;
}

.resume-section h2 {
  margin: 0 0 1.65mm;
  padding-bottom: 1.2mm;
  border-bottom: 0.3mm solid var(--rule);
  font-size: 12pt;
  line-height: 1.1;
  letter-spacing: 0.035em;
  text-transform: uppercase;
}

.resume-section > p {
  margin: 0;
}

.education-entry {
  display: grid;
  grid-template-columns: 30mm minmax(0, 1fr);
  gap: 3.5mm;
  margin-top: 1.9mm;
}

.entry-meta p,
.entry-content p {
  margin: 0;
}

.entry-meta {
  color: var(--muted-ink);
  font-size: 7.6pt;
  line-height: 1.2;
}

.entry-meta .entry-date {
  margin-bottom: 0.5mm;
  color: var(--ink);
}

.entry-content h3,
.project-entry h3 {
  margin: 0;
  font-size: 9.3pt;
  line-height: 1.2;
}

.entry-content p {
  margin-top: 0.55mm;
  font-size: 7.7pt;
  line-height: 1.2;
}

.project-entry {
  margin-top: 1.8mm;
}

.project-entry ul,
.achievements ul {
  margin: 0.75mm 0 0;
  padding-left: 4.5mm;
}

.project-entry li,
.achievements li {
  margin: 0.25mm 0;
}

.skills-list {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  column-gap: 6mm;
  row-gap: 0.7mm;
  margin: 0;
  padding-left: 4.5mm;
}

.skills-list li {
  padding-left: 0.25mm;
}
```

- [ ] **Step 4: Add narrow-screen fallback behavior**

Add a `max-width: 720px` media query after the component rules. It must remove the page-like fixed dimensions and reduce padding while retaining readable hierarchy.

```css
@media screen and (max-width: 720px) {
  html,
  body {
    background: var(--paper);
  }

  body {
    font-size: 10pt;
  }

  .resume-page {
    width: 100%;
    min-height: 0;
    margin: 0;
    padding: 7mm 5.5mm;
    box-shadow: none;
  }

  .resume-header h1 {
    font-size: 22pt;
  }

  .education-entry,
  .skills-list {
    grid-template-columns: 1fr;
  }

  .education-entry {
    gap: 0.8mm;
  }
}
```

- [ ] **Step 5: Validate visual layout on desktop and narrow screen widths**

In browser responsive mode, inspect at 1280px and 390px viewport widths. Verify:

```text
Desktop
- The A4 sheet is centered on a neutral screen background.
- Header, section rules, and body content share the same horizontal edges.
- Contact links wrap only when needed and remain selectable.
- Education dates form a stable left column.
- Projects have uniform title-to-bullet spacing.
- Skills form two balanced columns without overlap.

Narrow screen
- The sheet fills the viewport without horizontal scrolling.
- Education and Skills collapse to one column.
- No text, rules, or links are clipped.
- Font size remains readable without zooming.
```

- [ ] **Step 6: Commit the screen and responsive layout**

```bash
git add "Black and White Clean Professional A4 Resume.html"
git commit -m "style: add responsive resume layout"
```

### Task 3: Complete A4 print rules and verify page fit

**Files:**
- Modify: `Black and White Clean Professional A4 Resume.html`
- Inspect: `docs/superpowers/specs/2026-08-18-resume-formatting-design.md:52-87`

**Interfaces:**
- Consumes: The self-contained semantic markup and class selectors built in Tasks 1 and 2.
- Produces: A4 print output with one page, preserved entry boundaries, no screen-only presentation, and monochrome output.

- [ ] **Step 1: Add explicit page setup and print media rules**

Append the following CSS after the narrow-screen query:

```css
@page {
  size: A4;
  margin: 0;
}

@media print {
  html,
  body {
    width: var(--page-width);
    height: var(--page-height);
    background: var(--paper);
  }

  body {
    font-size: 9.35pt;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }

  .resume-page {
    width: var(--page-width);
    min-height: var(--page-height);
    margin: 0;
    padding: var(--page-padding-y) var(--page-padding-x);
    box-shadow: none;
  }

  .education-entry,
  .project-entry,
  .skills-list,
  .achievements {
    break-inside: avoid;
    page-break-inside: avoid;
  }

  a {
    text-decoration: none;
  }
}
```

- [ ] **Step 2: Inspect browser print preview at A4 and 100% scale**

Open browser print preview with these settings:

```text
Paper size: A4
Scale: Default or 100%
Margins: None
Headers and footers: Off
Background graphics: On if the browser exposes the option
```

Verify all of the following:

```text
- Exactly one page is produced.
- Page content has consistent white margins around all sides.
- Header content remains fully visible.
- No section heading appears detached from its first item.
- No education or project article splits between pages.
- Skills and achievements remain visible on the page.
- The page contains no Canva branding, terms links, privacy links, or extra footer.
- Text contrast and rules remain legible in monochrome print preview.
```

- [ ] **Step 3: Correct only measured overflow or excessive whitespace**

If preview creates a second page, tighten in this order, rechecking after each one change:

```css
/* First adjustment: reduce section separation slightly. */
.resume-section { margin-top: 3mm; }

/* Second adjustment: reduce entry spacing slightly. */
.education-entry,
.project-entry { margin-top: 1.5mm; }

/* Third adjustment: reduce page vertical padding slightly. */
:root { --page-padding-y: 11.5mm; }
```

If the page has excessive unused space, increase spacing in the inverse order without changing body font size first. Do not reduce body text below `9pt` and do not delete source content.

- [ ] **Step 4: Re-run screen and print acceptance checks after adjustments**

Use this final checklist:

```text
Structure
- HTML has one embedded stylesheet and no external CSS or scripts.
- The document contains header, main, sections, education articles, and project articles.

Content
- Existing wording, dates, education results, technologies, and achievement statements are preserved.
- Phone, email, and GitHub values are functional links.

Screen
- Desktop A4 appearance is balanced.
- Narrow-screen layout has no horizontal overflow or clipped content.

Print
- A4 preview produces one page at 100% scale.
- No overlap, clipping, unexpected page break, shadow, or browser footer appears.
- Individual education and project entries do not split.
```

- [ ] **Step 5: Commit the print-ready final version**

```bash
git add "Black and White Clean Professional A4 Resume.html"
git commit -m "style: finalize A4 resume print layout"
```

### Task 4: Final content and change review

**Files:**
- Inspect: `Black and White Clean Professional A4 Resume.html`
- Inspect: `docs/superpowers/specs/2026-08-18-resume-formatting-design.md:1-94`

**Interfaces:**
- Consumes: The completed single-file resume from Tasks 1–3.
- Produces: A reviewed, scope-compliant HTML resume ready for handoff.

- [ ] **Step 1: Review the final document against the approved specification**

Compare the document directly against the specification and confirm each required element:

```text
- Semantic single-column structure.
- White A4 sheet, monochrome typography, and subtle gray rules.
- Compact identity and contact header.
- Summary, Education, Projects, Skills, and Achievements sections.
- Grid-based Education and Skills layouts.
- Responsive single-column fallback.
- Self-contained file without Canva resources or behavior.
- One-page A4 print result.
```

- [ ] **Step 2: Perform a source-level forbidden-content scan**

Use the editor search in `Black and White Clean Professional A4 Resume.html` for each token below. Each must return zero matches:

```text
canva
_footer
_assets
<script
<link rel="stylesheet"
modal
footer-overflow-container
```

The lowercase `canva` scan catches inherited export metadata and Canva support copy. The `script` and external stylesheet scans confirm the document remains static and self-contained.

- [ ] **Step 3: Review the final diff for scope control**

Run:

```bash
git diff --check
git diff -- "Black and White Clean Professional A4 Resume.html"
```

Expected:

```text
- git diff --check exits without whitespace errors.
- The only intentional modified source file is Black and White Clean Professional A4 Resume.html.
- The diff removes generated Canva content and replaces it with the approved static semantic document.
```

- [ ] **Step 4: Commit the verified handoff state if final review required corrections**

Run this only if Steps 1–3 produced a correction after Task 3:

```bash
git add "Black and White Clean Professional A4 Resume.html"
git commit -m "chore: verify resume formatting rebuild"
```

## Plan Self-Review

### Spec coverage

- Semantic document replacement and removal of Canva dependencies: Task 1.
- Header, section hierarchy, education grid, projects, skills grid, and achievements: Tasks 1 and 2.
- Monochrome style, A4 dimensions, responsive fallback, and print-specific behavior: Tasks 2 and 3.
- One-page verification, page-break handling, content preservation, and final scope validation: Tasks 3 and 4.
- Excluded files and no content rewriting: Global Constraints and Task 4.

### Placeholder scan

The plan has no deferred implementation placeholders. Every task identifies the exact target file, markup/CSS shape, validation checks, and commit command. Text that needs preservation is explicitly identified rather than delegated to undefined follow-up work.

### Interface consistency

All later CSS tasks use the class names introduced in Task 1: `.resume-page`, `.resume-header`, `.contact-list`, `.resume-section`, `.education-entry`, `.entry-meta`, `.entry-content`, `.project-entry`, `.skills-list`, and `.achievements`.
