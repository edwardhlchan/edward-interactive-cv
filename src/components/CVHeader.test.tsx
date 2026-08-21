import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { CVHeader } from "./CVHeader";
import type { Profile } from "../data/profile";

const mockProfile: Profile = {
  identity: {
    name: "Edward Chan",
    role: "Secondary School Student | Incoming Data Science Student",
    aspiration: "Aspiring Technology Operations & Cybersecurity Professional",
    summary: "Test summary",
  },
  contact: [
    { label: "+852 5511 7745", href: "tel:+85255117745", kind: "phone" },
    { label: "edward.hl.chan@gmail.com", href: "mailto:edward.hl.chan@gmail.com", kind: "email" },
    { label: "github.com/edwardhlchan", href: "https://github.com/edwardhlchan", kind: "github" },
  ],
  education: [],
  projects: [],
  skills: [],
  achievements: [],
};

describe("CVHeader", () => {
  it("renders name as h1", () => {
    render(<CVHeader profile={mockProfile} />);
    expect(screen.getByRole("heading", { level: 1, name: "Edward Chan" })).toBeInTheDocument();
  });

  it("renders role and aspiration", () => {
    render(<CVHeader profile={mockProfile} />);
    expect(screen.getByText(/Secondary School Student/)).toBeInTheDocument();
    expect(screen.getByText(/Aspiring Technology Operations/)).toBeInTheDocument();
  });

  it("renders contact links with correct hrefs", () => {
    render(<CVHeader profile={mockProfile} />);
    const phoneLink = screen.getByRole("link", { name: /phone.*5511 7745/ });
    expect(phoneLink).toHaveAttribute("href", "tel:+85255117745");
    
    const emailLink = screen.getByRole("link", { name: /email.*edward.hl.chan@gmail.com/ });
    expect(emailLink).toHaveAttribute("href", "mailto:edward.hl.chan@gmail.com");
    
    const githubLink = screen.getByRole("link", { name: /github.*edwardhlchan/ });
    expect(githubLink).toHaveAttribute("href", "https://github.com/edwardhlchan");
  });

  it("renders banner landmark", () => {
    render(<CVHeader profile={mockProfile} />);
    expect(screen.getByRole("banner")).toBeInTheDocument();
  });
});
