import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getHotelById } from "../lib/api";
import BookingWidget from "../components/BookingWidget";
import Modal from "../components/Modal";
import ReviewSection from "../components/ReviewSection";
import SEO from "../components/SEO"; 
import SafeImage from "@/components/SafeImage";
import Price from "../components/Price";


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
  let mainImg = hotel.images && hotel.images[0];
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
      "addressRegion": "Rajasthan",
      "addressCountry": "IN"
    },
    "url": `https://jawaiunfiltered.com/hotels/${hotel.slug}`,
    "amenityFeature": [
      {
        "@type": "LocationFeatureSpecification",
        "name": "Free Parking",
        "value": true
      },
      {
        "@type": "LocationFeatureSpecification",
        "name": "Breakfast Included",
        "value": true
      },
      {
        "@type": "LocationFeatureSpecification",
        "name": "Free WiFi",
        "value": true
      }
    ],
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
      {/* DELETE the two separate SEO components and replace with this ONE */}
<SEO 
  title={`${hotel.name} - Leopard Safari Stay & Luxury Heritage Hotel in Jawai Bandh, Rajasthan`}
  description={`Book your stay at ${hotel.name}, a luxury hotel and heritage stay in Jawai Bandh, Rajasthan. Experience the best leopard safari stay with comfort and elegance.`}
  url={`https://jawaiunfiltered.com/hotels/${hotel.slug}`} // Use the dynamic hotel slug
  image={mainImg}
  schema={hotelSchema}
/>

      <div>
        <div className="w-full h-80 bg-gray-100 rounded overflow-hidden mb-4 border relative">
          <SafeImage 
            src={mainImg}
            alt={`${hotel.name} luxury hotel in Jawai Rajasthan`}
            className="object-cover w-full h-full"
            // SEO: Eager load main image for LCP score
            loading="eager"
            fetchPriority="high"
            fallback="/images/hotel-placeholder.jpg"
            itemProp="image"
          />
        </div>

        <section itemScope itemType="https://schema.org/Hotel">
          <h1 className="text-2xl font-bold" itemProp="name">{hotel.name}</h1>
          <div className="mt-2 text-gray-600 capitalize">City: {hotel.city_slug}</div>
          <div className="mt-4 text-gray-800 leading-relaxed" itemProp="description">{hotel.description}</div>
          <p className="mt-4 text-sm text-gray-700">
            Explore nearby <Link to="/safaris" className="underline text-blue-600 hover:text-blue-800">Jawai Leopard Safari</Link> or browse other <Link to="/hotels" className="underline text-blue-600 hover:text-blue-800">Luxury Hotels in Jawai</Link>.
          </p>
        </section>
      </div>

      <div>
        <div className="bg-white rounded-lg shadow p-4 border sticky top-24">
          <div className="flex items-center justify-between">
            <div>
              <Price
                price={Number(hotel.price)}
                discount={hotel.discount_percent || 0}
              />
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
            <BookingWidget itemId={hotel.id} type="hotel" pricePerNight={
              hotel.discount_percent
                ? Math.round(hotel.price - (hotel.price * hotel.discount_percent) / 100)
                : hotel.price
            } />
          </div>
        </div>
      </div>

      {/* Modal for Mobile/Popup Booking */}
      <Modal open={bookOpen} onClose={() => setBookOpen(false)} title={`Book ${hotel.name}`}>
        <BookingWidget
          itemId={hotel.id}
          type="hotel"
          pricePerNight={
            hotel.discount_percent
              ? Math.round(hotel.price - (hotel.price * hotel.discount_percent) / 100)
              : hotel.price
          }
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