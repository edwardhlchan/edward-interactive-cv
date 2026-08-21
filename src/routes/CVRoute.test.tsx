import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { CVRoute } from "./CVRoute";

describe("CVRoute", () => {
  it("renders CVHeader component", () => {
    const { container } = render(
      <BrowserRouter>
        <CVRoute />
      </BrowserRouter>
    );
    expect(container.querySelector(".cv-header")).toBeInTheDocument();
  });

  it("renders CVSummary component", () => {
    const { container } = render(
      <BrowserRouter>
        <CVRoute />
      </BrowserRouter>
    );
    expect(container.querySelector(".cv-summary")).toBeInTheDocument();
  });

  it("renders sections in correct order: Summary → Projects → Skills → Education → Achievements", () => {
    const { container } = render(
      <BrowserRouter>
        <CVRoute />
      </BrowserRouter>
    );
    
    const sections = Array.from(container.querySelectorAll("section[id]"));
    const sectionIds = sections.map((s) => s.id);
    
    expect(sectionIds).toEqual(["summary", "projects", "skills", "education", "achievements"]);
  });

  it("renders ProjectList before SkillsGrid", () => {
    const { container } = render(
      <BrowserRouter>
        <CVRoute />
      </BrowserRouter>
    );
    const projectList = container.querySelector(".project-list");
    const skillsGrid = container.querySelector(".skills-grid");
    
    expect(projectList).toBeInTheDocument();
    expect(skillsGrid).toBeInTheDocument();
    
    // Projects should appear before skills in DOM order
    const allElements = Array.from(container.querySelectorAll("*"));
    const projectIndex = allElements.indexOf(projectList!);
    const skillsIndex = allElements.indexOf(skillsGrid!);
    expect(projectIndex).toBeLessThan(skillsIndex);
  });

  it("renders CVFooter component", () => {
    const { container } = render(
      <BrowserRouter>
        <CVRoute />
      </BrowserRouter>
    );
    expect(container.querySelector(".cv-footer")).toBeInTheDocument();
  });

  it("does not render TerminalPanel", () => {
    const { container } = render(
      <BrowserRouter>
        <CVRoute />
      </BrowserRouter>
    );
    expect(container.querySelector('[role="region"][aria-label*="terminal" i]')).not.toBeInTheDocument();
  });

  it("does not render terminal input or commands", () => {
    const { container } = render(
      <BrowserRouter>
        <CVRoute />
      </BrowserRouter>
    );
    expect(container.querySelector(".terminal-panel")).not.toBeInTheDocument();
    expect(container.querySelector(".terminal-panel__input-row")).not.toBeInTheDocument();
  });

  it("main content has focusable tabIndex for accessibility", () => {
    const { container } = render(
      <BrowserRouter>
        <CVRoute />
      </BrowserRouter>
    );
    const main = container.querySelector("main");
    expect(main).toHaveAttribute("tabIndex", "-1");
  });
});
