const mysql = require("mysql2");
require("dotenv").config();


// ============================================================
// MYSQL CONNECTION
// ============================================================

const db = mysql.createConnection({

  host: process.env.DB_HOST,

  port: process.env.DB_PORT,

  user: process.env.DB_USER,

  password: process.env.DB_PASSWORD,

  database: process.env.DB_NAME,

  // IMPORTANT:
  // Keep MySQL DATE and TIME values as strings.
  // This prevents timezone conversion problems.
  dateStrings: true,

});


// ============================================================
// CONNECT
// ============================================================

db.connect((err) => {

  if (err) {

    console.error(
      "❌ MySQL Connection Error:",
      err.message
    );

    return;

  }


  console.log(
    "========================================"
  );

  console.log(
    "✅ MySQL Connected Successfully"
  );

  console.log(
    "========================================"
  );

});


// ============================================================
// EXPORT
// ============================================================

module.exports = db;