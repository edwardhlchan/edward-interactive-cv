import { expect, describe, it } from "vitest";
import { profile } from "./profile";

describe("profile", () => {
  it("contains the approved public identity and contact destinations", () => {
    expect(profile.identity.name).toBe("Edward Chan");
    expect(profile.contact).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ href: "tel:+85255117745" }),
        expect.objectContaining({ href: "mailto:contact@edwardchan.dev" }),
        expect.objectContaining({ href: "https://linkedin.com/in/edhlchan" }),
        expect.objectContaining({ href: "https://github.com/edhlchan" }),
      ]),
    );
  });

  it("contains the four reference projects without a DSE calculator URL", () => {
    expect(profile.projects).toHaveLength(4);
    expect(profile.projects.map((project) => project.title)).toEqual(
      expect.arrayContaining([
        expect.stringMatching(/Full-Stack Web Apps/),
        expect.stringMatching(/Security Log Analysis/),
        expect.stringMatching(/Automated Data Parsing/),
        expect.stringMatching(/Real-Time Input/),
      ]),
    );
    expect(JSON.stringify(profile)).not.toContain("/dse-calculator/");
  });

  it("does not carry legacy links or an unapproved DSE site URL", () => {
    const serialized = JSON.stringify(profile);
    expect(serialized).not.toContain("lmaodick1239");
    expect(serialized).not.toContain("yusixian");
    expect(serialized).not.toContain("dse-calculator");
  });
});
