import { Helmet } from "react-helmet-async";

export default function SafariStep({ selectedSafariId, onSelect, constraints }) {
    const options = [
      {
        id: "morning",
        title: "Morning Leopard Safari",
        emoji: "🌄",
        desc: "Best natural light, peaceful environment, and higher chances of leopard sightings.",
        price: "₹4,000 – ₹5,000 / Safari",
      },
      {
        id: "evening",
        title: "Evening Leopard Safari",
        emoji: "🌅",
        desc: "Golden-hour landscapes, dramatic sunsets, and active wildlife movement.",
        price: "₹4,500 – ₹6,000 / Safari",
      },
      {
        id: "private",
        title: "Private Jeep Safari",
        emoji: "👑",
        desc: "Exclusive jeep, flexible timing, private guide, and premium comfort.",
        price: "₹8,000 – ₹12,000 / Safari",
        premium: true,
      },
    ];
  
    const allowedIds = constraints?.safaris?.allowed || [];
    const lockedIds = constraints?.safaris?.locked || [];

    const isLocked = (id) => lockedIds.includes(id);
  
    return (
      <div className="max-w-5xl mx-auto px-4 py-10">
        <Helmet>
          <title>Jawai Leopard Safari Options | Morning, Evening & Private Safari</title>

          <meta
            name="description"
            content="Choose your Jawai leopard safari experience including morning safari, evening safari, or private jeep safari. Compare prices, comfort, and wildlife experience."
          />

          <meta
            name="keywords"
            content="Jawai leopard safari, Jawai safari options, morning leopard safari Jawai, evening safari Jawai, private jeep safari Jawai"
          />

          <link
            rel="canonical"
            href="https://www.jawaiunfiltered.com/price-calculator/safari"
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
                  name: "Safari Experience",
                  item: "https://www.jawaiunfiltered.com/price-calculator/safari",
                },
              ],
            })}
          </script>
        </Helmet>
        {/* Header */}
        <div className="text-center mb-4">
          <h1 className="text-lg font-semibold text-gray-800">
            Choose Your Jawai Leopard Safari Experience
          </h1>
          <p className="mt-1 text-sm text-gray-500 max-w-xl mx-auto">
            Select one safari option below. This will define the core experience of your Jawai journey.
          </p>
          <p className="sr-only">
            Jawai leopard safari experiences include guided morning safaris, evening
            safaris with sunset landscapes, and private jeep safaris offering exclusive
            wildlife tracking near Jawai hills in Rajasthan.
          </p>
        </div>
  
        {/* Safari Options Container */}
        <div className="bg-gray-50 p-6 rounded-3xl">
          {/* Safari Options */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {options.map((opt) => {
              const isSelected = selectedSafariId === opt.id;
              const locked = isLocked(opt.id);
      
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => {
                    if (locked) return;
                    onSelect && onSelect(opt.id);
                  }}
                  disabled={locked}
                  aria-pressed={isSelected}
                  aria-label={`Select ${opt.title} for Jawai leopard safari`}
                  className={`
                    relative text-left p-6 rounded-2xl border transition-shadow duration-200
                    bg-white shadow-sm
                    hover:shadow-md
                    ${
                      isSelected
                        ? "border-green-600 bg-green-50"
                        : "border-gray-200"
                    }
                    ${locked ? "opacity-50 cursor-not-allowed" : ""}
                  `}
                >
                  {/* Premium Badge */}
                  {opt.premium && (
                    <span className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
                      Premium
                    </span>
                  )}
      
                  {/* Title with Emoji Badge */}
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-2xl">
                      {opt.emoji}
                    </div>
                    <h3 className="text-md font-semibold text-gray-900">
                      {opt.title} in Jawai
                    </h3>
                  </div>
      
                  {/* Description */}
                  <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                    {opt.desc}
                  </p>
      
                  {/* Price */}
                  <div className="text-green-700 font-semibold text-sm">
                    {opt.price} · Jawai Leopard Safari
                  </div>
                  {locked && (
                    <p className="mt-2 text-xs text-red-500 font-medium">
                      Increase budget to unlock this Jawai safari option
                    </p>
                  )}
      
                  {/* Selected Indicator */}
                  {isSelected && (
                    <div className="absolute top-4 right-4 bg-green-600 text-white text-xs font-medium px-3 py-1 rounded-full select-none">
                      Selected
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
  
        {/* Footer Status */}
        <div className="mt-8 text-center">
          {selectedSafariId ? (
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-green-50 text-green-700 text-xs font-medium">
              ✅ Safari selected. You can continue customizing your package.
            </div>
          ) : (
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-100 text-gray-600 text-xs">
              👉 Please select one safari option to continue.
            </div>
          )}
        </div>
      </div>
    );
  }