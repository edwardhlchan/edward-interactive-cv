export function PrintControls() {
  return (
    <button className="print-controls" type="button" onClick={() => window.print()}>
      <span aria-hidden="true">↳</span> Print CV
    </button>
  );
}
