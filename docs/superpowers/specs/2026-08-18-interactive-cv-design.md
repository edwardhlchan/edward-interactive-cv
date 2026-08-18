# Interactive CV on Cloudflare Workers Design Specification

## Status

Approved in brainstorming review. This document defines the first implementation scope for a new interactive CV site in the current workspace. The DSE calculator is a separate future site and is explicitly excluded.

## Goal

Build an interactive, responsive, print-friendly CV for Edward Chan that reproduces the current reference deployment’s public CV content, contact links, project descriptions, and developer-console interaction style while establishing a maintainable Cloudflare Workers project from the current resume-only workspace.

Reference deployment:

- `https://edward-portfolio.runs-as-a-cloudflare.workers.dev/`
- The reference exposes an interactive CV at `/` and `/cv` and a separate DSE calculator at `/dse-calculator/`.
- This project implements the CV experience only. The DSE calculator will be hosted separately later and must not be scaffolded here.

## Content Authority

The user explicitly selected the reference deployment as the authoritative content source for this implementation. Use the reference CV’s current content and public links exactly as shown during the design review, including:

- Edward Chan
- Information Technology Student
- Aspiring Technology Operations & Cybersecurity Professional
- Phone: `+852 5511 7745`
- Email: `contact@edwardchan.dev`
- LinkedIn: `https://linkedin.com/in/edhlchan`
- GitHub: `https://github.com/edhlchan`
- The reference’s professional summary, education entries, four project entries, skills categories, and two achievements
- The approved live CV demo URL: `https://edward-portfolio.runs-as-a-cloudflare.workers.dev/cv`
- The DSE project description may remain as reference content, but its future external URL is omitted until the user provides the separate site link

The local [`about.md`](../../about.md:9) and [`CV_Writing_Assistant_Guide.md`](../../CV_Writing_Assistant_Guide.md:1) remain repository context and quality references, but they are not the content authority for this new app. In particular, do not carry forward legacy local links or identities that conflict with the approved reference content. The local CV skill’s quality requirements remain applicable: use a professional identity, clear project action verbs, categorized skills, working links, accessible presentation, and print-ready visual rhythm.

## Scope

### Included

- Vite-based browser application for the interactive CV
- Cloudflare Worker static-asset serving configuration
- Wrangler local installation and development/deployment scripts
- `/` primary CV route
- `/cv` compatibility alias to the same CV experience
- Responsive desktop, tablet, and mobile presentation
- Semantic CV sections: summary, education, projects, skills, achievements, and contact links
- Structured content data rendered by reusable components
- Browser print action and print-specific layout rules
- Terminal-style status panel with constrained local commands
- Keyboard accessibility, visible focus states, reduced-motion support, and direct-route refresh handling
- Build and Worker-preview verification

### Excluded

- DSE calculator UI, API, database, D1 binding, submissions, rankings, percentile calculations, or authentication
- A `/dse` or `/dse-calculator/` implementation in this project
- Arbitrary shell execution or command forwarding from the terminal UI
- Cloudflare account login, API token creation, DNS changes, custom-domain setup, or production deployment without user-provided account configuration
- Unrelated changes to the existing Astro-oriented Markdown content or resume source assets

## Architecture

Use a small Vite frontend served through Cloudflare Workers Static Assets.

### Runtime model

- Vite builds the browser application into a static output directory.
- A minimal Worker serves the generated assets through a configured asset binding.
- Asset fallback supports the `/` and `/cv` routes on direct navigation and refresh.
- No server-side data store or API is required for the CV.
- All profile content is bundled as static application data.

### Why this approach

This is the smallest architecture that supports the requested app-like interactions while keeping Wrangler and Cloudflare deployment first-class. It avoids introducing an unnecessary content framework for one CV and avoids concentrating all behavior in a single HTML file. The structure also leaves a clean boundary for future independent site work without coupling this app to the DSE calculator.

### Alternative approaches rejected

1. **Astro on Workers:** Strong content conventions, but more framework surface than this single interactive CV needs.
2. **Single static HTML plus minimal Worker:** Quick to start, but interactive state, responsive behavior, and content maintenance would become concentrated in one file.

## Application Routes

- `/`: primary interactive CV.
- `/cv`: compatibility alias rendering the same CV application.
- Any unsupported route: show a controlled not-found state or redirect only when explicitly implemented; do not pretend that the excluded DSE calculator exists.

