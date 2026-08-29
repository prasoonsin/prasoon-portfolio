require("dotenv").config();
const pool = require("./src/config/database");

async function checkDatabase() {
    try {
        const [tables] = await pool.query("SHOW TABLES");

        console.log("\n===== TABLES IN AIVEN =====");
        console.table(tables);

        process.exit(0);
    } catch (error) {
        console.error("Database error:", error);
        process.exit(1);
    }
}

checkDatabase();