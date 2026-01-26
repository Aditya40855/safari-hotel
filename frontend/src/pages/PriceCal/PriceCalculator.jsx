import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";

import BudgetStep from "./components/BudgetStep";
import StayStep from "./components/StayStep";
import SafariStep from "./components/SafariStep";
import ExtrasStep from "./components/ExtrasStep";
import SummaryStep from "./components/SummaryStep";
import GuestStep from "./components/GuestStep";

import { calculatePrice } from "@/lib/api";

const TOTAL_STEPS = 6;

const STEP_META = [
  {
    title: "Choose Your Stay in Jawai",
    subtitle: "Select heritage, eco-luxury or premium stays for your Jawai safari",
  },
  {
    title: "Select Safari Experience",
    subtitle: "Choose leopard safari type and jungle experience in Jawai",
  },
  {
    title: "Guests & Family",
    subtitle: "Add adults and children for accurate Jawai safari pricing",
  },
  {
    title: "Add Safari Extras",
    subtitle: "Enhance your Jawai trip with curated safari experiences",
  },
  {
    title: "Set Your Budget Comfort",
    subtitle: "Adjust your comfort range to match your Jawai safari budget",
  },
  {
    title: "Jawai Safari Price Summary",
    subtitle: "Review estimated safari cost, stays, and confidence score",
  },
];

const STEP_LABELS = STEP_META.map((s) => s.title);

export default function PriceCalculator() {
  const [step, setStep] = useState(1);
  const [budget, setBudget] = useState(20000);
  const [guests, setGuests] = useState({
    adults: 1,
    children: 0,
  });
  const [stayId, setStayId] = useState(null);
  const [safariId, setSafariId] = useState(null);
  const [extras, setExtras] = useState([]);
  const [direction, setDirection] = useState("forward");

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const next = () => {
    if (step < TOTAL_STEPS) {
      setDirection("forward");
      setStep((s) => Math.min(s + 1, TOTAL_STEPS));
    }
  };
  const back = () => {
    if (step > 1) {
      setDirection("back");
      setStep((s) => Math.max(s - 1, 1));
    }
  };

  const getCTA = () => {
    switch (step) {
      case 1:
        return "Choose Stay";
      case 2:
        return "Select Safari";
      case 3:
        return "Add Guests";
      case 4:
        return "Add Extras";
      case 5:
        return "Set Comfort";
      case 6:
        return "Finish";
      default:
        return "Continue";
    }
  };

  const summary = {
    budget,
    guests,
    stayId,
    safariId,
    extras,
  };

  useEffect(() => {
    if (step !== TOTAL_STEPS) return;

    const fetchCalculation = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await calculatePrice({
          budget,
          stayId,
          safariId,
          guests,
          extras,
        });

        setResult(response);
      } catch (err) {
        setError(err.message || "Unable to calculate price");
      } finally {
        setLoading(false);
      }
    };

    fetchCalculation();
  }, [step, budget, stayId, safariId, guests, extras]);

  return (
    <div className="min-h-screen bg-[#f7f7f7] flex flex-col">
      <Helmet>
        <title>Jawai Safari Price Calculator | Leopard Safari Cost & Budget Planner</title>

        <meta
          name="description"
          content="Estimate Jawai leopard safari cost instantly. Compare safari types, heritage stays, guest count, extras, and budget comfort to plan your perfect Jawai safari."
        />

        <meta
          name="keywords"
          content="Jawai safari cost, leopard safari Jawai, Jawai safari price calculator, Jawai leopard safari budget, Jawai safari stays"
        />

        <link
          rel="canonical"
          href="https://www.jawaiunfiltered.com/price-calculator"
        />

        <meta property="og:title" content="Jawai Safari Price Calculator" />
        <meta
          property="og:description"
          content="Plan your Jawai leopard safari with an intelligent price calculator for stays, safaris, guests, and budget comfort."
        />
        <meta property="og:type" content="website" />
      </Helmet>
      <header className="sticky top-0 z-30 bg-white border-b border-slate-200">
        <div className="max-w-xl mx-auto px-4 py-2 flex items-center gap-2">
          <button
            onClick={back}
            disabled={step === 1}
            className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 disabled:opacity-30"
            aria-label="Go back"
          >
            ←
          </button>
          <h1 className="text-sm font-medium text-slate-900">
            Jawai Safari Price Calculator & Budget Planner
          </h1>
        </div>
      </header>

      <p className="sr-only">
        This Jawai safari price calculator helps travelers estimate leopard safari
        costs based on stay selection, safari type, number of guests, optional
        experiences, and preferred budget comfort.
      </p>

      <section className="max-w-xl mx-auto px-4 mt-2">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
          {STEP_LABELS.map((label, index) => {
            const stepNumber = index + 1;
            const isActive = step === stepNumber;
            const isCompleted = step > stepNumber;

            return (
              <div
                key={label}
                className={`flex items-center gap-1 px-3 py-1 rounded-full text-[11px] whitespace-nowrap transition-all
                  ${isActive
                    ? "bg-slate-900 text-white"
                    : isCompleted
                    ? "bg-slate-200 text-slate-700"
                    : "bg-slate-100 text-slate-400"}`}
              >
                <span className="font-medium">{label}</span>
                {isCompleted && <span>✓</span>}
              </div>
            );
          })}
        </div>
      </section>

      <section className="max-w-xl mx-auto mt-6 relative rounded-2xl bg-white border border-slate-200">
        <div>
          <div className="px-5 pt-4 pb-2">
            <h2 className="text-base font-semibold text-slate-900">
              {STEP_META[step - 1].title}
            </h2>
            <p className="text-xs text-slate-500">
              {STEP_META[step - 1].subtitle}
            </p>
          </div>

          <div className="px-4 py-4 space-y-4">
            {step === 1 && (
              <StayStep selectedStayId={stayId} onSelect={setStayId} />
            )}
            {step === 2 && (
              <SafariStep selectedSafariId={safariId} onSelect={setSafariId} />
            )}
            {step === 3 && (
              <GuestStep guests={guests} setGuests={setGuests} />
            )}
            {step === 4 && (
              <ExtrasStep extras={extras} setExtras={setExtras} />
            )}
            {step === 5 && (
              <BudgetStep budget={budget} setBudget={setBudget} />
            )}
            {step === 6 && (
              <SummaryStep
                summary={summary}
                result={result}
                loading={loading}
                error={error}
              />
            )}
          </div>
        </div>
      </section>

      <footer className="fixed bottom-0 inset-x-0 bg-white border-t border-slate-200">
        <div className="max-w-xl mx-auto px-3 py-2 flex items-center gap-2">
          <button
            onClick={back}
            disabled={step === 1}
            className="w-10 h-10 rounded-lg bg-slate-100 text-slate-700 disabled:opacity-30"
          >
            ←
          </button>

          {step !== TOTAL_STEPS && (
            <button
              onClick={next}
              disabled={step === TOTAL_STEPS}
              className="flex-1 h-10 rounded-lg bg-slate-900 text-white text-sm font-medium disabled:opacity-50"
            >
              {getCTA()}
            </button>
          )}
        </div>
      </footer>
    </div>
  );
}

<style jsx global>{`
  .no-scrollbar::-webkit-scrollbar {
    display: none;
  }
  .no-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`}</style>