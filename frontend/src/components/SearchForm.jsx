// frontend/src/components/SearchForm.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

export default function SearchForm({
  cities = [],
  selectedCity,
  setSelectedCity,
  onSearch,
}) {
  const navigate = useNavigate();

  function submit(e) {
    e.preventDefault();
    if (onSearch) return onSearch(selectedCity);
    const params = new URLSearchParams();
    if (selectedCity) params.set("city", selectedCity);
    navigate(`/search?${params.toString()}`);
  }

  return (
    <form
      onSubmit={submit}
      className="w-full bg-white p-3 rounded-lg shadow-md flex flex-col sm:flex-row gap-3 items-stretch"
    >
      <select
        className="px-4 py-2 border rounded flex-1 min-w-[140px]"
        value={selectedCity || ""}
        onChange={(e) => setSelectedCity(e.target.value)}
        aria-label="destination"
      >
        <option value="">Select destination</option>
        {cities.map((c) => (
          <option key={c.slug || c.name} value={c.slug || c.name.toLowerCase()}>
            {c.name}
          </option>
        ))}
      </select>

      <div className="flex gap-2 w-full sm:w-auto">
        <input type="date" className="px-3 py-2 border rounded flex-1" />
        <input type="date" className="px-3 py-2 border rounded flex-1" />
      </div>

      <input
        type="number"
        min="1"
        defaultValue={2}
        className="w-full sm:w-24 px-3 py-2 border rounded"
      />

      <button
        type="submit"
        className="px-4 py-2 rounded bg-orange-600 text-white font-semibold min-w-[100px]"
      >
        Search
      </button>
    </form>
  );
}