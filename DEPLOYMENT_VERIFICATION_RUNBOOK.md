# CV Deployment & Verification Runbook

**Purpose:** Complete steps 1-4 to meet Harry's acceptance criteria before final submission.

**Prerequisites:** 
- Node.js v24+ and npm v11+ (already available in your environment)
- Cloudflare account with Workers access
- Browser for PDF generation/inspection

---

## Step 1: Install Dependencies & Run Full Verification

```bash
# Clean install from lockfile
npm ci

# Run all verification checks
npm run check:preflight

# Expected outcome: All checks pass (content, CSS, config, tests, build, routes, browser)
```

**If any check fails:**
- Read the error output carefully
- Fix the identified issue
- Re-run `npm run check:preflight`
- Do not proceed until all checks pass

---

## Step 2: Build & Deploy Application

```bash
# Build production bundle
npm run build

# Verify build output exists
ls -lh dist/

# Expected: dist/index.html, dist/assets/*.js, dist/assets/*.css

# Start local preview to test before deployment
npm run worker:dev
# Keep this running in one terminal, open another terminal for next steps
```

**In a new terminal, verify local deployment:**

```bash
# Test root route
curl -s http://localhost:8787/ | grep "Edward Chan"

# Test route handling (these should return the CV shell, not 404)
curl -s http://localhost:8787/dse | grep "Interactive CV"
curl -s http://localhost:8787/cv | grep "Interactive CV"

# All should return HTTP 200 with CV content
```

**Deploy to Cloudflare Workers:**

```bash
# Ensure wrangler is authenticated
npx wrangler whoami

# If not logged in:
npx wrangler login

# Deploy to production
npx wrangler deploy

# Expected output: 
# ✨ Success! Uploaded [bundle-name]
# ✨ Deployment complete!
# https://[your-worker-name].workers.dev
```

**Verify deployed URLs:**

```bash
# Test the deployed worker (replace with your actual URL)
WORKER_URL="https://edwardchan-workers.mzki.moe"

curl -I "$WORKER_URL" | head -n 1
# Expected: HTTP/2 200

curl -s "$WORKER_URL" | grep "Edward Chan"
# Expected: CV content with name

# Test your project URLs
curl -I "https://mzki.moe/dse/" | head -n 1
curl -I "https://mzki.moe/number-ninja/" | head -n 1

# If any return 404 or error, those links must be removed from the CV
# or redeployed to working URLs
```

---

## Step 3: Update CV Data with Working URLs

**Edit [`src/data/profile.ts`](src/data/profile.ts) based on deployment results:**

```typescript
// If Interactive CV deployed successfully:
links: [
  { label: 'Interactive CV', url: 'https://[your-actual-worker-url]' },
  // ... other links
]

// If DSE Calculator is live:
{ label: 'DSE Score Calculator', url: 'https://mzki.moe/dse/' }

// If Number Ninja is live:
{ label: 'Number Ninja', url: 'https://mzki.moe/number-ninja/' }

// REMOVE any unavailable links:
// - Do NOT include "Custom-domain portfolio (URL unavailable)"
// - Remove any link returning 404 or connection error
```

**After updating, rebuild and redeploy:**

```bash
npm run build
npx wrangler deploy
npm run check:preflight  # Verify updated content passes checks
```

---

## Step 4: Generate & Verify PDF Output

### 4a. Generate PDF from Browser

```bash
# Ensure dev server or deployed site is running
npm run dev
# or use your deployed URL
```

**In your browser:**

