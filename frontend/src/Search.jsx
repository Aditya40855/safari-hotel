import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getHotelsByCity, getCities } from "../lib/api";
import SafeImage from "@/components/SafeImage"

export default function Search() {
  const [allHotels, setAllHotels] = useState([]);
  const [filteredHotels, setFilteredHotels] = useState([]);
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedCity, setSelectedCity] = useState("");
  const [maxPrice, setMaxPrice] = useState(100000); 

  useEffect(() => {
    async function loadData() {
      try {
        const [citiesData, hotelsData] = await Promise.all([getCities(), getHotelsByCity("")]);
        setCities(citiesData);
        setAllHotels(hotelsData);
        setFilteredHotels(hotelsData);
      } catch (err) { console.error(err); } 
      finally { setLoading(false); }
    }
    loadData();
  }, []);

  useEffect(() => {
    let result = [...allHotels];
    if (selectedCity) result = result.filter(h => h.city_slug === selectedCity);
    result = result.filter(h => h.price <= maxPrice);
    setFilteredHotels(result);
  }, [selectedCity, maxPrice, allHotels]);

  if (loading) return <div className="p-10 text-center">Loading...</div>;

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Find your stay</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* SIDEBAR */}
        <div className="lg:col-span-1 bg-white p-6 rounded-lg shadow h-fit">
          <h3 className="font-bold mb-4">Filters</h3>
          <div className="mb-4">
            <label className="block text-sm mb-2">City</label>
            <select className="w-full border p-2 rounded" value={selectedCity} onChange={e => setSelectedCity(e.target.value)}>
              <option value="">All Cities</option>
              {cities.map(c => <option key={c.slug} value={c.slug}>{c.name}</option>)}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm mb-2">Max Price: ₹{maxPrice}</label>
            <input type="range" min="0" max="100000" step="1000" value={maxPrice} onChange={e => setMaxPrice(Number(e.target.value))} className="w-full" />
          </div>
        </div>

        {/* RESULTS */}
        <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredHotels.length === 0 ? <p>No hotels match filters.</p> : filteredHotels.map(h => (
            <Link key={h.id} to={`/hotels/${h.id}`} className="bg-white shadow rounded-lg overflow-hidden block">
              <SafeImage
                src={h.images && h.images[0]}
                fallback="/images/hotel-placeholder.jpg"
                className="h-48 w-full object-cover"
              />
              <div className="p-4">
                <h3 className="font-bold">{h.name}</h3>
                <p className="text-orange-600 font-bold">₹{h.price}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}