import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // <--- Import Link
import { listBookings, updateBookingStatus } from "../../lib/api";

export default function AdminBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      setLoading(true);
      const data = await listBookings();
      setBookings(data);
    } catch (err) {
      alert("Failed to load bookings");
    } finally {
      setLoading(false);
    }
  }

  async function handleStatus(id, newStatus) {
    if (!window.confirm(`Mark booking #${id} as ${newStatus}?`)) return;
    try {
      await updateBookingStatus(id, newStatus);
      setBookings(prev => prev.map(b => b.id === id ? { ...b, status: newStatus } : b));
    } catch (err) {
      alert("Failed to update status");
    }
  }

  if (loading) return <div className="p-8 text-center text-gray-500">Loading dashboard...</div>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      
      {/* --- NEW: DASHBOARD HEADER WITH BUTTONS --- */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-500 mt-1">Manage bookings and inventory</p>
        </div>
        <div className="flex gap-3">
        <Link to="/admin/inventory" className="bg-gray-800 text-white px-4 py-2 rounded">
     Manage Inventory
  </Link>
        </div>
        <div className="flex gap-3">
          <Link 
            to="/admin/hotels/new" 
            className="bg-blue-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition shadow-sm flex items-center gap-2"
          >
            <span>+</span> Add Hotel
          </Link>
          <Link 
            to="/admin/safaris/new" 
            className="bg-orange-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-orange-700 transition shadow-sm flex items-center gap-2"
          >
             <span>+</span> Add Safari
          </Link>
        </div>
      </div>
      {/* ------------------------------------------ */}

      <div className="bg-white rounded-xl shadow border overflow-hidden">
        <div className="p-4 border-b bg-gray-50">
          <h2 className="font-semibold text-gray-700">Recent Bookings</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50 uppercase font-semibold text-xs text-gray-700">
              <tr>
                <th className="px-6 py-4">ID</th>
                <th className="px-6 py-4">Guest</th>
                <th className="px-6 py-4">Item</th>
                <th className="px-6 py-4">Dates</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {bookings.length === 0 ? (
                <tr>
                  <td colSpan="6" className="p-8 text-center text-gray-400">
                    No bookings found.
                  </td>
                </tr>
              ) : (
                bookings.map((b) => (
                  <tr key={b.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 font-mono text-xs text-gray-400">#{b.id}</td>
                    <td className="px-6 py-4">
                      <div className="font-bold text-gray-900">{b.name || "Unknown"}</div>
                      <div className="text-xs text-gray-500">{b.contact}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="capitalize text-gray-900 font-medium">{b.booking_type}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span>{b.start_date}</span>
                        {b.booking_type === 'safari' && b.time_slot && (
                          <span className="text-xs font-bold text-indigo-600 mt-1 uppercase tracking-wide">
                            {b.time_slot} Drive
                          </span>
                        )}
                        {b.end_date !== b.start_date && <span className="text-xs text-gray-400">to {b.end_date}</span>}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wide border ${
                        b.status === 'confirmed' ? 'bg-green-50 text-green-700 border-green-200' :
                        b.status === 'cancelled' ? 'bg-red-50 text-red-700 border-red-200' :
                        'bg-yellow-50 text-yellow-700 border-yellow-200'
                      }`}>
                        {b.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      {b.status === 'pending' && (
                        <>
                          <button 
                            onClick={() => handleStatus(b.id, 'confirmed')}
                            className="text-green-600 hover:text-green-800 font-medium hover:bg-green-50 px-2 py-1 rounded"
                          >
                            Confirm
                          </button>
                          <button 
                            onClick={() => handleStatus(b.id, 'cancelled')}
                            className="text-red-600 hover:text-red-800 font-medium hover:bg-red-50 px-2 py-1 rounded"
                          >
                            Reject
                          </button>
                        </>
                      )}
                      {b.status === 'confirmed' && (
                         <button 
                            onClick={() => handleStatus(b.id, 'cancelled')}
                            className="text-gray-400 hover:text-red-600 text-xs hover:underline"
                          >
                            Cancel
                          </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}