/** Editable editorial content used across portfolio pages. */
export const pageMetadata = {
  home: { title: "Software Developer", description: "Mohammed Rishin C K builds dependable full-stack applications, backend systems, and refined web experiences.", path: "/" },
  about: { title: "About", description: "About Mohammed Rishin C K, his development approach, current focus, and creative interests.", path: "/about" },
  work: { title: "Work", description: "A collection of digital products, systems, and experiments by Mohammed Rishin C K.", path: "/work" },
  experience: { title: "Experience", description: "Professional experience, education, training, leadership, and workshops from Mohammed Rishin C K.", path: "/experience" },
  creative: { title: "Creative", description: "An editorial gallery of video editing, motion, event, travel, and social work by Mohammed Rishin C K.", path: "/creative" },
  contact: { title: "Contact", description: "Contact Mohammed Rishin C K about software development roles, projects, and collaborations.", path: "/contact" },
} as const;

export const homeContent = {
  featuredProjectSlugs: ["employee-management-system", "cash-splitter", "clinic-management-app"],
  hero: {
    availability: "Available for opportunities",
    firstNameLine: "Mohammed",
    secondNameLine: "Rishin C K",
    role: "Software developer — India",
    statement: "I build reliable digital systems and refined web experiences.",
  },
  introduction: {
    heading: "A developer focused on making complex digital products feel clear.",
    body: "I work across frontend and backend development, turning practical requirements into maintainable applications. My experience spans Laravel, React, Django REST, databases, and deployment workflows.",
  },
  capabilities: [
    { number: "01", name: "Backend engineering", description: "Maintainable server-side systems and application logic grounded in hands-on Laravel, Django, Flask, and Python work.", technologies: "Laravel · Django REST · Flask · Python", project: "OnlineCheckWriter.com backend" },
    { number: "02", name: "Frontend development", description: "Responsive interfaces that make operational workflows clear, usable, and dependable across devices.", technologies: "React · Next.js · Tailwind CSS", project: "Cash Splitter" },
    { number: "03", name: "Databases", description: "Structured data models and practical persistence layers for full-stack products.", technologies: "MySQL · PostgreSQL · MongoDB · Firebase", project: "Clinic Management App" },
    { number: "04", name: "API development", description: "RESTful services, JWT authentication, role-based access, and frontend integration.", technologies: "Django REST · Laravel · REST API", project: "Clinic Management App" },
    { number: "05", name: "Delivery and DevOps", description: "Deployment and delivery workflows developed through portfolio applications and technical training.", technologies: "Vercel · Render · Azure · Docker · CI/CD", project: "File Management System" },
  ],
} as const;

export const aboutContent = {
  hero: {
    heading: "I build software by understanding the problem before choosing the solution.",
    introduction: "Full-stack developer working across dependable backend systems, thoughtful interfaces, databases, and practical delivery workflows.",
  },
  biography: {
    heading: "Engineering with context, curiosity, and care.",
    paragraphs: [
      "I am a software developer with experience building full-stack applications using React, Laravel, Django REST, and database technologies. I currently contribute to software development work during my internship at Zil Money.",
      "My B.Tech Computer Science background and full-stack development training have given me opportunities to work across web applications, mobile development, APIs, deployment, and cloud tooling.",
    ],
  },
  principles: [
    { number: "01", title: "Understand before building", text: "I start with the problem, the people using the product, and the constraints around it. Technology follows that understanding—not the other way around." },
    { number: "02", title: "Make complexity legible", text: "Whether I am shaping an interface, an API, or a data model, I look for a structure that is clear to use and straightforward to maintain." },
    { number: "03", title: "Build, test, refine", text: "My approach is practical and iterative: break the work into useful parts, connect the system carefully, and improve it through feedback and verification." },
  ],
  focus: {
    heading: "Growing across the full product stack.",
    paragraphs: [
      "My current professional focus is backend and full-stack development with Laravel, MySQL, React, and REST APIs. Alongside that work, I continue strengthening frontend architecture, database design, deployment, Docker, and CI/CD fundamentals.",
      "I learn most effectively by applying concepts in real applications—from clinic and file-management systems to smaller utilities and mobile experiments.",
    ],
  },
  creative: {
    heading: "Code gives ideas structure. Editing gives stories rhythm.",
    paragraphs: [
      "Outside software development, I explore video editing and visual storytelling through cinematic shorts, promotional edits, travel videos, event coverage, and social content.",
      "Working with DaVinci Resolve and social media projects gives me another way to think about pacing, hierarchy, and communicating an idea clearly.",
    ],
  },
} as const;
