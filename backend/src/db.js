require('dotenv').config();
const { Pool } = require('pg');

/**
 * Optimized for cPanel and Neon:
 * Forces Port 6543 to bypass firewall restrictions.
 */
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  port: 6543, // Forces the connection to use the pooling port
  ssl: {
    rejectUnauthorized: false, // Essential for shared hosting SSL
  },
  max: 10, // Recommended for small/shared servers to prevent memory spikes
  connectionTimeoutMillis: 10000, // Wait 10s for the DB to respond
  idleTimeoutMillis: 30000,       // Close idle clients after 30s
});

// Simplified query method: Removes complex retry logic for a cleaner start
module.exports = {
  query: (text, params) => pool.query(text, params),
  pool: pool // Exporting the raw pool for transactions if needed
};