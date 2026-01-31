import stays from "../data/stays";
import safaris from "../data/safaris";
import { useEffect, useState } from "react";
import { createBookingRequest, getAuthToken } from "../../../lib/api";
import { Helmet } from "react-helmet-async";

export default function SummaryStep({ summary = {}, result = null, loading = false, error = null }) {
  // --- All React hooks must be at the top ---
  const [submitted, setSubmitted] = useState(false);
  const [contact, setContact] = useState({ name: "", phone: "", email: "" });
  const [showBudgetHelp, setShowBudgetHelp] = useState(false);

  // --- Derived values, after hooks ---
  const selected = result?.selected || {};
  const optimized = result?.optimized || null;
  const upgrade = result?.upgrade || null;
  const budgetMeta = result?.budget || null;
  const priceNarrative = result?.priceNarrative || null;

  const confidenceLabel = result?.confidenceLabel || null;
  const urgency = result?.urgency || null;
  const priceNarrativeV2 = optimized?.priceNarrativeV2 || null;
  const confidenceScore = optimized?.confidenceScore || null;

  const breakdown = selected?.breakdown || optimized?.breakdown || {};

  const {
    budget = summary.budget || 0,
    tier = selected.tier || "",
    stayId = summary.stayId || "",
    safariId = summary.safariId || "",
    extras = summary.extras || [],
    guests = summary.guests || { adults: 1, children: 0 },
  } = {};

  const total = priceNarrative?.finalPrice ??
    selected?.total ??
    optimized?.optimizedTotal ??
    upgrade?.optimizedTotal ??
    0;

  const anchorPrice = priceNarrative?.anchorPrice || null;
  const savings = priceNarrative?.savings || null;
  const savingsPercent = priceNarrative?.savingsPercent || null;

  const stayLabel = stayId
    ? stays.find((s) => s.id === stayId)?.name || stayId
    : "";

  const safariLabel = safariId
    ? safaris.find((s) => s.id === safariId)?.name || safariId
    : "";

  const isOverBudget = budget > 0 && total > budget;

  // --- Effect for budget help popup ---
  useEffect(() => {
    if (!isOverBudget || budget <= 0) return;

    const gapPercent = ((total - budget) / budget) * 100;

    if (gapPercent < 20) return;

    const timer = setTimeout(() => {
      setShowBudgetHelp(true);
    }, 4750);

    return () => clearTimeout(timer);
  }, [isOverBudget, budget, total]);

  // --- Early returns, after all hooks ---
  if (submitted) {
    return (
      <div className="w-full max-w-3xl mx-auto px-4 py-12 text-center animate-fade-in">
        <h2 className="text-3xl font-extrabold mb-4">✅ Booking Request Received</h2>
        <p className="text-lg mb-2">
          Thank you for your booking request. Our team will review your details and contact you shortly.
        </p>
        <p className="text-sm text-gray-500 mb-1">No payment taken</p>
        <p className="text-sm text-gray-500 mb-1">No obligation</p>
        <p className="text-sm text-gray-500">Final confirmation via call or WhatsApp</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="w-full max-w-3xl mx-auto px-4 py-12 text-center animate-fade-in">
        <p className="text-lg font-semibold">Calculating your Jawai experience…</p>
        <p className="text-sm text-gray-500 mt-2">Please wait a moment</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-3xl mx-auto px-4 py-12 text-center">
        <p className="text-lg font-semibold text-red-600">Unable to calculate price</p>
        <p className="text-sm text-gray-500 mt-2">{error}</p>
      </div>
    );
  }

  // --- Rest of component logic ---
  const isOptimized = !selected && Boolean(optimized);

  const hasStay = Boolean(stayId);
  const hasSafari = Boolean(safariId);
  const hasExtras = Array.isArray(extras) && extras.length > 0;

  const isLuxury = tier?.toLowerCase().includes("luxury");
  const isComfort = tier?.toLowerCase().includes("comfort");

  const cardStyle = isLuxury
    ? "bg-neutral-900 text-white shadow-2xl ring-2 ring-yellow-400"
    : isComfort
    ? "bg-gradient-to-br from-emerald-50 to-green-100 shadow-xl"
    : "bg-white shadow-xl";

  const pillStyle = isLuxury
    ? "bg-yellow-400 text-black"
    : "bg-black text-white";

  const formatSafari = (s) => {
    if (!s) return "Not selected";
    if (s === "morning") return "🌄 Morning Safari";
    if (s === "evening") return "🌅 Evening Safari";
    if (s === "private") return "👑 Private Jeep Safari";
    return s;
  };

  // --- Phone validation helper ---
  const isValidPhone = (value) => {
    const digitsOnly = value.replace(/\D/g, "");
    return digitsOnly.length === 10 || digitsOnly.length === 12;
  };

  // --- Helper function to submit booking ---
  const submitBooking = async () => {
    const payload = {
      source: "price_calculator",

      calculator: {
        stateId: summary.stateId || null,
        stayId: summary.stayId || null,
        safariId: summary.safariId || null,
        tierId: summary.tierId || null,
        guests: summary.guests || { adults: 1, children: 0 },
        extras: summary.extras || []
      },

      pricing: result || null,

      guest: {
        name: contact?.name || null,
        phone: contact?.phone || null,
        email: contact?.email || null
      }
    };

    await createBookingRequest(payload);
    setSubmitted(true);
  };

  const handleFinish = async () => {
    if (!contact.name || !isValidPhone(contact.phone)) return;
    submitBooking();
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4 pb-28 sm:pb-6 animate-fade-in">
      <Helmet>
        <title>Jawai Safari Price Summary | Leopard Safari Cost & Booking Review</title>
        <meta
          name="description"
          content="Review your Jawai safari price summary including stay, safari type, guests, extras, estimated cost, and budget confidence before booking."
        />
        <meta
          name="keywords"
          content="Jawai safari price summary, Jawai leopard safari cost, Jawai safari booking review, Jawai safari budget"
        />
        <link
          rel="canonical"
          href="https://www.jawaiunfiltered.com/price-calculator/summary"
        />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            "name": "Jawai Leopard Safari Experience",
            "brand": {
              "@type": "Brand",
              "name": "Jawai Unfiltered"
            },
            "areaServed": {
              "@type": "Place",
              "name": "Jawai, Rajasthan"
            },
            "offers": {
              "@type": "Offer",
              "priceCurrency": "INR",
              "price": total,
              "availability": "https://schema.org/InStock"
            }
          })}
        </script>
      </Helmet>
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold tracking-tight">
          Jawai Safari Summary
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          {stayLabel || "Stay not selected"} • {formatSafari(safariLabel)}
        </p>
        <p className="text-sm text-gray-500">
          {guests.adults} Adult{guests.adults > 1 ? "s" : ""}{guests.children > 0 ? `, ${guests.children} Child` : ""}
        </p>

        <div className="mt-3 text-3xl font-extrabold text-emerald-700">
          ₹{total.toLocaleString()}
        </div>
        <p className="text-xs text-gray-500 mt-1">
          Curated manually by local Jawai experts — not auto‑generated
        </p>
        <p className="text-xs text-gray-400 mt-1">
          No payment now • Final confirmation via call
        </p>
        <div className="mt-3 flex flex-wrap justify-center gap-2">
          <span className="px-3 py-1 rounded-full bg-gray-100 text-xs text-gray-600">
            🧪 Free to try
          </span>
          <span className="px-3 py-1 rounded-full bg-gray-100 text-xs text-gray-600">
            🤝 Price negotiable
          </span>
          <span className="px-3 py-1 rounded-full bg-gray-100 text-xs text-gray-600">
            ✏️ Plan fully customisable
          </span>
        </div>
      </div>

      {/* Main Card */}
      <div
        className={`rounded-3xl border border-gray-100 p-6 space-y-6 transition-all duration-500 ${cardStyle}`}
      >
        {/* What happens next? strip */}
        <div className="mt-6 flex items-center justify-center gap-3 text-xs text-gray-500">
          <div className="flex w-full max-w-md mx-auto justify-between items-center text-xs text-gray-600">
            <div className="flex flex-col items-center gap-1">
              <span className="w-6 h-6 flex items-center justify-center rounded-full bg-emerald-600 text-white text-[11px] font-bold">1</span>
              <span className="text-center">Share details</span>
            </div>
            <div className="h-px flex-1 bg-gray-200 mx-2" />
            <div className="flex flex-col items-center gap-1">
              <span className="w-6 h-6 flex items-center justify-center rounded-full bg-emerald-600 text-white text-[11px] font-bold">2</span>
              <span className="text-center">Expert review</span>
            </div>
            <div className="h-px flex-1 bg-gray-200 mx-2" />
            <div className="flex flex-col items-center gap-1">
              <span className="w-6 h-6 flex items-center justify-center rounded-full bg-emerald-600 text-white text-[11px] font-bold">3</span>
              <span className="text-center">Call / WhatsApp</span>
            </div>
          </div>
        </div>
        {/* Selection Details in Grid Accordion */}
        <details className="mt-6 rounded-2xl border border-emerald-100 bg-white shadow-sm">
          <summary className="cursor-pointer px-4 py-3 text-sm font-semibold text-emerald-700 flex items-center justify-between">
            <span>View your selected details</span>
            <span className="text-xs text-gray-400">Tap to expand</span>
          </summary>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Budget */}
            <div className="rounded-xl bg-gray-50 p-3">
              <p className="text-xs text-gray-500">Budget</p>
              <p className="font-semibold text-gray-900">
                ₹{budget}
                {tier && (
                  <span
                    className={`ml-2 inline-block text-xs px-2 py-0.5 rounded-full font-semibold ${pillStyle}`}
                  >
                    {tier}
                  </span>
                )}
              </p>
            </div>
            {/* Guests */}
            <div className="rounded-xl bg-gray-50 p-3">
              <p className="text-xs text-gray-500">Guests</p>
              <p className="font-semibold text-gray-900">
                {guests.adults} Adult{guests.adults > 1 ? "s" : ""}
                {guests.children > 0 &&
                  `, ${guests.children} Child${guests.children > 1 ? "ren" : ""}`}
              </p>
            </div>
            {/* Stay */}
            <div className="rounded-xl bg-gray-50 p-3">
              <p className="text-xs text-gray-500">Stay</p>
              <p className="font-semibold text-gray-900">{stayLabel || "Not selected"}</p>
            </div>
            {/* Safari */}
            <div className="rounded-xl bg-gray-50 p-3">
              <p className="text-xs text-gray-500">Safari</p>
              <p className="font-semibold text-gray-900">{safariLabel ? formatSafari(safariLabel) : "Not selected"}</p>
            </div>
            {/* Extras */}
            <div className="rounded-xl bg-gray-50 p-3 col-span-1 sm:col-span-2">
              <p className="text-xs text-gray-500">Extras</p>
              {hasExtras ? (
                <div className="flex flex-wrap gap-2 mt-1">
                  {extras.map((e, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 text-xs rounded-full bg-black text-white shadow-md"
                    >
                      {e}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-gray-400">No extras selected</p>
              )}
            </div>
          </div>
        </details>

        {/* Contact Form - moved above price explanation */}
        <div className="mt-6 space-y-3 rounded-2xl bg-emerald-50/60 p-4">
          <p className="text-sm font-semibold text-gray-800 text-center">
            Confirm availability (no payment)
          </p>
          <p className="text-xs text-gray-500 text-center mt-1">
            Share your details so our local experts can fine‑tune availability,
            pricing, and safari timing — no spam, ever.
          </p>
          <p className="sr-only">
            Contact details are used only to coordinate Jawai leopard safari
            bookings, availability confirmation, and personalised itinerary support.
          </p>
          <input
            type="text"
            placeholder="Your full name  *"
            required
            value={contact.name}
            onChange={(e) => setContact({ ...contact, name: e.target.value })}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
          />
          <input
            type="tel"
            placeholder="Mobile number *"
            required
            value={contact.phone}
            onChange={(e) =>
              setContact({
                ...contact,
                phone: e.target.value.replace(/\D/g, "")
              })
            }
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
          />
          <input
            type="email"
            placeholder="Email (optional — for itinerary summary)"
            value={contact.email}
            onChange={(e) => setContact({ ...contact, email: e.target.value })}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
          />
        </div>

        {/* Price Explanation - collapsed */}
        <details className="mt-6 rounded-2xl border border-emerald-100 bg-white shadow-sm">
          <summary className="cursor-pointer px-4 py-3 text-sm font-semibold text-emerald-700 flex items-center justify-between">
            <span>Why this price?</span>
            <span className="text-xs text-gray-400">Tap to expand</span>
          </summary>
          <div className="mt-4 space-y-2">
            {/* Anchor price and total */}
            <div className="border-t pt-4 flex items-center justify-between">
              <span className="text-lg font-bold">Estimated Jawai Safari Cost</span>
              <div className="text-right">
                {anchorPrice && (
                  <p className="text-sm text-gray-400 line-through">
                    ₹{anchorPrice.toLocaleString()}
                  </p>
                )}
                <span
                  className={
                    isOverBudget
                      ? "text-3xl font-extrabold text-red-600"
                      : "text-3xl font-extrabold text-green-600"
                  }
                >
                  ₹{total.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Savings */}
            {priceNarrative && savings > 0 && (
              <div className="mt-3 text-center">
                <span className="inline-block px-4 py-2 rounded-full bg-emerald-100 text-emerald-800 text-sm font-semibold shadow-sm">
                  🎉 You save ₹{savings.toLocaleString()} ({savingsPercent}%) compared to standard pricing
                </span>
              </div>
            )}

            {/* Over budget */}
            {isOverBudget && (
              <p className="text-sm text-red-500 text-center mt-2">
                ⚠️ We optimized this experience to fit your budget while keeping the best value.
              </p>
            )}

            {/* Price narrative message */}
            {priceNarrative?.message && (
              <p className="text-sm text-gray-600 text-center italic">
                {priceNarrative.message}
              </p>
            )}

            {/* Transparency note */}
            {priceNarrativeV2?.transparencyNote && (
              <p className="text-sm text-gray-600 text-center italic">
                {priceNarrativeV2.transparencyNote}
              </p>
            )}

            {/* Urgency message */}
            {urgency?.message && (
              <p className="text-sm text-amber-600 text-center mt-2">
                ⏳ {urgency.message}
              </p>
            )}
          </div>
        </details>

        {/* Optimized note */}
        {isOptimized && (
          <div className="text-center text-sm font-semibold text-emerald-700 mb-2">
            ✅ Optimized with care to balance comfort and value
          </div>
        )}

        {/* Confidence score */}
        {confidenceScore && (
          <p className="text-xs text-gray-500 text-center">
            System confidence: {confidenceScore}% match for your preferences
          </p>
        )}

        {/* CTA */}
        <p className="text-xs text-gray-500 text-center">
          This is a free planning step. No booking is confirmed and no payment is taken.
          Our team will personalise this plan and adjust pricing after speaking with you.
        </p>
        <p className="text-xs text-gray-500 text-center mt-1">
          This is not an online booking — no payment is collected on this page.
        </p>
        <div className="hidden sm:block">
          <button
            onClick={handleFinish}
            disabled={!contact.name || !isValidPhone(contact.phone)}
            className={`w-full py-3 rounded-xl font-semibold text-base sm:text-lg shadow-lg transition-all duration-300
            ${!contact.name || !isValidPhone(contact.phone)
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-black text-white hover:bg-neutral-900 active:scale-[0.97]"}
            `}
          >
            Finish
          </button>
        </div>

        <p className="text-xs text-gray-400 text-center">
          Final pricing may vary based on season & availability
        </p>
        {/* Trust block at bottom */}
        <p className="text-xs text-gray-400 text-center mt-6">
          Trusted by 1,000+ Jawai travelers • Local experts based in Jawai
        </p>
      </div>

      {showBudgetHelp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 animate-fade-in">
          <div className="w-full max-w-md mx-4 rounded-3xl bg-white p-6 shadow-2xl relative">
            <button
              onClick={() => setShowBudgetHelp(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
              aria-label="Close"
            >
              ✕
            </button>

            <h3 className="text-xl font-semibold text-emerald-800 text-center">
              🤝 We can try to make this work within your budget
            </h3>
            <p className="text-sm text-gray-600 text-center mt-2">
              Budgets are personal — and many Jawai experiences are customised manually.
              Share your details below and our team will review this personally to see how we can
              fit the experience into your original comfort range.
            </p>

            <form className="mt-5 space-y-3">
              <input
                type="text"
                placeholder="Your name *"
                required
                value={contact.name}
                onChange={(e) => setContact({ ...contact, name: e.target.value })}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
              />
              <input
                type="email"
                placeholder="Email address (optional)"
                value={contact.email}
                onChange={(e) => setContact({ ...contact, email: e.target.value })}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
              />
              <input
                type="tel"
                placeholder="Phone number *"
                required
                value={contact.phone}
                onChange={(e) =>
                  setContact({
                    ...contact,
                    phone: e.target.value.replace(/\D/g, "")
                  })
                }
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
              />
              <button
                type="button"
                onClick={async () => {
                  if (!contact.name || !isValidPhone(contact.phone)) {
                    alert("Name and phone number are required");
                    return;
                  }

                  await createBookingRequest({
                    source: "price_calculator_budget_help",

                    calculator: {
                      stateId: summary.stateId || null,
                      stayId: summary.stayId || null,
                      safariId: summary.safariId || null,
                      tierId: summary.tierId || null,
                      guests: summary.guests || { adults: 1, children: 0 },
                      extras: summary.extras || []
                    },

                    pricing: result || null,

                    guest: {
                      name: contact.name,
                      phone: contact.phone,
                      email: contact.email || null
                    }
                  });

                  setShowBudgetHelp(false);
                  setSubmitted(true);
                }}
                className="w-full py-2.5 rounded-xl bg-emerald-700 text-white font-semibold text-sm hover:bg-emerald-800 transition"
              >
                Ask our team to review this
              </button>
            </form>

            <p className="text-xs text-gray-500 text-center mt-3">
              No obligation • We’ll only reach out if we can genuinely add value
            </p>
          </div>
        </div>
      )}

      {/* Spacer to guarantee separation from floating icons */}
      <div className="h-24 sm:hidden" aria-hidden="true" />
      {/* Sticky Price Bar (mobile only) */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t shadow-lg px-4 py-3 flex items-center justify-between sm:hidden pr-28 pb-6">
        <div>
          <p className="text-xs text-gray-500">Estimated cost</p>
          <p className="text-lg font-bold text-emerald-700">₹{total.toLocaleString()}</p>
          <p className="text-[11px] text-gray-400">No payment now</p>
          <p className="text-[11px] text-gray-400">Free planning • Price flexible</p>
        </div>
        <button
          onClick={handleFinish}
          disabled={!contact.name || !isValidPhone(contact.phone)}
          className={`px-5 py-2 text-sm font-semibold rounded-2xl transition relative z-50 shadow-lg
    ${!contact.name || !isValidPhone(contact.phone)
      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
      : "bg-black text-white active:scale-[0.97]"}
  `}
        >
          Finish
        </button>
      </div>

    </div>
  );
}