# Resume Visual Rhythm Redesign

## Goal

Redesign [`Black and White Clean Professional A4 Resume.html`](../../Black%20and%20White%20Clean%20Professional%20A4%20Resume.html) so the one-page resume has consistent typography, line spacing, entry spacing, and column behavior. Preserve the existing wording and monochrome identity while correcting the problems described as uneven length, inconsistent font sizes, and mismatched line heights.

## Guidance incorporated

The redesign follows [`CV_Writing_Assistant_Guide.md`](../../CV_Writing_Assistant_Guide.md):

- Keep the output exactly one A4 page with comfortable margins.
- Use an 18–22pt name and a compact contact line.
- Keep education near the top for a student resume.
- Use consistent line heights, bullet alignment, and category-based skills.
- Avoid awkward column wrapping.
- Keep project bullets action-led and retain concrete technologies and achievements.

## Core visual direction

Use a single-column editorial layout. Only Education uses a two-column internal row because dates and institutions benefit from aligned labels. Projects, Skills, and Achievements remain fully stacked, preventing uneven columns and large visual gaps.

The page should feel like a deliberately typeset resume rather than a compressed collection of independent blocks. The design uses a small, explicit rhythm system instead of one-off margins and type sizes.

## Page geometry

- Page size: A4.
- Horizontal print margins: 14mm.
- Vertical print margins: 12mm.
- Screen presentation: white page on a neutral background, without a page shadow in the redesigned treatment.
- No absolute positioning, transforms, fixed coordinates, or generated Canva wrappers.

## Typography system

Use one system sans-serif stack throughout the document.

- Base body size: `9.5pt`.
- Base line height: `1.35`.
- Name: `21pt`, bold, moderate letter spacing.
- Professional title: `10.5pt`.
- Section headings: `11pt`, bold, uppercase, identical treatment in every section.
- Entry/project headings: body size with bold weight; do not introduce a separate larger project scale.
- Supporting text, institution text, URLs, and list content: inherit the base body scale unless a clearly documented muted treatment is required.
- Do not create separate compressed print typography rules.

## Spacing system

Define a small set of reusable spacing values and apply them consistently:

- Intra-entry spacing: 4px.
- Between sibling entries: 10px.
- Before each section: 18px.
- Heading-to-rule/content spacing: 5px.
- Bullet/list spacing: one consistent compact value.

Every section uses the same section-heading margin, rule, and content offset. Do not mix unrelated millimetre values on individual elements.

## Header

The header contains:

1. Name at 21pt.
2. Professional title at 10.5pt.
3. One contact line with phone, email, and GitHub separated by vertical bars.

The contact line wraps only at narrow screen widths. Do not use icons; they create baseline and spacing inconsistencies and are not necessary because the text links are explicit and accessible.

## Section treatment

Professional Summary, Education, Projects, Skills, and Achievements all use the same section heading component:

- Uppercase text.
- 11pt bold type.
- Consistent letter spacing.
- Identical bottom rule.
- Identical heading-to-content spacing.

No section-specific font-size or line-height overrides are allowed.

## Education layout

Keep Education immediately after the summary. Each education entry is a two-column grid:

- Fixed `28mm` left column for date and institution.
- Flexible right column for the qualification title and description.
- Metadata uses the same base typographic rhythm as the rest of the document.
- The qualification title is bold at body size.
- Supporting education text uses normal body size and line height.

Education entries must remain intact during printing through `break-inside: avoid`, but the section itself may flow normally if the browser needs to paginate.

## Project layout

Stack all four projects vertically:

- Project title is bold at body size.
- Each project uses the same bullet indentation.
- Each bullet uses the same line height and vertical spacing.
- Portfolio URL appears as one final muted line under the Serverless Web Functions project.
- No project is placed beside another project.

This creates one predictable reading path and removes the current visual imbalance caused by independent wrapping.

## Skills and achievements layout

Stack all skill categories vertically:

- Each category begins with a bold label.
- Skills after the label use normal weight.
- Categories share one list rhythm.
- Do not use a two-column skills grid.

Achievements use the same list rhythm as project bullets. This makes the final sections visually consistent with the rest of the document.

## Responsive behavior

At narrow screen widths:

- The page becomes full width with reduced side padding.
- Education changes from the date/details grid to one column.
- Contact links may wrap naturally.
- Projects, Skills, and Achievements remain stacked.
- Typography and line height remain readable and consistent.

## Print behavior

- Use `@page { size: A4; margin: 0; }`.
- Apply the 14mm horizontal and 12mm vertical page padding inside the page container.
- Keep screen and print font sizes identical.
- Remove screen-only page background treatment in print.
- Apply `break-inside: avoid` to education and project entries.
- Validate at 100% scale with browser headers and footers disabled.
- If the content is slightly too tall, reduce inter-entry spacing before reducing the base font size.

## Acceptance criteria

1. The rendered page remains exactly one A4 page at 100% print scale.
2. All body content uses one base size and one base line height.
3. All section headings share one size, weight, rule, and spacing treatment.
4. There are no visibly tiny education paragraphs or oversized project headings.
5. Projects, skills, and achievements read as one stacked column with predictable spacing.
6. Education dates align consistently without causing awkward text wrapping.
7. Bullet indentation and line spacing are identical across project and achievement lists.
8. Existing resume wording, dates, contact values, technologies, URLs, and achievements remain present.
9. The document remains responsive without horizontal overflow on narrow screens.
10. The file remains self-contained and free of Canva assets, scripts, footer markup, and external stylesheets.

## Out of scope

- Adding or removing resume claims.
- Rewriting the resume content beyond preserving the verified source wording.
- Adding photos, icons, color accents, animations, or interactive features.
- Editing the PDF, PPTX, Canva asset folder, or unrelated documents.
