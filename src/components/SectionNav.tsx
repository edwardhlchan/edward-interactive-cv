export type SectionId = "summary" | "education" | "projects" | "skills" | "achievements";

const sections: Array<{ id: SectionId; label: string }> = [
  { id: "summary", label: "Summary" },
  { id: "education", label: "Education" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "achievements", label: "Awards" },
];

export function SectionNav({ activeSection }: { activeSection: SectionId }) {
  return (
    <nav className="section-nav" aria-label="CV sections">
      <div className="section-nav__label">index / cv</div>
      <div className="section-nav__links">
        {sections.map((section, index) => (
          <a
            href={`#${section.id}`}
            key={section.id}
            aria-current={activeSection === section.id ? "location" : undefined}
          >
            <span>{String(index + 1).padStart(2, "0")}</span>
            {section.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
