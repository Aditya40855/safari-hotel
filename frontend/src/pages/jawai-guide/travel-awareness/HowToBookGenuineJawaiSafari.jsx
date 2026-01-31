import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const FAQS = [
  {
    q: "How do I know if my Jawai safari booking is genuine?",
    a: "A genuine booking always includes a digital confirmation, official invoice, and traceable booking status. Avoid bookings that only happen via WhatsApp or require full advance payment without documentation.",
  },
  {
    q: "Is it safe to book Jawai safari over WhatsApp?",
    a: "WhatsApp is fine for initial queries, but avoid making payments or confirming bookings without an official invoice or digital confirmation. Genuine operators provide proper documentation.",
  },
  {
    q: "Will I get an invoice or bill for my booking?",
    a: "Yes, with Jawai Unfiltered you always receive a digital invoice and booking confirmation email for every safari booking.",
  },
  {
    q: "What payment methods are accepted?",
    a: "We accept secure online payments (UPI, cards, netbanking). Cash is not required. Only a partial payment is needed to confirm your slot.",
  },
  {
    q: "Can I cancel my safari booking? What’s the process?",
    a: "Yes, you can cancel directly from your dashboard. Our cancellation policy is transparent and there are no hidden charges.",
  },
  {
    q: "Do I need to pay the full amount in advance?",
    a: "No. We only require a partial payment to reserve your slot. The rest is paid at the safari gate or on completion.",
  },
  {
    q: "What if I don’t get a booking confirmation?",
    a: "If you booked with Jawai Unfiltered and didn’t receive confirmation, contact support immediately. Never trust operators who don’t send digital confirmation.",
  },
  {
    q: "Can I book for my whole family together?",
    a: "Yes! You can book for families and groups, and see all your bookings in your dashboard.",
  },
  {
    q: "How do foreign travelers book Jawai safari safely?",
    a: "Foreign travelers should avoid cash-only bookings and insist on digital invoices. Jawai Unfiltered provides GST bills and supports international payments.",
  },
  {
    q: "What happens if the safari is cancelled by the park?",
    a: "If the park cancels, you’ll be notified and eligible for a refund or rescheduling as per our policy.",
  },
  {
    q: "Is it safe to share my ID or passport details?",
    a: "Yes, only when booking through official operators like Jawai Unfiltered who keep your data secure and only use it for official park permits.",
  },
  {
    q: "Can I see my safari booking history?",
    a: "Absolutely. All your bookings, invoices, and status are visible in your Jawai Unfiltered dashboard.",
  },
  {
    q: "Are there any hidden charges?",
    a: "No hidden charges. All costs are transparently shown before you pay.",
  },
  {
    q: "How soon should I book to secure my slot?",
    a: "Book at least a week in advance during peak season. Genuine bookings are subject to slot availability.",
  },
  {
    q: "What’s the advantage of booking with Jawai Unfiltered?",
    a: "You get verified vehicles, local coordinators, digital confirmation, transparent pricing, and full safety assurance.",
  },
];

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": FAQS.map((item) => ({
    "@type": "Question",
    "name": item.q,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": item.a,
    },
  })),
};

const BREADCRUMB_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://jawaiunfiltered.com/",
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Jawai Guide",
      "item": "https://jawaiunfiltered.com/jawai-guide",
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Travel Awareness",
      "item": "https://jawaiunfiltered.com/jawai-guide/travel-awareness",
    },
    {
      "@type": "ListItem",
      "position": 4,
      "name": "Genuine Booking",
      "item": "https://jawaiunfiltered.com/jawai-guide/travel-awareness/book-genuine-jawai-safari",
    },
  ],
};

