# Interactive CV — 06 Verification and Cloudflare Handoff Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `superpowers:subagent-driven-development` or `superpowers:executing-plans` to execute each checked step in order.

**Goal:** Validate the complete interactive CV in browser and Worker preview, document deployment, and prepare a safe Cloudflare deployment handoff without requiring credentials in the repository.

**Architecture:** Verify the same Vite build through both `vite preview` and `wrangler dev`. Use source-level assertions for content/routes/safety and browser checks for visual, responsive, keyboard, terminal, link, and print behavior.

**Tech Stack:** npm, Vite, Vitest, Wrangler, browser DevTools/print preview, optional Playwright only if browser automation is already available.

## Global Constraints

- Execute Plans 01–05 first.
- Do not use `wrangler deploy` without user-provided Cloudflare authentication and explicit deployment approval.
- Do not add D1, APIs, authentication, analytics, or the separate DSE site.
- Do not commit secrets, `.dev.vars`, tokens, account IDs, or custom-domain configuration.
- Verify both `/` and `/cv`; verify that no DSE route/link exists.
- Use evidence from commands and browser checks before claiming completion.

---

## Files

- Modify: [`README.md`](../../README.md)
- Modify: [`package.json`](../../package.json)
- Modify: [`wrangler.toml`](../../wrangler.toml)
- Create: [`scripts/verify-content.mjs`](../../scripts/verify-content.mjs)
- Create: [`scripts/check-routes.mjs`](../../scripts/check-routes.mjs)
- Create: [`docs/superpowers/plans/2026-08-18-interactive-cv-verification-report.md`](../../docs/superpowers/plans/2026-08-18-interactive-cv-verification-report.md)

## Interfaces

Required verification scripts:

```text
npm run check:content
npm run check:css
npm run test:run
npm run build
npm run check:routes
npm run worker:dev
```

`check:content` exits nonzero if required reference content/URLs are absent or forbidden DSE/legacy links are present. `check:routes` fetches the running local Worker and asserts `/` and `/cv` return the app while excluded routes do not return a DSE application.

### Task 1: Add source-level content and safety verification

- [ ] **Step 1: Create `scripts/verify-content.mjs`.**

The script must read `src/data/profile.ts` and assert these exact strings:

```text
Edward Chan
Information Technology Student
contact@edwardchan.dev
linkedin.com/in/edhlchan
github.com/edhlchan
edward-portfolio.runs-as-a-cloudflare.workers.dev/cv
Full-Stack Web Apps & Digital Portfolio
Security Log Analysis & Incident Response Simulation
Automated Data Parsing Desktop Application
Real-Time Input-Translation Engine
Top 10 Finalist
Distinction Award
```

It must fail if the serialized data contains any of:

```text
/dse
/dse-calculator/
lmaodick1239
yusixian
余弦
cosine
```

The script should print `content verification passed` on success.

- [ ] **Step 2: Add the npm script.**

Add:

```json
"check:content": "node scripts/verify-content.mjs"
```

- [ ] **Step 3: Run content verification.**

```bash
npm run check:content
```

Expected: PASS.

### Task 2: Validate Worker route behavior

- [ ] **Step 1: Create `scripts/check-routes.mjs`.**

The script should accept a base URL from `process.argv[2]` with default `http://localhost:8787`, fetch `/` and `/cv`, and assert:

- HTTP status is 200.
- Response body contains `Edward Chan`.
- Response body contains `Interactive CV` or the application’s final title.

It should fetch `/dse` and `/dse-calculator/` and assert neither response body contains `DSE Score Calculator`, `D1`, or `Percentile Ranking`. It should print a concise pass summary and exit nonzero on any failed assertion.

- [ ] **Step 2: Add the npm script.**

Add:

```json
"check:routes": "node scripts/check-routes.mjs"
```

- [ ] **Step 3: Build and start Worker preview.**

Run in one terminal:

```bash
npm run build && npx wrangler dev --local
```

Expected: Wrangler starts a local Worker URL, normally `http://localhost:8787`.

- [ ] **Step 4: Run route verification against the Worker.**

In a second terminal:

```bash
npm run check:routes -- http://localhost:8787
```

Expected: `/` and `/cv` pass; excluded DSE paths contain no calculator application.

- [ ] **Step 5: Stop the preview process after verification.**

Do not leave a test server running after the route check unless the user explicitly requests a persistent development server.

### Task 3: Run the full automated verification matrix

- [ ] **Step 1: Run dependency and package checks.**

```bash
npm ls --depth=0
npm run
```

Expected: no missing dependencies and all documented scripts exist.

- [ ] **Step 2: Run content, CSS, tests, and production build.**

```bash
npm run check:content && npm run check:css && npm run test:run && npm run build
```

Expected: every command exits 0.

- [ ] **Step 3: Run Wrangler dry-run validation.**

```bash
npx wrangler deploy --dry-run
```

