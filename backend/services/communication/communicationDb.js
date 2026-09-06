const mysql = require("mysql2");
const path = require("path");

require("dotenv").config({
  path: path.join(__dirname, "../../.env"),
});

// ============================================================
// DATALATTICE COMMUNICATION DATABASE POOL
// ============================================================
//
// The existing LMS database layer uses a single MySQL connection
// and is intentionally left unchanged.
//
// The communication subsystem uses its own connection pool so
// background workers can safely process multiple jobs concurrently.
//
// ============================================================

const communicationDb = mysql.createPool({

  host:
    process.env.DB_HOST,

  port:
    Number(
      process.env.DB_PORT || 3306
    ),

  user:
    process.env.DB_USER,

  password:
    process.env.DB_PASSWORD,

  database:
    process.env.DB_NAME,

  waitForConnections:
    true,

  connectionLimit:
    Number(
      process.env.COMMUNICATION_DB_POOL_SIZE || 5
    ),

  queueLimit:
    Number(
      process.env.COMMUNICATION_DB_QUEUE_LIMIT || 0
    ),

  dateStrings:
    true,

});


// ============================================================
// POOL HEALTH CHECK
// ============================================================

const checkCommunicationDb = (
  callback
) => {

  communicationDb.getConnection(
    (
      error,
      connection
    ) => {

      if (error) {

        callback(
          error
        );

        return;

      }

      connection.ping(
        (
          pingError
        ) => {

          connection.release();

          callback(
            pingError || null
          );

        }
      );

    }
  );

};


// ============================================================
// EXPORT
// ============================================================

module.exports = {

  pool:
    communicationDb,

  checkCommunicationDb,

};