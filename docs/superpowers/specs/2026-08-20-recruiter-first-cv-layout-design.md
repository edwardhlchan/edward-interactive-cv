# Recruiter-First CV Layout Design Specification

**Document Status:** Draft  
**Created:** 2026-08-20  
**Author:** Zoo (Architect)  
**Related Specs:**
- [2026-08-18 A4 Monochrome CV Print Design](./2026-08-18-a4-monochrome-cv-print-design.md)
- [2026-08-19 CV Readability Improvement Design](./2026-08-19-cv-readability-improvement-design.md)

---

## Executive Summary

This specification defines a recruiter-first redesign of the NF2 interactive CV application. The primary objective is to optimize for recruiter scanning and CV credibility evaluation within 20-30 seconds, while preserving the application's technical demonstration capabilities through route separation.

**Core Changes:**
- Restructure CV route (`/`) as a clean, single-column resume optimized for recruiter scanning and A4 print
- Move terminal interaction to a dedicated `/demo` route
- Remove decorative UI elements that don't serve recruiter clarity or document credibility
- Maintain semantic HTML, accessibility, and approved evidence contracts
- Preserve all existing content while reorganizing presentation

---

## Goals

### Primary Goals

1. **Recruiter Scanning Efficiency**: Enable recruiters to evaluate candidate credibility and role fit within 20-30 seconds of landing on the CV route
2. **Document Credibility**: Present the CV as a professional, trustworthy source document suitable for both screen reading and A4 print
3. **Clear Information Hierarchy**: Lead with identity, contact, target role, and evidence-led summary, followed immediately by projects
4. **Route Separation**: Clearly distinguish between the CV document (`/`) and interactive technical demonstration (`/demo`)
5. **Print-First CV Route**: Ensure the CV route remains the authoritative source document for A4 print output with proper page-break protections

### Secondary Goals

6. **Preserve Technical Credibility**: Maintain all approved evidence, project links, and technical detail
7. **Accessibility Compliance**: Preserve semantic HTML, ARIA landmarks, keyboard navigation, and screen reader support
8. **Content Contract Integrity**: Maintain all existing content/data contracts and validation rules
9. **Responsive Behavior**: Support mobile, tablet, and desktop viewports with appropriate layout adaptations

### Non-Goals

1. **Visual Design System Changes**: This spec focuses on layout, information architecture, and component responsibilities, not color palettes or typography (covered by existing design sense)
2. **Content Changes**: No modifications to approved evidence, project descriptions, or skill claims
3. **Backend/API Changes**: No changes to data layer, worker, or deployment infrastructure
4. **Terminal Feature Changes**: Terminal functionality remains intact, only its route placement changes
5. **Multi-Page CV**: The CV remains a single-page document with internal navigation
6. **Marketing Landing Page**: The CV route is a professional resume document, not a marketing site

---

## User Workflow

### Recruiter Primary Flow (CV Route)

```
1. Land on / (CV route)
   ↓
2. Scan header: Name, role, contact, location (< 3 seconds)
   ↓
3. Read summary: Evidence-led value proposition (5-8 seconds)
   ↓
4. Review projects: Technical depth, links, outcomes (8-12 seconds)
   ↓
5. Scan skills, education, achievements (5-7 seconds)
   ↓
6. Decision point: Contact, print, or navigate to /demo for technical proof
```

### Technical Evaluator Secondary Flow (Demo Route)

```
1. Navigate to /demo (via link from CV or direct URL)
   ↓
2. Review interactive terminal demonstration
   ↓
3. Execute commands, explore technical capabilities
   ↓
4. Return to CV via "Back to CV" link or navigation
```

### Print Workflow

```
1. On CV route (/), trigger print via browser (Cmd/Ctrl+P) or print controls
   ↓
2. Browser renders A4 print layout with page-break protections
   ↓
3. Print/save as PDF with full content, contact links, and professional formatting
```

---

## Information Architecture & Routes

### Route Structure

