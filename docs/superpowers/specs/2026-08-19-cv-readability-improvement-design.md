# CV Readability Improvement Design

**Date:** 2026-08-19  
**Context:** Harry's feedback (line 234): "side to side... well.... which look easier to read?" comparing the current layout to his more scannable example  
**Problem:** Current CV has poor readability due to dense paragraphs, awkward page splits, and weak visual hierarchy

---

## Current Issues (Observed)

### 1. Visual Hierarchy Problems
- Dense paragraph text in education/project details
- Weak separation between records
- Technology tags duplicate information already in titles
- Hard to scan quickly for key information

### 2. Page Layout Issues
- Project section splits awkwardly across pages 1-2
- Inconsistent spacing between sections
- Some sections too compressed, others too spread out
- Print output shows ~2+ pages with split records

### 3. Content Presentation Issues
- Unavailable links displayed prominently (e.g., "Custom-domain portfolio (URL unavailable)")
- Duplicated technology tags (in title AND as chips)
- Link labels unclear in hard-copy PDF
- Professional summary reads like a paragraph instead of scannable highlights

---

## Harry's Preferred Format (From Screenshots)

Analyzing the right-side example Harry provided:

### Clean Visual Structure
- **Tighter spacing** between bullets (not full paragraphs)
- **Clear section headers** with consistent styling
- **Scannable bullets** that convey one idea each
- **Better white space** — breathing room between major sections
- **Hierarchical information** — date/org on left, details on right

### Content Organization
- **Concise bullets** (1-2 lines max per point)
- **Action-oriented** without being verbose
- **Technology context** integrated naturally, not as separate tags
- **Links clearly labeled** for both screen and print
- **Key achievements** stand out without dense text

---

## Design Goals

1. **Reduce page count** to 1-2 pages maximum at A4/100% scale
2. **Improve scannability** — hiring manager should grasp key points in 10 seconds
3. **Fix awkward splits** — no mid-record page breaks
4. **Remove visual redundancy** — don't show same info twice
5. **Make links readable** in both web and print contexts
6. **Maintain professional appearance** for traditional IT GM audience

---

## Proposed Changes

### A. Content Restructuring

#### 1. Education Section
**Current:** Long paragraph bullets with multiple details crammed together

**Proposed:**
```
Hong Kong Baptist University                                     2024 – 2025
Applied Learning (ApL) in Tech Basics (CLAP-TECH Pathway)
• Attained with Distinction II, the highest Applied Learning grade
• CLAP-TECH: Secondary-to-tertiary integrated pathway offered by HKBU and co-designed by IBM
• Core training: Python development, web architecture, cybersecurity operations, IT project management  
• Selected for Equinix Data Center industry immersion
• Participated in Splunk Boss of the SOC (BOTS) 2025, analyzing SIEM logs in simulated security incidents
```

**Changes:**
- Date/provider on same line (scannable left column)
- Title as subheading
- One idea per bullet
- Merge related details into cohesive bullets

#### 2. Professional Summary
**Current:** Dense paragraph format

**Proposed:**
```
PROFESSIONAL SUMMARY

Information Technology and Data Science student combining:
• Python automation, web development, and data analysis
• Practical cybersecurity experience through BOTS competition and CLAP-TECH pathway
• Cloud deployment on Cloudflare Workers with D1 database integration
• Automation-focused approach to IT operations and problem-solving
```

**Changes:**
- Convert to scannable highlight list
- Lead with current identity
- 4-5 concrete capability statements
- No filler words

#### 3. Project Section
**Current:** 
- Separate technology tags duplicating title info
- Dense bullet paragraphs
- "Unavailable" links prominently displayed

**Proposed:**
```
Full-Stack Web Applications | Cloudflare Workers, D1, JavaScript

• Built web application pairing JavaScript frontend with Cloudflare Workers API and D1 SQLite database
• Implemented score submission, aggregate statistics, and percentile ranking calculations
• Deployed responsive CV with scriptable terminal interface

Links: [DSE Score Calculator](url) · [Number Ninja](url)
Note: Interactive CV deployment in progress (migrating to D1)
```

**Changes:**
- Technology in title only (remove redundant chips)
- Shorter, focused bullets (1-2 lines max)
- Links grouped together with clear labels
- Unavailable links handled gracefully with status note
- Remove "deployed" claim until URLs work

