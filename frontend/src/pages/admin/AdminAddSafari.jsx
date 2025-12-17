// src/pages/admin/AdminAddSafari.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCities, adminCreateSafari } from "../../lib/api";
import ImageUploader from "../../components/ImageUploader"; // Import the uploader

export default function AdminAddSafari() {
  const [title, setTitle] = useState("");
  const [citySlug, setCitySlug] = useState("");
  const [price, setPrice] = useState("");
  const [duration, setDuration] = useState("");
  const [imagesInput, setImagesInput] = useState(""); // comma-separated or JSON
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
        if (list && list.length && !citySlug) setCitySlug(list[0].slug || "");
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
    if (!title || !title.trim()) e.title = "Title is required";
    if (!citySlug) e.city = "City is required";
    if (!duration || !duration.trim()) e.duration = "Duration is required";
    if (price && isNaN(Number(price))) e.price = "Price must be a number";
    setFieldErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(ev) {
    ev.preventDefault();
    setError("");
    if (!validate()) return;

    // normalize images -> array or null
    let imgs = null;
    if (imagesInput && imagesInput.trim()) {
      const t = imagesInput.trim();
      if ((t.startsWith("[") && t.endsWith("]")) || t.startsWith('"') || t.startsWith("'")) {
        try {
          const parsed = JSON.parse(t);
          imgs = Array.isArray(parsed) ? parsed.map(String) : [String(parsed)];
        } catch {
          imgs = t.split(",").map(s => s.trim()).filter(Boolean);
        }
      } else {
        imgs = t.split(",").map(s => s.trim()).filter(Boolean);
      }
    }

    const payload = {
      title: title.trim(),
      city_slug: citySlug,
      price: price ? Number(price) : null,
      duration: duration.trim(),
      images: imgs, // array or null
      description: description.trim() || null,
    };

    setSubmitting(true);
    try {
      await adminCreateSafari(payload);
      // go to safaris page that will fetch fresh list
      navigate("/safaris");
    } catch (err) {
      console.error("Error creating safari", err);
      setError(err.message || "Server error");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Add New Safari</h1>
      
      <form onSubmit={handleSubmit} className="space-y-5 bg-white p-6 rounded-lg shadow border">
        
        {/* Title Field */}
        <div>
          <label className="block text-sm font-medium mb-1">Safari Title</label>
          <input 
            value={title} 
            onChange={e => setTitle(e.target.value)}
            className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none" 
            placeholder="e.g. Morning Leopard Safari"
          />
          {fieldErrors.title && <div className="text-red-600 text-xs mt-1">{fieldErrors.title}</div>}
        </div>

        {/* Two Column Layout for City & Price */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">City</label>
            <select 
              value={citySlug} 
              onChange={e => setCitySlug(e.target.value)} 
              className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="">Select city</option>
              {cities.map(c => <option key={c.slug} value={c.slug}>{c.name}</option>)}
            </select>
            {fieldErrors.city && <div className="text-red-600 text-xs mt-1">{fieldErrors.city}</div>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Price (₹)</label>
            <input 
              value={price} 
              onChange={e => setPrice(e.target.value)} 
              className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none" 
              placeholder="4500"
            />
            {fieldErrors.price && <div className="text-red-600 text-xs mt-1">{fieldErrors.price}</div>}
          </div>
        </div>

        {/* Duration */}
        <div>
          <label className="block text-sm font-medium mb-1">Duration</label>
          <input 
            value={duration} 
            onChange={e => setDuration(e.target.value)} 
            className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none" 
            placeholder="e.g. 3 Hours"
          />
          {fieldErrors.duration && <div className="text-red-600 text-xs mt-1">{fieldErrors.duration}</div>}
        </div>

        {/* Image Uploader & Preview */}
        <div>
          <label className="block text-sm font-medium mb-2">Safari Images</label>
          
          <div className="mb-3">
            <ImageUploader onUploadSuccess={(url) => {
              // Append new URL to existing list
              const current = imagesInput ? imagesInput.split(',').map(s=>s.trim()).filter(Boolean) : [];
              setImagesInput([...current, url].join(', '));
            }} />
          </div>

          <input 
            value={imagesInput} 
            onChange={e => setImagesInput(e.target.value)} 
            className="w-full border rounded px-3 py-2 text-sm text-gray-600 mb-2" 
            placeholder="Uploaded image URLs will appear here..."
          />

          {/* Preview Images */}
          {imagesInput && (
            <div className="flex gap-2 overflow-x-auto p-2 border rounded bg-gray-50">
              {imagesInput.split(',').map(s => s.trim()).filter(Boolean).map((src, i) => (
                <img 
                  key={i} 
                  // If it starts with /uploads, prepend localhost:4000
                  src={src.startsWith('/uploads') ? `${API_BASE}${src}` : src} 
                  alt="Preview" 
                  className="h-20 w-20 object-cover rounded border shadow-sm" 
                  onError={(e) => e.target.style.display = 'none'}
                />
              ))}
            </div>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea 
            value={description} 
            onChange={e => setDescription(e.target.value)} 
            className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none" 
            rows={4}
            placeholder="Describe the safari experience..."
          />
        </div>

        {error && <div className="text-red-600 bg-red-50 p-3 rounded">{error}</div>}

        <div className="flex gap-3 pt-2">
          <button 
            type="submit" 
            disabled={submitting} 
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition disabled:opacity-70"
          >
            {submitting ? "Creating..." : "Create Safari"}
          </button>
          <button 
            type="button" 
            onClick={() => navigate(-1)} 
            className="border px-6 py-2 rounded hover:bg-gray-50 transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}