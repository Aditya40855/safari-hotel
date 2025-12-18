import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom"; // Added useSearchParams
import { getCities, getAuthToken } from "../lib/api";
import { API_BASE } from '../lib/api';
import SafeImage from "../../components/SafeImage"



export default function Hotels() {
  const [allHotels, setAllHotels] = useState([]);
  const [filteredHotels, setFilteredHotels] = useState([]);
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const isAdmin = !!getAuthToken(); 
  
  // URL Param Logic
  const [searchParams] = useSearchParams();
  const initialCity = searchParams.get("city") || "";

 

  const [selectedCity, setSelectedCity] = useState(initialCity); // Set initial value from URL
  const [maxPrice, setMaxPrice] = useState(100000); 

  useEffect(() => {
    loadData();
  }, []);

  // Update selected city if URL changes
  useEffect(() => {
    const cityFromUrl = searchParams.get("city");
    if (cityFromUrl) setSelectedCity(cityFromUrl);
  }, [searchParams]);

  async function loadData() {
    try {
      setLoading(true);
      const hotelRes = await fetch(`${API_BASE}/api/hotels`);
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

  if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="animate-pulse text-xl font-serif text-stone-600">Loading your sanctuary...</div></div>;

  return (
    <div className="min-h-screen bg-stone-50 font-serif"> {/* Changed font to serif for 'calm' look */}
      
      {/* HEADER */}
      <div className="bg-white border-b border-stone-100 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-medium text-stone-900">Stays in {selectedCity ? cities.find(c=>c.slug===selectedCity)?.name : "Rajasthan"}</h1>
            <p className="text-sm text-stone-500 font-sans">{filteredHotels.length} properties found</p>
          </div>
          <button onClick={loadData} className="text-sm text-orange-700 hover:underline font-sans">Refresh</button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* SIDEBAR */}
        <div className="hidden lg:block lg:col-span-1 space-y-8">
          <div className="sticky top-32 bg-white p-6 rounded-xl shadow-sm border border-stone-100">
              <h3 className="font-bold text-stone-800 mb-6 font-sans uppercase tracking-wide text-xs">Filter By</h3>
              
              <div className="mb-6">
                <label className="block text-sm text-stone-600 mb-2 font-sans">Location</label>
                <select 
                  className="w-full border border-stone-200 p-2 rounded bg-stone-50 text-stone-700 focus:ring-1 focus:ring-orange-200 outline-none font-sans"
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                >
                  <option value="">All Locations</option>
                  {cities.map(c => <option key={c.slug} value={c.slug}>{c.name}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-sm text-stone-600 mb-2 font-sans">
                  Max Price: ₹{maxPrice.toLocaleString()}
                </label>
                <input 
                  type="range" min="0" max="100000" step="1000" 
                  value={maxPrice} onChange={e => setMaxPrice(Number(e.target.value))} 
                  className="w-full accent-orange-700 cursor-pointer"
                />
              </div>
          </div>
        </div>

        {/* RESULTS */}
        <div className="lg:col-span-3">
          {filteredHotels.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-xl border border-stone-100">
               <h3 className="text-xl text-stone-800">No properties found</h3>
               <p className="text-stone-500 mt-2 font-sans">Try changing your location or filters.</p>
               {isAdmin && <Link to="/admin/inventory" className="block mt-4 text-orange-700 font-sans">Manage Inventory</Link>}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredHotels.map((hotel) => {
                 let img = "/images/hotel-placeholder.jpg";
                 if (hotel.images && hotel.images.length > 0) {
                    const firstImg = Array.isArray(hotel.images) ? hotel.images[0] : hotel.images;
                    if (firstImg && typeof firstImg === 'string') {
                        if (firstImg.startsWith('/uploads')) img = `${API_BASE}${firstImg}`;
                        else img = firstImg;
                    }
                 }

                 return (
                  <Link 
                    key={hotel.id} 
                    to={`/hotels/${hotel.id}`} 
                    className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-500 ease-out"
                  >
                    <div className="relative h-64 overflow-hidden">
                      <SafeImage src={img} alt={hotel.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-1000 ease-in-out" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-60"></div>
                      <div className="absolute bottom-4 left-4 text-white">
                        <div className="text-xs font-bold uppercase tracking-widest mb-1 opacity-90">{hotel.city_slug}</div>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-medium text-stone-900 mb-2 group-hover:text-orange-800 transition">{hotel.name}</h3>
                      <p className="text-stone-500 text-sm line-clamp-2 mb-4 font-sans leading-relaxed">{hotel.description}</p>
                      <div className="flex justify-between items-center pt-4 border-t border-stone-100 font-sans">
                         <span className="text-stone-900 font-semibold">₹{hotel.price.toLocaleString()} <span className="text-xs font-normal text-stone-500">/ night</span></span>
                         <span className="text-orange-700 text-sm font-medium group-hover:translate-x-1 transition-transform">Explore &rarr;</span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}