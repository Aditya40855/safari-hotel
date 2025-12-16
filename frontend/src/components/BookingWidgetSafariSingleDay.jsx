import React, { useState } from "react";
import { createBooking } from "../lib/api";

export default function BookingWidgetSafariSingleDay({ itemId, price, onBooked }) {
  const [date, setDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("Morning");
  const [guests, setGuests] = useState(1);
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!date) {
      setError("Please select a date");
      setLoading(false);
      return;
    }
    if (!name || !contact) {
      setError("Name and Contact are required");
      setLoading(false);
      return;
    }

    try {
      await createBooking({
        booking_type: "safari",
        item_id: itemId,
        start_date: date,
        end_date: date,
        guests: Number(guests),
        time_slot: timeSlot,
        name,
        contact
      });

      alert("Booking Request Sent! We will contact you shortly.");
      if (onBooked) onBooked();
      
      // Clear form
      setDate("");
      setName("");
      setContact("");
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to book. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow border border-gray-100">
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
        <input
          type="date"
          value={date}
          min={new Date().toISOString().split("T")[0]}
          onChange={(e) => setDate(e.target.value)}
          className="w-full border p-2 rounded text-sm"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Time Slot</label>
        <div className="flex gap-2">
          <button type="button" onClick={() => setTimeSlot("Morning")} className={`flex-1 py-2 text-sm border rounded ${timeSlot === "Morning" ? "bg-orange-50 border-orange-500 text-orange-700" : "bg-white"}`}>🌅 Morning</button>
          <button type="button" onClick={() => setTimeSlot("Evening")} className={`flex-1 py-2 text-sm border rounded ${timeSlot === "Evening" ? "bg-indigo-50 border-indigo-500 text-indigo-700" : "bg-white"}`}>🌇 Evening</button>
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Guests</label>
        <input type="number" min="1" max="20" value={guests} onChange={(e) => setGuests(e.target.value)} className="w-full border p-2 rounded text-sm" required />
      </div>

      {/* GUEST INFO FIELDS */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full border p-2 rounded text-sm" placeholder="Full Name" required />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
        <input type="tel" value={contact} onChange={(e) => setContact(e.target.value)} className="w-full border p-2 rounded text-sm" placeholder="10-digit Mobile Number" required />
      </div>

      <div className="flex justify-between items-center mb-4 pt-2 border-t">
        <span className="text-gray-600">Total</span>
        <span className="font-bold text-xl text-orange-600">₹{(price || 0) * guests}</span>
      </div>

      {error && <div className="text-red-600 text-xs mb-3">{error}</div>}

      <button disabled={loading} className="w-full bg-orange-600 text-white font-bold py-3 rounded hover:bg-orange-700 disabled:opacity-50">
        {loading ? "Processing..." : "Confirm Booking"}
      </button>
    </form>
  );
}