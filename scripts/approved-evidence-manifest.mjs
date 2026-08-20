export const approvedEvidenceManifest = Object.freeze({
  identity: Object.freeze({
    name: "Edward Chan",
    role: "Secondary School Student | Incoming Data Science Student",
    aspiration: "Aspiring Technology Operations & Cybersecurity Professional",
    summary: "Secondary-school student preparing to begin a Higher Diploma in Data Science in September 2026",
  }),
  contact: Object.freeze([
    Object.freeze({ label: "+852 5511 7745", href: "tel:+85255117745" }),
    Object.freeze({ label: "edward.hl.chan@gmail.com", href: "mailto:edward.hl.chan@gmail.com" }),
    Object.freeze({ label: "linkedin.com/in/edward-chan-hl", href: "https://www.linkedin.com/in/edward-chan-hl/" }),
    Object.freeze({ label: "github.com/edwardhlchan", href: "https://github.com/edwardhlchan" }),
  ]),
  projects: Object.freeze([
    Object.freeze({ label: "Interactive CV", href: "https://edward-interactive-cv.despacito777x.workers.dev/" }),
    Object.freeze({ label: "DSE Score Calculator", href: "https://www.mzki.moe/projects/dma/" }),
    Object.freeze({ label: "Number Ninja", href: "https://www.mzki.moe/projects/maf/" }),
  ]),
  unavailableProjectLabels: Object.freeze(["Custom-domain portfolio (URL unavailable)"]),
});

export const approvedRenderedLinks = Object.freeze([
  ...approvedEvidenceManifest.contact,
  ...approvedEvidenceManifest.projects,
]);
