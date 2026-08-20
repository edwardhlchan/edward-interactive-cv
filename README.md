# Edward Chan — Interactive CV

A data-driven interactive CV and portfolio for **Edward Chan**, focused on IT operations, cybersecurity, automation, and practical data tooling.

The application combines a responsive React interface, terminal-style navigation, and a browser-printable CV. It is built with Vite and deployed as static assets through Cloudflare Workers.

## Highlights

- Interactive CV sections with anchored navigation and terminal-style commands.
- Structured profile content maintained in one source of truth.
- Accessible landmarks, skip navigation, labelled controls, and keyboard-friendly interaction.
- Professional contact and project links.
- A4 portrait, black-and-white, ATS-friendly Print to PDF output.
- Print styles hide interactive-only UI and protect education and project records from awkward internal page breaks.

## Technology Stack

- **Frontend:** React 19, TypeScript, CSS
- **Build tooling:** Vite
- **Testing:** Vitest, Testing Library, jsdom
- **Deployment:** Cloudflare Workers and Wrangler
- **Print output:** CSS `@page` and `@media print` rules

## Quick Start

### Prerequisites

- Node.js 24 or a compatible current Node.js release
- npm

Install dependencies and start the Vite development server:

```bash
npm install
npm run dev
```

Vite prints the local development URL in the terminal, typically `http://localhost:5173`.

### Run through the Cloudflare Worker

Build the application and serve it through Wrangler's local Worker environment:

```bash
npm run worker:dev
```

The Worker is available at `http://localhost:8787`.

## Project Structure

| Path | Purpose |
| --- | --- |
| [`src/data/profile.ts`](src/data/profile.ts) | Canonical CV data, including identity, contact links, education, projects, skills, and achievements. |
| [`src/components/`](src/components/) | CV shell, header, sections, lists, links, navigation, and print control components. |
| [`src/features/terminal/`](src/features/terminal/) | Terminal-style interface and command handling. |
| [`src/styles/global.css`](src/styles/global.css) | Screen layout, responsive styles, accessibility styling, and A4 print rules. |
| [`src/**/*.test.*`](src/) | Component, content, terminal, and accessibility tests. |
| [`scripts/`](scripts/) | CSS, profile-content, and live-route verification scripts. |
| [`worker/index.ts`](worker/index.ts) | Cloudflare Worker entry point. |
| [`wrangler.toml`](wrangler.toml) | Cloudflare Worker and static-asset configuration. |

## Validation

Run the local preflight suite before accepting a CV change:

```bash
npm run build
npm run check:preflight
```

`check:preflight` is an aggregate runner that executes every mandatory local verification check in sequence and fails immediately when any check fails. The suite includes:

1. **Static content verification** ([`check:content`](scripts/verify-content.mjs)): Verifies declared evidence-backed profile data against the explicit approved manifest. Does not verify URL liveness or network accessibility.
2. **CSS contract verification** ([`check:css`](scripts/check-css-contract.mjs)): Verifies print-mode CSS contracts (A4 portrait, black-and-white output, interactive UI hidden, education/project page-break protection).
3. **Configuration contract verification** ([`check:config`](scripts/check-config-contract.mjs)): Verifies Vite build output, Wrangler static-asset binding, Worker fetch handler, and npm script exposure.
4. **Unit and component tests** ([`test:run`](package.json)): Runs all Vitest tests for CV layout, rendered DOM, accessibility, terminal commands, and contracts.
5. **Route verification** ([`check:routes`](scripts/check-routes.mjs)): Verifies live HTTP routes return expected status codes and response identity. Requires the local Worker running on port 8787 or an authorized deployed environment.
6. **Browser preflight** ([`check:browser`](scripts/check-browser-preflight.mjs)): Verifies rendered DOM content, approved href destinations, print-mode visibility/hidden state, and basic overflow/clipping using Playwright. Requires an approved Playwright package and a running local app or deployed environment.

If route or browser verification is unavailable (missing server, missing browser automation, or network failure), `check:preflight` reports the blocker and exits with a clear failure status. It never reports an unavailable check as successful.

### Running individual checks

Route validation requires the local Worker to be running on port 8787. In one terminal, run:

```bash
npm run worker:dev
```

Then, in another terminal, run:

```bash
npm run check:routes
```

To check a deployed environment explicitly, provide its base URL only when network access is available and the deployment is authorized for verification:

```bash
node scripts/check-routes.mjs https://your-authorized-cv-domain.example
```

If an approved Playwright package is installed later, start the local app and run the browser-level rendered-content check:

```bash
npm run check:browser -- http://localhost:5173
```

Until an approved Playwright package is installed, [`scripts/check-browser-preflight.mjs`](scripts/check-browser-preflight.mjs) exits with a clear notice instead of reporting success without verifying.

### Manual verification items

The local preflight suite does not verify:

- **Real URL ownership and network liveness**: `check:content` verifies that declared URLs are present in the profile data; it does not make HTTP requests to verify that the URLs resolve or that the owner controls the destination.
- **PDF output quality**: `check:browser` verifies print-mode DOM state (visibility, hidden interactive UI, overflow); it does not generate or inspect the final PDF bytes. Open the portfolio, use the browser print command, and manually inspect the PDF for correct page breaks, selectable text, and black-on-white rendering.
- **External link validity**: The suite does not verify that contact or project links remain accessible over time or that external services remain online.

For test watch mode:

```bash
npm test
```

## Print to PDF

The portfolio includes a print layout designed for a compact, selectable, black-and-white PDF suitable for ATS processing.

1. Open the portfolio in a browser.
2. Select **Print CV** or use the browser print command.
3. Choose **A4** paper and **Portrait** orientation.
4. Leave scaling at the browser default or **100%**.
5. Disable **Background graphics** for a clean monochrome result.
6. Select **Save to PDF**.

The print stylesheet produces a one-to-two-page document with black text on white paper. It keeps contact and project links selectable, while hiding the navigation rail, terminal panel, status chrome, print button, and other interactive controls.

## Deployment

Deploy to Cloudflare Workers:

```bash
npm run deploy
```

This command builds the Vite application and runs Wrangler using [`wrangler.toml`](wrangler.toml). You must be authenticated with Cloudflare and have permission to deploy the configured Worker.

## Updating CV Content

Edit [`src/data/profile.ts`](src/data/profile.ts) to update the portfolio content. This file is the single source of truth for identity details, contact links, education, projects, skills, and achievements.

After changing content, run the validation commands above before deployment.
