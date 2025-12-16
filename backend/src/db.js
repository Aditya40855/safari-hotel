// backend/src/db.js
const { Pool } = require('pg');

// 1. Get the connection string from Render (or use localhost for dev)
const connectionString = process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/app';

// 2. Check if we are in "Production" (Render) or "Development" (Localhost)
const isProduction = process.env.NODE_ENV === 'production';

const pool = new Pool({
  connectionString,
  // ⚠️ IMPORTANT: Add SSL for Cloud Database (Neon)
  ssl: isProduction ? { rejectUnauthorized: false } : false,
  max: 10,
  idleTimeoutMillis: 30000
});

module.exports = {
  query: (text, params) => pool.query(text, params),
  pool
};