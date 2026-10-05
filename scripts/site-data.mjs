// Single source of truth for the generated pages, structured data and sitemap.
//
// Every fact here comes from the existing portfolio (index.html), the resume
// PDF (Sep 2026), or the dependency lists of the linked GitHub repositories.
// Do not add claims that are not backed by one of those sources.

export const SITE = "https://utsavkalathiya.vercel.app";
export const PERSON_ID = `${SITE}/#person`;
export const WEBSITE_ID = `${SITE}/#website`;

export const person = {
  name: "Utsav Kalathiya",
  jobTitle: "Full Stack Developer",
  tagline:
    "Full Stack Developer specializing in React.js, Node.js, Express.js, MongoDB and MERN stack development.",
  locality: "Surat",
  region: "Gujarat",
  country: "India",
  countryCode: "IN",
  location: "Surat, Gujarat, India",
  email: "utsavkalathiya0001@gmail.com",
  github: "https://github.com/utsavkalathiya1602",
  linkedin: "https://www.linkedin.com/in/utsavkalathiya1602/",
  // sidebar photo (small) and the larger one used as the Person image for search engines
  avatar: "/assets/images/utsav-kalathiya-full-stack-developer.webp",
  image: "/assets/images/utsav-kalathiya-full-stack-developer-720.webp",
  imageAlt: "Utsav Kalathiya - Full Stack Developer",
  ogImage: "/assets/images/og-image.png",
  // shown as core stack everywhere; all appear in the existing portfolio or repos
  coreStack: ["React.js", "Node.js", "Express.js", "MongoDB", "PostgreSQL", "JavaScript", "TypeScript"],
  knowsAbout: [
    "React.js",
    "Node.js",
    "Express.js",
    "MongoDB",
    "PostgreSQL",
    "MySQL",
    "JavaScript",
    "TypeScript",
    "Angular",
    "React Native",
    "RESTful APIs",
    "Tailwind CSS",
    "MERN Stack",
    "Full Stack Development",
    "Web Development",
  ],
  alumniOf: "Sutex Bank College of Computer Application",
  // current employer (resume: May 2026 – Present)
  worksFor: "Elpiora",
  // spoken languages from the resume, as BCP 47 codes for schema.org knowsLanguage
  knowsLanguage: ["en", "hi", "gu"],
};

// Professional summary from the resume PDF.
export const resumeSummary =
  "Full Stack Developer with hands-on experience building, scaling, and modernizing web and mobile applications across MERN and MEAN stacks in remote, product-based, and client-facing environments. Proficient in upgrading legacy enterprise architectures (Angular v11 to v19), building cross-platform React Native applications, and developing secure RESTful APIs. Adept in MongoDB, MySQL, and PostgreSQL database design with experience integrating AI components like TensorFlow.js.";

export const spokenLanguages = [
  ["English", "Working proficiency"],
  ["Hindi", "Full professional"],
  ["Gujarati", "Full professional"],
];

// Existing "About me" copy from index.html.
export const aboutParagraphs = [
  "I'm a Full Stack Developer with hands-on experience across the MERN and MEAN stacks — including upgrading a legacy Angular application from v11 to v19, building and maintaining React.js and React Native apps, and integrating RESTful APIs end-to-end. I'm comfortable owning frontend features from UI redesign to bug fixing, across both web and mobile platforms.",
  "I have a strong foundation in database design across MongoDB, MySQL, and PostgreSQL, with a track record of delivering clean, maintainable code on real projects at Elpiora, WRT InfoTech and NIQOX. I'm a quick learner who enjoys collaborative, fast-paced development environments.",
];

