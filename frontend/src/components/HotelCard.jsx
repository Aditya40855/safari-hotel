import React from "react";
import { Link } from "react-router-dom";
import SafeImage from "@/components/SafeImage";
import { ASSET_BASE } from "@/lib/api";


export default function HotelCard({ hotel }) {
  if (!hotel) return null;

  let img = hotel.images?.[0];

  if (typeof img === "string" && img.startsWith("/uploads")) {
    img = `${ASSET_BASE}${img}`;
  }

  return (
    <div className="bg-white rounded shadow overflow-hidden">
      <SafeImage
        src={img}
        alt={hotel.name}
        className="w-full h-44 object-cover"
        fallback="/images/hotel-placeholder.jpg"
      />
      <div className="p-4">
        <h3 className="font-semibold text-lg">{hotel.name}</h3>
        <p className="text-sm text-gray-600">{hotel.address}</p>
        <div className="mt-2 flex items-center justify-between">
          <div className="text-orange-600 font-semibold">₹{hotel.price_from}</div>
          <div className="text-sm text-gray-500">{hotel.rating} ★</div>
        </div>
        <Link to={'/hotels/' + hotel.id} className="mt-3 inline-block text-sm text-blue-600">View details →</Link>
      </div>
    </div>
  );
}