```
/ (root, CV route)
  - Primary route for recruiter evaluation
  - Single-column resume layout
  - Print-optimized
  - Contains: Header, Summary, Projects, Skills, Education, Achievements
  - Footer: Link to /demo, print controls, last updated

/demo
  - Dedicated technical demonstration route
  - Terminal panel as primary focus
  - "Back to CV" navigation link
  - Not optimized for print (print from CV route instead)
```

### Navigation Model

- **CV Route (`/`)**: Compact utility header with internal anchor navigation (optional), no prominent terminal link in header
- **Demo Route (`/demo`)**: Clear "Back to CV" link, terminal panel as hero element
- **Footer on CV Route**: Subtle "View Interactive Demo" link to `/demo`
- **No Tab/Toggle UI**: Routes are distinct, not toggled states within a single view

---

## Component Responsibilities

### CV Route Components

#### `CVRoute` (new component)
**Responsibility:** Top-level route component for `/`, orchestrates CV layout
**Renders:**
- `CVHeader` (identity, contact, target role)
- `CVSummary` (evidence-led value proposition)
- `ProjectList` (existing, with recruiter-first presentation)
- `SkillsGrid` (existing, compact)
- `EducationList` (existing)
- `AchievementList` (existing)
- `CVFooter` (link to demo, print controls, metadata)

**Does NOT render:**
- `TerminalPanel`
- `SectionNav` as a persistent sticky element (may use optional in-page anchors)
- Decorative atmospheric copy or visual numbering

#### `CVHeader` (new component, replaces `ProfileHeader` for CV route)
**Responsibility:** Primary identity and contact block
**Content (from `profile.ts`):**
- `name` (h1, visually prominent)
- `title` (target role, h2 or strong paragraph)
- `contact.email`, `contact.phone`, `contact.location` (scannable, one line or compact grid)
- Optional: `contact.linkedin`, `contact.github` (icon + link)

**Layout:**
- Single column, left-aligned or centered depending on viewport
- No decorative elements, avatar, or atmospheric copy
- High contrast, immediately scannable
- Print-safe (contact info must appear on page 1)

**Rationale:** Recruiters must identify "who, what role, how to contact" in < 3 seconds.

#### `CVSummary` (new component)
**Responsibility:** Evidence-led summary paragraph
**Content (from `profile.ts`):**
- `summary` field (1-3 sentences, max 80 words)
- Must be evidence-backed (references projects, skills, or achievements)

**Layout:**
- Immediately follows header
- Visually distinct (slight background tint or border-left accent, or simply bold lead-in)
- Readable line length (60-70 characters per line)

**Rationale:** Establishes value proposition and credibility before projects. Recruiters scan this to determine role fit.

#### `ProjectList` (existing, presentation updates)
**Responsibility:** Display projects with recruiter-first emphasis
**Changes from current implementation:**
- Remove decorative project numbering/kickers (e.g., "Project 01")
- Remove decorative icons or markers unless functional (e.g., external link icon is functional)
- Lead with project name (h3), followed by brief description, tech stack, and outcomes
- Preserve all links to live demos, repositories (these are evidence)
- Preserve `data-evidence-category` attributes for content verification

**Layout:**
- Clean card or list layout, consistent spacing
- Tech stack as compact chip/tag row (existing `SkillsGrid` pattern can inform)
- Outcomes/achievements as concise bullet list (2-4 items max per project)

**Rationale:** Projects are primary evidence of technical capability. Recruiters scan for relevant tech and outcomes.

#### `SkillsGrid` (existing, minimal changes)
**Responsibility:** Display skills in scannable grid
**Changes:** Ensure compact presentation, remove any decorative category labels that don't aid scanning
**Preserve:** Category grouping (Frontend, Backend, etc.), proficiency indicators if present

#### `EducationList` (existing, minimal changes)
**Responsibility:** Display education credentials
**Changes:** Ensure compact, scannable format (degree, institution, year)

#### `AchievementList` (existing, minimal changes)
**Responsibility:** Display certifications, awards, or notable achievements
**Changes:** Ensure compact, evidence-led format

#### `CVFooter` (new component)
**Responsibility:** Utility footer for CV route
**Content:**
- "View Interactive Demo" link to `/demo` (subtle, not primary CTA)
- Print controls (if not handled by utility header)
- Last updated timestamp (from `profile.lastUpdated`)
- Optional: Brief note about print optimization

