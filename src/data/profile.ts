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
      "Secondary-school student preparing to begin a Higher Diploma in Data Science in September 2026, with practical experience in Python automation, application development, networking, and web delivery. Demonstrated cybersecurity capability through Splunk Boss of the SOC (BOTS), an industry-practitioner competition where I analyzed raw event logs to solve blue-team capture-the-flag (CTF) challenges in a simulated SIEM environment. Interested in building reliable internal utilities and automation-focused tools for IT operations and problem-solving.",
  },
  contact: [
    { label: "+852 5511 7745", href: "tel:+85255117745", kind: "phone" },
    { label: "edward.hl.chan@gmail.com", href: "mailto:edward.hl.chan@gmail.com", kind: "email" },
    { label: "linkedin.com/in/edward-chan-hl", href: "https://www.linkedin.com/in/edward-chan-hl/", kind: "linkedin" },
    { label: "github.com/edwardhlchan", href: "https://github.com/edwardhlchan", kind: "github" },
  ],
  education: [
    {
      title: "Higher Diploma in Data Science (CLAP-TECH Pathway)",
      provider: "Hong Kong Baptist University — School of Continuing Education",
      dates: "Expected start: 2026/09",
      details: [
        "CLAP-TECH is a secondary-to-tertiary integrated pathway offered through Hong Kong Baptist University and co-designed by IBM.",
        "The pathway connects Applied Learning with a planned HKBU Higher Diploma route and practical work in data analytics, AI applications, programming, and IT operations.",
      ],
    },
    {
      title: "Applied Learning (ApL) in Tech Basics (CLAP-TECH Pathway)",
      provider: "Hong Kong Baptist University — School of Continuing Education",
      dates: "2024 – 2025",
      details: [
        "Top performer with Grade: Attained with Distinction II, awarded to the top 4% of students.",
        "Built practical IT competencies through the CLAP-TECH pathway, including Python development, web application architecture, cybersecurity operations, and IT project management.",
        "Selected for industry immersion at Equinix Data Center and ranked Top 10 in Hong Kong in Splunk BOTS.",
      ],
    },
    {
      title: "Hong Kong Diploma of Secondary Education (HKDSE)",
      provider: "Lai King Catholic Secondary School",
      dates: "2020 – 2026",
      details: [
        "Achieved Level 5 in Information & Communication Technology (ICT) and Level 5 in English Language.",
      ],
    },
  ],
  projects: [
    {
      title: "Full-Stack Web Apps & Digital Portfolio",
      technologies: ["Cloudflare Workers", "D1", "JavaScript"],
      details: [
        "Developed a full-stack web app pairing a JavaScript frontend with a Cloudflare Workers API and a D1 (SQLite) database for score submission, aggregate statistics, and percentile ranking.",
        "Engineered and deployed a responsive, cloud-hosted digital CV with a scriptable terminal interface.",
      ],
      links: [
        { label: "Interactive CV", href: "https://edward-interactive-cv.despacito777x.workers.dev/" },
        { label: "DSE Score Calculator", href: "https://www.mzki.moe/projects/dma/" },
        { label: "Number Ninja", href: "https://www.mzki.moe/projects/maf/" },
        { label: "Custom-domain portfolio (URL unavailable)" },
      ],
    },
    {
      title: "Security Log Analysis & Incident Response Simulation",
      technologies: ["Splunk", "SIEM", "CTF"],
      details: [
        "Analyzed raw event logs in a competitive SIEM environment to investigate simulated enterprise security incidents.",
        "Solved blue-team CTF challenges by querying logs to track threat actor activities and identify indicators of compromise.",
        "Ranked as a Top 10 Finalist in Splunk Boss of the SOC (BOTS) 2025.",
      ],
      links: [],
    },
    {
      title: "Automated Data Parsing Desktop Application",
      technologies: ["Python", "PyQt", "Pandas"],
      details: [
        "Built a PyQt desktop application to automate data parsing, extraction, filtering, and formatting.",
        "Applied Pandas and Python scripting to reduce repetitive manual processing steps.",
      ],
      links: [],
    },
    {
      title: "Real-Time Input-Translation Engine",
      technologies: ["C#"],
      details: [
        "Developed an engine to remap and emulate controller input signals in real time.",
        "Applied AI-assisted development workflows to support code optimization and logic design.",
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
    "Distinction Award – Canadian Computing Competition (2025)",
  ],
};
