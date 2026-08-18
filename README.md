# Edward Chan — Interactive CV

Vite + React + TypeScript interactive CV served through Cloudflare Workers Static Assets.

## Routes

- `/` — primary interactive CV.
- `/cv` — compatibility alias rendering the same CV.
- `/dse` and `/dse-calculator/` — intentionally excluded; the DSE calculator will be hosted separately.

## Local development

```bash
npm install
npm run dev
```

For the browser app, open the Vite URL printed by the command. To preview the actual Worker/static-assets integration:

```bash
npm run worker:dev
```

The Worker preview normally listens on `http://localhost:8787`.

## Verification

```bash
npm run check:content
npm run check:css
npm run test:run
npm run build
npm run check:routes -- http://localhost:8787
npx wrangler deploy --dry-run
```

`check:routes` sends browser-navigation headers because Cloudflare Workers Static Assets applies `not_found_handling = "single-page-application"` to navigation requests. It verifies `/` and `/cv` and confirms the excluded DSE paths do not serve a calculator application.

## Deployment

```bash
npm run deploy
```

Deployment requires local Wrangler authentication and explicit approval. No credentials, tokens, account IDs, routes, or custom-domain settings are stored in this repository. The current project uses the Worker name `edward-interactive-cv` and does not configure D1, KV, APIs, authentication, or server-side persistence.
