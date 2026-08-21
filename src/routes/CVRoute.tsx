import { useEffect } from "react";
import { profile } from "../data/profile";
import { CVHeader } from "../components/CVHeader";
import { CVSummary } from "../components/CVSummary";
import { CVFooter } from "../components/CVFooter";
import { ResumeSection } from "../components/ResumeSection";
import { ProjectList } from "../components/ProjectList";
import { SkillsGrid } from "../components/SkillsGrid";
import { EducationList } from "../components/EducationList";
import { AchievementList } from "../components/AchievementList";
import { PrintControls } from "../components/PrintControls";

export function CVRoute() {
  useEffect(() => {
    document.title = `${profile.identity.name} - Interactive CV`;
    // Focus management: move focus to main content on route load
    const mainContent = document.getElementById("main-content");
    if (mainContent) {
      mainContent.focus();
    }
  }, []);

  return (
    <div className="cv-route print-document">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <div className="top-actions print-hide">
        <PrintControls />
      </div>
      <CVHeader profile={profile} />
      <main id="main-content" aria-label="CV" tabIndex={-1}>
        <ResumeSection id="summary" title="Professional Summary">
          <CVSummary summary={profile.identity.summary} />
        </ResumeSection>
        <ResumeSection id="projects" title="Key Projects">
          <ProjectList projects={profile.projects} />
        </ResumeSection>
        <ResumeSection id="skills" title="Skills">
          <SkillsGrid groups={profile.skills} />
        </ResumeSection>
        <ResumeSection id="education" title="Education">
          <EducationList entries={profile.education} />
        </ResumeSection>
        <ResumeSection id="achievements" title="Achievements & Awards">
          <AchievementList achievements={profile.achievements} />
        </ResumeSection>
      </main>
      <CVFooter />
    </div>
  );
}
