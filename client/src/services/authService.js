const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// Login
export const login = async (email, password) => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email,
      password
    })
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.message || "Login failed"
    );
  }

  // Store JWT token
  if (result.token) {
    localStorage.setItem("token", result.token);
  }

  // Store user information
  if (result.user) {
    localStorage.setItem(
      "user",
      JSON.stringify(result.user)
    );
  }

  return result;
};


// Logout
export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};


// Get stored token
export const getToken = () => {
  return localStorage.getItem("token");
};


// Get logged-in user
export const getCurrentUser = () => {
  const user = localStorage.getItem("user");

  if (!user) {
    return null;
  }

  try {
    return JSON.parse(user);
  } catch (error) {
    console.error("User data parsing error:", error);
    return null;
  }
};


// Check authentication
export const isAuthenticated = () => {
  return Boolean(getToken());
};


// Get authorization headers
export const getAuthHeaders = () => {
  const token = getToken();

  return {
    "Content-Type": "application/json",
    ...(token && {
      Authorization: `Bearer ${token}`
    })
  };
};