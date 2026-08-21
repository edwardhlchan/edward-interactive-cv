export function AchievementList({ achievements }: { achievements: string[] }) {
  return (
    <ul className="achievement-list">
      {achievements.map((achievement) => <li key={achievement} data-evidence-category="achievement">{achievement}</li>)}
    </ul>
  );
}
