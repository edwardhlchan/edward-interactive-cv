import { useEffect } from "react";
import { DemoHeader } from "../components/DemoHeader";
import { TerminalPanel } from "../features/terminal/TerminalPanel";

export function DemoRoute() {
  useEffect(() => {
    document.title = "Interactive Demo - Edward Chan CV";
    // Focus management: move focus to terminal on route load
    const terminal = document.querySelector('.terminal-panel__input-row input') as HTMLInputElement;
    if (terminal) {
      terminal.focus();
    }
  }, []);

  // Functional callbacks for demo route commands
  const handleScrollToSection = (sectionId: string) => {
    // Render command output acknowledging section focus
    // Actual scroll/focus behavior not applicable on demo route
  };

  const handleFocusContact = () => {
    // Render command output for contact
    // Actual contact focus not applicable on demo route
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="demo-route">
      <DemoHeader />
      <main className="demo-route__content">
        <TerminalPanel
          onScrollToSection={handleScrollToSection}
          onFocusContact={handleFocusContact}
          onPrint={handlePrint}
        />
      </main>
    </div>
  );
}
