/**
 * suggestOptimizedBudget.js
 * -------------------------
 * Smart budget-optimization engine.
 * Purpose:
 * - Reduce final price by ~20–30% if possible
 * - Keep experience as similar as possible
 * - Apply psychological pricing (value framing)
 *
 * IMPORTANT:
 * - This file does NOT calculate base prices
 * - It only works on top of calculateTotal output
 */

function suggestOptimizedBudget(calculationResult, data) {
  const { total, breakdown, tier, budgetMeta } = calculationResult;

  // Guard: nothing to optimize if budgetMeta missing or already within budget
  if (!budgetMeta || budgetMeta.status === "within") {
    return null; // nothing to optimize
  }

  const budgetTarget = budgetMeta.bands.base;
  const aspirationalTarget = budgetMeta.bands.soft;

  // -------------------------------
  // Confidence score calculation
  // -------------------------------
  let confidenceScore = 100;

  const overBudgetRatio = total > 0 ? (total - budgetTarget) / total : 0;

  // Penalize heavy optimisation
  confidenceScore -= Math.min(30, Math.round(overBudgetRatio * 100));

  let optimizedTotal = total;
  let optimizedBreakdown = { ...breakdown };
  let appliedChanges = [];
  let optimisationLevel = "none"; // none | light | moderate

  // -------------------------------
  // 1. Try reducing extras first
  // -------------------------------
  if (optimizedTotal > budgetTarget && optimizedBreakdown.extras > 0) {
    optimizedTotal -= optimizedBreakdown.extras;
    optimizedBreakdown.extras = 0;
    appliedChanges.push("Removed optional extras to match your budget");
    optimisationLevel = "light";
  }

  // -------------------------------
  // 2. Try downgrading stay (any tier, better value)
  // -------------------------------
  if (optimizedTotal > budgetTarget && data.stays) {
    const orderedStays = data.stays
      .filter(s => s.basePrice < optimizedBreakdown.stay)
      .sort((a, b) => b.basePrice - a.basePrice);

    if (orderedStays.length > 0) {
      const nextStay = orderedStays[0];
      const diff = optimizedBreakdown.stay - nextStay.basePrice;
      optimizedTotal -= diff;
      optimizedBreakdown.stay = nextStay.basePrice;
      appliedChanges.push("Switched to a better-value stay option");
      optimisationLevel = "moderate";
    }
  }

  // -------------------------------
  // 3. Try lighter safari option
  // -------------------------------
  if (optimizedTotal > budgetTarget && data.safaris) {
    const cheaperSafaris = data.safaris
      .filter(s => s.price < optimizedBreakdown.safari)
      .sort((a, b) => b.price - a.price);

    if (cheaperSafaris.length > 0) {
      const nextSafari = cheaperSafaris[0];
      const diff = optimizedBreakdown.safari - nextSafari.price;
      optimizedTotal -= diff;
      optimizedBreakdown.safari = nextSafari.price;
      appliedChanges.push("Adjusted safari to balance your budget");
      optimisationLevel = "moderate";
    }
  }

  // -------------------------------
  // 4. Enforce budget targets
  // -------------------------------
  if (optimizedTotal <= budgetTarget) {
    const savings = total - optimizedTotal;
    const savingsPercent = Math.round((savings / total) * 100);

    const priceNarrativeV2 = {
      comparison: "Compared to similar Jawai travel experiences",
      transparencyNote: "No hidden costs. Final price is confirmed on WhatsApp or email",
      optimisationNote:
        optimisationLevel === "none"
          ? "This experience matches your preferences naturally"
          : optimisationLevel === "light"
          ? "Minor adjustments were made to improve value"
          : "Carefully refined to balance comfort and budget"
    };

    return {
      originalTotal: total,
      optimizedTotal,
      savings,
      savingsPercent,
      target: "within-budget",
      message: "Optimized to fit your budget without compromising experience",
      changes: appliedChanges,
      confidenceScore,
      optimisationLevel,
      priceNarrativeV2,
    };
  }

  if (optimizedTotal <= aspirationalTarget) {
    const priceNarrativeV2 = {
      comparison: "Compared to similar Jawai travel experiences",
      transparencyNote: "No hidden costs. Final price is confirmed on WhatsApp or email",
      optimisationNote:
        optimisationLevel === "none"
          ? "This experience matches your preferences naturally"
          : optimisationLevel === "light"
          ? "Minor adjustments were made to improve value"
          : "Carefully refined to balance comfort and budget"
    };

    return {
      originalTotal: total,
      optimizedTotal,
      target: "aspirational",
      message: "A small upgrade for a significantly better experience",
      changes: appliedChanges,
      confidenceScore,
      optimisationLevel,
      priceNarrativeV2,
    };
  }

  confidenceScore = Math.max(60, confidenceScore);

  return null;
}

module.exports = suggestOptimizedBudget;
