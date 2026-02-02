// src/App.jsx
import React, { Suspense, lazy } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

// 1. CRITICAL IMPORTS: Load these instantly for the user
import Header from "./components/Header";
import Footer from "./components/Footer";
import RequireAuth from "./components/RequireAuth";
import Loading from "./components/Loading";
import ContactHub from './components/ContactHub'; // <--- Ensure this path is correct
import Home from "./pages/Home";
import FAQPage from './pages/SEO/Header_Faq';
import LegalPages from "./pages/LegalPages";
import Celebrations from "./pages/Celebrations";
import JawaiPhotography from "./pages/jawai-guide/JawaiPhotography";

// 2. SEMI-CRITICAL: Lazy load but prioritized by the browser
const Hotels = lazy(() => import("./pages/Hotels"));
const HotelDetail = lazy(() => import("./pages/HotelDetail"));
const Safaris = lazy(() => import("./pages/Safaris"));
const SafariDetail = lazy(() => import("./pages/SafariDetail"));

const JawaiGuideIndex = lazy(() => import("./pages/jawai-guide/JawaiGuideIndex"));
const LeopardSafariGuide = lazy(() => import("./pages/jawai-guide/LeopardSafariGuide"));
const BestTimeToVisitJawai = lazy(() =>
  import("./pages/jawai-guide/BestTimeToVisitJawai")
);
const SafariBudget = lazy(() => import("./pages/jawai-guide/safaribudget"));
const JawaiVsOtherSafaris = lazy(() => import("./pages/jawai-guide/JawaiVsOtherSafaris"));
const PriceCalculator = lazy(() => import("./pages/PriceCal/PriceCalculator"));
const JawaiSafariPriceCalculatorGuide = lazy(() => import("./pages/jawai-guide/JawaiSafariPriceCalculatorGuide"));
const JawaiSafariCostBreakdown = lazy(() => import("./pages/jawai-guide/JawaiSafariCostBreakdown"));
const Jawaisafaripackage = lazy(() => import("./pages/jawai-guide/Jawaisafaripackage"));
const TravelSafetyInJawai= lazy(() => import("./pages/jawai-guide/TravelSafetyInJawai"));
const JawaiSafariRoutesExplained = lazy(() => import("./pages/jawai-guide/JawaiSafariRoutesExplained"));
const JawaiSafariCostForFamilies = lazy(() => import("./pages/jawai-guide/JawaiSafariCostForFamilies"));
const JawaiSafariWorthThePrice = lazy(() =>
  import("./pages/jawai-guide/JawaiSafariWorthThePrice")
);
const IsJawaiSafariWorthIt = lazy(() => import("./pages/jawai-guide/IsJawaiSafariWorthIt"));
const JawaiSafariVsRanthamboreVsGir = lazy(() => import("./pages/jawai-guide/JawaiSafariVsRanthamboreVsGir"));
const WhyJawaiSafariFeelsPersonal  = lazy(() => import("./pages/jawai-guide/WhyJawaiSafariFeelsPersonal"));
const JawaiSafariPriceVsExperience  = lazy(() => import("./pages/jawai-guide/travel-awareness/JawaiSafariPriceVsExperience"));
const JawaiSafariSafetyGuide  = lazy(() => import("./pages/jawai-guide/travel-awareness/JawaiSafariSafetyGuide"));
const  HowToBookGenuineJawaiSafari = lazy(() => import("./pages/jawai-guide/travel-awareness/HowToBookGenuineJawaiSafari"));
const CommonMistakesBookingJawaiSafari = lazy(() => import("./pages/jawai-guide/travel-awareness/CommonMistakesBookingJawaiSafari"));
const DriverAndFamilyFacilitiesInJawai = lazy(() => import("./pages/jawai-guide/travel-awareness/DriverAndFamilyFacilitiesInJawai"));
const IsLeopardSafariSaferThanTigerSafari = lazy(() => import("./pages/jawai-guide/travel-awareness/IsLeopardSafariSaferThanTigerSafari"));

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
const AdminBookingRequests = lazy(() => import("./pages/admin/AdminBookingRequests") )

