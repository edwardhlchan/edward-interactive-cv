# Interactive CV — 03 Core CV UI Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `superpowers:subagent-driven-development` or `superpowers:executing-plans` to execute each checked step in order.

**Goal:** Render the complete semantic interactive CV from centralized profile data with desktop and mobile structure, navigation, contact links, project links, and print-safe content boundaries.

**Architecture:** `AppShell` owns page landmarks and route presentation. Focused presentational components render header, navigation, education, projects, skills, and achievements from `profile`. No component owns duplicate copy.

**Tech Stack:** React, TypeScript, CSS Modules or a single imported stylesheet, Testing Library, Vitest.

## Global Constraints

- Execute Plans 01 and 02 first.
- Use semantic HTML and one meaningful `h1`.
- Keep `/` and `/cv` equivalent; do not add `/dse` or `/dse-calculator/`.
- Use native links/buttons, descriptive labels, visible focus styles, and `aria-current` for active section navigation.
- Use the approved reference content from [`src/data/profile.ts`](../../src/data/profile.ts:1).
- Keep terminal state and command parsing out of this plan; Plan 04 owns it.

---

## Files

- Create: [`src/components/AppShell.tsx`](../../src/components/AppShell.tsx)
- Create: [`src/components/ProfileHeader.tsx`](../../src/components/ProfileHeader.tsx)
- Create: [`src/components/SectionNav.tsx`](../../src/components/SectionNav.tsx)
- Create: [`src/components/ResumeSection.tsx`](../../src/components/ResumeSection.tsx)
- Create: [`src/components/EducationList.tsx`](../../src/components/EducationList.tsx)
- Create: [`src/components/ProjectList.tsx`](../../src/components/ProjectList.tsx)
- Create: [`src/components/ProjectCard.tsx`](../../src/components/ProjectCard.tsx)
- Create: [`src/components/SkillsGrid.tsx`](../../src/components/SkillsGrid.tsx)
- Create: [`src/components/AchievementList.tsx`](../../src/components/AchievementList.tsx)
- Create: [`src/components/PrintControls.tsx`](../../src/components/PrintControls.tsx)
- Create: [`src/components/CVLayout.test.tsx`](../../src/components/CVLayout.test.tsx)
- Modify: [`src/App.tsx`](../../src/App.tsx)
- Modify: [`src/styles/global.css`](../../src/styles/global.css)

## Interfaces

```tsx
export type SectionId = "summary" | "education" | "projects" | "skills" | "achievements";

export function AppShell({ profile }: { profile: Profile }): JSX.Element;
export function ProfileHeader({ profile }: { profile: Profile }): JSX.Element;
export function SectionNav({ activeSection }: { activeSection: SectionId }): JSX.Element;
export function ResumeSection({ id, title, children }: { id: SectionId; title: string; children: React.ReactNode }): JSX.Element;
export function EducationList({ entries }: { entries: EducationEntry[] }): JSX.Element;
export function ProjectList({ projects }: { projects: Project[] }): JSX.Element;
export function ProjectCard({ project }: { project: Project }): JSX.Element;
export function SkillsGrid({ groups }: { groups: SkillGroup[] }): JSX.Element;
export function AchievementList({ achievements }: { achievements: string[] }): JSX.Element;
export function PrintControls(): JSX.Element;
```

### Task 1: Create the failing semantic layout test

- [ ] **Step 1: Write `CVLayout.test.tsx` assertions.**

```tsx
import { render, screen } from "@testing-library/react";
import App from "../App";

describe("CV layout", () => {
  it("renders the CV landmarks and every required section", () => {
    render(<App />);
    expect(screen.getByRole("banner")).toBeInTheDocument();
    expect(screen.getByRole("navigation", { name: /cv sections/i })).toBeInTheDocument();
    expect(screen.getByRole("main", { name: /interactive cv/i })).toBeInTheDocument();
    for (const title of ["Professional Summary", "Education", "Key Projects", "Skills", "Achievements & Awards"]) {
      expect(screen.getByRole("heading", { name: title })).toBeInTheDocument();
    }
  });

  it("renders the approved external contact and project links", () => {
    render(<App />);
    expect(screen.getByRole("link", { name: /contact@edwardchan\.dev/i })).toHaveAttribute(
      "href",
      "mailto:contact@edwardchan.dev",
    );
    expect(screen.getByRole("link", { name: /linkedin\.com\/in\/edhlchan/i })).toHaveAttribute(
      "href",
      "https://linkedin.com/in/edhlchan",
    );
    expect(screen.getByRole("link", { name: /interactive cv/i })).toHaveAttribute(
      "href",
      "https://edward-portfolio.runs-as-a-cloudflare.workers.dev/cv",
    );
  });

  it("does not render the excluded DSE route", () => {
    render(<App />);
    expect(screen.queryByRole("link", { name: /dse calculator/i })).not.toBeInTheDocument();
    expect(document.body.textContent).not.toContain("/dse-calculator/");
  });
});
```

