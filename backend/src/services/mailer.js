const { Resend } = require('resend');


// Initialize the Resend client using your API key from cPanel Environment Variables
const resend = new Resend(process.env.RESEND_API_KEY);

const COLORS = {
  primary: '#1a1a1a',    
  accent: '#a68546',     
  border: '#e5e5e5',     
  bgSection: '#fcfcfc',  
  textMain: '#333333',   
  textMuted: '#666666'   
};

const getBaseLayout = (content) => `
<!DOCTYPE html>
<html>
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; margin: 0; padding: 0; background-color: #ffffff; color: ${COLORS.textMain}; }
        .main-container { max-width: 600px; margin: 0 auto; padding: 40px 20px; }
        .header { padding-bottom: 30px; border-bottom: 2px solid ${COLORS.primary}; margin-bottom: 40px; }
        .brand-name { font-size: 20px; font-weight: bold; letter-spacing: 4px; text-transform: uppercase; color: ${COLORS.primary}; margin: 0; }
        .status-header { display: inline-block; font-size: 11px; font-weight: bold; text-transform: uppercase; letter-spacing: 1.5px; padding: 4px 12px; border: 1px solid ${COLORS.border}; margin-bottom: 30px; }
        .data-grid { width: 100%; border-collapse: collapse; margin: 30px 0; border: 1px solid ${COLORS.border}; }
        .data-row { border-bottom: 1px solid ${COLORS.border}; }
        .data-label { padding: 16px; font-size: 12px; font-weight: bold; text-transform: uppercase; color: ${COLORS.textMuted}; background-color: ${COLORS.bgSection}; width: 35%; }
        .data-value { padding: 16px; font-size: 14px; font-weight: 500; color: ${COLORS.primary}; }
        .btn-action { display: inline-block; background-color: ${COLORS.primary}; color: #ffffff !important; padding: 16px 35px; text-decoration: none; font-size: 12px; font-weight: bold; letter-spacing: 1px; text-transform: uppercase; margin-top: 30px; }
        .footer { margin-top: 60px; padding-top: 30px; border-top: 1px solid ${COLORS.border}; font-size: 11px; color: #999999; }
    </style>
</head>
<body>
    <div class="main-container">
        <div class="header"><h1 class="brand-name">Jawai Unfiltered</h1></div>
        <div class="content-area">${content}</div>
        <div class="footer">
            <strong>JAWAI UNFILTERED</strong><br>
            Jawai, Pali, Rajasthan, India<br><br>
            &copy; 2025 All Rights Reserved.
        </div>
    </div>
</body>
</html>
`;

const generateWelcomeEmail = (name) => {
  const content = `
    <div class="status-header">MEMBERSHIP ACTIVATED</div>
    <h2 style="font-size: 24px; font-weight: 300; margin: 0 0 20px 0; color: ${COLORS.primary};">Greetings, ${name}.</h2>
    <p>Your account with Jawai Unfiltered is now active. You have been granted access to our proprietary booking engine for safari logistics and luxury stay inventory.</p>
    <a href="https://jawaiunfiltered.com/login" class="btn-action">Access Dashboard</a>
  `;
  return getBaseLayout(content);
};

const generateBookingEmail = (name, bookingType, startDate, contact, guests) => {
  const content = `
    <div class="status-header" style="color: ${COLORS.accent}; border-color: ${COLORS.accent};">REQUEST RECEIVED</div>
    <h2 style="font-size: 24px; font-weight: 300; margin: 0 0 20px 0; color: ${COLORS.primary};">Reservation Inquiry</h2>
    <p>Dear ${name}, we have received your request. Our operations team is currently cross-referencing field availability for your selected dates.</p>
    <table class="data-grid">
        <tr class="data-row"><td class="data-label">Service Type</td><td class="data-value">${bookingType.toUpperCase()}</td></tr>
        <tr class="data-row"><td class="data-label">Date</td><td class="data-value">${startDate}</td></tr>
        <tr class="data-row"><td class="data-label">Occupancy</td><td class="data-value">${guests} Adult(s)</td></tr>
        <tr class="data-row"><td class="data-label">Phone</td><td class="data-value">${contact}</td></tr>
    </table>
  `;
  return getBaseLayout(content);
};

const generateFinalConfirmationEmail = (name, bookingType, startDate, guests, amount) => {
    const content = `
      <div class="status-header" style="color: #15803d; border-color: #15803d;">BOOKING CONFIRMED</div>
      <h2 style="font-size: 24px; font-weight: 300; margin: 0 0 20px 0; color: ${COLORS.primary};">Reservation Secured.</h2>
      <p>Dear ${name}, your wilderness experience has been officially confirmed by our operations desk.</p>
      <table class="data-grid">
          <tr class="data-row"><td class="data-label">Service</td><td class="data-value">${bookingType.toUpperCase()}</td></tr>
          <tr class="data-row"><td class="data-label">Date</td><td class="data-value">${startDate}</td></tr>
          <tr class="data-row"><td class="data-label" style="color: #15803d;">Total Amount</td><td class="data-value" style="font-size: 18px; font-weight: bold; color: #15803d;">₹${amount}</td></tr>
      </table>
    `;
    return getBaseLayout(content);
};

module.exports = { 
  sendNotification: async (to, subject, html) => {
    try {
        // Updated to use the Resend SDK emails.send method
        const { data, error } = await resend.emails.send({
            from: 'Jawai Unfiltered <info@jawaiunfiltered.com>', // MUST be your verified domain
            to: [to], // SDK expects an array for recipients
            subject: subject,
            html: html
        });

        if (error) {
            console.error("❌ Resend API Error:", error);
            return false;
        }

        console.log("✅ Email sent successfully via Resend API. ID:", data.id);
        return true;
    } catch (error) {
        console.error("❌ Notification Crash:", error.message);
        return false;
    }
  }, 
  generateBookingEmail,
  generateWelcomeEmail,
  generateFinalConfirmationEmail
};