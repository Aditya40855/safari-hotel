require('dotenv').config(); 
const { Pool } = require('pg');

// Initialize the Pool with optimized production-grade settings
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    // Critical: bypasses certificate validation which often fails on shared hosts
    rejectUnauthorized: false, 
  },
  max: 20, // Reuse up to 20 connections
  
  // Adjusted timeouts to prevent "hanging" connections
  idleTimeoutMillis: 30000,    // Standard 30s: Close idle clients to free memory
  connectionTimeoutMillis: 10000, // Standard 10s: Fail fast if DB doesn't respond
});

/**
 * Enhanced execution with retry logic.
 * Keeps existing logic but uses the optimized Pool.
 */
const executeWithRetry = async (text, params = []) => {
  const MAX_RETRIES = 5;
  const DELAY = 2000; 

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      const result = await pool.query(text, params);
      return result; 
    } catch (err) {
      // Detect transient errors like cold starts or fetch failures
      const isTransient = 
        err.message.includes('fetch failed') || 
        err.message.includes('timeout') || 
        err.code === '57P01' || // Admin shutdown
        err.code === 'ECONNREFUSED'; // Connection rejected

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
  query: async (text, params = []) => {
    return await executeWithRetry(text, params);
  },
  pool: {
    query: async (text, params = []) => {
      return await executeWithRetry(text, params);
    }
  }
};