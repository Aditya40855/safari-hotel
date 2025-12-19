// 1. Add this line at the very top to load your local .env file
require('dotenv').config(); 

const { neon } = require('@neondatabase/serverless');

// Use the connection string from environment variables
const connectionString = process.env.DATABASE_URL;
const sql = neon(connectionString);

/**
 * Helper function to execute SQL with a retry loop for Neon cold starts.
 * It waits 2 seconds between attempts, up to 5 times.
 */
const executeWithRetry = async (text, params = []) => {
  const MAX_RETRIES = 5;
  const DELAY = 2000; // 2 seconds

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      // Execute the query
      const result = await sql(text, params);
      return { rows: result };
    } catch (err) {
      // Detect common "Cold Start" or transient network errors
      const isTransient = 
        err.message.includes('fetch failed') || 
        err.message.includes('timeout') || 
        err.code === '57P01'; // Admin shutdown during restart

      if (isTransient && attempt < MAX_RETRIES) {
        console.warn(`⚠️ Neon Cold Start (Attempt ${attempt}/${MAX_RETRIES}). Retrying in 2s...`);
        await new Promise(res => setTimeout(res, DELAY));
        continue;
      }

      // If it's a real syntax error or we've exhausted retries, throw it
      console.error("❌ Database Error:", err.message);
      throw err;
    }
  }
};

module.exports = {
  // Primary query method
  query: async (text, params = []) => {
    return await executeWithRetry(text, params);
  },
  
  // Compatibility object for existing pool.query calls
  pool: {
    query: async (text, params = []) => {
      return await executeWithRetry(text, params);
    }
  }
};