import React from "react";

export default function Price({ price, discount = 0 }) {
  if (!price) return null;

  const hasDiscount = Number(discount) > 0;
  const discountedPrice = hasDiscount
    ? Math.round(price - (price * discount) / 100)
    : price;

  return (
    <div className="flex flex-col">
      {hasDiscount && (
        <div className="flex items-center gap-2">
          <span className="text-sm line-through text-gray-400 font-semibold">
            ₹{price.toLocaleString()}
          </span>
          <span className="text-xs font-bold text-green-600">
            {discount}% OFF
          </span>
        </div>
      )}

      <span className="text-lg font-black text-gray-900">
        ₹{discountedPrice.toLocaleString()}
      </span>
    </div>
  );
}