**Layout:**
- Minimal, low visual weight
- Does not interfere with print layout (may be hidden on print)

### Demo Route Components

#### `DemoRoute` (new component)
**Responsibility:** Top-level route component for `/demo`, showcases terminal interaction
**Renders:**
- `DemoHeader` (navigation back to CV)
- `TerminalPanel` (existing, as hero element)
- Optional: Brief explanatory text about terminal capabilities

**Layout:**
- Terminal panel is visually prominent, full width or centered with breathing room
- "Back to CV" link is clear and accessible (top-left or top-right)

#### `DemoHeader` (new component)
**Responsibility:** Simple navigation header for demo route
**Content:**
- "Back to CV" link (to `/`)
- Optional: Breadcrumb or title ("Interactive Demo")

**Layout:**
- Minimal, utility-focused
- Does not compete with terminal panel

#### `TerminalPanel` (existing, no functional changes)
**Responsibility:** Interactive terminal demonstration
**Changes:** None to functionality, only context of use (now on `/demo` route instead of inline on CV)

### Shared/Utility Components

#### `ResumeSection` (existing)
**Responsibility:** Semantic section wrapper with optional heading
**Usage:** Wraps each major CV section (Summary, Projects, Skills, Education, Achievements)
**Preserve:** Semantic HTML, ARIA landmarks, print-safe page-break rules

#### `PrintControls` (existing)
**Responsibility:** UI for triggering print dialog
**Changes:** Only visible/relevant on CV route, not on demo route

#### `SectionNav` (existing, usage changes)
**Responsibility:** In-page anchor navigation
**Changes:**
- Remove from sticky/persistent header if currently present
- Optionally render as subtle in-page table of contents on CV route (not sticky)
- Or remove entirely if recruiter workflow doesn't benefit from it

**Rationale:** Sticky persistent navigation competes with content scanning. If anchor navigation is needed, it should be minimal and non-intrusive.

---

## Content & Data Flow

### Data Source

All content originates from `src/data/profile.ts`:

```typescript
interface Profile {
  name: string
  title: string
  contact: {
    email: string
    phone: string
    location: string
    linkedin?: string
    github?: string
  }
  summary: string
  projects: Project[]
  skills: Skill[]
  education: Education[]
  achievements: Achievement[]
  lastUpdated: string
}
```

### Content Contracts (Preserved)

1. **Approved Evidence Manifest** (`scripts/approved-evidence-manifest.mjs`):
   - All project claims, skill proficiencies, and achievement descriptions must match approved evidence
   - `data-evidence-category` attributes must be preserved on rendered elements
   - Content verification tests must continue to pass

2. **Profile Validation** (`src/data/profile.test.ts`, `src/data/profile.verification.test.ts`):
   - Schema validation for all profile fields
   - Evidence-backed claims verification
   - No placeholder or unverified content

3. **Metadata Contract** (`src/test/metadata-contract.test.ts`):
   - HTML document metadata (title, description, etc.) must reflect profile data
   - Semantic HTML structure validation

### Data Flow for CV Route

```
profile.ts
  ↓
CVRoute component
  ↓
├─ CVHeader (name, title, contact)
├─ CVSummary (summary)
├─ ProjectList (projects[])
├─ SkillsGrid (skills[])
├─ EducationList (education[])
├─ AchievementList (achievements[])
└─ CVFooter (lastUpdated, demo link)
```

### Data Flow for Demo Route

```
profile.ts (minimal usage, e.g., for header context)
  ↓
DemoRoute component
  ↓
├─ DemoHeader (navigation)
└─ TerminalPanel (commands.ts, not profile-dependent)
```

---

## Visual & Layout Rules

### CV Route Layout Principles

#### 1. Single-Column Resume Flow
**Rule:** All content flows in a single column, max-width constrained for readability
**Rationale:** Single-column layouts scan faster than multi-column for recruiters. Consistent with A4 print format.
**Implementation:**
- Container max-width: ~800px (readable line length, A4-compatible)
- Centered on viewport with symmetric horizontal margins (desktop)
- Full-width with gutters on mobile