Expected: assets and Worker configuration validate without deployment authentication. If the installed Wrangler version requires a different non-deploy validation flag, use its documented equivalent and record the exact command in the verification report.

- [ ] **Step 4: Inspect generated output for forbidden artifacts.**

Run:

```bash
rg -n 'dse-calculator|D1|lmaodick1239|yusixian|余弦|cosine|API_TOKEN|CLOUDFLARE_API_TOKEN' dist src worker wrangler.toml README.md || true
```

Expected: no forbidden application links, identities, credentials, or DSE backend terms. The only allowed DSE mention is scope documentation stating that it is excluded/separate; implementation output must contain none.

### Task 4: Perform browser verification

- [ ] **Step 1: Check desktop layout.**

Open the Worker preview in a browser at `/` and verify:

- The profile header is visible and has one `h1`.
- Section navigation points to Summary, Education, Projects, Skills, and Achievements.
- The two-zone desktop layout is balanced.
- All approved contact links and the CV demo link are clickable.
- Project descriptions, education, skills, and achievements are complete.

- [ ] **Step 2: Check keyboard navigation.**

Starting at the browser address bar, use Tab and Shift+Tab. Verify:

- Skip link appears when focused.
- Navigation links and buttons have visible focus.
- Terminal input is labelled and reachable.
- External links have descriptive names.
- Enter submits terminal commands.
- No focus is trapped in the terminal.

- [ ] **Step 3: Check terminal commands.**

Run each command manually:

```text
help
whoami
about
projects
skills
contact
print
clear
unknown-command
```

Verify each result matches Plan 04, navigation scrolls correctly, contact focuses correctly, print opens the browser print flow, clear removes history, and unknown commands remain local errors.

- [ ] **Step 4: Check responsive viewports.**

Use browser responsive mode at approximately 1280px, 768px, 390px, and 320px widths. Verify:

- Desktop rail becomes tablet/mobile navigation as specified.
- No horizontal scrollbar occurs.
- Contact links and project tags wrap.
- Terminal history/input remains usable.
- Buttons remain touch-sized.
- Text remains readable.

- [ ] **Step 5: Check print preview.**

Print from the header and terminal. Use A4 paper, 100% scale, and disable browser headers/footers. Verify:

- Navigation, terminal, print controls, and decorative chrome are hidden.
- Identity, summary, education, projects, skills, achievements, contact links, and approved CV demo URL remain.
- No content is clipped or overlapped.
- Links remain readable/selectable.

- [ ] **Step 6: Check direct `/cv` navigation.**

Open the Worker preview directly at `/cv`, refresh, and repeat the minimum layout/link check. It must render the same application without a client-side 404.

### Task 5: Document handoff and deployment prerequisites

- [ ] **Step 1: Update `README.md`.**

Document:

```text
npm install
npm run dev
npm run test:run
npm run check:content
npm run check:css
npm run build
npm run worker:dev
npm run check:routes -- http://localhost:8787
npm run deploy
```

Explain `/` and `/cv`, the excluded separate DSE site, local Wrangler preview, the Worker name, required Cloudflare authentication, and that deployment is not executed without explicit approval.

- [ ] **Step 2: Add the verification report.**

Create [`docs/superpowers/plans/2026-08-18-interactive-cv-verification-report.md`](../../docs/superpowers/plans/2026-08-18-interactive-cv-verification-report.md) with:

- Date and environment.
- Exact commands run.
- Pass/fail result for each command.
- Browser viewport and print settings checked.
- Any known limitation, including whether production Cloudflare deployment was intentionally not run.
- Explicit statement that the DSE calculator is separate and excluded.

Do not claim browser or deployment success without recorded evidence.

- [ ] **Step 3: Commit verification and documentation.**

```bash
git add README.md package.json scripts docs/superpowers/plans/2026-08-18-interactive-cv-verification-report.md
 git commit -m "test: verify interactive CV worker deployment"
```

### Task 6: Optional authenticated deployment handoff

- [ ] **Step 1: Confirm deployment approval and Cloudflare configuration.**

Before deployment, obtain explicit approval and confirm the intended Worker name/account. Do not put account IDs or tokens in repository files.

- [ ] **Step 2: Authenticate using Wrangler’s supported local flow.**

Use the user’s preferred Wrangler authentication method in the terminal. Do not echo credentials into chat or commit them.

- [ ] **Step 3: Deploy only after all prior gates pass.**

Run:

```bash
npm run deploy
```

Record the deployed URL in the verification report only after Wrangler returns success. Verify `/` and `/cv` on the deployed URL using the same route/content checks.

## Completion Gate

- Automated checks, build, CSS checks, and Worker route checks pass.
- Browser responsive, keyboard, terminal, link, and print checks are recorded.
- README explains local development and deployment prerequisites.
- Production deployment is either verified with evidence or explicitly documented as not run pending credentials/approval.
- No DSE implementation, D1 binding, forbidden legacy identity, secret, or unapproved route exists.
