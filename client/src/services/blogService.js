// =====================================================
// API URL
// =====================================================

const API_URL =
  import.meta.env.VITE_API_URL ||
  "https://prasoon-portfolio-qxbv.onrender.com/api";


// =====================================================
// GET ALL BLOG POSTS
// =====================================================

export const getPosts = async () => {
  const response = await fetch(`${API_URL}/blogs`);

  if (!response.ok) {
    throw new Error("Failed to fetch blog posts");
  }

  const result = await response.json();

  return result.data;
};


// =====================================================
// GET SINGLE BLOG POST
// =====================================================

export const getPostById = async (id) => {
  const response = await fetch(`${API_URL}/blogs/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch blog post");
  }

  const result = await response.json();

  return result.data;
};


// =====================================================
// CREATE BLOG POST
// =====================================================

export const createPost = async (postData, token) => {
  const response = await fetch(`${API_URL}/blogs`, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
      ...(token && {
        Authorization: `Bearer ${token}`,
      }),
    },

    body: JSON.stringify(postData),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.message || "Failed to create blog post"
    );
  }

  return result;
};


// =====================================================
// UPDATE BLOG POST
// =====================================================

export const updatePost = async (
  id,
  postData,
  token
) => {
  const response = await fetch(`${API_URL}/blogs/${id}`, {
    method: "PUT",

    headers: {
      "Content-Type": "application/json",
      ...(token && {
        Authorization: `Bearer ${token}`,
      }),
    },

    body: JSON.stringify(postData),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.message || "Failed to update blog post"
    );
  }

  return result;
};


// =====================================================
// DELETE BLOG POST
// =====================================================

export const deletePost = async (id, token) => {
  const response = await fetch(`${API_URL}/blogs/${id}`, {
    method: "DELETE",

    headers: {
      ...(token && {
        Authorization: `Bearer ${token}`,
      }),
    },
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.message || "Failed to delete blog post"
    );
  }

  return result;
};