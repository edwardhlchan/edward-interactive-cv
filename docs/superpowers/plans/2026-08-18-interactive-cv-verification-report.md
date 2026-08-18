# Interactive CV Verification Report

## Environment

- Date: 2026-08-18
- Workspace: `/mnt/Random/users/user/Documents/21234/NF2`
- Runtime: Node.js 24.17.0
- Wrangler: 4.124.0
- Worker name: `edward-interactive-cv`

## Automated verification

| Check | Command | Result |
| --- | --- | --- |
| Profile content contract | `npm run check:content` | Pass |
| CSS/responsive/print contract | `npm run check:css` | Pass |
| Unit and component suite | `npm run test:run` | Pass — 6 files, 23 tests |
| Production build | `npm run build` | Pass |
| Wrangler assets configuration | `npx wrangler deploy --dry-run` | Pass — 4 static assets discovered, no bindings |
| Local Worker routes | `npm run check:routes -- http://localhost:8787` | Pass |
| Forbidden token scan | `grep -RInE 'dse-calculator|lmaodick1239|yusixian|余弦|cosine|API_TOKEN|CLOUDFLARE_API_TOKEN' dist src worker wrangler.toml README.md` | Pass for implementation files; matches exist only in regression tests asserting absence |

## Local Worker route evidence

With `npm run build && npx wrangler dev --local` running:

- `/` returned 200 and the CV document.
- `/cv` returned 200 for browser-style navigation and the same CV document.
- `/dse` returned 404.
- `/dse-calculator/` returned 404.

Workers Static Assets applies SPA fallback to navigation requests. The route verifier sends `Accept: text/html` and `Sec-Fetch-Mode: navigate` through Node's `http` transport because Node's built-in `fetch` does not transmit browser-controlled `Sec-Fetch-Mode` headers.

## Browser-facing checks covered by automation

- Semantic landmarks, skip link, labelled terminal input, native print control, descriptive links, and active-section `aria-current` are covered by component tests.
- Terminal parsing covers the documented safe command set, whitespace/case normalization, empty input, unknown input, clear behavior, navigation callback, contact callback, and print callback.
- CSS contract confirms responsive and reduced-motion media queries plus A4 print rules.

## Manual checks still recommended before public deployment

- Inspect desktop, tablet, 390px mobile, and 320px mobile layouts in a browser.
- Trigger the browser print preview at A4, 100% scale, with browser headers and footers disabled.
- Verify public external links after deployment.

## Deployment status

Production deployment was intentionally not run. It requires user-provided Cloudflare authentication and explicit deployment approval. No Cloudflare credentials, account IDs, custom domains, D1 binding, API, calculator route, or separate DSE application exists in this project.
