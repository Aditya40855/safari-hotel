/****
 * priceCalculator.route.js
 * ------------------------
 * Public API route for price calculation.
 *
 * Responsibilities:
 * - Validate incoming payload
 * - Load JSON pricing data
 * - Run pricing engine
 * - Return clean, frontend-ready response
 */

const express = require("express");
const router = express.Router();

const { calculatorSchema } = require("./validators/calculator.schema");

// Engine
const {
  calculateTotal,
  suggestOptimizedBudget,
  buildAlternatives
} = require("./engine");

// Data loaders
const stays = require("./data/stays.json");
const safaris = require("./data/safaris.json");
const extras = require("./data/extras.json");
const pricingRules = require("./data/pricingRules.json");
const tiers = require("./data/tiers.json");

// ------------------------------------
// POST /calculate
// ------------------------------------
router.get("/calculate", (req, res) => {
  res.json({ ok: true, message: "GET route hit" });
});
router.post("/calculate", (req, res) => {
  try {
    const payload = req.body;

    const parsed = calculatorSchema.safeParse(payload);
    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        error: "Validation failed",
        details: parsed.error.errors
      });
    }

    const validatedPayload = parsed.data;

    const data = {
      stays,
      safaris,
      extras,
      pricingRules,
      tiers
    };

    // 1. Core price calculation
    const calculation = calculateTotal(validatedPayload, data);

    // 2. Smart budget optimization (optional)
    const optimized = suggestOptimizedBudget(calculation, data);

    // 3. Alternative experiences
    const alternatives = buildAlternatives(calculation, data);

    // Budget-aware orchestration
    const { budgetMeta } = calculation;

    const constraints = {
      stays: {
        allowed: [],
        locked: []
      },
      safaris: {
        allowed: [],
        locked: []
      },
      extras: {
        allowed: [],
        locked: []
      }
    };

    if (budgetMeta?.bands?.base) {
      const base = budgetMeta.bands.base;

      // Stay constraints
      stays.forEach((s) => {
        if (s.basePrice <= base) constraints.stays.allowed.push(s.id);
        else constraints.stays.locked.push(s.id);
      });

      // Safari constraints
      safaris.forEach((s) => {
        if (s.price <= base) constraints.safaris.allowed.push(s.id);
        else constraints.safaris.locked.push(s.id);
      });

      // Extras constraints (always optional, soft-lock only)
      extras.forEach((e) => {
        if (e.price <= base * 0.1) constraints.extras.allowed.push(e.id);
        else constraints.extras.locked.push(e.id);
      });
    }

    let selected = calculation;
    let optimizedPlan = optimized;
    let upgrade = null;

    if (budgetMeta?.hardStop && optimized) {
      selected = null;
    }

    if (optimized && optimized.target === "aspirational") {
      upgrade = optimized;
      optimizedPlan = null;
    }

    // ------------------------------------
    // Price narrative (value framing)
    // ------------------------------------
    const finalPrice = selected?.total || optimizedPlan?.optimizedTotal || upgrade?.optimizedTotal || null;

    let priceNarrative = null;

    if (finalPrice && budgetMeta?.bands) {
      const anchorFromStretch = budgetMeta.bands.stretch;
      const anchorFromMultiplier = Math.round(finalPrice * 1.4);

      const anchorPrice = Math.max(anchorFromStretch || 0, anchorFromMultiplier);
      const savings = anchorPrice - finalPrice;
      const savingsPercent = Math.round((savings / anchorPrice) * 100);

      priceNarrative = {
        finalPrice,
        anchorPrice,
        savings,
        savingsPercent,
        message: `You’re getting a curated Jawai experience typically priced at ₹${anchorPrice.toLocaleString()} for ₹${finalPrice.toLocaleString()}`
      };
    }

    // ------------------------------------
    // Confidence labeling (decision support)
    // ------------------------------------
    let confidenceLabel = null;

    if (selected && !upgrade) {
      confidenceLabel = {
        tag: "Most Chosen",
        reason: "Guests with similar preferences usually select this experience"
      };
    }

    if (!selected && optimizedPlan) {
      confidenceLabel = {
        tag: "Best Value",
        reason: "Optimised to balance comfort, experience and value"
      };
    }

    if (upgrade) {
      confidenceLabel = {
        tag: "Premium Experience",
        reason: "Recommended for a more private and immersive safari"
      };
    }

    // ------------------------------------
    // Soft urgency (non-pushy)
    // ------------------------------------
    let urgency = null;

    if (finalPrice && budgetMeta?.bands) {
      urgency = {
        type: "seasonal",
        message: "Safari availability for this comfort level fills up quickly"
      };
    }

    // 4. Final response
    return res.json({
      success: true,
      bookingMeta: {
        stayId: selected?.meta?.stayId || optimizedPlan?.meta?.stayId || upgrade?.meta?.stayId || null,
        safariId: selected?.meta?.safariId || optimizedPlan?.meta?.safariId || upgrade?.meta?.safariId || null,
        total: finalPrice || null,
        confidenceScore: priceNarrative?.savingsPercent || null
      },
      selected,
      budget: budgetMeta || null,
      constraints,
      priceNarrative,
      confidenceLabel,
      urgency,
      optimized: optimizedPlan || null,
      upgrade,
      alternatives
    });
  } catch (error) {
    console.error("Price calculation error:", error.message);

    return res.status(500).json({
      success: false,
      error: "Unable to calculate price"
    });
  }
});

module.exports = router;
