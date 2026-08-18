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

Run the build and static validation checks:

```bash
npm run build
npm run check:css
npm run check:content
npm run test:run
```

Route validation requires the local Worker to be running on port 8787. In one terminal, run:

```bash
npm run worker:dev
```

Then, in another terminal, run:

```bash
npm run check:routes
```

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
