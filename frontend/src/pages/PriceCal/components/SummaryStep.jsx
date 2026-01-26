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
    <div className="w-full max-w-3xl mx-auto px-4 animate-fade-in">
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
      </Helmet>
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight">
          Jawai Safari Price Summary & Experience Review
        </h1>
        <p className="sr-only">
          This page summarizes your Jawai leopard safari plan including selected stay,
          safari experience, guest details, optional activities, estimated pricing,
          and confidence score before submitting a booking request.
        </p>
        <p className="text-gray-500 mt-2">
          Review everything you’ve selected before proceeding
        </p>

        {isLuxury && (
          <div className="mt-3 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black text-yellow-400 text-sm font-semibold shadow-lg animate-pulse">
            👑 Luxury Experience Unlocked
          </div>
        )}

        {confidenceLabel && (
          <div className="mt-3 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-600 text-white text-sm font-semibold shadow-md">
            ⭐ {confidenceLabel.tag}
          </div>
        )}
      </div>

      {/* Main Card */}
      <div
        className={`rounded-3xl border border-gray-100 p-6 space-y-6 transition-all duration-500 ${cardStyle}`}
      >
        {/* Authority & Trust Signals */}
        <div className="rounded-2xl border border-gray-200 bg-white/80 backdrop-blur-sm p-4 flex flex-col gap-3">
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm font-semibold text-gray-800">
            <span className="flex items-center gap-1">✅ Trusted by 1,000+ Jawai travelers</span>
            <span className="flex items-center gap-1">📍 Local experts based in Jawai, Rajasthan</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-gray-500">
            <span className="px-2 py-1 rounded-full bg-gray-100">
              Google Reviews ⭐⭐⭐⭐⭐
            </span>
          </div>
        </div>
        {/* Budget */}
        <div className="flex items-center justify-between rounded-2xl p-4 bg-gradient-to-r from-green-100 to-emerald-200">
          <div>
            <p className="text-sm opacity-80">💰 Jawai Safari Budget Range</p>
            <p className="font-bold text-xl">₹{budget}</p>
            {tier && (
              <span
                className={`inline-block mt-2 text-xs px-3 py-1 rounded-full font-semibold ${pillStyle}`}
              >
                {tier}
              </span>
            )}
          </div>
          <span className="text-3xl">💸</span>
        </div>

        {/* Guests */}
        <div className="flex items-center justify-between bg-gray-50 rounded-2xl p-4">
          <div>
            <p className="text-sm text-gray-500">👨‍👩‍👧‍👦 Safari Guests & Family</p>
            <p className="font-semibold text-gray-900">
              {guests.adults} Adult{guests.adults > 1 ? "s" : ""}
              {guests.children > 0 &&
                `, ${guests.children} Child${
                  guests.children > 1 ? "ren" : ""
                }`}
            </p>
          </div>
          <span className="text-2xl">🧳</span>
        </div>

        {/* Stay & Safari */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-gray-50 rounded-2xl p-4 transition hover:scale-[1.02]">
            <p className="text-sm text-gray-500">🛏️ Jawai Safari Stay Selection</p>
            <p className="font-semibold text-gray-900">
              {hasStay ? `✔️ ${stayLabel}` : "Not selected"}
            </p>
          </div>

          <div className="bg-gray-50 rounded-2xl p-4 transition hover:scale-[1.02]">
            <p className="text-sm text-gray-500">🦁 Jawai Leopard Safari Experience</p>
            <p className="font-semibold text-gray-900">
              {hasSafari ? `✔️ ${formatSafari(safariLabel)}` : "Not selected"}
            </p>
          </div>
        </div>

        {/* Extras */}
        <div className="bg-gray-50 rounded-2xl p-4">
          <p className="text-sm text-gray-500 mb-2">✨ Optional Jawai Safari Experiences</p>
          {hasExtras ? (
            <div className="flex flex-wrap gap-2">
              {extras.map((e, i) => (
                <span
                  key={i}
                  className="px-3 py-1 text-sm rounded-full bg-black text-white shadow-md animate-fade-in"
                >
                  ✔️ {e}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-400">No extras selected</p>
          )}
        </div>

        {isOptimized && (
          <div className="text-center text-sm font-semibold text-emerald-700 mb-2">
            ✅ Optimized with care to balance comfort and value
          </div>
        )}

        {confidenceScore && (
          <p className="text-xs text-gray-500 text-center">
            System confidence: {confidenceScore}% match for your preferences
          </p>
        )}

        {/* Inline Contact Form */}
        <div className="mt-6 space-y-3 rounded-2xl bg-emerald-50/60 p-4">
          <p className="text-sm font-semibold text-gray-800 text-center">
            🤝 Let us personalise this Jawai safari for you
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

        {/* Total */}
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

        {priceNarrative && savings > 0 && (
          <div className="mt-3 text-center">
            <span className="inline-block px-4 py-2 rounded-full bg-emerald-100 text-emerald-800 text-sm font-semibold shadow-sm">
              🎉 You save ₹{savings.toLocaleString()} ({savingsPercent}%) compared to standard pricing
            </span>
          </div>
        )}

        {isOverBudget && (
          <p className="text-sm text-red-500 text-center mt-2">
            ⚠️ We optimized this experience to fit your budget while keeping the best value.
          </p>
        )}

        {priceNarrative?.message && (
          <p className="text-sm text-gray-600 text-center italic">
            {priceNarrative.message}
          </p>
        )}

        {priceNarrativeV2?.transparencyNote && (
          <p className="text-sm text-gray-600 text-center italic">
            {priceNarrativeV2.transparencyNote}
          </p>
        )}

        {urgency?.message && (
          <p className="text-sm text-amber-600 text-center mt-2">
            ⏳ {urgency.message}
          </p>
        )}

        {/* CTA */}
        <p className="text-xs text-gray-500 text-center">
          Jawai Unfiltered specialises exclusively in curated leopard safaris with
          verified local experts and transparent pricing.
        </p>
        <div>
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

    </div>
  );
}