// src/pages/Safaris.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getSafaris } from "../lib/api";
import SafeImage from "../components/SafeImage";
import Price from "../components/Price";
import { Helmet } from "react-helmet-async";

// ASSET BASE
// Local  → http://localhost:4000
// Prod   → same origin (empty string works)
const ASSET_BASE =
  typeof window !== "undefined" && window.location.hostname === "localhost"
    ? "http://localhost:4000"
    : "";

/* ----------------------------- */
/* SAFARI CARD                   */
/* ----------------------------- */
function SafariCard({ s }) {
  // --- Normalize images ---
  let images = [];

  if (Array.isArray(s.images)) {
    images = s.images;
  } else if (typeof s.images === "string") {
    try {
      images = JSON.parse(s.images);
    } catch {
      images = [];
    }
  }

  // --- Pick image or fallback ---
  let img =
    images.length > 0
      ? images[0]
      : "/images/safari-placeholder.jpg";

  // --- Prefix uploads correctly ---
  if (typeof img === "string" && img.startsWith("/uploads")) {
    img = `${ASSET_BASE}${img}`;
  }

  return (
    <div className="bg-white rounded-xl shadow p-4 flex flex-col border">
      <div className="w-full h-52 bg-gray-100 rounded overflow-hidden relative border-b">
        <SafeImage
          src={img}
          alt={s.name || s.title || "Safari"}
          className="object-cover w-full h-full hover:scale-105 transition duration-500"
          loading="lazy"
        />

        {s.duration && (
          <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
            {s.duration}
          </div>
        )}
      </div>

      <div className="mt-3 flex-1">
        <h3 className="font-semibold text-lg">
          {s.name || s.title}
        </h3>

        <p className="text-sm text-gray-600 mt-1">
          City:{" "}
          <span className="capitalize">{s.city_slug}</span> •{" "}
          <div className="mt-1">
            <Price
              price={Number(s.price)}
              discount={s.discount_percent || 0}
            />
          </div>
        </p>

        <p className="text-sm text-gray-500 mt-2 line-clamp-2">
          {s.description}
        </p>
      </div>

      <div className="mt-4 flex gap-2">
        <Link
          to={`/safaris/${s.id}`}
          className="flex-1 py-2 text-center bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition font-medium"
        >
          View Details
        </Link>

        <Link
          to={`/safaris/${s.id}`}
          className="flex-1 py-2 text-center bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition font-medium"
        >
          Book Now
        </Link>
      </div>
    </div>
  );
}

