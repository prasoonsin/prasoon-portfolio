const mysql = require("mysql2/promise");
require("dotenv").config();

async function migrateDatabase() {
  let local;
  let aiven;

  try {
    console.log("\n===== CONNECTING TO LOCAL DATABASE =====");

    // LOCAL DATABASE
    local = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: process.env.LOCAL_DB_PASSWORD || "",
      database: "portfolio",
      port: 3306,
    });

    console.log("✅ Local database connected");

    // AIVEN DATABASE
    console.log("\n===== CONNECTING TO AIVEN =====");

    aiven = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: Number(process.env.DB_PORT),
      ssl: {
        rejectUnauthorized: false,
      },
    });

    console.log("✅ Aiven database connected");

    // GET LOCAL TABLES
    const [tables] = await local.query(`
      SHOW FULL TABLES
      WHERE Table_type = 'BASE TABLE'
    `);

    console.log(`\nFound ${tables.length} tables locally.`);

    if (tables.length === 0) {
      console.log("❌ No tables found in local portfolio database.");
      return;
    }

    for (const row of tables) {
      const tableName = Object.values(row)[0];

      console.log(`\n--------------------------------`);
      console.log(`Migrating table: ${tableName}`);
      console.log(`--------------------------------`);

      // Get CREATE TABLE statement
      const [createResult] = await local.query(
        `SHOW CREATE TABLE \`${tableName}\``
      );

      const createSQL = createResult[0]["Create Table"];

      // Remove AUTO_INCREMENT current value if present
      const cleanCreateSQL = createSQL.replace(
        /AUTO_INCREMENT=\d+/gi,
        ""
      );

      // Drop table if it already exists
      await aiven.query(`DROP TABLE IF EXISTS \`${tableName}\``);

      // Create table
      await aiven.query(cleanCreateSQL);

      console.log(`✅ Created table: ${tableName}`);

      // Get data
      const [rows] = await local.query(
        `SELECT * FROM \`${tableName}\``
      );

      if (rows.length === 0) {
        console.log(`ℹ️ No data in ${tableName}`);
        continue;
      }

      const columns = Object.keys(rows[0]);

      const columnNames = columns
        .map((column) => `\`${column}\``)
        .join(", ");

      const placeholders = columns.map(() => "?").join(", ");

      const insertSQL = `
        INSERT INTO \`${tableName}\`
        (${columnNames})
        VALUES (${placeholders})
      `;

      for (const rowData of rows) {
        const values = columns.map((column) => rowData[column]);

        await aiven.query(insertSQL, values);
      }

      console.log(
        `✅ Copied ${rows.length} rows into ${tableName}`
      );
    }

    // FINAL CHECK
    const [aivenTables] = await aiven.query("SHOW TABLES");

    console.log("\n========================================");
    console.log("       AIVEN MIGRATION COMPLETE");
    console.log("========================================");

    console.log(`Aiven now has ${aivenTables.length} tables:`);

    for (const row of aivenTables) {
      console.log(`  ✓ ${Object.values(row)[0]}`);
    }

    console.log("\n🎉 Database migration completed successfully!");
  } catch (error) {
    console.error("\n❌ MIGRATION FAILED");
    console.error(error);
  } finally {
    if (local) await local.end();
    if (aiven) await aiven.end();
  }
}

migrateDatabase();