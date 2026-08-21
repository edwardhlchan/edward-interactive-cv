export function CVSummary({ summary }: { summary: string }) {
  return (
    <div className="cv-summary" data-evidence-category="summary">
      <p>{summary}</p>
    </div>
  );
}
