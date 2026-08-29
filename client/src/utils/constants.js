// API
const API_URL =
  import.meta.env.VITE_API_URL ||
  "https://prasoon-portfolio-qxbv.onrender.com/api";

// Portfolio sections
export const NAVIGATION_ITEMS = [
  { label: "Home", id: "home" },
  { label: "About", id: "about" },
  { label: "Education", id: "education" },
  { label: "Experience", id: "experience" },
  { label: "Skills", id: "skills" },
  { label: "Projects", id: "projects" },
  { label: "Certifications", id: "certifications" },
  { label: "Coding", id: "coding-stats" },
  { label: "Blog", id: "blog" },
  { label: "Contact", id: "contact" },
  { label: "Resume", id: "resume" }
];

// Storage keys
export const STORAGE_KEYS = {
  TOKEN: "token",
  USER: "user"
};

// User roles
export const ROLES = {
  ADMIN: "admin",
  USER: "user"
};

// Default values
export const DEFAULT_READ_TIME = "5 min read";

export const DEFAULT_PAGE_SIZE = 10;