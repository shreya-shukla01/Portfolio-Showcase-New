export const navigation = [
  ["Home", "home"],
  ["About", "about"],
  ["Experience", "experience"],
  ["Projects", "projects"],
  ["Skills", "skills"],
  ["Achievements", "achievements"],
  ["Contact", "contact"],
] as const;

export const skillGroups = [
  {
    title: "Languages & Frameworks",
    skills: [
      "JavaScript",
      "TypeScript",
      "Python",
      "React.js",
      "Node.js",
      "Express.js",
      "Tailwind CSS",
    ],
  },
  { title: "Real-time & Databases", skills: ["WebRTC", "Socket.io", "MongoDB", "MySQL"] },
  {
    title: "Cloud & DevOps",
    skills: ["Docker", "CI/CD Pipelines", "Vercel", "Netlify", "GitHub Actions"],
  },
  { title: "System Design & APIs", skills: ["REST APIs", "JWT Authentication", "OAuth"] },
  {
    title: "ML & AI",
    skills: [
      "TensorFlow",
      "Machine Learning Pipelines",
      "LLMs",
      "NumPy",
      "Pandas",
      "AI API Integration",
    ],
  },
] as const;

export const experiences = [
  {
    role: "Application Developer Intern",
    company: "EY (Ernst & Young)",
    period: "June 2026 — August 2026",
    location: "Noida, India",
    points: [
      "Built React web applications in close collaboration with product and design teams, aligning implementation with business needs.",
      "Rebuilt REST APIs that were bottlenecking external-service data exchange, reducing response times by approximately 30%.",
      "Improved frontend performance through code splitting, lazy loading, and caching, increasing the Lighthouse score by approximately 35%.",
    ],
  },
  {
    role: "Web Development Intern",
    company: "Dataoids Analytics LLP",
    period: "May 2026 — June 2026",
    location: "New Delhi, India",
    points: [
      "Built web application frontends with HTML, CSS, and JavaScript and connected them to backend REST APIs.",
      "Used Git for daily version control and team collaboration.",
      "Integrated third-party APIs to automate previously manual processes.",
    ],
  },
  {
    role: "Full Stack Web Development Intern",
    company: "Uptoskills Private Ltd.",
    period: "January 2026 — April 2026",
    location: "New Delhi, India",
    points: [
      "Built responsive React frontends using an atomic design system and mobile-first development.",
      "Migrated a legacy frontend to React, improving page performance by approximately 35%.",
    ],
  },
] as const;

export type Project = {
  id: string;
  index: string;
  name: string;
  category: string;
  tech: readonly string[];
  description: string;
  features: readonly string[];
  visual: "rail" | "audio" | "ev";
  liveUrl: string;
};

export const projects: readonly Project[] = [
  {
    id: "gati",
    index: "01",
    name: "GATI",
    category: "AI Railway Optimization System",
    tech: ["HTML", "CSS", "JavaScript"],
    visual: "rail",
    liveUrl: "https://gati-sih-2025.vercel.app/",
    description:
      "An AI-based railway scheduling and management project using graph algorithms and a Digital Twin to optimize train scheduling and route planning.",
    features: [
      "Interactive JavaScript dashboard",
      "Digital Twin visualization",
      "AI-assisted scheduling",
    ],
  },
  {
    id: "music-galaxy",
    index: "02",
    name: "Music Galaxy Engine",
    category: "Music Streaming Platform",
    tech: ["React.js", "Node.js", "Express.js", "MongoDB", "JWT", "WebSocket"],
    visual: "audio",
    liveUrl: "https://music-galaxy-engine.netlify.app/",
    description:
      "A music streaming platform with JWT authentication and WebSocket-powered real-time communication.",
    features: [
      "Real-time communication",
      "JWT authentication",
      "Synced group playback for live listening",
    ],
  },
  {
    id: "evolve",
    index: "03",
    name: "EVolve",
    category: "AI EV Charging Platform",
    tech: ["React.js", "Node.js", "Express.js", "MongoDB"],
    visual: "ev",
    liveUrl: "https://v0-ev-charging-mvp.vercel.app/",
    description:
      "An end-to-end MVP for EV charging, built with React, Node.js, Express.js, and MongoDB.",
    features: [
      "Nearby charging station discovery",
      "Slot booking",
      "User authentication",
      "RESTful APIs for external data",
    ],
  },
] as const;
