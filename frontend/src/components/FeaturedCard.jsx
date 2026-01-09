// src/components/FeaturedCard.jsx
import React from "react";
import SafeImage from "@/components/SafeImage";
import { ASSET_BASE } from "@/lib/api";

export default function FeaturedCard({ title, subtitle, price, img, ctaText = "Book now" }) {
  let imageSrc = img;

  // Normalize backend-uploaded images
  if (typeof imageSrc === "string" && imageSrc.startsWith("/uploads")) {
    imageSrc = `${ASSET_BASE}${imageSrc}`;
  }

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden max-w-sm">
      <div className="h-40 bg-gray-100">
        {imageSrc ? (
          <SafeImage
            src={imageSrc}
            alt={title}
            className="w-full h-40 object-cover"
          />
        ) : (
          <div className="w-full h-40 flex items-center justify-center text-gray-400">
            No image
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <p className="text-sm text-gray-500 mt-1">{subtitle}</p>

        <div className="mt-4 flex items-center justify-between">
          <div>
            <div className="text-sm text-gray-500">From</div>
            <div className="text-lg font-bold text-orange-600">{price}</div>
          </div>

          <button className="px-4 py-2 bg-orange-500 text-white rounded-lg shadow hover:bg-orange-600 transition">
            {ctaText}
          </button>
        </div>
      </div>
    </div>
  );
}