import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

export default function FirstTimeJawaiSafariGuide() {
  return (
    <>
      <Helmet>
        <title>First Time Jawai Safari Guide – What to Expect, Safety, Costs & Tips</title>
        <meta
          name="description"
          content="First time visiting Jawai Leopard Safari? Learn exactly how it works, what to expect, safety rules, costs, best time, and insider tips from on‑ground experience."
        />
        <link
          rel="canonical"
          href="https://www.jawaiunfiltered.com/jawai-guide/first-time-jawai-safari"
        />

        {/* Article Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "First Time Jawai Safari Guide",
            description:
              "A practical, first‑time visitor guide explaining how Jawai Leopard Safari actually works on the ground.",
            author: {
              "@type": "Organization",
              name: "Jawai Unfiltered",
            },
            publisher: {
              "@type": "Organization",
              name: "Jawai Unfiltered",
            },
            datePublished: "2025-01-15",
            dateModified: "2026-02-05",
            mainEntityOfPage:
              "https://www.jawaiunfiltered.com/jawai-guide/first-time-jawai-safari",
          })}
        </script>

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
                name: "First Time Jawai Safari",
              },
            ],
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
                name: "Is Jawai Safari safe for first‑time visitors?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text:
                    "Yes. Jawai safaris operate in open landscapes with experienced local trackers and have no recorded tourist attacks.",
                },
              },
              {
                "@type": "Question",
                name: "Will I definitely see a leopard in Jawai?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text:
                    "Sightings are common but never guaranteed. Jawai follows ethical wildlife tracking, not forced encounters.",
                },
              },
            ],
          })}
        </script>
      </Helmet>

      <main className="max-w-5xl mx-auto px-4 py-12 space-y-14">
        {/* Hero */}
        <section className="space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold">
            First Time Jawai Safari Guide
          </h1>
          <p className="text-lg text-gray-700 max-w-3xl">
            Visiting Jawai Leopard Safari for the first time? This guide explains
            exactly how the experience works on the ground — not brochure promises,
            not myths.
          </p>
        </section>

        {/* Authority Signal */}
        <section className="bg-green-50 border-l-4 border-green-600 p-5 rounded-md">
          <p className="font-medium text-gray-800">
            This guide reflects how Jawai safaris are actually planned and executed
            with local trackers, drivers, and community‑managed landscapes.
          </p>
        </section>

        {/* Who is this guide for */}
        <section>
          <h2 className="text-2xl font-semibold mb-3">Who This Guide Is For</h2>
          <ul className="list-disc ml-6 space-y-2 text-gray-700">
            <li>First‑time safari travelers</li>
            <li>Families with children or elders</li>
            <li>Couples planning a relaxed wildlife experience</li>
            <li>Travelers comparing Jawai with national parks</li>
          </ul>
        </section>

        {/* How Safari Works */}
        <section>
          <h2 className="text-2xl font-semibold mb-3">
            How Jawai Leopard Safari Actually Works
          </h2>
          <div className="space-y-4 text-gray-700">
            <p>
              Jawai is not a fenced national park. It is a community‑managed
              landscape where leopards and villagers coexist.
            </p>
            <p>
              Safaris are conducted in open gypsies with a driver and a local
              tracker who understands daily leopard movement patterns.
            </p>
          </div>
        </section>

        {/* First 30 Minutes */}
        <section className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-3">
            What the First 30 Minutes Feel Like
          </h2>
          <p className="text-gray-700">
            The safari starts slow. Engines idle, trackers communicate quietly,
            and vehicles move between granite hills. Sightings often happen
            unexpectedly — not on command.
          </p>
        </section>

        {/* Safety */}
        <section>
          <h2 className="text-2xl font-semibold mb-3">
            Safety for First‑Time Visitors
          </h2>
          <ul className="list-disc ml-6 space-y-2 text-gray-700">
            <li>No one is allowed to exit the vehicle</li>
            <li>Leopards avoid confrontation and human noise</li>
            <li>Trackers coordinate routes in real‑time</li>
          </ul>
          <p className="mt-3">
            Learn more in our{" "}
            <Link
              to="/jawai-guide/travel-awareness/jawai-safari-safety"
              className="text-green-700 underline"
            >
              Jawai Safari Safety Guide
            </Link>
            .
          </p>
        </section>

        {/* Myths */}
        <section>
          <h2 className="text-2xl font-semibold mb-3">
            Common Myths vs Reality
          </h2>
          <div className="space-y-3 text-gray-700">
            <p>
              <strong>Myth:</strong> Leopards are aggressive toward tourists.
            </p>
            <p>
              <strong>Reality:</strong> Leopards in Jawai are habituated to
              vehicles and avoid human interaction.
            </p>
          </div>
        </section>

        {/* FAQ Visible */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4 text-gray-700">
            <p>
              <strong>Is Jawai suitable for children?</strong> Yes, with parental
              supervision.
            </p>
            <p>
              <strong>How long does a safari last?</strong> Typically 2–3 hours.
            </p>
            <p>
              <strong>Is leopard sighting guaranteed?</strong> No ethical safari
              guarantees sightings.
            </p>
          </div>
        </section>

        {/* Soft CTA */}
        <section className="bg-green-600 text-white p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-2">
            Planning Your First Jawai Safari?
          </h3>
          <p className="mb-3">
            Estimate your trip realistically using our planning tools.
          </p>
          <Link
            to="/jawai-guide/jawai-safari-price-calculator"
            className="underline font-medium"
          >
            Try the Jawai Safari Calculator →
          </Link>
        </section>
      </main>
    </>
  );
}