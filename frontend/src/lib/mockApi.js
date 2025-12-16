import cities from "../mocks/cities.json";
import hotels from "../mocks/hotels.json";
import safaris from "../mocks/safaris.json";

const LS_KEY = "mock_bookings_v1";

function readBookings() {
  try {
    const raw = localStorage.getItem(LS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}
function writeBookings(arr) {
  localStorage.setItem(LS_KEY, JSON.stringify(arr));
}

export async function getCities() {
  return cities;
}
export async function getHotelsByCity(slug) {
  return hotels.filter(h => h.city_slug === slug);
}
export async function getHotelById(id) {
  return hotels.find(h => h.id === Number(id)) || null;
}
export async function getSafarisByCity(slug) {
  return safaris.filter(s => s.city_slug === slug);
}
export async function getSafariById(id) {
  return safaris.find(s => s.id === Number(id)) || null;
}

/** bookings: { id, user, type, itemId, date_from, date_to, guests, price } **/
export async function listBookings() {
  return readBookings();
}
export async function createBooking(b) {
  const arr = readBookings();
  const id = (arr.length ? arr[arr.length-1].id : 0) + 1;
  const entry = Object.assign({ id, createdAt: Date.now() }, b);
  arr.push(entry);
  writeBookings(arr);
  return entry;
}
