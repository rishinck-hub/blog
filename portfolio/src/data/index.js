export const siteLinks = {
  email: 'mailto:rishinkpm@gmail.com',
  linkedin: 'https://www.linkedin.com/in/mohammed-rishin-c-k-a00525240/',
  github: 'https://github.com/rishinck-hub',
  instagram: 'https://www.instagram.com/_rishin___ck',
  whatsapp: 'https://wa.me/916238634185',
  portfolio: 'https://blog-tau-two-15.vercel.app/',
};

export const profileFacts = [
  { label: 'Latest experience', value: 'Software Developer Internship at Zil Money · May—Sep 2026' },
  { label: 'Education', value: 'B.Tech Computer Science & Engineering · CGPA 7.12 / 10' },
  { label: 'Location', value: 'Kerala, India · Riyadh, Saudi Arabia' },
  { label: 'Languages', value: 'English · Malayalam' },
];

export const services = [
  {
    name: 'Backend & API engineering',
    description: 'RESTful APIs, request validation, authentication, services, queues, jobs, and application workflows.',
    tags: ['PHP', 'Laravel', 'Django REST'],
  },
  {
    name: 'Fintech integrations',
    description: 'Third-party financial API research, testing, workflow validation, and implementation documentation.',
    tags: ['QuickBooks Online', 'Fiserv BankingHub', 'OAuth 2.0'],
  },
  {
    name: 'Full-stack development',
    description: 'Responsive applications built across frontend, backend, and relational data.',
    tags: ['React.js', 'Python', 'Axios'],
  },
  {
    name: 'Data & access control',
    description: 'Relational database work with role-based access and maintainable query patterns.',
    tags: ['MySQL', 'PostgreSQL', 'Eloquent ORM'],
  },
  {
    name: 'Cloud & delivery',
    description: 'Application deployment, file storage, containerisation, and CI/CD fundamentals.',
    tags: ['Azure', 'Docker', 'Vercel'],
  },
  {
    name: 'AI-assisted workflows',
    description: 'Technical research, coding assistance, API investigation, and documentation using modern AI tools.',
    tags: ['OpenAI API', 'Claude', 'Perplexity'],
  },
];

