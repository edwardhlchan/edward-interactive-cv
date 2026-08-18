# Resume HTML Formatting Rebuild Design

## Goal

Rebuild [`Black and White Clean Professional A4 Resume.html`](../../Black%20and%20White%20Clean%20Professional%20A4%20Resume.html) as a clean, semantic, print-ready one-page A4 resume. Preserve the existing resume wording and black-and-white visual identity while correcting spacing, alignment, typography, page flow, and responsiveness.

## Current problem

The source is a Canva website export. Its resume content is represented by many generated wrappers, inline dimensions, absolute coordinates, transforms, and external Canva assets. This makes the visual result difficult to maintain and causes inconsistent text scale, excessive whitespace, fragile alignment, and unreliable printing.

The existing Canva footer, terms/privacy modal, scripts, and external asset dependencies are not part of the resume and will be removed from the rebuilt document.

## Design direction

Use a single-column editorial layout:

- A centered A4 page surface with a white background and subtle screen-only shadow.
- A compact header containing the name, professional title, and contact links.
- A short professional summary below the header.
- Consistent section headings in uppercase with letter spacing and a thin horizontal rule.
- Education entries laid out with a fixed date column and a flexible details column.
- Project entries displayed as compact articles with bold titles and concise bullet lists.
- Skills displayed in a two-column list within the otherwise single-column document.
- Achievements displayed as a compact list at the end.

The visual language remains monochrome: near-black body text, dark navy/black emphasis, gray rules, and no decorative colors or graphics.

## Document structure

Replace the generated body content with semantic HTML:

- [`header`](../../Black%20and%20White%20Clean%20Professional%20A4%20Resume.html) for identity and contact information.
- [`main`](../../Black%20and%20White%20Clean%20Professional%20A4%20Resume.html) for resume content.
- [`section`](../../Black%20and%20White%20Clean%20Professional%20A4%20Resume.html) for Summary, Education, Projects, Skills, and Achievements.
- [`article`](../../Black%20and%20White%20Clean%20Professional%20A4%20Resume.html) for each education and project entry.
- Heading hierarchy using [`h1`](../../Black%20and%20White%20Clean%20Professional%20A4%20Resume.html), [`h2`](../../Black%20and%20White%20Clean%20Professional%20A4%20Resume.html), and [`h3`](../../Black%20and%20White%20Clean%20Professional%20A4%20Resume.html).
- [`ul`](../../Black%20and%20White%20Clean%20Professional%20A4%20Resume.html) and [`li`](../../Black%20and%20White%20Clean%20Professional%20A4%20Resume.html) for project, skill, and achievement lists.
- [`a`](../../Black%20and%20White%20Clean%20Professional%20A4%20Resume.html) elements for email, phone, and GitHub links.

Preserve the resume text currently visible in the source, including the professional summary, education details, project descriptions, skills, and achievements. Do not add new claims or remove existing claims during the formatting rebuild.

## CSS and print behavior

Add one self-contained stylesheet in the rebuilt HTML:

- Define page dimensions using [`@page`](../../Black%20and%20White%20Clean%20Professional%20A4%20Resume.html) with A4 size and controlled print margins.
- Use [`box-sizing: border-box`](../../Black%20and%20White%20Clean%20Professional%20A4%20Resume.html) globally.
- Use a readable system sans-serif font stack with explicit body font size, line height, and text color.
- Use CSS custom properties for repeated colors, spacing, rules, and typography values.
- Keep the page within one A4 sheet through compact but readable spacing and avoid arbitrary absolute positioning.
- Use [`break-inside: avoid`](../../Black%20and%20White%20Clean%20Professional%20A4%20Resume.html) on education and project articles.
- Hide screen-only decoration in [`@media print`](../../Black%20and%20White%20Clean%20Professional%20A4%20Resume.html); remove page shadow and background around the sheet.
- Preserve URL visibility or usable link targets in print without introducing browser-generated UI.
- Add a small-screen media query that removes the fixed A4 height constraint, reduces page padding, and collapses grids to one column.

## Content layout details

### Header

Place the name in the largest type on the page, followed by the professional title. Present phone, email, and GitHub in a wrapping contact row. Use accessible link labels and avoid relying only on icons.

### Professional Summary

Use one paragraph with a comfortable line length and no manually inserted line breaks.

### Education

Each entry uses a two-column grid:

- Narrow left column: date range and institution.
- Flexible right column: qualification title, expected start date or result details, and supporting description.

Entries must remain intact when printed.

### Projects

Each project is an article. The title includes the project name and technology where present. Supporting details are unordered list items with consistent indentation and compact vertical spacing.

### Skills

Use a responsive two-column list on normal A4 and collapse to one column on narrow screens. Preserve the three skill group descriptions from the source.

### Achievements

Use a short unordered list with the existing Top 10 Finisher and Canadian Computing Competition distinction statements.

## Validation criteria

The implementation is successful when:

1. The page uses semantic resume markup instead of Canva-generated coordinate wrappers.
2. The document is visually balanced on one A4 sheet at 100% print scale.
3. Header, section rules, dates, and body text align consistently.
4. No section is clipped, overlapped, or separated awkwardly across pages.
5. The page remains readable at normal browser zoom and on narrow screens.
6. The file works without loading Canva CSS, JavaScript, or footer assets.
7. All original resume wording intended for the final page remains present.
8. Print preview removes screen-only decoration and retains the correct monochrome presentation.

## Out of scope

- Rewriting or fact-checking resume content.
- Adding a photo, icons, color accents, animations, or interactive resume features.
- Editing the PowerPoint, PDF, supporting Canva asset directory, or unrelated site content.
- Converting the resume into a framework application.
