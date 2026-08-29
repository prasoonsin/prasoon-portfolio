// Check required value
export const required = (value) => {
  return (
    value !== undefined &&
    value !== null &&
    String(value).trim() !== ""
  );
};


// Validate email
export const isValidEmail = (email) => {
  if (!email) {
    return false;
  }

  const emailRegex =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return emailRegex.test(email);
};


// Validate password
export const isValidPassword = (password) => {
  return (
    typeof password === "string" &&
    password.length >= 6
  );
};


// Validate URL
export const isValidUrl = (url) => {
  if (!url) {
    return false;
  }

  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};


// Validate name
export const isValidName = (name) => {
  if (!name) {
    return false;
  }

  return name.trim().length >= 2;
};


// Validate contact form
export const validateContactForm = (data) => {
  const errors = {};

  if (!required(data.name)) {
    errors.name = "Name is required.";
  } else if (!isValidName(data.name)) {
    errors.name = "Name must contain at least 2 characters.";
  }

  if (!required(data.email)) {
    errors.email = "Email is required.";
  } else if (!isValidEmail(data.email)) {
    errors.email = "Please enter a valid email address.";
  }

  if (!required(data.message)) {
    errors.message = "Message is required.";
  } else if (data.message.trim().length < 10) {
    errors.message =
      "Message must contain at least 10 characters.";
  }

  return errors;
};


// Validate login form
export const validateLoginForm = (data) => {
  const errors = {};

  if (!required(data.email)) {
    errors.email = "Email is required.";
  } else if (!isValidEmail(data.email)) {
    errors.email = "Please enter a valid email.";
  }

  if (!required(data.password)) {
    errors.password = "Password is required.";
  }

  return errors;
};


// Check whether validation returned errors
export const hasErrors = (errors) => {
  return Object.keys(errors).length > 0;
};