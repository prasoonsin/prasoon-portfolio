const logger = {
  info: (...messages) => {
    console.log("[INFO]", ...messages);
  },

  warn: (...messages) => {
    console.warn("[WARN]", ...messages);
  },

  error: (...messages) => {
    console.error("[ERROR]", ...messages);
  },

  debug: (...messages) => {
    if (process.env.NODE_ENV !== "production") {
      console.log("[DEBUG]", ...messages);
    }
  }
};

module.exports = logger;