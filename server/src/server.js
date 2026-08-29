const dotenv = require("dotenv");

dotenv.config({
  path: "../.env"
});

const app = require("./app");
const pool = require("./config/database");

const PORT = process.env.PORT || 5000;

console.log("Database configuration:");
console.log("DB_HOST:", process.env.DB_HOST);
console.log("DB_USER:", process.env.DB_USER);
console.log("DB_NAME:", process.env.DB_NAME);
console.log("DB_PORT:", process.env.DB_PORT);

pool.getConnection()
  .then((connection) => {
    console.log("MySQL database connected successfully");

    connection.release();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Database connection failed:", error);
  });