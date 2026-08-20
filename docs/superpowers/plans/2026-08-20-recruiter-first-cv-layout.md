# Recruiter-First CV Layout Implementation Plan

**Plan Status:** Draft  
**Created:** 2026-08-20  
**Specification:** [`docs/superpowers/specs/2026-08-20-recruiter-first-cv-layout-design.md`](../specs/2026-08-20-recruiter-first-cv-layout-design.md)

---

## Agentic Worker Note

This plan uses test-driven development (TDD). Each task follows: write failing test → run test (verify failure) → implement minimal code → run test (verify pass) → run broader verification → commit. Do not skip test verification steps. Preserve all existing content contracts, accessibility, and print behavior.

---

## Goal

Restructure the NF2 interactive CV application to optimize for recruiter scanning within 20-30 seconds by:
1. Separating CV document route (`/`) from terminal demo route (`/demo`)
2. Implementing single-column, print-first CV layout with summary → projects → skills ordering
3. Removing decorative UI elements that don't serve recruiter clarity
4. Preserving all existing content, accessibility, and print contracts

---

## Architecture

### Current State
- Single-page application with [`AppShell`](../../src/components/AppShell.tsx) rendering CV content + [`TerminalPanel`](../../src/features/terminal/TerminalPanel.tsx) in footer
- Navigation rail with atmospheric copy, decorative project markers
- Order: Summary → Education → Projects → Skills → Achievements
- No client-side routing

### Target State
- Client-side routing with two routes:
  - `/` (CV route): Clean resume document, no terminal UI
  - `/demo` (Demo route): Terminal panel as primary element
- New route components: `CVRoute`, `DemoRoute`
- New CV components: `CVHeader`, `CVSummary`, `CVFooter`, `DemoHeader`
- Refactored [`ProjectList`](../../src/components/ProjectList.tsx): Remove decorative marker
- Order: Summary → Projects → Skills → Education → Achievements
- Remove: Navigation rail atmospheric copy, decorative project markers
- Preserve: All existing components (reuse where possible), accessibility, print CSS

---

## Tech Stack

- **Framework:** React 19.2.0 with TypeScript
- **Routing:** React Router 7.x (to be installed)
- **Testing:** Vitest 4.0.0 + React Testing Library 16.3.0
- **Build:** Vite 7.2.0
- **Deployment:** Cloudflare Workers (existing)
- **Styling:** CSS (existing [`global.css`](../../src/styles/global.css))

---

## Global Constraints

1. **No content modifications**: Do not alter [`profile.ts`](../../src/data/profile.ts) content
2. **Preserve contracts**: All existing tests in [`src/data/profile.test.ts`](../../src/data/profile.test.ts), [`src/data/profile.verification.test.ts`](../../src/data/profile.verification.test.ts), [`src/test/metadata-contract.test.ts`](../../src/test/metadata-contract.test.ts) must pass
3. **Preserve accessibility**: Maintain semantic HTML, ARIA landmarks, keyboard navigation (tests in [`src/styles/accessibility.test.tsx`](../../src/styles/accessibility.test.tsx))
4. **Preserve print behavior**: A4 print layout with page-break protections must work on CV route
5. **Maintain evidence attributes**: All `data-evidence-category` attributes must be preserved
6. **Run verification after each change**: `npm run test:run`, `npm run check:content`, `npm run check:preflight`
7. **Architecture mode restriction**: Cannot edit source code, tests, or config (plan only)

---

## Implementation Tasks

### Phase 1: Infrastructure Setup

#### Task 1.1: Install React Router
- Run `npm install react-router-dom@7`
- Verify: `npm run build` (clean build expected)
- Commit: `chore: add react-router-dom 7 for client-side routing`

#### Task 1.2: Add routing infrastructure test
- File: [`src/App.test.tsx`](../../src/App.test.tsx) (extend)
- Test: CV route renders Edward Chan h1, main landmark, NO terminal region
- Run: `npm run test:run -- src/App.test.tsx` (FAIL expected - terminal currently visible)
- Commit: `test: add routing infrastructure test for CV route without terminal`

