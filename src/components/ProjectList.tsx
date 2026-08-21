import type { Project } from "../data/profile";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="project-card print-project-entry" data-evidence-category="project">
      <div className="project-card__content">
        <div className="project-card__heading">
          <h3>{project.title}</h3>
          <div className="tech-tags" aria-label="Technologies">
            {project.technologies.map((technology) => <span key={technology}>{technology}</span>)}
          </div>
        </div>
        <ul>
          {project.details.map((detail) => <li key={detail}>{detail}</li>)}
        </ul>
        {project.links.length > 0 && (
          <div className="project-links" aria-label={`${project.title} links`}>
            {project.links.map((link) => (
              link.href ? (
                <a href={link.href} key={link.href} target="_blank" rel="noreferrer">
                  {link.label} <span aria-hidden="true">↗</span>
                </a>
              ) : (
                <span className="project-link-unavailable" key={link.label}>
                  {link.label}
                </span>
              )
            ))}
          </div>
        )}
      </div>
    </article>
  );
}

export function ProjectList({ projects }: { projects: Project[] }) {
  return <div className="project-list">{projects.map((project) => <ProjectCard key={project.title} project={project} />)}</div>;
}