/* ----------------------------- */
/* SAFARIS PAGE                  */
/* ----------------------------- */
export default function Safaris() {
  const [safaris, setSafaris] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError("");

    getSafaris()
      .then((list) => {
        if (!mounted) return;
        setSafaris(Array.isArray(list) ? list : []);
      })
      .catch((err) => {
        console.error("Failed to load safaris:", err);
        if (mounted) setError("Could not load safaris");
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  const canonicalUrl = typeof window !== "undefined" ? window.location.href : "https://www.example.com/safaris";

  // JSON-LD structured data
  const jsonLdCollectionPage = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Safari Adventures",
    "description": "Explore the wild with our expert-guided tours.",
    "url": canonicalUrl
  };

  const jsonLdItemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Safari Adventures List",
    "url": canonicalUrl,
    "itemListElement": safaris.map((s, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "url": `${canonicalUrl}/${s.id}`,
      "name": s.name || s.title || `Safari ${s.id}`
    }))
  };

  const jsonLdBreadcrumbList = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.example.com/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Safaris",
        "item": canonicalUrl
      }
    ]
  };

  // FAQPage schema
  const jsonLdFAQPage = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How can I book a safari tour?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "You can book a safari tour directly through our website by selecting your preferred safari and following the booking process."
        }
      },
      {
        "@type": "Question",
        "name": "Are the safari tours safe?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, all our safari tours are guided by experienced professionals who prioritize your safety and well-being throughout the trip."
        }
      },
      {
        "@type": "Question",
        "name": "What is the best time to go on a safari?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The best time for a safari depends on the region, but generally the dry season offers the best wildlife viewing opportunities."
        }
      },
      {
        "@type": "Question",
        "name": "What is included in the safari packages?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our safari packages typically include accommodation, guided tours, meals, and transportation within the safari area."
        }
      },
      {
        "@type": "Question",
        "name": "Can I customize my safari itinerary?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, we offer customizable safari itineraries to suit your preferences and interests."
        }
      }
    ]
  };

  // SearchAction schema
  const jsonLdSearchAction = {
    "@context": "https://schema.org",
    "@type": "SearchAction",
    "target": `${canonicalUrl}?search={search_term_string}`,
    "query-input": "required name=search_term_string"
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-8 pb-12">
      <Helmet>
        <title>Safari Adventures | Safari Tours, Wildlife Safaris & Jawai Experiences</title>
        <meta name="description" content="Discover amazing safari tours, wildlife safaris, and Jawai adventures with expert guides. Book your wild tour today and explore nature like never before." />
        <link rel="canonical" href={canonicalUrl} />
        {/* Open Graph tags */}
        <meta property="og:title" content="Safari Adventures | Safari Tours, Wildlife Safaris & Jawai Experiences" />
        <meta property="og:description" content="Discover amazing safari tours, wildlife safaris, and Jawai adventures with expert guides. Book your wild tour today and explore nature like never before." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={`${ASSET_BASE}/images/safari-placeholder.jpg`} />
        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Safari Adventures | Safari Tours, Wildlife Safaris & Jawai Experiences" />
        <meta name="twitter:description" content="Discover amazing safari tours, wildlife safaris, and Jawai adventures with expert guides. Book your wild tour today and explore nature like never before." />
        <meta name="twitter:image" content={`${ASSET_BASE}/images/safari-placeholder.jpg`} />
        {/* JSON-LD structured data */}
        <script type="application/ld+json">{JSON.stringify(jsonLdCollectionPage)}</script>
        <script type="application/ld+json">{JSON.stringify(jsonLdItemList)}</script>
        <script type="application/ld+json">{JSON.stringify(jsonLdBreadcrumbList)}</script>
        <script type="application/ld+json">{JSON.stringify(jsonLdFAQPage)}</script>
        <script type="application/ld+json">{JSON.stringify(jsonLdSearchAction)}</script>
      </Helmet>

      {/* Invisible semantic SEO section for rich keywords */}
      <section aria-hidden="true" className="sr-only">
        <h2>Safari Adventures Keywords</h2>
        <p>
          Safari, wildlife tours, guided safaris, nature exploration, adventure travel, eco-tourism, safari booking, wild tours, safari destinations, safari packages, safari holidays, safari experiences, safari vacations, safari tours, safari wildlife, safari lodges, safari guides, safari trips, safari expeditions.
        </p>
      </section>

      {/* Additional hidden semantic SEO section with internal-link-style keyword phrases */}
      <section aria-hidden="true" className="sr-only">
        <h2>Internal Link Keywords</h2>
        <p>
          Safari Tours in Jawai, Book Wildlife Safaris, Best Safari Packages, Guided Safari Trips, Affordable Safari Holidays, Luxury Safari Lodges, Safari Tour Deals, Family Safari Adventures, Eco-Friendly Safari Tours, Safari Vacation Planning.
        </p>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold mb-2">
          Safari Adventures
        </h1>

        <p className="text-gray-600 mb-8">
          Explore the wild with our expert-guided tours.
        </p>

        {loading ? (
          <div className="text-center py-12 text-gray-500">
            Loading adventures…
          </div>
        ) : error ? (
          <div className="bg-red-50 text-red-600 p-4 rounded">
            {error}
          </div>
        ) : safaris.length === 0 ? (
          <div className="text-gray-600 bg-white p-8 rounded shadow text-center">
            No safaris available right now.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {safaris.map((s) => (
              <SafariCard key={s.id} s={s} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}