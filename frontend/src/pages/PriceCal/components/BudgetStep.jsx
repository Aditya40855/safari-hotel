import { useEffect, useState, useRef } from "react";

export default function BudgetStep({ budget, setBudget }) {
  const [displayValue, setDisplayValue] = useState(budget);
  const [prevTierLabel, setPrevTierLabel] = useState(null);
  const [showUnlock, setShowUnlock] = useState(false);
  const [tierAnim, setTierAnim] = useState(false);
  const [benefitAnim, setBenefitAnim] = useState(false);
  const [luxuryPulse, setLuxuryPulse] = useState(false);
  const [sliderClickAnim, setSliderClickAnim] = useState(false);

  // Determine tier based on budget
  const tier =
    budget < 30000
      ? { label: "Budget", color: "bg-emerald-100 text-emerald-700", emoji: "💼" }
      : budget < 60000
      ? { label: "Comfort", color: "bg-blue-100 text-blue-700", emoji: "✨" }
      : { label: "Luxury", color: "bg-purple-100 text-purple-700", emoji: "👑" };

  // Compute slider color classes based on tier
  const sliderColor =
    tier.label === "Budget"
      ? "accent-emerald-600"
      : tier.label === "Comfort"
      ? "accent-blue-600"
      : "accent-purple-600";

  // Count-up animation whenever budget changes
  useEffect(() => {
    let start = displayValue;
    let end = budget;
    if (start === end) return;

    // Trigger slider click animation
    setSliderClickAnim(true);

    const step = Math.max(1, Math.abs(end - start) / 20);
    const interval = setInterval(() => {
      start += start < end ? step : -step;
      if ((start >= end && step > 0) || (start <= end && step < 0)) {
        setDisplayValue(end);
        clearInterval(interval);
      } else {
        setDisplayValue(Math.round(start));
      }
    }, 20);

    return () => clearInterval(interval);
  }, [budget]);

  // Handle tier change animations and unlock message
  useEffect(() => {
    setPrevTierLabel(tier.label);

    if (prevTierLabel && prevTierLabel !== tier.label) {
      // Trigger tier scale + glow animation
      setTierAnim(true);

      // Animate benefit cards fade/slide out then in
      setBenefitAnim(false);
      const benefitTimeout = setTimeout(() => {
        setBenefitAnim(true);
      }, 300);

      // Show unlock message if switched to Luxury from non-Luxury
      let unlockTimeout;
      if (tier.label === "Luxury" && prevTierLabel !== "Luxury") {
        setShowUnlock(true);
        setLuxuryPulse(true);
        unlockTimeout = setTimeout(() => {
          setShowUnlock(false);
          setLuxuryPulse(false);
        }, 3000);
      } else {
        setShowUnlock(false);
        setLuxuryPulse(false);
      }

      return () => {
        clearTimeout(benefitTimeout);
        if (unlockTimeout) clearTimeout(unlockTimeout);
      };
    } else {
      // On first render or no change, show benefits
      setBenefitAnim(true);
    }
  }, [tier.label, prevTierLabel]);

  // Remove slider click animation class after animation ends
  useEffect(() => {
    if (sliderClickAnim) {
      const timeout = setTimeout(() => {
        setSliderClickAnim(false);
      }, 150);
      return () => clearTimeout(timeout);
    }
  }, [sliderClickAnim]);

  // Benefit cards content per tier
  const benefitsByTier = {
    Budget: ["🏨 Well‑reviewed stays", "🐆 Shared safari experience"],
    Comfort: ["🏨 Hand‑picked premium lodges", "🐆 Expert‑guided safaris"],
    Luxury: ["🏨 Signature wilderness lodges", "🐆 Private jeep & naturalist"],
  };

  // Combine fixed benefits always shown
  const fixedBenefits = ["🍽️ Local cuisine", "🚗 Local transfers"];

  return (
    <div className="max-w-xl mx-auto px-4 py-6 pb-32">
      <div className="bg-white rounded-2xl shadow-xl p-6 space-y-6 relative">
        {/* Budget Display with tier animation */}
        <div
          className={`text-center space-y-2 transform transition-transform duration-300 ${
            tierAnim ? "scale-105 shadow-[0_0_12px_rgba(139,92,246,0.7)]" : ""
          }`}
          onAnimationEnd={() => setTierAnim(false)}
          onTransitionEnd={() => setTierAnim(false)}
          aria-live="polite"
          aria-atomic="true"
        >
          <div className="text-xs text-gray-600 uppercase tracking-wide select-none">
            Your Expected Trip Budget
          </div>

          <div className="text-2xl font-extrabold text-green-600 transition-all select-text">
            ₹{displayValue.toLocaleString()}
          </div>

          <span
            className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium select-none ${tier.color}`}
          >
            {tier.emoji} {tier.label} Comfort Level
          </span>

          <div className="text-xs text-gray-600 select-none">
            This helps us design the best plan for you. Final details are discussed personally.
          </div>
        </div>

        {/* Instructional hint above slider */}
        <div className="text-xs text-gray-600 select-none">
          Drag the slider to tell us what budget you’re comfortable with. This is not a final price — it helps us plan better for you.
        </div>

        {/* Slider */}
        <div className={`space-y-4 ${sliderClickAnim ? "animate-sliderClick" : ""}`}>
          <input
            type="range"
            min={10000}
            max={100000}
            step={1000}
            value={budget}
            onChange={(e) => setBudget(Number(e.target.value))}
            className={`w-full ${sliderColor}`}
            aria-label="Budget slider"
            style={{
              filter:
                tier.label === "Luxury"
                  ? "drop-shadow(0 0 6px rgba(139, 92, 246, 0.7))"
                  : tier.label === "Comfort"
                  ? "drop-shadow(0 0 6px rgba(59, 130, 246, 0.7))"
                  : "drop-shadow(0 0 6px rgba(22, 163, 74, 0.7))",
            }}
          />

          <div className="flex justify-between text-xs text-gray-600 select-none">
            <span>₹10K</span>
            <span>₹1L+</span>
          </div>

          <div className="text-xs text-gray-600 select-none">
            No booking or payment happens at this step.
          </div>
        </div>

        {/* Benefits label */}
        <div className="text-sm font-semibold text-gray-600 select-none mb-2">
          What this level typically includes
        </div>

        {/* Tier Benefits with fade/slide animation */}
        <div
          className={`grid grid-cols-2 gap-3 text-sm transition-opacity duration-300 ease-in-out ${
            benefitAnim ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"
          }`}
          aria-live="polite"
          aria-atomic="true"
        >
          {benefitsByTier[tier.label].map((benefit, idx) => (
            <div
              key={benefit}
              className="bg-gray-50 rounded-xl p-3 text-center select-none"
              style={{
                transitionDelay: `${idx * 100}ms`,
              }}
            >
              {benefit}
            </div>
          ))}

          {fixedBenefits.map((benefit, idx) => (
            <div
              key={benefit}
              className="bg-gray-50 rounded-xl p-3 text-center select-none"
              style={{
                transitionDelay: `${(benefitsByTier[tier.label].length + idx) * 100}ms`,
              }}
            >
              {benefit}
            </div>
          ))}
        </div>

        {/* Unlock Luxury Message */}
        {showUnlock && (
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full bg-purple-700 text-white px-4 py-2 rounded-full shadow-lg text-sm font-semibold select-none animate-fadeInDown"
            role="alert"
            aria-live="assertive"
          >
            You unlocked Luxury 👑
          </div>
        )}

        {/* Trust Note */}
        <div className="text-xs text-gray-600 text-center pt-2 select-none">
          This is a comfort guide — we always optimise the final plan to match value & expectations.
        </div>
      </div>

      {/* Inline Tailwind animation for unlock message and new animations */}
      <style>{`
        @keyframes fadeInDown {
          0% {
            opacity: 0;
            transform: translate(-50%, -150%);
          }
          100% {
            opacity: 1;
            transform: translate(-50%, 0);
          }
        }
        .animate-fadeInDown {
          animation: fadeInDown 0.4s ease forwards;
        }
        @keyframes pulseGlow {
          0%, 100% {
            box-shadow: 0 0 0 0 rgba(139, 92, 246, 0.7);
          }
          50% {
            box-shadow: 0 0 12px 6px rgba(139, 92, 246, 0.7);
          }
        }
        .animate-pulseGlow {
          animation: pulseGlow 2s ease-in-out infinite;
        }
        @keyframes sliderClickScale {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(0.95);
          }
          100% {
            transform: scale(1);
          }
        }
        .animate-sliderClick {
          animation: sliderClickScale 0.15s ease forwards;
        }
      `}</style>
    </div>
  );
}