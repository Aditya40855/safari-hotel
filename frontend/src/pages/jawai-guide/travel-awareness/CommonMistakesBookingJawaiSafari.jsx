

import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

export default function CommonMistakesBookingJawaiSafari() {
  const faqs = [
    {
      q: "Is Jawai Safari safe for families and children?",
      a: "Yes. Jawai Safari is considered safe for families when booked through experienced local operators. Vehicles are open 4x4 jeeps driven by trained drivers, and routes are chosen based on safety and comfort."
    },
    {
      q: "Are very cheap Jawai safaris a scam?",
      a: "Not always a scam, but extremely low prices usually mean shorter routes, limited zones, or reduced time. Jawai safaris involve real costs like fuel, vehicle maintenance, and driver time."
    },
    {
      q: "What is a reasonable price range for Jawai Safari?",
      a: "Most genuine Jawai safaris typically fall in a realistic price range that allows proper zone coverage, sufficient time, and a relaxed experience without rushing."
    },
    {
      q: "Are leopard sightings guaranteed in Jawai?",
      a: "No wildlife safari can guarantee sightings. Leopards in Jawai are wild animals and sightings depend on timing, movement, weather, and natural behavior."
    },
    {
      q: "Do all Jawai safaris cover the same areas?",
      a: "No. Jawai has multiple zones and routes. Coverage varies depending on timing, local conditions, and how much time the safari allocates."
    },
    {
      q: "Is it safe to book Jawai Safari online?",
      a: "Yes, as long as the platform provides clear confirmation, timing details, and transparent communication. Avoid bookings with no written confirmation."
    },
    {
      q: "Can elderly travelers join Jawai Safari?",
      a: "Yes, but it is important to inform the operator in advance so routes and driving style can be adjusted for comfort."
    },
    {
      q: "Why do Jawai Safari prices vary so much?",
      a: "Prices vary due to route length, time spent in leopard zones, vehicle quality, fuel costs, and driver experience."
    },
    {
      q: "Is Jawai Safari legal and regulated?",
      a: "Yes. Jawai safaris operate under local norms and guidelines. Unauthorized or unverified offers should be avoided."
    },
    {
      q: "What should I ask before confirming a safari?",
      a: "Ask about route coverage, duration, vehicle type, timing, and what is included or excluded in the booking."
    }
  ];

  return (
    <main className="bg-white">
      <Helmet>
        <title>Common Mistakes Tourists Make While Booking Jawai Safari (2025 Guide)</title>
        <meta
          name="description"
          content="Learn the most common mistakes tourists make while booking Jawai Safari. Understand pricing, safety, zones, leopard sightings, and how to avoid poor safari experiences."
        />
        <link
          rel="canonical"
          href="https://www.jawaiunfiltered.com/jawai-guide/travel-awareness/common-booking-mistakes"
        />

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqs.map(f => ({
              "@type": "Question",
              "name": f.q,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": f.a
              }
            }))
          })}
        </script>
      </Helmet>

      {/* Breadcrumbs */}
      <nav className="max-w-5xl mx-auto px-4 pt-6 text-sm text-gray-500">
        <Link to="/" className="hover:underline">Home</Link> ›{" "}
        <Link to="/jawai-guide" className="hover:underline">Jawai Guide</Link> ›{" "}
        <span className="text-gray-700">Booking Mistakes</span>
      </nav>

      {/* Hero */}
      <section className="max-w-5xl mx-auto px-4 py-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
          Common Mistakes Tourists Make While Booking Jawai Safari
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          Jawai Safari is a beautiful and safe wildlife experience. Most disappointing
          trips happen not because of the safari itself, but due to booking mistakes.
          This guide explains what usually goes wrong — and how to avoid it.
        </p>

        <div className="mt-6 p-4 border-l-4 border-green-600 bg-green-50 text-green-900">
          <strong>Quick verdict:</strong> Jawai Safari is not risky — poor booking
          decisions are.
        </div>
      </section>

      {/* Content Sections */}
      <section className="max-w-5xl mx-auto px-4 space-y-10">
        <article>
          <h2 className="text-2xl font-semibold text-gray-900">
            Mistake #1: Choosing Safari Only Based on Lowest Price
          </h2>
          <p className="mt-3 text-gray-700">
            Many travelers assume that all Jawai safaris offer the same experience.
            In reality, pricing directly affects route coverage, time spent in leopard
            zones, and overall comfort. Extremely low prices usually mean shorter routes
            or restricted zones — not a scam, but a reduced experience.
          </p>
        </article>

        <article>
          <h2 className="text-2xl font-semibold text-gray-900">
            Mistake #2: Assuming Leopard Sightings Are Guaranteed
          </h2>
          <p className="mt-3 text-gray-700">
            Leopards in Jawai are wild and free-roaming. Any operator promising guaranteed
            sightings is being misleading. Ethical safaris focus on habitat exploration,
            not false promises.
          </p>
        </article>

        <article>
          <h2 className="text-2xl font-semibold text-gray-900">
            Mistake #3: Not Asking About Safari Routes and Zones
          </h2>
          <p className="mt-3 text-gray-700">
            Jawai consists of multiple landscapes including granite hills, water bodies,
            and grasslands. Route selection significantly impacts what you see during
            the safari.
          </p>
        </article>

        <article>
          <h2 className="text-2xl font-semibold text-gray-900">
            Mistake #4: Booking Without Written Confirmation
          </h2>
          <p className="mt-3 text-gray-700">
            Verbal promises or casual messages often lead to confusion. Always ensure
            written confirmation with timing and vehicle details before arrival.
          </p>
        </article>

        <article>
          <h2 className="text-2xl font-semibold text-gray-900">
            Mistake #5: Ignoring Comfort and Physical Requirements
          </h2>
          <p className="mt-3 text-gray-700">
            Safari routes can be bumpy. Elderly travelers or families with small children
            should discuss comfort preferences in advance.
          </p>
        </article>
      </section>

      {/* Checklist */}
      <section className="max-w-5xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-semibold text-gray-900">
          Before You Book: Quick Checklist
        </h2>
        <ul className="mt-4 grid md:grid-cols-2 gap-3 text-gray-700 list-disc list-inside">
          <li>Clear safari duration and timing</li>
          <li>Route and zone coverage explained</li>
          <li>Written confirmation provided</li>
          <li>Vehicle type and seating clarified</li>
          <li>Family and comfort suitability discussed</li>
          <li>No unrealistic wildlife guarantees</li>
        </ul>
      </section>

      {/* Internal Links */}
      <section className="max-w-5xl mx-auto px-4 pb-12">
        <h2 className="text-xl font-semibold text-gray-900">Related Guides</h2>
        <ul className="mt-4 space-y-2 text-green-700">
          <li>
            <Link to="/jawai-guide/price-vs-experience" className="hover:underline">
              Jawai Safari Price vs Experience
            </Link>
          </li>
          <li>
            <Link to="/jawai-guide/travel-awareness/book-genuine-jawai-safari" className="hover:underline">
              How to Book Genuine Jawai Safari
            </Link>
          </li>
          <li>
            <Link to="/jawai-guide/travel-awareness/jawai-safari-safety" className="hover:underline">
              Jawai Safari Safety Guide
            </Link>
          </li>
          <li>
            <Link to="/price-calculator" className="hover:underline">
              Jawai Safari Price Calculator
            </Link>
          </li>
        </ul>
      </section>

      {/* FAQ */}
      <section className="max-w-5xl mx-auto px-4 pb-16">
        <h2 className="text-2xl font-semibold text-gray-900">Frequently Asked Questions</h2>
        <div className="mt-6 space-y-4">
          {faqs.map((f, i) => (
            <div key={i} className="border rounded-lg p-4">
              <h3 className="font-medium text-gray-900">{f.q}</h3>
              <p className="mt-2 text-gray-700">{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Trust Footer */}
      <section className="bg-gray-50 border-t">
        <div className="max-w-5xl mx-auto px-4 py-6 text-sm text-gray-500">
          Written with insights from local Jawai safari coordinators.  
          Last updated: January 2026.
        </div>
      </section>
    </main>
  );
}