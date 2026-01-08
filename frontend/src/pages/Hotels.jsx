import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { getCities, getAuthToken } from "../lib/api";
import { API_BASE } from '../lib/api';
import SafeImage from "@/components/SafeImage";

// --- REUSABLE HOTEL CARD (Styled exactly like SafariCard) ---
function HotelCard({ hotel }) {
  let img = "/images/hotel-placeholder.jpg";
  if (hotel.images && hotel.images.length > 0) {
    const firstImg = Array.isArray(hotel.images) ? hotel.images[0] : hotel.images;
    if (firstImg && typeof firstImg === 'string') {
      if (firstImg.startsWith('/uploads')) img = `${API_BASE}${firstImg}`;
      else img = firstImg;
    }
  }

  return (
    <div className="bg-white rounded-xl shadow p-4 flex flex-col border">
      <div className="w-full h-52 bg-gray-100 rounded overflow-hidden relative border-b">
        <SafeImage
          src={img}
          alt={hotel.name}
          className="object-cover w-full h-full hover:scale-105 transition duration-500"
        />
        <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
          Per Night
        </div>
      </div>

      <div className="mt-3 flex-1">
        <h3 className="font-semibold text-lg">{hotel.name}</h3>
        <p className="text-sm text-gray-600 mt-1">
          City: <span className="capitalize">{hotel.city_slug}</span> • <span className="font-bold text-orange-600">₹{hotel.price?.toLocaleString() || "—"}</span>
        </p>
        <p className="text-sm text-gray-500 mt-2 line-clamp-2">{hotel.description}</p>
      </div>

      <div className="mt-4 flex gap-2">
        <Link
          to={`/hotels/${hotel.id}`}
          className="flex-1 py-2 text-center bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition font-medium"
        >
          View Details
        </Link>
        <Link
          to={`/hotels/${hotel.id}`}
          className="flex-1 py-2 text-center bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition font-medium"
        >
          Book Now
        </Link>
      </div>
    </div>
  );
}

export default function Hotels() {
  const [allHotels, setAllHotels] = useState([]);
  const [filteredHotels, setFilteredHotels] = useState([]);
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const isAdmin = !!getAuthToken(); 
  
  const [searchParams] = useSearchParams();
  const initialCity = searchParams.get("city") || "";

  const [selectedCity, setSelectedCity] = useState(initialCity);
  const [maxPrice, setMaxPrice] = useState(100000); 

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    const cityFromUrl = searchParams.get("city");
    if (cityFromUrl) setSelectedCity(cityFromUrl);
  }, [searchParams]);

  async function loadData() {
    try {
      setLoading(true);
      const hotelRes = await fetch(`${API_BASE}/hotels`);
      if (!hotelRes.ok) throw new Error("Failed to load hotels");
      const hotelsData = await hotelRes.json();
      const citiesData = await getCities();

      setCities(citiesData || []);
      setAllHotels(hotelsData || []);
      setFilteredHotels(hotelsData || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!allHotels) return;
    let result = [...allHotels];
    if (selectedCity) {
      result = result.filter(h => h.city_slug === selectedCity);
    }
    result = result.filter(h => (h.price || 0) <= maxPrice);
    setFilteredHotels(result);
  }, [selectedCity, maxPrice, allHotels]);

  if (loading) return <div className="min-h-screen bg-gray-50 pt-8 pb-12 text-center py-12 text-gray-500">Loading your sanctuary...</div>;

  return (
    <div className="min-h-screen bg-gray-50 pt-8 pb-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* HEADER SECTION (Safari Style) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Luxury Stays</h1>
            <p className="text-gray-600">Find the perfect heritage stay in {selectedCity ? cities.find(c=>c.slug===selectedCity)?.name : "Rajasthan"}.</p>
          </div>
          
          {/* FILTERS INTEGRATED INTO UI */}
          <div className="flex flex-wrap items-center gap-4 bg-white p-4 rounded-xl shadow-sm border">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Location</label>
              <select 
                className="border border-gray-200 p-2 rounded text-sm bg-gray-50 outline-none"
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
              >
                <option value="">All Locations</option>
                {cities.map(c => <option key={c.slug} value={c.slug}>{c.name}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Max Price: ₹{maxPrice.toLocaleString()}</label>
              <input 
                type="range" min="0" max="100000" step="1000" 
                value={maxPrice} onChange={e => setMaxPrice(Number(e.target.value))} 
                className="w-32 md:w-48 accent-orange-600 cursor-pointer"
              />
            </div>
            
            <button onClick={loadData} className="text-sm text-orange-600 hover:underline font-medium mt-4 md:mt-0">Refresh</button>
          </div>
        </div>

        {/* RESULTS SECTION */}
        {filteredHotels.length === 0 ? (
          <div className="text-gray-600 bg-white p-8 rounded shadow text-center border">
             <h3 className="text-lg font-semibold">No properties found</h3>
             <p className="text-gray-500 mt-1">Try changing your location or filters.</p>
             {isAdmin && <Link to="/admin/inventory" className="block mt-4 text-orange-600 font-medium">Manage Inventory</Link>}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredHotels.map((hotel) => (
              <HotelCard key={hotel.id} hotel={hotel} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}