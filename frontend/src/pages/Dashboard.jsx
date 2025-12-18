import React, { useEffect, useMemo, useState } from "react";
import { listBookings, getHotelById, getSafariById } from "../lib/api"; // Added fetchers
import { useNavigate } from "react-router-dom";
import SafeImage from "../../components/SafeImage"

// Helper for dates
function fmt(d) {
  if (!d) return "-";
  try {
    return new Date(d).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  } catch {
    return d;
  }
}

function fmtDateTime(d) {
  if (!d) return "-";
  try {
    return new Date(d).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return d;
  }
}

function BookingCard({ b, onCancel }) {
  // Logic to determine the image source
  const imgSource = b.image || "/images/placeholder.jpg";
  
  return (
    <div className="bg-white rounded-lg shadow p-4 flex flex-col sm:flex-row gap-4">
      <div className="w-full sm:w-48 flex-none">
        <div className="h-32 bg-gray-100 rounded overflow-hidden relative">
          {b.image ? (
            <SafeImage 
              src={b.image} 
              alt={b.item_name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.onerror = null; 
                e.target.src = "/images/placeholder.jpg"; // Fallback if link is broken
              }}
            />
          ) : (
             <div className="w-full h-full flex items-center justify-center text-gray-600 text-xs">
               No Image
             </div>
          )}
        </div>
      </div>

      <div className="flex-1">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-lg font-semibold">
              {b.item_name}
            </h3>
            <div className="text-sm text-gray-600 mt-1">
              <span className="capitalize font-medium text-orange-600">{b.booking_type}</span> •{" "}
              {b.guests || 1} guest{b.guests > 1 ? "s" : ""}
            </div>
          </div>

          <div className="text-right">
            <div className={`inline-block px-2 py-1 rounded text-xs font-bold uppercase tracking-wide ${
                b.status === "pending"
                  ? "bg-yellow-100 text-yellow-800"
                  : b.status === "cancelled"
                  ? "bg-red-100 text-red-800"
                  : "bg-green-100 text-green-800"
              }`}>
              {b.status}
            </div>
          </div>
        </div>

        <div className="mt-4 text-sm grid grid-cols-1 sm:grid-cols-2 gap-y-2 text-gray-700">
          <div>
            <span className="text-gray-500 block text-xs">Dates</span>
            {fmt(b.start_date)} {b.end_date ? `→ ${fmt(b.end_date)}` : ""}
          </div>
          <div>
             <span className="text-gray-500 block text-xs">Booked On</span>
             {fmtDateTime(b.created_at)}
          </div>
        </div>

        <div className="mt-4 flex gap-3 pt-3 border-t">
          {b.status !== "cancelled" && (
            <button
              onClick={() => onCancel(b)}
              className="text-red-600 hover:text-red-800 text-sm font-medium"
            >
              Cancel Booking
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [filterType, setFilterType] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;
    
    async function fetchAll() {
      try {
        const data = await listBookings();
        if (!mounted) return;

        // Fetch details for each booking to get the IMAGE and NAME
        const enriched = await Promise.all(
          data.map(async (booking) => {
            let details = {};
            let image = null;

            try {
              if (booking.booking_type === "hotel") {
                details = await getHotelById(booking.item_id);
              } else if (booking.booking_type === "safari") {
                details = await getSafariById(booking.item_id);
              }
            } catch (err) {
              console.warn("Could not load item details", err);
            }

            // Extract the first image if available
            if (details && details.images && details.images.length > 0) {
              image = details.images[0];
            }

            return {
              ...booking,
              item_name: details.name || details.title || `${booking.booking_type} #${booking.item_id}`,
              image: image
            };
          })
        );

        setBookings(enriched);
      } catch (err) {
        console.error(err);
        if (mounted) setError("Could not load bookings");
      } finally {
        if (mounted) setLoading(false);
      }
    }

    fetchAll();

    return () => { mounted = false; };
  }, []);

  const stats = useMemo(() => {
    const total = bookings.length;
    const pending = bookings.filter((b) => b.status === "pending").length;
    return { total, pending };
  }, [bookings]);

  const filtered = useMemo(() => {
    return bookings.filter((b) => {
      if (filterType !== "all" && b.booking_type !== filterType) return false;
      if (filterStatus !== "all" && b.status !== filterStatus) return false;
      return true;
    });
  }, [bookings, filterType, filterStatus]);

  async function handleCancel(b) {
    if (!window.confirm("Are you sure you want to cancel this booking?")) return;

    // Optimistic UI update
    setBookings((prev) =>
      prev.map((x) => (x.id === b.id ? { ...x, status: "cancelled" } : x))
    );

    try {
      const url = (import.meta.env.VITE_API_URL || "") + `/api/bookings/${b.id}`;
      // In a real app, use the deleteBooking() from api.js, here we patch manually or DELETE
      // Assuming your backend DELETE actually deletes the row, we might just remove it.
      // But usually 'cancel' means status update. Your backend DELETE removes it.
      // Let's use the DELETE endpoint for now as per your server.js
      
      const res = await fetch(url, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed");

      // If delete is permanent, remove from list:
      // setBookings(prev => prev.filter(x => x.id !== b.id)); 
      
      // If you prefer to keep it visible but marked cancelled (requires backend update to support PATCH status)
      // For now, let's assume DELETE removes it from view, or reload:
      
      // Since your server.js DELETE removes the row, let's remove it from UI:
      setBookings(prev => prev.filter(x => x.id !== b.id));

    } catch (err) {
      alert("Failed to cancel.");
      // Revert if failed (requires reloading data actually)
    }
  }

  const user = JSON.parse(localStorage.getItem("user") || "null");

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {user ? `Hello, ${user.name || user.email.split("@")[0]}!` : "My Dashboard"}
            </h1>
            <p className="text-gray-600 mt-1">Here is the status of your upcoming adventures.</p>
          </div>
          <div className="mt-4 md:mt-0 flex gap-4">
             <div className="bg-white px-4 py-2 rounded shadow-sm text-center">
                <span className="block text-xl font-bold text-orange-600">{stats.total}</span>
                <span className="text-xs text-gray-500 uppercase">Total</span>
             </div>
             <div className="bg-white px-4 py-2 rounded shadow-sm text-center">
                <span className="block text-xl font-bold text-blue-600">{stats.pending}</span>
                <span className="text-xs text-gray-500 uppercase">Pending</span>
             </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-xl shadow-sm mb-6 flex flex-wrap gap-4 items-center border border-gray-100">
          <span className="text-sm font-medium text-gray-700">Filter By:</span>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="border-gray-300 border rounded-lg px-3 py-1.5 text-sm focus:ring-2 focus:ring-orange-500 outline-none"
          >
            <option value="all">All Items</option>
            <option value="hotel">Hotels</option>
            <option value="safari">Safaris</option>
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="border-gray-300 border rounded-lg px-3 py-1.5 text-sm focus:ring-2 focus:ring-orange-500 outline-none"
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        {/* List */}
        {loading ? (
          <div className="text-center py-12 text-gray-500">Loading your bookings...</div>
        ) : error ? (
          <div className="bg-red-50 text-red-600 p-4 rounded-lg">{error}</div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
            <p className="text-gray-500 text-lg">You haven't booked anything yet.</p>
            <button onClick={() => navigate('/')} className="mt-4 text-orange-600 font-medium hover:underline">
              Start Exploring →
            </button>
          </div>
        ) : (
          <div className="grid gap-4">
            {filtered.map((b) => (
              <BookingCard key={b.id} b={b} onCancel={handleCancel} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}