- [ ] **Step 2: Run the focused test and confirm failure.**

```bash
npm run test:run -- src/components/CVLayout.test.tsx
```

Expected: FAIL because the component tree does not yet exist.

### Task 2: Implement shared section and header components

- [ ] **Step 1: Implement `ResumeSection`.**

Render a `<section id={id} aria-labelledby={`${id}-heading`}>`, an `h2` using the matching ID, and its children. Use `SectionId` for type-safe IDs.

- [ ] **Step 2: Implement `ProfileHeader`.**

Render a `<header>` with one `h1`, the role and aspiration, the full summary paragraph, and an `<address>` containing every `profile.contact` link. Use `target="_blank"` only for external web links and add `rel="noreferrer"`; keep phone/email in the current tab.

- [ ] **Step 3: Implement `PrintControls`.**

Render a native button labelled `Print CV` whose click handler calls `window.print()`. No custom print modal is allowed.

- [ ] **Step 4: Implement `SectionNav`.**

Render a `<nav aria-label="CV sections">` with links to `#summary`, `#education`, `#projects`, `#skills`, and `#achievements`. Set `aria-current="location"` only on the link whose ID equals `activeSection`; omit the attribute from inactive links.

- [ ] **Step 5: Add the navigation and header tests.**

Assert one `h1`, one banner, one address, five section links, and exactly one `Print CV` button. Run:

```bash
npm run test:run -- src/components/CVLayout.test.tsx
```

Expected: the new focused assertions pass or fail only on not-yet-rendered list components.

### Task 3: Implement education, project, skill, and achievement renderers

- [ ] **Step 1: Implement `EducationList`.**

Render each entry as an `<article>` with visible dates/provider metadata and a heading for the qualification title. Render every detail string as a list item or paragraph without dropping copy.

- [ ] **Step 2: Implement `ProjectCard` and `ProjectList`.**

Render each project as an `<article>` with a heading, technology tags, each detail, and its optional links. Use descriptive link text. Do not render an empty links container. Do not create a DSE link.

- [ ] **Step 3: Implement `SkillsGrid`.**

Render each skill group as a labelled list. Use `<h3>` for category labels and `<ul>`/`<li>` for items.

- [ ] **Step 4: Implement `AchievementList`.**

Render each achievement as a list item.

- [ ] **Step 5: Run content-rendering assertions.**

Add assertions for three education articles, four project articles, four skill category headings, and two achievement list items. Run:

```bash
npm run test:run -- src/components/CVLayout.test.tsx
```

Expected: PASS.

### Task 4: Compose `AppShell` and route-equivalent application

- [ ] **Step 1: Compose the landmarks.**

`AppShell` must render:

```tsx
<div className="app-shell">
  <a className="skip-link" href="#main-content">Skip to content</a>
  <header>...</header>
  <SectionNav activeSection="summary" />
  <main id="main-content" aria-label="Interactive CV">...</main>
  <footer>...</footer>
</div>
```

The footer may contain the terminal mount point but no DSE link.

- [ ] **Step 2: Render the five sections in order.**

Use `ResumeSection` for Summary, Education, Key Projects, Skills, and Achievements & Awards. Render summary from `profile.identity.summary`; render all other content through focused list components.

- [ ] **Step 3: Update `App.tsx`.**

Import `profile` and render `<AppShell profile={profile} />`. Treat `/` and `/cv` as equivalent by rendering the same application regardless of pathname. Do not use a router dependency for two equivalent views.

- [ ] **Step 4: Add baseline styles.**

Update `src/styles/global.css` with CSS custom properties, reset, typography, page background, content grid, readable max-width, link styles, focus-visible outline, button styling, section spacing, and no-overflow defaults. Keep print-specific details for Plan 05.

- [ ] **Step 5: Run all tests and build.**

```bash
npm run test:run && npm run build
```

Expected: PASS and successful Vite build.

- [ ] **Step 6: Commit the core UI.**

```bash
git add src/App.tsx src/components src/styles/global.css
git commit -m "feat: render semantic interactive CV"
```

## Completion Gate

- All five CV sections render from `profile`.
- `/` and `/cv` render the same app.
- Contact and approved CV demo links are functional.
- The page has semantic landmarks, one `h1`, keyboard-capable native controls, and no DSE route/link.
