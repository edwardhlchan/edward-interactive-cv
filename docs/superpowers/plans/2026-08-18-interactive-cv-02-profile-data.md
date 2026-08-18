# Interactive CV — 02 Profile Data Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `superpowers:subagent-driven-development` or `superpowers:executing-plans` to execute each checked step in order.

**Goal:** Add one validated, reference-authoritative data model for every visible CV section and permitted link.

**Architecture:** The React UI consumes a single exported `profile` object from a focused data module. All future components render from this object; no CV copy is duplicated in JSX or CSS.

**Tech Stack:** TypeScript, Vitest.

## Global Constraints

- Execute [`2026-08-18-interactive-cv-01-foundation.md`](2026-08-18-interactive-cv-01-foundation.md:1) first.
- Use the reference content authority documented in [`2026-08-18-interactive-cv-design.md`](../specs/2026-08-18-interactive-cv-design.md:19).
- Include the approved phone, email, LinkedIn, GitHub, and reference `/cv` demo URL.
- Retain the DSE project description but omit its future URL until the user supplies it.
- Do not import or reuse the legacy links in [`about.md`](../../about.md:41).

---

## Files

- Create: [`src/data/profile.ts`](../../src/data/profile.ts)
- Create: [`src/data/profile.test.ts`](../../src/data/profile.test.ts)
- Modify: [`src/App.tsx`](../../src/App.tsx)

## Interfaces

`src/data/profile.ts` exports these types and value:

```ts
export type ContactLink = {
  label: string;
  href: string;
  kind: "phone" | "email" | "linkedin" | "github";
};

export type EducationEntry = {
  title: string;
  provider: string;
  dates: string;
  details: string[];
};

export type ProjectLink = {
  label: string;
  href: string;
};

export type Project = {
  title: string;
  technologies: string[];
  details: string[];
  links: ProjectLink[];
};

export type SkillGroup = {
  category: string;
  items: string[];
};

export type Profile = {
  identity: {
    name: string;
    role: string;
    aspiration: string;
    summary: string;
  };
  contact: ContactLink[];
  education: EducationEntry[];
  projects: Project[];
  skills: SkillGroup[];
  achievements: string[];
};

export const profile: Profile;
```

`App` imports `profile` and renders `profile.identity.name` as an interim assertion that the UI consumes central data.

### Task 1: Define the profile contract with tests

- [ ] **Step 1: Create a failing data-contract test.**

Write [`src/data/profile.test.ts`](../../src/data/profile.test.ts):

```ts
import { profile } from "./profile";

describe("profile", () => {
  it("contains the approved public identity and contact destinations", () => {
    expect(profile.identity.name).toBe("Edward Chan");
    expect(profile.contact).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ href: "tel:+85255117745" }),
        expect.objectContaining({ href: "mailto:contact@edwardchan.dev" }),
        expect.objectContaining({ href: "https://linkedin.com/in/edhlchan" }),
        expect.objectContaining({ href: "https://github.com/edhlchan" }),
      ]),
    );
  });

  it("contains the four reference projects without a DSE calculator URL", () => {
    expect(profile.projects).toHaveLength(4);
    expect(profile.projects.map((project) => project.title)).toEqual(
      expect.arrayContaining([
        expect.stringMatching(/Full-Stack Web Apps/),
        expect.stringMatching(/Security Log Analysis/),
        expect.stringMatching(/Automated Data Parsing/),
        expect.stringMatching(/Real-Time Input/),
      ]),
    );
    expect(JSON.stringify(profile)).not.toContain("/dse-calculator/");
  });
});
```

- [ ] **Step 2: Run the data test and confirm failure.**

Run:

```bash
npm run test:run -- src/data/profile.test.ts
```

Expected: FAIL because `src/data/profile.ts` does not exist.

### Task 2: Implement the reference-authoritative profile data

- [ ] **Step 1: Create the data module and exported types.**

