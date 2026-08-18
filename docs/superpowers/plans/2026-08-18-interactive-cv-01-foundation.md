# Interactive CV — 01 Foundation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `superpowers:subagent-driven-development` or `superpowers:executing-plans` to execute each checked step in order.

**Goal:** Create the Vite, React, TypeScript, Cloudflare Workers Static Assets, and test foundation for the interactive CV.

**Architecture:** A Vite-built SPA is served by one minimal Cloudflare Worker using Workers Static Assets. The Worker owns asset delivery and `/cv` SPA fallback; browser-side React owns all CV interaction.

**Tech Stack:** Node.js, npm, Vite, React, TypeScript, Vitest, Testing Library, Wrangler.

## Global Constraints

- Use the approved design in [`2026-08-18-interactive-cv-design.md`](../specs/2026-08-18-interactive-cv-design.md:1).
- Install Wrangler as a pinned local dev dependency; do not install it globally.
- Do not add D1, API routes, authentication, analytics, or any DSE calculator route.
- Do not commit Cloudflare credentials or account-specific secrets.
- The Worker name must be a stable local-project name selected at scaffold time; deployment configuration remains account-neutral.

---

## Files

- Create: [`package.json`](../../package.json)
- Create: [`package-lock.json`](../../package-lock.json)
- Create: [`tsconfig.json`](../../tsconfig.json)
- Create: [`vite.config.ts`](../../vite.config.ts)
- Create: [`vitest.config.ts`](../../vitest.config.ts)
- Create: [`index.html`](../../index.html)
- Create: [`wrangler.toml`](../../wrangler.toml)
- Create: [`src/main.tsx`](../../src/main.tsx)
- Create: [`src/App.tsx`](../../src/App.tsx)
- Create: [`src/styles/global.css`](../../src/styles/global.css)
- Create: [`src/test/setup.ts`](../../src/test/setup.ts)
- Create: [`src/App.test.tsx`](../../src/App.test.tsx)
- Create: [`worker/index.ts`](../../worker/index.ts)
- Create: [`.gitignore`](../../.gitignore)
- Create: [`README.md`](../../README.md)

## Interfaces

- `src/main.tsx` renders `App` into `#root`.
- `App` initially renders `<main id="main-content">Interactive CV</main>` as the minimal tested application baseline; Plan 03 replaces this baseline with the composed CV shell.
- `worker/index.ts` exports `default { fetch(): Response }`; Wrangler’s assets binding serves SPA assets.
- `npm run dev`, `npm run build`, `npm run test`, `npm run test:run`, `npm run preview`, `npm run worker:dev`, and `npm run deploy` must be defined.

### Task 1: Scaffold the project and dependencies

- [ ] **Step 1: Confirm no existing package manifest or lockfile exists.**

Run:

```bash
find . -maxdepth 1 \( -name package.json -o -name package-lock.json -o -name pnpm-lock.yaml -o -name yarn.lock \) -print
```

Expected: no package manager manifest or lockfile is printed.

- [ ] **Step 2: Initialize an npm project and install runtime dependencies.**

Run:

```bash
npm init -y
npm install react react-dom
```

Expected: [`package.json`](../../package.json) and [`package-lock.json`](../../package-lock.json) exist; React packages are listed under `dependencies`.

- [ ] **Step 3: Install development dependencies locally.**

Run:

```bash
npm install -D @cloudflare/workers-types @testing-library/jest-dom @testing-library/react @types/node @types/react @types/react-dom @vitejs/plugin-react jsdom typescript vite vitest wrangler
```

Expected: every package is under `devDependencies`, including a pinned Wrangler version.

- [ ] **Step 4: Add a `.gitignore` that excludes generated, local, and secret material.**

Write [` .gitignore`](../../.gitignore) with these exact entries:

```gitignore
node_modules/
dist/
coverage/
.wrangler/
.dev.vars
.dev.vars.*
.env
.env.*
!.env.example
```

- [ ] **Step 5: Configure scripts in `package.json`.**

Set the scripts to:

```json
{
  "dev": "vite",
  "build": "tsc --noEmit && vite build",
  "test": "vitest",
  "test:run": "vitest run",
  "preview": "vite preview",
  "worker:dev": "npm run build && wrangler dev",
  "deploy": "npm run build && wrangler deploy"
}
```