#### 2. Compact Utility Header
**Rule:** Header is minimal, functional, and does not dominate vertical space
**Rationale:** Recruiters need content, not branding or navigation chrome
**Implementation:**
- Header height: < 100px on desktop, < 80px on mobile
- No large logos, atmospheric copy, or decorative elements
- Contact info is part of content (CVHeader), not persistent chrome

#### 3. Prominent Identity Block (CVHeader)
**Rule:** Name, target role, and contact appear above fold, high contrast, scannable
**Rationale:** Recruiter must answer "who is this person, what role, how to contact" immediately
**Implementation:**
- Name: h1, largest text on page (32-40px desktop, 28-32px mobile)
- Target role: h2 or strong, subordinate to name (20-24px desktop, 18-20px mobile)
- Contact: single row or compact grid, icon + link for email/phone/linkedin/github

#### 4. Evidence-Led Summary Placement
**Rule:** Summary appears immediately after identity block, before projects
**Rationale:** Sets context and credibility before detailed evidence
**Implementation:**
- Visually distinct (border-left accent, slight background tint, or bold lead-in)
- 1-3 sentences, max 80 words
- Readable line length (60-70 characters)

#### 5. Projects Lead Technical Content
**Rule:** Projects section appears before skills, education, achievements
**Rationale:** Projects are primary evidence of capability and most relevant to technical recruiters
**Implementation:**
- ProjectList immediately follows CVSummary
- Each project: name (h3), description, tech stack (chips/tags), outcomes (bullets), links

#### 6. No Decorative Elements Without Function
**Rule:** Remove visual numbering, kickers, atmospheric rail copy, decorative icons, or arbitrary UI chrome
**Rationale:** Decorative elements distract from content and reduce credibility in a professional resume document
**Exceptions:**
- External link icons (functional, indicate link behavior)
- Section headings (functional, aid scanning)
- Subtle dividers between sections (functional, visual grouping)

#### 7. Restrained Section Navigation
**Rule:** Section navigation (if present) is subtle, non-sticky, and low visual weight
**Rationale:** Sticky navigation competes with content. In-page anchors are secondary to scrolling.
**Implementation:**
- Optional: minimal table of contents near top (not sticky)
- Or: remove entirely, rely on scroll + clear section headings

#### 8. Clear Separation from Demo Route
**Rule:** CV route contains no terminal UI, no toggle controls, no split-pane layouts
**Rationale:** CV is a document; demo is an interaction. Mixing them dilutes both.
**Implementation:**
- Terminal interaction only on `/demo` route
- Subtle footer link from CV to demo (not primary CTA)

### Responsive Behavior

#### Desktop (≥ 1024px)
- Container max-width: 800px, centered
- Symmetric horizontal margins (auto)
- Contact info: single row (email | phone | location | links)
- Project cards: single column, generous vertical spacing
- Skills grid: 3-4 columns
- Font sizes: h1 36-40px, h2 20-24px, body 16-18px

#### Tablet (768px - 1023px)
- Container width: 90% or fixed gutters (24-32px)
- Contact info: may wrap to 2 rows if needed
- Project cards: single column, moderate spacing
- Skills grid: 2-3 columns
- Font sizes: h1 32-36px, h2 18-20px, body 16px

#### Mobile (< 768px)
- Container width: 100% with 16-20px gutters
- Contact info: stacked (each item on own line) or 2-column grid
- Project cards: single column, compact spacing
- Skills grid: 2 columns or single column for long skill names
- Font sizes: h1 28-32px, h2 18-20px, body 16px
- Section headings: sticky positioning optional for mobile navigation aid

#### Breakpoint Strategy
- Use CSS media queries, not JavaScript viewport detection
- Ensure all content is accessible and scannable at all breakpoints
- No content hidden at any breakpoint (except print-specific controls)

### Print Behavior

#### Print Layout (CV Route Only)
**Goal:** Professional A4 document suitable for PDF export or physical print

