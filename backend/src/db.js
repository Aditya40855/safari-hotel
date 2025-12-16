// backend/src/db.js
const { Pool } = require('pg');

const connectionString = process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/app';

const pool = new Pool({
  connectionString,
  // optional tuning:
  max: 10,
  idleTimeoutMillis: 30000
});

module.exports = {
  query: (text, params) => pool.query(text, params),
  pool
};