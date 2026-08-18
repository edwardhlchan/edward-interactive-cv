# A4 Monochrome CV Print Design

## Goal

Make the existing interactive CV export cleanly through the browser print dialog as an ATS-friendly, black-and-white PDF in A4 portrait orientation. The print version must fit the complete current CV content within one or two pages, without clipping, excessive whitespace, or interactive interface elements.

## Confirmed Requirements

- Use A4 portrait paper.
- Target one to two printed pages.
- Use black text on a white background, with grayscale-safe borders and no dependence on colour.
- Preserve every current education entry, project, skills group, achievement, contact method, and project link.
- Keep all text selectable and searchable in the generated PDF for ATS compatibility.
- Hide the interactive terminal, navigation rail, site chrome, print controls, and interactive-only footer content when printing.
- Retain the existing screen experience without visual regression.

## Existing Architecture

[`App`](../../../src/App.tsx:4) renders [`AppShell`](../../../src/components/AppShell.tsx:12) with the central [`profile`](../../../src/data/profile.ts:45) object. [`AppShell`](../../../src/components/AppShell.tsx:17) contains both the printable CV content and the interactive layout elements.

The semantic CV content is already presented in the intended printed order:

1. Profile header and contact links
2. Professional summary
3. Education
4. Key projects
5. Skills
6. Achievements

The terminal panel, navigation rail, chrome bar, print-action area, and interactive footer do not belong in the PDF.

## Recommended Design

Use one shared semantic document and a dedicated print stylesheet rather than rendering a second print-only CV component. The implementation will add focused class names or attributes only where reliable print targeting requires them.

### Print document styling

A new print stylesheet will define:

- An [`@page`](../../../src/styles/print.css:1) A4 portrait rule with predictable, conservative physical margins.
- [`@media print`](../../../src/styles/print.css:1) overrides that normalize the page to white paper, black text, and grayscale-safe thin rules.
- Removal of backgrounds, shadows, gradients, coloured accents, fixed viewport sizing, and decorative effects.
- A single-column document flow with a width calculated from the A4 content area rather than desktop layout constraints.
- Compact but readable type sizes, line-height, gaps, and list indentation.
- Visible, selectable text links. Link formatting must remain professional and should not expand every hyperlink into a duplicated raw URL where its displayed label already conveys the destination.

### Visibility rules

Print CSS will hide these interactive-only regions:

- `.site-chrome`
- `.navigation-rail`
- `.top-actions`
- The terminal panel in the footer
- Any visual-only hints, controls, or decorative status components

The printable header, contact links, main CV sections, and any neutral footer metadata needed for identification remain visible.

### Pagination strategy

The layout must rely on content-aware browser pagination, not CSS scaling or a screenshot/image conversion.

- Apply `break-inside: avoid` and the compatible `page-break-inside: avoid` fallback to logical CV records, especially education and project entries.
- Prevent a section heading from appearing at the bottom of a page without its first item using `break-after: avoid` or a local wrapper rule.
- Permit normal breaks between records; do not prevent breaks at the whole-section level because that can force large blank areas.
- Use only a small number of targeted break rules if browser preview shows an orphaned heading or awkward transition.
- Avoid absolute positioning, fixed heights, `100vh` constraints, and transforms in print styles.

## Content Audit Findings

The CV data in [`profile`](../../../src/data/profile.ts:45) substantially satisfies the workspace technical-CV guidance:

- **Contact and links:** professional name, Hong Kong international phone number, Gmail address based on the name, LinkedIn, and GitHub are present in [`contact`](../../../src/data/profile.ts:53).
- **Headline and summary:** current student status plus a clear IT operations and cybersecurity target are stated in [`identity`](../../../src/data/profile.ts:46).
- **Education and credentials:** the IBM and HKBU context, Distinction II top-four-percent explanation, and strong HKDSE results are provided in [`education`](../../../src/data/profile.ts:59).
- **Projects and proof:** projects use action verbs, technology-labelled titles, and available live links in [`projects`](../../../src/data/profile.ts:88).
- **Skills:** skills are grouped into programming, IT operations/security, tools/frameworks, and modern workflows in [`skills`](../../../src/data/profile.ts:130).
- **Achievements:** competition and computing award are explicitly listed in [`achievements`](../../../src/data/profile.ts:136).

The print work must preserve these strengths while removing interactive presentation features that would harm professional PDF readability.

## Acceptance Criteria

1. Browser print preview reports A4 portrait and renders the CV in no more than two pages at 100 percent scale.
2. The printed document contains no terminal, navigation rail, print button, site chrome, or interactive instruction text.
3. The printable document has a white background, black text, and sufficient contrast when printed on a monochrome printer.
4. No text, card border, contact item, project link, or section is clipped outside the printable margins.
5. No education or project record is split internally unless that record cannot fit on a new page by itself.
6. The PDF retains selectable text and functional links where the browser PDF engine supports them.
7. All current content from [`profile`](../../../src/data/profile.ts:45) remains in the print output.
8. The normal interactive browser layout remains unchanged.

## Verification

The implementation will run the existing commands defined in [`package.json`](../../../package.json:7):

- `npm run build`
- `npm run check:css`
- `npm run check:content`
- `npm run check:routes`

Manual verification will use browser print preview with A4 portrait, default scale, background graphics disabled, and Save to PDF. Review will confirm page count, legibility, monochrome appearance, correct flow, and absence of clipping.

## Scope Boundaries

This change does not rewrite the existing CV copy, remove portfolio items, create a separate data model, add server-side PDF generation, or alter the interactive terminal functionality. It provides CSS-driven PDF readiness for the existing shared CV document.
