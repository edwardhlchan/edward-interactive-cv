import type { Profile } from "../data/profile";

export function CVHeader({ profile }: { profile: Profile }) {
  return (
    <header className="cv-header" role="banner">
      <h1>{profile.identity.name}</h1>
      <p className="cv-header__role">{profile.identity.role}</p>
      <p className="cv-header__aspiration">{profile.identity.aspiration}</p>
      <address className="cv-header__contact" id="contact-links" tabIndex={-1}>
        {profile.contact.map((contact) => {
          const isExternal = contact.kind === "linkedin" || contact.kind === "github";
          return (
            <a
              href={contact.href}
              key={contact.kind}
              target={isExternal ? "_blank" : undefined}
              rel={isExternal ? "noreferrer" : undefined}
              aria-label={isExternal ? `${contact.label} (opens in new tab)` : undefined}
            >
              <span className="contact-kind">{contact.kind}</span>
              {" "}
              {contact.label}
            </a>
          );
        })}
      </address>
    </header>
  );
}
