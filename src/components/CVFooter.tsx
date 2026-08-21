import { Link } from "react-router-dom";

export function CVFooter() {
  return (
    <footer className="cv-footer print-hide" role="contentinfo">
      <div className="cv-footer__content">
        <Link to="/demo" className="cv-footer__demo-link">
          View Interactive Demo
        </Link>
      </div>
    </footer>
  );
}
