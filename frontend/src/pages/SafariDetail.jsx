import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getSafariById } from "../lib/api";
import BookingWidgetSafariSingleDay from "../components/BookingWidgetSafariSingleDay";
import ReviewSection from "../components/ReviewSection"; // Import Reviews
import { API_BASE } from '../lib/api';
import { useAuth } from "../context/AuthContext";
import Price from "../components/Price";
import { Helmet } from "react-helmet-async";


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

  // --- SEO HELPER CONSTANTS ---
  const seoTitle = `${safari.name || safari.title} Safari in Jawai | Jawai Unfiltered`;
  const safeDescription = safari.description ? safari.description.replace(/(<([^>]+)>)/gi, "").trim() : "";
  const seoDescription = safeDescription.length > 155 ? safeDescription.slice(0, 152) + "..." : (safeDescription || "Experience the best safari tours in Jawai with Jawai Unfiltered.");
  const canonicalUrl = window.location.origin + window.location.pathname;
  const imageUrl = mainImg.startsWith("http") ? mainImg : window.location.origin + mainImg;

  const jsonLdTouristAttraction = {
    "@context": "https://schema.org",
    "@type": "TouristAttraction",
    "name": safari.name || safari.title,
    "description": safeDescription || "Experience the best safari tours in Jawai with Jawai Unfiltered.",
    "image": [imageUrl],
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Jawai",
      "addressRegion": "Rajasthan",
      "addressCountry": "India"
    },
    "provider": {
      "@type": "Organization",
      "name": "Jawai Unfiltered"
    },
    "offers": {
      "@type": "Offer",
      "price": finalPrice.toString(),
      "priceCurrency": "INR",
      "availability": "https://schema.org/InStock"
    }
  };

  const jsonLdBreadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": window.location.origin + "/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Safaris",
        "item": window.location.origin + "/safaris"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": safari.name || safari.title,
        "item": canonicalUrl
      }
    ]
  };

  return (
    <div className="max-w-6xl mx-auto p-6 grid md:grid-cols-2 gap-8 py-12">
      <Helmet>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={seoDescription} />
        <meta property="og:type" content="article" />
        <meta property="og:image" content={imageUrl} />
        <meta property="og:url" content={canonicalUrl} />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">{JSON.stringify(jsonLdTouristAttraction)}</script>
        <script type="application/ld+json">{JSON.stringify(jsonLdBreadcrumb)}</script>
      </Helmet>
      
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

      {/* FAQ Section */}
      <section className="col-span-1 md:col-span-2 mt-8 pt-8 border-t" aria-labelledby="faq-heading">
        <h2 id="faq-heading" className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
        <details className="mb-3">
          <summary className="cursor-pointer font-medium">What is the typical duration of the safari?</summary>
          <p className="mt-2 text-gray-700">The safari duration varies but typically lasts between 3 to 6 hours depending on the package selected.</p>
        </details>
        <details className="mb-3">
          <summary className="cursor-pointer font-medium">How do I book a safari?</summary>
          <p className="mt-2 text-gray-700">You can book your safari seat using the booking widget on this page. Select your preferred date and complete the booking form.</p>
        </details>
        <details className="mb-3">
          <summary className="cursor-pointer font-medium">When is the best time to visit Jawai for a safari?</summary>
          <p className="mt-2 text-gray-700">The best time to visit Jawai for a safari is from October to March when the weather is pleasant and wildlife sightings are more frequent.</p>
        </details>
        <details className="mb-3">
          <summary className="cursor-pointer font-medium">How will I receive confirmation of my booking?</summary>
          <p className="mt-2 text-gray-700">After booking, you will receive a confirmation email with your safari details and contact information for the agent.</p>
        </details>
      </section>
      
    </div>
  );
}