import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { FaUsers, FaChild, FaUserFriends, FaWalking, FaShieldAlt, FaUtensils, FaClock, FaRegSmile } from "react-icons/fa";

export default function JawaiSafariCostForFamilies() {
  // FAQ data for visible accordion
  const faqs = [
    {
      q: "Is Jawai safari cost charged per person?",
      a: "No. Jawai safari pricing is based on a combination of safari jeep, rooms, meals, and experience level, not strictly per person."
    },
    {
      q: "Is Jawai safari free for children?",
      a: "Children below 12 years are generally not charged for safari. Hotels also usually do not charge for young children."
    },
    {
      q: "How many rooms are allocated for families?",
      a: "Typically, one room is allocated for every two adults. Families can request adjustments depending on comfort preferences."
    },
    {
      q: "Can I book only safari without hotel?",
      a: "Yes. Safari-only bookings are possible. Hotel and safari combinations are explained on this page, while safari-only options can be discussed separately."
    },
    {
      q: "Does the Jawai Safari Calculator show final prices?",
      a: "The calculator provides an estimate. Final pricing may change slightly based on availability and customization."
    },
    // New FAQs
    {
      q: "Is Jawai safari safe for children?",
      a: "Yes, Jawai safaris are considered safe for children when following guide instructions. Many families with young kids visit every season. Jeeps are well-maintained and experienced drivers ensure a safe experience."
    },
    {
      q: "Can families customize safari timing?",
      a: "Absolutely. Families can request morning or evening safaris, and in some cases, private slots for more flexibility. Custom timings are subject to availability and season."
    },
    {
      q: "Is food included in family safari packages?",
      a: "Most family safari packages include meals—breakfast, lunch, and dinner—at the lodge or camp. Some premium packages may also include snacks during the safari ride."
    },
    {
      q: "Why are Jawai safari prices higher than other regions?",
      a: "Jawai offers exclusive, low-crowd wildlife experiences and private jeep safaris, which increases costs. The region’s focus on quality, safety, and conservation also factors into pricing."
    },
    {
      q: "Can I negotiate family safari prices?",
      a: "While published rates are standard, it is possible to discuss customizations or special offers for large groups, off-season, or extended stays. Contact our team for tailored quotes."
    },
    {
      q: "How far in advance should families book Jawai safari?",
      a: "For best availability and preferred lodges, booking at least 2-3 months in advance is recommended, especially for peak season (October–April)."
    },
    {
      q: "Are there discounts for seniors or children?",
      a: "Children under 12 are often free or at reduced rates. Some properties offer senior citizen discounts—ask for details when booking."
    }
  ];

  // For FAQ Schema LD+JSON: extend the existing list
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Is Jawai safari cost charged per person?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "No. Jawai safari pricing is based on a combination of safari jeep, rooms, meals, and experience level, not strictly per person."
        }
      },
      {
        "@type": "Question",
        name: "Is Jawai safari free for children?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Children below 12 years are generally not charged for safari. Hotels also usually do not charge for young children."
        }
      },
      {
        "@type": "Question",
        name: "How many rooms are allocated for families?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Typically, one room is allocated for every two adults. Families can request adjustments depending on comfort preferences."
        }
      },
      {
        "@type": "Question",
        name: "Can I book only safari without hotel?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Yes. Safari-only bookings are possible. Hotel and safari combinations are explained on this page, while safari-only options can be discussed separately."
        }
      },
      {
        "@type": "Question",
        name: "Does the Jawai Safari Calculator show final prices?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "The calculator provides an estimate. Final pricing may change slightly based on availability and customization."
        }
      },
      // Extended new FAQs
      {
        "@type": "Question",
        name: "Is Jawai safari safe for children?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Yes, Jawai safaris are considered safe for children when following guide instructions. Many families with young kids visit every season. Jeeps are well-maintained and experienced drivers ensure a safe experience."
        }
      },
      {
        "@type": "Question",
        name: "Can families customize safari timing?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Absolutely. Families can request morning or evening safaris, and in some cases, private slots for more flexibility. Custom timings are subject to availability and season."
        }
      },
      {
        "@type": "Question",
        name: "Is food included in family safari packages?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Most family safari packages include meals—breakfast, lunch, and dinner—at the lodge or camp. Some premium packages may also include snacks during the safari ride."
        }
      },
      {
        "@type": "Question",
        name: "Why are Jawai safari prices higher than other regions?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Jawai offers exclusive, low-crowd wildlife experiences and private jeep safaris, which increases costs. The region’s focus on quality, safety, and conservation also factors into pricing."
        }
      },
      {
        "@type": "Question",
        name: "Can I negotiate family safari prices?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "While published rates are standard, it is possible to discuss customizations or special offers for large groups, off-season, or extended stays. Contact our team for tailored quotes."
        }
      },
      {
        "@type": "Question",
        name: "How far in advance should families book Jawai safari?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "For best availability and preferred lodges, booking at least 2-3 months in advance is recommended, especially for peak season (October–April)."
        }
      },
      {
        "@type": "Question",
        name: "Are there discounts for seniors or children?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Children under 12 are often free or at reduced rates. Some properties offer senior citizen discounts—ask for details when booking."
        }
      }
    ]
  };

  // FAQ accordion state
  const [openFaq, setOpenFaq] = React.useState(null);

  return (
    <>
      {/* ================= SEO & STRUCTURED DATA ================= */}
      <Helmet>
        <title>
          Jawai Safari Cost for 2, 4 & Families | Complete Price Breakdown
        </title>
        <meta
          name="description"
          content="Detailed guide on Jawai safari cost for couples, families of 4, kids, and groups. Learn how pricing works, child rules, room allocation, and how our Jawai Safari Calculator estimates your trip."
        />
        <link
          rel="canonical"
          href="https://javainfiltered.com/jawai-guide/jawai-safari-cost-for-2-4-families"
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
                name: "Home",
                item: "https://javainfiltered.com/"
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Jawai Guide",
                item: "https://javainfiltered.com/jawai-guide"
              },
              {
                "@type": "ListItem",
                position: 3,
                name: "Jawai Safari Cost for Families",
                item:
                  "https://javainfiltered.com/jawai-guide/jawai-safari-cost-for-2-4-families"
              }
            ]
          })}
        </script>
        {/* FAQ Schema */}
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
        {/* Article Schema for SEO, Google Discover & AI */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "Jawai Safari Cost for 2, 4 & Families – Complete Pricing Guide",
            "description":
              "In‑depth guide explaining Jawai safari cost for couples, families, children and groups. Covers room allocation, child pricing rules, safari jeep logic, and how Jawai Safari Calculator estimates prices.",
            "author": {
              "@type": "Organization",
              "name": "Jawai Unfiltered"
            },
            "publisher": {
              "@type": "Organization",
              "name": "Jawai Unfiltered",
              "logo": {
                "@type": "ImageObject",
                "url": "https://javainfiltered.com/android-chrome-512x512.png"
              }
            },
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": "https://javainfiltered.com/jawai-guide/jawai-safari-cost-for-2-4-families"
            },
            "dateModified": "2026-02-01"
          })}
        </script>
      </Helmet>

      {/* ================= PAGE CONTENT ================= */}
      <main aria-label="Primary content" className="max-w-5xl mx-auto px-4 py-10 space-y-16">
        {/* HERO */}
        <section className="space-y-6">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            Jawai Safari Cost for 2, 4 & Families
          </h1>
          {/* Quick Cost Snapshot */}
          <div className="bg-gray-100 rounded-xl p-5 grid grid-cols-1 md:grid-cols-3 gap-4 text-center mb-2">
            <div>
              <div className="font-semibold text-gray-700">Couples <span className="block text-xs text-gray-400">(2 people)</span></div>
              <div className="text-xl font-bold text-green-700 mt-1">₹13,000–₹15,000</div>
            </div>
            <div>
              <div className="font-semibold text-gray-700">Families <span className="block text-xs text-gray-400">(4 people)</span></div>
              <div className="text-xl font-bold text-green-700 mt-1">₹20,000–₹25,000</div>
            </div>
            <div>
              <div className="font-semibold text-gray-700">Groups <span className="block text-xs text-gray-400">(6+ people)</span></div>
              <div className="text-xl font-bold text-green-700 mt-1">₹25,000–₹50,000+</div>
            </div>
          </div>
          <p className="text-gray-600 leading-relaxed max-w-3xl text-base md:text-lg">
            Planning a Jawai leopard safari with your partner, family, or children? This guide explains how safari pricing actually works in Jawai, what families should expect, and how costs change depending on group size, rooms, and experience level.
          </p>
        </section>

        {/* TABLE OF CONTENTS */}
        <nav aria-label="Table of contents" className="bg-white border rounded-xl p-4 md:p-5">
          <p className="font-semibold text-gray-900 mb-2">On this page</p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
            <li><a href="#who-this-is-for" className="text-blue-700 hover:underline">Who this guide is for</a></li>
            <li><a href="#pricing-explained" className="text-blue-700 hover:underline">How Jawai pricing works</a></li>
            <li><a href="#cost-for-2" className="text-blue-700 hover:underline">Cost for 2 people</a></li>
            <li><a href="#cost-for-4" className="text-blue-700 hover:underline">Cost for families (4)</a></li>
            <li><a href="#cost-for-6" className="text-blue-700 hover:underline">Cost for groups (6+)</a></li>
            <li><a href="#comparison-table" className="text-blue-700 hover:underline">Cost comparison</a></li>
            <li><a href="#calculator-logic" className="text-blue-700 hover:underline">Calculator logic</a></li>
            <li><a href="#faqs" className="text-blue-700 hover:underline">FAQs</a></li>
          </ul>
        </nav>

        {/* WHO THIS GUIDE IS FOR */}
        <section id="who-this-is-for" className="space-y-4">
          <h2 className="relative pl-4 border-l-4 border-blue-600 text-2xl font-semibold text-gray-900 mb-2">Who This Guide Is For</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white border rounded-lg p-4 flex flex-col items-center">
              <FaUsers className="text-2xl text-blue-500 mb-2" />
              <span className="font-medium">Couples</span>
              <span className="text-gray-500 text-sm mt-1">Romantic escapes & wildlife lovers</span>
            </div>
            <div className="bg-white border rounded-lg p-4 flex flex-col items-center">
              <FaChild className="text-2xl text-pink-500 mb-2" />
              <span className="font-medium">Families with Kids</span>
              <span className="text-gray-500 text-sm mt-1">Safe, educational, and fun for children</span>
            </div>
            <div className="bg-white border rounded-lg p-4 flex flex-col items-center">
              <FaUserFriends className="text-2xl text-green-500 mb-2" />
              <span className="font-medium">Groups & Friends</span>
              <span className="text-gray-500 text-sm mt-1">Adventure with friends or larger groups</span>
            </div>
            <div className="bg-white border rounded-lg p-4 flex flex-col items-center">
              <FaWalking className="text-2xl text-yellow-500 mb-2" />
              <span className="font-medium">Senior Travelers</span>
              <span className="text-gray-500 text-sm mt-1">Comfort-focused, safe, and accessible</span>
            </div>
          </div>
        </section>

        {/* SEARCH INTENT CLARIFIER SECTION (SEO GOLD) */}
        <section className="space-y-4">
          <h2 className="relative pl-4 border-l-4 border-blue-600 text-2xl font-semibold text-gray-900">
            What This Page Helps You Decide
          </h2>
          <p className="text-gray-700 text-base md:text-lg leading-relaxed">
            This page is designed to help travelers understand realistic Jawai safari costs
            before booking. It answers common questions such as how pricing changes for couples,
            families with children, and larger groups, and why Jawai safari prices are structured
            around rooms, jeeps, and experience quality rather than per‑person rates.
          </p>
          <p className="text-gray-700 text-base md:text-lg leading-relaxed">
            If you are comparing Jawai safari costs across websites, wondering why prices vary,
            or trying to budget accurately for your family trip, this guide provides clarity
            without sales pressure.
          </p>
        </section>

        {/* HOW PRICING WORKS */}
        <section id="pricing-explained" className="space-y-5 bg-gray-50 rounded-xl p-6">
          <h2 className="relative pl-4 border-l-4 border-blue-600 text-2xl font-semibold text-gray-900">
            How Jawai Safari Pricing Really Works
          </h2>
          <p className="text-gray-700 leading-relaxed text-base md:text-lg">
            Jawai safari pricing is not calculated strictly per person. Instead, it is a combination of safari jeep allocation, number of rooms, meals, and overall comfort. Official safari operations in Jawai do not run at very low prices. Experiences below standard rates often involve reduced coverage or comfort.
          </p>
          <p className="text-gray-700 leading-relaxed text-base md:text-lg">
            The cost structure rewards group travel: the more people sharing a jeep or room, the lower the per-person cost. However, privacy, exclusivity, and premium stays increase the total. It's important to balance your expectations—shared jeeps are more economical, while private jeeps and suites cost more.
          </p>
        </section>

        {/* SEMANTIC PRICING MYTHS SECTION (THICKNESS + TRUST) */}
        <section className="space-y-5 bg-white border rounded-xl p-6">
          <h2 className="relative pl-4 border-l-4 border-blue-600 text-2xl font-semibold text-gray-900">
            Common Myths About Jawai Safari Pricing
          </h2>
          <p className="text-gray-700 text-base md:text-lg leading-relaxed">
            A common misconception is that Jawai safari cost is calculated per person.
            In reality, official Jawai safaris operate on a combination of jeep allocation,
            room usage, meals, and experience quality.
          </p>
          <p className="text-gray-700 text-base md:text-lg leading-relaxed">
            Another myth is that very low safari prices represent better deals.
            In practice, unusually low prices often involve reduced safari coverage,
            limited wildlife zones, or compromised comfort.
          </p>
          <p className="text-gray-700 text-base md:text-lg leading-relaxed">
            Understanding how pricing works allows families to compare experiences fairly
            instead of comparing numbers alone.
          </p>
        </section>

        {/* COST FOR 2 */}
        <section id="cost-for-2" className="space-y-5">
          <h2 className="relative pl-4 border-l-4 border-blue-600 text-2xl font-semibold text-gray-900">
            Jawai Safari Cost for 2 People
          </h2>
          <p className="text-gray-700 text-base md:text-lg leading-relaxed">
            Ideal for couples or friends, a two-person Jawai safari generally includes one room, meals, and a shared or private safari jeep. Approximate cost usually falls between <strong>₹13,000–₹15,000</strong>, depending on stay category and comfort level.
          </p>
          <p className="text-gray-700 text-base md:text-lg leading-relaxed">
            <strong>Why pricing varies:</strong> Couples can choose between sharing a safari jeep with other guests or booking a private jeep for more exclusivity. Private jeeps increase the cost but offer a more personalized wildlife experience.
          </p>
          <p className="text-gray-700 text-base md:text-lg leading-relaxed">
            <strong>Stay category impact:</strong> The choice of accommodation—budget camp, boutique lodge, or luxury tent—significantly affects the total price. Premium stays with top amenities and curated meals are at the higher end of the range.
          </p>
          <p className="text-gray-700 text-base md:text-lg leading-relaxed">
            <strong>Jeep sharing vs private:</strong> Sharing a jeep can reduce costs, but some couples prefer a private vehicle for privacy and photography flexibility.
          </p>
        </section>

        {/* COST FOR 4 */}
        <section id="cost-for-4" className="space-y-5 bg-gray-50 rounded-xl p-6">
          <h2 className="relative pl-4 border-l-4 border-blue-600 text-2xl font-semibold text-gray-900">
            Jawai Safari Cost for 4 People (Families)
          </h2>
          <p className="text-gray-700 text-base md:text-lg leading-relaxed">
            For families of four, two rooms are typically allocated. Children below 12 years are generally not charged for safari or stay. Premium family experiences usually range between <strong>₹20,000–₹25,000</strong>.
          </p>
          <p className="text-gray-700 text-base md:text-lg leading-relaxed">
            <strong>Why pricing varies:</strong> Families may select different room types (interconnected, suite, or tents) and meal plans, which affect the final price. Larger family rooms or suites are available at some properties.
          </p>
          <p className="text-gray-700 text-base md:text-lg leading-relaxed">
            <strong>Safari jeep sharing vs private:</strong> Families can choose to share a jeep with other guests or book a private jeep for exclusive use, which is recommended for young children or elderly members for added comfort.
          </p>
          <p className="text-gray-700 text-base md:text-lg leading-relaxed">
            <strong>Stay category impact:</strong> Upgrading to premium family cottages or boutique lodges, or opting for additional experiences like village walks or nature trails, can increase the package price.
          </p>
        </section>

        {/* COST FOR 6 */}
        <section id="cost-for-6" className="space-y-5">
          <h2 className="relative pl-4 border-l-4 border-blue-600 text-2xl font-semibold text-gray-900">
            Jawai Safari Cost for 6 People & Larger Groups
          </h2>
          <p className="text-gray-700 text-base md:text-lg leading-relaxed">
            Groups of six may opt for three rooms for comfort or adjust with two rooms if preferred. Costs can range from <strong>₹25,000 to ₹50,000+</strong>, depending on experience level, safari privacy, and meals.
          </p>
          <p className="text-gray-700 text-base md:text-lg leading-relaxed">
            <strong>Why pricing varies:</strong> Larger groups benefit from sharing jeeps and rooms, which reduces the per-person rate. However, requesting multiple jeeps or luxury room categories increases the total cost.
          </p>
          <p className="text-gray-700 text-base md:text-lg leading-relaxed">
            <strong>Safari jeep sharing vs private:</strong> Groups can split into separate jeeps for a more comfortable ride or all travel together if desired. Exclusive jeeps are ideal for photography groups or those seeking a tailored wildlife experience.
          </p>
          <p className="text-gray-700 text-base md:text-lg leading-relaxed">
            <strong>Stay category impact:</strong> Opting for luxury or heritage properties, or adding extra activities such as guided walks or cultural tours, will push the price to the higher end of the range.
          </p>
        </section>

        {/* COST COMPARISON TABLE */}
        <section id="comparison-table" className="space-y-4 bg-gray-50 rounded-xl p-6">
          <h2 className="relative pl-4 border-l-4 border-blue-600 text-2xl font-semibold text-gray-900 mb-2">Cost Comparison by Group Size</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full border rounded-lg text-base md:text-lg">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border px-3 py-2 text-left">Group Size</th>
                  <th className="border px-3 py-2 text-left">Rooms</th>
                  <th className="border px-3 py-2 text-left">Safari Type</th>
                  <th className="border px-3 py-2 text-left">Experience Level</th>
                  <th className="border px-3 py-2 text-left">Price Range</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border px-3 py-2">2 (Couple)</td>
                  <td className="border px-3 py-2">1</td>
                  <td className="border px-3 py-2">Shared/Private Jeep</td>
                  <td className="border px-3 py-2">Standard to Premium</td>
                  <td className="border px-3 py-2">₹13,000–₹15,000</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border px-3 py-2">4 (Family)</td>
                  <td className="border px-3 py-2">2</td>
                  <td className="border px-3 py-2">Private Jeep</td>
                  <td className="border px-3 py-2">Premium Family</td>
                  <td className="border px-3 py-2">₹20,000–₹25,000</td>
                </tr>
                <tr>
                  <td className="border px-3 py-2">6+</td>
                  <td className="border px-3 py-2">3+</td>
                  <td className="border px-3 py-2">Private/Multiple Jeeps</td>
                  <td className="border px-3 py-2">Premium/Custom</td>
                  <td className="border px-3 py-2">₹25,000–₹50,000+</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* CALCULATOR LOGIC */}
        <section id="calculator-logic" className="space-y-4">
          <h2 className="relative pl-4 border-l-4 border-blue-600 text-2xl font-semibold text-gray-900">
            How Our Jawai Safari Calculator Estimates Cost
          </h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2 text-base md:text-lg">
            <li>Every 2 adults = 1 room allocation</li>
            <li>4 children below 12 years = equivalent to 1 adult</li>
            <li>Less than 4 children usually incur no extra cost</li>
            <li>Safari-only bookings can be discussed separately</li>
          </ul>
          <p className="text-sm text-gray-600 mt-3">
            Prices shown are estimated Jawai safari costs. Final pricing may vary slightly based on
            season, lodge availability, safari zone coverage, and customization preferences.
          </p>
        </section>

        {/* INTERNAL LINKS SEO BLOCK */}
        <section className="bg-white border rounded-xl p-5 space-y-3">
          <p className="font-semibold text-gray-900">Helpful Jawai Safari Guides</p>
          <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
            <li><Link to="/jawai-guide/jawai-safari-cost-breakdown">Detailed Jawai Safari Cost Breakdown</Link></li>
            <li><Link to="/jawai-guide/jawai-safari-price-calculator">Jawai Safari Price Calculator</Link></li>
            <li><Link to="/jawai-guide/price-vs-experience">Jawai Safari Price vs Experience</Link></li>
            <li><Link to="/jawai-guide/travel-awareness/book-genuine-jawai-safari">How to Book Genuine Jawai Safari</Link></li>
            <li><Link to="/jawai-guide/travel-awareness/common-booking-mistakes">Common Jawai Safari Booking Mistakes</Link></li>
          </ul>
        </section>

        {/* INTERNAL CRAWL DEPTH BOOST (HIDDEN BUT LEGIT) */}
        <section className="sr-only">
          <h2>Jawai Safari Cost Related Resources</h2>
          <p>
            Learn more about Jawai safari pricing, family safari planning, safari experience
            comparison, Jawai leopard safari safety, booking authenticity, and route coverage
            through our detailed Jawai travel guides.
          </p>
        </section>

        {/* CTA */}
        <section className="space-y-4 bg-gray-50 rounded-xl p-6">
          <h2 className="relative pl-4 border-l-4 border-blue-600 text-2xl font-semibold text-gray-900">
            Estimate Your Family Safari Cost
          </h2>
          <p className="text-gray-700 text-base md:text-lg leading-relaxed">
            You can calculate an estimated Jawai safari cost based on your group size, comfort level, and preferences using our calculator.
          </p>
          <Link
            to="/price-calculator"
            className="inline-block bg-black text-white px-6 py-3 rounded-lg text-sm font-medium hover:bg-gray-800 transition"
          >
            Use Jawai Safari Price Calculator
          </Link>
        </section>

        {/* NOTE ABOUT DISCOUNTS */}
        <section className="bg-yellow-50 border border-yellow-200 rounded-xl p-5">
          <p className="text-gray-800 text-sm leading-relaxed">
            Note: Safari prices listed here include stay, safari, and meals. Safari-only options can be arranged separately. Discounts, special requests, or custom itineraries may be discussed by contacting our team directly.
          </p>
        </section>

        {/* RELATED JAWAI GUIDES */}
        <section className="space-y-4">
          <h2 className="relative pl-4 border-l-4 border-blue-600 text-2xl font-semibold text-gray-900 mb-2">Related Jawai Guides</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link
              to="/jawai-guide/jawai-safari-cost-breakdown"
              className="block bg-white border rounded-lg p-4 shadow-sm hover:shadow-md transition hover:border-blue-400"
            >
              <div className="font-semibold text-blue-700 mb-1">Jawai Safari Cost Breakdown</div>
              <div className="text-gray-500 text-sm">Detailed analysis of all cost components</div>
            </Link>
            <Link
              to="/jawai-guide/jawai-safari-price-calculator"
              className="block bg-white border rounded-lg p-4 shadow-sm hover:shadow-md transition hover:border-blue-400"
            >
              <div className="font-semibold text-blue-700 mb-1">Jawai Safari Price Calculator</div>
              <div className="text-gray-500 text-sm">Estimate your personalized safari cost</div>
            </Link>
            <Link
              to="/jawai-guide/jawai-safari-package"
              className="block bg-white border rounded-lg p-4 shadow-sm hover:shadow-md transition hover:border-blue-400"
            >
              <div className="font-semibold text-blue-700 mb-1">Jawai Safari Package</div>
              <div className="text-gray-500 text-sm">See sample packages for all group sizes</div>
            </Link>
            <Link
              to="/jawai-guide/price-vs-experience"
              className="block bg-white border rounded-lg p-4 shadow-sm hover:shadow-md transition hover:border-blue-400"
            >
              <div className="font-semibold text-blue-700 mb-1">Price vs Experience</div>
              <div className="text-gray-500 text-sm">How price affects your safari experience</div>
            </Link>
          </div>
        </section>

        {/* FAQ EXPANDED */}
        <section id="faqs" className="space-y-4 bg-gray-50 rounded-xl p-6 mt-10">
          <h2 className="relative pl-4 border-l-4 border-blue-600 text-2xl font-semibold text-gray-900 mb-2">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div key={idx} className="border rounded-lg bg-white">
                <button
                  className="w-full text-left px-4 py-3 focus:outline-none flex items-center justify-between"
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  aria-expanded={openFaq === idx}
                >
                  <span className="font-medium text-gray-800">{faq.q}</span>
                  <span className="ml-2">{openFaq === idx ? "−" : "+"}</span>
                </button>
                {openFaq === idx && (
                  <div className="px-4 pb-4 text-gray-700 leading-relaxed text-base md:text-lg">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* EEAT & TRUST SIGNALS */}
        <section className="space-y-2 flex flex-col items-center mt-6">
          <div className="flex flex-wrap gap-3 justify-center">
            <span className="inline-flex items-center bg-green-100 text-green-700 text-sm font-medium px-3 py-1 rounded-full border border-green-200">
              <FaRegSmile className="mr-1" /> 6+ years of on-ground Jawai safari operations
            </span>
            <span className="inline-flex items-center bg-blue-100 text-blue-700 text-sm font-medium px-3 py-1 rounded-full border border-blue-200">
              <FaShieldAlt className="mr-1" /> Local coordination team in Jawai
            </span>
            <span className="inline-flex items-center bg-yellow-100 text-yellow-700 text-sm font-medium px-3 py-1 rounded-full border border-yellow-200">
              <FaUsers className="mr-1" /> Used by 1,000+ families & couples
            </span>
          </div>
        </section>

        {/* EEAT TRUST SENTENCE */}
        <p className="text-sm text-gray-500">
          This guide is based on real Jawai safari operations, verified lodge pricing,
          and family booking patterns observed across multiple seasons.
        </p>

        {/* LAST UPDATED */}
        <section className="text-sm text-gray-500 mt-8">
          Last updated: February 2026 · Verified with on-ground Jawai safari operators and current lodge pricing
        </section>
      </main>
    </>
  );
}
