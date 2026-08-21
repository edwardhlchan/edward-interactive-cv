import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { AchievementList } from "./AchievementList";

describe("AchievementList", () => {
  const mockAchievements = [
    "First Place - Coding Competition 2024",
    "Best Project Award - Hackathon 2023",
  ];

  it("renders achievements with data-evidence-category attribute", () => {
    const { container } = render(<AchievementList achievements={mockAchievements} />);
    const listItems = container.querySelectorAll("li[data-evidence-category='achievement']");
    expect(listItems).toHaveLength(2);
  });

  it("renders achievement text", () => {
    render(<AchievementList achievements={mockAchievements} />);
    expect(screen.getByText("First Place - Coding Competition 2024")).toBeInTheDocument();
    expect(screen.getByText("Best Project Award - Hackathon 2023")).toBeInTheDocument();
  });
});
