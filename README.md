# Edward Chan — Interactive CV

Vite + React + TypeScript interactive CV served through Cloudflare Workers Static Assets.

## Local development

```bash
npm install
npm run dev
npm run test:run
npm run build
npm run worker:dev
```

The app is available at `/` and `/cv`. Both routes render the same CV. The DSE calculator is a separate site and is not included in this project.

`npm run deploy` requires local Wrangler authentication and explicit deployment approval. No credentials are stored in this repository.
