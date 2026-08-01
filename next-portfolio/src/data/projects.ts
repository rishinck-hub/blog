import type { Project } from "@/types/content";

export const projects: readonly Project[] = [
  {
    slug: "employee-management-system",
    name: "Employee Management System",
    technologies: ["Laravel", "MySQL", "React"],
    description:
      "Contributed to an employee management platform during a software developer internship at Zil Money.",
    confidentiality: "public-summary-only",
  },
  {
    slug: "online-check-writer-backend",
    name: "OnlineCheckWriter.com Backend",
    technologies: ["Laravel", "MySQL", "REST API"],
    description:
      "Worked on backend development for OnlineCheckWriter.com as part of the Zil Money engineering team.",
    confidentiality: "public-summary-only",
  },
  {
    slug: "cash-splitter",
    name: "Cash Splitter",
    technologies: ["React", "Vercel", "PDF Export"],
    description:
      "Trip expense splitter for friends and family with downloadable PDF summaries.",
    liveUrl: "https://cash-splitter-rishinck.vercel.app/",
  },
  {
    slug: "clinic-management-app",
    name: "Clinic Management App",
    technologies: ["React", "Django REST", "PostgreSQL", "Vercel", "Render"],
  },
  {
    slug: "clinic-management-system",
    name: "Clinic Management System",
    technologies: ["React", "Django REST", "MySQL", "PythonAnywhere"],
  },
  {
    slug: "file-management-system",
    name: "File Management System",
    technologies: ["Flask", "Azure", "Python"],
  },
  {
    slug: "bus-management-app",
    name: "Bus Management App",
    technologies: ["Flutter", "Firebase"],
  },
] as const;

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
