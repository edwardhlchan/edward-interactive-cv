# About Me Content Design Specification

## Scope

Update only the Markdown body of [`about.md`](../../../about.md:1) in a later implementation. Do not change its front matter, layout reference, site configuration, assets, links, or any other file.

## Source Evidence

- [`Black and White Clean Professional A4 Resume-3.pdf`](../../../Black%20and%20White%20Clean%20Professional%20A4%20Resume-3.pdf) is the authoritative identity and capability source for this task.
- [`CV_Writing_Assistant_Guide.md`](../../../CV_Writing_Assistant_Guide.md:1) supplies presentation guidance and example phrasing only; its examples are not independent evidence.
- [`about.md`](../../../about.md:9) is the existing page and establishes the current page contract, but its public identity conflicts with the authoritative resume and must not supply new biographical claims.

## Audience and Positioning

The primary audience is English-speaking recruiters, hiring managers, and technical collaborators scanning a personal About page. The page should present a concise, credible early-career capability profile for IT operations, cybersecurity, automation, programming, and data science study. It should favor concrete capabilities and outcomes over personal slogans, quotations, or unsupported narrative.

## Identity Choice

Use **Edward Chan** as the sole public identity. Use the resume positioning **IT Operations, Cybersecurity & Automation Assistant** as the profile descriptor. Do not mention or imply that Edward Chan is the same person as the existing Chinese name “余弦,” the alias “cosine,” or the `yusixian` GitHub identity.

## Preserved Front Matter and Layout

Preserve the complete front matter in [`about.md`](../../../about.md:1) byte-for-byte, including:

- `layout: ../layouts/PageLayout.astro`
- `title: "About"`
- `coverTitle: "关于我"`
- `date: 2025-01-03 01:01:33`
- `description: "关于我？"`

The implementation may replace the body beginning after the closing front-matter delimiter, but must not modify the layout path, metadata values, delimiter placement, or file type. The resulting body must remain valid Markdown and render through the existing layout.

## English Capability-Profile Structure

Use this order and purpose:

1. **Identity and summary**: Edward Chan, the profile descriptor, and a short first-person or neutral summary of the technical focus supported by the resume.
2. **Capabilities**: grouped, scannable categories for cybersecurity and IT operations; programming; and data, automation, tools, and cloud. Use only technologies and capabilities named in the resume.
3. **Selected work**: brief outcome-oriented entries for Splunk BOTS security-log analysis and incident-response simulation, the Python/PyQt data-parsing desktop application, the C# real-time input-translation engine, and JavaScript/Cloudflare Workers serverless functions. Describe actions evidenced by the resume; do not invent metrics, repository links, deployment details, or user impact.
4. **Education and achievements**: concise study status and relevant results: Higher Diploma in Data Science at Hong Kong Baptist University School of Continuing Education, CLAP-TECH Pathway, expected start date 2026-09-01; Tech Basics / Secondary Education evidence; Splunk BOTS Top 10 in 2025; Canadian Computing Competition Distinction in 2025; and the listed English, ICT, and Mathematics results where useful.
5. **Contact or links**: omit this section unless each destination and its ownership are verified before implementation. Existing `yusixian` links must not be reused.

Keep the tone professional, direct, and English throughout the body. Do not add a second page identity, a marketing callout, or a decorative quote block.

## Verified Claims

The implementation may state these claims because they appear in the authoritative resume:

- The public name is Edward Chan.
- The profile focus is IT operations, cybersecurity, automation, programming, and data science.
- Skills include Python, C#, JavaScript, Splunk SIEM, event-log analysis, incident-response workflows, network fundamentals, PyQt, Pandas, Excel, data parsing, and data formatting.
- Edward analyzed raw event logs, investigated simulated enterprise security incidents, reconstructed multi-stage attack scenarios, and achieved a Top 10 finish in Splunk Boss of the SOC in 2025.
- Edward built a Python/PyQt desktop application for data parsing, extraction, filtering, and formatting.
- Edward developed a C# engine for real-time controller-input remapping and emulation.
- Edward implemented serverless web functions with JavaScript and Cloudflare Workers.
- Edward is associated in the resume with Hong Kong Baptist University School of Continuing Education’s Higher Diploma in Data Science, CLAP-TECH Pathway, with an expected start date of 2026-09-01.
- The resume lists Tech Basics / Secondary Education, Distinction II, IBM P-TECH-aligned coursework, Equinix Data Center industry immersion, Level 5 English Language, Level 5 ICT, Level 3 Mathematics, and Canadian Computing Competition Distinction in 2025.

Phrase time-sensitive or status-sensitive education claims exactly as the resume supports them; do not convert an expected start date into a claim of current enrollment or graduation.

## Explicit Exclusions

Exclude the following until separate, identity-matched evidence is supplied:

- “余弦,” “cosine,” `yusixian`, and all existing `yusixian` GitHub, badge, statistics, streak, Telegram, or domain associations.
- Any statement claiming the resume identity owns or operates the existing About page accounts or links.
- Email, phone, GitHub, LinkedIn, Telegram, GitBook, or other contact destinations when ownership or current validity is not independently verified for Edward Chan.
- Project repository URLs, screenshots, demos, download links, user counts, performance figures, deployment outcomes, or business impact not present in the resume.
- Claims of professional employment, certifications, awards, academic completion, current enrollment, leadership, seniority, or production security responsibility beyond the supplied evidence.
- Guide-only claims such as selective admission, industry-partner co-development, AI workflows, multi-gigabyte log volume, low-latency performance, robust signal mapping, or specific workshop completion unless corroborated by identity-matched evidence.
- Personal interests, life philosophy, quotations, or biographical details not supported by the source evidence.

## Acceptance Criteria for `about.md`

- The front matter and `PageLayout.astro` reference are unchanged from the current file.
- The body is English and presents Edward Chan as the only public identity.
- The body follows the identity, capabilities, selected work, and education/achievements structure above, with headings and lists that are easy to scan.
- Every factual claim is supported by the authoritative resume or is clearly framed as a capability/profile summary derived from it.
- No `余弦`, `cosine`, `yusixian`, or existing unverified external identity/link appears in the new body.
- No placeholder text, speculative metric, unsupported credential, fabricated outcome, or ambiguous ownership claim remains.
- No project or contact link is added without identity-matched verification.
- The Markdown remains valid for the existing Astro content pipeline, and the implementation changes no file other than `about.md`.
- The content is concise enough to function as an About page rather than a full CV and does not introduce unrelated redesign or layout work.
