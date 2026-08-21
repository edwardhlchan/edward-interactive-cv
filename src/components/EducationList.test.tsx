import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { EducationList } from "./EducationList";
import type { EducationEntry } from "../data/profile";

describe("EducationList", () => {
  const mockEntries: EducationEntry[] = [
    {
      title: "Bachelor of Science",
      provider: "Test University",
      dates: "2020 - 2024",
      details: ["Major in Computer Science", "GPA: 3.8"],
    },
  ];

  it("renders education entry with data-evidence-category attribute", () => {
    render(<EducationList entries={mockEntries} />);
    const article = screen.getByRole("article");
    expect(article).toHaveAttribute("data-evidence-category", "education");
  });

  it("renders education title", () => {
    render(<EducationList entries={mockEntries} />);
    expect(screen.getByRole("heading", { name: "Bachelor of Science" })).toBeInTheDocument();
  });

  it("renders provider and dates", () => {
    render(<EducationList entries={mockEntries} />);
    expect(screen.getByText("Test University")).toBeInTheDocument();
    expect(screen.getByText("2020 - 2024")).toBeInTheDocument();
  });

  it("renders education details", () => {
    render(<EducationList entries={mockEntries} />);
    expect(screen.getByText("Major in Computer Science")).toBeInTheDocument();
    expect(screen.getByText("GPA: 3.8")).toBeInTheDocument();
  });
});