The implementation must preserve direct navigation and refresh behavior for `/cv` under local Vite preview and Wrangler Worker preview.

## Visual Design

The visual language follows the reference site’s technical portfolio character while keeping the CV as the dominant experience:

- High-contrast, restrained developer-console styling.
- Clean reading surface with strong typographic hierarchy.
- Compact top bar with identity, an `Interactive CV` label, and a `Print CV` control.
- Centered content frame with a readable maximum width and responsive side padding.
- Profile header with name, target role, summary, and public contact links.
- Section navigation or anchored navigation for Summary, Education, Projects, Skills, and Achievements.
- Stacked content sections with consistent heading rules, metadata, tags, bullets, and link treatment.
- A bottom terminal/status panel echoing the reference prompt `root@edward-ops:~$` without putting the primary CV content inside a decorative card.

### Responsive layout

- Desktop: two-zone composition with a narrow navigation/status rail and a wider reading column.
- Tablet: compact horizontal navigation/control treatment.
- Mobile: one-column flow, wrapping contact links, touch-sized controls, and terminal history constrained to the viewport.
- Print: hide navigation, terminal chrome, and interactive-only controls while preserving all CV content in a clean document layout.

Use stable sizing for controls and layout regions so hover, focus, dynamic terminal output, and long link labels do not cause layout shifts. Respect `prefers-reduced-motion`.

## Component Boundaries

Keep components focused and content-driven:

- `AppShell`: route-aware shell, landmarks, global layout, navigation, and print action.
- `ProfileHeader`: identity, role, summary, and contact destinations.
- `SectionNav`: section links and active-section state using `aria-current`.
- `ResumeSection`: shared section heading and content framing.
- `EducationList`: education entries from structured data.
- `ProjectList`: project entries from structured data.
- `ProjectCard`: project title, technology labels, descriptions, and optional live links.
- `SkillsGrid`: categorized skills.
- `AchievementList`: achievement entries.
- `TerminalPanel`: prompt, bounded command history, input, and command output.
- `PrintControls`: native browser print trigger and print affordance.

The exact file naming and framework syntax may follow the selected implementation language, but these responsibilities should remain separate.

## Content Data Model

Create one typed or structurally validated profile object with these groups:

```text
profile
  identity
    name
    role
    aspiration
    summary
  contact
    phone
    email
    linkedin
    github
  education[]
    title
    provider
    dates
    details[]
  projects[]
    title
    technologies[]
    details[]
    links[]
  skills[]
    category
    items[]
  achievements[]
```

The content renderer must use this same data for screen and print presentation. Do not duplicate resume copy in multiple templates. External destinations must be descriptive and accessible; links that open a new tab must use appropriate `rel` attributes.

## Terminal Interaction

The terminal is a constrained local command palette. It is not a real shell and must never execute arbitrary user input.

Initial prompt:

```text
root@edward-ops:~$
```

Supported commands:

- `help`: list available commands.
- `about`: scroll to the summary and print a short identity line.
- `projects`: scroll to Projects and list project names.
- `skills`: scroll to Skills and list skill categories.
- `contact`: reveal or focus the contact links.
- `print`: invoke the browser print dialog.
- `clear`: clear terminal history.
- `whoami`: print the profile identity.
- Empty input: no-op.
- Unknown input: print a concise error and suggest `help`.

Implementation requirements:

- Submit on Enter.
- Centralize command parsing and effects in one handler.
- Keep a bounded history to avoid unbounded DOM growth.
- Use the same scroll/focus behavior as the visible navigation where appropriate.
- Never send commands to the Worker, invoke a browser shell, evaluate code, or interpret arbitrary command syntax.
- Preserve keyboard access and provide a usable mobile input experience.

## Wrangler and Project Setup

Planned project files:

- [`package.json`](../../package.json): scripts, Vite dependency, and pinned local Wrangler dependency.
- [`wrangler.toml`](../../wrangler.toml): Worker name selected during scaffolding, compatibility date, static asset directory/binding, and route/fallback configuration.
- [`index.html`](../../index.html): Vite document entry.
- `src/`: application shell, profile data, components, terminal state, and styles.
- `public/`: metadata and optional static assets.
- `tests/`: focused source or browser checks where supported by the selected toolchain.
- [`README.md`](../../README.md): installation, local development, Worker preview, deployment prerequisites, and route behavior.

Required workflow:

