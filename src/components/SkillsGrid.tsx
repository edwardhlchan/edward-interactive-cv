import type { SkillGroup } from "../data/profile";

export function SkillsGrid({ groups }: { groups: SkillGroup[] }) {
  return (
    <div className="skills-grid">
      {groups.map((group, index) => (
        <article className="skill-group" key={group.category}>
          <p className="skill-group__number">0{index + 1}</p>
          <h3>{group.category}</h3>
          <ul>{group.items.map((item) => <li key={item}>{item}</li>)}</ul>
        </article>
      ))}
    </div>
  );
}
