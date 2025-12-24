const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'server596.iseencloud.net',
  port: parseInt(process.env.EMAIL_PORT) || 465,
  secure: true, 
  auth: {
    user: process.env.EMAIL_USER, 
    pass: process.env.EMAIL_PASS,
  },
});

const COLORS = {
  primary: '#1a1a1a',    // Deep Onyx
  accent: '#a68546',     // Muted Safari Gold
  border: '#e5e5e5',     // Light Architectural Gray
  bgPage: '#ffffff',     // Clean White
  bgSection: '#fcfcfc',  // Subtle Contrast White
  textMain: '#333333',   // Professional Gray-Black
  textMuted: '#666666'   // Slate Gray
};

const getBaseLayout = (content) => `
<!DOCTYPE html>
<html>
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; margin: 0; padding: 0; background-color: #ffffff; color: ${COLORS.textMain}; -webkit-font-smoothing: antialiased; }
        .main-container { max-width: 600px; margin: 0 auto; padding: 40px 20px; }
        .header { padding-bottom: 30px; border-bottom: 2px solid ${COLORS.primary}; margin-bottom: 40px; text-align: left; }
        .brand-name { font-size: 20px; font-weight: bold; letter-spacing: 4px; text-transform: uppercase; color: ${COLORS.primary}; margin: 0; }
        .content-area { line-height: 1.6; font-size: 15px; }
        .status-header { display: inline-block; font-size: 11px; font-weight: bold; text-transform: uppercase; letter-spacing: 1.5px; padding: 4px 12px; border: 1px solid ${COLORS.border}; margin-bottom: 30px; color: ${COLORS.textMuted}; }
        .data-grid { width: 100%; border-collapse: collapse; margin: 30px 0; border: 1px solid ${COLORS.border}; }
        .data-row { border-bottom: 1px solid ${COLORS.border}; }
        .data-label { padding: 16px; font-size: 12px; font-weight: bold; text-transform: uppercase; color: ${COLORS.textMuted}; background-color: ${COLORS.bgSection}; width: 35%; }
        .data-value { padding: 16px; font-size: 14px; font-weight: 500; color: ${COLORS.primary}; }
        .btn-action { display: inline-block; background-color: ${COLORS.primary}; color: #ffffff !important; padding: 16px 35px; text-decoration: none; font-size: 12px; font-weight: bold; letter-spacing: 1px; text-transform: uppercase; margin-top: 30px; }
        .footer { margin-top: 60px; padding-top: 30px; border-top: 1px solid ${COLORS.border}; font-size: 11px; color: #999999; line-height: 1.8; text-align: left; }
    </style>
</head>
<body>
    <div class="main-container">
        <div class="header">
            <h1 class="brand-name">Jawai Unfiltered</h1>
        </div>
        <div class="content-area">
            ${content}
        </div>
        <div class="footer">
            <strong>JAWAI UNFILTERED</strong>
            Jawai, Pali, Rajasthan, India<br><br>
            &copy; 2025 All Rights Reserved. Confidential Communication.
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
    <p>We invite you to log in to your dashboard to begin curating your wilderness itinerary.</p>
    <a href="https://jawaiunfiltered.com/login" class="btn-action">Access Dashboard</a>
  `;
  return getBaseLayout(content);
};

