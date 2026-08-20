import { describe, expect, it } from "vitest";
import { profile } from "./profile";
import { approvedEvidenceManifest } from "../../scripts/approved-evidence-manifest.mjs";

describe("Profile data verification against approved evidence manifest", () => {
  describe("Identity", () => {
    it("matches approved name", () => {
      expect(profile.identity.name).toBe(approvedEvidenceManifest.identity.name);
    });

    it("matches approved role", () => {
      expect(profile.identity.role).toBe(approvedEvidenceManifest.identity.role);
    });

    it("matches approved aspiration", () => {
      expect(profile.identity.aspiration).toBe(approvedEvidenceManifest.identity.aspiration);
    });

    it("contains approved summary key phrase", () => {
      expect(profile.identity.summary).toContain(approvedEvidenceManifest.identity.summary);
    });
  });

  describe("Contact links", () => {
    it("contains all approved contact links", () => {
      for (const approvedContact of approvedEvidenceManifest.contact) {
        const match = profile.contact.find(
          (c) => c.label === approvedContact.label && c.href === approvedContact.href
        );
        expect(match).toBeDefined();
      }
    });
  });

  describe("Education - CLAP-TECH/HKBU/IBM context", () => {
    const clapTechEntry = profile.education.find((e) =>
      e.title.includes(approvedEvidenceManifest.education.clapTechPathway)
    );
    const appliedLearningEntry = profile.education.find((e) =>
      e.title.includes("Applied Learning")
    );

    it("includes CLAP-TECH pathway in Higher Diploma entry", () => {
      expect(clapTechEntry).toBeDefined();
      expect(clapTechEntry?.title).toContain(approvedEvidenceManifest.education.clapTechPathway);
    });

    it("cites HKBU as provider", () => {
      expect(clapTechEntry?.provider).toContain(approvedEvidenceManifest.education.hkbuProvider);
    });

    it("mentions IBM context in CLAP-TECH details", () => {
      const ibmMention = clapTechEntry?.details.some((d) =>
        d.includes(approvedEvidenceManifest.education.ibmContext)
      );
      expect(ibmMention).toBe(true);
    });

    it("includes Distinction II grade", () => {
      const distinctionMention = appliedLearningEntry?.details.some((d) =>
        d.includes(approvedEvidenceManifest.education.distinctionIIGrade)
      );
      expect(distinctionMention).toBe(true);
    });

    it("cites top 4% academic standing", () => {
      const top4Mention = appliedLearningEntry?.details.some((d) =>
        d.includes(approvedEvidenceManifest.education.distinctionIITop4Percent)
      );
      expect(top4Mention).toBe(true);
    });

    it("includes Level 5 ICT achievement", () => {
      const hkdseEntry = profile.education.find((e) => e.title.includes("HKDSE"));
      const ictMention = hkdseEntry?.details.some((d) =>
        d.includes(approvedEvidenceManifest.education.hkdseLevel5ICT)
      );
      expect(ictMention).toBe(true);
    });

    it("includes Level 5 English achievement", () => {
      const hkdseEntry = profile.education.find((e) => e.title.includes("HKDSE"));
      const englishMention = hkdseEntry?.details.some((d) =>
        d.includes(approvedEvidenceManifest.education.hkdseLevel5English)
      );
      expect(englishMention).toBe(true);
    });
  });

  describe("BOTS achievement wording", () => {
    const botsAchievement = profile.achievements.find((a) =>
      a.includes(approvedEvidenceManifest.achievements.botsWording)
    );

    it("uses exact BOTS wording", () => {
      expect(botsAchievement).toBeDefined();
      expect(botsAchievement).toContain(approvedEvidenceManifest.achievements.botsWording);
    });

    // it("cites Top 10 ranking", () => {
    
    //   expect(botsAchievement).toContain(approvedEvidenceManifest.achievements.botsRanking);
    // });

    it("includes Hong Kong location", () => {
      expect(botsAchievement).toContain(approvedEvidenceManifest.achievements.botsLocation);
    });

    it("cites 2025 year", () => {
      expect(botsAchievement).toContain(approvedEvidenceManifest.achievements.botsYear);
    });
  });

  describe("Project labels and details", () => {
    it("includes all approved project links", () => {
      for (const approvedProject of approvedEvidenceManifest.projects) {
        const hasProject = profile.projects.some((p) =>
          p.links.some((link) => link.label === approvedProject.label && link.href === approvedProject.href)
        );
        expect(hasProject).toBe(true);
      }
    });

    it("full-stack web apps uses approved technologies", () => {
      const webAppsProject = profile.projects.find((p) => p.title.includes("Full-Stack Web Apps"));
      expect(webAppsProject).toBeDefined();
      for (const tech of approvedEvidenceManifest.projectDetails.fullStackWebApps.technologies) {
        expect(webAppsProject?.technologies).toContain(tech);
      }
    });

    it("security log analysis uses approved technologies", () => {
      const securityProject = profile.projects.find((p) => p.title.includes("Security Log Analysis"));
      expect(securityProject).toBeDefined();
      for (const tech of approvedEvidenceManifest.projectDetails.securityLogAnalysis.technologies) {
        expect(securityProject?.technologies).toContain(tech);
      }
    });

    it("automated data parsing uses approved technologies", () => {
      const dataParsingProject = profile.projects.find((p) => p.title.includes("Automated Data Parsing"));
      expect(dataParsingProject).toBeDefined();
      for (const tech of approvedEvidenceManifest.projectDetails.automatedDataParsing.technologies) {
        expect(dataParsingProject?.technologies).toContain(tech);
      }
    });

    it("real-time input translation uses approved technologies", () => {
      const inputTranslationProject = profile.projects.find((p) => p.title.includes("Real-Time Input-Translation"));
      expect(inputTranslationProject).toBeDefined();
      for (const tech of approvedEvidenceManifest.projectDetails.realTimeInputTranslation.technologies) {
        expect(inputTranslationProject?.technologies).toContain(tech);
      }
    });
  });

  describe("Skills taxonomy", () => {
    it("programming skills match approved list", () => {
      const programmingGroup = profile.skills.find((g) => g.category === "Programming");
      expect(programmingGroup).toBeDefined();
      for (const skill of approvedEvidenceManifest.skills.programming) {
        expect(programmingGroup?.items).toContain(skill);
      }
    });

    it("cybersecurity and IT ops skills match approved list", () => {
      const cybersecGroup = profile.skills.find((g) => g.category === "Cybersecurity & IT Ops");
      expect(cybersecGroup).toBeDefined();
      for (const skill of approvedEvidenceManifest.skills.cybersecurityAndITOps) {
        expect(cybersecGroup?.items).toContain(skill);
      }
    });

    it("tools and frameworks match approved list", () => {
      const toolsGroup = profile.skills.find((g) => g.category === "Tools & Frameworks");
      expect(toolsGroup).toBeDefined();
      for (const skill of approvedEvidenceManifest.skills.toolsAndFrameworks) {
        expect(toolsGroup?.items).toContain(skill);
      }
    });

    it("modern workflows match approved list", () => {
      const workflowsGroup = profile.skills.find((g) => g.category === "Modern Workflows");
      expect(workflowsGroup).toBeDefined();
      for (const skill of approvedEvidenceManifest.skills.modernWorkflows) {
        expect(workflowsGroup?.items).toContain(skill);
      }
    });
  });
});
