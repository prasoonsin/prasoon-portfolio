const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000/api";


// =====================================================
// HELPER
// =====================================================

const request = async (url, options = {}) => {
  const token = localStorage.getItem("token");

  const response = await fetch(url, {
    ...options,

    headers: {
      "Content-Type": "application/json",

      ...(token && {
        Authorization: `Bearer ${token}`,
      }),

      ...options.headers,
    },
  });

  let result = {};

  try {
    result = await response.json();
  } catch {
    result = {};
  }

  if (!response.ok) {
    throw new Error(
      result.message ||
        `Server Error: ${response.status}`
    );
  }

  return result.data;
};


// =====================================================
// EDUCATION
// =====================================================

// Get all education records
export const getEducation = async () => {
  return request(`${API_URL}/education`);
};


// Get one education record
export const getEducationById = async (id) => {
  return request(`${API_URL}/education/${id}`);
};


// Create education record
export const createEducation = async (educationData) => {
  return request(`${API_URL}/education`, {
    method: "POST",
    body: JSON.stringify(educationData),
  });
};


// Update education record
export const updateEducation = async (
  id,
  educationData
) => {
  return request(`${API_URL}/education/${id}`, {
    method: "PUT",
    body: JSON.stringify(educationData),
  });
};


// Delete education record
export const deleteEducation = async (id) => {
  return request(`${API_URL}/education/${id}`, {
    method: "DELETE",
  });
};


// =====================================================
// EXPERIENCE
// =====================================================

// Get all experience records
export const getExperience = async () => {
  return request(`${API_URL}/experience`);
};


// Get one experience record
export const getExperienceById = async (id) => {
  return request(`${API_URL}/experience/${id}`);
};


// Create experience record
export const createExperience = async (experienceData) => {
  return request(`${API_URL}/experience`, {
    method: "POST",
    body: JSON.stringify(experienceData),
  });
};


// Update experience record
export const updateExperience = async (
  id,
  experienceData
) => {
  return request(`${API_URL}/experience/${id}`, {
    method: "PUT",
    body: JSON.stringify(experienceData),
  });
};


// Delete experience record
export const deleteExperience = async (id) => {
  return request(`${API_URL}/experience/${id}`, {
    method: "DELETE",
  });
};


// =====================================================
// SKILLS
// =====================================================

// Get all skills
export const getSkills = async () => {
  return request(`${API_URL}/skills`);
};


// Get one skill
export const getSkillById = async (id) => {
  return request(`${API_URL}/skills/${id}`);
};


// Create skill
export const createSkill = async (skillData) => {
  return request(`${API_URL}/skills`, {
    method: "POST",
    body: JSON.stringify(skillData),
  });
};


// Update skill
export const updateSkill = async (
  id,
  skillData
) => {
  return request(`${API_URL}/skills/${id}`, {
    method: "PUT",
    body: JSON.stringify(skillData),
  });
};


// Delete skill
export const deleteSkill = async (id) => {
  return request(`${API_URL}/skills/${id}`, {
    method: "DELETE",
  });
};


// =====================================================
// CERTIFICATIONS
// =====================================================

// Get all certifications
export const getCertifications = async () => {
  return request(`${API_URL}/certifications`);
};


// Get one certification
export const getCertificationById = async (id) => {
  return request(`${API_URL}/certifications/${id}`);
};


// Create certification
export const createCertification = async (
  certificationData
) => {
  return request(`${API_URL}/certifications`, {
    method: "POST",
    body: JSON.stringify(certificationData),
  });
};


// Update certification
export const updateCertification = async (
  id,
  certificationData
) => {
  return request(`${API_URL}/certifications/${id}`, {
    method: "PUT",
    body: JSON.stringify(certificationData),
  });
};


// Delete certification
export const deleteCertification = async (id) => {
  return request(`${API_URL}/certifications/${id}`, {
    method: "DELETE",
  });
};


// =====================================================
// CODING STATS
// =====================================================

// Get coding stats
export const getCodingStats = async () => {
  return request(`${API_URL}/coding-stats`);
};


// Get coding stats by ID
export const getCodingStatsById = async (id) => {
  return request(`${API_URL}/coding-stats/${id}`);
};


// Create coding stats
export const createCodingStats = async (
  codingStatsData
) => {
  return request(`${API_URL}/coding-stats`, {
    method: "POST",
    body: JSON.stringify(codingStatsData),
  });
};


// Update coding stats
export const updateCodingStats = async (
  id,
  codingStatsData
) => {
  return request(`${API_URL}/coding-stats/${id}`, {
    method: "PUT",
    body: JSON.stringify(codingStatsData),
  });
};


// Delete coding stats
export const deleteCodingStats = async (id) => {
  return request(`${API_URL}/coding-stats/${id}`, {
    method: "DELETE",
  });
};


// =====================================================
// PROJECTS
// =====================================================

// Get all projects
export const getProjects = async () => {
  return request(`${API_URL}/projects`);
};


// Get one project
export const getProjectById = async (id) => {
  return request(`${API_URL}/projects/${id}`);
};


// Create project
export const createProject = async (projectData) => {
  return request(`${API_URL}/projects`, {
    method: "POST",
    body: JSON.stringify(projectData),
  });
};


