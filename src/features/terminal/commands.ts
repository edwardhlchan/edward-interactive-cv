import type { SectionId } from "../../components/SectionNav";
import { profile } from "../../data/profile";

export type TerminalEffect =
  | { type: "output"; lines: string[] }
  | { type: "scroll"; sectionId: SectionId; lines: string[] }
  | { type: "contact"; lines: string[] }
  | { type: "print"; lines: string[] }
  | { type: "clear" }
  | { type: "noop" };

const helpLines = [
  "available commands:",
  "help      list available commands",
  "whoami    show profile identity",
  "about     open professional summary",
  "projects  open key projects",
  "skills    open technical skills",
  "contact   focus contact links",
  "print     open browser print dialog",
  "clear     clear terminal history",
];

export function executeTerminalCommand(input: string): TerminalEffect {
  const command = input.trim().toLowerCase();

  switch (command) {
    case "":
      return { type: "noop" };
    case "help":
      return { type: "output", lines: helpLines };
    case "whoami":
      return { type: "output", lines: [profile.identity.name, profile.identity.role] };
    case "about":
      return { type: "scroll", sectionId: "summary", lines: [`${profile.identity.name} — ${profile.identity.role}.`] };
    case "projects":
      return { type: "scroll", sectionId: "projects", lines: ["Opening Key Projects."] };
    case "skills":
      return { type: "scroll", sectionId: "skills", lines: ["Opening Skills."] };
    case "contact":
      return { type: "contact", lines: ["Focusing contact links."] };
    case "print":
      return { type: "print", lines: ["Opening browser print dialog."] };
    case "clear":
      return { type: "clear" };
    default:
      return {
        type: "output",
        lines: [`unknown command: ${command}`, "Type help to list available commands."],
      };
  }
}
