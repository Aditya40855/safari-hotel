// src/pages/SearchResults.jsx
import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { getHotelsByCity } from "../lib/api";
import { Helmet } from "react-helmet-async";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function SearchResults() {
  const q = useQuery();
  const city = q.get("city") || "";
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const pageTitle = city
    ? `Hotels in ${city} | Best Places to Stay in ${city} Rajasthan`
    : "Hotel Search Results | Jawai Unfiltered";

  const pageDescription = city
    ? `Discover verified hotels in ${city}, Rajasthan near leopard safari zones. Compare prices, ratings, and book trusted stays with Jawai Unfiltered.`
    : "Search verified hotels across Jawai with transparent pricing and trusted listings.";

  const canonicalUrl = city
    ? `https://jawaiunfiltered.com/search?city=${encodeURIComponent(city)}`
    : "https://jawaiunfiltered.com/search";

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
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <link rel="canonical" href={canonicalUrl} />
        {hotels.length === 0 && <meta name="robots" content="noindex, follow" />}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": `Which hotels are best in ${city || "Jawai"}?`,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": `The best hotels in ${city || "Jawai"} include verified boutique lodges and luxury stays near leopard safari zones, offering comfort, safety, and guided experiences.`
                }
              },
              {
                "@type": "Question",
                "name": `Are hotels in ${city || "Jawai"} safe for families?`,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": `Yes, most hotels in ${city || "Jawai"} listed on Jawai Unfiltered are family-friendly, secure, and well-reviewed by travelers.`
                }
              },
              {
                "@type": "Question",
                "name": `How close are hotels in ${city || "Jawai"} to leopard safari areas?`,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": `Many hotels in ${city || "Jawai"} are located within minutes of popular leopard safari zones, making them ideal for wildlife enthusiasts.`
                }
              }
            ]
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://jawaiunfiltered.com/"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Search",
                "item": "https://jawaiunfiltered.com/search"
              },
              ...(city
                ? [
                    {
                      "@type": "ListItem",
                      "position": 3,
                      "name": city,
                      "item": canonicalUrl
                    }
                  ]
                : [])
            ]
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "url": "https://jawaiunfiltered.com/",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://jawaiunfiltered.com/search?city={search_term_string}",
              "query-input": "required name=search_term_string"
            }
          })}
        </script>
      </Helmet>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl sm:text-3xl font-bold mb-3">
          {city
            ? `Best Hotels in ${city}, Rajasthan`
            : "Search Hotels in Jawai"}
        </h1>
        <p className="text-gray-600 mb-6 max-w-3xl">
          {city
            ? `Explore handpicked hotels in ${city} near leopard safari zones. Compare prices, ratings, and book verified stays trusted by wildlife travelers.`
            : "Search verified hotels across Jawai with transparent pricing and trusted listings."}
        </p>

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
                    alt={`${h.name} hotel in ${city || "Jawai"}, Rajasthan near leopard safari`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
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

        {city && hotels.length > 0 && (
          <section className="mt-16 bg-white rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-3">
              Why stay in {city}, Rajasthan?
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {city} is renowned for its granite hills, leopard safaris, and serene
              wilderness experiences. Staying in a well-located hotel in {city}
              allows travelers to enjoy guided safaris, peaceful nature views, and
              authentic Rajasthani hospitality while remaining close to major safari
              zones.
            </p>
          </section>
        )}
      </div>
    </div>
  );
}