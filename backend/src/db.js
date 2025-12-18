// 1. Add this line at the very top to load your local .env file
require('dotenv').config(); 

const { neon } = require('@neondatabase/serverless');

// Use the connection string from environment variables (works in cPanel and local .env)
const connectionString = process.env.DATABASE_URL;
const sql = neon(connectionString);

module.exports = {
  // Fixed mapping for parameters ($1, $2, etc.)
  query: async (text, params = []) => {
    try {
      // The neon driver requires text and params as separate arguments
      const result = await sql(text, params);
      
      // Return the result in a 'rows' property for compatibility
      return { rows: result };
    } catch (err) {
      console.error("❌ Neon HTTP Query Error:", err);
      throw err;
    }
  },
  // Compatibility object for existing pool.query calls
  pool: {
    query: async (text, params) => {
      try {
        const result = await sql(text, params);
        return { rows: result };
      } catch (err) {
        console.error("❌ Pool Query Error:", err);
        throw err;
      }
    }
  }
};