**Rules:**
1. **Page Size:** A4 portrait (210mm × 297mm)
2. **Margins:** 15-20mm all sides (standard CV margins)
3. **Font Sizes:** Slightly reduced from screen (h1 24-28pt, body 10-11pt)
4. **Colors:** High contrast black text on white (no background colors, gradients, or textures)
5. **Links:** Visible as underlined text with URL printed (use CSS `content: attr(href)` for critical links)
6. **Page Breaks:**
   - Avoid breaking within project cards, education entries, or skill groups
   - Use `page-break-inside: avoid` on atomic content blocks
   - Use `page-break-after: avoid` on section headings
7. **Hidden on Print:**
   - Section navigation (if present)
   - Print controls UI
   - "View Interactive Demo" link
   - Any decorative elements or background textures
8. **Contact Info:** Must appear on page 1, preserved in footer if multi-page

**Print CSS Strategy:**
```css
@media print {
  @page {
    size: A4 portrait;
    margin: 15mm 20mm;
  }
  
  /* Hide non-document elements */
  .print-hide,
  nav,
  .demo-link,
  .print-controls {
    display: none;
  }
  
  /* Page break protections */
  .project-card,
  .education-entry,
  .achievement-item {
    page-break-inside: avoid;
  }
  
  section > h2 {
    page-break-after: avoid;
  }
  
  /* Link visibility */
  a[href^="http"]::after {
    content: " (" attr(href) ")";
    font-size: 0.9em;
    color: #666;
  }
}
```

**Print Verification:**
- Print preview must show complete content on 1-2 A4 pages
- No orphaned headings or broken cards
- All contact links visible and functional (if saved as PDF with links)
- Preserved from [2026-08-18 A4 Monochrome CV Print Design](./2026-08-18-a4-monochrome-cv-print-design.md)

#### Demo Route Print Behavior
- Demo route is not optimized for print
- Print dialog on `/demo` should display notice: "For printable CV, visit [homepage URL]"
- Or suppress print styling entirely (terminal view is not document)

### Accessibility

**Preserved from existing implementation, with route-specific considerations:**

#### Semantic HTML
- Document outline: h1 (name) → h2 (sections) → h3 (project names, etc.)
- Proper heading hierarchy with no skipped levels
- `<main>` landmark for primary content
- `<nav>` for section navigation (if present)
- `<article>` or `<section>` for projects, education, achievements

#### ARIA Landmarks
- `role="banner"` or semantic `<header>` for CVHeader
- `role="main"` or semantic `<main>` for CV content
- `role="contentinfo"` or semantic `<footer>` for CVFooter
- `role="navigation"` for SectionNav (if present)

#### Keyboard Navigation
- All interactive elements (links, buttons, nav anchors) must be keyboard accessible (Tab, Enter, Space)
- Focus indicators visible on all interactive elements
- Skip links to main content (optional, but recommended)
- No keyboard traps

#### Screen Reader Support
- Alt text for any functional images or icons
- `aria-label` or `aria-labelledby` for sections if headings are not sufficient
- Link text is descriptive (no "click here" or "read more")
- External links indicated (icon + `aria-label="Opens in new window"` if target="_blank")

#### Color & Contrast
- WCAG AA minimum contrast ratios:
  - Normal text: 4.5:1
  - Large text (18pt+ or 14pt+ bold): 3:1
- Color is never the only indicator of information (use text, icons, or patterns)

#### Focus Management (Route Changes)
- When navigating from CV → Demo or Demo → CV, focus should move to top of new route (or skip link)
- Announce route change to screen readers (e.g., document title update, `aria-live` region)

#### Testing Requirements
- Screen reader testing (NVDA, JAWS, VoiceOver)
- Keyboard-only navigation testing
- Color contrast verification (automated + manual)
- Semantic HTML validation (W3C validator, axe DevTools)
- Preserved: existing accessibility tests in `src/styles/accessibility.test.tsx`

---

## Route & Error Handling

### Routing Implementation

**Technology:** React Router (assumed, or similar client-side routing library)

**Route Definitions:**
```typescript
<Routes>
  <Route path="/" element={<CVRoute />} />
  <Route path="/demo" element={<DemoRoute />} />
  <Route path="*" element={<NotFound />} />
</Routes>
```

### Error Handling

