

import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

export default function DriverAndFamilyFacilitiesInJawai() {
  return (
    <>
      <Helmet>
        <script type="application/ld+json">
          {`
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            <link
          rel="canonical"
          href="https://www.jawaiunfiltered.com/jawai-guide/travel-awareness/driver-family-facilities"
        />
            "mainEntity": [
              {
                "@type": "Question",
                "name": "Do drivers get rooms during safari?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No. Drivers are provided proper seating, shade, water, and rest areas — not sleeping rooms."
                }
              },
              {
                "@type": "Question",
                "name": "Is this facility free?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes. These facilities are included without additional charges."
                }
              },
              {
                "@type": "Question",
                "name": "Can children stay safely during safari?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, children can rest safely in designated areas with prior coordination."
                }
              },
              {
                "@type": "Question",
                "name": "Are washrooms available?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, clean Indian and Western washrooms are provided."
                }
              },
              {
                "@type": "Question",
                "name": "Is parking secure?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, private and secure parking is arranged."
                }
              },
              {
                "@type": "Question",
                "name": "Do all safari operators provide this?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Facilities vary. Travelers should always ask in advance."
                }
              },
              {
                "@type": "Question",
                "name": "Is it safe for elderly parents?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, resting rooms and seating are arranged for elderly guests."
                }
              },
              {
                "@type": "Question",
                "name": "Is drinking water provided?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, drinking water is available."
                }
              },
              {
                "@type": "Question",
                "name": "Can drivers rest comfortably?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, drivers have shaded seating and rest areas."
                }
              },
              {
                "@type": "Question",
                "name": "Does this affect safari pricing?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No, these facilities are provided as part of our coordination."
                }
              }
            ]
          }
          `}
        </script>
      </Helmet>
      <div className="max-w-6xl mx-auto px-4 py-10 text-gray-800">
      {/* HERO SECTION */}
      <header className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          What Happens to Drivers & Family Members During Jawai Safari?
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl">
          Many travelers arrive in Jawai with drivers, elderly parents, children,
          or family members who may not wish to join the safari. This guide
          explains what usually happens during safari hours — and how thoughtful
          planning can make the experience comfortable for everyone.
        </p>
      </header>

      <hr className="my-12 border-gray-200" />
      {/* WHY THIS IS A REAL ISSUE */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-3">
          Why This Is a Real Concern in Jawai
        </h2>
        <p className="mb-4">
          A typical Jawai leopard safari lasts between <strong>2 to 3 hours</strong>.
          Safaris take place in remote, rocky terrain with limited public
          infrastructure. During this time, drivers and non-participating family
          members are often left waiting without clear arrangements.
        </p>
        <p>
          While Jawai is safe, unmanaged waiting can be uncomfortable — especially
          during hot afternoons or for elderly guests and children.
        </p>
      </section>

      <hr className="my-12 border-gray-200" />
      {/* WHO THIS AFFECTS */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">
          Who Is Most Affected by This Situation?
        </h2>
        <ul className="grid md:grid-cols-2 gap-4 list-disc list-inside">
          <li>Families traveling with elderly parents</li>
          <li>Guests with young children</li>
          <li>Self-drive travelers</li>
          <li>Chauffeur-driven guests</li>
          <li>Guests with health concerns</li>
          <li>Drivers accompanying private vehicles</li>
        </ul>
      </section>

      <hr className="my-12 border-gray-200" />
      {/* WHAT USUALLY HAPPENS */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-3">
          What Usually Happens During Safari Hours
        </h2>
        <p className="mb-3">
          In most cases, drivers and non-safari members wait in open areas,
          village outskirts, or roadside zones. This is not unsafe, but it often
          means:
        </p>
        <ul className="list-disc list-inside space-y-2">
          <li>No shaded seating</li>
          <li>No washroom access</li>
          <li>No drinking water arrangement</li>
          <li>Long waiting time without rest facilities</li>
        </ul>
      </section>

      <hr className="my-12 border-gray-200" />
      {/* JAWAI UNFILTERED FACILITIES */}
      <section className="mb-12 bg-green-50 border border-green-200 rounded-xl p-6">
        <h2 className="text-2xl font-semibold mb-4 text-green-800">
          How Jawai Unfiltered Manages This Thoughtfully
        </h2>
        <p className="mb-4">
          As part of our on-ground coordination in Jawai, we provide additional
          facilities for drivers and non-safari family members — without any
          extra charges.
        </p>
        <ul className="grid md:grid-cols-2 gap-3 list-disc list-inside">
          <li>Private and secure parking</li>
          <li>Separate shaded sitting areas for drivers</li>
          <li>Drinking water availability</li>
          <li>Clean Indian & Western washrooms</li>
          <li>Rest rooms for elderly parents and children</li>
          <li>Safe waiting space for non-safari family members</li>
        </ul>
        <p className="mt-4 text-sm text-gray-600">
          <strong>Important:</strong> Drivers do not receive sleeping rooms.
          Drivers are provided proper seating, shade, water, and rest areas.
          Rooms are reserved only for elderly family members, children, or guests
          who are not joining the safari.
        </p>
      </section>

      <hr className="my-12 border-gray-200" />
      {/* CARETAKER NOTE */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-3">
          Care for Children & Family Members
        </h2>
        <p>
          If informed in advance, we can also help arrange basic caretaker
          support so parents can enjoy the safari while children or elderly
          members rest safely. This is handled with care, transparency, and prior
          coordination.
        </p>
      </section>

      <hr className="my-12 border-gray-200" />
      {/* WHY THIS MATTERS SECTION */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-3">
          Why This Matters for Families &amp; Chauffeur Travel
        </h2>
        <p className="mb-2">
          When traveling as a family or with a chauffeur, planning for non-participating members during activities like safaris ensures everyone’s comfort and wellbeing. Waiting arrangements, rest areas, and amenities can make a significant difference, especially for children, elderly relatives, or drivers.
        </p>
        <p>
          By understanding available facilities in advance, families and drivers can avoid inconvenience and focus on enjoying the Jawai experience together. Proactive arrangements help create a more inclusive and relaxed journey for all.
        </p>
      </section>
      <hr className="my-12 border-gray-200" />
      {/* CHECKLIST */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">
          Quick Checklist Before You Book a Safari
        </h2>
        <ul className="list-disc list-inside space-y-2">
          <li>Is there safe parking for your vehicle?</li>
          <li>Where will drivers wait during safari hours?</li>
          <li>Are washrooms available?</li>
          <li>Can elderly parents rest comfortably?</li>
          <li>Is drinking water provided?</li>
        </ul>
      </section>

      <hr className="my-12 border-gray-200" />
      {/* INTERNAL LINKS */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-3">
          Helpful Guides You May Also Read
        </h2>
        <ul className="list-disc list-inside space-y-1">
          <li>
            <Link to="/jawai-guide/travel-awareness/book-genuine-jawai-safari" className="text-blue-600 hover:underline">
              How to Book a Genuine Jawai Safari
            </Link>
          </li>
          <li>
            <Link to="/jawai-guide/travel-awareness/jawai-safari-safety" className="text-blue-600 hover:underline">
              Jawai Safari Safety Guide
            </Link>
          </li>
          <li>
            <Link to="/jawai-guide/jawai-safari-routes" className="text-blue-600 hover:underline">
              Jawai Safari Routes Explained
            </Link>
          </li>
        </ul>
      </section>

      <hr className="my-12 border-gray-200" />
      {/* FAQ SECTION */}
      <section>
        <div className="bg-gray-50 rounded-xl p-6">
          <h2 className="text-2xl font-semibold mb-6">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            <p><strong>Do drivers get rooms during safari?</strong><br />No. Drivers are provided proper seating, shade, water, and rest areas — not sleeping rooms.</p>
            <p><strong>Is this facility free?</strong><br />Yes. These facilities are included without additional charges.</p>
            <p><strong>Can children stay safely during safari?</strong><br />Yes, children can rest safely in designated areas with prior coordination.</p>
            <p><strong>Are washrooms available?</strong><br />Yes, clean Indian and Western washrooms are provided.</p>
            <p><strong>Is parking secure?</strong><br />Yes, private and secure parking is arranged.</p>
            <p><strong>Do all safari operators provide this?</strong><br />Facilities vary. Travelers should always ask in advance.</p>
            <p><strong>Is it safe for elderly parents?</strong><br />Yes, resting rooms and seating are arranged for elderly guests.</p>
            <p><strong>Is drinking water provided?</strong><br />Yes, drinking water is available.</p>
            <p><strong>Can drivers rest comfortably?</strong><br />Yes, drivers have shaded seating and rest areas.</p>
            <p><strong>Does this affect safari pricing?</strong><br />No, these facilities are provided as part of our coordination.</p>
          </div>
          <p className="text-sm text-gray-500 mt-6">
            Last updated based on on-ground coordination in Jawai.
          </p>
        </div>
      </section>
    </div>
    </>
  );
}