
const BASE = (import.meta.env.VITE_API_URL || "").trim();

// Debug: print what base the frontend is using
if (typeof console !== "undefined") {
  console.info("[API] BASE =", BASE, "VITE_API_URL=", import.meta.env.VITE_API_URL);
}


// Token helpers

export function setAuthToken(token) {
  if (token) localStorage.setItem("token", token);
  else localStorage.removeItem("token");
}
export function getAuthToken() {
  return localStorage.getItem("token");
}
// get all safaris (no city filter)
export async function getAllSafaris(opts = {}) {
  return getList("/api/safaris", opts);
}


// One-time backend banner for developer UX

let _bannerShown = false;
function showBackendWarning(message) {
  if (_bannerShown) return;
  _bannerShown = true;
  if (typeof document === "undefined") return; // not running in browser

  try {
    const el = document.createElement("div");
    el.id = "backend-warning";
    el.style.position = "fixed";
    el.style.left = "12px";
    el.style.right = "12px";
    el.style.top = "70px";
    el.style.zIndex = 99999;
    el.style.padding = "12px 16px";
    el.style.borderRadius = "10px";
    el.style.background = "#fff3f3";
    el.style.color = "#8a1d1d";
    el.style.fontWeight = "600";
    el.style.boxShadow = "0 6px 18px rgba(0,0,0,0.12)";
    el.style.display = "flex";
    el.style.alignItems = "center";
    el.style.justifyContent = "space-between";
    el.style.gap = "12px";
    el.textContent = `⚠️ Backend unreachable at ${BASE || "/api"} — ${message}`;

    const btn = document.createElement("button");
    btn.textContent = "Dismiss";
    btn.style.marginLeft = "12px";
    btn.style.background = "#8a1d1d";
    btn.style.color = "#fff";
    btn.style.border = "none";
    btn.style.padding = "6px 10px";
    btn.style.borderRadius = "6px";
    btn.style.cursor = "pointer";
    btn.onclick = () => el.remove();

    el.appendChild(btn);
    document.body.prepend(el);

    // Auto remove after 30s
    setTimeout(() => {
      try { el.remove(); } catch (e) {}
    }, 30000);
  } catch (e) {
    // ignore DOM errors
    console.warn("[API] could not show backend banner", e);
  }
}


async function fetchJson(path, opts = {}) {
  // build URL: if BASE provided use absolute, otherwise relative path ("/api/..")
  const url = BASE ? `${BASE}${path}` : path;


  const signal = opts.signal;

  const headers = Object.assign({ "Content-Type": "application/json" }, opts.headers || {});


  const token = getAuthToken();
  if (token && !opts.skipAuth) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  let res;
  try {
    res = await fetch(url, { ...opts, headers, signal });
  } catch (err) {
    // network-level error (DNS,  preflight, offline, etc.)
    console.error("[API] network fetch failed:", url, err);
    const msg = err?.message || "Network error";
    showBackendWarning(msg);
    throw err;
  }

  // 204 No Content => return null
  if (res.status === 204) return null;

  // try parse JSON safely
  let json = null;
  try {
    json = await res.json();
  } catch (err) {
    // server returned non-json (e.g. HTML). Attach status for caller to handle.
    const parseErr = new Error(`Invalid JSON response (${res.status})`);
    parseErr.status = res.status;
    throw parseErr;
  }

  if (res.ok) return json;

  // Non-2xx — build Error with payload if present
  const apiErr = new Error(json?.error || json?.message || `API error: ${res.status}`);
  apiErr.status = res.status;
  apiErr.payload = json;
  throw apiErr;
}


// Helper: GET list where 404 => []

async function getList(path, opts = {}) {
  try {
    return await fetchJson(path, { method: "GET", ...opts });
  } catch (err) {
    if (err && err.status === 404) return [];
    throw err;
  }
}
// Admin API calls
export async function adminCreateHotel(payload) {
  // payload: { name, description, price, rating, images: [], city_slug }
  return fetchJson('/api/admin/hotels', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function adminCreateSafari(payload) {
  // payload: { title, description, price, duration, images: [], city_slug }
  return fetchJson('/api/admin/safaris', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}


// Public API functions


// GET /api/cities
export async function getCities(opts = {}) {
  return getList("/api/cities", opts);
}
export async function deleteBooking(id) {
  return fetchJson(`/api/bookings/${encodeURIComponent(id)}`, {
    method: "DELETE"
  });
}
// GET /api/hotels?city=slug
export async function getHotelsByCity(slug, opts = {}) {
  if (!slug) return [];
  return getList(`/api/hotels?city=${encodeURIComponent(slug)}`, opts);
}

// GET /api/hotels/:id
export async function getHotelById(id, opts = {}) {
  return fetchJson(`/api/hotels/${encodeURIComponent(id)}`, { method: "GET", ...opts });
}

// Fetch all safaris
export async function getSafaris(opts = {}) {
  // GET /api/safaris
  return getList("/api/safaris", opts);
}

// Fetch safaris for a specific city
export async function getSafarisByCity(slug, opts = {}) {
  if (!slug) {
    // If caller calls getSafarisByCity without slug, return all instead of []
    return getSafaris(opts);
  }
  return getList(`/api/safaris?city=${encodeURIComponent(slug)}`, opts);
}

// GET /api/safaris/:id
export async function getSafariById(id, opts = {}) {
  return fetchJson(`/api/safaris/${encodeURIComponent(id)}`, { method: "GET", ...opts });
}

// GET /api/bookings
export async function listBookings(opts = {}) {
  return getList("/api/bookings", opts);
}

// POST /api/bookings
export async function createBooking(data, opts = {}) {
  return fetchJson("/api/bookings", {
    method: "POST",
    body: JSON.stringify(data),
    ...opts,
  });
}

// POST /api/auth/login
export async function login(email, password) {
  return fetchJson("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
    skipAuth: true, 
  });
}
// PATCH /api/bookings/:id/status (Admin)
export async function updateBookingStatus(id, status) {
  return fetchJson(`/api/bookings/${encodeURIComponent(id)}/status`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });
}
export async function getReviews(type, itemId) {
  return fetchJson(`/api/reviews?type=${type}&itemId=${itemId}`);
}

export async function createReview(data) {
  return fetchJson("/api/reviews", {
    method: "POST",
    body: JSON.stringify(data),
  });
}
export async function deleteHotel(id) {
  return fetchJson(`/api/admin/hotels/${id}`, { method: "DELETE" });
}

export async function deleteSafari(id) {
  return fetchJson(`/api/admin/safaris/${id}`, { method: "DELETE" });
}
// Upload a single file
export async function uploadImage(file) {
  const formData = new FormData();
  formData.append("photo", file);

  // We use fetch directly because we need to send FormData, not JSON
  const token = getAuthToken();
  const res = await fetch(`${BASE}/api/upload`, {
    method: "POST",
    headers: token ? { "Authorization": `Bearer ${token}` } : {}, // No 'Content-Type', fetch sets it automatically for FormData
    body: formData,
  });

  if (!res.ok) {
    const json = await res.json().catch(() => ({}));
    throw new Error(json.error || "Upload failed");
  }

  const data = await res.json();
  return data.url; // Returns "/uploads/filename.jpg"
}

// POST /api/auth/signup
export async function signup(userData) {
  return fetchJson("/api/auth/signup", {
    method: "POST",
    body: JSON.stringify(userData),
    skipAuth: true,
  });

  
}