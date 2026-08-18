import type { EducationEntry } from "../data/profile";

export function EducationList({ entries }: { entries: EducationEntry[] }) {
  return (
    <div className="education-list">
      {entries.map((entry) => (
        <article className="education-entry" key={`${entry.title}-${entry.dates}`}>
          <div className="entry-meta">
            <span className="entry-meta__date">{entry.dates}</span>
            <span>{entry.provider}</span>
          </div>
          <div className="entry-body">
            <h3>{entry.title}</h3>
            <ul>
              {entry.details.map((detail) => <li key={detail}>{detail}</li>)}
            </ul>
          </div>
        </article>
      ))}
    </div>
  );
}
