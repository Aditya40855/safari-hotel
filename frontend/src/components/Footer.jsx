import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer
      className="bg-slate-900 text-gray-300 pt-10 md:pt-16 pb-8 font-sans border-t border-gray-800"
      itemScope
      itemType="https://schema.org/LocalBusiness"
      aria-label="Footer with company information and navigation links"
    >
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-8 md:mb-12">
        
        {/* 1. BRAND & DESCRIPTION */}
        <div itemProp="parentOrganization" itemScope itemType="https://schema.org/Organization">
          <Link 
            to="/" 
            className="text-2xl font-black text-white tracking-tight flex items-center gap-1 mb-4"
            aria-label="Navigate to Jawai Unfiltered homepage"
            itemProp="url"
          >
            <span itemProp="name">Jawai</span><span className="text-orange-600">Unfiltered</span>
          </Link>
          <p className="text-sm leading-relaxed text-gray-400 mb-6 max-w-sm" itemProp="description">
            The premier platform for authentic leopard safaris and heritage stays in Jawai, Rajasthan.
          </p>
          <nav aria-label="Social media links" className="flex gap-4">
            <a 
              href="#" 
              className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-orange-600 hover:text-white transition-all" 
              aria-label="Visit our Instagram page"
              itemProp="sameAs"
            >📷</a>
            <a 
              href="#" 
              className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all" 
              aria-label="Visit our Facebook page"
              itemProp="sameAs"
            >📘</a>
            <a 
              href="#" 
              className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-black hover:text-white transition-all" 
              aria-label="Visit our Twitter page"
              itemProp="sameAs"
            >𝕏</a>
          </nav>
        </div>

        {/* 2. EXPLORE LINKS */}
        <nav className="hidden md:block" aria-label="Explore site navigation">
          <h2 className="text-white font-bold text-lg mb-6">Explore</h2>
          <ul className="space-y-4 text-sm">
            <li>
              <Link to="/" className="hover:text-orange-500 transition-colors" aria-label="Go to Home page">Home</Link>
            </li>
            <li>
              <Link to="/safaris" className="hover:text-orange-500 transition-colors" aria-label="Explore Jeep Safaris">Jeep Safaris</Link>
            </li>
            <li>
              <Link
                to="/jawai-guide"
                className="hover:text-orange-500 transition-colors"
                aria-label="Read Jawai Travel and Safari Guide"
              >
                Jawai Guide
              </Link>
            </li>
            <li>
              <Link to="/hotels" className="hover:text-orange-500 transition-colors" aria-label="View Luxury Stays">Luxury Stays</Link>
            </li>
            <li>
              <Link to="/bookings" className="hover:text-orange-500 transition-colors" aria-label="View My Bookings">My Bookings</Link>
            </li>
          </ul>
        </nav>

        {/* 2b. JAWAI GUIDES LINKS */}
        <nav className="hidden md:block" aria-label="Jawai guides navigation">
          <h2 className="text-white font-bold text-lg mb-6">Jawai Guides</h2>
          <ul className="space-y-4 text-sm">
            <li>
              <Link
                to="/jawai-guide"
                className="hover:text-orange-500 transition-colors"
                aria-label="Read Jawai Travel Guide"
              >
                Jawai Travel Guide
              </Link>
            </li>
            <li>
              <Link
                to="/jawai-guide/leopard-safari-guide"
                className="hover:text-orange-500 transition-colors"
                aria-label="Read Leopard Safari Guide"
              >
                Leopard Safari Guide
              </Link>
            </li>
            <li>
              <Link
                to="/jawai-guide/best-time-to-visit-jawai"
                className="hover:text-orange-500 transition-colors"
                aria-label="Read Best Time to Visit Jawai"
              >
                Best Time to Visit Jawai
              </Link>
            </li>
            <li>
              <Link
                to="/jawai-guide/jawai-safari-budget"
                className="hover:text-orange-500 transition-colors"
                aria-label="Read Jawai Safari Cost and Budget"
              >
                Jawai Safari Cost &amp; Budget
              </Link>
            </li>
            <li>
              <Link
                to="/jawai-guide/jawai-vs-other-safaris"
                className="hover:text-orange-500 transition-colors"
                aria-label="Read Jawai vs Other Safaris"
              >
                Jawai vs Other Safaris
              </Link>
            </li>
          </ul>
        </nav>

        {/* 3. SUPPORT LINKS */}
        <nav className="hidden md:block" aria-label="Support and legal navigation">
          <h2 className="text-white font-bold text-lg mb-6">Support</h2>
          <ul className="space-y-4 text-sm">
            <li><Link to="/contact" className="hover:text-orange-500 transition-colors" aria-label="Contact Us page">Contact Us</Link></li>
            <li><Link to="/legal" className="hover:text-orange-500 transition-colors" aria-label="Privacy Policy page">Privacy Policy</Link></li>
            <li><Link to="/legal" className="hover:text-orange-500 transition-colors" aria-label="Terms and Conditions page">Terms & Conditions</Link></li>
            <li><Link to="/legal" className="hover:text-orange-500 transition-colors" aria-label="Cancellation Policy page">Cancellation Policy</Link></li>
          </ul>
        </nav>

        {/* 4. CONTACT INFO */}
        <address 
          className="pt-4 md:pt-0 border-t border-gray-800 md:border-none not-italic"
          itemProp="address" 
          itemScope 
          itemType="https://schema.org/PostalAddress"
        >
          <h2 className="text-white font-bold text-lg mb-4 md:mb-6">Contact</h2>
          <ul className="space-y-4 text-sm">
            <li className="flex items-start gap-3">
              <span className="text-orange-500 mt-1" aria-hidden="true">📍</span>
              <span itemProp="streetAddress">
                04 band line, paota,<br/>
                <span itemProp="addressLocality">Jodhpur</span>, <span itemProp="addressRegion">Rajasthan</span> - <span itemProp="postalCode">342006</span>
              </span>
            </li>
            <li className="flex items-center gap-3">
              <span className="text-orange-500" aria-hidden="true">📞</span>
              <a href="tel:+919351411559" className="hover:text-white font-medium" itemProp="telephone" aria-label="Call +91 9351411559">+91 9351411559</a>
            </li>
            <li className="flex items-center gap-3">
              <span className="text-orange-500" aria-hidden="true">✉️</span>
              <a href="mailto:adityasingh.aiml@gmail.com" className="hover:text-white" itemProp="email" aria-label="Send email to info@JawaiUnfiltered.com">info@JawaiUnfiltered.com</a>
            </li>
          </ul>
        </address>
      </div>

      {/* RAZORPAY COMPLIANCE & MSME REGISTRATION ROW */}
      <nav 
        className="max-w-7xl mx-auto px-6 flex flex-wrap justify-center gap-6 text-xs text-gray-400 mt-10 border-t border-gray-800 pt-6"
        aria-label="Legal and registration information"
      >
        <Link to="/legal" className="hover:text-orange-500 transition-colors" aria-label="Terms of Service page">Terms of Service</Link>
        <Link to="/legal" className="hover:text-orange-500 transition-colors" aria-label="Privacy Policy page">Privacy Policy</Link>
        <Link to="/legal" className="hover:text-orange-500 transition-colors" aria-label="Refund and Cancellation Policy page">Refund & Cancellation</Link>
        <Link to="/legal" className="hover:text-orange-500 transition-colors" aria-label="Shipping Policy page">Shipping Policy</Link>
        <span className="text-gray-600" aria-hidden="true">|</span>
        <span className="text-gray-500 font-medium" aria-label="MSME Registration Number">Registration: UDYAM-RJ-22-0193418</span>
      </nav>

      {/* COPYRIGHT BAR */}
      <div 
        className="max-w-7xl mx-auto px-6 pt-8 mt-8 border-t border-gray-800 text-center flex flex-col md:flex-row justify-between items-center text-xs text-gray-500"
        aria-label="Copyright and credits"
      >
        <p>&copy; {new Date().getFullYear()} <span itemProp="name">Jawai Unfiltered</span>. All rights reserved.</p>
        <div className="mt-2 md:mt-0">
           <span>Made with <span role="img" aria-label="love">❤️</span> in Rajasthan</span>
        </div>
      </div>
    </footer>
  );
}