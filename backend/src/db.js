require('dotenv').config(); 
const { Pool } = require('pg');

// Initialize the Pool with production-grade settings
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // Required for Neon SSL connections
  },
  max: 20, // Reuse up to 20 connections
  idleTimeoutMillis: 300000, // Close idle clients after 30 seconds
  connectionTimeoutMillis: 100000, // Wait 10s for Neon to wake up (Cold Start fix)
});

/**
 * Enhanced execution with retry logic.
 * This keeps your existing logic but uses the high-performance Pool.
 */
const executeWithRetry = async (text, params = []) => {
  const MAX_RETRIES = 5;
  const DELAY = 2000; 

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      // Use the pool to execute the query
      const result = await pool.query(text, params);
      return result; // Result already contains 'rows'
    } catch (err) {
      // Detect transient errors like cold starts or fetch failures
      const isTransient = 
        err.message.includes('fetch failed') || 
        err.message.includes('timeout') || 
        err.code === '57P01' ||
        err.code === 'ECONNREFUSED';

      if (isTransient && attempt < MAX_RETRIES) {
        console.warn(`⚠️ Database Cold Start/Transient Error (Attempt ${attempt}/${MAX_RETRIES}). Retrying in 2s...`);
        await new Promise(res => setTimeout(res, DELAY));
        continue;
      }

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