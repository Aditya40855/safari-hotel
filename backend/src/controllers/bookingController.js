const { sendEmail } = require('../services/mailer');

exports.createBooking = async (req, res) => {
  const { name, email, contact, booking_type, start_date } = req.body;

  try {
    // 1. [Logic to save booking to Neon PostgreSQL would go here]

    // 2. Trigger Confirmation to User/Guest
    await sendEmail(
      email,
      "Booking Confirmed - Jawai Unfiltered",
      `Hi ${name}, your ${booking_type} on ${start_date} is confirmed!`,
      `<h1>Reservation Confirmed</h1><p>Hi ${name}, we are excited to see you on ${start_date}.</p>`
    );

    // 3. Trigger Alert to Admin (You)
    await sendEmail(
      process.env.EMAIL_USER,
      "New Booking Received",
      `New booking from ${name} (${email}) for ${booking_type}.`
    );

    res.status(201).json({ success: true, message: "Booking processed" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};