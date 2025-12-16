import React, { useState } from "react";
import { createBooking } from "../lib/api";

export default function BookingWidget({ itemId, type, pricePerNight, onBooked }) {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [guests, setGuests] = useState(1);
  
  // Guest fields
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!startDate || !endDate) {
       setError("Please select dates"); 
       setLoading(false); return; 
    }
    if (!name || !contact) {
       setError("Name and Contact are required");
       setLoading(false); return;
    }

    try {
      await createBooking({
        booking_type: type || "hotel",
        item_id: itemId,
        start_date: startDate,
        end_date: endDate,
        guests: Number(guests),
        name,
        contact
      });
      alert("Booking Request Sent!");
      if (onBooked) onBooked();
    } catch (err) {
      setError(err.message || "Failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase">Check-in</label>
          <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} className="w-full border p-2 rounded" required />
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase">Check-out</label>
          <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} className="w-full border p-2 rounded" required />
        </div>
      </div>

      <div>
          <label className="block text-xs font-bold text-gray-500 uppercase">Guests</label>
          <input type="number" min="1" value={guests} onChange={e => setGuests(e.target.value)} className="w-full border p-2 rounded" required />
      </div>

      {/* NEW GUEST FIELDS */}
      <div>
          <label className="block text-xs font-bold text-gray-500 uppercase">Full Name</label>
          <input type="text" value={name} onChange={e => setName(e.target.value)} className="w-full border p-2 rounded" placeholder="e.g. Rahul Sharma" required />
      </div>
      <div>
          <label className="block text-xs font-bold text-gray-500 uppercase">Contact Number</label>
          <input type="tel" value={contact} onChange={e => setContact(e.target.value)} className="w-full border p-2 rounded" placeholder="e.g. 9876543210" required />
      </div>

      {error && <div className="text-red-500 text-sm">{error}</div>}

      <button disabled={loading} className="w-full bg-orange-600 text-white font-bold py-3 rounded hover:bg-orange-700 disabled:opacity-50">
        {loading ? "Booking..." : "Book Now"}
      </button>
    </form>
  );
}