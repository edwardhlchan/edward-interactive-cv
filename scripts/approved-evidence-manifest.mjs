export const approvedEvidenceManifest = Object.freeze({
  identity: Object.freeze({
    name: "Edward Chan",
    role: "Secondary School Student | Incoming Data Science Student",
    aspiration: "Aspiring Technology Operations & Cybersecurity Professional",
    summary: "Information Technology and Data Science student",
  }),
  contact: Object.freeze([
    Object.freeze({ label: "+852 5511 7745", href: "tel:+85255117745" }),
    Object.freeze({ label: "edward.hl.chan@gmail.com", href: "mailto:edward.hl.chan@gmail.com" }),
    Object.freeze({ label: "github.com/edwardhlchan", href: "https://github.com/edwardhlchan" }),
  ]),
  education: Object.freeze({
    clapTechPathway: "CLAP-TECH",
    hkbuProvider: "Hong Kong Baptist University",
    ibmContext: "IBM",
    distinctionIIGrade: "Distinction II",
    distinctionIIHighest: "highest Applied Learning grade",
    distinctionIITop4Percent: "top 4%",
    hkdseLevel5ICT: "Level 5 in Information & Communication Technology (ICT)",
    hkdseLevel5English: "Level 5 in English Language",
    equinix: "Equinix",
  }),
  achievements: Object.freeze({
    botsWording: "Boss of the SOC (BOTS)",
    botsYear: "2025",
    botsRanking: "Top 10",
    botsLocation: "Hong Kong",
    cccAward: "Certificate of Distinction",
    cccCompetition: "Canadian Computing Competition",
    cccDivision: "Junior Division",
    cccYear: "2025",
  }),
  projects: Object.freeze([
    Object.freeze({ label: "DSE Score Calculator", href: "https://www.mzki.moe/projects/dma/" }),
    Object.freeze({ label: "Number Ninja", href: "https://www.mzki.moe/projects/maf/" }),
    // Object.freeze({ label: "GitHub", href: "https://github.com/edwardhlchan" }),
  ]),
  projectDetails: Object.freeze({
    fullStackWebApps: Object.freeze({
      technologies: Object.freeze(["Cloudflare Workers", "D1", "JavaScript"]),
      keywords: Object.freeze(["full-stack", "API", "SQLite", "responsive", "cloud-hosted", "terminal interface"]),
    }),
    securityLogAnalysis: Object.freeze({
      technologies: Object.freeze(["Splunk", "SIEM", "CTF"]),
      keywords: Object.freeze(["raw event logs", "enterprise security incidents", "blue-team CTF", "threat actor", "indicators of compromise"]),
    }),
    automatedDataParsing: Object.freeze({
      technologies: Object.freeze(["Python", "PyQt"]),
      keywords: Object.freeze(["desktop application", "data parsing", "extraction", "filtering", "formatting"]),
    }),
    realTimeInputTranslation: Object.freeze({
      technologies: Object.freeze(["C#"]),
      keywords: Object.freeze(["remap", "emulate", "controller input signals", "AI-assisted development"]),
    }),
  }),
  skills: Object.freeze({
    programming: Object.freeze(["Python", "C#", "JavaScript (Full-Stack)", "HTML/CSS"]),
    cybersecurityAndITOps: Object.freeze(["SIEM (Splunk)", "Threat Hunting (CTF)", "Log Analysis", "Networking"]),
    toolsAndFrameworks: Object.freeze(["Cloudflare Workers", "Cloudflare D1 (SQLite)", "PyQt", "Pandas", "Git"]),
    modernWorkflows: Object.freeze(["AI-Assisted Development", "Serverless Deployment"]),
  }),
  unavailableProjectLabels: Object.freeze(["Custom-domain portfolio (URL unavailable)"]),
});

export const approvedRenderedLinks = Object.freeze([
  ...approvedEvidenceManifest.contact,
  ...approvedEvidenceManifest.projects,
]);
