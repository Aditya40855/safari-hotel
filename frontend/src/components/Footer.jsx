import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-gray-300 pt-10 md:pt-16 pb-8 font-sans border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-8 md:mb-12">
        
        {/* 1. BRAND & DESCRIPTION (Visible on All Devices) */}
        <div>
          <Link to="/" className="text-2xl font-black text-white tracking-tight flex items-center gap-1 mb-4">
            Safari<span className="text-orange-600">&</span>Hotels
          </Link>
          <p className="text-sm leading-relaxed text-gray-400 mb-6 max-w-sm">
            The premier platform for authentic leopard safaris and heritage stays in Jawai, Rajasthan.
          </p>
          <div className="flex gap-4">
            {/* Social Icons */}
            <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-orange-600 hover:text-white transition-all" aria-label="Instagram">
               📷
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all" aria-label="Facebook">
               📘
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-black hover:text-white transition-all" aria-label="Twitter">
               𝕏
            </a>
          </div>
        </div>

        {/* 2. EXPLORE LINKS (HIDDEN ON MOBILE, Visible on Desktop) */}
        <div className="hidden md:block">
          <h3 className="text-white font-bold text-lg mb-6">Explore</h3>
          <ul className="space-y-4 text-sm">
            <li><Link to="/" className="hover:text-orange-500 transition-colors">Home</Link></li>
            <li><Link to="/safaris" className="hover:text-orange-500 transition-colors">Jeep Safaris</Link></li>
            <li><Link to="/hotels" className="hover:text-orange-500 transition-colors">Luxury Stays</Link></li>
            <li><Link to="/bookings" className="hover:text-orange-500 transition-colors">My Bookings</Link></li>
          </ul>
        </div>

        {/* 3. SUPPORT LINKS (HIDDEN ON MOBILE, Visible on Desktop) */}
        <div className="hidden md:block">
          <h3 className="text-white font-bold text-lg mb-6">Support</h3>
          <ul className="space-y-4 text-sm">
            <li><Link to="/contact" className="hover:text-orange-500 transition-colors">Contact Us</Link></li>
            <li><Link to="/privacy-policy" className="hover:text-orange-500 transition-colors">Privacy Policy</Link></li>
            <li><Link to="/terms" className="hover:text-orange-500 transition-colors">Terms & Conditions</Link></li>
            <li><Link to="/cancellation" className="hover:text-orange-500 transition-colors">Cancellation Policy</Link></li>
          </ul>
        </div>

        {/* 4. CONTACT INFO (Visible on All Devices) */}
        <div className="pt-4 md:pt-0 border-t border-gray-800 md:border-none">
          <h3 className="text-white font-bold text-lg mb-4 md:mb-6">Contact</h3>
          <ul className="space-y-4 text-sm">
            <li className="flex items-start gap-3">
              <span className="text-orange-500 mt-1">📍</span>
              <span>
                Sena , Jawai,<br/>
                Rajasthan, India - 306707
              </span>
            </li>
            <li className="flex items-center gap-3">
              <span className="text-orange-500">📞</span>
              <a href="tel:+919876543210" className="hover:text-white font-medium">+91 9351411559</a>
            </li>
            <li className="flex items-center gap-3">
              <span className="text-orange-500">✉️</span>
              <a href="mailto:hello@safarihotels.com" className="hover:text-white">info@safarihotels.com</a>
            </li>
          </ul>
          
          {/* Mobile Only Links (Horizontal Row) */}
          <div className="md:hidden mt-6 flex gap-4 text-xs text-gray-500">
             <Link to="/terms" className="hover:text-gray-300">Terms</Link>
             <span>•</span>
             <Link to="/privacy-policy" className="hover:text-gray-300">Privacy</Link>
             <span>•</span>
             <Link to="/contact" className="hover:text-gray-300">Support</Link>
          </div>
        </div>

      </div>

      {/* COPYRIGHT BAR */}
      <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-gray-800 text-center flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
        <p>&copy; {new Date().getFullYear()} Safari & Hotels. All rights reserved.</p>
        <div className="mt-2 md:mt-0">
           <span>Made with ❤️ in Rajasthan</span>
        </div>
      </div>
    </footer>
  );
}