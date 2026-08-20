# CV Evidence Classification

**Purpose:** Internal verification log categorizing CV claims by evidence status. The CV itself remains unchanged; this document serves as reference for interviews, fact-checking, and future updates.

**Last Updated:** 2026-08-19  
**Source:** Tavily web research report [`cv-claims-verification-report.md`](cv-claims-verification-report.md)

---

## Evidence Categories

- **Externally Verified:** Confirmed through authoritative third-party sources
- **Candidate-Reported:** Self-reported achievements without public verification
- **Partially Verified:** Core claim confirmed, specific details unverified
- **Inaccessible:** Links/resources temporarily unavailable during verification
- **Not Externally Verifiable:** Personal records or private institutional data

---

## Identity & Contact

| Claim | Location | Status | Notes |
|-------|----------|--------|-------|
| Edward Hin Lok Chan | [`profile.ts:47`](../src/data/profile.ts:47) | Candidate-Reported | Name used consistently across CV |
| Secondary School Student \| Incoming Data Science Student | [`profile.ts:48`](../src/data/profile.ts:48) | Candidate-Reported | Current status and planned enrollment |
| Aspiring Technology Operations & Cybersecurity Professional | [`profile.ts:50`](../src/data/profile.ts:50) | Candidate-Reported | Career aspiration |
| edward.hl.chan@gmail.com | [`profile.ts:54`](../src/data/profile.ts:54) | Candidate-Reported | Contact email |
| +852 5511 7745 | [`profile.ts:55`](../src/data/profile.ts:55) | Candidate-Reported | Phone number |
| github.com/edwardhlchan | [`profile.ts:56`](../src/data/profile.ts:56) | Externally Verified | GitHub profile accessible |
| linkedin.com/in/edhlchan | [`profile.ts:57`](../src/data/profile.ts:57) | Inaccessible | Requires authentication; URL structure valid |

---

## Education

| Claim | Location | Status | Notes |
|-------|----------|--------|-------|
| **CLAP-TECH Programme** | [`profile.ts:60-77`](../src/data/profile.ts:60-77) | Partially Verified | |
| Jockey Club Multiple Pathways Programme | [`profile.ts:61`](../src/data/profile.ts:61) | Externally Verified | Confirmed via official HKBU and IBM sources |
| HKBU School of Continuing Education | [`profile.ts:62`](../src/data/profile.ts:62) | Externally Verified | Institution confirmed |
| Co-designed with IBM | [`profile.ts:65`](../src/data/profile.ts:65) | Externally Verified | Partnership confirmed via IBM Hong Kong official newsroom |
| Expected: September 2026 | [`profile.ts:63`](../src/data/profile.ts:63) | Candidate-Reported | Planned enrollment date |
| **Applied Learning Distinction II** | [`profile.ts:74`](../src/data/profile.ts:74) | Partially Verified | |
| Grade: Attained with Distinction II | [`profile.ts:74`](../src/data/profile.ts:74) | Externally Verified | Highest Applied Learning grade confirmed via HKEAA |
| "awarded to the top 4% of students" | [`profile.ts:74`](../src/data/profile.ts:74) | Candidate-Reported | **Exact percentage not found in official HKEAA sources**; plausible based on ~26-32% achieving any Distinction level |
| Selected for industry immersion at Equinix Data Center | [`profile.ts:76`](../src/data/profile.ts:76) | Candidate-Reported | Equinix program exists; individual participation not externally verifiable |
| Ranked Top 10 in Hong Kong – Splunk BOTS competition | [`profile.ts:76`](../src/data/profile.ts:76) | Candidate-Reported | **No public leaderboard or regional rankings published by Splunk** |
| **HKDSE Results** | [`profile.ts:80-85`](../src/data/profile.ts:80-85) | Not Externally Verifiable | |
| Level 5 ICT, Level 5 English | [`profile.ts:84`](../src/data/profile.ts:84) | Candidate-Reported | Personal exam results; would require official transcript |

---

## Projects

