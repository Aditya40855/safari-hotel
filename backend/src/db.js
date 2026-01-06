require('dotenv').config();
const mysql = require('mysql2/promise');

/**
 * Optimized for cPanel Local MySQL:
 * Bypasses all external firewall blocks by using localhost.
 */
const pool = mysql.createPool({
  host: '84.247.128.38', // Standard for local cPanel database connections
  user: 'jawaiunf_admin_pro', // Correct username from your screenshot
  password: 'Aditya@77425',    // Your requested password
  database: 'jawaiunf_jawai_pro', // Correct database name from your screenshot
  waitForConnections: true,
  connectionLimit: 5,  // Optimized for shared hosting memory limits
  queueLimit: 0
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