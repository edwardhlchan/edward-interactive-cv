import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { CVRoute } from "./routes/CVRoute";
import { DemoRoute } from "./routes/DemoRoute";

function NotFound() {
  return (
    <div style={{
      maxWidth: '600px',
      margin: '0 auto',
      padding: '3rem 1.5rem',
      fontFamily: 'IBM Plex Sans, system-ui, sans-serif',
      textAlign: 'center'
    }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Page Not Found</h1>
      <p style={{ fontSize: '1.1rem', marginBottom: '2rem', color: '#666' }}>
        The page you're looking for doesn't exist.
      </p>
      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
        <Link to="/" style={{
          padding: '0.75rem 1.5rem',
          background: '#efb452',
          color: '#17201d',
          textDecoration: 'none',
          fontWeight: 600,
          borderRadius: '4px'
        }}>
          Go to CV
        </Link>
        <Link to="/demo" style={{
          padding: '0.75rem 1.5rem',
          background: '#1a2421',
          color: '#f4f2ea',
          textDecoration: 'none',
          fontWeight: 600,
          borderRadius: '4px'
        }}>
          View Demo
        </Link>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CVRoute />} />
        <Route path="/demo" element={<DemoRoute />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