#### 404 Not Found
- If user navigates to unknown route, display NotFound component
- Provide links back to `/` (CV) and `/demo`
- Message: "Page not found. Return to [CV](#/) or [Interactive Demo](#/demo)."

#### Data Loading Errors
- If `profile.ts` fails to load (unlikely, static import), display error boundary
- Error message: "Unable to load CV data. Please refresh the page."
- Fallback to minimal contact info if partial data available

#### Route Transition Errors
- If navigation fails (rare in client-side routing), provide retry or back button
- Log errors to console for debugging

### Navigation State
- No complex state management needed (routes are independent)
- Optional: persist scroll position on CV route if user navigates to demo and back (browser default behavior usually sufficient)

---

## Testing & Verification

### Unit Tests

#### Component Tests (Vitest + React Testing Library)
- **CVRoute:** Renders all expected child components, passes profile data correctly
- **CVHeader:** Displays name, title, contact info from profile.ts
- **CVSummary:** Renders summary text with correct evidence attributes
- **ProjectList:** Renders projects with links, tech stack, outcomes; preserves `data-evidence-category`
- **CVFooter:** Displays demo link, last updated timestamp
- **DemoRoute:** Renders TerminalPanel, "Back to CV" link
- **DemoHeader:** Navigation link to `/` is present and correct

#### Data Contract Tests (Existing)
- **profile.test.ts:** Schema validation (preserved)
- **profile.verification.test.ts:** Evidence-backed claims verification (preserved)
- **metadata-contract.test.ts:** HTML metadata matches profile data (preserved)

#### Accessibility Tests (Existing)
- **accessibility.test.tsx:** Semantic HTML, ARIA landmarks, keyboard nav (preserved, extend for new components)

### Integration Tests

#### Route Navigation
- Test navigation from `/` to `/demo` and back
- Verify URL changes, component rendering, focus management

#### Print Layout
- Test print CSS application (jsdom may not fully support, use manual verification)
- Verify no console errors or warnings in print preview

### Visual Regression Tests (Optional)
- Snapshot tests for CV route, demo route (component-level or full-page)
- Compare before/after screenshots to catch unintended layout changes

### Manual Testing Checklist

#### CV Route (`/`)
- [ ] Name, title, contact info visible and correct
- [ ] Summary is evidence-led and prominent
- [ ] Projects appear before skills/education
- [ ] All project links functional
- [ ] Skills grid renders correctly
- [ ] Education and achievements present
- [ ] Footer contains demo link, last updated
- [ ] No terminal UI visible
- [ ] No decorative numbering or atmospheric copy
- [ ] Section headings clear and scannable

#### Demo Route (`/demo`)
- [ ] "Back to CV" link present and functional
- [ ] Terminal panel renders and accepts input
- [ ] All terminal commands functional
- [ ] No CV content repeated (except minimal context)

#### Responsive Behavior
- [ ] Desktop (1024px+): centered container, readable layout
- [ ] Tablet (768-1023px): appropriate gutters, no horizontal scroll
- [ ] Mobile (<768px): stacked layout, touch-friendly tap targets

#### Print Behavior (CV Route)
- [ ] Print preview shows 1-2 A4 pages
- [ ] No orphaned headings or broken cards
- [ ] Contact links visible (with URLs)
- [ ] Print controls and demo link hidden
- [ ] High contrast black on white

#### Accessibility
- [ ] Keyboard navigation through all interactive elements
- [ ] Focus indicators visible
- [ ] Screen reader announces sections and links correctly
- [ ] Color contrast meets WCAG AA (use axe DevTools)
- [ ] No heading level skips

#### Content Contract
- [ ] All approved evidence present (run `npm run verify-content`)
- [ ] `data-evidence-category` attributes preserved
- [ ] No placeholder or unverified content

---

## Migration Risks & Mitigation

### Risk 1: Breaking Existing Links
**Description:** If users have bookmarked or shared links to the current site, route changes may break them
**Impact:** Medium (user confusion, lost traffic)
**Mitigation:**
- CV route remains at `/` (no change to homepage)
- Terminal functionality moves to `/demo` (new route, but old behavior preserved)
- If terminal was previously accessible via anchor or toggle, add redirect or notice

