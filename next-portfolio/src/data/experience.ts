import type { ExperienceEntry } from "@/types/content";

export const experience: readonly ExperienceEntry[] = [
  {
    kind: "professional",
    period: "Present",
    role: "Software Developer Intern",
    organization: "Zil Money",
    description: "Contributing to product development using Laravel, MySQL, and React within the Zil Money engineering team.",
    responsibilities: [
      "Contribute to the Employee Management System.",
      "Support backend development for OnlineCheckWriter.com.",
      "Work with Laravel, MySQL, and React in the existing product environment.",
    ],
    technologies: ["Laravel", "MySQL", "React"],
    relatedProjects: ["employee-management-system", "online-check-writer-backend"],
  },
  {
    kind: "professional",
    period: "2026",
    role: "Clinic Management Application",
    organization: "Dawa Clinic",
    description: "Developed a full-stack clinic management system with authenticated, role-based workflows for administrators and doctors.",
    responsibilities: [
      "Implement JWT-based authentication and role-based access for administrators and doctors.",
      "Build patient, consultation, and inventory CRUD workflows.",
      "Develop and integrate RESTful APIs.",
      "Deploy the application using Vercel and Render.",
    ],
    technologies: ["React", "Django REST", "Tailwind CSS", "PostgreSQL", "Vercel", "Render"],
    relatedProjects: ["clinic-management-app"],
  },
  {
    kind: "professional",
    period: "May 2025 – Dec 2025",
    role: "Python Full Stack Developer — Trainee",
    organization: "Faith Infotech Academy, Technopark",
    description: "Completed practical full-stack training focused on React, Django REST, APIs, deployment, and delivery fundamentals.",
    responsibilities: [
      "Build and deploy full-stack applications using React and Django REST Framework.",
      "Develop and integrate RESTful APIs.",
      "Deploy applications on Microsoft Azure.",
      "Apply Docker-based containerization and basic CI/CD practices.",
    ],
    technologies: ["React", "Django REST", "REST API", "Azure", "Docker", "CI/CD"],
  },
  {
    kind: "education",
    period: "2021 – 2025",
    role: "B.Tech Computer Science",
    organization: "Malabar College of Engineering and Technology",
    description: "Computer Science education with focus areas including full-stack development, mobile applications, and database systems.",
    responsibilities: ["Study full-stack development, mobile applications, and database systems."],
    technologies: ["Computer Science", "Full Stack", "Mobile Apps", "Databases"],
  },
  {
    kind: "development",
    period: "2024 – 2025",
    role: "Department Association Chairperson",
    organization: "MCET — CS Department",
    description: "Led the student association and supported technical events, workshops, and community collaboration.",
    responsibilities: ["Lead the department student association.", "Organize technical events and workshops.", "Support a collaborative student community."],
    technologies: ["Leadership", "Events", "Community"],
  },
  {
    kind: "development",
    period: "2024",
    role: "Trysta 24 Cyber Security and Ethical Hacking Workshop",
    organization: "Indian Institute of Technology, Delhi",
    description: "Attended the Trysta 24 Cyber Security and Ethical Hacking workshop.",
    responsibilities: ["Participate in the Cyber Security and Ethical Hacking workshop."],
    technologies: ["Cyber Security", "Ethical Hacking"],
  },
  {
    kind: "development",
    period: "2023",
    role: "CET Workshop Participant",
    organization: "College of Engineering, Trivandrum",
    description: "Attended a workshop covering machine-learning fundamentals and practical AI implementation strategies.",
    responsibilities: ["Participate in sessions on machine-learning fundamentals and practical AI implementation."],
    technologies: ["Machine Learning", "AI Fundamentals"],
  },
] as const;

export const professionalExperience = experience.filter((entry) => entry.kind === "professional");
export const educationExperience = experience.filter((entry) => entry.kind === "education");
export const developmentExperience = experience.filter((entry) => entry.kind === "development");
