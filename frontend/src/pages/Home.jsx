import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getSafaris, getHotels, getCities } from "../lib/api";
import SEO from "../components/SEO"; // <--- 1. Import SEO Component
import SafeImage from "@/components/SafeImage";
import Price from "@/components/Price";
import { Zap, Eye, X, Clock, ArrowRight, ChevronRight } from "lucide-react";

// --- COMPONENT: ADMIN-ONLY VISITOR COUNTER ---
function AdminVisitorCounter() {
  const [visitors, setVisitors] = useState(12);
  const isAdmin = localStorage.getItem('is_admin') === 'true'; 

  useEffect(() => {
    if (!isAdmin) return;
    const interval = setInterval(() => {
      setVisitors(Math.floor(Math.random() * (25 - 8 + 1)) + 8);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAdmin]);

  if (!isAdmin) return null;

  return (
    <div className="fixed top-24 right-6 z-[9999] animate-pulse">
      <div className="bg-gray-900/90 backdrop-blur-md text-white px-4 py-2 rounded-full border border-orange-500/50 shadow-2xl flex items-center gap-2">
        <div className="h-2 w-2 bg-green-500 rounded-full animate-ping"></div>
        <span className="text-[10px] font-black uppercase tracking-tighter">
          Admin View: {visitors} Active Visitors
        </span>
      </div>
    </div>
  );
}

// --- COMPONENT: STICKY MOBILE BOOKING BAR ---
/*function StickyBookingBar({ price = 4000 }) {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-[9998] animate-in slide-in-from-bottom-full duration-500">
      <div className="bg-white/95 backdrop-blur-xl border-t border-gray-100 p-4 shadow-[0_-10px_40px_rgba(0,0,0,0.1)] flex items-center justify-between">
        <div className="flex flex-col">
          <div className="flex items-center gap-1">
            <span className="text-[10px] font-black text-orange-600 uppercase tracking-tighter">Starting from</span>
            <div className="h-1 w-1 bg-green-500 rounded-full animate-pulse"></div>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-xl font-black text-gray-900">₹{price.toLocaleString()}</span>
            <span className="text-[10px] text-gray-400 font-bold">/SAFARI</span>
          </div>
        </div>
        <button 
          onClick={() => window.location.href = "https://wa.me/919351411559?text=I'd%20like%20to%20book%20a%20Safari"}
          className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-2xl font-black text-sm flex items-center gap-2 shadow-lg shadow-orange-500/30 active:scale-95 transition-all"
        >
          <Zap size={16} fill="currentColor" />
          BOOK NOW
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}*/

// --- COMPONENT: URGENCY PLUS (Live Activity Pulse) ---
function LiveIncentive() {
  const [show, setShow] = useState(false);
  const [closed, setClosed] = useState(false);
  const [currentMsg, setCurrentMsg] = useState(0);

  const messages = [
    {
      tag: "High Demand",
      text: "5 people booked a leopard safari in the last 2 hours.",
      cta: "Check remaining spots",
      icon: <Zap size={18} fill="currentColor" />,
      color: "text-orange-600",
      bg: "bg-orange-100"
    },
    {
      tag: "Live Sighting",
      text: "Leopard spotted near Jawai Dam 15 mins ago! 🐾",
      cta: "Get exact location",
      icon: <Eye size={18} />,
      color: "text-green-600",
      bg: "bg-green-100"
    },
    {
      tag: "Limited Space",
      text: "Only 2 Luxury Tents left for this weekend.",
      cta: "Secure your stay",
      icon: <Clock size={18} />,
      color: "text-blue-600",
      bg: "bg-blue-100"
    }
  ];

  useEffect(() => {
    setCurrentMsg(Math.floor(Math.random() * messages.length));
    const timer = setTimeout(() => setShow(true), 6000);
    return () => clearTimeout(timer);
  }, []);

  if (!show || closed) return null;
  const msg = messages[currentMsg];

  return (
    <div className="fixed bottom-24 left-4 md:left-8 z-[9999] animate-in slide-in-from-left-10 duration-700 max-w-[280px]">
      <div className="bg-white/95 backdrop-blur-md border-l-4 border-orange-600 p-4 rounded-r-2xl shadow-2xl flex items-start gap-3 relative">
        <button 
          onClick={() => setClosed(true)} 
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
          aria-label="Close notification"
        >
          <X size={14} />
        </button>
        <div className={`${msg.bg} ${msg.color} p-2 rounded-full animate-pulse shrink-0`}>
          {msg.icon}
        </div>
        <div>
          <p className={`text-[10px] font-black uppercase tracking-widest leading-none mb-1 ${msg.color}`}>
            {msg.tag}
          </p>
          <p className="text-xs font-bold text-gray-800 leading-tight">
            {msg.text}
          </p>
          <a 
            href={`https://wa.me/919351411559?text=Interested%20in:%20${encodeURIComponent(msg.text)}`} 
            target="_blank"
            rel="noreferrer"
            className="mt-2 text-[11px] font-bold text-orange-600 flex items-center gap-1 hover:underline"
          >
            {msg.cta} <ArrowRight size={12} />
          </a>
        </div>
      </div>
    </div>
  );
}

// --- COMPONENT: HERO SEARCH ---
function HeroSearch({ cities }) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("safari"); 
  const [city, setCity] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    const route = activeTab === "safari" ? "/safaris" : "/hotels";
    navigate(city ? `${route}?city=${city}` : route);
  };

  return (
    <div className="w-full max-w-xl mx-auto mt-8">
      <div className="flex justify-center gap-2 mb-4">
        <button 
          type="button"
          onClick={() => setActiveTab("safari")}
          className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${activeTab === "safari" ? "bg-orange-600 text-white" : "bg-white/10 text-gray-500 hover:bg-white/20"}`}
        >
          Jeep Safari
        </button>
        <button 
          type="button"
          onClick={() => setActiveTab("hotel")}
          className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${activeTab === "hotel" ? "bg-orange-600 text-white" : "bg-white/10 text-gray-500 hover:bg-white/20"}`}
        >
          Luxury Stay
        </button>
      </div>

      <form onSubmit={handleSearch} className="relative w-full">
        <select 
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="w-full h-14 bg-white text-gray-900 font-bold text-base md:text-lg rounded-xl pl-4 pr-32 outline-none shadow-xl focus:ring-4 focus:ring-orange-500/30 appearance-none cursor-pointer"
        >
          <option value="">Select Destination</option>
          {cities.map(c => <option key={c.slug} value={c.slug}>{c.name}</option>)}
        </select>
        <div className="absolute right-36 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 text-xs hidden md:block">▼</div>
        <button className="absolute right-1 top-1 bottom-1 bg-gray-900 hover:bg-black text-white font-bold px-6 rounded-lg transition shadow-md text-sm md:text-base">
          Search
        </button>
      </form>
    </div>
  );
}

