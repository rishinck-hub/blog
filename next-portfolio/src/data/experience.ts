import type { ExperienceEntry } from "@/types/content";

export const experience = [
  {
    period: "Present",
    role: "Software Developer Intern",
    organization: "Zil Money · Laravel, MySQL, React",
    description:
      "Contributing to the Employee Management System and backend development for OnlineCheckWriter.com using Laravel, MySQL, and React.",
  },
  {
    period: "2026",
    role: "Clinic Management Application – Dawa Clinic",
    organization: "React, Django REST, Tailwind CSS, PostgreSQL",
    description:
      "Developed a full-stack clinic management system with JWT-based authentication and role-based access for Admin and Doctors. Implemented CRUD operations for patients, consultations, and inventory, built and integrated 10+ RESTful APIs, and deployed using Vercel and Render.",
  },
  {
    period: "May 2025 – Dec 2025",
    role: "Python Full Stack Developer – Trainee",
    organization: "Faith Infotech Academy, Technopark",
    description:
      "Built and deployed 3+ full-stack applications using React.js and Django REST Framework. Developed and integrated RESTful APIs, deployed apps on Microsoft Azure, and implemented Docker-based containerization with basic CI/CD practices.",
  },
  {
    period: "2021 – 2025",
    role: "B.Tech Computer Science",
    organization: "Malabar College of Engineering and Technology",
    description:
      "Pursuing B.Tech with specialisation in full-stack development, mobile apps, and database systems.",
  },
  {
    period: "2024 – 2025",
    role: "Department Association Chairperson",
    organization: "MCET — CS Department",
    description:
      "Leading the student association, organising technical events, workshops, and building a collaborative community.",
  },
  {
    period: "2024",
    role: "Trysta 24 Cyber Security and Ethical Hacking workshop",
    organization: "Indian Institute of Technology, Delhi",
    description:
      "Attended ‘Trysta 24’ Cyber Security and Ethical Hacking Workshop by the Indian Institute of Technology, Delhi.",
  },
  {
    period: "2023",
    role: "CET Workshop Participant",
    organization: "College of Engineering, Trivandrum",
    description:
      "Attended an advanced workshop on machine learning fundamentals and practical AI implementation strategies.",
  },
] as const satisfies readonly ExperienceEntry[];
