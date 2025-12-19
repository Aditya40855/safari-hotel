// src/mailer.js
const nodemailer = require('nodemailer');

// 1. Debugging: Check if environment variables are loaded (only shows in terminal)
if (!process.env.EMAIL_HOST || !process.env.EMAIL_USER) {
  console.warn("⚠️ Warning: Email environment variables are not fully loaded.");
}

// 2. Create the transporter using GoViral SMTP settings
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  // Ensure port is a number
  port: parseInt(process.env.EMAIL_PORT || '465'), 
  // Port 465 must use secure: true
  secure: true, 
  auth: {
    // Exact mapping required: 'user' and 'pass'
    user: process.env.EMAIL_USER, 
    pass: process.env.EMAIL_PASS, 
  },
  // Optional: Timeout settings to prevent hanging connections
  connectionTimeout: 10000, 
});

/**
 * Sends a notification email
 * @param {string} to - Recipient email
 * @param {string} subject - Email subject
 * @param {string} text - Email body content
 */
const sendNotification = async (to, subject, text) => {
  // 3. Verify connection before attempting to send
  try {
    await transporter.verify();
    
    const info = await transporter.sendMail({
      // Label the sender for a professional look
      from: `"Safari & Hotels" <${process.env.EMAIL_USER}>`, 
      to,
      subject,
      text,
    });

    console.log("✅ Email sent successfully: %s", info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    // 4. Detailed error logging for easier troubleshooting
    console.error("❌ Email Delivery Error:");
    console.error(`- Code: ${error.code}`);
    console.error(`- Message: ${error.message}`);
    
    return { success: false, error: error.message };
  }
};

module.exports = { sendNotification };