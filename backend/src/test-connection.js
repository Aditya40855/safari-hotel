// src/test-connection.js
require('dotenv').config();
const { sendNotification } = require('./mailer');

async function runTest() {
  console.log("🚀 Initializing SMTP test for GoViral...");
  console.log(`Target Host: ${process.env.EMAIL_HOST}`);
  
  const testRecipient = "leekurathore@gmail.com.com"; // Change to your real email
  const subject = "🔥 System Integration Test";
  const body = `Success! Your GoViral SMTP is now fully integrated with your backend.
  
  Details:
  - Sent from: ${process.env.EMAIL_USER}
  - Server: ${process.env.EMAIL_HOST}
  - Time: ${new Date().toLocaleString()}`;

  try {
    await sendNotification(testRecipient, subject, body);
    console.log("🏁 Test complete. Check your inbox and 'Track Delivery' in cPanel.");
  } catch (err) {
    console.error("🏁 Test failed. Check your .env credentials.");
  }
}

runTest();