#### Task 1.3: Implement React Router in App
- File: [`src/App.tsx`](../../src/App.tsx)
- Add: `BrowserRouter`, `Routes`, `Route` with paths `/` and `/demo`
- Test: `npm run test:run -- src/App.test.tsx` (FAIL - CVRoute/DemoRoute missing)
- Commit: `feat: add React Router structure to App component`

---

### Phase 2: CV Route Components

#### Task 2.1: Create CVHeader component
- Test file: `src/components/CVHeader.test.tsx` (new)
- Tests: h1 name, role, aspiration, contact links with hrefs, banner landmark
- Run: `npm run test:run -- src/components/CVHeader.test.tsx` (FAIL - component missing)
- Commit: `test: add CVHeader component tests`

#### Task 2.2: Implement CVHeader component
- File: `src/components/CVHeader.tsx` (new)
- Props: `{ profile: Profile }`
- Render: `<header role="banner">` with `profile.identity.name` (h1), `role`, `aspiration`, `profile.contact` links
- Test: `npm run test:run -- src/components/CVHeader.test.tsx` (PASS expected)
- Commit: `feat: implement CVHeader component`

#### Task 2.3: Create CVSummary component
- Test file: `src/components/CVSummary.test.tsx` (new)
- Tests: renders summary text, uses section or div wrapper
- Run: `npm run test:run -- src/components/CVSummary.test.tsx` (FAIL)
- Commit: `test: add CVSummary component tests`

#### Task 2.4: Implement CVSummary component
- File: `src/components/CVSummary.tsx` (new)
- Props: `{ summary: string }`
- Render: Summary paragraph with optional visual distinction
- Test: `npm run test:run -- src/components/CVSummary.test.tsx` (PASS)
- Commit: `feat: implement CVSummary component`

#### Task 2.5: Create CVFooter component
- Test file: `src/components/CVFooter.test.tsx` (new)
- Tests: "View Interactive Demo" link to /demo, contentinfo landmark
- Run: `npm run test:run -- src/components/CVFooter.test.tsx` (FAIL)
- Commit: `test: add CVFooter component tests`

#### Task 2.6: Implement CVFooter component
- File: `src/components/CVFooter.tsx` (new)
- Render: `<footer role="contentinfo">` with link to `/demo`, optional last updated
- Test: `npm run test:run -- src/components/CVFooter.test.tsx` (PASS)
- Commit: `feat: implement CVFooter component`

#### Task 2.7: Create CVRoute component
- Test file: `src/routes/CVRoute.test.tsx` (new)
- Tests: renders CVHeader, CVSummary, ProjectList, SkillsGrid, EducationList, AchievementList, CVFooter
- Run: `npm run test:run -- src/routes/CVRoute.test.tsx` (FAIL)
- Commit: `test: add CVRoute component tests`

#### Task 2.8: Implement CVRoute component
- File: `src/routes/CVRoute.tsx` (new)
- Import: `profile` from `../data/profile`
- Render: `CVHeader`, `CVSummary`, `ResumeSection` wrappers with `ProjectList` (before skills), `SkillsGrid`, `EducationList`, `AchievementList`, `CVFooter`
- Order: Summary → Projects → Skills → Education → Achievements
- Test: `npm run test:run -- src/routes/CVRoute.test.tsx` (PASS)
- Verification: `npm run test:run -- src/App.test.tsx` (routing test may still fail - demo route missing)
- Commit: `feat: implement CVRoute component with summary-first ordering`

---

### Phase 3: Demo Route Components

#### Task 3.1: Create DemoHeader component
- Test file: `src/components/DemoHeader.test.tsx` (new)
- Tests: "Back to CV" link to `/`, correct navigation landmark
- Run: `npm run test:run -- src/components/DemoHeader.test.tsx` (FAIL)
- Commit: `test: add DemoHeader component tests`

#### Task 3.2: Implement DemoHeader component
- File: `src/components/DemoHeader.tsx` (new)
- Render: `<nav>` with link to `/`
- Test: `npm run test:run -- src/components/DemoHeader.test.tsx` (PASS)
- Commit: `feat: implement DemoHeader component`

#### Task 3.3: Update TerminalPanel props for demo route
- Analysis: Current [`TerminalPanel`](../../src/features/terminal/TerminalPanel.tsx) accepts `onScrollToSection`, `onFocusContact`, `onPrint`
- Decision: For demo route, pass no-op functions or remove callbacks (scrolling/contact not relevant)
- Test file: `src/features/terminal/TerminalPanel.test.tsx` (verify existing tests still pass)
- Commit: `refactor: make TerminalPanel props optional for demo route usage`

