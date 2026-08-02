import type { ReactNode } from "react";

type EditorialHeadingProps = Readonly<{
  children: ReactNode;
  as?: "h1" | "h2" | "h3";
  level?: "hero" | "page" | "section" | "project";
  className?: string;
}>;

const levelClass = {
  hero: "type-hero",
  page: "type-page-title",
  section: "type-section-heading",
  project: "type-project-title",
} as const;

export function EditorialHeading({ children, as: Tag = "h2", level = "section", className = "" }: EditorialHeadingProps) {
  return <Tag className={`editorial-heading ${levelClass[level]} ${className}`}>{children}</Tag>;
}