### B. Layout & Typography Adjustments

#### 1. Spacing Changes
```css
/* Tighter print spacing for better page fit */
@media print {
  .resume-section { padding: 0.5rem 0; }  /* was 0.65rem */
  .education-list, .project-list { gap: 0.5rem; }  /* was 0.7rem */
  .entry-body li + li { margin-top: 0.1rem; }  /* was 0.15rem */
  .summary-copy { line-height: 1.35; }  /* was 1.4 */
}
```

#### 2. Remove Visual Redundancy
```css
/* Hide technology tags in print — info already in title */
@media print {
  .tech-tags { display: none; }
}
```

#### 3. Improve Link Readability
```css
/* Make links clearly readable in hard-copy PDF */
@media print {
  .project-links a::after {
    content: " (" attr(href) ")";
    font-size: 7.5pt;
    color: #555;
  }
}
```

### C. Content Prioritization

#### Remove/Reduce
- ❌ "Custom-domain portfolio (URL unavailable)" — remove entirely
- ❌ Technology tag chips — redundant with titles
- ❌ Unverified "top 4%" statistic
- ❌ Unverified "Top 10 Hong Kong" ranking
- ❌ "AI-assisted development workflows" fluff text
- ❌ Long multi-sentence bullets

#### Keep/Emphasize
- ✅ CLAP-TECH/HKBU/IBM context (verified)
- ✅ Distinction II highest grade (verified)
- ✅ Equinix exposure (program verified)
- ✅ BOTS participation and technical activity (competition verified)
- ✅ Concrete technology applications
- ✅ Working GitHub profile link
- ✅ Professional contact details

---

## Implementation Strategy

### Phase 1: Content Reduction
1. Rewrite education bullets to be concise (1-2 lines each)
2. Rewrite project descriptions to be scannable
3. Remove unverified statistics
4. Convert professional summary to highlight list
5. Remove "unavailable" link placeholder

### Phase 2: Layout Refinement
1. Reduce print spacing (gap/padding adjustments)
2. Hide technology tag chips in print mode
3. Improve link hard-copy readability
4. Ensure page-break protection works correctly

### Phase 3: Verification
1. Generate fresh PDF at A4/100%
2. Verify page count ≤ 2 pages
3. Verify no mid-record splits
4. Verify all text selectable
5. Verify links readable in hard copy
6. Compare side-by-side with Harry's example

---

## Success Criteria

- [ ] **Page count:** 1-2 pages at A4 portrait, 100% scale
- [ ] **No awkward splits:** Education/project records stay together
- [ ] **Scannable content:** Key points visible without reading paragraphs
- [ ] **Removed redundancy:** No duplicated technology labels
- [ ] **Truthful claims:** Only verified or appropriately softened statements
- [ ] **Link readability:** URLs visible and functional in both web and print
- [ ] **Visual comparison:** Side-by-side check shows similar readability to Harry's example
- [ ] **Professional appearance:** Clean, traditional, no gimmicks

---

## Risk Mitigation

### Risk: Content reduction removes too much context
**Mitigation:** Keep technical context integrated into bullets; just remove verbosity

### Risk: Tighter spacing makes it too cramped
**Mitigation:** Maintain minimum line-height of 1.35; test readability at actual print size

### Risk: Page still doesn't fit in 2 pages
**Mitigation:** Further content prioritization or consider moving achievements to skills section

### Risk: Harry prefers different specific layout choices
**Mitigation:** Show design plan first for approval before implementing

---

## Open Questions


2. **LinkedIn link:** Currently inaccessible (authentication required) — keep or remove?
   - **Recommendation:** Keep — standard professional contact, authentication barrier doesn't invalidate it

4. **Skills section:** Currently grid layout — keep or convert to list?
   - **Recommendation:** Keep grid — already scannable

---

## Next Steps After Approval

1. Update [`src/data/profile.ts`](../../src/data/profile.ts) — rewrite bullets/details
2. Update [`src/styles/global.css`](../../src/styles/global.css) — spacing/layout adjustments
3. Update [`src/components/ProjectList.tsx`](../../src/components/ProjectList.tsx) — hide tech tags in print
4. Run `npm run build && npx wrangler deploy`
5. Generate fresh PDF and verify against success criteria
6. Side-by-side comparison with Harry's example
