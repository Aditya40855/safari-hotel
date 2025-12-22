const welcomeTemplate = require('../templates/welcomeTemplate');
const nodemailer = require('nodemailer');

// 1. Setup the Transport using your specific host details
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST, // server596.iseencloud.net
  port: parseInt(process.env.EMAIL_PORT) || 465,
  secure: true, 
  auth: {
    user: process.env.EMAIL_USER, // info@jawaiunfiltered.com
    pass: process.env.EMAIL_PASS,
  },
});

// 2. Professional HTML Template Function
const generateBookingEmail = (name, bookingType, startDate, contact, guests) => {
  return `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
      <div style="background-color: #ea580c; padding: 20px; text-align: center;">
        <h1 style="color: #ffffff; margin: 0; font-size: 20px;">Booking Confirmed!</h1>
      </div>
      <div style="padding: 20px; background-color: #ffffff;">
        <h2 style="color: #1a202c;">Hi ${name},</h2>
        <p style="color: #4a5568;">Your reservation request for <strong>${bookingType}</strong> on <strong>${startDate}</strong> has been received.</p>
        <p style="color: #4a5568;">Our team will contact you at <strong>${contact}</strong> shortly to finalize your stay.</p>
        <div style="margin-top: 20px; padding-top: 15px; border-top: 1px solid #eee; font-size: 12px; color: #94a3b8; text-align: center;">
          &copy; 2025 Jawai Unfiltered. Sumerpur, Rajasthan.
        </div>
      </div>
    </div>
  `;
};

// 3. The Universal Send Function
const sendNotification = async (to, subject, html) => {
  try {
    await transporter.sendMail({
      from: `"Jawai Unfiltered" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    });
    console.log(`✅ Email sent to ${to}`);
    return true;
  } catch (error) {
    console.error("❌ Email Error:", error);
    return false;
  }
};

// CRITICAL: Export both so server.js can use them
module.exports = { 
  sendNotification, 
  generateBookingEmail 
};