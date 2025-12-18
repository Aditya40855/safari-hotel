import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCities, adminCreateHotel } from "../../lib/api";
import ImageUploader from "../../components/ImageUploader";
import SafeImage from "@/components/SafeImage"

export default function AdminAddHotel() {
  const [name, setName] = useState("");
  const [citySlug, setCitySlug] = useState("");
  const [price, setPrice] = useState("");
  const [rating, setRating] = useState("");
  const [imagesInput, setImagesInput] = useState("");
  const [description, setDescription] = useState("");

  const [cities, setCities] = useState([]);
  const [loadingCities, setLoadingCities] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;
    setLoadingCities(true);
    getCities()
      .then((list) => {
        if (!mounted) return;
        setCities(list || []);
        if (list && list.length && !citySlug) {
          setCitySlug(list[0].slug || "");
        }
      })
      .catch((err) => {
        console.error("Failed to load cities:", err);
        if (mounted) setError("Could not load cities");
      })
      .finally(() => mounted && setLoadingCities(false));

    return () => (mounted = false);
  }, []);

  function validate() {
    const e = {};
    if (!name || !name.trim()) e.name = "Name is required";
    if (!citySlug) e.city = "City is required";
    if (!price || isNaN(Number(price))) e.price = "Price is required and must be a number";
    if (rating && isNaN(Number(rating))) e.rating = "Rating must be a number (e.g. 4.5)";
    setFieldErrors(e);
    return Object.keys(e).length === 0;
  }

  function normalizeImages(input) {
    if (!input || !input.trim()) return null;
    const t = input.trim();
    // Try JSON parse first
    if (t.startsWith("[") || t.startsWith("{")) {
      try {
        const parsed = JSON.parse(t);
        return Array.isArray(parsed) ? parsed.map(String) : [String(parsed)];
      } catch (_) {
        // fallback to comma split
      }
    }
    return t.split(",").map((s) => s.trim()).filter(Boolean);
  }

  async function handleSubmit(ev) {
    ev.preventDefault();
    setError("");
    setFieldErrors({});

    if (!validate()) return;

    setSubmitting(true);

    try {
      const imgs = normalizeImages(imagesInput);

      const payload = {
        name: name.trim(),
        city_slug: citySlug,
        price: Number(price),
        rating: rating ? Number(rating) : null,
        images: imgs,
        description: description.trim() || null,
      };

      // Using helper function from api.js
      const created = await adminCreateHotel(payload);

      // success -> navigate to hotels for that city (or admin list)
      navigate(`/hotels?city=${encodeURIComponent(citySlug)}`);
    } catch (err) {
      console.error("Error creating hotel:", err);
      // If error has status or payload extract helpful message
      if (err && err.message) setError(err.message);
      else setError("Server error");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Add Hotel</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full border rounded px-3 py-2"
            placeholder="Hotel name"
          />
          {fieldErrors.name && <div className="text-red-600 text-sm mt-1">{fieldErrors.name}</div>}
        </div>

        <div>
          <label className="block text-sm font-medium">City</label>
          <select
            value={citySlug}
            onChange={(e) => setCitySlug(e.target.value)}
            className="mt-1 block w-full border rounded px-3 py-2"
          >
            <option value="">Select city</option>
            {cities.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.name}
              </option>
            ))}
          </select>
          {loadingCities && <div className="text-sm text-gray-500 mt-1">Loading cities…</div>}
          {fieldErrors.city && <div className="text-red-600 text-sm mt-1">{fieldErrors.city}</div>}
        </div>

        <div>
          <label className="block text-sm font-medium">Price (INR)</label>
          <input
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="mt-1 block w-full border rounded px-3 py-2"
            placeholder="2000"
          />
          {fieldErrors.price && <div className="text-red-600 text-sm mt-1">{fieldErrors.price}</div>}
        </div>

        <div>
          <label className="block text-sm font-medium">Rating (e.g. 4.5)</label>
          <input
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            className="mt-1 block w-full border rounded px-3 py-2"
            placeholder="4.5"
          />
          {fieldErrors.rating && <div className="text-red-600 text-sm mt-1">{fieldErrors.rating}</div>}
        </div>

        <div>
  <label className="block text-sm font-medium mb-2">Images</label>

  {/* 1. The Uploader */}
  <div className="mb-3">
    <ImageUploader onUploadSuccess={(url) => {
      // Append new URL to the existing string
      const current = imagesInput ? imagesInput.split(',').map(s=>s.trim()).filter(Boolean) : [];
      setImagesInput([...current, url].join(', '));
    }} />
  </div>

  {/* 2. The Text Input (Still allows manual edits) */}
  <input
    value={imagesInput}
    onChange={(e) => setImagesInput(e.target.value)}
    className="block w-full border rounded px-3 py-2 text-sm text-gray-600"
    placeholder="Uploaded URLs will appear here..."
  />

  {/* 3. Preview */}
  {imagesInput && (
    <div className="flex gap-2 mt-2 overflow-x-auto">
      {imagesInput.split(',').map(s => s.trim()).filter(Boolean).map((src, i) => (
         <SafeImage key={i} src={src.startsWith('http') ? src : `${API_BASE}${src}`} alt="Preview" className="h-16 w-16 object-cover rounded border" />
      ))}
    </div>
  )}
</div>

        <div>
          <label className="block text-sm font-medium">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full border rounded px-3 py-2"
            rows={5}
          />
        </div>

        {error && <div className="text-red-600">{error}</div>}

        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={submitting}
            className="bg-orange-600 text-white px-4 py-2 rounded disabled:opacity-60"
          >
            {submitting ? "Creating…" : "Create hotel"}
          </button>

          <button
            type="button"
            onClick={() => navigate(-1)}
            className="border px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}