- [ ] **Step 6: Verify dependency installation and package scripts.**

Run:

```bash
npm ls --depth=0 && npm run
```

Expected: no missing dependency error; all seven scripts appear.

### Task 2: Add Vite, TypeScript, test, and Worker configuration

- [ ] **Step 1: Create `tsconfig.json`.**

Use strict TypeScript and React JSX configuration:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "useDefineForClassFields": true,
    "lib": ["DOM", "DOM.Iterable", "ES2022"],
    "allowJs": false,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "types": ["vitest/globals"]
  },
  "include": ["src", "worker", "vite.config.ts", "vitest.config.ts"]
}
```

- [ ] **Step 2: Create `vite.config.ts` and `vitest.config.ts`.**

`vite.config.ts` must use `@vitejs/plugin-react` and set `build.outDir` to `dist`. `vitest.config.ts` must use the `jsdom` environment, load `src/test/setup.ts`, and include `src/**/*.test.tsx`.

- [ ] **Step 3: Add `wrangler.toml`.**

Configure a Worker named `edward-interactive-cv`, with a current compatibility date selected on the day of implementation, `main = "worker/index.ts"`, and static assets from `./dist`. Configure SPA fallback to the Vite entry asset so `/cv` resolves on direct navigation. Do not configure `d1_databases`, `kv_namespaces`, secrets, custom domains, or `routes`.

- [ ] **Step 4: Add the minimal Worker entrypoint.**

Implement [`worker/index.ts`](../../worker/index.ts) as:

```ts
export default {
  fetch(): Response {
    return new Response("Asset binding did not serve this request.", { status: 404 });
  },
};
```

The Worker must not inspect commands, fetch CV data, or expose API endpoints. Wrangler’s asset binding handles normal static requests before this fallback runs.

- [ ] **Step 5: Add Vite document entry and application mount.**

Create [`index.html`](../../index.html) with a `#root` element, a concise Edward Chan CV document title, viewport metadata, and a module script to `/src/main.tsx`. Create [`src/main.tsx`](../../src/main.tsx) that imports `global.css` and renders `App` using `createRoot`.

- [ ] **Step 6: Create the first failing app test.**

In [`src/App.test.tsx`](../../src/App.test.tsx), write:

```tsx
import { render, screen } from "@testing-library/react";
import App from "./App";

it("renders the interactive CV application landmark", () => {
  render(<App />);
  expect(screen.getByRole("main", { name: /interactive cv/i })).toBeInTheDocument();
});
```

- [ ] **Step 7: Run the test and confirm failure.**

Run:

```bash
npm run test:run -- src/App.test.tsx
```

Expected: FAIL because `App` is not implemented.

- [ ] **Step 8: Implement the minimal `App` and test setup.**

Create `src/test/setup.ts` containing:

```ts
import "@testing-library/jest-dom/vitest";
```

Create [`src/App.tsx`](../../src/App.tsx) containing:

```tsx
export default function App() {
  return <main aria-label="Interactive CV" id="main-content">Interactive CV</main>;
}
```

- [ ] **Step 9: Run type check, unit test, production build, and Worker preview configuration validation.**

Run:

```bash
npm run test:run && npm run build && npx wrangler deploy --dry-run
```

Expected: tests pass, Vite writes `dist`, and Wrangler validates configuration without authenticating or deploying.

- [ ] **Step 10: Write initial setup documentation.**

In [`README.md`](../../README.md), document prerequisites, `npm install`, `npm run dev`, `npm run test:run`, `npm run build`, `npm run worker:dev`, and the fact that `npm run deploy` requires user-provided Cloudflare authentication. State that the site serves `/` and `/cv`, while the DSE calculator is a separate site and is not included.

- [ ] **Step 11: Commit the foundation.**

```bash
git add .gitignore README.md index.html package.json package-lock.json tsconfig.json vite.config.ts vitest.config.ts wrangler.toml worker src
git commit -m "chore: scaffold interactive CV worker app"
```

## Completion Gate

- `npm run test:run` passes.
- `npm run build` creates `dist`.
- `npx wrangler deploy --dry-run` validates the asset configuration.
- No DSE, D1, API, secrets, or production account configuration exists.
