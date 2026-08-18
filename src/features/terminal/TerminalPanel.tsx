import { useState } from "react";
import { executeTerminalCommand } from "./commands";
import type { SectionId } from "../../components/SectionNav";

export type TerminalPanelProps = {
  onScrollToSection: (sectionId: SectionId) => void;
  onFocusContact: () => void;
  onPrint: () => void;
};

export function TerminalPanel({ onScrollToSection, onFocusContact, onPrint }: TerminalPanelProps) {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);

  const submit = () => {
    const command = input.trim();
    if (!command) return;

    const effect = executeTerminalCommand(command);
    if (effect.type === "clear") {
      setHistory([]);
    } else if (effect.type !== "noop") {
      setHistory((current) => [...current, `root@edward-ops:~$ ${command}`, ...effect.lines].slice(-30));
      if (effect.type === "scroll") onScrollToSection(effect.sectionId);
      if (effect.type === "contact") onFocusContact();
      if (effect.type === "print") onPrint();
    }
    setInput("");
  };

  return (
    <section className="terminal-panel" aria-label="Interactive terminal">
      <div className="terminal-panel__header">
        <span>terminal / local command palette</span>
        <span>safe mode</span>
      </div>
      <div className="terminal-panel__history" role="log" aria-live="polite">
        {history.map((line, index) => <div key={`${line}-${index}`}>{line}</div>)}
      </div>
      <div className="terminal-panel__input-row">
        <label htmlFor="terminal-command">root@edward-ops:~$</label>
        <input
          id="terminal-command"
          aria-label="Terminal command"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") submit();
          }}
          spellCheck={false}
          autoComplete="off"
        />
      </div>
    </section>
  );
}
