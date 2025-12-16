// src/components/Header.jsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { getAuthToken, setAuthToken } from "../lib/api";

export default function Header() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Close mobile menu when route changes
  useEffect(() => {
    setOpen(false);
  }, [location]);

  // Check auth state
  const token = getAuthToken();
  const user = (() => {
    try {
      return JSON.parse(localStorage.getItem("user") || "null");
    } catch {
      return null;
    }
  })();

  function handleLogout() {
    setAuthToken(null); // Remove token
    localStorage.removeItem("user"); // Remove user data
    navigate("/login"); // Send to login page
  }

  return (
    <>
      <header
        className="w-full fixed top-0 left-0 bg-white/95 backdrop-blur-md border-b z-50 shadow-sm"
        role="banner"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Logo */}
            <div className="flex items-center">
              <Link to="/" className="text-xl font-bold text-gray-900 flex items-center gap-1">
                <span>Safari</span>
                <span className="text-orange-600">&</span>
                <span>Hotels</span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8 text-gray-700 font-medium">
              <Link to="/" className="hover:text-orange-600 transition">Home</Link>
              <Link to="/safaris" className="hover:text-orange-600 transition">Safaris</Link>
              <Link to="/hotels" className="hover:text-orange-600 transition">Hotels</Link>
              
              {/* Only show 'Bookings' if logged in */}
              {token && (
                <Link to="/bookings" className="hover:text-orange-600 transition">My Bookings</Link>
              )}

              <Link to="/contact" className="hover:text-orange-600 transition">Contact</Link>

              {/* Admin Link (Only visible to Admins) */}
              {user?.is_admin && (
  <Link to="/admin/bookings" className="text-red-600 hover:text-red-800 font-semibold">
    Admin Panel
  </Link>
)}
            </nav>

            {/* Desktop Auth Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              {token ? (
                <>
                  <span className="text-sm text-gray-600">
                    Hi, <span className="font-semibold text-gray-900">{user?.name || "User"}</span>
                  </span>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 text-sm rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="px-4 py-2 rounded-lg bg-orange-600 text-white font-semibold hover:bg-orange-700 transition"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setOpen((v) => !v)}
                className="p-2 rounded-md text-gray-700 hover:text-orange-600 focus:outline-none"
              >
                {open ? (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {open && (
        <div className="fixed inset-0 z-40 md:hidden bg-black/20" onClick={() => setOpen(false)}>
          <div 
            className="absolute top-16 left-0 w-full bg-white shadow-xl border-t p-6 flex flex-col space-y-4"
            onClick={(e) => e.stopPropagation()} // Prevent close when clicking inside menu
          >
            <Link to="/" className="text-lg font-medium text-gray-800">Home</Link>
            <Link to="/safaris" className="text-lg font-medium text-gray-800">Safaris</Link>
            <Link to="/hotels" className="text-lg font-medium text-gray-800">Hotels</Link>
            
            {token && (
               <Link to="/bookings" className="text-lg font-medium text-gray-800">My Bookings</Link>
            )}
            
            <Link to="/contact" className="text-lg font-medium text-gray-800">Contact</Link>

            {user?.is_admin && (
               <Link to="/admin" className="text-lg font-medium text-red-600">Admin Panel</Link>
            )}

            <div className="border-t pt-4 mt-2">
              {token ? (
                <div className="space-y-3">
                   <div className="text-gray-500">Signed in as <strong>{user?.name}</strong></div>
                   <button 
                     onClick={handleLogout}
                     className="block w-full text-center py-2 rounded-lg border border-red-200 text-red-600 font-medium hover:bg-red-50"
                   >
                     Logout
                   </button>
                </div>
              ) : (
                <div className="space-y-3">
                  <Link to="/login" className="block w-full text-center py-2 rounded-lg border border-gray-300">Login</Link>
                  <Link to="/signup" className="block w-full text-center py-2 rounded-lg bg-orange-600 text-white font-semibold">Sign Up</Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}