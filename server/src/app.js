const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(cors({
    origin: [
        "http://localhost:5173",
        "https://prasoon-portfolio-1-r7oe.onrender.com"
    ],
    credentials: true
}));

// ========================================
// Security
// ========================================

app.use(helmet());

// ========================================
// Rate Limiting
// ========================================

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many requests. Please try again later."
  }
});

app.use(limiter);

// ========================================
// CORS
// ========================================

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "http://localhost:5175"
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
);

// ========================================
// Body Parser
// ========================================

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ========================================
// Test Route
// ========================================

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Portfolio API is running 🚀"
  });
});

// ========================================
// Route Imports
// ========================================

const authRoutes = require("./routes/authRoutes");
const educationRoutes = require("./routes/educationRoutes");
const experienceRoutes = require("./routes/experienceRoutes");
const skillRoutes = require("./routes/skillRoutes");
const certificationRoutes = require("./routes/certificationRoutes");
const codingStatsRoutes = require("./routes/codingStatsRoutes");
const projectRoutes = require("./routes/projectRoutes");

const blogRoutes = require("./routes/blogRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const commentRoutes = require("./routes/commentRoutes");
const tagRoutes = require("./routes/tagRoutes");

const contactRoutes = require("./routes/contactRoutes");

const userRoutes = require("./routes/userRoutes");

// ========================================
// ROUTE DEBUG CHECK
// ========================================

console.log("\n========================================");
console.log("ROUTE CHECK");
console.log("========================================");

console.log("authRoutes:", typeof authRoutes);
console.log("educationRoutes:", typeof educationRoutes);
console.log("experienceRoutes:", typeof experienceRoutes);
console.log("skillRoutes:", typeof skillRoutes);
console.log("certificationRoutes:", typeof certificationRoutes);
console.log("codingStatsRoutes:", typeof codingStatsRoutes);
console.log("projectRoutes:", typeof projectRoutes);
console.log("blogRoutes:", typeof blogRoutes);
console.log("categoryRoutes:", typeof categoryRoutes);
console.log("commentRoutes:", typeof commentRoutes);
console.log("tagRoutes:", typeof tagRoutes);
console.log("contactRoutes:", typeof contactRoutes);
console.log("userRoutes:", typeof userRoutes);

console.log("========================================\n");

// ========================================
// API Routes
// ========================================

// Authentication
app.use("/api/auth", authRoutes);

// Portfolio
app.use("/api/education", educationRoutes);
app.use("/api/experience", experienceRoutes);
app.use("/api/skills", skillRoutes);
app.use("/api/certifications", certificationRoutes);
app.use("/api/coding-stats", codingStatsRoutes);
app.use("/api/projects", projectRoutes);

// Blog
app.use("/api/blogs", blogRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/tags", tagRoutes);

// Contact
app.use("/api/contacts", contactRoutes);

// Users
app.use("/api/users", userRoutes);

// ========================================
// 404 Route
// ========================================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found"
  });
});

// ========================================
// Global Error Handler
// ========================================

app.use((err, req, res, next) => {
  console.error("Server Error:", err);

  const statusCode = err.status || err.statusCode || 500;

  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal server error"
  });
});

// ========================================
// Export App
// ========================================

module.exports = app;