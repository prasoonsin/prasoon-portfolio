const sanitizeString = (value) => {
  if (typeof value !== "string") {
    return value;
  }

  return value
    .trim()
    .replace(/[<>]/g, "");
};

const sanitizeObject = (object) => {
  if (!object || typeof object !== "object") {
    return object;
  }

  const sanitizedObject = {};

  Object.keys(object).forEach((key) => {
    const value = object[key];

    if (typeof value === "string") {
      sanitizedObject[key] = sanitizeString(value);
    } else {
      sanitizedObject[key] = value;
    }
  });

  return sanitizedObject;
};

const sanitizeArray = (array) => {
  if (!Array.isArray(array)) {
    return array;
  }

  return array.map((item) => {
    if (typeof item === "string") {
      return sanitizeString(item);
    }

    if (item && typeof item === "object") {
      return sanitizeObject(item);
    }

    return item;
  });
};

module.exports = {
  sanitizeString,
  sanitizeObject,
  sanitizeArray
};