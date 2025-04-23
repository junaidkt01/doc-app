require("dotenv").config();
const mysql = require("mysql2");

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Optional: Log a successful initial connection (using a test query)
pool.query("SELECT 1", (err) => {
  if (err) {
    console.error("MySQL connection failed:", err);
  } else {
    console.log("MySQL pool is ready");
  }
});

module.exports = pool;

// require("dotenv").config();
// const mysql = require("mysql2");

// const connection = mysql.createConnection({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
//   port: process.env.DB_PORT,
// });

// connection.connect((err) => {
//   if (err) {
//     console.error("Error connecting to MySQL:", err);
//   } else {
//     console.log("Connected to MySQL");
//   }
// });

// module.exports = connection;
