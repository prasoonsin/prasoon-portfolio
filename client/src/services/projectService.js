const API_URL =
  import.meta.env.VITE_API_URL ||
  "https://prasoon-portfolio-qxbv.onrender.com/api";


// Get all projects
export const getProjects = async () => {
  const response = await fetch(`${API_URL}/projects`);

  if (!response.ok) {
    throw new Error("Failed to fetch projects");
  }

  const result = await response.json();

  return result.data;
};


// Get project by ID
export const getProjectById = async (id) => {
  const response = await fetch(
    `${API_URL}/projects/${id}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch project");
  }

  const result = await response.json();

  return result.data;
};


// Create project
export const createProject = async (projectData, token) => {
  const response = await fetch(`${API_URL}/projects`, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
      ...(token && {
        Authorization: `Bearer ${token}`
      })
    },

    body: JSON.stringify(projectData)
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.message || "Failed to create project"
    );
  }

  return result;
};