### Risk 2: Print Layout Regression
**Description:** Changes to CV layout may break existing print CSS or page-break protections
**Impact:** High (CV print is critical use case)
**Mitigation:**
- Preserve existing print CSS from [2026-08-18 A4 Monochrome CV Print Design](./2026-08-18-a4-monochrome-cv-print-design.md)
- Test print preview at each implementation stage
- Add automated print CSS tests if feasible (or rely on manual verification)

### Risk 3: Content Contract Violations
**Description:** Refactoring components may inadvertently remove `data-evidence-category` attributes or alter approved content
**Impact:** High (breaks content verification, erodes credibility)
**Mitigation:**
- Run `npm run verify-content` after each component change
- Preserve all `data-evidence-category` attributes in new components
- Do not modify profile.ts content during layout changes

### Risk 4: Accessibility Regression
**Description:** New components may lack proper semantic HTML, ARIA landmarks, or keyboard support
**Impact:** High (excludes users, fails compliance)
**Mitigation:**
- Extend existing accessibility tests for new components
- Manual screen reader and keyboard testing before deployment
- Code review focused on semantic HTML and ARIA patterns

### Risk 5: Responsive Layout Breakage
**Description:** Single-column layout may not adapt well to mobile or tablet viewports
**Impact:** Medium (poor mobile experience, but content still accessible)
**Mitigation:**
- Test on physical devices or browser DevTools at key breakpoints
- Use flexible units (%, rem) and avoid fixed pixel widths
- Ensure touch targets are ≥44px on mobile

### Risk 6: Route State Management Complexity
**Description:** Introducing routing may add complexity if state needs to be shared between CV and demo routes
**Impact:** Low (routes are independent, minimal shared state)
**Mitigation:**
- Keep routes independent; profile data is static
- Avoid complex state management (Redux, Context) unless necessary
- Use URL-based navigation, not JavaScript state toggles

---

## Acceptance Criteria

### Functional Requirements

1. **CV Route (`/`)**
   - [ ] Renders as single-column resume with header, summary, projects, skills, education, achievements, footer
   - [ ] Name, title, contact info appear above fold on desktop (1920×1080)
   - [ ] Summary is evidence-led, appears before projects
   - [ ] Projects appear before skills/education
   - [ ] All project links functional (live demos, repos)
   - [ ] No terminal UI visible
   - [ ] No decorative numbering, kickers, or atmospheric copy
   - [ ] Footer contains "View Interactive Demo" link to `/demo`
   - [ ] Last updated timestamp visible

2. **Demo Route (`/demo`)**
   - [ ] Renders terminal panel as primary element
   - [ ] "Back to CV" link navigates to `/`
   - [ ] All terminal commands functional (from `commands.ts`)
   - [ ] No CV content repeated (except minimal context/branding)

3. **Navigation**
   - [ ] Navigation from `/` to `/demo` updates URL and renders demo route
   - [ ] Navigation from `/demo` to `/` updates URL and renders CV route
   - [ ] Browser back/forward buttons work correctly
   - [ ] 404 page displays for unknown routes with links to `/` and `/demo`

4. **Print Behavior**
   - [ ] Print preview from CV route shows 1-2 A4 pages, high contrast, no broken cards
   - [ ] Contact links visible in print output (with URLs)
   - [ ] Print controls, section nav, and demo link hidden on print
   - [ ] Page breaks avoid splitting projects, education, achievements

5. **Responsive Behavior**
   - [ ] Layout adapts correctly at desktop (≥1024px), tablet (768-1023px), mobile (<768px)
   - [ ] No horizontal scroll at any breakpoint
   - [ ] Touch targets ≥44px on mobile
   - [ ] Font sizes readable at all breakpoints

### Content & Data Requirements

6. **Content Integrity**
   - [ ] All content from `profile.ts` rendered correctly
   - [ ] All approved evidence preserved (run `npm run verify-content` passes)
   - [ ] `data-evidence-category` attributes present on all evidence-based elements
   - [ ] No placeholder or unverified content

