import React, { useState } from "react";
import { Helmet } from "react-helmet-async";

const EXTRAS = [
  {
    id: "pickup",
    label: "Pickup & Drop",
    desc: "Railway Station / Airport transfers",
    price: 3000,
    icon: "🚗",
  },
  {
    id: "village",
    label: "Village Walk",
    desc: "Local culture & rural life experience",
    price: 2000,
    icon: "🏡",
  },
  {
    id: "trekking",
    label: "Guided Trekking",
    desc: "Granite hills & leopard trails",
    price: 2500,
    icon: "🥾",
  },
  {
    id: "bonfire",
    label: "Bonfire Evening",
    desc: "Music, stories & cultural vibes",
    price: 3500,
    icon: "🔥",
  },
  {
    id: "birding",
    label: "Bird Watching",
    desc: "Over 150+ migratory & native birds",
    price: 1800,
    icon: "🦜",
  },
  {
    id: "photography",
    label: "Photography Assist",
    desc: "Guide support for wildlife shots",
    price: 4000,
    icon: "📸",
  },
];

export default function ExtrasStep({ extras = [], setExtras, constraints }) {
  const [showMore, setShowMore] = useState(false);
  const PRIMARY_EXTRAS_IDS = ["pickup", "village", "photography"];

  const allowedIds = constraints?.extras?.allowed || [];
  const lockedIds = constraints?.extras?.locked || [];

  const isLocked = (id) => lockedIds.includes(id);

  const toggleExtra = (extra) => {
    if (!setExtras || isLocked(extra.id)) return;

    setExtras((prev = []) => {
      const exists = prev.includes(extra.id);
      if (exists) {
        return prev.filter((id) => id !== extra.id);
      }
      return [...prev, extra.id];
    });
  };

  const primaryExtras = EXTRAS.filter((extra) =>
    PRIMARY_EXTRAS_IDS.includes(extra.id)
  );
  const moreExtras = EXTRAS.filter(
    (extra) => !PRIMARY_EXTRAS_IDS.includes(extra.id)
  );

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 pb-32">
      <Helmet>
        <title>Jawai Safari Experiences & Add-ons | Village Walk, Trekking & More</title>

        <meta
          name="description"
          content="Enhance your Jawai leopard safari with curated experiences like village walks, guided trekking, bird watching, photography assistance, and cultural evenings."
        />

        <meta
          name="keywords"
          content="Jawai safari experiences, Jawai safari add-ons, village walk Jawai, trekking Jawai safari, bird watching Jawai, photography safari Jawai"
        />

        <link
          rel="canonical"
          href="https://www.jawaiunfiltered.com/price-calculator/extras"
        />

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: "https://www.jawaiunfiltered.com/",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Jawai Safari Planner",
                item: "https://www.jawaiunfiltered.com/price-calculator",
              },
              {
                "@type": "ListItem",
                position: 3,
                name: "Safari Experiences",
                item: "https://www.jawaiunfiltered.com/price-calculator/extras",
              },
            ],
          })}
        </script>
      </Helmet>

      {/* Experience Focus selector UI */}
      <div className="mb-6 flex flex-wrap gap-3">
        {["Calm & Relaxed", "Nature & Culture", "Adventure", "Photography"].map(
          (label) => (
            <button
              key={label}
              type="button"
              className="cursor-pointer rounded-full border border-gray-300 px-4 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {label}
            </button>
          )
        )}
      </div>

      {/* Primary Experiences */}
      <h2 className="mb-4 text-lg font-semibold text-gray-900">
        Primary Experiences
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-6 gap-x-4">
        {primaryExtras.map((extra) => {
          const active = extras.includes(extra.id);
          const locked = isLocked(extra.id);

          return (
            <button
              key={extra.id}
              onClick={() => toggleExtra(extra)}
              disabled={locked}
              aria-pressed={active}
              aria-label={`Add ${extra.label} experience to Jawai safari`}
              className={`
                relative text-left p-6 rounded-xl border transition-all duration-300
                ${
                  active
                    ? "border-green-500 bg-green-50"
                    : "border-gray-200 bg-white hover:shadow-md hover:-translate-y-1"
                }
                ${locked ? "opacity-50 cursor-not-allowed" : ""}
              `}
            >
              <div className="flex items-start gap-3">
                <div className="text-3xl">{extra.icon}</div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">
                    {extra.label} – Jawai Safari Experience
                  </h3>
                  <p className="text-sm text-gray-500">{extra.desc}</p>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <span
                  className={`text-sm ${
                    active ? "text-gray-500" : "text-gray-400"
                  } font-medium`}
                >
                  {active
                    ? `Estimated add-on value: ₹${extra.price}`
                    : "View estimate after selection"}
                </span>
              </div>
              {locked && (
                <span className="text-xs text-red-500 font-medium">
                  Available when plan is customized
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* More Experiences */}
      {moreExtras.length > 0 && (
        <div className="mt-8">
          <button
            type="button"
            onClick={() => setShowMore(!showMore)}
            className="mb-4 text-sm font-semibold text-indigo-600 hover:underline focus:outline-none"
            aria-expanded={showMore}
          >
            {showMore ? "Hide More Experiences" : "Show More Experiences"}
          </button>

          {showMore && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-6 gap-x-4">
              {moreExtras.map((extra) => {
                const active = extras.includes(extra.id);
                const locked = isLocked(extra.id);

                return (
                  <button
                    key={extra.id}
                    onClick={() => toggleExtra(extra)}
                    disabled={locked}
                    aria-pressed={active}
                    aria-label={`Add ${extra.label} experience to Jawai safari`}
                    className={`
                      relative text-left p-6 rounded-xl border transition-all duration-300
                      ${
                        active
                          ? "border-green-500 bg-green-50"
                          : "border-gray-200 bg-white hover:shadow-md hover:-translate-y-1"
                      }
                      ${locked ? "opacity-50 cursor-not-allowed" : ""}
                    `}
                  >
                    <div className="flex items-start gap-3">
                      <div className="text-3xl">{extra.icon}</div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">
                          {extra.label} – Jawai Safari Experience
                        </h3>
                        <p className="text-sm text-gray-500">{extra.desc}</p>
                      </div>
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                      <span
                        className={`text-sm ${
                          active ? "text-gray-500" : "text-gray-400"
                        } font-medium`}
                      >
                        {active
                          ? `Estimated add-on value: ₹${extra.price}`
                          : "View estimate after selection"}
                      </span>
                    </div>
                    {locked && (
                      <span className="text-xs text-red-500 font-medium">
                        Available when plan is customized
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}

      {extras.length > 0 && (
        <div className="mt-6 p-4 rounded-lg bg-gray-100 text-sm text-gray-700">
          🎉 <strong>{extras.length}</strong> Jawai safari experience(s) added
        </div>
      )}

      {/* Reassurance block */}
      <div className="mt-6 rounded-lg bg-gray-50 p-4 text-gray-700 text-sm">
        💬 You can skip all of these.
        <br />
        We’ll help you decide later with a local expert.
      </div>
    </div>
  );
}