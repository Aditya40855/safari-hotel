import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getSafaris, getHotelsByCity, getCities } from "../lib/api";
import SEO from "../components/SEO"; // <--- 1. Import SEO Component
import { API_BASE } from '../lib/api';
import SafeImage from "../components/SafeImage";


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
      {/* Tab Switcher */}
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

      {/* Input & Button */}
      <form onSubmit={handleSearch} className="relative w-full">
        <select 
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="w-full h-14 bg-white text-gray-900 font-bold text-base md:text-lg rounded-xl pl-4 pr-32 outline-none shadow-xl focus:ring-4 focus:ring-orange-500/30 appearance-none cursor-pointer"
        >
          <option value="">Select Destination</option>
          {cities.map(c => <option key={c.slug} value={c.slug}>{c.name}</option>)}
        </select>
        
        {/* Custom Arrow */}
        <div className="absolute right-36 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 text-xs hidden md:block">▼</div>

        <button className="absolute right-1 top-1 bottom-1 bg-gray-900 hover:bg-black text-white font-bold px-6 rounded-lg transition shadow-md text-sm md:text-base">
          Search
        </button>
      </form>
    </div>
  );
}

// --- COMPONENT: STABLE CARD (Fixed Sizing Issues) ---
function StableCard({ item, type }) {
  let img = (item.images && item.images[0]) || (type === 'hotel' ? "/images/hotel-placeholder.jpg" : "/images/safari-placeholder.jpg");
  if (typeof img === 'string' && img.startsWith('/uploads')) {
      img = `${API_BASE}${img}`;
  }

  return (
    <Link 
      // Use slug if available, otherwise fallback to ID
      to={`/${type}s/${item.slug || item.id}`}
      // Using 'h-full' to make sure all cards in a row are same height
      // Using 'min-w' to ensure they don't squish on mobile
      className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 h-full min-w-[280px] md:min-w-0 snap-center"
    >
      {/* Image Container - Aspect Ratio 4:3 keeps it consistent */}
      <div className="relative aspect-[4/3] w-full bg-gray-200 overflow-hidden">
        <SafeImage 
          src={img} 
          alt={`Luxury stay at ${item.name} in ${item.city_slug} Rajasthan`}
          loading="lazy" 
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700"
          onError={(e) => e.target.src = "/images/placeholder.jpg"}
        />
        
        {/* Badge */}
        <div className={`absolute top-3 left-3 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider shadow-sm text-white ${
            type === 'safari' ? 'bg-green-600' : 'bg-blue-600'
        }`}>
           {type === 'safari' ? 'Adventure' : 'Hotel'}
        </div>
      </div>

      {/* Content Container - Flex-1 ensures it pushes footer to bottom */}
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

        <div className="pt-3 border-t border-gray-100 flex items-center justify-between mt-auto">
           <div>
             <span className="text-[10px] text-gray-400 font-bold uppercase block">Price</span>
             <span className="font-bold text-lg text-gray-900">₹{item.price.toLocaleString()}</span>
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

  // 2. Define SEO Schema (The "Brain" for Google)
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

  useEffect(() => {
    async function loadData() {
      try {
        const [c, s, h] = await Promise.all([
          getCities(),
          getSafaris(),
          getHotelsByCity("")
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
    <main className="min-h-screen bg-gray-50 font-sans text-gray-900 pb-20">
      
      {/* 3. Inject SEO Tags */}
      <SEO 
        title="Book Leopard Safaris & Luxury Stays in Jawai"
        description="The #1 platform for Jawai Leopard Safaris. Book expert guides and heritage resorts instantly. Verified listings and secure payment."
        schema={homeSchema}
      />
      
      {/* 1. COMPACT DARK HERO SECTION */}
      {/* Reduced padding (py-16) so it's not too big */}
      <section className="bg-slate-900 py-16 px-4 md:px-6 rounded-b-[2rem] shadow-lg mb-12">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-orange-400 font-bold text-xs uppercase tracking-widest mb-4 block">
            Welcome to Rajasthan
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-4 leading-tight">
            Jawai <span className="text-orange-500">Unfiltered.</span>
          </h1>
          <p className="text-gray-400 text-base md:text-lg mb-8 max-w-2xl mx-auto">
            Book authentic leopard safaris and premium heritage stays instantly.
          </p>

          <HeroSearch cities={cities} />
        </div>
      </section>

      {/* 2. SAFARI SECTION (Clean Spacing) */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 mb-16">
        <div className="flex justify-between items-end mb-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Trending Safaris</h2>
            <p className="text-gray-500 text-sm mt-1">Explore the wild with experts.</p>
          </div>
          <Link to="/safaris" className="text-orange-600 font-bold text-sm hover:underline">
            View All &rarr;
          </Link>
        </div>

        {/* Mobile: Horizontal Scroll | Desktop: Grid of 4 */}
        <div className="flex overflow-x-auto gap-4 pb-4 -mx-4 px-4 md:mx-0 md:px-0 md:pb-0 md:grid md:grid-cols-2 lg:grid-cols-4 snap-x scrollbar-hide">
          {loading ? (
            [1,2,3,4].map(i => <div key={i} className="min-w-[280px] h-80 bg-gray-200 rounded-2xl animate-pulse"></div>)
          ) : (
            safaris.map(s => <StableCard key={s.id} item={s} type="safari" />)
          )}
        </div>
      </section>

      {/* 3. HOTEL SECTION */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 mb-16">
        <div className="flex justify-between items-end mb-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Premium Stays</h2>
            <p className="text-gray-500 text-sm mt-1">Relax in heritage luxury.</p>
          </div>
          <Link to="/hotels" className="text-blue-600 font-bold text-sm hover:underline">
            View All &rarr;
          </Link>
        </div>

        {/* Mobile: Horizontal Scroll | Desktop: Grid of 4 */}
        <div className="flex overflow-x-auto gap-4 pb-4 -mx-4 px-4 md:mx-0 md:px-0 md:pb-0 md:grid md:grid-cols-2 lg:grid-cols-4 snap-x scrollbar-hide">
          {loading ? (
             [1,2,3,4].map(i => <div key={i} className="min-w-[280px] h-80 bg-gray-200 rounded-2xl animate-pulse"></div>)
          ) : hotels.length === 0 ? (
             <div className="w-full col-span-4 p-6 text-center text-gray-400 italic border border-dashed rounded-xl">No hotels found.</div>
          ) : (
             hotels.map(h => <StableCard key={h.id} item={h} type="hotel" />)
          )}
        </div>
      </section>

      {/* 4. FOOTER TRUST GRID */}
      <section className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm grid md:grid-cols-3 gap-8 text-center">
           <div>
             <div className="text-3xl mb-3">🛡️</div>
             <h3 className="font-bold text-gray-900">Verified Listings</h3>
             <p className="text-gray-500 text-sm mt-1">Every property checked personally.</p>
           </div>
           <div>
             <div className="text-3xl mb-3">💬</div>
             <h3 className="font-bold text-gray-900">Local Support</h3>
             <p className="text-gray-500 text-sm mt-1">We are based in Rajasthan.</p>
           </div>
           <div>
             <div className="text-3xl mb-3">⚡</div>
             <h3 className="font-bold text-gray-900">Instant Booking</h3>
             <p className="text-gray-500 text-sm mt-1">Secure your spot instantly.</p>
           </div>
        </div>
      </section>

    </main>
  );
}