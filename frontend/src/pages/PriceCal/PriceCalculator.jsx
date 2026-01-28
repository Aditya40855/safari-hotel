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
        {/* Primary SEO */}
        <title>
          Jawai Safari Price Calculator | Leopard Safari Cost & Budget Planner
        </title>

        <meta
          name="description"
          content="Use our Jawai Safari Price Calculator to instantly estimate leopard safari cost based on stay type, safari experience, number of guests, and budget comfort. Trusted Jawai experts."
        />

        <meta
          name="robots"
          content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
        />

        <link
          rel="canonical"
          href="https://www.jawaiunfiltered.com/price-calculator"
        />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Jawai Safari Price Calculator" />
        <meta
          property="og:description"
          content="Instantly calculate Jawai leopard safari cost with our intelligent budget planner."
        />
        <meta
          property="og:url"
          content="https://www.jawaiunfiltered.com/price-calculator"
        />

        {/* Breadcrumb Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://www.jawaiunfiltered.com/"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Jawai Safari Planner",
                "item": "https://www.jawaiunfiltered.com/jawai-safari"
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": "Price Calculator",
                "item": "https://www.jawaiunfiltered.com/price-calculator"
              }
            ]
          })}
        </script>

        {/* Software Application Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Jawai Safari Price Calculator",
            "applicationCategory": "TravelApplication",
            "operatingSystem": "Web",
            "description":
              "An interactive tool to calculate Jawai leopard safari prices based on stays, safari type, guests, and budget preferences.",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "INR"
            }
          })}
        </script>
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
            Jawai Safari Price Calculator
          </h1>
        </div>
      </header>

      <section className="sr-only">
        <h2>Estimate Jawai Leopard Safari Cost</h2>
        <p>
          This Jawai Safari Price Calculator helps travelers estimate leopard safari
          costs based on accommodation type, safari experience, number of guests,
          optional extras, and budget comfort level. It provides transparent pricing
          guidance before booking a Jawai safari.
        </p>
      </section>

      <p className="sr-only">
        This Jawai safari price calculator helps travelers estimate leopard safari
        costs based on stay selection, safari type, number of guests, optional
        experiences, and preferred budget comfort.
      </p>

      <section className="max-w-xl mx-auto px-4 mt-2">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
          {Array.from({ length: TOTAL_STEPS }).map((_, index) => {
            const stepNumber = index + 1;
            const isActive = step === stepNumber;
            const isCompleted = step > stepNumber;

            return (
              <div
                key={stepNumber}
                className={`flex items-center justify-center w-8 h-8 rounded-full text-xs font-semibold transition-all
                  ${isCompleted
                    ? "bg-green-500 text-white"
                    : isActive
                    ? "bg-slate-900 text-white"
                    : "bg-slate-200 text-slate-600"}`}
                aria-label={`Step ${stepNumber}`}
              >
                {isCompleted ? "✓" : stepNumber}
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