- Install Wrangler as a pinned local development dependency with the project package manager.
- Use Vite’s development command for fast frontend iteration.
- Use `wrangler dev` to validate the built asset and Worker integration.
- Use `wrangler deploy` only after Cloudflare account/project configuration is available and explicitly intended.
- Do not store API tokens or account secrets in the repository.
- Keep the configuration compatible with a future custom domain without assuming DNS ownership.

The implementation plan must choose the package manager based on the environment’s available tooling and lockfile conventions. It must not install global dependencies when a local project dependency is sufficient.

## Accessibility and Semantics

- Use a skip-to-content link.
- Use one meaningful `h1` and a logical heading hierarchy.
- Use `header`, `nav`, `main`, `section`, `article`, and `footer` landmarks where semantically appropriate.
- Use native `<a>` and `<button>` elements for links and actions.
- Use descriptive link names, not icon-only controls.
- Provide visible `:focus-visible` styles.
- Mark the active section with `aria-current`.
- Ensure terminal output and error messages are understandable to screen-reader users.
- Support keyboard-only navigation and mobile touch targets.
- Respect reduced-motion preferences.
- Maintain readable contrast and prevent horizontal overflow at narrow widths.

## Print Behavior

The print stylesheet must:

- Hide navigation, terminal controls/history, decorative console chrome, and print button.
- Preserve the CV identity, summary, education, project descriptions, skills, achievements, contact links, and the approved live CV demo URL.
- Do not include or advertise a DSE calculator URL until the user provides the separate site link.
- Avoid clipped content and preserve readable line-height.
- Keep project and education entries together where practical.
- Use a clean white document surface and browser-compatible print rules.
- Avoid relying on the screen-only two-zone layout for printed output.

## Verification Plan

### Source and build checks

- Install dependencies successfully with the selected package manager.
- Run the production build.
- Run the Worker preview/build flow with Wrangler.
- Verify the generated asset directory matches the Worker configuration.
- Verify `/` and `/cv` route handling.
- Confirm required content strings, links, routes, and terminal commands are present.
- Confirm no DSE calculator code, D1 binding, calculator navigation, or unrelated API surface is present.
- Confirm no arbitrary command execution path exists.
- Confirm no credentials or secrets are committed.

### Browser checks

Validate at representative desktop, tablet, and mobile viewport sizes:

- Initial page layout and hierarchy.
- Header, navigation, content sections, links, and print control.
- Keyboard focus order and visible focus states.
- Active section navigation behavior.
- Terminal commands: `help`, `about`, `projects`, `skills`, `contact`, `print`, `clear`, `whoami`, empty input, and unknown input.
- Responsive wrapping of contact links, controls, project metadata, and terminal output.
- Reduced-motion behavior where applicable.
- Print preview with interactive-only chrome removed and CV content retained.
- Direct navigation and refresh for `/` and `/cv` in Worker preview.
- Phone, email, LinkedIn, GitHub, and the approved live CV demo link resolve to the approved reference destinations.
- No DSE calculator link is emitted before the user provides the separate site URL.

## Acceptance Criteria

1. A maintainable Vite application is scaffolded from the current resume-only workspace.
2. Wrangler is installed locally and configured for Cloudflare Worker static-asset serving.
3. `/` and `/cv` render the same interactive CV experience.
4. The screen content reproduces the reference CV’s approved current content and public contact links, without hardcoding a future DSE site URL.
5. The DSE calculator and its backend concerns are absent from this project.
6. The CV is responsive across desktop, tablet, and mobile layouts without horizontal overflow.
7. The terminal supports only the documented safe local commands.
8. Keyboard navigation, focus states, semantic landmarks, and reduced-motion behavior are implemented.
9. Print output removes interactive chrome and retains a readable CV.
10. The production build and Wrangler preview complete successfully.
11. The implementation documentation explains setup, scripts, routes, and deployment prerequisites.
12. No credentials, unrelated legacy identity links, or unsupported application surface is introduced.

## Out of Scope for This Specification

- Implementing the separate DSE calculator site.
- Connecting the future DSE site to this Worker or sharing its database/API.
- Modifying the existing Astro `about.md` content contract.
- Rebuilding the standalone resume HTML unless a focused implementation step needs to reuse a verified layout idea.
- Adding analytics, authentication, CMS functionality, or server-side persistence.
- Choosing a production Worker name or Cloudflare account-specific deployment settings before scaffolding confirms the local project identity.
