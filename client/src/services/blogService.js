const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";


// Get all blog posts
export const getPosts = async () => {
  const response = await fetch(`${API_URL}/blog`);

  if (!response.ok) {
    throw new Error("Failed to fetch blog posts");
  }

  const result = await response.json();

  return result.data;
};


// Get single blog post
export const getPostById = async (id) => {
  const response = await fetch(`${API_URL}/blog/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch blog post");
  }

  const result = await response.json();

  return result.data;
};


// Create blog post
export const createPost = async (postData, token) => {
  const response = await fetch(`${API_URL}/blog`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(postData)
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.message || "Failed to create blog post"
    );
  }

  return result;
};


// Update blog post
export const updatePost = async (id, postData, token) => {
  const response = await fetch(`${API_URL}/blog/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(postData)
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.message || "Failed to update blog post"
    );
  }

  return result;
};


// Delete blog post
export const deletePost = async (id, token) => {
  const response = await fetch(`${API_URL}/blog/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.message || "Failed to delete blog post"
    );
  }

  return result;
};