#### Task 3.4: Create DemoRoute component
- Test file: `src/routes/DemoRoute.test.tsx` (new)
- Tests: renders DemoHeader, TerminalPanel region
- Run: `npm run test:run -- src/routes/DemoRoute.test.tsx` (FAIL)
- Commit: `test: add DemoRoute component tests`

#### Task 3.5: Implement DemoRoute component
- File: `src/routes/DemoRoute.tsx` (new)
- Render: `DemoHeader`, `TerminalPanel` with no-op callbacks
- Test: `npm run test:run -- src/routes/DemoRoute.test.tsx` (PASS)
- Verification: `npm run test:run -- src/App.test.tsx` (routing test should now PASS)
- Commit: `feat: implement DemoRoute component`

---

### Phase 4: Refactor ProjectList (Remove Decorative Elements)

#### Task 4.1: Update ProjectList test for marker removal
- File: [`src/components/ProjectList.tsx`](../../src/components/ProjectList.tsx) - check current structure
- Test file: Update tests to expect NO decorative marker div
- Run: `npm run test:run` (tests may still pass if markers not tested)
- Commit: `test: update ProjectList tests to expect no decorative markers`

#### Task 4.2: Remove decorative marker from ProjectCard
- File: [`src/components/ProjectList.tsx`](../../src/components/ProjectList.tsx)
- Remove: `<div className="project-card__marker" aria-hidden="true">●</div>`
- Preserve: All project content, links, tech tags, `data-evidence-category` attributes
- Test: `npm run test:run -- src/components/ProjectList` (PASS)
- Verification: `npm run check:content` (evidence attributes preserved)
- Commit: `refactor: remove decorative marker from ProjectCard`

---

### Phase 5: Update Accessibility Tests

#### Task 5.1: Update accessibility test for new structure
- File: [`src/styles/accessibility.test.tsx`](../../src/styles/accessibility.test.tsx)
- Current test expects: skip link, print button, terminal textbox, summary link with aria-current
- Update: Remove expectations for terminal textbox and section nav on CV route
- Add: Expectations for CVHeader banner, CVFooter contentinfo
- Run: `npm run test:run -- src/styles/accessibility.test.tsx` (FAIL - terminal/nav still present in old structure)
- Commit: `test: update accessibility tests for route separation`

#### Task 5.2: Verify accessibility after route implementation
- Run: `npm run test:run -- src/styles/accessibility.test.tsx` (PASS expected after CVRoute is connected)
- Manual: Test keyboard navigation (Tab through CV route, demo route)
- Manual: Test screen reader announcements (NVDA/JAWS if available)
- Commit: No code changes, verification only

---

### Phase 6: CSS Updates

#### Task 6.1: Add CSS for new components
- File: [`src/styles/global.css`](../../src/styles/global.css)
- Add: Styles for `.cv-header`, `.cv-summary`, `.cv-footer`, `.demo-header`
- Add: Single-column layout max-width 800px, centered
- Preserve: Existing print CSS (`@media print`)
- Update: Hide `.navigation-rail`, `.site-chrome`, `.rail-note` on CV route (or remove from CVRoute entirely)
- Test: Manual visual inspection
- Commit: `style: add CSS for CVHeader, CVSummary, CVFooter, DemoHeader`

#### Task 6.2: Update print CSS for CV route
- File: [`src/styles/global.css`](../../src/styles/global.css)
- Ensure: Print styles apply only to CV route
- Hide on print: `.cv-footer` (demo link), any section nav
- Preserve: `page-break-inside: avoid` on `.project-card`, `.print-project-entry`, `.print-education-entry`
- Test: Manual print preview from CV route
- Commit: `style: update print CSS for CV route`

---

### Phase 7: Update Tests for New Layout

