const express = require("express");
const router = express.Router();

// Import calculator routes
const priceCalculatorRoute = require("./priceCalculator.route");

// Mount routes
router.use("/", priceCalculatorRoute);

module.exports = router;