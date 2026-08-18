import type { Profile } from "../data/profile";
import { TerminalPanel } from "../features/terminal/TerminalPanel";
import { AchievementList } from "./AchievementList";
import { EducationList } from "./EducationList";
import { PrintControls } from "./PrintControls";
import { ProfileHeader } from "./ProfileHeader";
import { ProjectList } from "./ProjectList";
import { ResumeSection } from "./ResumeSection";
import { SectionNav, type SectionId } from "./SectionNav";
import { SkillsGrid } from "./SkillsGrid";

export function AppShell({ profile }: { profile: Profile }) {
  const scrollToSection = (sectionId: SectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="app-shell print-document">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <div className="site-chrome print-only-screen">
        <span>edward-ops / cv</span>
        <span>build 01.26 <i aria-hidden="true">●</i> static edge</span>
      </div>
      <div className="layout-grid">
        <aside className="navigation-rail print-only-screen">
          <SectionNav activeSection="summary" />
          <div className="rail-note">
            <span>signal / profile</span>
            <strong>IT operations<br />+ cybersecurity</strong>
            <span className="rail-note__line" />
            <span>scroll or use terminal<br />to inspect dossier</span>
          </div>
        </aside>
        <div className="reading-column">
          <div className="top-actions print-only-screen"><PrintControls /></div>
          <ProfileHeader profile={profile} />
          <main id="main-content" aria-label="Interactive CV">
            <ResumeSection id="summary" title="Professional Summary">
              <p className="summary-copy">{profile.identity.summary}</p>
            </ResumeSection>
            <ResumeSection id="education" title="Education">
              <EducationList entries={profile.education} />
            </ResumeSection>
            <ResumeSection id="projects" title="Key Projects">
              <ProjectList projects={profile.projects} />
            </ResumeSection>
            <ResumeSection id="skills" title="Skills">
              <SkillsGrid groups={profile.skills} />
            </ResumeSection>
            <ResumeSection id="achievements" title="Achievements & Awards">
              <AchievementList achievements={profile.achievements} />
            </ResumeSection>
          </main>
          <footer className="site-footer">
            <div className="print-only-screen">
              <TerminalPanel
                onScrollToSection={scrollToSection}
                onFocusContact={() => document.getElementById("contact-links")?.focus()}
                onPrint={() => window.print()}
              />
            </div>
            <div className="site-footer__meta print-only-screen">
              <span>Edward Chan / interactive CV</span>
              <span>last updated / 2026</span>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}
