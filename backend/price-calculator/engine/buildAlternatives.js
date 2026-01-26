/**
 * buildAlternatives.js
 * -------------------
 * Generates comparable alternative experiences.
 *
 * Purpose:
 * - Offer 2–3 nearby options (slightly cheaper / slightly premium)
 * - Increase choice confidence
 * - Support UI cards like "You may also like"
 *
 * This engine:
 * - NEVER changes the selected option
 * - NEVER forces a cheaper price
 * - ONLY suggests logical, nearby alternatives
 */

function buildAlternatives(calculationResult, data, options = {}) {
  const { breakdown, tier, total, budgetMeta } = calculationResult;

  const MAX_ALTERNATIVES = options.max || 3;
  const alternatives = [];

  if (!data.stays || !data.safaris) {
    return alternatives;
  }

  const baseBudget = budgetMeta?.bands?.base || null;

  const isAllowedAlternative = (estimatedTotal) => {
    if (!baseBudget) return true;
    if (budgetMeta.status === "hard-over") {
      return estimatedTotal <= budgetMeta.bands.stretch;
    }
    return estimatedTotal <= budgetMeta.bands.soft;
  };

  // ----------------------------------
  // 1. Stay-based alternatives (same tier)
  // ----------------------------------
  const stayAlternatives = data.stays
    .filter(
      s =>
        s.tier === tier &&
        s.basePrice !== breakdown.stay
    )
    .map(stay => {
      const priceDiff = stay.basePrice - breakdown.stay;
      const estimatedTotal = Math.round(total + priceDiff);

      if (!isAllowedAlternative(estimatedTotal)) return null;

      return {
        type: "stay",
        id: stay.id,
        label: stay.label,
        estimatedTotal,
        direction: priceDiff < 0 ? "cheaper" : "premium"
      };
    })
    .filter(Boolean);

  alternatives.push(...stayAlternatives);

  // ----------------------------------
  // 2. Safari-based alternatives
  // ----------------------------------
  const safariAlternatives = data.safaris
    .filter(s => s.price !== breakdown.safari)
    .map(safari => {
      const priceDiff = safari.price - breakdown.safari;
      const estimatedTotal = Math.round(total + priceDiff);

      if (!isAllowedAlternative(estimatedTotal)) return null;

      return {
        type: "safari",
        id: safari.id,
        label: safari.label,
        estimatedTotal,
        direction: priceDiff < 0 ? "cheaper" : "premium"
      };
    })
    .filter(Boolean);

  alternatives.push(...safariAlternatives);

  // ----------------------------------
  // 3. Sort alternatives by closeness to original total
  // ----------------------------------
  const sorted = alternatives.sort((a, b) => {
    if (baseBudget) {
      const aOver = Math.abs(a.estimatedTotal - baseBudget);
      const bOver = Math.abs(b.estimatedTotal - baseBudget);
      return aOver - bOver;
    }
    return Math.abs(a.estimatedTotal - total) - Math.abs(b.estimatedTotal - total);
  });

  // ----------------------------------
  // 4. Return top N alternatives
  // ----------------------------------
  return sorted.slice(0, MAX_ALTERNATIVES);
}

module.exports = buildAlternatives;