const HowToBookGenuineJawaiSafari = () => {
  return (
    <main className="bg-white min-h-screen text-gray-800">
      <Helmet>
        <title>How to Book a Genuine Jawai Safari (Avoid Fake Operators)</title>
        <meta
          name="description"
          content="Learn how to book a genuine Jawai safari with official confirmation, digital bills, and safe payment. Avoid fake operators and ensure a secure wildlife experience for your family."
        />
        <link
          rel="canonical"
          href="https://jawaiunfiltered.com/jawai-guide/travel-awareness/book-genuine-jawai-safari"
        />
        <script type="application/ld+json">{JSON.stringify(FAQ_SCHEMA)}</script>
        <script type="application/ld+json">{JSON.stringify(BREADCRUMB_SCHEMA)}</script>
      </Helmet>

      {/* Hero Section */}
      <section className="py-10 px-4 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            How to Book a Genuine Jawai Safari
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            First time in Jawai? Here’s how to book your leopard safari with confidence—no scams, no confusion.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-green-700 underline">
            <a href="#how-booking-works">How booking works</a>
            <a href="#booking-steps">Booking steps</a>
            <a href="#faqs">FAQs</a>
          </div>
          <ul className="flex flex-col gap-2 items-center mb-4">
            <li className="flex items-center text-green-700">
              <span className="mr-2">✔</span> Local coordinators, not middlemen
            </li>
            <li className="flex items-center text-green-700">
              <span className="mr-2">✔</span> Verified vehicles & guides only
            </li>
            <li className="flex items-center text-green-700">
              <span className="mr-2">✔</span> No full advance payment required
            </li>
          </ul>
        </div>
      </section>

      <section className="max-w-2xl mx-auto px-4 mb-6">
        <div className="flex flex-col md:flex-row items-center justify-center gap-3 text-sm bg-green-50 border border-green-200 rounded-lg p-3 text-green-800">
          <span>✔ Trusted by 500+ Jawai travelers</span>
          <span>✔ Local coordination team based in Jawai</span>
          <span>✔ No third-party resellers</span>
        </div>
      </section>

      {/* Quick Verdict Box */}
      <section className="max-w-2xl mx-auto my-6 px-4">
        <div className="bg-yellow-50 border-l-4 border-yellow-400 rounded-md p-4 shadow-sm">
          <h2 className="font-semibold text-lg mb-2 text-yellow-800">Quick Verdict</h2>
          <ul className="list-disc pl-5 space-y-1 text-gray-700">
            <li>
              <strong>Direct WhatsApp bookings often fail</strong>—no record, no proof, no support if things go wrong.
            </li>
            <li>
              <strong>Documentation matters</strong>—always ask for a digital invoice and confirmation.
            </li>
            <li>
              <strong>Booking via Jawai Unfiltered</strong> means you get official confirmation, a dashboard, and real support.
            </li>
          </ul>
        </div>
      </section>

      {/* How Jawai Safari Booking Really Works */}
      <section id="how-booking-works" className="max-w-3xl mx-auto px-4 py-6">
        <h2 className="text-xl font-bold mb-3">How Jawai Safari Booking Really Works</h2>
        <p className="mb-2">
          Every genuine safari booking in Jawai involves a <strong>tracker assignment</strong> (the local guide who knows the leopards), <strong>jeep allocation</strong> (only registered vehicles allowed), and an <strong>official time slot</strong> (morning or evening).
        </p>
        <p>
          Informal bookings—like paying someone on WhatsApp—often skip these steps. This causes confusion at the gate, double-booked jeeps, or even outright scams where your money disappears. For pricing clarity, see our <Link to="/price-calculator" className="text-blue-600 underline">Jawai Safari Price Calculator</Link>.
        </p>
      </section>

      {/* Common Booking Mistakes Travelers Make */}
      <section className="max-w-3xl mx-auto px-4 py-6">
        <h2 className="text-xl font-bold mb-3">Common Booking Mistakes Travelers Make</h2>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            <strong>WhatsApp-only bookings:</strong> No invoice, no confirmation, and no support if things go wrong.
          </li>
          <li>
            <strong>No invoice or confirmation:</strong> If you don’t get a bill or email, your booking may not exist.
          </li>
          <li>
            <strong>Cash-only demands:</strong> Avoid operators who insist on full cash payments in advance.
          </li>
          <li>
            <strong>Skipping safety research:</strong> Always read the <Link to="/jawai-guide/travel-awareness/jawai-safari-safety" className="text-blue-600 underline">Jawai Safari Safety Guide</Link> before booking.
          </li>
        </ul>
      </section>

      {/* How Jawai Unfiltered Handles Bookings Differently */}
      <section className="max-w-3xl mx-auto px-4 py-6">
        <h2 className="text-xl font-bold mb-3">How Jawai Unfiltered Handles Bookings Differently</h2>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            <strong>Digital confirmation:</strong> Every booking gets a digital invoice and email confirmation.
          </li>
          <li>
            <strong>Dashboard access:</strong> Logged-in users can view all bookings, invoices, and status in one place.
          </li>
          <li>
            <strong>Booking history:</strong> See previous and upcoming safaris, manage dates, and control cancellations yourself.
          </li>
          <li>
            <strong>Partial payment policy:</strong> Only a small advance is needed to confirm—never full payment upfront.
          </li>
        </ul>
      </section>

      {/* Step-by-Step – Booking a Safari on Jawai Unfiltered */}
      <section id="booking-steps" className="max-w-3xl mx-auto px-4 py-6">
        <h2 className="text-xl font-bold mb-3">Step-by-Step: Booking a Safari on Jawai Unfiltered</h2>
        <ol className="list-decimal pl-6 space-y-1">
          <li>Use the <Link to="/price-calculator" className="text-blue-600 underline">Jawai Safari Price Calculator</Link> to estimate your cost.</li>
          <li>Select your preferred date, slot, and number of people.</li>
          <li>Log in or create a free account for secure booking access.</li>
          <li>Pay a small advance online—no need for full payment.</li>
          <li>Receive instant digital confirmation and access your booking dashboard.</li>
          <li>Show your booking at the gate and enjoy your genuine Jawai safari!</li>
        </ol>
      </section>

      {/* Payment Transparency & Cancellation */}
      <section className="max-w-3xl mx-auto px-4 py-6">
        <h2 className="text-xl font-bold mb-3">Payment Transparency &amp; Cancellation</h2>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            <strong>Half-payment policy:</strong> Only pay 50% to reserve; pay the rest at the gate.
          </li>
          <li>
            <strong>Clear cancellation terms:</strong> Cancel easily from your dashboard—no hidden charges.
          </li>
          <li>
            <strong>No pressure selling:</strong> You’re free to compare and decide—no agent will chase you for payment.
          </li>
        </ul>
      </section>

      {/* Comparison Table */}
      <section className="max-w-3xl mx-auto px-4 py-6">
        <h2 className="text-xl font-bold mb-3">Typical Operator vs Jawai Unfiltered</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border text-sm bg-white">
            <thead>
              <tr>
                <th className="border px-3 py-2 bg-gray-100">Feature</th>
                <th className="border px-3 py-2 bg-gray-100">Typical Operator</th>
                <th className="border px-3 py-2 bg-green-50">Jawai Unfiltered</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border px-3 py-2">Digital Confirmation</td>
                <td className="border px-3 py-2 text-center">❌</td>
                <td className="border px-3 py-2 text-center font-bold text-green-700">✔️</td>
              </tr>
              <tr>
                <td className="border px-3 py-2">Official Invoice</td>
                <td className="border px-3 py-2 text-center">❌</td>
                <td className="border px-3 py-2 text-center font-bold text-green-700">✔️</td>
              </tr>
              <tr>
                <td className="border px-3 py-2">Partial Payment</td>
                <td className="border px-3 py-2 text-center">❌ (often asks full advance)</td>
                <td className="border px-3 py-2 text-center font-bold text-green-700">✔️ (half payment only)</td>
              </tr>
              <tr>
                <td className="border px-3 py-2">Booking Dashboard</td>
                <td className="border px-3 py-2 text-center">❌</td>
                <td className="border px-3 py-2 text-center font-bold text-green-700">✔️</td>
              </tr>
              <tr>
                <td className="border px-3 py-2">Transparent Cancellation</td>
                <td className="border px-3 py-2 text-center">❌</td>
                <td className="border px-3 py-2 text-center font-bold text-green-700">✔️</td>
              </tr>
              <tr>
                <td className="border px-3 py-2">Verified Vehicles & Guides</td>
                <td className="border px-3 py-2 text-center">?</td>
                <td className="border px-3 py-2 text-center font-bold text-green-700">✔️</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Soft CTA */}
      <section className="max-w-2xl mx-auto px-4 py-8 text-center">
        <div className="flex flex-col gap-4 items-center">
          <Link
            to="/price-calculator"
            className="inline-block bg-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700 transition"
          >
            Check Jawai Safari Price Calculator
          </Link>
          <Link
            to="/jawai-guide/travel-awareness/jawai-safari-safety"
            className="inline-block text-green-700 underline hover:text-green-900"
          >
            Read the Jawai Safari Safety Guide
          </Link>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faqs" className="max-w-3xl mx-auto px-4 py-8">
        <h2 className="text-xl font-bold mb-4">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {FAQS.map((item, idx) => (
            <details key={idx} className="bg-gray-50 rounded p-3">
              <summary className="font-semibold cursor-pointer">{item.q}</summary>
              <div className="mt-2 text-gray-700">
                {item.a}
                <div className="mt-1">
                  <Link to="/price-calculator" className="text-green-700 underline text-sm">
                    Check safari pricing →
                  </Link>
                </div>
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* EEAT Footer */}
      <footer className="max-w-2xl mx-auto px-4 py-8 text-center text-sm text-gray-500">
        <div>
          <span className="block mb-1">
            Written with local Jawai safari coordinators and on-ground trackers.
          </span>
          <span className="block mb-2">Last updated: January 2026</span>
          <div className="flex justify-center gap-4 text-sm underline">
            <Link to="/jawai-guide">Jawai Travel Guide</Link>
            <Link to="/jawai-guide/travel-awareness">Travel Awareness Hub</Link>
            <Link to="/price-calculator">Safari Price Calculator</Link>
          </div>
        </div>
      </footer>
    </main>
  );
};

export default HowToBookGenuineJawaiSafari;