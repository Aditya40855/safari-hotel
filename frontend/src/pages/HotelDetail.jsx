import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getHotelById } from "../lib/api";
import BookingWidget from "../components/BookingWidget";
import Modal from "../components/Modal";
import ReviewSection from "../components/ReviewSection";
import SEO from "../components/SEO"; 
import { API_BASE } from '../lib/api';


export default function HotelDetail() {
  const { id } = useParams();
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookOpen, setBookOpen] = useState(false);
  const [error, setError] = useState("");

  

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    getHotelById(id)
      .then((h) => { if (mounted) setHotel(h); })
      .catch((err) => {
        console.error("hotel load error", err);
        if (mounted) setError("Could not load hotel");
      })
      .finally(() => { if (mounted) setLoading(false); });

    return () => (mounted = false);
  }, [id]);

  if (loading) return <div className="p-6">Loading…</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;
  if (!hotel) return <div className="p-6">Not found</div>;

  // --- SMART IMAGE URL FIX ---
  let mainImg = (hotel.images && hotel.images[0]) || "/images/hotel-placeholder.jpg";
 
  
  if (mainImg.startsWith("/uploads")) {
    mainImg = `${API_BASE}${mainImg}`;
  }
  // ---------------------------

  // --- 2. SEO SCHEMA (Google Rich Snippets) ---
  const hotelSchema = {
    "@context": "https://schema.org",
    "@type": "Hotel",
    "name": hotel.name,
    "description": hotel.description,
    "image": [mainImg],
    "priceRange": `₹${hotel.price}`,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": hotel.city_slug,
      "addressCountry": "IN"
    },
    // Only add rating schema if a rating exists
    ...(hotel.rating && {
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": hotel.rating,
        "reviewCount": "12" // Placeholder or dynamic if you have review count
      }
    })
  };

  return (
    <div className="max-w-5xl mx-auto p-6 grid md:grid-cols-2 gap-6">
      
      {/* 3. Inject SEO Tags */}
      <SEO 
        title={`${hotel.name} - Luxury Stay in ${hotel.city_slug}`}
        description={`Book your stay at ${hotel.name}. Experience luxury in ${hotel.city_slug} starting from ₹${hotel.price}. Verified reviews and instant booking.`}
        image={mainImg}
        schema={hotelSchema}
      />
      <SEO 
        title="Luxury Stays & Heritage Hotels in Jawai" 
        description="Browse the best resorts, camps, and heritage hotels in Jawai. Compare prices, view photos, and book authentic stays instantly."
        url="https://safariandhotels.com/hotels"
      />

      <div>
        <div className="w-full h-80 bg-gray-100 rounded overflow-hidden mb-4 border relative">
          <img 
            src={mainImg} 
            alt={hotel.name} 
            className="object-cover w-full h-full"
            // SEO: Eager load main image for LCP score
            loading="eager"
            fetchPriority="high"
            onError={(e) => {
                e.target.onerror = null; 
                e.target.src = "/images/hotel-placeholder.jpg"; 
            }} 
          />
        </div>

        <h1 className="text-2xl font-bold">{hotel.name}</h1>
        <div className="mt-2 text-gray-600 capitalize">City: {hotel.city_slug}</div>
        <div className="mt-4 text-gray-800 leading-relaxed">{hotel.description}</div>
      </div>

      <div>
        <div className="bg-white rounded-lg shadow p-4 border sticky top-24">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-semibold">₹{hotel.price.toLocaleString()}</div>
              <div className="text-sm text-gray-600">
                 Rating: <span className="font-bold text-orange-600">{hotel.rating || "New"}</span>
              </div>
            </div>

            <button onClick={() => setBookOpen(true)}
                    className="bg-orange-600 text-white px-6 py-2 rounded hover:bg-orange-700 transition font-bold shadow-md">
              Book Now
            </button>
          </div>

          <div className="mt-6 border-t pt-4">
            <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
               🔒 Secure Booking
            </h3>
            {/* Inline Widget */}
            <BookingWidget itemId={hotel.id} type="hotel" pricePerNight={hotel.price} />
          </div>
        </div>
      </div>

      {/* Modal for Mobile/Popup Booking */}
      <Modal open={bookOpen} onClose={() => setBookOpen(false)} title={`Book ${hotel.name}`}>
        <BookingWidget
          itemId={hotel.id}
          type="hotel"
          pricePerNight={hotel.price}
          onBooked={() => setBookOpen(false)}
        />
      </Modal>

      {/* Reviews Section - Full Width */}
      <div className="md:col-span-2 mt-8 pt-8 border-t">
        <h2 className="text-xl font-bold mb-6">Guest Reviews</h2>
        <ReviewSection type="hotel" itemId={hotel.id} />
      </div>
      
    </div>
  );
}