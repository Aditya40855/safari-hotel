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
      <div className="mb-4">
        <h2 className="text-base font-semibold text-slate-900">
          Choose Your Jawai Safari Stay
        </h2>
        <p className="text-xs text-emerald-600 mt-0.5">
          🌿 Near prime leopard territory
        </p>
        <p className="sr-only">
          Select from curated Jawai safari stays including eco lodges,
          heritage properties, and nature resorts located near prime
          leopard safari zones in Jawai, Rajasthan.
        </p>
      </div>

      <div className="space-y-3">
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
                relative w-full text-left rounded-2xl p-4 transition
                border flex flex-col gap-2
                ${isActive
                  ? "border-emerald-600 bg-emerald-600 text-white shadow-lg"
                  : "border-slate-200 bg-slate-50"
                }
                ${locked ? "opacity-40" : "active:scale-[0.99]"}
              `}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-semibold">
                    {stay.name} – Jawai Safari Stay
                  </h3>
                  <p className={`text-xs font-medium ${isActive ? "text-emerald-200" : "text-slate-500"}`}>
                    ₹{stay.price} per night · Jawai safari nature stay
                  </p>
                </div>

                {isActive && (
                  <span className="text-[11px] px-2 py-0.5 rounded-full bg-white/90 text-slate-900 font-semibold">
                    ✓ Selected
                  </span>
                )}
              </div>

              {stay.description && (
                <p className={`text-xs leading-relaxed ${isActive ? "text-emerald-100" : "text-slate-600"}`}>
                  {stay.description}
                </p>
              )}

              {locked && (
                <p className="text-[11px] text-amber-600 font-medium">
                  Available with higher Jawai safari comfort package
                </p>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}