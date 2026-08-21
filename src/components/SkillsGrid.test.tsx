import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { SkillsGrid } from "./SkillsGrid";
import type { SkillGroup } from "../data/profile";

describe("SkillsGrid", () => {
  const mockGroups: SkillGroup[] = [
    {
      category: "Frontend",
      items: ["React", "TypeScript", "CSS"],
    },
    {
      category: "Backend",
      items: ["Node.js", "Python"],
    },
  ];

  it("renders skill groups with data-evidence-category attribute", () => {
    render(<SkillsGrid groups={mockGroups} />);
    const articles = screen.getAllByRole("article");
    articles.forEach((article) => {
      expect(article).toHaveAttribute("data-evidence-category", "skill");
    });
  });

  it("does not render decorative numbering", () => {
    render(<SkillsGrid groups={mockGroups} />);
    expect(screen.queryByText("01")).not.toBeInTheDocument();
    expect(screen.queryByText("02")).not.toBeInTheDocument();
  });

  it("renders skill category headings", () => {
    render(<SkillsGrid groups={mockGroups} />);
    expect(screen.getByRole("heading", { name: "Frontend" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Backend" })).toBeInTheDocument();
  });

  it("renders skill items", () => {
    render(<SkillsGrid groups={mockGroups} />);
    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("TypeScript")).toBeInTheDocument();
    expect(screen.getByText("Node.js")).toBeInTheDocument();
  });
});
