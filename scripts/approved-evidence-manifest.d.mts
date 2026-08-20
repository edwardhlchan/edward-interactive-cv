export declare const approvedEvidenceManifest: {
  readonly identity: {
    readonly name: string;
    readonly role: string;
    readonly aspiration: string;
    readonly summary: string;
  };
  readonly contact: ReadonlyArray<{
    readonly label: string;
    readonly href: string;
  }>;
  readonly education: {
    readonly clapTechPathway: string;
    readonly hkbuProvider: string;
    readonly ibmContext: string;
    readonly distinctionIIGrade: string;
    readonly distinctionIIHighest: string;
    readonly distinctionIITop4Percent: string;
    readonly hkdseLevel5ICT: string;
    readonly hkdseLevel5English: string;
    readonly equinix: string;
  };
  readonly achievements: {
    readonly botsWording: string;
    readonly botsYear: string;
    readonly botsRanking: string;
    readonly botsLocation: string;
    readonly cccAward: string;
    readonly cccCompetition: string;
    readonly cccDivision: string;
    readonly cccYear: string;
  };
  readonly projects: ReadonlyArray<{
    readonly label: string;
    readonly href: string;
  }>;
  readonly projectDetails: {
    readonly fullStackWebApps: {
      readonly technologies: ReadonlyArray<string>;
      readonly keywords: ReadonlyArray<string>;
    };
    readonly securityLogAnalysis: {
      readonly technologies: ReadonlyArray<string>;
      readonly keywords: ReadonlyArray<string>;
    };
    readonly automatedDataParsing: {
      readonly technologies: ReadonlyArray<string>;
      readonly keywords: ReadonlyArray<string>;
    };
    readonly realTimeInputTranslation: {
      readonly technologies: ReadonlyArray<string>;
      readonly keywords: ReadonlyArray<string>;
    };
  };
  readonly skills: {
    readonly programming: ReadonlyArray<string>;
    readonly cybersecurityAndITOps: ReadonlyArray<string>;
    readonly toolsAndFrameworks: ReadonlyArray<string>;
    readonly modernWorkflows: ReadonlyArray<string>;
  };
  readonly unavailableProjectLabels: ReadonlyArray<string>;
};

export declare const approvedRenderedLinks: ReadonlyArray<{
  readonly label: string;
  readonly href: string;
}>;
