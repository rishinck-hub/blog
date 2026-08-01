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
  technologies: readonly string[];
  description?: string;
  liveUrl?: string;
  confidentiality?: "public-summary-only";
}>;

export type ExperienceEntry = Readonly<{
  period: string;
  role: string;
  organization: string;
  description: string;
}>;

export type CreativeEntry = Readonly<{
  id: number;
  name: string;
  category: string;
  thumbnailUrl: string;
  duration: string;
  instagramUrl: string;
}>;
