import React, { useEffect, useState } from "react";
import { getReviews, createReview, getAuthToken } from "../lib/api";
import ImageUploader from "./ImageUploader";
import { API_BASE } from '../lib/api';
import SafeImage from "../components/SafeImage"

function StarRating({ rating, setRating, editable = false }) {
  return (
    <div className="flex text-yellow-400">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={`cursor-${editable ? "pointer" : "default"} text-xl`}
          onClick={() => editable && setRating(star)}
        >
          {star <= rating ? "★" : "☆"}
        </span>
      ))}
    </div>
  );
}

export default function ReviewSection({ type, itemId }) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Form State
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [imagesInput, setImagesInput] = useState(""); // Stores uploaded URLs
  const [submitting, setSubmitting] = useState(false);

  const isLoggedIn = !!getAuthToken();

  useEffect(() => {
    loadReviews();
  }, [itemId]);

  async function loadReviews() {
    try {
      const data = await getReviews(type, itemId);
      setReviews(data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!comment.trim()) return alert("Please write a comment");
    
    setSubmitting(true);
    try {
      // Convert image string to array
      const imgs = imagesInput.split(",").map(s => s.trim()).filter(Boolean);
      
      const newReview = await createReview({
        item_type: type,
        item_id: itemId,
        rating,
        comment,
        images: imgs
      });

      // Add to top of list immediately
      setReviews([newReview, ...reviews]);
      
      // Reset Form
      setComment("");
      setRating(5);
      setImagesInput("");
      
    } catch (err) {
      alert("Failed to post review");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="mt-12 border-t pt-8">
      <h2 className="text-2xl font-bold mb-6">Guest Reviews ({reviews.length})</h2>

      {/* --- REVIEW FORM --- */}
      {isLoggedIn ? (
        <form onSubmit={handleSubmit} className="bg-gray-50 p-4 rounded-xl border mb-8">
          <h3 className="font-semibold text-lg mb-2">Leave a Review</h3>
          
          <div className="mb-3">
            <label className="block text-sm text-gray-600 mb-1">Your Rating</label>
            <StarRating rating={rating} setRating={setRating} editable={true} />
          </div>

          <div className="mb-3">
             <textarea 
               className="w-full border rounded p-2 text-sm focus:ring-2 focus:ring-orange-500 outline-none"
               rows={3}
               placeholder="How was your experience?"
               value={comment}
               onChange={e => setComment(e.target.value)}
             />
          </div>

          <div className="mb-3">
             <label className="block text-sm text-gray-600 mb-1">Add Photos (Optional)</label>
             <ImageUploader onUploadSuccess={(url) => {
                 const current = imagesInput ? imagesInput.split(',').map(s=>s.trim()).filter(Boolean) : [];
                 setImagesInput([...current, url].join(', '));
             }} />
             
             {/* Preview Uploads */}
             {imagesInput && (
               <div className="flex gap-2 mt-2 overflow-x-auto">
                 {imagesInput.split(',').map(s=>s.trim()).filter(Boolean).map((src, i) => (
                    <SafeImage key={i} src={src.startsWith('/uploads') ? `${API_BASE}${src}` : src} className="h-12 w-12 object-cover rounded border" />
                 ))}
               </div>
             )}
          </div>

          <button disabled={submitting} className="bg-orange-600 text-white px-4 py-2 rounded font-medium hover:bg-orange-700 disabled:opacity-50">
            {submitting ? "Posting..." : "Post Review"}
          </button>
        </form>
      ) : (
        <div className="bg-gray-50 p-4 rounded-xl border mb-8 text-center text-gray-500">
           Please <a href="/login" className="text-orange-600 font-bold hover:underline">Log In</a> to leave a review.
        </div>
      )}

      {/* --- REVIEWS LIST --- */}
      {loading ? (
        <div>Loading reviews...</div>
      ) : reviews.length === 0 ? (
        <div className="text-gray-500 italic">No reviews yet. Be the first!</div>
      ) : (
        <div className="space-y-6">
          {reviews.map((r) => (
            <div key={r.id} className="bg-white border-b pb-6">
              <div className="flex items-center justify-between mb-2">
                 <div className="font-bold text-gray-900">{r.user_name}</div>
                 <div className="text-xs text-gray-400">{new Date(r.created_at).toLocaleDateString()}</div>
              </div>
              
              <div className="mb-2"><StarRating rating={r.rating} /></div>
              
              <p className="text-gray-700 text-sm leading-relaxed">{r.comment}</p>

              {/* Review Images */}
              {r.images && r.images.length > 0 && (
                <div className="flex gap-2 mt-3 overflow-x-auto">
                   {r.images.map((img, i) => (
                     <SafeImage 
                       key={i} 
                       src={img.startsWith('/uploads') ? `${API_BASE}${img}` : img} 
                       alt="Review attachment"
                       className="h-20 w-20 object-cover rounded-lg border cursor-pointer hover:opacity-90"
                       onClick={() => window.open(img.startsWith('/uploads') ? `${API_BASE}${img}` : img, '_blank')}
                     />
                   ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}