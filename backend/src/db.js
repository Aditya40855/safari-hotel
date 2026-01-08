require('dotenv').config();
const mysql = require('mysql2/promise');

/**
 * Optimized for cPanel Local MySQL:
 * Bypasses all external firewall blocks by using localhost.
 */
const pool = mysql.createPool({
  host: process.env.DB_HOST,       // cPanel: localhost
  user: process.env.DB_USER,       // cPanel DB user
  password: process.env.DB_PASSWORD,   // cPanel DB password
  database: process.env.DB_NAME,   // cPanel DB name
  waitForConnections: true,
  connectionLimit: 5,              // SAFE for shared hosting
  queueLimit: 0,
  charset: "utf8mb4"
});

module.exports = {
  /**
   * Returns { rows: results } to maintain compatibility with 
   * your previous PostgreSQL-style logic in server.js.
   */
  query: async (sql, params) => {
    try {
      const [results] = await pool.execute(sql, params); 
      return { rows: results };
    } catch (err) {
      console.error("❌ MySQL Query Error:", err.message);
      throw err;
    }
  },
  pool: pool
};