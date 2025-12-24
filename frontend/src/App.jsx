import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";

// Keep Header/Footer as standard imports (they appear on every page)
import Header from "./components/Header";
import Footer from "./components/Footer";
import RequireAuth from "./components/RequireAuth";
import Loading from "./components/Loading"; // <--- Import your new loader


// --- LAZY LOAD PAGES (Split Code) ---
// This tells React: "Only download this file when the user visits the route"
const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Contact = lazy(() => import("./pages/Contact"));
const ForgotPassword =(()=> import('./pages/ForgotPassword'))

const Hotels = lazy(() => import("./pages/Hotels"));
const HotelDetail = lazy(() => import("./pages/HotelDetail"));
const Safaris = lazy(() => import("./pages/Safaris"));
const SafariDetail = lazy(() => import("./pages/SafariDetail"));

// Admin Pages (These are heavy, definitely lazy load them!)
const AdminBookings = lazy(() => import("./pages/admin/AdminBooking"));
const AdminAddHotel = lazy(() => import("./pages/admin/AdminAddHotel"));
const AdminAddSafari = lazy(() => import("./pages/admin/AdminAddSafari"));
const AdminInventory = lazy(() => import("./pages/admin/AdminInventory"));

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 flex flex-col">
      
      {/* 1. Header (Fixed) */}
      <Header />

      {/* 2. Main Content (Grows to fill space) */}
      <div className="pt-20 flex-grow">
        
        {/* SUSPENSE WRAPPER */}
        {/* Shows <Loading /> while the new page is being downloaded */}
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ForgotPassword />} /> {/* ADD THIS LINE */}

            {/* Listings */}
            <Route path="/hotels" element={<Hotels />} /> 
            <Route path="/hotels/:id" element={<HotelDetail />} />
            
            <Route path="/safaris" element={<Safaris />} />
            <Route path="/safaris/:id" element={<SafariDetail />} />

            {/* Protected Routes */}
            <Route path="/bookings" element={<RequireAuth><Dashboard /></RequireAuth>} />
            
            {/* Admin Routes */}
            <Route path="/admin/bookings" element={<RequireAuth><AdminBookings /></RequireAuth>} />
            <Route path="/admin/inventory" element={<RequireAuth><AdminInventory /></RequireAuth>} />
            <Route path="/admin/hotels/new" element={<RequireAuth><AdminAddHotel /></RequireAuth>} />
            <Route path="/admin/safaris/new" element={<RequireAuth><AdminAddSafari /></RequireAuth>} />
          </Routes>
        </Suspense>

      </div>

      {/* 3. Footer (Stays at bottom) */}
      <Footer />
      
    </div>
  );
}