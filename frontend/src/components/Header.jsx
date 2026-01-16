// src/components/Header.jsx
import React, { useState, useEffect } from "react";
import { Link,NavLink, useNavigate, useLocation } from "react-router-dom";
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
            <nav aria-label="Primary navigation" className="hidden md:flex items-center space-x-8 text-gray-700 font-medium">
              <ul className="flex items-center space-x-8">
                <li>
                  <NavLink to="/" title="Home" className={({ isActive }) => isActive ? "text-orange-600 transition" : "hover:text-orange-600 transition"} aria-current={({ isActive }) => (isActive ? "page" : undefined)}>
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/safaris" title="Safaris" className={({ isActive }) => isActive ? "text-orange-600 transition" : "hover:text-orange-600 transition"} aria-current={({ isActive }) => (isActive ? "page" : undefined)}>
                    Safaris
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/jawai-guide"
                    title="Complete Jawai Travel Guide"
                    className={({ isActive }) =>
                      isActive
                        ? "text-orange-600 transition"
                        : "hover:text-orange-600 transition"
                    }
                    aria-current={({ isActive }) => (isActive ? "page" : undefined)}
                  >
                    Jawai Guide
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/hotels" title="Hotels" className={({ isActive }) => isActive ? "text-orange-600 transition" : "hover:text-orange-600 transition"} aria-current={({ isActive }) => (isActive ? "page" : undefined)}>
                    Hotels
                  </NavLink>
                </li>
                
                {/* Only show 'Bookings' if logged in */}
                {token && (
                  <li>
                    <NavLink to="/bookings" title="My Bookings" className={({ isActive }) => isActive ? "text-orange-600 transition" : "hover:text-orange-600 transition"} aria-current={({ isActive }) => (isActive ? "page" : undefined)}>
                      My Bookings
                    </NavLink>
                  </li>
                )}
                <li>
                  <NavLink to="/celebrate" title="Celebrate" className="relative group hover:text-orange-500 font-bold transition-all" aria-current={({ isActive }) => (isActive ? "page" : undefined)}>
                    Celebrate 
                    <span className="absolute -top-1 -right-4 flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                    </span>
                  </NavLink>
                </li>

                <li>
                  <NavLink to="/faq" title="FAQ" className={({ isActive }) => isActive ? "text-orange-600 transition" : "hover:text-orange-600 transition"} aria-current={({ isActive }) => (isActive ? "page" : undefined)}>
                    FAQ
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/contact" title="Contact" className={({ isActive }) => isActive ? "text-orange-600 transition" : "hover:text-orange-600 transition"} aria-current={({ isActive }) => (isActive ? "page" : undefined)}>
                    Contact
                  </NavLink>
                </li>

                {/* Admin Link (Only visible to Admins) */}
                {user?.is_admin && (
                  <li>
                    <Link to="/admin/bookings" rel="nofollow" className="text-red-600 hover:text-red-800 font-semibold" title="Admin Panel">
                      Admin Panel
                    </Link>
                  </li>
                )}
              </ul>
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
                aria-expanded={open}
                aria-controls="mobile-menu"
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
          <nav 
            id="mobile-menu"
            aria-label="Mobile primary navigation"
            className="absolute top-16 left-0 w-full bg-white shadow-xl border-t p-6 flex flex-col space-y-4"
            onClick={(e) => e.stopPropagation()} // Prevent close when clicking inside menu
          >
            <ul>
              <li><Link to="/" title="Home" className="text-lg font-medium text-gray-800">Home</Link></li>
              <li><Link to="/safaris" title="Safaris" className="text-lg font-medium text-gray-800">Safaris</Link></li>
              <li>
                <Link
                  to="/jawai-guide"
                  title="Explore Jawai Travel Guide"
                  className="text-lg font-medium text-gray-800"
                >
                  Jawai Guide
                </Link>
              </li>
              <li><Link to="/hotels" title="Hotels" className="text-lg font-medium text-gray-800">Hotels</Link></li>
              
              {token && (
                <li><Link to="/bookings" title="My Bookings" className="text-lg font-medium text-gray-800">My Bookings</Link></li>
              )}
              
              <li><Link to="/contact" title="Contact" className="text-lg font-medium text-gray-800">Contact</Link></li>
              <li><Link to="/faq" title="FAQ" className="text-lg font-medium text-gray-800">FAQ</Link></li>
              <li><Link to="/celebrate" title="Plan Your Moment" className="text-lg font-medium text-gray-800">Plan Your Moment</Link></li>

              {user?.is_admin && (
                <li><Link to="/admin" rel="nofollow" title="Admin Panel" className="text-lg font-medium text-red-600">Admin Panel</Link></li>
              )}
            </ul>

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
          </nav>
        </div>
      )}
    </>
  );
}