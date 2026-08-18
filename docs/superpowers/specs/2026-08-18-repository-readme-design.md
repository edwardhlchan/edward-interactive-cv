# Repository README Documentation Design

## Goal

Replace the outdated personal skills-summary [`README.md`](../../../README.md:1) with a balanced repository README that introduces the interactive CV to portfolio visitors and gives developers enough information to install, validate, run, print, and deploy it.

## Audience

The README serves two audiences in this order:

1. Recruiters, collaborators, and GitHub visitors who need to understand what the project is and what it demonstrates.
2. Developers and maintainers who need reliable setup, testing, deployment, and content-update instructions.

## Scope

The implementation will rewrite only [`README.md`](../../../README.md:1). This specification is a separate planning record. The README will describe the implementation that already exists; it will not change application behavior, profile content, dependencies, deployment configuration, or validation scripts.

## Approved Structure

### 1. Project introduction

State that the repository contains Edward Chan’s interactive CV, built as a data-driven React/TypeScript application with Vite and deployed as Cloudflare static assets. Mention the professional focus on IT operations, cybersecurity, automation, and data tooling without duplicating the entire CV.

### 2. Project highlights

Document the observable capabilities:

- Interactive section navigation and terminal-style commands.
- Componentized CV sections driven by [`profile`](../../../src/data/profile.ts:45).
- Accessible landmarks and skip navigation.
- Live project/contact links.
- A4 portrait, black-and-white, ATS-friendly browser Print to PDF output with interactive UI hidden.

### 3. Technology stack

List the actual repository technologies:

- React 19 and TypeScript.
- Vite for development and production bundling.
- Vitest, Testing Library, and jsdom for tests.
- Cloudflare Workers/Wrangler for local worker testing and deployment.
- CSS print media rules for PDF output.

### 4. Quick start

Provide the exact commands:

```bash
npm install
npm run dev
```

Explain that Vite serves the interactive application locally and show the usual local URL without claiming an unverified custom domain.

Include the worker-backed local workflow separately:

```bash
npm run worker:dev
```

Explain that this builds the application and starts Wrangler on `http://localhost:8787`.

### 5. Repository structure

Give a concise table or bullet map for the real files:

- [`src/data/profile.ts`](../../../src/data/profile.ts:45) — canonical CV data and types.
- [`src/components/`](../../../src/components/AppShell.tsx:12) — shell, header, sections, lists, links, and controls.
- [`src/features/terminal/`](../../../src/features/terminal/TerminalPanel.tsx:1) — terminal UI and command handling.
- [`src/styles/global.css`](../../../src/styles/global.css:1) — screen layout, responsive rules, accessibility styling, and print rules.
- [`src/*.test.tsx`](../../../src/components/CVLayout.test.tsx:1) and related tests — UI/content/accessibility coverage.
- [`scripts/`](../../../scripts/check-css-contract.mjs:1) — CSS, content, and route verification.
- [`worker/index.ts`](../../../worker/index.ts:1) and [`wrangler.toml`](../../../wrangler.toml:1) — Cloudflare Worker/static asset configuration.

### 6. Validation

Document the exact checks from [`package.json`](../../../package.json:7):

```bash
npm run build
npm run check:css
npm run check:content
npm run check:routes
npm run test:run
```

Note that `check:routes` expects the local worker to be running on port 8787, so it should be run in a second terminal after `npm run worker:dev`.

Also document the combined test command as an optional watch-mode workflow:

```bash
npm test
```

### 7. Print to PDF

Explain the user workflow:

1. Open the application in a browser.
2. Use the Print CV control or the browser print command.
3. Select A4 paper, Portrait orientation, and default/100% scale.
4. Disable background graphics for a clean monochrome result.
5. Save as PDF.

State the expected result: one or two pages, black text on white paper, selectable/searchable text, visible contact/project links, and no navigation rail, terminal, status chrome, or interactive controls. Explain that print rules in [`global.css`](../../../src/styles/global.css:154) protect education/project entries from awkward internal page breaks.

### 8. Deployment

Provide the exact command:

```bash
npm run deploy
```

Explain that this builds the Vite output and invokes Wrangler using [`wrangler.toml`](../../../wrangler.toml:1). State that Cloudflare authentication and an account with permission for the configured Worker are required.

### 9. Updating CV content

Direct maintainers to edit [`profile`](../../../src/data/profile.ts:45), which is the single source of truth for identity, contact links, education, projects, skills, and achievements. Recommend running the full validation sequence after content changes.

## Accuracy Constraints

- Do not claim a specific live custom domain that is not present in the repository configuration.
- Do not describe a DSE calculator as a separate route; the current project links are part of the profile data.
- Do not claim server-side PDF generation; PDF output is browser print CSS.
- Keep all commands exactly aligned with [`package.json`](../../../package.json:7).
- Keep the README concise enough to scan while retaining operational instructions.

## Acceptance Criteria

1. The README opens with the current project purpose rather than a generic personal skills list.
2. A visitor can understand the portfolio’s professional focus and key technical capabilities.
3. A developer can install dependencies, run the Vite app, run the Worker workflow, validate the project, and deploy it using only README instructions.
4. Print-to-PDF instructions explicitly cover A4, portrait, monochrome output, ATS-readable text, and hidden interactive UI.
5. File references and commands point to existing repository paths/scripts.
6. No stale contact, route, deployment, or framework claims are introduced.
7. The implementation changes only [`README.md`](../../../README.md:1); planning records remain separate from the repository README deliverable.