#### Task 7.1: Update CVLayout.test.tsx
- File: [`src/components/CVLayout.test.tsx`](../../src/components/CVLayout.test.tsx)
- Current tests expect: banner, nav with "cv sections", main, all section headings
- Update: Tests should render `<CVRoute />` instead of `<App />` (or update to use MemoryRouter)
- Expected failures: nav with "cv sections" (removed), terminal in footer (removed)
- Run: `npm run test:run -- src/components/CVLayout.test.tsx` (FAIL initially)
- Commit: `test: update CVLayout tests for route structure`

#### Task 7.2: Fix CVLayout.test.tsx assertions
- Remove: Expectations for navigation rail, terminal panel
- Update: Section order expectations (Projects before Education)
- Verify: All profile content, links, evidence attributes present
- Run: `npm run test:run -- src/components/CVLayout.test.tsx` (PASS)
- Commit: `test: align CVLayout tests with recruiter-first ordering`

---

### Phase 8: Contract Verification

#### Task 8.1: Run all data contract tests
- Run: `npm run test:run -- src/data/profile.test.ts`
- Expected: PASS (no profile content changed)
- Run: `npm run test:run -- src/data/profile.verification.test.ts`
- Expected: PASS (evidence verification unchanged)
- Commit: No code changes, verification only

#### Task 8.2: Run metadata contract test
- Run: `npm run test:run -- src/test/metadata-contract.test.ts`
- Expected: PASS (HTML metadata still reflects profile data)
- If FAIL: Update test to work with routing (may need MemoryRouter in test setup)
- Commit: `test: fix metadata-contract test for routing` (if needed)

#### Task 8.3: Run content verification script
- Run: `npm run check:content`
- Expected: PASS (all evidence attributes preserved)
- If FAIL: Review ProjectList, SkillsGrid, EducationList, AchievementList for missing attributes
- Commit: `fix: restore missing data-evidence-category attributes` (if needed)

---

### Phase 9: Preflight and Route Checks

#### Task 9.1: Update check-routes.mjs for SPA routing
- File: [`scripts/check-routes.mjs`](../../scripts/check-routes.mjs)
- Current: Checks `/`, `/dse`, `/dse-calculator/` for SPA fallback
- Add: Check `/demo` route returns Edward Chan identity
- Run: `npm run check:routes` (after `npm run dev` in separate terminal)
- Expected: PASS for `/`, `/demo`
- Commit: `test: add /demo route verification to check-routes script`

#### Task 9.2: Run browser preflight checks
- Run: `npm run check:browser`
- Expected: PASS (HTML structure, meta tags correct)
- Run: `npm run check:preflight`
- Expected: PASS (all preflight checks pass)
- Commit: No code changes, verification only

---

### Phase 10: Integration and Manual Testing

#### Task 10.1: Full test suite run
- Run: `npm run test:run`
- Expected: All tests PASS
- If failures: Review and fix failing tests
- Commit: `fix: resolve test failures` (if needed)

#### Task 10.2: Build verification
- Run: `npm run build`
- Expected: Clean build with no errors or warnings
- Check: `dist/` directory contains built assets
- Commit: No code changes, verification only

#### Task 10.3: Manual browser testing
- Run: `npm run dev`
- Test CV route `/`:
  - Name, contact, summary visible
  - Projects appear before skills/education
  - No terminal UI visible
  - No decorative markers or atmospheric copy
  - Print preview shows A4 layout
- Test demo route `/demo`:
  - Terminal panel visible and functional
  - "Back to CV" link navigates to `/`
  - All terminal commands work
- Test responsive behavior (mobile, tablet, desktop viewports)
- Commit: No code changes, manual verification only

---

### Phase 11: Deployment and Final Verification

#### Task 11.1: Deploy to Cloudflare Workers
- Run: `npm run deploy`
- Expected: Successful deployment
- Note: Deployment URL from output
- Commit: No code changes, deployment only

#### Task 11.2: Smoke test production deployment
- Navigate: Production URL `/`
- Verify: CV route renders correctly
- Navigate: Production URL `/demo`
- Verify: Demo route with terminal works
- Run: `npm run check:routes -- <production-url>`
- Expected: PASS
- Commit: No code changes, verification only

---

## File Manifest

