import type { Project } from "../data/profile";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="project-card">
      <div className="project-card__marker" aria-hidden="true">●</div>
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
          <div className="project-links">
            {project.links.map((link) => (
              <a href={link.href} key={link.href} target="_blank" rel="noreferrer">{link.label} ↗</a>
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
