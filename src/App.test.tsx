import { render, screen } from "@testing-library/react";
import { expect, it, describe } from "vitest";
import { Routes, Route, MemoryRouter, Link } from "react-router-dom";
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

describe("App routing", () => {
  it("renders CV route at /", () => {
    const { container } = render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route path="/" element={<CVRoute />} />
          <Route path="/demo" element={<DemoRoute />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </MemoryRouter>
    );
    const mainElement = container.querySelector('main[aria-label="CV"]');
    expect(mainElement).toBeInTheDocument();
  });

  it("CV route contains Edward Chan h1", () => {
    const { container } = render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route path="/" element={<CVRoute />} />
          <Route path="/demo" element={<DemoRoute />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </MemoryRouter>
    );
    const h1 = container.querySelector("h1");
    expect(h1?.textContent).toBe("Edward Chan");
  });

  it("CV route does not contain terminal region", () => {
    const { container } = render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route path="/" element={<CVRoute />} />
          <Route path="/demo" element={<DemoRoute />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </MemoryRouter>
    );
    const terminal = container.querySelector('[role="region"][aria-label*="terminal" i]');
    expect(terminal).not.toBeInTheDocument();
  });

  it("renders NotFound component for unknown routes", () => {
    render(
      <MemoryRouter initialEntries={["/unknown-route"]}>
        <Routes>
          <Route path="/" element={<CVRoute />} />
          <Route path="/demo" element={<DemoRoute />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByRole("heading", { name: /page not found/i })).toBeInTheDocument();
  });

  it("NotFound component has links to CV and demo", () => {
    render(
      <MemoryRouter initialEntries={["/unknown-path"]}>
        <Routes>
          <Route path="/" element={<CVRoute />} />
          <Route path="/demo" element={<DemoRoute />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByRole("link", { name: /go to cv/i })).toHaveAttribute("href", "/");
    expect(screen.getByRole("link", { name: /view demo/i })).toHaveAttribute("href", "/demo");
  });

  it("renders demo route at /demo", () => {
    const { container } = render(
      <MemoryRouter initialEntries={["/demo"]}>
        <Routes>
          <Route path="/" element={<CVRoute />} />
          <Route path="/demo" element={<DemoRoute />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </MemoryRouter>
    );
    const terminal = container.querySelector('.terminal-panel');
    expect(terminal).toBeInTheDocument();
  });

  it("demo route has Back to CV link", () => {
    render(
      <MemoryRouter initialEntries={["/demo"]}>
        <Routes>
          <Route path="/" element={<CVRoute />} />
          <Route path="/demo" element={<DemoRoute />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </MemoryRouter>
    );
    const backLink = screen.getByRole("link", { name: /back to cv/i });
    expect(backLink).toHaveAttribute("href", "/");
  });

  it("CV route has View Interactive Demo link", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route path="/" element={<CVRoute />} />
          <Route path="/demo" element={<DemoRoute />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </MemoryRouter>
    );
    const demoLink = screen.getByRole("link", { name: /view interactive demo/i });
    expect(demoLink).toHaveAttribute("href", "/demo");
  });
});
