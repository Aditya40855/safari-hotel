// src/pages/SearchResults.jsx
import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { getHotelsByCity } from "../lib/api";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function SearchResults() {
  const q = useQuery();
  const city = q.get("city") || "";
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;
    async function load() {
      if (!city) {
        setHotels([]);
        return;
      }
      setLoading(true);
      setError("");
      try {
        const data = await getHotelsByCity(city);
        if (!mounted) return;
        setHotels(data || []);
      } catch (err) {
        console.error("search results error", err);
        if (mounted) setError(err.message || "Failed to load results");
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => (mounted = false);
  }, [city]);

  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl sm:text-3xl font-bold mb-3">
          Search results {city ? `for "${city}"` : ""}
        </h1>

        {loading ? (
          <div className="py-8 text-center">Loading results…</div>
        ) : error ? (
          <div className="text-red-600">{error}</div>
        ) : hotels.length === 0 ? (
          <div className="text-gray-600">No hotels found. Try another city.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {hotels.map((h) => (
              <article key={h.id} className="bg-white rounded-lg shadow p-4 flex flex-col">
                <div className="w-full h-40 sm:h-48 rounded overflow-hidden">
                  <img
                    src={h.images?.[0] || h.img || "/images/placeholder.jpg"}
                    alt={h.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="mt-3 flex-1">
                  <h3 className="font-semibold text-lg">{h.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Rating: {h.rating} · From ₹{h.price}
                  </p>
                </div>
                <div className="mt-4 flex gap-2">
                  <Link
                    to={`/hotels/${h.id}`}
                    className="flex-1 py-2 text-center rounded bg-orange-600 text-white"
                  >
                    View
                  </Link>
                  <button
                    className="flex-1 py-2 text-center rounded border border-gray-300"
                    onClick={() => {
                      // quick booking stub — later open modal or go to booking flow
                      alert(`Start booking for ${h.name}`);
                    }}
                  >
                    Book
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}