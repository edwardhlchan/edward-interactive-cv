import { Link } from "react-router-dom";

export function DemoHeader() {
  return (
    <nav className="demo-header">
      <Link to="/" className="demo-header__back-link">
        ← Back to CV
      </Link>
      <h1 className="demo-header__title">Interactive Demo</h1>
    </nav>
  );
}