export const experience = [
  {
    role: "Full Stack Developer (Remote)",
    company: "Elpiora",
    companyNote: "Product-based startup",
    dates: "May 2026 – Present",
    current: true,
    items: [
      { title: null, text: "Architect and develop core end-to-end full-stack features using React.js, Node.js, Express.js, and MongoDB in a remote Agile environment." },
      { title: null, text: "Design scalable RESTful APIs and optimize MongoDB query performance to improve server response times across high-traffic product features." },
      { title: null, text: "Modernize UI/UX components using Tailwind CSS and React.js to improve front-end rendering efficiency and responsiveness across platforms." },
      { title: null, text: "Collaborate asynchronously with cross-functional remote teams, including product managers and designers." },
    ],
  },
  {
    role: "Full Stack Developer",
    company: "WRT InfoTech",
    companyNote: "Surat, Gujarat",
    dates: "Nov 2025 – Apr 2026",
    items: [
      {
        title: "Project Ciphus (Angular)",
        text: "Modernized a legacy Angular application by upgrading it from version 11 to 19 and redesigning front-end user interfaces.",
      },
      {
        title: "Project FamePilot (React & React Native)",
        text: "Managed end-to-end web (React.js) and cross-platform mobile app (React Native) development, upgrading both codebases to the latest major versions.",
      },
      {
        title: null,
        text: "Integrated backend RESTful APIs, resolved critical front-end and back-end production bugs, and ensured consistent UI performance across mobile and web platforms.",
      },
    ],
  },
  {
    role: "Full Stack Developer Intern",
    company: "NIQOX",
    companyNote: "Surat, Gujarat",
    dates: "Jul 2025 – Sep 2025",
    items: [
      { title: null, text: "Built a full-featured Job Portal web application using the MERN stack (MongoDB, Express.js, React.js, Node.js) in a production-style workflow." },
      { title: null, text: "Implemented user authentication, secure session handling, and full CRUD API functionality for candidate applications and job listings." },
    ],
    relatedProject: "job-portal",
  },
];

export const education = [
  {
    title: "Master of Computer Applications (MCA) – Online",
    school: "Manipal University Jaipur",
    dates: "2025 – Present",
    text: "Pursuing MCA online at Manipal University Jaipur to deepen expertise in advanced software development, algorithms, and computer science fundamentals while working full-time.",
  },
  {
    title: "Bachelor of Computer Applications (BCA)",
    school: "Sutex Bank College of Computer Application",
    dates: "Aug 2022 – Mar 2025",
    text: "GPA: 8.5. Focused on web development, database systems, and programming fundamentals through academic projects and real-world technology applications.",
  },
  {
    title: "Higher Secondary Certificate (HSC) – Commerce",
    school: "Nalanda Vidhyalaya, Surat",
    dates: "Mar 2021 – Mar 2022",
    text: "91%. Completed HSC in Commerce with distinction.",
  },
];

// Skill groups. "evidence" explains where each group is demonstrated.
export const skillGroups = [
  {
    name: "Frontend",
    skills: ["React.js", "Angular (v11–v19)", "HTML5", "CSS3", "Tailwind CSS", "Bootstrap", "React Router"],
    note: "React.js across most projects; Angular through the v11 → v19 upgrade of Project Ciphus at WRT InfoTech.",
  },
  {
    name: "Backend",
    skills: ["Node.js", "Express.js", "RESTful APIs", "JWT authentication", "OAuth 2.0", "Role-based access control"],
    note: "Every full-stack project here pairs a React frontend with a Node.js and Express.js API; Google OAuth 2.0 sign-in in the Real Estate Marketplace.",
  },
  {
    name: "Database",
    skills: ["MongoDB", "Mongoose", "MySQL", "PostgreSQL", "Prisma", "Schema design", "Query optimization"],
    note: "MongoDB with Mongoose in the MERN projects, including MongoDB query optimization at Elpiora; Prisma in the Splitwise app backend.",
  },
  {
    name: "Mobile",
    skills: ["React Native", "Expo"],
    note: "React Native on Project FamePilot at WRT InfoTech and in the Splitwise app.",
  },
  {
    name: "Languages",
    skills: ["JavaScript (ES6+)", "TypeScript"],
    note: "TypeScript in Angular work and in the Splitwise React Native app.",
  },
  {
    name: "Libraries & services used in projects",
    skills: ["Cloudinary", "Stripe", "Google OAuth", "Socket.IO", "Leaflet", "TensorFlow.js", "Nodemailer", "Multer"],
    note: "See each project page for where these are used.",
  },
  {
    name: "Tools, workflow & deployment",
    skills: ["Git", "GitHub", "Postman", "Agile / Scrum", "Vercel", "Netlify", "Render"],
    note: "Remote Agile work at Elpiora; live demos are deployed on Vercel, Netlify and Render.",
  },
];

// Self-assessed levels shown on the homepage "My skills" bars (existing content).
export const skillLevels = [
  ["Frontend Development", 80],
  ["Backend Development", 55],
  ["Angular", 65],
  ["Database Design (MongoDB, MySQL, PostgreSQL)", 70],
  ["Mobile Development (React Native)", 60],
];