Create [`src/data/profile.ts`](../../src/data/profile.ts) with all interface types shown above and export `profile` typed as `Profile`.

- [ ] **Step 2: Add identity and contact data.**

Set these exact contact values:

```ts
contact: [
  { label: "+852 5511 7745", href: "tel:+85255117745", kind: "phone" },
  { label: "contact@edwardchan.dev", href: "mailto:contact@edwardchan.dev", kind: "email" },
  { label: "linkedin.com/in/edhlchan", href: "https://linkedin.com/in/edhlchan", kind: "linkedin" },
  { label: "github.com/edhlchan", href: "https://github.com/edhlchan", kind: "github" },
]
```

Set the name to `Edward Chan`, role to `Information Technology Student`, aspiration to `Aspiring Technology Operations & Cybersecurity Professional`, and copy the approved reference professional summary verbatim.

- [ ] **Step 3: Add the three approved education entries.**

Add entries for:

1. CLAP-TECH Pathway, with the Jockey Club/HKBU/IBM line and Higher Diploma in Data Science, expected start `2026/09`.
2. Applied Learning in Tech Basics, dated `2024 – 2025`, including Distinction II, new-collar IT training, Equinix Data Center immersion, and Splunk BOTS Top 10 context.
3. Hong Kong Diploma of Secondary Education, dated `2020 – 2026`, provided by Lai King Catholic Secondary School, including Level 5 ICT and Level 5 English Language.

- [ ] **Step 4: Add the four approved projects.**

Add these exact project titles and technology arrays:

```text
Full-Stack Web Apps & Digital Portfolio | Cloudflare Workers, D1, JS
Security Log Analysis & Incident Response Simulation | Splunk BOTS
Automated Data Parsing Desktop Application | Python, PyQt
Real-Time Input-Translation Engine | C#
```

Copy each approved reference detail into `details`. The first project has exactly one link:

```ts
{
  label: "Interactive CV",
  href: "https://edward-portfolio.runs-as-a-cloudflare.workers.dev/cv",
}
```

Do not add the current reference DSE URL or any `dse` link.

- [ ] **Step 5: Add skills and achievements.**

Create four categories with the reference items:

```text
Programming
Cybersecurity & IT Ops
Tools & Frameworks
Modern Workflows
```

Create exactly these achievement statements:

```text
Top 10 Finalist – Splunk Boss of the SOC (BOTS) Hong Kong (2025)
Distinction Award – Canadian Computing Competition (2025)
```

- [ ] **Step 6: Update `App` to demonstrate central data use.**

Update [`src/App.tsx`](../../src/App.tsx) to import `profile` and render the profile name inside the existing labelled `<main>`. Keep the component minimal; visual layout belongs to Plan 3.

- [ ] **Step 7: Run the data and app tests.**

Run:

```bash
npm run test:run -- src/data/profile.test.ts src/App.test.tsx
```

Expected: PASS.

- [ ] **Step 8: Add regression tests for forbidden legacy and DSE URLs.**

Extend `profile.test.ts`:

```ts
it("does not carry legacy links or an unapproved DSE site URL", () => {
  const serialized = JSON.stringify(profile);
  expect(serialized).not.toContain("lmaodick1239");
  expect(serialized).not.toContain("yusixian");
  expect(serialized).not.toContain("dse-calculator");
});
```

- [ ] **Step 9: Re-run all tests and build.**

Run:

```bash
npm run test:run && npm run build
```

Expected: PASS and successful Vite build.

- [ ] **Step 10: Commit profile data.**

```bash
git add src/data/profile.ts src/data/profile.test.ts src/App.tsx
git commit -m "feat: add interactive CV profile data"
```

## Completion Gate

- Every screen-visible CV fact comes from `profile`.
- Contact values are the approved reference values.
- There are exactly four projects, including a DSE description but no DSE URL.
- No legacy local identity/link values are present in the new data module.