export const projects = [
  {
    name: 'Employee Management System',
    featured: true,
    category: 'Product engineering',
    year: '2026',
    tag: 'Laravel · PHP · MySQL · Tailwind CSS · REST APIs',
    desc: 'An employee management platform with dedicated administration and employee workflows.',
    context: 'Internship project',
    highlights: [
      'Developed modules for employee profiles, departments, designations, attendance, leave, salary, and payroll.',
      'Implemented role-based authentication, request validation, service and repository layers, search filters, activity logs, approval workflows, and CSV report exports.',
      'Built check-in, checkout, break tracking, continuous-session monitoring, configurable reminders, and automatic checkout policies.',
      'Added employee task checklists, global search, leave approval, password reset, profile management, and administrative reporting.',
      'Created and tested RESTful API endpoints using Laravel, MySQL, Eloquent ORM, and Postman.',
    ],
  },
  {
    name: 'Fintech Integrations & Internal Systems',
    featured: true,
    category: 'Backend & fintech integrations',
    year: 'May — Sep 2026',
    tag: 'Laravel · QuickBooks Online · Fiserv BankingHub · MySQL',
    desc: 'Production backend, third-party integration, and internal-system contributions completed during a four-month paid internship at Zil Money.',
    context: 'Zil Money internship contribution',
    highlights: [
      'Contributed to OnlineCheckWriter.com, a production fintech platform supporting payment, check, banking, and financial-management workflows.',
      'Updated and validated QuickBooks Online account-mapping and synchronisation workflows, including check import and export between both platforms.',
      'Investigated Fiserv BankingHub APIs, including Account Details, routing-number retrieval, party-to-account relationships, request structures, and backend integration requirements.',
      'Used Postman to test third-party financial APIs and document integration flows, constraints, results, and implementation considerations.',
      'Contributed Laravel backend and workflow enhancements to the Super Admin panel and ATS/attendance software using services, Eloquent ORM, queues/jobs, search, filtering, and CSV exports.',
    ],
  },
  {
    name: 'Trip Splitter',
    featured: true,
    category: 'Web application',
    year: '2026',
    tag: 'React · JavaScript · Vercel · PDF Export',
    desc: 'A trip-expense utility that turns shared costs into a clear, minimal settlement plan.',
    context: 'Independent project',
    image: '/projects/trip-splitter.jpg',
    imageAlt: 'Trip Splitter interface showing trip setup, balances, and who should pay whom.',
    highlights: [
      'Built a focused React interface for adding people and recording shared trip expenses.',
      'Added individual and family or group splitting modes for different travel scenarios.',
      'Generated a simple settlement plan showing who owes whom and each participant’s net balance.',
      'Added downloadable PDF receipts so the final split can be saved and shared.',
    ],
    links: [
      { label: 'Live demo', href: 'https://cash-splitter-rishinck.vercel.app/' },
      { label: 'LinkedIn post', href: 'https://lnkd.in/p/d9AcY_u3' },
    ],
  },
  {
    name: 'Clinic Management Application — Dawa Clinic',
    featured: true,
    category: 'Full-stack application',
    year: '2026',
    tag: 'React · Django REST · Tailwind CSS · PostgreSQL',
    desc: 'A deployed clinic management application for protected administrator and doctor workflows.',
    context: 'Independent project',
    image: '/projects/dawa-clinic.jpg',
    imageAlt: 'Dawa Homeo Clinic application preview with its sign-in screen and administrator dashboard.',
    highlights: [
      'Developed protected administrator and doctor experiences with JWT-based authentication.',
      'Built CRUD modules for patient records, consultations, and medicine inventory.',
      'Designed and integrated more than 10 RESTful APIs using Django REST Framework, React, and Axios.',
      'Managed relational data using PostgreSQL and deployed the frontend on Vercel and backend on Render.',
    ],
    links: [
      { label: 'Live demo', href: 'https://dawa-clinic-frontend.vercel.app/' },
      { label: 'LinkedIn post', href: 'https://lnkd.in/p/d3Gcmwnq' },
    ],
  },
  {
    name: 'Clinic Management System',
    featured: true,
    category: 'Full-stack application',
    year: '2025',
    tag: 'React · Django REST Framework · MySQL',
    desc: 'A clinic workflow system covering dashboards, billing, patient management, and access control.',
    context: 'Independent project',
    highlights: [
      'Developed more than 20 reusable React components for dashboards, billing, and patient-management workflows.',
      'Implemented protected routes and role-based authentication for three user roles with relational data managed in MySQL.',
      'Used Axios interceptors to centralise authentication headers, error handling, and API response processing.',
    ],
    links: [
      { label: 'Live demo', href: 'https://cms-fullstack-l5k7.vercel.app/' },
      { label: 'GitHub', href: 'https://github.com/rishinck-hub/CMS-fullstack' },
    ],
  },
  {
    name: 'File Management System',
    category: 'Cloud application',
    year: '2025',
    tag: 'Flask · Azure Blob Storage · Python',
    desc: 'A secure cloud-backed file upload and retrieval system.',
    context: 'Training project',
    highlights: [
      'Integrated Flask APIs with Azure Blob Storage for cloud-based file upload and retrieval.',
      'Implemented authentication and access control so only authenticated users could upload or retrieve files.',
    ],
  },
  {
    name: 'Public Bus Management System',
    category: 'Mobile application',
    year: '2025',
    tag: 'Flutter · Firebase',
    desc: 'A cross-platform mobile application for real-time bus schedule and route management.',
    context: 'Academic project',
    highlights: [
      'Developed a Flutter application for managing public-bus schedules and routes.',
      'Implemented authentication and role-based access with Firebase Firestore real-time data synchronisation.',
    ],
  },
];

