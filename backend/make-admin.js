// backend/make-admin.js
const db = require('./src/db'); 

// PUT YOUR EMAIL HERE
const email = "adityasingh.aiml@gmail.com"; 

async function run() {
  try {
    const res = await db.query(
      "UPDATE users SET is_admin = true WHERE email = $1 RETURNING *", 
      [email]
    );
    console.log("Success! User is now Admin:", res.rows[0]);
  } catch (e) {
    console.error(e);
  }
  process.exit();
}
run();