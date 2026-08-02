import type { Project } from "@/types/content";

type ProjectVisualProps = Readonly<{
  project: Project;
  number: string;
  className?: string;
  compact?: boolean;
}>;

export function ProjectVisual({ project, number, className = "", compact = false }: ProjectVisualProps) {
  return (
    <div className={`project-visual project-visual--${project.visualTone}${compact ? " project-visual--compact" : ""} ${className}`}>
      <span className="project-visual__number" aria-hidden="true">{number}</span>
      <span className="project-visual__title" aria-hidden="true">{project.name}</span>
      <span className="project-visual__label type-label">
        {project.isConfidential ? "Confidential — neutral visual" : "Project study"}
      </span>
      <span className="project-visual__tech type-metadata">{project.technologies.slice(0, 3).join(" · ")}</span>
    </div>
  );
}
