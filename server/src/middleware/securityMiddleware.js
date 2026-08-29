const helmet = require("helmet");
const cors = require("cors");

const securityMiddleware = [
  helmet(),

  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174"
    ],

    methods: [
      "GET",
      "POST",
      "PUT",
      "PATCH",
      "DELETE",
      "OPTIONS"
    ],

    allowedHeaders: [
      "Content-Type",
      "Authorization"
    ]
  })
];

module.exports = securityMiddleware;