| Claim | Location | Status | Notes |
|-------|----------|--------|-------|
| **Full-Stack Web Apps** | [`profile.ts:88-101`](../src/data/profile.ts:88-101) | Partially Verified | |
| Cloudflare Workers, D1 SQLite, JavaScript | [`profile.ts:91`](../src/data/profile.ts:91) | Candidate-Reported | Technology stack; implementation not externally verified |
| "deployed on Cloudflare edge" | [`profile.ts:94`](../src/data/profile.ts:94) | Inaccessible | Deployment URLs returned fetch errors during verification |
| Interactive CV link | [`profile.ts:97`](../src/data/profile.ts:97) | Inaccessible | `https://edwardchan-workers.mzki.moe/` - fetch failed |
| DSE Score Calculator link | [`profile.ts:98`](../src/data/profile.ts:98) | Inaccessible | `https://mzki.moe/dse/` - fetch failed |
| Number Ninja link | [`profile.ts:99`](../src/data/profile.ts:99) | Inaccessible | `https://mzki.moe/number-ninja/` - fetch failed |
| Custom-domain portfolio (URL unavailable) | [`profile.ts:100`](../src/data/profile.ts:100) | Candidate-Reported | Explicitly marked unavailable |
| **SIEM/Cybersecurity CTF** | [`profile.ts:103-111`](../src/data/profile.ts:103-111) | Partially Verified | |
| Splunk Boss of the SOC (BOTS) 2025 | [`profile.ts:105`](../src/data/profile.ts:105) | Externally Verified | Competition existence confirmed |
| "Ranked as a Top 10 Finalist" | [`profile.ts:109`](../src/data/profile.ts:109) | Candidate-Reported | **No public leaderboard or regional rankings published** |
| **PyQt Desktop Application** | [`profile.ts:113-120`](../src/data/profile.ts:113-120) | Candidate-Reported | |
| Python, PyQt, Pandas, Openpyxl | [`profile.ts:115`](../src/data/profile.ts:115) | Candidate-Reported | No public repository or executable identified |
| **C# Input Translation Engine** | [`profile.ts:122-129`](../src/data/profile.ts:122-129) | Candidate-Reported | |
| C#, Windows Forms, .NET | [`profile.ts:124`](../src/data/profile.ts:124) | Candidate-Reported | No public repository identified |

---

## Achievements

| Claim | Location | Status | Notes |
|-------|----------|--------|-------|
| Top 10 Finalist – Splunk BOTS Hong Kong (2025) | [`profile.ts:139`](../src/data/profile.ts:139) | Candidate-Reported | **No public rankings; competition confirmed to exist** |
| Distinction Award – Canadian Computing Competition (2025) | [`profile.ts:140`](../src/data/profile.ts:140) | **Not Verifiable** | **2025 CCC results officially withheld due to widespread AI cheating; no certificates/honor roll published** |

---

## Skills

| Category | Location | Status | Notes |
|----------|----------|--------|-------|
| Programming Languages | [`profile.ts:132`](../src/data/profile.ts:132) | Candidate-Reported | Self-reported skill set |
| Cybersecurity & IT Ops | [`profile.ts:133`](../src/data/profile.ts:133) | Candidate-Reported | Self-reported skill set |
| Tools & Frameworks | [`profile.ts:134`](../src/data/profile.ts:134) | Candidate-Reported | Self-reported skill set |
| Modern Workflows | [`profile.ts:135`](../src/data/profile.ts:135) | Candidate-Reported | Self-reported skill set; "Serverless Deployment" note: deployment URLs inaccessible |

---

## Summary Statistics

| Category | Count |
|----------|-------|
| **Externally Verified** | 6 claims |
| **Candidate-Reported** | 25 claims |
| **Partially Verified** | 3 claims |
| **Inaccessible** | 4 links |
| **Not Externally Verifiable** | 2 claims |

---

## High-Priority Items for Interview Preparation

The following claims should have supporting documentation ready for interviews:

1. **Applied Learning Distinction II "top 4%"** - Provide official certificate or institutional communication if exact percentage is stated there
2. **Splunk BOTS Top 10 Hong Kong ranking** - Provide Splunk confirmation email, certificate, or other official notification
3. **CCC 2025 Distinction** - Recommend removing unless official certificate becomes available (2025 results withheld)
4. **Equinix Data Center immersion** - Provide attendance record, certificate, or program confirmation
5. **Project deployment URLs** - Restore live links before submission; broken links weaken credibility
6. **GitHub portfolio** - Ensure repositories contain relevant project source code

---

## Recommendations

1. **Before final submission:**
   - Verify all project deployment URLs are accessible
   - Consider softening "top 4%" to "highest Applied Learning grade" if exact percentage cannot be documented
   - Consider replacing "Top 10" with "participant/finalist" if no official ranking confirmation exists
   - Remove CCC 2025 entirely or verify certificate availability
   - Ensure GitHub profile showcases relevant portfolio work

2. **For interview preparation:**
   - Prepare evidence for candidate-reported claims where possible
   - Be ready to discuss technical implementation details for all projects
   - Have backup examples if verifier cannot access deployment URLs

3. **Future updates:**
   - Re-run verification when deployment URLs are restored
   - Update this log if additional evidence becomes available
   - Consider annual re-verification of institutional claims

---

**Verification Method:** Tavily API web search against official institutional sources (HKEAA, HKBU, IBM, Splunk, University of Waterloo, Equinix), candidate deployment URLs, and public GitHub/LinkedIn profiles.

**Verification Date:** 2026-08-19

**Related Documents:**
- Full research report: [`cv-claims-verification-report.md`](cv-claims-verification-report.md)
- Canonical CV source: [`src/data/profile.ts`](../../src/data/profile.ts)
