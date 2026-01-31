import { useState, useEffect } from "react";
import stays from "../data/stays";

export default function StayStep({ selectedStayId, onSelect, constraints }) {
  const [activeId, setActiveId] = useState(selectedStayId || null);

  useEffect(() => {
    if (selectedStayId !== activeId) {
      setActiveId(selectedStayId || null);
    }
  }, [selectedStayId]);

  const allowedIds = constraints?.stays?.allowed || [];
  const lockedIds = constraints?.stays?.locked || [];

  const isLocked = (id) => lockedIds.includes(id);

  const handleSelect = (stay) => {
    if (isLocked(stay.id)) return;
    setActiveId(stay.id);
    if (onSelect) onSelect(stay.id);
  };

  return (
    <div className="w-full">
      <div className="bg-slate-50 rounded-3xl p-7 space-y-6">
        <p className="text-xs text-slate-500 mb-2">
          You can change this later. Pricing is adjusted after expert review.
        </p>
        {stays.map((stay) => {
          const isActive = activeId === stay.id;
          const locked = isLocked(stay.id);

          return (
            <button
              key={stay.id}
              type="button"
              onClick={() => handleSelect(stay)}
              disabled={locked}
              aria-pressed={isActive}
              aria-label={`Select ${stay.name} stay for Jawai safari`}
              className={`
                relative w-full text-left rounded-3xl p-7 transition
                border flex flex-col gap-3
                ${isActive
                  ? "border-emerald-600 bg-gradient-to-br from-emerald-50 to-white text-slate-900 shadow-lg shadow-emerald-100 scale-[1.01]"
                  : "border-slate-200 bg-white text-slate-700"
                }
                ${locked ? "opacity-40" : "active:scale-[0.99]"}
              `}
            >
              <div className="flex items-center justify-between">
                <div className="flex flex-col gap-2">
                  <h3 className="text-sm font-semibold">
                    {stay.name}
                  </h3>
                  {stay.id === "eco" && (
                    <span className="inline-flex items-center gap-2 text-[11px] font-medium px-2 py-1 rounded-full bg-emerald-50 text-emerald-700">
                      Best for nature lovers · Simple & peaceful
                    </span>
                  )}
                  {stay.id === "heritage" && (
                    <span className="inline-flex items-center gap-2 text-[11px] font-medium px-2 py-1 rounded-full bg-blue-50 text-blue-700">
                      Most chosen · Authentic Jawai experience
                    </span>
                  )}
                  {stay.id === "luxury" && (
                    <span className="inline-flex items-center gap-2 text-[11px] font-medium px-2 py-1 rounded-full bg-amber-50 text-amber-700">
                      Premium comfort · Private sit-outs & dining
                    </span>
                  )}
                </div>
              </div>

              {stay.description && (
                <p className={`text-xs leading-snug text-slate-500`}>
                  {stay.description}
                </p>
              )}

              {locked && (
                <p className="text-[11px] text-amber-600 font-medium">
                  Unlocks with higher comfort preference
                </p>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}