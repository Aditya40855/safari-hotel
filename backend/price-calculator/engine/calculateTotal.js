/**
 * calculateTotal.js
 * -----------------
 * Pure pricing engine.
 * No UI logic, no psychology, no side effects.
 * Takes user selections + pricing data and returns a clean breakdown.
 */

function calculateTotal(input, data) {
  const {
    budget,
    guests,
    stayId,
    safariId,
    extras = []
  } = input;

  const { adults = 1, children = 0 } = guests || {};

  // -------------------------------
  // 1. Resolve selected entities
  // -------------------------------
  const stay = data.stays.find(s => s.id === stayId);
  const safari = data.safaris.find(s => s.id === safariId);
  const selectedExtras = data.extras.filter(e => extras.includes(e.id));

  if (!stay) throw new Error("Invalid stay selection");
  if (!safari) throw new Error("Invalid safari selection");

  // -------------------------------
  // 2. Base prices
  // -------------------------------
  let stayPrice = stay.basePrice;
  let safariPrice = safari.price;
  let extrasPrice = selectedExtras.reduce((sum, e) => sum + e.price, 0);

  // -------------------------------
  // 3. Guest-based adjustments
  // -------------------------------
  const pricingRules = data.pricingRules || {};

  const extraAdultMultiplier = pricingRules.extraAdultMultiplier ?? 1;

  const adultCount = Math.max(adults, 1);
  const childCount = Math.max(children, 0);

  // Children pricing rule:
  // - First 3 children are free
  // - Every 4 children = 1 adult equivalent
  const chargeableChildren = Math.max(childCount - 3, 0);
  const childAdultEquivalent = chargeableChildren / 4;

  const effectiveAdultCount = adultCount + childAdultEquivalent;

  const guestMultiplier =
    effectiveAdultCount > 2
      ? 1 + (effectiveAdultCount - 2) * extraAdultMultiplier
      : 1;

  stayPrice *= guestMultiplier;
  safariPrice *= guestMultiplier;

  const childrenCost = 0; // Children are never charged directly

  // -------------------------------
  // 4. Final calculation
  // -------------------------------
  const subtotal =
    stayPrice +
    safariPrice +
    extrasPrice +
    childrenCost;

  const total = Math.round(subtotal);

  // -------------------------------
  // 4.5 Budget bands & enforcement metadata
  // -------------------------------
  const baseBudget = typeof budget === "number" && budget > 0 ? budget : null;

  const budgetBands = baseBudget
    ? {
        base: baseBudget,
        soft: Math.round(baseBudget * 1.2),   // +20%
        stretch: Math.round(baseBudget * 1.5) // +50%
      }
    : null;

  let budgetStatus = "none";
  let delta = 0;
  let hardStop = false;

  if (budgetBands) {
    if (total <= budgetBands.base) {
      budgetStatus = "within";
    } else if (total <= budgetBands.soft) {
      budgetStatus = "soft-over";
      delta = total - budgetBands.base;
    } else if (total <= budgetBands.stretch) {
      budgetStatus = "stretch-over";
      delta = total - budgetBands.base;
    } else {
      budgetStatus = "hard-over";
      delta = total - budgetBands.base;
      hardStop = true;
    }
  }

  // -------------------------------
  // 5. Tier detection (for frontend & suggestions)
  // -------------------------------
  let tier = "custom";
  if (data.tiers) {
    for (const [tierName, config] of Object.entries(data.tiers)) {
      if (total <= config.max) {
        tier = tierName;
        break;
      }
    }
  }

  // -------------------------------
  // 6. Return clean breakdown
  // -------------------------------
  return {
    budget,
    tier,
    total,
    breakdown: {
      stay: Math.round(stayPrice),
      safari: Math.round(safariPrice),
      extras: Math.round(extrasPrice),
      children: Math.round(childrenCost)
    },
    meta: {
      stayId,
      safariId,
      extras,
      guests: { adults: adultCount, children: childCount }
    },
    budgetMeta: budgetBands
      ? {
          bands: budgetBands,
          status: budgetStatus,
          delta,
          hardStop
        }
      : null,
  };
}

module.exports = calculateTotal;