// --- COMPONENT: STABLE CARD ---
function StableCard({ item, type }) {
  const images =
    typeof item.images === "string"
      ? JSON.parse(item.images || "[]")
      : item.images || [];

  return (
    <Link 
      to={`/${type}s/${item.slug || item.id}`}
      className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 h-full min-w-[280px] md:min-w-0 snap-center hover:-translate-y-1 hover:scale-[1.01] transition-transform duration-300"
    >
      <div className="relative aspect-[4/3] w-full bg-gray-200 overflow-hidden">
        <SafeImage
          src={images[0]}
          alt={`Luxury stay at ${item.name} in ${item.city_slug} Rajasthan`}
          fallback={type === "hotel" ? "/images/hotel-placeholder.jpg" : "/images/safari-placeholder.jpg"}
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700"
        />
        <div className={`absolute top-3 left-3 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider shadow-sm text-white ${
            type === 'safari' ? 'bg-green-600' : 'bg-blue-600'
        }`}>
           {type === 'safari' ? 'Adventure' : 'Hotel'}
        </div>
      </div>

      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-bold text-lg text-gray-900 leading-snug mb-1 line-clamp-2 group-hover:text-orange-600 transition-colors">
            {item.name || item.title}
        </h3>
        <p className="text-gray-500 text-xs font-medium uppercase mb-2">
            {type === 'safari' ? item.duration : item.city_slug}
        </p>
        <p className="text-gray-500 text-sm line-clamp-2 mb-4 flex-1">
          {item.description || "View details for more info."}
        </p>
        <div className="pt-3 border-t border-gray-200/60 flex items-center justify-between mt-auto">
           <div>
             <span className="text-[10px] text-gray-400 font-bold uppercase block">Price</span>
             <Price
               price={Number(item.price)}
               discount={item.discount_percent || 0}
             />
           </div>
           <span className="text-sm font-bold text-orange-600 bg-orange-50 px-3 py-1.5 rounded-lg group-hover:bg-orange-600 group-hover:text-white transition-colors">
             View
           </span>
        </div>
      </div>
    </Link>
  );
}

