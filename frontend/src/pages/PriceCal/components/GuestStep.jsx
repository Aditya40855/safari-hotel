import React from "react";

const GuestStep = ({ guests, setGuests }) => {
  const { adults = 1, children = 0 } = guests;

  const incrementAdults = () => {
    setGuests(prev => {
      const newAdults = Math.min((prev.adults || 1) + 1, 10);
      return { ...prev, adults: newAdults };
    });
  };

  const decrementAdults = () => {
    setGuests(prev => {
      const newAdults = Math.max((prev.adults || 1) - 1, 1);
      return { ...prev, adults: newAdults };
    });
  };

  const incrementChildren = () => {
    setGuests(prev => {
      const newChildren = Math.min((prev.children || 0) + 1, 10);
      return { ...prev, children: newChildren };
    });
  };

  const decrementChildren = () => {
    setGuests(prev => {
      const newChildren = Math.max((prev.children || 0) - 1, 0);
      return { ...prev, children: newChildren };
    });
  };

  const totalGuests = adults + children;

  return (
    <div className="w-full max-w-xl mx-auto px-6 py-8 bg-white/95 backdrop-blur rounded-3xl shadow-2xl border border-gray-100 animate-fadeIn">
      <h2 className="text-3xl font-bold text-gray-900 mb-2 text-center">
        Who’s traveling with you?
      </h2>
      <p className="text-center text-gray-600 mb-8 text-base">
        Tell us the group size to tailor rooms, safaris & comfort
      </p>

      <div className="space-y-10">
        {/* Adults */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Adults</h3>
            <p className="text-sm text-gray-500">Age 13+</p>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={decrementAdults}
              className="w-11 h-11 rounded-full bg-gray-100 text-2xl font-semibold text-gray-700 hover:bg-gray-200 active:scale-95 transition"
              type="button"
            >
              −
            </button>
            <span className="w-12 text-center text-2xl font-bold text-green-600">
              {adults}
            </span>
            <button
              onClick={incrementAdults}
              className="w-11 h-11 rounded-full bg-green-600 text-white text-2xl font-semibold hover:bg-green-700 active:scale-95 transition shadow-lg"
              type="button"
            >
              +
            </button>
          </div>
        </div>

        {/* Children */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Children</h3>
            <p className="text-sm text-gray-500">Age 0–12 (Free)</p>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={decrementChildren}
              className="w-11 h-11 rounded-full bg-gray-100 text-2xl font-semibold text-gray-700 hover:bg-gray-200 active:scale-95 transition"
              type="button"
            >
              −
            </button>
            <span className="w-12 text-center text-2xl font-bold text-green-600">
              {children}
            </span>
            <button
              onClick={incrementChildren}
              className="w-11 h-11 rounded-full bg-green-600 text-white text-2xl font-semibold hover:bg-green-700 active:scale-95 transition shadow-lg"
              type="button"
            >
              +
            </button>
          </div>
          
        </div>
      </div>

      <div className="mt-10 text-center">
        <span className="inline-block px-5 py-2 rounded-full bg-green-50 text-green-700 font-medium text-sm transition">
          {totalGuests <= 2 && "Perfect for couples 🥂"}
          {totalGuests > 2 && totalGuests <= 4 && "Great for families 👨‍👩‍👧"}
          {totalGuests > 4 && "Ideal for groups & friends 🐆"}
        </span>
      </div>
    </div>
  );
};

export default GuestStep;
