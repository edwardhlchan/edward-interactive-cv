import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ProjectList } from "./ProjectList";
import type { Project } from "../data/profile";

describe("ProjectList", () => {
  const mockProjects: Project[] = [
    {
      title: "Test Project",
      technologies: ["React", "TypeScript"],
      details: ["Built a test application", "Implemented features"],
      links: [
        { label: "Live Demo", href: "https://example.com" },
      ],
    },
  ];

  it("renders project with data-evidence-category attribute", () => {
    render(<ProjectList projects={mockProjects} />);
    const projectCard = screen.getByRole("article");
    expect(projectCard).toHaveAttribute("data-evidence-category", "project");
  });

  it("renders project title", () => {
    render(<ProjectList projects={mockProjects} />);
    expect(screen.getByRole("heading", { name: "Test Project" })).toBeInTheDocument();
  });

  it("renders technology tags", () => {
    render(<ProjectList projects={mockProjects} />);
    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("TypeScript")).toBeInTheDocument();
  });

  it("renders project details", () => {
    render(<ProjectList projects={mockProjects} />);
    expect(screen.getByText("Built a test application")).toBeInTheDocument();
    expect(screen.getByText("Implemented features")).toBeInTheDocument();
  });

  it("renders project links", () => {
    render(<ProjectList projects={mockProjects} />);
    const link = screen.getByRole("link", { name: /Live Demo/i });
    expect(link).toHaveAttribute("href", "https://example.com");
    expect(link).toHaveAttribute("target", "_blank");
  });
});
