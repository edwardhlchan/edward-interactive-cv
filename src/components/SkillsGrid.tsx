import type { SkillGroup } from "../data/profile";

export function SkillsGrid({ groups }: { groups: SkillGroup[] }) {
  return (
    <div className="skills-grid">
      {groups.map((group) => (
        <article className="skill-group" key={group.category} data-evidence-category="skill">
          <h3>{group.category}</h3>
          <ul>{group.items.map((item) => <li key={item}>{item}</li>)}</ul>
        </article>
      ))}
    </div>
  );
}
