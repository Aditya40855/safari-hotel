import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";

// 1. CRITICAL IMPORTS: Load these instantly for the user
import Header from "./components/Header";
import Footer from "./components/Footer";
import RequireAuth from "./components/RequireAuth";
import Loading from "./components/Loading";
import Home from "./pages/Home"; // <--- Home is now standard for instant start

// 2. SEMI-CRITICAL: Lazy load but prioritized by the browser
const Hotels = lazy(() => import("./pages/Hotels"));
const HotelDetail = lazy(() => import("./pages/HotelDetail"));
const Safaris = lazy(() => import("./pages/Safaris"));
const SafariDetail = lazy(() => import("./pages/SafariDetail"));

// 3. NON-CRITICAL: User Utilities
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Contact = lazy(() => import("./pages/Contact"));

// 4. LOW PRIORITY (Admin): Heavy files that users never see
const AdminBookings = lazy(() => import("./pages/admin/AdminBooking"));
const AdminAddHotel = lazy(() => import("./pages/admin/AdminAddHotel"));
const AdminAddSafari = lazy(() => import("./pages/admin/AdminAddSafari"));
const AdminInventory = lazy(() => import("./pages/admin/AdminInventory"));

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 flex flex-col">
      <Header />
      <div className="pt-20 flex-grow">
        <Suspense fallback={<Loading />}>
          <Routes>
            {/* Home loads instantly from the main bundle */}
            <Route path="/" element={<Home />} />
            
            {/* Everything else loads on demand */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/hotels" element={<Hotels />} /> 
            <Route path="/hotels/:id" element={<HotelDetail />} />
            <Route path="/safaris" element={<Safaris />} />
            <Route path="/safaris/:id" element={<SafariDetail />} />

            <Route path="/bookings" element={<RequireAuth><Dashboard /></RequireAuth>} />
            <Route path="/admin/bookings" element={<RequireAuth><AdminBookings /></RequireAuth>} />
            <Route path="/admin/inventory" element={<RequireAuth><AdminInventory /></RequireAuth>} />
            <Route path="/admin/hotels/new" element={<RequireAuth><AdminAddHotel /></RequireAuth>} />
            <Route path="/admin/safaris/new" element={<RequireAuth><AdminAddSafari /></RequireAuth>} />
          </Routes>
        </Suspense>
      </div>
      <Footer />
    </div>
  );
}