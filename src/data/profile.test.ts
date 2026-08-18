import { expect, describe, it } from "vitest";
import { profile } from "./profile";

describe("profile", () => {
  it("contains the current public identity and contact destinations", () => {
    expect(profile.identity.name).toBe("Edward Chan");
    expect(profile.contact).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ href: "tel:+85255117745" }),
        expect.objectContaining({ href: "mailto:edward.hl.chan@gmail.com" }),
        expect.objectContaining({ href: "https://www.linkedin.com/in/edward-chan-hl/" }),
        expect.objectContaining({ href: "https://github.com/edwardhlchan" }),
      ]),
    );
  });

  it("contains the four reference projects and current project links", () => {
    expect(profile.projects).toHaveLength(4);
    expect(profile.projects.map((project) => project.title)).toEqual(
      expect.arrayContaining([
        expect.stringMatching(/Full-Stack Web Apps/),
        expect.stringMatching(/Security Log Analysis/),
        expect.stringMatching(/Automated Data Parsing/),
        expect.stringMatching(/Real-Time Input/),
      ]),
    );
    expect(profile.projects[0].links).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ href: "https://edward-interactive-cv.despacito777x.workers.dev/" }),
        expect.objectContaining({ href: "https://www.mzki.moe/projects/dma/" }),
        expect.objectContaining({ href: "https://www.mzki.moe/projects/maf/" }),
      ]),
    );
  });

  it("does not carry legacy identity or route content", () => {
    const serialized = JSON.stringify(profile);
    expect(serialized).not.toContain("lmaodick1239");
    expect(serialized).not.toContain("yusixian");
    expect(serialized).not.toContain("dse-calculator");
  });
});