// Projects. `page: true` gets its own /projects/<slug> page; the rest are
// listed on /projects only, because there is not enough documented
// information to justify a separate page.
export const projects = [
  {
    slug: "house-rent-sell",
    page: true,
    name: "Real Estate Marketplace (House Rent & Sell)",
    category: "Full-stack web application",
    image: "/assets/images/projects/house-rent-sell.webp",
    imageAlt: "Homepage of the Real Estate Marketplace with property search",
    summary:
      "A responsive full-stack property platform for renting and selling houses, with location-based search and AI image validation.",
    features: [
      "Login with JWT authentication and Google OAuth 2.0",
      "Leaflet-based map location search for properties",
      "AI image validation with TensorFlow.js that checks property images automatically during upload",
      "MongoDB schemas designed for efficient filtering and data storage",
      "Responsive UI built with React.js and Tailwind CSS",
    ],
    frontend: ["React.js", "React Router", "Tailwind CSS", "Leaflet / React Leaflet", "Google Maps API", "TensorFlow.js (MobileNet)", "Socket.IO client"],
    backend: ["Node.js", "Express.js", "MongoDB / Mongoose", "JWT", "bcrypt.js", "Google Auth Library", "Cloudinary", "Nodemailer", "Socket.IO"],
    languages: ["JavaScript"],
    repos: [{ label: "Source code", url: "https://github.com/Kalathiyautsav0001/House-Renting" }],
    live: "https://house-renting-2.onrender.com/",
  },
  {
    slug: "kisan-bazaar",
    page: true,
    name: "Kisan Bazaar – Farmer E-Commerce Platform",
    category: "Full-stack web application",
    image: null,
    summary:
      "An e-commerce platform for farmers with multi-role authentication, RESTful APIs for products, orders and users, and an admin dashboard for inventory management.",
    features: [
      "Multi-role authentication with JWT and Bcrypt for consumers, sellers and administrators",
      "Full CRUD RESTful APIs for products, orders and users",
      "Admin inventory dashboard for real-time stock and order management",
      "Responsive UI built with Tailwind CSS",
    ],
    frontend: ["React.js", "Tailwind CSS"],
    backend: ["Node.js", "Express.js", "MongoDB", "JWT", "Bcrypt"],
    languages: ["JavaScript"],
    repos: [],
    live: null,
  },
  {
    slug: "job-portal",
    page: true,
    name: "Job Portal Application",
    category: "Full-stack web application",
    image: "/assets/images/projects/job-portal.webp",
    imageAlt: "Homepage of the Job Portal application",
    summary:
      "A MERN stack job portal with separate workflows for job seekers and companies, built during my Full Stack Developer internship at NIQOX.",
    features: [
      "Role-based authentication (RBAC) with separate workflows for job seekers and companies",
      "RESTful APIs for job postings, applications and user profile management",
      "User authentication with secure session handling",
      "Full CRUD APIs for candidate applications and job listings with Node.js, Express.js and MongoDB",
      "Responsive frontend built with React.js and Tailwind CSS",
    ],
    frontend: ["React.js", "React Router", "Tailwind CSS", "Axios", "Framer Motion", "Quill editor", "Swiper"],
    backend: ["Node.js", "Express.js", "MongoDB / Mongoose", "JWT", "bcrypt", "Multer", "Cloudinary"],
    languages: ["JavaScript"],
    repos: [
      { label: "Frontend source", url: "https://github.com/utsavkalathiya1602/job-hunting-frontend-" },
      { label: "Backend source", url: "https://github.com/utsavkalathiya1602/job-hunting-backend-" },
    ],
    live: "https://job-hunting-frontend.vercel.app/",
  },
  {
    slug: "e-commerce-full-stack",
    page: true,
    name: "E-Commerce Full Stack Website",
    category: "Full-stack web application",
    image: "/assets/images/projects/e-commerce-full-stack.webp",
    imageAlt: "Homepage of the full stack e-commerce website",
    summary:
      "A full-stack e-commerce website with a React frontend and a Node.js, Express.js and MongoDB backend.",
    features: null,
    repoNote:
      "The repository includes Stripe (payments), Google OAuth (sign-in), Nodemailer (email) and Multer (file uploads) among its dependencies.",
    frontend: ["React.js", "React Router", "Zustand", "Framer Motion", "Stripe.js", "Google OAuth"],
    backend: ["Node.js", "Express.js", "MongoDB / Mongoose", "JWT", "bcrypt.js", "Stripe", "Multer", "Nodemailer"],
    languages: ["JavaScript"],
    repos: [{ label: "Source code", url: "https://github.com/Kalathiyautsav0001/E-Com--Full-stack-website" }],
    live: null,
  },
  {
    slug: "splitwise-react-native",
    page: true,
    name: "Splitwise – React Native App",
    category: "Mobile app",
    image: "/assets/images/projects/splitwise-react-native.webp",
    imageAlt: "Splitwise app promotional image showing group expense settings",
    heroImage: false,
    summary:
      "A bill-splitting mobile app, modelled on Splitwise, built with React Native, Expo and TypeScript, with a Node.js and Express.js backend.",
    features: null,
    repoNote:
      "The backend uses Prisma for data access and Zod for validation, and includes Stripe, Razorpay, Socket.IO and Cloudinary among its dependencies.",
    frontend: ["React Native", "Expo", "TypeScript", "React Navigation", "TanStack Query", "Zustand", "Tamagui"],
    backend: ["Node.js", "Express.js", "Prisma", "Zod", "JWT", "bcrypt", "Cloudinary", "Socket.IO"],
    languages: ["TypeScript"],
    repos: [{ label: "Source code", url: "https://github.com/Kalathiyautsav0001/splitswise--reactnative-app" }],
    live: null,
  },
  {
    slug: "gym-website",
    page: true,
    name: "GYM Website",
    category: "Full-stack web application",
    image: "/assets/images/projects/gym-website.webp",
    imageAlt: "Homepage of the GYM website",
    summary: "A gym website built with React.js and Bootstrap, backed by a Node.js, Express.js and MongoDB API.",
    features: null,
    frontend: ["React.js", "React Router", "Bootstrap", "Axios"],
    backend: ["Node.js", "Express.js", "MongoDB / Mongoose", "JWT", "bcrypt.js"],
    languages: ["JavaScript"],
    repos: [{ label: "Source code", url: "https://github.com/utsavkalathiya1602/gym" }],
    live: "https://gym-phi-mauve-96.vercel.app/",
  },
  {
    slug: "event-planner",
    page: true,
    name: "Event Planner Website",
    category: "Full-stack web application",
    image: "/assets/images/projects/event-planner.webp",
    imageAlt: "Homepage of the Event Planner website",
    summary: "An event planner website with a React.js frontend and a separate Node.js, Express.js and MongoDB API.",
    features: null,
    frontend: ["React.js", "React Router", "Axios"],
    backend: ["Node.js", "Express.js", "MongoDB / Mongoose", "JWT", "bcrypt.js", "Multer"],
    languages: ["JavaScript"],
    repos: [
      { label: "Frontend source", url: "https://github.com/Kalathiyautsav0001/DevamEvent" },
      { label: "Backend source", url: "https://github.com/Kalathiyautsav0001/DevamEvent-Backend" },
    ],
    live: "https://devamevent.onrender.com/",
  },
  {
    slug: "aeromet-weather-app",
    page: false,
    name: "Aeromet – Weather App",
    category: "Web application",
    image: "/assets/images/projects/aeromet-weather-app.webp",
    imageAlt: "Aeromet weather app interface",
    summary: "A weather web app.",
    repos: [],
    live: "https://aeromet-mauve.vercel.app/normal",
  },
  {
    slug: "todo-app",
    page: false,
    name: "To-Do Website",
    category: "Web application",
    image: "/assets/images/projects/todo-app.webp",
    imageAlt: "To-Do website interface",
    summary: "A to-do list web app.",
    repos: [],
    live: "https://mern-todofy.netlify.app/",
  },
  {
    slug: "e-commerce-ui-concept-1",
    page: false,
    name: "E-Commerce UI — Concept 1",
    category: "Web design",
    image: "/assets/images/projects/e-commerce-ui-concept-1.webp",
    imageAlt: "E-commerce UI concept 1 homepage design",
    summary: "A front-end UI design concept for an online store.",
    repos: [{ label: "Source code", url: "https://github.com/utsavkalathiya1602/E-Commerce-2Ui" }],
    live: "https://e-commerce-2-ui.vercel.app/",
  },
  {
    slug: "e-commerce-ui-concept-2",
    page: false,
    name: "E-Commerce UI — Concept 2",
    category: "Web design",
    image: "/assets/images/projects/e-commerce-ui-concept-2.webp",
    imageAlt: "E-commerce UI concept 2 homepage design",
    summary: "A second front-end UI design concept for an online store.",
    repos: [{ label: "Source code", url: "https://github.com/utsavkalathiya1602/E-commerce-1Ui" }],
    live: "https://e-commerce-1-ui.vercel.app/",
  },
];

// The three projects featured on the resume.
export const keyProjectSlugs = ["house-rent-sell", "kisan-bazaar", "job-portal"];