7. **Data Contracts**
   - [ ] `profile.test.ts` passes (schema validation)
   - [ ] `profile.verification.test.ts` passes (evidence verification)
   - [ ] `metadata-contract.test.ts` passes (HTML metadata)

### Accessibility Requirements

8. **Semantic HTML & ARIA**
   - [ ] Document outline: h1 → h2 → h3 (no skipped levels)
   - [ ] `<main>`, `<header>`, `<footer>`, `<nav>` landmarks present
   - [ ] All interactive elements keyboard accessible
   - [ ] Focus indicators visible on all interactive elements

9. **Screen Reader Support**
   - [ ] Screen reader announces sections, headings, links correctly (manual test)
   - [ ] External links indicated (icon + aria-label if target="_blank")
   - [ ] No missing alt text on functional images

10. **Color & Contrast**
    - [ ] WCAG AA contrast ratios met (4.5:1 normal text, 3:1 large text)
    - [ ] Color not sole indicator of information

### Testing Requirements

11. **Automated Tests**
    - [ ] All existing tests pass (unit, integration, accessibility)
    - [ ] New component tests for CVRoute, CVHeader, CVSummary, CVFooter, DemoRoute, DemoHeader
    - [ ] Route navigation tests (CV ↔ Demo)

12. **Manual Verification**
    - [ ] Manual testing checklist completed (see Testing & Verification section)
    - [ ] Print preview verified on Chrome, Firefox, Safari
    - [ ] Screen reader testing (NVDA, JAWS, or VoiceOver)
    - [ ] Keyboard-only navigation testing

### Performance & Quality Requirements

13. **Performance**
    - [ ] Initial page load (CV route) < 2s on 3G (measure with Lighthouse)
    - [ ] No layout shift (CLS < 0.1)
    - [ ] No unnecessary re-renders (React DevTools Profiler)

14. **Code Quality**
    - [ ] No TypeScript errors
    - [ ] No ESLint warnings (or documented exceptions)
    - [ ] Component props typed with TypeScript interfaces
    - [ ] CSS follows existing naming conventions (BEM or CSS modules)

---

## Appendix: Removed Elements

**The following elements should be removed or relocated during implementation:**

### From CV Route
- [ ] `TerminalPanel` component (move to demo route)
- [ ] Terminal toggle or tab controls (remove)
- [ ] Split-pane or side-by-side layout with terminal (remove)
- [ ] Decorative project numbering (e.g., "01", "02", "Project 01") (remove)
- [ ] Atmospheric rail copy or flavor text unrelated to CV content (remove)
- [ ] Decorative icons without functional purpose (remove, except external link icons)
- [ ] Sticky section navigation if currently persistent (make non-sticky or remove)
- [ ] Large logos or branding elements in header (keep minimal)

### From Demo Route
- [ ] Full CV content duplication (remove; demo route is terminal-focused)
- [ ] Print controls (not relevant to demo route)

---

## Self-Review Checklist

**Before marking this specification as complete, verify:**

- [x] All sections required by user instructions are present:
  - [x] Goals/Non-Goals
  - [x] User Workflow
  - [x] Information Architecture/Routes
  - [x] Component Responsibilities
  - [x] Content/Data Flow
  - [x] Visual/Layout Rules with Rationale
  - [x] Responsive Behavior
  - [x] Print Behavior
  - [x] Accessibility
  - [x] Route/Error Handling
  - [x] Testing/Verification
  - [x] Migration Risks
  - [x] Acceptance Criteria

- [x] No placeholders or "TODO" sections remain
- [x] No contradictions between sections (e.g., component responsibilities vs. layout rules)
- [x] Every visual decision traceable to recruiter clarity, action, grouping, or document credibility
- [x] Scope clearly defined (layout and architecture, not implementation code)
- [x] Existing contracts preserved (evidence, accessibility, print, semantic HTML)
- [x] No ambiguous instructions (all rules have clear rationale and implementation guidance)

---

## Revision History

| Date       | Author | Changes                                      |
|------------|--------|----------------------------------------------|
| 2026-08-20 | Zoo    | Initial draft, recruiter-first CV redesign   |

---

**End of Specification**
