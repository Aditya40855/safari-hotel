import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

export default function JawaiLeopardSafariRules() {
  return (
    <>
      <Helmet>
        {/* Primary SEO */}
        <title>
          Jawai Leopard Safari Rules & Guidelines | Official Safety Guide
        </title>
        <meta
          name="description"
          content="Official Jawai Leopard Safari rules and safety guidelines. Vehicle limits, wildlife conduct, photography rules, children safety, cancellations, and emergency protocols explained clearly."
        />
        <link
          rel="canonical"
          href="https://www.jawaiunfiltered.com/jawai-guide/jawai-leopard-safari-rules"
        />

        {/* Breadcrumb Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Jawai Guide",
                item: "https://www.jawaiunfiltered.com/jawai-guide",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Safari Rules & Guidelines",
                item: "https://www.jawaiunfiltered.com/jawai-guide/jawai-leopard-safari-rules",
              },
            ],
          })}
        </script>

        {/* Article Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "Jawai Leopard Safari Rules & Guidelines",
            description:
              "Official safety, vehicle, wildlife, and visitor conduct rules for Jawai Leopard Safari.",
            author: {
              "@type": "Organization",
              name: "Jawai Unfiltered",
            },
            publisher: {
              "@type": "Organization",
              name: "Jawai Unfiltered",
            },
            mainEntityOfPage:
              "https://www.jawaiunfiltered.com/jawai-guide/jawai-leopard-safari-rules",
          })}
        </script>

        {/* FAQ Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "How many people are allowed in one Jawai safari vehicle?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "A maximum of 6 people are allowed per safari vehicle for safety and balance.",
                },
              },
              {
                "@type": "Question",
                name: "Is it allowed to get down from the safari vehicle?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "No. Stepping out of the vehicle during safari is strictly prohibited under all circumstances.",
                },
              },
              {
                "@type": "Question",
                name: "Is Jawai Leopard Safari safe?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes, when all safety rules and guide instructions are followed strictly.",
                },
              },
              {
                "@type": "Question",
                name: "Are children allowed on Jawai safari?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes, children are allowed with adult supervision. Infants are not recommended due to terrain.",
                },
              },
            ],
          })}
        </script>

        {/* Speakable Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            speakable: {
              "@type": "SpeakableSpecification",
              cssSelector: [
                ".speakable-safety",
                ".speakable-vehicle",
                ".speakable-emergency",
                ".speakable-family",
              ],
            },
          })}
        </script>
      </Helmet>

      <main className="max-w-5xl mx-auto px-4 py-10">
        {/* HERO */}
        <h1 className="text-3xl font-bold mb-4">
          Jawai Leopard Safari Rules & Guidelines
        </h1>
        <p className="text-sm text-gray-500 mb-4">
          Last updated: February 2026 · Reviewed with local Jawai trackers
        </p>

        <p className="text-lg text-gray-700 mb-6">
          Official safety, vehicle, wildlife, and visitor conduct rules for
          Jawai Leopard Safari. Following these guidelines ensures safety for
          guests, guides, wildlife, and local communities.
        </p>

        {/* VISUAL ANCHOR BLOCK */}
        <section className="border border-blue-200 bg-blue-50 rounded p-4 mb-6">
          <h3 className="text-lg font-semibold mb-1">Safety First, Always</h3>
          <p className="text-gray-700">
            Jawai safaris run on real rocky terrain, not fixed park roads. These rules exist to protect guests, guides, and wildlife equally.
          </p>
        </section>

        {/* DISCLAIMER BOX */}
        <div className="bg-yellow-50 border border-yellow-300 rounded p-4 mb-4 text-yellow-900">
          This guide reflects how Jawai safaris are actually conducted on the ground, based on local tracker protocols and real-world safety practices.
        </div>

        {/* AUTHORITY MICRO-SIGNAL */}
        <p className="text-sm text-gray-600 mb-8">
          Prepared with inputs from local Jawai trackers and safari operators with 5+ years of on-ground experience.
        </p>

        {/* WHO THIS GUIDE IS FOR */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-2">Who This Guide Is For</h2>
          <p className="text-gray-700">
            This guide is for first-time visitors, families, photographers,
            senior travelers, and anyone planning a leopard safari in Jawai who
            wants clear, safety-first rules without confusion.
          </p>
        </section>

        {/* NEW SECTION - HOW A SAFARI FEELS */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-2">
            How a Jawai Safari Actually Feels on the Ground
          </h2>
          <p className="text-gray-700 mb-2">
            The first 30 minutes of a Jawai safari are characterized by slow, careful driving over rocky terrain. Silence is maintained to respect the wildlife, with subtle communication between the guide and tracker to ensure safety and maximize sightings.
          </p>
          <p className="text-gray-700">
            There is no rush; the experience is about immersion and patience, allowing guests to absorb the landscape and the anticipation of encountering the elusive leopards.
          </p>
        </section>

        {/* VEHICLE RULES */}
        <section className="mb-10 speakable-vehicle">
          <h2 className="text-xl font-semibold mb-2">
            🚙 Vehicle & Seating Rules
          </h2>
          <p className="text-gray-700 mb-2">
            Vehicle occupancy and seating are strictly regulated to ensure balance and safety throughout the safari.
          </p>
          <ul className="list-disc ml-6 text-gray-700">
            <li>Maximum 6 guests per open safari vehicle.</li>
            <li>No standing, roof sitting, or leaning outside the gypsy.</li>
            <li>Overloading affects balance and increases rollover risk.</li>
            <li>Guide seating decisions are final.</li>
          </ul>
          <p className="mt-2">
            Learn how routes and terrain work in our{" "}
            <Link
              to="/jawai-guide/jawai-safari-routes"
              className="text-blue-600 underline"
            >
              Jawai Safari Routes Guide
            </Link>
            .
          </p>

          {/* FEATURED SNIPPET Q&A */}
          <div className="border border-gray-300 rounded p-4 mt-6 bg-gray-50">
            <p className="font-semibold mb-1">
              How many people are allowed in one Jawai safari vehicle?
            </p>
            <p>A maximum of six guests per vehicle is permitted to maintain balance and safety.</p>
          </div>
        </section>

        {/* WILDLIFE SAFETY */}
        <section className="mb-10 speakable-safety">
          <h2 className="text-xl font-semibold mb-2">
            🐆 Leopard & Wildlife Safety Rules
          </h2>
          <p className="text-gray-700 mb-2">
            Strict wildlife safety protocols protect both animals and visitors during the safari.
          </p>
          <ul className="list-disc ml-6 text-gray-700">
            <li>
              Stepping out of the safari vehicle is strictly prohibited at all
              times.
            </li>
            <li>No running, shouting, or attempting to approach wildlife.</li>
            <li>Maintain safe distance from leopards and other animals.</li>
            <li>No baiting, feeding, or provoking wildlife.</li>
            <li>The guide’s instructions are final and mandatory.</li>
          </ul>
          <p className="mt-2">
            For deeper safety context, read{" "}
            <Link
              to="/jawai-guide/travel-awareness/jawai-safari-safety"
              className="text-blue-600 underline"
            >
              Jawai Safari Safety Guide
            </Link>
            .
          </p>

          {/* FEATURED SNIPPET Q&A */}
          <div className="border border-gray-300 rounded p-4 mt-6 bg-gray-50">
            <p className="font-semibold mb-1">
              Can anyone step out of the safari vehicle?
            </p>
            <p>No. Stepping out of the vehicle is strictly prohibited under all circumstances.</p>
          </div>
        </section>

        {/* PHOTOGRAPHY */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-2">
            📷 Photography & Drone Guidelines
          </h2>
          <p className="text-gray-700 mb-2">
            Photography and drone usage are subject to guidelines to protect wildlife and local communities.
          </p>
          <ul className="list-disc ml-6 text-gray-700">
            <li>Photography is allowed without flash.</li>
            <li>Drones are permitted only in specific approved zones.</li>
            <li>Commercial shoots require prior permission.</li>
            <li>Respect local villagers and cultural privacy.</li>
          </ul>
          <p className="mt-2">
            See full details in our{" "}
            <Link
              to="/jawai-guide/jawai-safari-photography-guide"
              className="text-blue-600 underline"
            >
              Jawai Photography Guide
            </Link>
            .
          </p>
        </section>

        {/* FAMILY */}
        <section className="mb-10 speakable-family">
          <h2 className="text-xl font-semibold mb-2">
            👨‍👩‍👧 Children, Family & Elderly Guidelines
          </h2>
          <p className="text-gray-700 mb-2">
            Special considerations are in place to accommodate families and elderly travelers safely.
          </p>
          <ul className="list-disc ml-6 text-gray-700">
            <li>Children are allowed with adult supervision.</li>
            <li>Infants are not recommended due to rocky terrain.</li>
            <li>Safari routes can be bumpy; inform guides of medical concerns.</li>
          </ul>
        </section>

        {/* TIMING & CANCELLATION */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-2">
            ⏰ Timings, Weather & Cancellations
          </h2>
          <p className="text-gray-700">
            Safaris operate in morning and evening slots. Weather conditions may
            require delays or cancellations for safety. Cancellation and
            rescheduling policies follow our{" "}
            <Link to="/legal" className="text-blue-600 underline">
              Terms & Conditions
            </Link>
            .
          </p>
        </section>

        {/* COMMUNITY RULES */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-2">
            🌱 Community & Ethical Guidelines
          </h2>
          <p className="text-gray-700 mb-2">
            Respecting local communities and the environment is essential for sustainable coexistence.
          </p>
          <ul className="list-disc ml-6 text-gray-700">
            <li>Jawai is a community-managed landscape.</li>
            <li>Respect villagers, livestock, and local customs.</li>
            <li>No littering or plastic waste.</li>
            <li>Coexistence with wildlife is the foundation of Jawai.</li>
          </ul>
        </section>

        {/* EMERGENCY */}
        <section className="mb-12 speakable-emergency">
          <h2 className="text-xl font-semibold mb-2">
            🚑 Emergency & Liability Disclaimer
          </h2>
          <p className="text-gray-700 mb-2">
            Basic first aid is available. Network connectivity may be limited.
            Hospitals are approximately 4–5 km away. If you have medical
            concerns, inform the driver in advance so speed and routes can be
            adjusted accordingly.
          </p>
        </section>

        {/* QUICK SAFARI RULES CHECKLIST CTA */}
        <section className="bg-gray-100 border border-gray-300 rounded p-6 mb-10">
          <h2 className="text-xl font-semibold mb-2">Quick Safari Rules Checklist</h2>
          <p className="text-gray-700">
            We recommend saving or printing these rules before your safari to ensure a smooth and safe experience.
          </p>
        </section>

        {/* DIVIDER / HIGHLIGHT BLOCK BEFORE FAQ */}
        <section className="bg-gray-100 border border-gray-300 rounded p-6 mb-10">
          <h2 className="text-xl font-semibold mb-2">Why These Rules Matter</h2>
          <p className="text-gray-700 mb-1">
            These rules ensure the safety of visitors, guides, and wildlife, fostering a respectful coexistence in Jawai’s unique ecosystem.
          </p>
          <p className="text-gray-700">
            Thanks to strict adherence to these guidelines, Jawai has maintained a zero-incident record, preserving its status as a safe and sustainable safari destination.
          </p>
        </section>

        {/* FAQ */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">
            Frequently Asked Questions
          </h2>

          <p className="text-sm text-gray-500 mb-2">
            Safety · Vehicles · Photography · Families
          </p>

          <p className="text-gray-700 mb-4">
            Quick answers first — detailed explanations are linked in the sections above.
          </p>

          <div className="border border-gray-300 rounded p-4">
            <ul className="space-y-3 text-gray-700">
              <li>
                <strong>How many people per safari vehicle?</strong>  
                Maximum 6 for safety.
              </li>
              <li>
                <strong>Can anyone step out of the gypsy?</strong>  
                No, it is strictly prohibited.
              </li>
              <li>
                <strong>Is Jawai Leopard Safari dangerous?</strong>  
                No, when rules and guide instructions are followed.
              </li>
              <li>
                <strong>Are children allowed?</strong>  
                Yes, with supervision.
              </li>
              <li>
                <strong>Are drones allowed?</strong>  
                Only in approved zones with permission.
              </li>
              <li>
                <strong>Can safaris be cancelled due to weather?</strong>  
                Yes, for safety reasons.
              </li>
              <li>
                <strong>Is Jawai government managed?</strong>  
                Jawai is a community-managed coexistence landscape.
              </li>
              <li>
                <strong>Is feeding animals allowed?</strong>  
                No, feeding wildlife is prohibited.
              </li>
              <li>
                <strong>Is photography allowed?</strong>  
                Yes, without flash.
              </li>
              <li>
                <strong>Who has final authority during safari?</strong>  
                The assigned guide.
              </li>
            </ul>
          </div>
        </section>
      </main>
    </>
  );
}