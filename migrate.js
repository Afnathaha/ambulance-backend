const fs = require("fs");
const path = require("path");
const { pool } = require("./src/db/pool");

async function migrate() {
  try {
    const sqlPath = path.join(
      __dirname,
      "migrations",
      "001_init.sql"
    );

    const sql = fs.readFileSync(sqlPath, "utf8");

    await pool.query(sql);

    console.log("Database migration completed successfully.");
  } catch (error) {
    console.error("Migration failed:", error.message);
    process.exitCode = 1;
  } finally {
    await pool.end();
  }
}

migrate();