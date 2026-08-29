const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";


// Send contact message
export const sendContactMessage = async (contactData) => {
  const response = await fetch(`${API_URL}/contacts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(contactData)
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.message || "Failed to send message"
    );
  }

  return result;
};


// Get all contact messages
export const getContacts = async (token) => {
  const response = await fetch(`${API_URL}/contacts`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...(token && {
        Authorization: `Bearer ${token}`
      })
    }
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.message || "Failed to fetch messages"
    );
  }

  return result.data;
};


// Get contact message by ID
export const getContactById = async (id, token) => {
  const response = await fetch(`${API_URL}/contacts/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...(token && {
        Authorization: `Bearer ${token}`
      })
    }
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.message || "Failed to fetch message"
    );
  }

  return result.data;
};