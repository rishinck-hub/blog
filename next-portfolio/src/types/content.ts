export type NavigationItem = Readonly<{
  label: string;
  href: `/${string}` | "/";
}>;

export type SocialLink = Readonly<{
  label: string;
  value: string;
  href: string;
}>;

export type Project = Readonly<{
  slug: string;
  name: string;
  subtitle: string;
  year: string;
  category: "Full Stack" | "Backend" | "Frontend" | "Mobile" | "Cloud";
  role: string;
  technologies: readonly string[];
  description: string;
  challenge?: string;
  approach?: string;
  process?: string;
  features?: readonly string[];
  outcome?: string;
  coverImage?: string;
  gallery?: readonly string[];
  liveUrl?: string;
  repositoryUrl?: string;
  isConfidential?: boolean;
  visualTone: "paper" | "ink" | "stone";
}>;

export type ExperienceEntry = Readonly<{
  kind: "professional" | "education" | "development";
  period: string;
  role: string;
  organization: string;
  description: string;
  responsibilities: readonly string[];
  technologies: readonly string[];
  relatedProjects?: readonly string[];
}>;

export type CreativeEntry = Readonly<{
  id: number;
  name: string;
  category: string;
  thumbnailUrl: string;
  duration: string;
  instagramUrl: string;
}>;

export type Service = Readonly<{
  name: string;
  tags: readonly string[];
}>;