export default function App() {
  const location = useLocation();
  const hideFooter = location.pathname === "/price-calculator";

  return (
    /* Added 'relative' and 'overflow-x-hidden' to ensure fixed elements stay in view */
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 flex flex-col relative overflow-x-hidden">
      <Header />
      
      <main className="pt-20 flex-grow">
        <Suspense fallback={<Loading />}>
          <Routes>
            {/* Home and SEO pages load instantly */}
            <Route path="/" element={<Home />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/jawai-guide" element={<JawaiGuideIndex />} />
            <Route
  path="/jawai-guide/leopard-safari-guide"
  element={<LeopardSafariGuide />}
/>
<Route
  path="/jawai-guide/best-time-to-visit"
  element={<BestTimeToVisitJawai />}
/>
<Route
  path="/jawai-guide/safari-pricing-guide"
  element={<SafariBudget />}
/>
<Route
  path="/jawai-guide/jawai-vs-other-safaris"
  element={<JawaiVsOtherSafaris />}
/>
<Route
  path="/jawai-guide/jawai-safari-package"
  element={<Jawaisafaripackage />}
/>
<Route
    path="/jawai-guide/jawai-safari-cost-breakdown"
    element={<JawaiSafariCostBreakdown />}
  />
<Route
  path="/jawai-guide/jawai-safari-price-calculator"
  element={<JawaiSafariPriceCalculatorGuide />}
/>
<Route
  path="/jawai-guide/jawai-safari-photography-guide"
  element={<JawaiPhotography />}
/>
<Route
  path="/jawai-guide/jawai-booking-guide"
  element={<JawaiGuideIndex />}
/>
<Route
  path="/jawai-guide/travel-safety"
  element={<TravelSafetyInJawai />}
/>
<Route
  path="/jawai-guide/price-vs-experience"
  element={<JawaiSafariPriceVsExperience />}
/>
<Route
  path="/jawai-guide/jawai-safari-routes"
  element={<JawaiSafariRoutesExplained />}
/>
<Route
  path="/jawai-guide/travel-awareness/jawai-safari-safety"
  element={<JawaiSafariSafetyGuide />}
/>
<Route
  path="/jawai-guide/travel-awareness/book-genuine-jawai-safari"
  element={<HowToBookGenuineJawaiSafari />}
/>
<Route
  path="/jawai-guide/travel-awareness/common-booking-mistakes"
  element={<CommonMistakesBookingJawaiSafari />}
/>
<Route
  path="/jawai-guide/travel-awareness/driver-family-facilities"
  element={<DriverAndFamilyFacilitiesInJawai />}
/>
<Route
  path="/jawai-guide/jawai-safari-cost-for-2-4-families"
  element={<JawaiSafariCostForFamilies />}
/>
<Route
  path="/jawai-guide/is-jawai-safari-worth-the-price"
  element={<JawaiSafariWorthThePrice />}
/>
<Route
  path="/jawai-guide/jawai-vs-ranthambore-vs-gir"
  element={<JawaiSafariVsRanthamboreVsGir />}
/>
<Route
  path="/jawai-guide/why-jawai-safari-feels-personal"
  element={<WhyJawaiSafariFeelsPersonal />}
/>
<Route
  path="/jawai-guide/is-jawai-safari-worth-it"
  element={<IsJawaiSafariWorthIt />}
/>
<Route
  path="/jawai-guide/travel-awareness/leopard-vs-tiger-safari-safety"
  element={<IsLeopardSafariSaferThanTigerSafari />}
/>

            
            {/* Lazy-loaded routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/hotels" element={<Hotels />} /> 
            <Route path="/hotels/:id" element={<HotelDetail />} />
            <Route path="/safaris" element={<Safaris />} />
            <Route path="/safaris/:id" element={<SafariDetail />} />
            <Route path="/legal" element={<LegalPages />} />
            <Route path="/celebrate" element={<Celebrations />} />
            <Route path="/price-calculator" element={<PriceCalculator />} />
            {/* Protected routes */}
            <Route path="/bookings" element={<RequireAuth><Dashboard /></RequireAuth>} />
            <Route path="/admin/bookings" element={<RequireAuth><AdminBookings /></RequireAuth>} />
            <Route path="/admin/inventory" element={<RequireAuth><AdminInventory /></RequireAuth>} />
            <Route path="/admin/hotels/new" element={<RequireAuth><AdminAddHotel /></RequireAuth>} />
            <Route path="/admin/safaris/new" element={<RequireAuth><AdminAddSafari /></RequireAuth>} />
            <Route
  path="/admin/booking-requests"
  element={<RequireAuth><AdminBookingRequests /></RequireAuth>}
/>
          </Routes>
        </Suspense>
      </main>

      {!hideFooter && <Footer />}

      {/* CRITICAL: ContactHub must be OUTSIDE Suspense/Routes.
          This ensures it remains persistent and floats above the entire layout.
      */}
      <ContactHub /> 
    </div>
  );
}