const generateBookingEmail = (name, bookingType, startDate, contact, guests) => {
  const content = `
    <div class="status-header" style="color: ${COLORS.accent}; border-color: ${COLORS.accent};">REQUEST RECEIVED</div>
    <h2 style="font-size: 24px; font-weight: 300; margin: 0 0 20px 0; color: ${COLORS.primary};">Reservation Inquiry</h2>
    <p>Dear ${name}, we have received your request for a Jawai Tour experience. Our operations team is currently cross-referencing field availability for your selected dates.</p>
    
    <table class="data-grid">
        <tr class="data-row">
            <td class="data-label">Service Type</td>
            <td class="data-value" style="color: ${COLORS.accent}; font-weight: bold;">${bookingType.toUpperCase()}</td>
        </tr>
        <tr class="data-row">
            <td class="data-label">Departure Date</td>
            <td class="data-value">${startDate}</td>
        </tr>
        <tr class="data-row">
            <td class="data-label">Occupancy</td>
            <td class="data-value">${guests} Adult(s)</td>
        </tr>
        <tr class="data-row">
            <td class="data-label" style="border-bottom: none;">Registered Phone</td>
            <td class="data-value" style="border-bottom: none;">${contact}</td>
        </tr>
    </table>
    
    <p style="font-size: 13px; color: ${COLORS.textMuted}; font-style: italic;">
        Note: This is an acknowledgment of your request. A final confirmation will be issued via telephone or a follow-up email once the logistics are secured.
    </p>
  `;
  return getBaseLayout(content);
};
const generateFinalConfirmationEmail = (name, bookingType, startDate, guests, amount) => {
    const content = `
      <div class="status-header" style="color: #15803d; border-color: #15803d;">BOOKING CONFIRMED</div>
      <h2 style="font-size: 24px; font-weight: 300; margin: 0 0 20px 0; color: ${COLORS.primary};">Reservation Secured.</h2>
      <p>Dear ${name}, we are pleased to inform you that your wilderness experience has been officially confirmed by the Jawai Unfiltered operations desk.</p>
      
      <table class="data-grid">
          <tr class="data-row">
              <td class="data-label">Service Type</td>
              <td class="data-value" style="font-weight: bold;">${bookingType.toUpperCase()}</td>
          </tr>
          <tr class="data-row">
              <td class="data-label">Confirmed Date</td>
              <td class="data-value">${startDate}</td>
          </tr>
          <tr class="data-row">
              <td class="data-label">Occupancy</td>
              <td class="data-value">${guests} Adult(s)</td>
          </tr>
          <tr class="data-row" style="background-color: #f0fdf4;">
              <td class="data-label" style="border-bottom: none; color: #15803d;">Total Amount</td>
              <td class="data-value" style="border-bottom: none; font-size: 18px; font-weight: bold; color: #15803d;">₹${amount}</td>
          </tr>
      </table>
      
      <div style="background-color: #fcfcfc; border: 1px solid ${COLORS.border}; padding: 20px; margin-top: 30px;">
          <p style="margin: 0; font-size: 12px; font-weight: bold; text-transform: uppercase; color: ${COLORS.accent};">Important Instructions</p>
          <p style="font-size: 13px; color: ${COLORS.textMuted}; margin: 10px 0 0 0;">
              1. Please arrive 15 minutes prior to the scheduled departure.<br>
              2. Carry a valid Government Photo ID for forest entry permits.<br>
              3. Balance payment (if any) is due upon arrival at the site.
          </p>
      </div>
  
      <p style="font-size: 14px; margin-top: 30px; text-align: center;">We look forward to hosting you in the heart of the wild.</p>
    `;
    return getBaseLayout(content);
  };
  const generateOTPEmail = (name, otp) => {
    const content = `
      <div class="status-header">SECURITY VERIFICATION</div>
      <h2 style="font-size: 24px; font-weight: 300; margin: 0 0 20px 0; color: ${COLORS.primary};">Password Reset Request</h2>
      <p>Dear ${name}, we received a request to reset your password for your Jawai Unfiltered account.</p>
      
      <div style="background-color: ${COLORS.bgSection}; border: 1px solid ${COLORS.border}; padding: 30px; text-align: center; margin: 30px 0;">
          <p style="margin: 0 0 10px 0; font-size: 12px; color: ${COLORS.textMuted}; letter-spacing: 2px; font-weight: bold;">YOUR VERIFICATION CODE</p>
          <h1 style="margin: 0; font-size: 42px; letter-spacing: 10px; color: ${COLORS.accent}; font-family: monospace;">${otp}</h1>
      </div>
      
      <p style="font-size: 13px; color: ${COLORS.textMuted}; line-height: 1.8;">
          This code is valid for 10 minutes. If you did not request this change, please ignore this email or contact our support desk if you have security concerns.
      </p>
    `;
    return getBaseLayout(content);
  };

module.exports = { 
  sendNotification: async (to, subject, html) => {
    try {
      await transporter.sendMail({
        from: `"Jawai Unfiltered" <${process.env.EMAIL_USER}>`,
        to,
        subject,
        html,
      });
      return true;
    } catch (error) {
      console.error("❌ Notification Error:", error);
      return false;
    }
  }, 
  generateBookingEmail,
  generateWelcomeEmail,
  generateFinalConfirmationEmail,
  generateOTPEmail
};