// src/pages/Safaris.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getSafaris } from "../lib/api";
import SafeImage from "../components/SafeImage";

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
          <span className="font-bold text-orange-600">
            ₹{s.price || "—"}
          </span>
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

  return (
    <div className="min-h-screen bg-gray-50 pt-8 pb-12">
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