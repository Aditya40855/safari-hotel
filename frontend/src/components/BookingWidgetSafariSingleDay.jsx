import React, { useState, useEffect } from "react";
import { createBooking } from "../lib/api";

export default function BookingWidgetSafariSingleDay({ itemId, price, onBooked }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [isReady, setIsReady] = useState(false);

  const [date, setDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("Morning");
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

    if (!date) {
      setError("Please select a date");
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
        booking_type: "safari",
        item_id: itemId,
        start_date: date,
        end_date: date,
        guests: Number(guests),
        time_slot: timeSlot,
        name: finalName,
        contact: contact,
        email: finalEmail 
      });

      alert("Booking Request Sent! Check your email for confirmation.");
      if (onBooked) onBooked();
      
      setDate("");
      setName("");
      setContact("");
      setGuestEmail("");
    } catch (err) {
      setError(err.message || "Failed to book safari");
    } finally {
      setLoading(false);
    }
  }

  if (!isReady) return <div className="p-4 text-center text-gray-400">Loading...</div>;

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow border border-gray-100 space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
        <input type="date" value={date} min={new Date().toISOString().split("T")[0]} onChange={(e) => setDate(e.target.value)} className="w-full border p-2 rounded text-sm" required />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Time Slot</label>
        <div className="flex gap-2">
          <button type="button" onClick={() => setTimeSlot("Morning")} className={`flex-1 py-2 text-sm border rounded ${timeSlot === "Morning" ? "bg-orange-50 border-orange-500 text-orange-700" : "bg-white"}`}>🌅 Morning</button>
          <button type="button" onClick={() => setTimeSlot("Evening")} className={`flex-1 py-2 text-sm border rounded ${timeSlot === "Evening" ? "bg-indigo-50 border-indigo-500 text-indigo-700" : "bg-white"}`}>🌇 Evening</button>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Guests</label>
        <input type="number" min="1" max="20" value={guests} onChange={(e) => setGuests(e.target.value)} className="w-full border p-2 rounded text-sm" required />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full border p-2 rounded text-sm" placeholder="Full Name" required />
      </div>

      {!currentUser && (
        <div className="space-y-4 border-t pt-4 mt-2">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input type="email" value={guestEmail} onChange={(e) => setGuestEmail(e.target.value)} className="w-full border p-2 rounded text-sm" placeholder="For booking confirmation" required />
          </div>
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
        <input type="tel" value={contact} onChange={(e) => setContact(e.target.value)} className="w-full border p-2 rounded text-sm" placeholder="10-digit Mobile Number" required />
      </div>

      <div className="flex justify-between items-center mb-4 pt-2 border-t">
        <span className="text-gray-600">Total</span>
        <span className="font-bold text-xl text-orange-600">₹{(price || 0)}</span>
      </div>

      {error && <div className="text-red-600 text-xs mb-3">{error}</div>}

      <button disabled={loading} className="w-full bg-orange-600 text-white font-bold py-3 rounded hover:bg-orange-700 disabled:opacity-50">
        {loading ? "Processing..." : "Confirm Booking"}
      </button>
    </form>
  );
}