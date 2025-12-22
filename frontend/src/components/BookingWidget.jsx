import React, { useState, useEffect } from "react";
import { createBooking } from "../lib/api";

export default function BookingWidget({ itemId, type, pricePerNight, onBooked }) {
  // --- DIRECT SOURCE STRATEGY (Synchronized with Safari Widget) ---
  const [currentUser, setCurrentUser] = useState(null);
  const [isReady, setIsReady] = useState(false);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [guests, setGuests] = useState(1);
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [guestEmail, setGuestEmail] = useState(""); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem("user");
      if (savedUser) {
        setCurrentUser(JSON.parse(savedUser));
      }
    } catch (err) {
      console.error("Auth sync error:", err);
    }
    setIsReady(true);
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!startDate || !endDate) {
       setError("Please select dates"); 
       setLoading(false); return; 
    }

    const finalEmail = currentUser ? currentUser.email : guestEmail;
    const finalName = currentUser ? currentUser.name : name;

    if (!finalEmail) {
      setError("Email is required for confirmation");
      setLoading(false); return;
    }

    try {
      await createBooking({
        booking_type: type || "hotel",
        item_id: itemId,
        start_date: startDate,
        end_date: endDate,
        guests: Number(guests),
        name: finalName,
        contact,
        email: finalEmail 
      });
      alert("Booking Request Sent! Check your email for confirmation.");
      if (onBooked) onBooked();
    } catch (err) {
      setError(err.message || "Failed to process booking");
    } finally {
      setLoading(false);
    }
  }

  if (!isReady) return <div className="p-4 text-center text-gray-400">Loading...</div>;

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow border border-gray-100 space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Check-in</label>
          <input type="date" value={startDate} min={new Date().toISOString().split("T")[0]} onChange={e => setStartDate(e.target.value)} className="w-full border p-2 rounded text-sm" required />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Check-out</label>
          <input type="date" value={endDate} min={startDate || new Date().toISOString().split("T")[0]} onChange={e => setEndDate(e.target.value)} className="w-full border p-2 rounded text-sm" required />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Guests</label>
        <input type="number" min="1" value={guests} onChange={e => setGuests(e.target.value)} className="w-full border p-2 rounded text-sm" required />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
        <input type="text" value={name} onChange={e => setName(e.target.value)} className="w-full border p-2 rounded text-sm" placeholder="Full Name" required />
      </div>

      {/* GUEST EMAIL: Only shows if NOT logged in (Logic matched to Safari) */}
      {!currentUser && (
        <div className="space-y-4 border-t pt-4 mt-2">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input type="email" value={guestEmail} onChange={e => setGuestEmail(e.target.value)} className="w-full border p-2 rounded text-sm" placeholder="For booking confirmation" required />
          </div>
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
        <input type="tel" value={contact} onChange={e => setContact(e.target.value)} className="w-full border p-2 rounded text-sm" placeholder="10-digit Mobile Number" required />
      </div>

      <div className="flex justify-between items-center mb-4 pt-2 border-t">
        <span className="text-gray-600">Total</span>
        <span className="font-bold text-xl text-orange-600">₹{(pricePerNight || 0)}</span>
      </div>

      {error && <div className="text-red-600 text-xs mb-3">{error}</div>}

      <button disabled={loading} className="w-full bg-orange-600 text-white font-bold py-3 rounded hover:bg-orange-700 disabled:opacity-50">
        {loading ? "Processing..." : "Confirm Booking"}
      </button>
    </form>
  );
}