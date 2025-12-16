import React from "react";

export default function Modal({ open, onClose, children, title }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-white rounded-lg shadow-lg w-full max-w-lg p-6 z-10">
        {title && <h3 className="text-lg font-semibold mb-4">{title}</h3>}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
          aria-label="Close"
        >
          ✕
        </button>
        <div>{children}</div>
      </div>
    </div>
  );
}