// --- MAIN PAGE ---
export default function Home() {
  const [cities, setCities] = useState([]);
  const [safaris, setSafaris] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);

  const homeSchema = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    "name": "Safari & Hotels Jawai",
    "description": "Premium leopard safaris and luxury hotel bookings in Jawai, Rajasthan.",
    "url": "https://safariandhotels.com",
    "telephone": "+919876543210",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Jawai",
      "addressRegion": "Rajasthan",
      "addressCountry": "IN"
    }
  };

  // --- SEO: BreadcrumbList Schema ---
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://safariandhotels.com/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Safaris",
        "item": "https://safariandhotels.com/safaris"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Hotels",
        "item": "https://safariandhotels.com/hotels"
      }
    ]
  };

  // --- SEO: Organization Schema ---
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Jawai Unfiltered Safaris",
    "url": "https://safariandhotels.com",
    "logo": "https://safariandhotels.com/logo.png",
    "sameAs": [
      "https://facebook.com/jawaiunfiltered",
      "https://instagram.com/jawaiunfiltered",
      "https://twitter.com/jawaiunfiltered"
    ],
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "telephone": "+919351411559",
        "contactType": "customer support",
        "areaServed": "IN",
        "availableLanguage": ["English", "Hindi"]
      }
    ]
  };

  // --- SEO: FAQPage Schema ---
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How do I book a Jawai leopard safari?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Jawai leopard safari booking is easy through our online platform. Simply select your preferred dates, choose your safari type, and secure your spot instantly. Our team will confirm your booking and provide all necessary details for your adventure."
        }
      },
      {
        "@type": "Question",
        "name": "What is the best time to visit Jawai for leopard sightings?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The best time to visit Jawai is between October and April, when the weather is pleasant and leopards are frequently spotted during safari drives. Early morning and late afternoon safaris offer the highest chances for wildlife sightings."
        }
      },
      {
        "@type": "Question",
        "name": "Are there luxury stays near Jawai Bandh?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, there are several luxury stays near Jawai Bandh, including heritage resorts and premium tented camps. Our curated selection features only the finest accommodations to ensure a memorable and comfortable wildlife experience."
        }
      }
    ]
  };

  // --- SEO: ItemList Schema for Safaris and Hotels ---
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Jawai Safaris and Luxury Hotels",
    "itemListElement": [
      {
        "@type": "TouristAttraction",
        "name": "Leopard Safari in Jawai",
        "url": "https://safariandhotels.com/safaris",
        "description": "Best leopard safari in Jawai Rajasthan with expert guides and private jeep options."
      },
      {
        "@type": "LodgingBusiness",
        "name": "Luxury Hotels near Jawai Bandh",
        "url": "https://safariandhotels.com/hotels",
        "description": "Luxury wildlife resorts and heritage stays near Jawai Bandh for a premium experience."
      },
      {
        "@type": "TouristAttraction",
        "name": "Private Jeep Safari Jawai",
        "url": "https://safariandhotels.com/safaris/private-jeep",
        "description": "Book a private jeep safari in Jawai for exclusive wildlife and leopard sightings."
      }
    ]
  };

  useEffect(() => {
    async function loadData() {
      try {
        const [c, s, h] = await Promise.all([
          getCities(),
          getSafaris(),
          getHotels()
        ]);
        setCities(c || []);
        setSafaris((s || []).slice(0, 4));
        setHotels((h || []).slice(0, 4));
      } catch (err) {
        console.error("Home Data Error:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  return (
    <main className="min-h-screen bg-gray-50 font-sans text-gray-900 pb-20 relative">
      <SEO 
        title="Book Leopard Safaris & Luxury Stays in Jawai"
        description="The #1 platform for Jawai Leopard Safaris. Book expert guides and heritage resorts instantly. Verified listings and secure payment."
        schema={homeSchema}
        extraSchema={[
          homeSchema,
          breadcrumbSchema,
          organizationSchema,
          faqSchema,
          itemListSchema
        ]}
      />
      
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-black py-14 md:py-20 px-4 md:px-6 rounded-b-[2.5rem] shadow-2xl mb-12 md:mb-16 transition-all">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-orange-400 font-bold text-xs uppercase tracking-widest mb-4 block">
            Welcome to Rajasthan
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-4 leading-tight tracking-tight animate-in fade-in slide-in-from-bottom-4 duration-700">
            Jawai <span className="text-orange-500">Unfiltered.</span>
          </h1>
          <p className="text-gray-300 text-base md:text-lg mb-10 max-w-2xl mx-auto animate-in fade-in duration-1000">
            Book authentic leopard safaris and premium heritage stays instantly.
          </p>
          <HeroSearch cities={cities} />
        </div>
      </section>


      <section className="max-w-7xl mx-auto px-4 md:px-6 mb-16">
        <div className="flex justify-between items-end mb-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 relative inline-block after:absolute after:left-0 after:-bottom-1 after:h-1 after:w-10 after:bg-orange-500 after:rounded-full">Trending Safaris</h2>
            <p className="text-gray-500 text-sm mt-1">Explore the wild with experts.</p>
          </div>
          <Link to="/safaris" className="text-orange-600 font-bold text-sm hover:underline">
            View All &rarr;
          </Link>
        </div>
        <div className="flex overflow-x-auto gap-4 pb-4 -mx-4 px-4 md:mx-0 md:px-0 md:pb-0 md:grid md:grid-cols-2 lg:grid-cols-4 snap-x scrollbar-hide">
          {loading ? (
            [1,2,3,4].map(i => <div key={i} className="min-w-[280px] h-80 bg-gray-200 rounded-2xl animate-pulse"></div>)
          ) : (
            safaris.map(s => <StableCard key={s.id} item={s} type="safari" />)
          )}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 md:px-6 mb-16">
        <div className="flex justify-between items-end mb-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 relative inline-block after:absolute after:left-0 after:-bottom-1 after:h-1 after:w-10 after:bg-orange-500 after:rounded-full">Premium Stays</h2>
            <p className="text-gray-500 text-sm mt-1">Relax in heritage luxury.</p>
          </div>
          <Link to="/hotels" className="text-blue-600 font-bold text-sm hover:underline">
            View All &rarr;
          </Link>
        </div>
        <div className="flex overflow-x-auto gap-4 pb-4 -mx-4 px-4 md:mx-0 md:px-0 md:pb-0 md:grid md:grid-cols-2 lg:grid-cols-4 snap-x scrollbar-hide">
          {loading ? (
             [1,2,3,4].map(i => <div key={i} className="min-w-[280px] h-80 bg-gray-200 rounded-2xl animate-pulse"></div>)
          ) : (
             hotels.map(h => <StableCard key={h.id} item={h} type="hotel" />)
          )}
        </div>
      </section>

      {/* Jawai Safari Calculator Entry */}
      <section
        className="max-w-5xl mx-auto px-4 md:px-6 mb-20 relative"
        aria-labelledby="jawai-safari-calculator-heading"
        itemScope
        itemType="https://schema.org/Service"
      >
        <meta itemProp="serviceType" content="Jawai Safari Cost Calculator" />
        <meta itemProp="areaServed" content="Jawai, Rajasthan, India" />

        <div className="rounded-3xl bg-gradient-to-br from-white via-white to-orange-50 border border-gray-200 shadow-xl p-6 md:p-10 text-center">

          <span className="inline-block mb-3 text-xs font-black uppercase tracking-widest text-orange-600">
            Safari Planner
          </span>

          <h2
            id="jawai-safari-calculator-heading"
            className="text-2xl md:text-3xl font-black text-gray-900 mb-3 leading-tight"
          >
            Calculate Your <span className="text-orange-600">Jawai Safari Cost</span>
          </h2>

          <p className="text-gray-600 text-sm md:text-base max-w-2xl mx-auto mb-10">
            Instantly estimate your Jawai leopard safari budget based on stay type,
            safari experience, number of guests, and comfort preferences — curated
            by local Jawai experts.
          </p>

          {/* Primary CTA */}
          <div className="flex justify-center mb-6">
            <Link
              to="/price-calculator"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-orange-600 hover:bg-orange-700 text-white font-black px-10 py-4 text-base shadow-lg shadow-orange-500/30 active:scale-95 transition-all"
              aria-label="Calculate Jawai Safari Price"
            >
              🧮 Calculate Jawai Safari
              <ArrowRight size={18} />
            </Link>
          </div>

          {/* Trust Signals */}
          <ul
            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm font-semibold text-gray-600"
            aria-label="Trust signals"
          >
            <li className="flex items-center gap-1">
              ⭐ Trusted by <strong>1,200+</strong> Jawai travelers
            </li>
            <li className="hidden sm:block text-gray-300">•</li>
            <li className="flex items-center gap-1">
              📍 Local experts based in Jawai
            </li>
            <li className="hidden sm:block text-gray-300">•</li>
            <li className="flex items-center gap-1">
              🚫 No third‑party resellers
            </li>
          </ul>

        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 md:px-6 mb-16">
  <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-black p-6 md:p-10 shadow-2xl">
    
    {/* subtle glow */}
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(249,115,22,0.25),_transparent_60%)] pointer-events-none" />

    <div className="relative z-10">
      <h2 className="text-center text-white text-xl md:text-2xl font-black mb-8 tracking-tight">
        Why travelers trust <span className="text-orange-500">Jawai Unfiltered</span>
      </h2>

      {/* Mobile: horizontal swipe | Desktop: grid */}
      <div className="flex md:grid md:grid-cols-3 gap-4 md:gap-8 overflow-x-auto md:overflow-visible snap-x snap-mandatory pb-4 scrollbar-hide">
        
        {/* Card 1 */}
        <div className="min-w-[260px] snap-center bg-white/95 backdrop-blur rounded-2xl p-6 text-center shadow-lg hover:scale-[1.03] transition-transform">
          <div className="h-12 w-12 mx-auto mb-4 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center text-2xl">
            🛡️
          </div>
          <h3 className="font-bold text-gray-900 mb-1">Verified Listings</h3>
          <p className="text-gray-500 text-sm leading-relaxed">
            Every safari & stay is personally checked by our local team.
          </p>
        </div>

        {/* Card 2 */}
        <div className="min-w-[260px] snap-center bg-white/95 backdrop-blur rounded-2xl p-6 text-center shadow-lg hover:scale-[1.03] transition-transform">
          <div className="h-12 w-12 mx-auto mb-4 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-2xl">
            💬
          </div>
          <h3 className="font-bold text-gray-900 mb-1">Local Support</h3>
          <p className="text-gray-500 text-sm leading-relaxed">
            We are based in Rajasthan — real people, real help .
          </p>
        </div>

        {/* Card 3 */}
        <div className="min-w-[260px] snap-center bg-white/95 backdrop-blur rounded-2xl p-6 text-center shadow-lg hover:scale-[1.03] transition-transform">
          <div className="h-12 w-12 mx-auto mb-4 rounded-full bg-yellow-100 text-yellow-600 flex items-center justify-center text-2xl">
            ⚡
          </div>
          <h3 className="font-bold text-gray-900 mb-1">Instant Booking</h3>
          <p className="text-gray-500 text-sm leading-relaxed">
            Lock your safari or stay instantly. No long calls.
          </p>
        </div>

      </div>
    </div>
  </div>

</section>

      {/* RENDER NEW INTERACTIVE ELEMENTS */}
      <LiveIncentive />
      <AdminVisitorCounter />

      {/* SEO: Hidden semantic section for search engines */}
      <section className="sr-only" aria-hidden="true">
        <h2>Jawai Leopard Safaris, Luxury Stays & Rajasthan Wildlife Tourism</h2>
        <p>
          Experience the thrill of authentic Jawai leopard safaris guided by local experts, and unwind in handpicked luxury resorts nestled in the heart of Rajasthan. Discover the unique biodiversity and mesmerizing landscapes of Jawai, where wildlife roams freely and every safari promises an unforgettable adventure. Our platform connects you with verified hotels and heritage stays, ensuring both comfort and safety. Trust Jawai Unfiltered for secure bookings, expert travel advice, and a seamless journey into Rajasthan’s wild beauty. Book your next wildlife escape with confidence and explore the best of Jawai’s safaris and luxury hospitality.
        </p>
        <p>
          Looking for the best leopard safari in Jawai? We offer easy Jawai Bandh safari booking, transparent Jawai safari price per person, and exclusive access to luxury wildlife resorts in Rajasthan. Choose from private jeep safari Jawai experiences or stay at the finest luxury hotels near Jawai Bandh for an unforgettable adventure in the heart of Rajasthan’s wilderness.
        </p>
      </section>
    </main>
  );
}