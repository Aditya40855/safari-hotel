const express = require('express');
const router = express.Router();
const { createBooking } = require('../controllers/bookingController');
// const { authenticateUser } = require('../middleware/auth'); // Optional middleware

// This route works for everyone (Smart Trigger)
router.post('/new-booking', createBooking); 

module.exports = router;