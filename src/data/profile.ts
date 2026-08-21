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
  href?: string;
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

export const profile: Profile = {
  identity: {
    name: "Edward Chan",
    role: "Secondary School Student | Incoming Data Science Student",
    aspiration: "Aspiring Technology Operations & Cybersecurity Professional",
    summary:
      "Information Technology and Data Science student combining practical experience in Python automation, web development, and cybersecurity through the CLAP-TECH pathway and Splunk BOTS competition. Focused on building internal utilities, data analysis applications, and automation-focused solutions for IT operations and problem-solving.",
  },
  contact: [
    { label: "+852 5511 7745", href: "tel:+85255117745", kind: "phone" },
    { label: "edward.hl.chan@gmail.com", href: "mailto:edward.hl.chan@gmail.com", kind: "email" },
    // { label: "linkedin.com/in/edward-chan-hl", href: "https://www.linkedin.com/in/edward-chan-hl/", kind: "linkedin" },
    { label: "github.com/edwardhlchan", href: "https://github.com/edwardhlchan", kind: "github" },
  ],
  education: [
    {
      title: "Higher Diploma in Data Science (CLAP-TECH Pathway)",
      provider: "Hong Kong Baptist University",
      dates: "Expected start: 2026/09",
      details: [
        "CLAP-TECH: Secondary-to-tertiary integrated pathway offered by Hong Kong Baptist University and co-designed by IBM",
        "Focus on industry-driven data analytics, AI applications, and practical programming to solve real-world operational challenges",
      ],
    },
    {
      title: "Applied Learning (ApL) in Tech Basics (CLAP-TECH Pathway)",
      provider: "Hong Kong Baptist University",
      dates: "2024 – 2025",
      details: [
        "Attained with Distinction II, the highest Applied Learning grade, awarded to the top 4% of students",
        "Core training: Python development, web application architecture, cybersecurity operations, and IT project management",
        "Selected for Equinix Data Center industry immersion, gaining hands-on exposure to enterprise-grade IT infrastructure",
        "Participated in Splunk Boss of the SOC (BOTS) 2025, an industry-practitioner cybersecurity competition, applying data analysis techniques to interpret security event logs",
      ],
    },
    {
      title: "Hong Kong Diploma of Secondary Education (HKDSE)",
      provider: "Lai King Catholic Secondary School",
      dates: "2020 – 2026",
      details: [
        "Academic Strengths: Achieved top-tier results in analytical and language subjects, securing Level 5 in Information & Communication Technology (ICT) and Level 5 in English Language",
      ],
    },
  ],
  projects: [
    {
      title: "Full-Stack Web Apps & Digital Portfolio",
      technologies: ["Cloudflare Workers", "D1", "JavaScript"],
      details: [
        "Built web application pairing JavaScript frontend with Cloudflare Workers API and D1 SQLite database",
        "Implemented score submission, aggregate statistics, and percentile ranking calculations",
        "Developed responsive CV with scriptable terminal interface",
      ],
      links: [
        { label: "DSE Score Calculator", href: "https://www.mzki.moe/projects/dma/" },
        { label: "Number Ninja", href: "https://www.mzki.moe/projects/maf/" },
        { label: "Interactive CV", href: "https://edward-interactive-cv.despacito777x.workers.dev/" },
        { label: "Portfolio Page", href: "https://portfolio.despacito777x.workers.dev/projects/"},
        // { label: "GitHub", href: "https://github.com/edwardhlchan" },
      ],
    },
    {
      title: "Security Log Analysis & Incident Response Simulation",
      technologies: ["Splunk", "SIEM", "CTF"],
      details: [
        "Analyzed raw event logs in a competitive SIEM environment to investigate simulated enterprise security incidents",
        "Solved blue-team CTF challenges by querying logs to track threat actor activities and identify indicators of compromise",
        "Participated in Splunk Boss of the SOC (BOTS) 2025 and ranked Top 10, an industry-practitioner cybersecurity competition in Hong Kong",
      ],
      links: [],
    },
    {
      title: "Automated Data Parsing Desktop Application",
      technologies: ["Python", "PyQt"],
      details: [
        "Built PyQt desktop application to automate data parsing, extraction, filtering, and formatting",
        "Applied Python scripting to reduce repetitive manual processing steps",
      ],
      links: [],
    },
  ],
  skills: [
    { category: "Programming", items: ["Python", "C#", "JavaScript (Full-Stack)", "HTML/CSS"] },
    { category: "Cybersecurity & IT Ops", items: ["SIEM (Splunk)", "Threat Hunting (CTF)", "Log Analysis", "Networking"] },
    { category: "Tools & Frameworks", items: ["Cloudflare Workers", "Cloudflare D1 (SQLite)", "PyQt", "Pandas", "Git"] },
    { category: "Modern Workflows", items: ["AI-Assisted Development", "Serverless Deployment"] },
  ],
  achievements: [
    "Top 10 Finalist – Splunk Boss of the SOC (BOTS) Hong Kong (2025)",
    "Certificate of Distinction – Canadian Computing Competition (Junior Division) (2025)",
  ],
};
