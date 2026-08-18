import type { ReactNode } from "react";
import type { SectionId } from "./SectionNav";

export function ResumeSection({
  id,
  title,
  children,
}: {
  id: SectionId;
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="resume-section" id={id} aria-labelledby={`${id}-heading`}>
      <div className="section-heading-row">
        <span className="section-kicker">{id}</span>
        <h2 id={`${id}-heading`}>{title}</h2>
      </div>
      {children}
    </section>
  );
}