### Files to Create
- `src/components/CVHeader.tsx`
- `src/components/CVHeader.test.tsx`
- `src/components/CVSummary.tsx`
- `src/components/CVSummary.test.tsx`
- `src/components/CVFooter.tsx`
- `src/components/CVFooter.test.tsx`
- `src/components/DemoHeader.tsx`
- `src/components/DemoHeader.test.tsx`
- `src/routes/CVRoute.tsx`
- `src/routes/CVRoute.test.tsx`
- `src/routes/DemoRoute.tsx`
- `src/routes/DemoRoute.test.tsx`

### Files to Modify
- [`src/App.tsx`](../../src/App.tsx) - Add routing
- [`src/App.test.tsx`](../../src/App.test.tsx) - Add routing tests
- [`src/components/ProjectList.tsx`](../../src/components/ProjectList.tsx) - Remove decorative marker
- [`src/components/CVLayout.test.tsx`](../../src/components/CVLayout.test.tsx) - Update for new structure
- [`src/styles/accessibility.test.tsx`](../../src/styles/accessibility.test.tsx) - Update for route separation
- [`src/styles/global.css`](../../src/styles/global.css) - Add component styles, update layout
- [`scripts/check-routes.mjs`](../../scripts/check-routes.mjs) - Add /demo route check
- [`src/features/terminal/TerminalPanel.tsx`](../../src/features/terminal/TerminalPanel.tsx) - Make props optional (if needed)

### Files to Preserve (No Changes)
- [`src/data/profile.ts`](../../src/data/profile.ts) - Content unchanged
- [`src/data/profile.test.ts`](../../src/data/profile.test.ts) - Tests unchanged
- [`src/data/profile.verification.test.ts`](../../src/data/profile.verification.test.ts) - Tests unchanged
- [`src/test/metadata-contract.test.ts`](../../src/test/metadata-contract.test.ts) - May need routing setup, no assertion changes
- [`src/components/SkillsGrid.tsx`](../../src/components/SkillsGrid.tsx) - Reused as-is
- [`src/components/EducationList.tsx`](../../src/components/EducationList.tsx) - Reused as-is
- [`src/components/AchievementList.tsx`](../../src/components/AchievementList.tsx) - Reused as-is
- [`src/components/ResumeSection.tsx`](../../src/components/ResumeSection.tsx) - Reused as-is
- [`src/components/PrintControls.tsx`](../../src/components/PrintControls.tsx) - May be used on CV route
- [`src/features/terminal/commands.ts`](../../src/features/terminal/commands.ts) - Unchanged
- [`src/features/terminal/commands.test.ts`](../../src/features/terminal/commands.test.ts) - Unchanged

### Files to Remove (Deprecated)
- [`src/components/AppShell.tsx`](../../src/components/AppShell.tsx) - Replaced by CVRoute/DemoRoute
- [`src/components/ProfileHeader.tsx`](../../src/components/ProfileHeader.tsx) - Replaced by CVHeader
- [`src/components/SectionNav.tsx`](../../src/components/SectionNav.tsx) - Removed (no sticky nav on CV route)

---

## Regression Risks

1. **Print Layout**: Test print preview thoroughly after CSS changes
2. **Content Contracts**: Run `npm run check:content` after every component change
3. **Accessibility**: Manual screen reader testing required
4. **Terminal Commands**: Verify all terminal commands work on `/demo` route
5. **Evidence Attributes**: Check `data-evidence-category` preserved on all project/achievement elements
6. **Responsive Layout**: Test mobile, tablet, desktop breakpoints
7. **Route State**: Verify browser back/forward navigation works correctly

---

## Success Criteria

- [ ] `/` route renders CV without terminal UI
- [ ] `/demo` route renders terminal as primary element
- [ ] Summary appears before projects
- [ ] Projects appear before skills and education
- [ ] No decorative markers or atmospheric copy on CV route
- [ ] Print preview from CV route shows clean A4 document
- [ ] All existing tests pass: `npm run test:run`
- [ ] Content verification passes: `npm run check:content`
- [ ] Preflight checks pass: `npm run check:preflight`
- [ ] Route verification passes: `npm run check:routes`
- [ ] Build succeeds: `npm run build`
- [ ] Manual accessibility testing passes (keyboard, screen reader)
- [ ] Responsive layout works on mobile, tablet, desktop
- [ ] All evidence attributes preserved
- [ ] No TypeScript errors
- [ ] Successful deployment to Cloudflare Workers

---

**End of Implementation Plan**
