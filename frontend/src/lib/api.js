export const API_BASE =
  import.meta.env.DEV
    ? "http://localhost:4000/api"
    : "/api";
    export const ASSET_BASE =
    (typeof window !== "undefined" && window.location.hostname === "localhost"
      ? "http://localhost:4000"
      : "");

export const BASE = API_BASE;

console.info("[API] BASE =", BASE);

if (typeof console !== "undefined") {
  console.info("[API] BASE =", BASE);
}

// ==========================================
// 2. AUTH TOKEN HELPERS
// ==========================================

export function setAuthToken(token) {
  if (token) localStorage.setItem("token", token);
  else localStorage.removeItem("token");
}

export function getAuthToken() {
  return localStorage.getItem("token");
}

// ==========================================
// 3. BACKEND WARNING BANNER (DEV UX)
// ==========================================

let _bannerShown = false;
function showBackendWarning(message) {
  if (_bannerShown) return;
  _bannerShown = true;
  if (typeof document === "undefined") return;

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
    el.textContent = `⚠️ Backend unreachable at ${BASE}`;

    const btn = document.createElement("button");
    btn.textContent = "Dismiss";
    btn.style.marginLeft = "12px";
    btn.style.background = "#8a1d1d";
    btn.style.color = "#fff";
    btn.style.border = "none";
    btn.style.padding = "6px 10px";
    btn.style.borderRadius = "6px";
    btn.onclick = () => el.remove();

    el.appendChild(btn);
    document.body.prepend(el);

    setTimeout(() => el.remove(), 30000);
  } catch (e) {
    console.warn("[API] banner error", e);
  }
}

// ==========================================
// 4. CORE FETCH JSON HANDLER (SAFE)
// ==========================================

async function fetchJson(path, opts = {}) {
  const url = `${BASE}${path}`;

  const headers = Object.assign(
    { "Content-Type": "application/json" },
    opts.headers || {}
  );

  const token = getAuthToken();
  if (token && !opts.skipAuth) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  let res;
  try {
    res = await fetch(url, { ...opts, headers });
  } catch (err) {
    console.error("[API] Network error:", url, err);
    showBackendWarning(err?.message || "Network error");
    throw err;
  }

  if (res.status === 204) return null;

  const text = await res.text();

  let json;
  try {
    json = text ? JSON.parse(text) : null;
  } catch {
    console.error("[API] Non-JSON response:", url, text);
    const err = new Error(`Invalid JSON response (${res.status})`);
    err.status = res.status;
    throw err;
  }

  if (res.ok) return json;

  const apiErr = new Error(json?.error || json?.message || `API error ${res.status}`);
  apiErr.status = res.status;
  apiErr.payload = json;
  throw apiErr;
}

// Helper: GET list (404 → [])
async function getList(path, opts = {}) {
  try {
    return await fetchJson(path, { method: "GET", ...opts });
  } catch (err) {
    if (err?.status === 404) return [];
    throw err;
  }
}

// ==========================================
// 5. PUBLIC API
// ==========================================

// Cities
export async function getCities(opts = {}) {
  return getList("/cities", opts);
}

// Safaris
export async function getAllSafaris(opts = {}) {
  return getList("/safaris", opts);
}

export async function getSafaris(opts = {}) {
  return getList("/safaris", opts);
}

export async function getSafarisByCity(slug, opts = {}) {
  if (!slug) return getSafaris(opts);
  return getList(`/safaris?city=${encodeURIComponent(slug)}`, opts);
}

export async function getSafariById(id, opts = {}) {
  return fetchJson(`/safaris/${encodeURIComponent(id)}`, { method: "GET", ...opts });
}

// Hotels
export async function getHotelsByCity(slug, opts = {}) {
  if (!slug) return [];
  return getList(`/hotels?city=${encodeURIComponent(slug)}`, opts);
}

export async function getHotelById(id, opts = {}) {
  return fetchJson(`/hotels/${encodeURIComponent(id)}`, { method: "GET", ...opts });
}

// Bookings
export async function listBookings(opts = {}) {
  return getList("/bookings", opts);
}

export async function createBooking(data, opts = {}) {
  return fetchJson("/bookings", {
    method: "POST",
    body: JSON.stringify(data),
    ...opts,
  });
}

export async function deleteBooking(id) {
  return fetchJson(`/bookings/${encodeURIComponent(id)}`, { method: "DELETE" });
}
export async function getHotels() {
  const res = await fetch(`${API_BASE}/hotels`);
  if (!res.ok) throw new Error("Failed to fetch hotels");
  return res.json();
}

// ==========================================
// 6. AUTH
// ==========================================

export async function login(email, password) {
  return fetchJson("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
    skipAuth: true,
  });
}

export async function signup(data) {
  return fetchJson("/auth/signup", {
    method: "POST",
    body: JSON.stringify(data),
    skipAuth: true,
  });
}

// ==========================================
// 7. ADMIN
// ==========================================

export async function adminCreateHotel(payload) {
  return fetchJson("/admin/hotels", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function adminCreateSafari(payload) {
  return fetchJson("/admin/safaris", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function updateBookingStatus(id, status) {
  return fetchJson(`/bookings/${encodeURIComponent(id)}/status`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });
}

export async function deleteHotel(id) {
  return fetchJson(`/admin/hotels/${encodeURIComponent(id)}`, { method: "DELETE" });
}

export async function deleteSafari(id) {
  return fetchJson(`/admin/safaris/${encodeURIComponent(id)}`, { method: "DELETE" });
}

// ==========================================
// 8. REVIEWS
// ==========================================

export async function getReviews(type, itemId) {
  return fetchJson(`/reviews?type=${type}&itemId=${itemId}`);
}

export async function createReview(data) {
  return fetchJson("/reviews", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

// ==========================================
// 9. IMAGE UPLOAD
// ==========================================

export async function uploadImage(file) {
  const formData = new FormData();
  formData.append("photo", file);

  const token = getAuthToken();
  const res = await fetch(`${BASE}/upload`, {
    method: "POST",
    headers: token ? { Authorization: `Bearer ${token}` } : {},
    body: formData,
  });

  if (!res.ok) {
    const json = await res.json().catch(() => ({}));
    throw new Error(json.error || "Upload failed");
  }

  const data = await res.json();
  return data.url;
}