import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// Fix: Merged imports and used the correct path (../../ matches your folder structure)
import { deleteSafari, getSafaris,deleteHotel, getAuthToken, API_BASE, updateHotelDiscount, updateSafariDiscount } from "../../lib/api";

export default function AdminInventory() {
  const [hotels, setHotels] = useState([]);
  const [safaris, setSafaris] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      setLoading(true);

      // 1. FETCH HOTELS
      // We use the direct URL to ensure we get the raw list, bypassing any frontend filters
      const hotelRes = await fetch(`${API_BASE}/hotels`);
      if (hotelRes.ok) {
        const hotelData = await hotelRes.json();
        setHotels(hotelData || []);
      }

      // 2. FETCH SAFARIS
      const safarisData = await getSafaris();
      setSafaris(safarisData || []);

    } catch (err) {
      console.error("Failed to load inventory:", err);
      alert("Error loading data. Check console.");
    } finally {
      setLoading(false);
    }
  }

  // --- DELETE HANDLERS ---
  async function handleDeleteHotel(id) {
    if (!window.confirm("⚠️ Are you sure? This will delete this hotel permanently.")) return;
  
    try {
      await deleteHotel(id); // ✅ USE api.js (correct path, auth, base URL)
      setHotels(prev => prev.filter(h => h.id !== id));
      alert("Hotel deleted successfully.");
    } catch (err) {
      alert("Failed to delete hotel: " + err.message);
    }
  }

  async function handleDeleteSafari(id) {
    if (!window.confirm("⚠️ Are you sure? This will delete this safari permanently.")) return;
    try {
      await deleteSafari(id);
      setSafaris(prev => prev.filter(s => s.id !== id));
      alert("Safari deleted successfully.");
    } catch (err) {
      alert("Error: " + err.message);
    }
  }

  // --- DISCOUNT HANDLERS ---
  async function handleHotelDiscountBlur(id, value) {
    const discount = Math.min(100, Math.max(0, Number(value) || 0));
    try {
      await updateHotelDiscount(id, discount);
      setHotels(prev => prev.map(h => h.id === id ? { ...h, discount_percent: discount } : h));
    } catch (err) {
      alert("Failed to update hotel discount: " + err.message);
    }
  }

  async function handleSafariDiscountBlur(id, value) {
    const discount = Math.min(100, Math.max(0, Number(value) || 0));
    try {
      await updateSafariDiscount(id, discount);
      setSafaris(prev => prev.map(s => s.id === id ? { ...s, discount_percent: discount } : s));
    } catch (err) {
      alert("Failed to update safari discount: " + err.message);
    }
  }

  if (loading) return <div className="p-10 text-center text-gray-500">Loading inventory...</div>;

  return (
    <div className="max-w-6xl mx-auto p-6 min-h-screen bg-gray-50 font-sans">
      
      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Inventory Manager</h1>
          <p className="text-gray-500 text-sm mt-1">Manage all your listings in one place</p>
        </div>
        <Link to="/admin/bookings" className="bg-white border border-gray-300 px-4 py-2 rounded-lg shadow-sm hover:bg-gray-50 text-gray-700 font-medium transition">
          ← Back to Dashboard
        </Link>
      </div>

      {/* --- HOTELS SECTION --- */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-10 overflow-hidden">
        <div className="p-5 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
          <h2 className="text-lg font-bold text-gray-800">Hotels <span className="text-gray-400 text-sm font-normal">({hotels.length})</span></h2>
          <Link to="/admin/hotels/new" className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-black transition flex items-center gap-2">
            <span>+</span> Add Hotel
          </Link>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-100 text-gray-500 text-xs uppercase font-semibold tracking-wider">
              <tr>
                <th className="p-4">Name</th>
                <th className="p-4">Price</th>
                <th className="p-4">Discount (%)</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {hotels.length === 0 ? (
                <tr><td colSpan="4" className="p-8 text-center text-gray-400 italic">No hotels found.</td></tr>
              ) : (
                hotels.map(h => {
                  return (
                    <tr key={h.id} className="hover:bg-gray-50 transition duration-150">
                      <td className="p-4">
                        <div className="font-bold text-gray-900">{h.name}</div>
                        <div className="text-xs text-gray-500 capitalize">{h.city_slug || "Jawai"}</div>
                      </td>
                      <td className="p-4 font-medium text-gray-700">₹{h.price.toLocaleString()}</td>
                      <td className="p-4">
                        <input
                          type="number"
                          min="0"
                          max="100"
                          defaultValue={h.discount_percent ?? 0}
                          onBlur={(e) => handleHotelDiscountBlur(h.id, e.target.value)}
                          className="w-20 border border-gray-300 rounded px-2 py-1 text-sm"
                        />
                      </td>
                      <td className="p-4 text-right">
                        <button 
                          onClick={() => handleDeleteHotel(h.id)} 
                          className="text-red-600 bg-red-50 border border-red-100 hover:bg-red-600 hover:text-white px-3 py-1.5 rounded-md text-xs font-bold transition uppercase tracking-wide"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- SAFARIS SECTION --- */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-5 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
          <h2 className="text-lg font-bold text-gray-800">Safaris <span className="text-gray-400 text-sm font-normal">({safaris.length})</span></h2>
          <Link to="/admin/safaris/new" className="bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-orange-700 transition flex items-center gap-2">
            <span>+</span> Add Safari
          </Link>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-100 text-gray-500 text-xs uppercase font-semibold tracking-wider">
              <tr>
                <th className="p-4">Name</th>
                <th className="p-4">Price</th>
                <th className="p-4">Discount (%)</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {safaris.length === 0 ? (
                <tr><td colSpan="4" className="p-8 text-center text-gray-400 italic">No safaris found.</td></tr>
              ) : (
                safaris.map(s => {
                   return (
                    <tr key={s.id} className="hover:bg-gray-50 transition duration-150">
                      <td className="p-4">
                        <div className="font-bold text-gray-900">{s.name || s.title}</div>
                        <div className="text-xs text-gray-500">{s.duration || "N/A"}</div>
                      </td>
                      <td className="p-4 font-medium text-gray-700">₹{s.price.toLocaleString()}</td>
                      <td className="p-4">
                        <input
                          type="number"
                          min="0"
                          max="100"
                          defaultValue={s.discount_percent ?? 0}
                          onBlur={(e) => handleSafariDiscountBlur(s.id, e.target.value)}
                          className="w-20 border border-gray-300 rounded px-2 py-1 text-sm"
                        />
                      </td>
                      <td className="p-4 text-right">
                        <button 
                          onClick={() => handleDeleteSafari(s.id)} 
                          className="text-red-600 bg-red-50 border border-red-100 hover:bg-red-600 hover:text-white px-3 py-1.5 rounded-md text-xs font-bold transition uppercase tracking-wide"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}