export const experience = [
  {
    period: 'May 2026 — Sep 2026',
    role: 'Software Developer Intern',
    org: 'Zil Money · Kerala, India',
    desc: 'Completed a four-month paid internship contributing to OnlineCheckWriter.com, QuickBooks Online integration updates, Fiserv BankingHub API research, Super Admin and ATS/attendance enhancements, and internal employee-management workflows using Laravel, MySQL, Postman, Git, Bitbucket, Jira, and Agile practices.',
  },
  {
    period: 'May 2025 — Dec 2025',
    role: 'Python Full Stack Developer — Trainee',
    org: 'Faith Infotech Academy · Technopark, Thiruvananthapuram',
    desc: 'Built and deployed three or more full-stack applications using React.js and Django REST Framework, integrated APIs with Axios, deployed to Azure App Service, used Azure Blob Storage, and applied Docker and CI/CD fundamentals.',
  },
  {
    period: '2021 — 2025',
    role: 'B.Tech in Computer Science & Engineering',
    org: 'Malabar College of Engineering and Technology · CGPA 7.12 / 10',
    desc: 'Completed a Bachelor of Technology in Computer Science and Engineering.',
  },
  {
    period: '2024 — 2025',
    role: 'Computer Science Students Association Chairperson',
    org: 'Malabar College of Engineering and Technology',
    desc: 'Led the department student association and supported technical events, workshops, and community initiatives.',
  },
  {
    period: '2019 — 2021',
    role: 'Higher Secondary — Class XII',
    org: 'Marthoma HSS, Chungathara · 92%',
    desc: 'Completed higher secondary education.',
  },
  {
    period: '2019',
    role: 'Secondary — Class X, CBSE',
    org: 'MDI CBSE School, Karulai · 91%',
    desc: 'Completed secondary education under the CBSE curriculum.',
  },
];

export const reels = [
  { id: 1, name: 'Cinematic Short', cat: 'Cinematic', thumb: 'https://rishinck-hub.github.io/Portfolio/images/cinematic.png', dur: '1:24', instagramUrl: 'https://www.instagram.com/_rishin___ck/reel/DOfvscok9qd/' },
  { id: 2, name: 'Brand Promo', cat: 'Commercial', thumb: 'https://rishinck-hub.github.io/Portfolio/images/promo.png', dur: '0:45', instagramUrl: 'https://www.instagram.com/_rishin___ck/reel/DLUC6WDTBgP/' },
  { id: 3, name: 'Travel Vlog', cat: 'Vlog', thumb: 'https://rishinck-hub.github.io/Portfolio/images/travel.png', dur: '1:10', instagramUrl: 'https://www.instagram.com/kovilakam_boys/reel/C4u5EgePw_w/' },
  { id: 4, name: 'Event Coverage', cat: 'Event', thumb: 'https://rishinck-hub.github.io/Portfolio/images/event.png', dur: '2:00', instagramUrl: 'https://www.instagram.com/mcet_.z/reel/DIivYk7T2Ry/' },
  { id: 5, name: 'Music Edit', cat: 'Creative', thumb: 'https://rishinck-hub.github.io/Portfolio/images/music.png', dur: '1:30', instagramUrl: 'https://www.instagram.com/mcet_.z/reel/DIivYk7T2Ry/' },
  { id: 6, name: 'Instagram Reel', cat: 'Social', thumb: 'https://rishinck-hub.github.io/Portfolio/images/reel.png', dur: '0:30', instagramUrl: 'https://www.instagram.com/mcet_.z/reel/DCcAzm4uO6t/' },
];

export const marqueeItems = [
  'PHP', 'Laravel', 'React.js', 'Django REST', 'MySQL', 'PostgreSQL', 'REST APIs', 'Azure', 'Docker',
];

export const resumeUrl = '/Mohammed_Rishin_C_K_Software_Developer.pdf';
