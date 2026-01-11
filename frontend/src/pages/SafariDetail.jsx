import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getSafariById } from "../lib/api";
import BookingWidgetSafariSingleDay from "../components/BookingWidgetSafariSingleDay";
import ReviewSection from "../components/ReviewSection"; // Import Reviews
import { API_BASE } from '../lib/api';
import { useAuth } from "../context/AuthContext";
import Price from "../components/Price";


export default function SafariDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [safari, setSafari] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError("");

    getSafariById(id)
      .then((data) => { if (mounted) setSafari(data || null); })
      .catch((err) => {
        console.error("Failed to load safari:", err);
        if (mounted) setError("Could not load safari details.");
      })
      .finally(() => mounted && setLoading(false));

    return () => { mounted = false; };
  }, [id]);

  if (loading) return <div className="p-12 text-center text-gray-500">Loading safari details…</div>;
  if (error) return <div className="max-w-3xl mx-auto p-6 text-red-600">{error}</div>;
  if (!safari) return <div className="max-w-3xl mx-auto p-6">Safari not found</div>;

  const discount = Number(safari.discount_percent || safari.discount || 0);
  const finalPrice =
    discount > 0
      ? Math.round(safari.price - (safari.price * discount) / 100)
      : safari.price;

  // --- IMAGE RESOLUTION (SAFE & CONSISTENT) ---
  const ASSET_BASE =
    window.location.hostname === "localhost"
      ? "http://localhost:4000"
      : "";

  let mainImg =
    Array.isArray(safari?.images) && safari.images.length > 0
      ? safari.images[0]
      : "/images/safari-placeholder.jpg";

  if (typeof mainImg === "string" && mainImg.startsWith("/uploads")) {
    mainImg = `${ASSET_BASE}${mainImg}`;
  }

  return (
    <div className="max-w-6xl mx-auto p-6 grid md:grid-cols-2 gap-8 py-12">
      
      {/* LEFT COLUMN: Image & Info */}
      <div>
        <div className="w-full h-80 sm:h-96 bg-gray-100 rounded-xl overflow-hidden shadow-sm border mb-6">
          <img
            src={mainImg}
            alt={safari.name || safari.title || "Safari"}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = "/images/safari-placeholder.jpg";
            }}
          />
        </div>

        <h1 className="text-3xl font-bold text-gray-900">{safari.name || safari.title}</h1>
        <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
            <span className="bg-orange-100 text-orange-800 px-2 py-0.5 rounded capitalize">
                {safari.city_slug}
            </span>
            <span>⏱ {safari.duration}</span>
        </div>

        <div className="mt-6 prose text-gray-700 leading-relaxed">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">About this experience</h3>
          <p>{safari.description || "No description provided."}</p>
        </div>
      </div>

      {/* RIGHT COLUMN: Booking Widget */}
      <div className="relative">
        <div className="sticky top-24 bg-white border rounded-xl p-6 shadow-lg">
          <div className="flex justify-between items-end mb-6 border-b pb-4">
             <div>
                <span className="text-gray-500 text-sm">Price per Safari</span>
                <Price price={safari.price} discount={discount} />
             </div>
             <div className="text-green-600 text-sm font-medium bg-green-50 px-2 py-1 rounded">
                Available
             </div>
          </div>
          
          <h3 className="text-lg font-semibold mb-4">Book your seat</h3>

          <BookingWidgetSafariSingleDay
      // THE FIX: The key ensures the form resets on login/logout
      key={user ? user.id : "guest-safari"} 
      itemId={safari.id}
      price={finalPrice}
      onBooked={() => navigate("/bookings")}
    />
          
          <p className="text-xs text-gray-400 mt-4 text-center">
            Book Now And Our Agent Will Connect you shortly.
          </p>
        </div>
      </div>

      {/* --- REVIEWS SECTION (Full Width at Bottom) --- */}
      <div className="col-span-1 md:col-span-2 mt-8 pt-8 border-t">
         <ReviewSection type="safari" itemId={safari.id} />
      </div>
      {/* --------------------------------------------- */}
      
    </div>
  );
}