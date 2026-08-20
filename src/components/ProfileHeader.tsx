import type { Profile } from "../data/profile";

export function ProfileHeader({ profile }: { profile: Profile }) {
  return (
    <header className="profile-header">
      <div className="profile-header__topline">
        <span className="eyebrow">Interactive CV / profile dossier</span>
        {/* <span className="availability"><span className="status-dot" aria-hidden="true" /> open to opportunity</span> */}
      </div>
      <div className="profile-header__identity">
        {/* <p className="profile-header__index" aria-hidden="true">EC / 01</p> */}
        <div>
          <h1>{profile.identity.name}</h1>
          <p className="profile-header__role">{profile.identity.role}</p>
          <p className="profile-header__aspiration">{profile.identity.aspiration}</p>
        </div>
      </div>
      <address className="contact-links" id="contact-links" tabIndex={-1}>
        {profile.contact.map((contact) => (
          <a
            href={contact.href}
            key={contact.kind}
            target={contact.kind === "linkedin" || contact.kind === "github" ? "_blank" : undefined}
            rel={contact.kind === "linkedin" || contact.kind === "github" ? "noreferrer" : undefined}
          >
            <span className="contact-links__kind">{contact.kind}</span>
            {" "}
            {contact.label}
          </a>
        ))}
      </address>
    </header>
  );
}