1. Navigate to `http://localhost:5173` (dev) or your deployed URL
2. Open browser DevTools (F12)
3. Check console for errors - **must be zero errors**
4. Open Print dialog: `Ctrl+P` (Linux) or `Cmd+P` (Mac)
5. **Print Settings:**
   - Destination: Save as PDF
   - Paper size: **A4**
   - Margins: Default
   - Scale: **100%** (critical - Harry's requirement)
   - Background graphics: ✅ Enabled
6. Generate PDF as `Edward-Chan-CV.pdf`

### 4b. Inspect PDF Output

**Visual inspection:**

```bash
# Open generated PDF
xdg-open Edward-Chan-CV.pdf  # Linux
# or: open Edward-Chan-CV.pdf  # macOS
```

**Check these requirements (from Harry's feedback):**

- [ ] **Page count:** 1-2 pages maximum at 100% scale
- [ ] **Monochrome:** All text should be black on white (no color backgrounds)
- [ ] **No interactive UI:** Terminal, navigation, print controls must be hidden
- [ ] **All content visible:** Profile header, education, projects, skills, achievements all present
- [ ] **Readable links:** Contact and project URLs should be visible as text
- [ ] **No clipping:** No text or sections cut off at page edges
- [ ] **Selectable text:** Click and drag to select text - must work
- [ ] **Functional PDF links:** Click email/GitHub/project links - should work in PDF viewer
- [ ] **No orphaned headings:** Section titles should not appear alone at bottom of page
- [ ] **No split records:** Education/project entries should not break across pages
- [ ] **Professional spacing:** Consistent line heights, no jarring whitespace gaps

**If any check fails:**
- Fix the corresponding CSS in [`src/styles/global.css`](src/styles/global.css)
- Rebuild: `npm run build && npx wrangler deploy`
- Regenerate PDF
- Re-inspect

### 4c. Text Extraction Test

```bash
# Extract text from PDF to verify content is selectable
pdftotext Edward-Chan-CV.pdf - | head -n 30

# Expected: Clean text extraction with name, contact, education, projects
# No garbled characters, no replacement characters (�)
```

---

## Step 5: Final Pre-Submission Checklist

Run this checklist after all above steps pass:

### Source Code

- [ ] `git status` shows only intended changes
- [ ] `git diff` reviewed - no debug code, console.logs, or temp files
- [ ] All verification scripts pass: `npm run check:preflight`
- [ ] Tests pass: `npm run test:run`
- [ ] Build completes: `npm run build`
- [ ] No TypeScript errors: `npx tsc --noEmit`

### Deployed Application

- [ ] Worker URL returns 200: `https://[your-worker].workers.dev`
- [ ] CV content loads correctly in browser
- [ ] All project links in CV are accessible (or removed if broken)
- [ ] No console errors when loading the page
- [ ] Navigation/terminal features work interactively
- [ ] Routes work correctly (root, /dse, /number-ninja as appropriate)

### PDF Output

- [ ] Generated from deployed URL (or latest local build)
- [ ] A4 portrait, 100% scale, 1-2 pages
- [ ] Monochrome (black text on white)
- [ ] All sections present and readable
- [ ] Links visible and functional
- [ ] Text is selectable
- [ ] No clipping or split records
- [ ] File named professionally: `Edward-Chan-CV.pdf` or `Edward_Chan_CV.pdf`

### CV Content Accuracy

- [ ] Professional email: `edward.hl.chan@[domain]`
- [ ] Professional GitHub: `github.com/edwardhlchan`
- [ ] LinkedIn included: `linkedin.com/in/edhlchan`
- [ ] Current accurate identity: "Secondary School Student | Incoming Data Science Student"
- [ ] Target aspiration: "Aspiring Technology Operations & Cybersecurity Professional"
- [ ] CLAP-TECH context: HKBU, IBM, Jockey Club pathway
- [ ] Distinction II: highest Applied Learning grade (without unsupported "top 4%" if no certificate)
- [ ] Academic strengths: Level 5 ICT, Level 5 English (Math 3 not highlighted)
- [ ] BOTS wording: participation/technical analysis (not "Top 10" without documentation)
- [ ] Project descriptions: technical stack + business value
- [ ] All live demo links work or are removed
- [ ] Skills taxonomy: accurate and defensible in interview

---

## Troubleshooting

### "npm: not found" in execute_command

The agent's tool environment doesn't have npm in PATH due to nvm shell initialization. Run all commands in your interactive terminal where `npm` works.

### Deployment fails: "Authentication required"

```bash
npx wrangler login
# Follow browser OAuth flow
npx wrangler whoami  # Verify authentication
```

### Routes return 404 on deployed worker

Check [`wrangler.toml`](wrangler.toml):
```toml
[site]
bucket = "./dist"
not_found_handling = "single-page-application"
```

Ensure `dist/` directory exists after `npm run build`.

### PDF has broken links or garbled text

This usually means:
1. Font embedding issue - ensure web fonts load correctly
2. CSS print rules not applied - check `@media print` in [`global.css`](src/styles/global.css)
3. Browser print settings wrong - verify A4, 100%, background graphics enabled

### Browser preflight check fails

```bash
# Install Playwright browsers (if not already installed)
npx playwright install chromium

# Run browser checks manually
npm run check:browser
```

### Project URLs return errors

You have two options:
1. **Redeploy the projects** to make them accessible
2. **Remove broken links** from [`src/data/profile.ts`](src/data/profile.ts)

Harry explicitly expects **working live demos** - broken links weaken the CV.

---

## Success Criteria

You may proceed to final submission when:

✅ All preflight checks pass  
✅ Application deploys successfully to Cloudflare  
✅ All CV project links are accessible (or removed)  
✅ PDF generates correctly at A4/100% with selectable text and functional links  
✅ Visual inspection confirms professional appearance with no layout defects  
✅ Content matches Harry's acceptance criteria from transcript  

**Final output artifacts:**
- `Edward-Chan-CV.pdf` - Print-ready CV
- Deployed CV at: `https://[your-worker].workers.dev`
- Git commit with all source changes
- Optional: [`docs/research/cv-evidence-classification.md`](docs/research/cv-evidence-classification.md) for interview prep

---

## Notes

- **Do not skip steps** - each builds on the previous
- **Verify each step passes** before proceeding to the next
- **Document any deviations** or issues encountered
- **Keep Harry's transcript** ([`b6e0a5ddd670b8c5dd71521764cd5d0a33bac73047a01352c8b418566ff3c84f/WhatsApp Chat with Harry NGAI.txt`](b6e0a5ddd670b8c5dd71521764cd5d0a33bac73047a01352c8b418566ff3c84f/WhatsApp%20Chat%20with%20Harry%20NGAI.txt)) as reference for any questions

**When in doubt, refer back to Harry's last messages (lines 231-243) for his exact expectations.**