// Update project
export const updateProject = async (
  id,
  projectData
) => {
  return request(`${API_URL}/projects/${id}`, {
    method: "PUT",
    body: JSON.stringify(projectData),
  });
};


// Delete project
export const deleteProject = async (id) => {
  return request(`${API_URL}/projects/${id}`, {
    method: "DELETE",
  });
};


// =====================================================
// CONTACTS / MESSAGES
// =====================================================

// Get all contacts
export const getContacts = async () => {
  return request(`${API_URL}/contacts`);
};


// Get one contact
export const getContactById = async (id) => {
  return request(`${API_URL}/contacts/${id}`);
};


// Create contact
export const createContact = async (contactData) => {
  return request(`${API_URL}/contacts`, {
    method: "POST",
    body: JSON.stringify(contactData),
  });
};


// Update contact
export const updateContact = async (
  id,
  contactData
) => {
  return request(`${API_URL}/contacts/${id}`, {
    method: "PUT",
    body: JSON.stringify(contactData),
  });
};


// Delete contact
export const deleteContact = async (id) => {
  return request(`${API_URL}/contacts/${id}`, {
    method: "DELETE",
  });
};


// =====================================================
// MESSAGES ALIASES
// =====================================================

export const getMessages = async () => {
  return getContacts();
};


export const getMessageById = async (id) => {
  return getContactById(id);
};


// =====================================================
// TAGS
// =====================================================

// Get all tags
export const getTags = async () => {
  return request(`${API_URL}/tags`);
};


// Get one tag
export const getTagById = async (id) => {
  return request(`${API_URL}/tags/${id}`);
};


// Create tag
export const createTag = async (tagData) => {
  return request(`${API_URL}/tags`, {
    method: "POST",
    body: JSON.stringify(tagData),
  });
};


// Update tag
export const updateTag = async (
  id,
  tagData
) => {
  return request(`${API_URL}/tags/${id}`, {
    method: "PUT",
    body: JSON.stringify(tagData),
  });
};


// Delete tag
export const deleteTag = async (id) => {
  return request(`${API_URL}/tags/${id}`, {
    method: "DELETE",
  });
};


// =====================================================
// USERS
// =====================================================

// Get all users
export const getUsers = async () => {
  return request(`${API_URL}/users`);
};


// Get one user
export const getUserById = async (id) => {
  return request(`${API_URL}/users/${id}`);
};


// Get user by email
export const getUserByEmail = async (email) => {
  return request(
    `${API_URL}/users/email/${encodeURIComponent(email)}`
  );
};


// =====================================================
// BLOG
// =====================================================

// Get all blog posts
export const getBlogs = async () => {
  return request(`${API_URL}/blogs`);
};


// Get one blog post by ID
export const getBlogById = async (id) => {
  return request(`${API_URL}/blogs/${id}`);
};


// Get one blog post by slug
export const getBlogBySlug = async (slug) => {
  return request(
    `${API_URL}/blogs/slug/${encodeURIComponent(slug)}`
  );
};


// Create blog post
export const createBlog = async (blogData) => {
  return request(`${API_URL}/blogs`, {
    method: "POST",
    body: JSON.stringify(blogData),
  });
};


// Update blog post
export const updateBlog = async (
  id,
  blogData
) => {
  return request(`${API_URL}/blogs/${id}`, {
    method: "PUT",
    body: JSON.stringify(blogData),
  });
};


// Delete blog post
export const deleteBlog = async (id) => {
  return request(`${API_URL}/blogs/${id}`, {
    method: "DELETE",
  });
};


// =====================================================
// BLOG ALIASES
// =====================================================

export const getPosts = async () => {
  return getBlogs();
};


export const getPostById = async (id) => {
  return getBlogById(id);
};


export const createPost = async (postData) => {
  return createBlog(postData);
};


export const updatePost = async (
  id,
  postData
) => {
  return updateBlog(id, postData);
};


export const deletePost = async (id) => {
  return deleteBlog(id);
};


// =====================================================
// BLOG COMMENTS
// =====================================================

// Get all comments
export const getComments = async () => {
  return request(`${API_URL}/comments`);
};


// Get comments for a specific blog
export const getCommentsByBlogId = async (
  blogId
) => {
  return request(
    `${API_URL}/comments/blog/${blogId}`
  );
};


// Get one comment
export const getCommentById = async (id) => {
  return request(`${API_URL}/comments/${id}`);
};


// Create comment
export const createComment = async (
  commentData
) => {
  return request(`${API_URL}/comments`, {
    method: "POST",
    body: JSON.stringify(commentData),
  });
};


// Update comment
export const updateComment = async (
  id,
  commentData
) => {
  return request(`${API_URL}/comments/${id}`, {
    method: "PUT",
    body: JSON.stringify(commentData),
  });
};


// Delete comment
export const deleteComment = async (id) => {
  return request(`${API_URL}/comments/${id}`, {
    method: "DELETE",
  });
};


// =====================================================
// AUTH
// =====================================================

export const login = async (credentials) => {
  return request(`${API_URL}/auth/login`, {
    method: "POST",
    body: JSON.stringify(credentials),
  });
};


export const register = async (userData) => {
  return request(`${API_URL}/auth/register`, {
    method: "POST",
    body: JSON.stringify(userData),
  });
};


// =====================================================
// API URL
// =====================================================

export { API_URL };