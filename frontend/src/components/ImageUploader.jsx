import React, { useState } from "react";
import { uploadImage } from "../lib/api";

export default function ImageUploader({ onUploadSuccess }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function handleFile(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError("");

    try {
      const url = await uploadImage(file);
      if (onUploadSuccess) onUploadSuccess(url);
    } catch (err) {
      console.error(err);
      setError("Upload failed");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="flex items-center gap-3">
      <label className="cursor-pointer bg-gray-100 hover:bg-gray-200 border border-gray-300 text-gray-700 px-4 py-2 rounded transition">
        {uploading ? "Uploading..." : "Choose Image"}
        <input 
          type="file" 
          accept="image/*" 
          className="hidden" 
          onChange={handleFile} 
          disabled={uploading}
        />
      </label>
      {error && <span className="text-red-500 text-sm">{error}</span>}
    </div>
  );
}