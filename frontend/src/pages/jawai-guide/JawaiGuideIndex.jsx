import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

export default function JawaiGuideIndex() {
  return (
    <>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.jawaiunfiltered.com/" },
              { "@type": "ListItem", "position": 2, "name": "Jawai Guide", "item": "https://www.jawaiunfiltered.com/jawai-guide" }
            ]
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "Is Jawai safari expensive?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Jawai safari costs vary by season, stay category, and group size. Entry-level safaris start around ₹3,500 per drive, while luxury experiences can be higher. Use our Jawai safari price calculator for accurate estimates."
                }
              },
              {
                "@type": "Question",
                "name": "How many days are enough for Jawai?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A 2–3 night stay with 3–4 safaris is recommended for good leopard sighting chances and a relaxed pace. This allows you to explore multiple hill ranges and enjoy the landscape."
                }
              },
              {
                "@type": "Question",
                "name": "Is Jawai safe for families?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, Jawai is considered very safe for families. Safari vehicles are private, crowd levels are low, and most camps have strong safety protocols. Always follow guide instructions and ethical wildlife guidelines."
                }
              },
              {
                "@type": "Question",
                "name": "Do I need permits to visit or do a safari?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No special permits are needed for Jawai safaris, as the area is not a national park. All safaris are organized through camps or local operators with community permissions."
                }
              },
              {
                "@type": "Question",
                "name": "Are leopard sightings guaranteed?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "While Jawai has one of India’s highest leopard sighting rates, no wildlife sighting can be 100% guaranteed. Your chances improve with multiple safaris and experienced trackers."
                }
              },
              {
                "@type": "Question",
                "name": "What’s the best time to visit Jawai for wildlife?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "October to April offers the most comfortable weather and active leopard movement, but summer and monsoon have their own unique advantages."
                }
              }
            ]
          })}
        </script>
        <html lang="en-IN" />
        <title>
          Jawai Travel Guide 2026 | Leopard Safari, Luxury Stays & Real Insights
        </title>

        <meta
          name="description"
          content="Jawai Travel Guide 2026: Honest safari costs, safety clarity, routes explained, and real on-ground insights. Compare Jawai with other safaris and decide if it’s worth it for you."
        />
        <meta
          name="keywords"
          content="Jawai travel guide, Jawai leopard safari, Jawai luxury stays, Jawai safari cost, Jawai best time to visit, Jawai photography tips, Jawai vs Ranthambore, Jawai vs Gir, Jawai wildlife tourism, Jawai leopard sightings, Jawai safari planning, Jawai travel tips"
        />

        <link
          rel="canonical"
          href="https://www.jawaiunfiltered.com/jawai-guide"
        />

        <meta name="robots" content="index, follow" />

        {/* Open Graph Tags */}
        <meta property="og:title" content="Jawai Travel Guide 2026 | Leopard Safari, Luxury Stays & Real Insights" />
        <meta property="og:description" content="The most detailed Jawai travel guide by Jawai Unfiltered. Explore Jawai leopard safari, best time to visit, safari cost, luxury stays, safety, photography tips, and comparisons with Ranthambore & Gir." />
        <meta property="og:url" content="https://www.jawaiunfiltered.com/jawai-guide" />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Jawai Unfiltered" />

        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Jawai Travel Guide 2026 | Leopard Safari, Luxury Stays & Real Insights" />
        <meta name="twitter:description" content="The most detailed Jawai travel guide by Jawai Unfiltered. Explore Jawai leopard safari, best time to visit, safari cost, luxury stays, safety, photography tips, and comparisons with Ranthambore & Gir." />

        {/* Article Meta */}
        <meta property="article:section" content="Travel Guide" />
        <meta property="article:author" content="Jawai Unfiltered" />

        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "Jawai Travel Guide",
            description:
              "Comprehensive Jawai travel and leopard safari guide covering wildlife, safari planning, seasons, pricing, luxury stays, safety, and photography.",
            url: "https://www.jawaiunfiltered.com/jawai-guide",
            publisher: {
              "@type": "Organization",
              name: "Jawai Unfiltered",
              url: "https://www.jawaiunfiltered.com",
            },
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "Jawai Travel Guide 2026 | Leopard Safari, Luxury Stays & Real Insights",
            description:
              "Unlock real Jawai safari insights: See if Jawai is right for you, compare costs, safety, and luxury stays. Discover the best time, ethical safaris, and expert tips—all in one trusted guide.",
            author: {
              "@type": "Organization",
              name: "Jawai Unfiltered",
            },
            publisher: {
              "@type": "Organization",
              name: "Jawai Unfiltered",
              logo: {
                "@type": "ImageObject",
                url: "https://www.jawaiunfiltered.com/logo-placeholder.png",
              },
            },
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": "https://www.jawaiunfiltered.com/jawai-guide",
            },
            datePublished: "2024-01-01T00:00:00Z",
            dateModified: "2024-06-18T00:00:00Z",
          })}
        </script>
        {/* Speakable schema for main headline and hub authority */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SpeakableSpecification",
            "xpath": [
              "/html/body//h1",
              "/html/body//section[contains(@class, 'mb-10')]/div/p[1]",
              "/html/body//section[contains(@class, 'mb-10')]/div/p[2]"
            ]
          })}
        </script>
        {/* ItemList schema for Knowledge Hub cards */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "url": "https://www.jawaiunfiltered.com/jawai-guide/jawai-safari-price-calculator",
                "name": "Safari Price Calculator"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "url": "https://www.jawaiunfiltered.com/jawai-guide/best-time-to-visit",
                "name": "Best Time to Visit"
              },
              {
                "@type": "ListItem",
                "position": 3,
                "url": "https://www.jawaiunfiltered.com/jawai-guide/leopard-safari-guide",
                "name": "Leopard Safari Guide"
              },
              {
                "@type": "ListItem",
                "position": 4,
                "url": "https://www.jawaiunfiltered.com/jawai-guide/jawai-vs-other-safaris",
                "name": "Jawai vs Other Safaris"
              },
              {
                "@type": "ListItem",
                "position": 5,
                "url": "https://www.jawaiunfiltered.com/jawai-guide/safari-pricing-guide",
                "name": "Safari Cost & Budget"
              },
              {
                "@type": "ListItem",
                "position": 6,
                "url": "https://www.jawaiunfiltered.com/jawai-guide/price-vs-experience",
                "name": "Jawai Safari Price vs Experience"
              },
              {
                "@type": "ListItem",
                "position": 7,
                "url": "https://www.jawaiunfiltered.com/jawai-guide/jawai-safari-cost-for-2-4-families",
                "name": "Jawai Safari Cost for Couples & Families"
              },
              {
                "@type": "ListItem",
                "position": 8,
                "url": "https://www.jawaiunfiltered.com/jawai-guide/is-jawai-safari-worth-the-price",
                "name": "Is Jawai Safari Worth the Price?"
              },
              {
                "@type": "ListItem",
                "position": 9,
                "url": "https://www.jawaiunfiltered.com/jawai-guide/travel-awareness/jawai-safari-safety",
                "name": "Jawai Safari Safety Guide"
              },
              {
                "@type": "ListItem",
                "position": 10,
                "url": "https://www.jawaiunfiltered.com/jawai-guide/travel-awareness/book-genuine-jawai-safari",
                "name": "How to Book a Genuine Jawai Safari"
              },
              {
                "@type": "ListItem",
                "position": 11,
                "url": "https://www.jawaiunfiltered.com/jawai-guide/travel-awareness/common-booking-mistakes",
                "name": "Common Mistakes While Booking Jawai Safari"
              },
              {
                "@type": "ListItem",
                "position": 12,
                "url": "https://www.jawaiunfiltered.com/jawai-guide/travel-awareness/driver-family-facilities",
                "name": "What About Drivers and Elderly Family Members?"
              },
              {
                "@type": "ListItem",
                "position": 13,
                "url": "https://www.jawaiunfiltered.com/jawai-guide/travel-awareness/leopard-vs-tiger-safari-safety",
                "name": "Leopard Safari vs Tiger Safari Safety"
              },
              {
                "@type": "ListItem",
                "position": 14,
                "url": "https://www.jawaiunfiltered.com/jawai-guide/jawai-safari-routes",
                "name": "Jawai Safari Routes Explained"
              },
              {
                "@type": "ListItem",
                "position": 15,
                "url": "https://www.jawaiunfiltered.com/jawai-guide/jawai-vs-ranthambore-vs-gir",
                "name": "Jawai vs Ranthambore vs Gir"
              },
              {
                "@type": "ListItem",
                "position": 16,
                "url": "https://www.jawaiunfiltered.com/jawai-guide/why-jawai-safari-feels-personal",
                "name": "Why Jawai Safari Feels More Personal"
              },
              {
                "@type": "ListItem",
                "position": 17,
                "url": "https://www.jawaiunfiltered.com/jawai-guide/is-jawai-safari-worth-it",
                "name": "Is Jawai Safari Worth It?"
              }
            ]
          })}
        </script>
      </Helmet>

      <main className="max-w-6xl mx-auto px-4 py-6 md:py-10 overflow-x-hidden" itemScope itemType="https://schema.org/Article">
        {/* BREADCRUMB - Responsive wrap */}
        <nav aria-label="Breadcrumb" className="text-sm text-gray-500 mb-6">
          <ol className="flex flex-wrap items-center gap-y-2 gap-x-2">
            <li><Link to="/" className="hover:underline whitespace-nowrap">Home</Link></li>
            <li className="text-gray-400">→</li>
            <li className="font-medium text-gray-700 truncate">Jawai Guide</li>
          </ol>
        </nav>

        {/* HERO SECTION */}
        <section className="mb-10 md:mb-12 border-b pb-8">
          <h1 className="text-2xl md:text-4xl font-bold mb-4 leading-tight text-gray-900" itemProp="headline">
            Jawai Travel Guide: Leopard Safari, Luxury Stays & Real Insights
          </h1>
          <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-600">
            <span className="flex items-center">✔ <span className="ml-1">Trusted by 1,200+ travelers</span></span>
            <span className="flex items-center">✔ <span className="ml-1">Local experts</span></span>
            <span className="flex items-center">✔ <span className="ml-1">No resellers</span></span>
          </div>
          <div itemProp="articleBody" className="mt-6">
            <p className="text-gray-600 max-w-4xl leading-relaxed break-words">
              This is the most detailed and experience-backed{" "}
              <strong>Jawai Travel Guide</strong>, curated by{" "}
              <strong>Jawai Unfiltered</strong>. Whether you are planning a leopard
              safari, a luxury wildlife holiday, or a photography expedition, this
              guide answers everything — without hype or misinformation.
            </p>
            <p className="text-gray-800 font-medium mt-3 max-w-3xl">
              This guide reflects how Jawai safaris are actually planned and conducted on the ground — based on real tracking, terrain movement, and local decision-making, not brochure promises.
            </p>
            {/* HUB AUTHORITY & SEARCH INTENT COVERAGE */}
            <p className="text-blue-900/90 font-medium mt-6 max-w-3xl">
              <strong>This page is the central Jawai Safari knowledge hub</strong>—your starting point for all things Jawai. Here you’ll find authoritative, experience-backed answers and links to in-depth guides on planning, pricing, routes, safety, stays, and more.
            </p>
            <div className="mt-5 bg-gray-50 border border-gray-100 rounded-lg p-4 max-w-3xl">
              <p className="text-sm font-semibold text-gray-900 mb-1">Who this guide is for:</p>
              <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
                <li>First-time safari travelers comparing Jawai with national parks</li>
                <li>Families, couples, photographers, and slow-travel seekers</li>
                <li>Travelers who want honest costs, safety clarity, and realistic expectations</li>
              </ul>
            </div>
            <p className="text-gray-700 mt-3 text-sm max-w-2xl">
              Wondering: <em>“Should I choose Jawai Safari?”</em> or <em>“Is Jawai good for first-time safari travelers?”</em> or even <em>“Who should—or should not—choose Jawai?”</em> You’ll find clear, honest answers below.
            </p>
            <div className="bg-blue-50 border-l-4 border-blue-400 rounded-md p-4 my-6 shadow-sm max-w-2xl">
              <p className="text-blue-900 font-semibold">
                Quiet hills. Open routes. No fixed zones. No chase culture. That’s what makes Jawai safari fundamentally different.
              </p>
            </div>
            {/* Responsive Highlights Grid */}
            <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 gap-3 mt-8">
              <Highlight label="Leopard Sightings" value="High" />
              <Highlight label="Best Season" value="Oct – Apr" />
              <Highlight label="Safari Cost" value="₹3,500+" />
              <Highlight label="Crowd Level" value="Low" />
            </div>
          </div>
        </section>

        {/* HUB-LEVEL JUMP LINKS */}
        <section className="mb-8 flex justify-center">
          <nav aria-label="Guide Sections">
            <ul className="flex flex-wrap gap-2">
              <li>
                <a
                  href="#why-jawai"
                  className="px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-xs font-medium uppercase tracking-wide hover:bg-blue-50 transition"
                >
                  Why Jawai
                </a>
              </li>
              <li>
                <a
                  href="#planning"
                  className="px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-xs font-medium uppercase tracking-wide hover:bg-blue-50 transition"
                >
                  Planning
                </a>
              </li>
              <li>
                <a
                  href="#pricing"
                  className="px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-xs font-medium uppercase tracking-wide hover:bg-blue-50 transition"
                >
                  Pricing
                </a>
              </li>
              <li>
                <a
                  href="#faq"
                  className="px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-xs font-medium uppercase tracking-wide hover:bg-blue-50 transition"
                >
                  FAQ
                </a>
              </li>
            </ul>
          </nav>
        </section>

        <div className="grid lg:grid-cols-[220px_1fr] gap-10">
          {/* DESKTOP SIDEBAR */}
          <aside className="hidden lg:block sticky top-24 h-fit text-sm">
            <div className="mb-2 flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 text-xs font-semibold tracking-wide">You’re here</span>
            </div>
            <p className="font-semibold mb-4 text-gray-900 uppercase tracking-wider">On this page</p>
            <ul className="space-y-3 text-gray-600 border-l border-gray-100 pl-4">
              <li><a href="#why-jawai" className="hover:text-blue-700 transition">Why Jawai</a></li>
              <li><a href="#planning" className="hover:text-blue-700 transition">Safari Planning</a></li>
              <li><a href="#pricing" className="hover:text-blue-700 transition">Safari Cost</a></li>
              <li><a href="#calculator" className="hover:text-blue-700 transition">Price Calculator</a></li>
              <li><a href="#faq" className="hover:text-blue-700 transition">FAQs</a></li>
            </ul>
          </aside>

          <div className="w-full min-w-0"> {/* min-w-0 prevents grid blowout */}
            {/* QUICK FACTS */}
            <section className="mb-12 bg-gray-50 rounded-xl p-5 md:p-8 border border-gray-100" aria-label="Jawai at a Glance Quick Facts">
              <h2 className="text-xl md:text-2xl font-bold mb-5 text-gray-800">
                Jawai at a Glance (Quick Facts)
              </h2>
              <ul className="grid sm:grid-cols-2 gap-4 text-gray-700 text-sm md:text-base">
                <li className="flex items-start">📍 <span className="ml-2"><b>Location:</b> Pali District, Rajasthan</span></li>
                <li className="flex items-start">🐆 <span className="ml-2"><b>Famous For:</b> Free-roaming Leopards</span></li>
                <li className="flex items-start">🚙 <span className="ml-2"><b>Safari Type:</b> Open Jeep (Non-Forest)</span></li>
                <li className="flex items-start">📸 <span className="ml-2"><b>Ideal For:</b> Wildlife Photography</span></li>
                <li className="flex items-start">🏨 <span className="ml-2"><b>Stay Options:</b> Luxury Camps & Resorts</span></li>
                <li className="flex items-start">🌿 <span className="ml-2"><b>Unique:</b> Human–Leopard Coexistence</span></li>
              </ul>
            </section>

            {/* WHY JAWAI */}
            <section id="why-jawai" className="mb-14 scroll-mt-24">
              <h2 className="text-2xl font-bold mb-4 text-gray-900">
                Why Jawai Is Different from Other Safari Destinations
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed md:text-lg">
                <p>
                  Jawai is not a national park — and that is its biggest strength.
                  Leopards here roam freely across granite hills, villages, and open
                  landscapes. There are no forest entry gates, no fixed safari routes,
                  and no overcrowding like Ranthambore or Bandhavgarh.
                </p>
                <p>
                  Because of this unique ecosystem, leopard sightings in Jawai are
                  frequent, natural, and stress-free for both animals and visitors.
                  This makes Jawai one of the most ethical and photographer-friendly
                  leopard safari destinations in India.
                </p>
                {/* Visual Anchor Block: Highlighted Ethical Safari Quote */}
                <div className="bg-green-50 border-l-4 border-green-400 rounded-md p-4 my-6 shadow-sm max-w-2xl">
                  <blockquote className="italic text-green-900 font-medium">
                    “Jawai safaris are calm, non-chase, and deeply ethical. Here, leopards are observed at their own pace—no crowding, no aggressive pursuit, just quiet respect for wildlife.”
                  </blockquote>
                </div>
                {/* Micro-examples of on-ground moments */}
                <div className="text-gray-600 text-base mt-1">
                  <span className="block">Example: During most drives, guides switch off the jeep’s radio and wait in silence, letting the landscape reveal its secrets naturally.</span>
                  <span className="block">It’s common to spend 15–20 minutes simply watching a leopard bask on a rock, with no rush or pressure to move on.</span>
                </div>
              </div>
            </section>

            <hr className="my-12 border-gray-100" />

            {/* PLANNING SECTION */}
            <section id="planning" className="mb-14 scroll-mt-24">
              <h2 className="text-2xl font-bold mb-4 text-gray-900">
                How to Plan a Jawai Safari the Right Way
              </h2>
              <div className="space-y-6">
                {[
                  {
                    title: "Choosing Your Safari Type",
                    text: "Decide between standard leopard safaris, private photo safaris, or exclusive experiences.",
                    linkText: "See our in-depth Jawai Leopard Safari format guide",
                    url: "/jawai-guide/leopard-safari-guide"
                  },
                  {
                    title: "Selecting Your Stay Category",
                    text: "Jawai offers everything from boutique camps to luxury lodges. Your choice impacts privacy and comfort.",
                    linkText: "Estimate your costs with the Jawai Safari Price Calculator",
                    url: "/jawai-guide/jawai-safari-price-calculator"
                  },
                  {
                    title: "Understanding Seasonal Pricing",
                    text: "Safari prices vary by month. Peak season (October–April) sees higher demand.",
                    linkText: "Check the best time to visit Jawai for your needs",
                    url: "/jawai-guide/best-time-to-visit"
                  }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm">
                      {idx + 1}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">{item.title}</h3>
                      <p className="text-gray-700 mt-1">
                        {item.text}{" "}
                        <Link to={item.url} className="text-blue-700 font-medium underline underline-offset-4">
                          {item.linkText}
                        </Link>
                      </p>
                    </div>
                  </div>
                ))}
                {/* Micro-example: On-ground planning moment */}
                <div className="text-gray-600 text-base mt-2">
                  <span className="block">Example: Your guide may suggest a sunrise drive with a slow climb up the granite hills—no rush, just the sound of peacocks and the hope of a leopard silhouette against the sky.</span>
                </div>
              </div>
            </section>

            {/* KNOWLEDGE HUB GRID */}
            <section className="mb-16 bg-white">
              <h2 className="text-2xl font-bold mb-6 text-gray-900">
                Jawai Travel Knowledge Hub
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {/* Category: Planning & Costs */}
                <div className="col-span-full">
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 mt-1 pl-1">
                    Planning & Costs
                  </h3>
                </div>
                <GuideCard
                  title="Safari Price Calculator"
                  description="Instantly estimate your complete Jawai safari budget with transparent pricing."
                  link="/jawai-guide/jawai-safari-price-calculator"
                  anchor="Calculate your Jawai safari costs instantly"
                />
                <GuideCard
                  title="Best Time to Visit"
                  description="Month-wise weather, sightings, and pricing for every type of traveler."
                  link="/jawai-guide/best-time-to-visit"
                  anchor="See the best time to visit Jawai"
                />
                <GuideCard
                  title="Leopard Safari Guide"
                  description="Safari formats, vehicle types, booking tips, and ethical travel advice."
                  link="/jawai-guide/leopard-safari-guide"
                  anchor="Explore the full Jawai Leopard Safari guide"
                />
                <GuideCard
                  title="Jawai vs Other Safaris"
                  description="How Jawai compares to Ranthambore, Gir, and other top destinations."
                  link="/jawai-guide/jawai-vs-other-safaris"
                  anchor="Compare Jawai with other Indian safaris"
                />
                <GuideCard
                  title="Safari Cost & Budget"
                  description="Detailed breakdown of every cost element — from safari to stay to travel."
                  link="/jawai-guide/safari-pricing-guide"
                  anchor="Read the complete Jawai safari cost breakdown"
                />
                <GuideCard
                  title="Jawai Safari Price vs Experience"
                  description="Understand why Jawai safari prices vary and how cost impacts routes, time, and overall experience."
                  link="/jawai-guide/price-vs-experience"
                  anchor="Learn how price changes your Jawai safari experience"
                />
                <GuideCard
                  title="Jawai Safari Cost for Couples & Families"
                  description="Exact cost breakdown for couples, families, kids, room allocation logic, and how safari pricing is calculated."
                  link="/jawai-guide/jawai-safari-cost-for-2-4-families"
                  anchor="See Jawai safari costs for families and couples"
                />
                <GuideCard
                  title="Is Jawai Safari Worth the Price?"
                  description="An honest breakdown of Jawai safari pricing versus the experience you actually get on the ground."
                  link="/jawai-guide/is-jawai-safari-worth-the-price"
                  anchor="Find out if Jawai safari is worth the price"
                />
                {/* Category: Safety & Awareness */}
                <div className="col-span-full">
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 mt-6 pl-1">
                    Safety & Awareness
                  </h3>
                </div>
                <GuideCard
                  title="Jawai Safari Safety Guide"
                  description="A detailed safety guide covering leopard behavior, safari vehicles, family safety, and common myths."
                  link="/jawai-guide/travel-awareness/jawai-safari-safety"
                  anchor="Read full Jawai Safari safety guide"
                />
                <GuideCard
                  title="How to Book a Genuine Jawai Safari"
                  description="Step-by-step guide to booking a genuine Jawai safari, avoiding scams, and ensuring verified confirmations."
                  link="/jawai-guide/travel-awareness/book-genuine-jawai-safari"
                  anchor="See how to book a genuine Jawai safari"
                />
                <GuideCard
                  title="Common Mistakes While Booking Jawai Safari"
                  description="Learn the most common booking mistakes travelers make in Jawai — from unrealistic pricing to route shortcuts — and how to avoid compromising your safari experience."
                  link="/jawai-guide/travel-awareness/common-booking-mistakes"
                  anchor="Avoid common Jawai safari booking mistakes"
                />
                <GuideCard
                  title="What About Drivers and Elderly Famaly Members ?"
                  description= "As part of our on-ground coordination, we provide free..."
                  link="/jawai-guide/travel-awareness/driver-family-facilities"
                  anchor="See facilities for drivers & elderly family"
                />
                <GuideCard
                  title="Leopard Safari vs Tiger Safari Safety"
                  description="A factual safety comparison based on animal behavior, safari structure, and on-ground reality."
                  link="/jawai-guide/travel-awareness/leopard-vs-tiger-safari-safety"
                  anchor="See leopard vs tiger safari safety comparison"
                />
                {/* Category: Experience & Comparisons */}
                <div className="col-span-full">
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 mt-6 pl-1">
                    Experience & Comparisons
                  </h3>
                </div>
                <GuideCard
                  title="Jawai Safari Routes Explained"
                  description="Understand Jawai’s open safari routes, hill ranges, dam zones, and how different terrains affect sightings and experience."
                  link="/jawai-guide/jawai-safari-routes"
                  anchor="Explore Jawai safari routes and zones"
                />
                <GuideCard
                  title="Jawai vs Ranthambore vs Gir"
                  description="A clear comparison of crowd levels, animal behavior, safety, photography freedom, and overall safari experience."
                  link="/jawai-guide/jawai-vs-ranthambore-vs-gir"
                  anchor="See Jawai vs Ranthambore vs Gir comparison"
                />
                <GuideCard
                  title="Why Jawai Safari Feels More Personal"
                  description="Explore why Jawai safaris feel slower, quieter, and more personal compared to national parks."
                  link="/jawai-guide/why-jawai-safari-feels-personal"
                  anchor="Learn why Jawai safaris feel more personal"
                />
                <GuideCard
                  title="Is Jawai Safari Worth It?"
                  description="Who Jawai safari is best for, who should skip it, and how to decide if it matches your travel style."
                  link="/jawai-guide/is-jawai-safari-worth-it"
                  anchor="Find out who should choose Jawai safari"
                />
              </div>
              {/* Directional link flow sentence */}
              <div className="mt-8 text-sm text-blue-900/90 font-medium max-w-2xl">
                <span>Start with <Link to="/jawai-guide/jawai-safari-price-calculator" className="underline text-blue-700">pricing</Link>, then explore <Link to="/jawai-guide/jawai-safari-routes" className="underline text-blue-700">routes</Link> and finally compare <Link to="/jawai-guide/best-hotels-in-jawai" className="underline text-blue-700">stays</Link> for a complete Jawai safari plan.</span>
              </div>
            </section>

            {/* COMPARISON TABLE - Now with scroll wrapper */}
            <section id="pricing" className="mb-16 scroll-mt-24">
              <h2 className="text-2xl font-bold mb-4 text-gray-900">
                Jawai vs Other Popular Safari Destinations
              </h2>
              <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-6 text-sm text-gray-700 italic">
                Tip: Swipe left/right on the table below to see full details.
              </div>
              
              <div className="relative overflow-x-auto border border-gray-200 rounded-lg">
                <table className="w-full text-sm text-left">
                  <thead className="bg-gray-100 text-gray-700 uppercase text-xs font-bold">
                    <tr>
                      <th className="px-4 py-3 border-b min-w-[140px]">Feature</th>
                      <th className="px-4 py-3 border-b min-w-[120px]">Jawai</th>
                      <th className="px-4 py-3 border-b min-w-[120px]">Ranthambore</th>
                      <th className="px-4 py-3 border-b min-w-[120px]">Gir</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-700 divide-y divide-gray-200">
                    <tr>
                      <td className="px-4 py-4 font-semibold bg-gray-50">Primary Wildlife</td>
                      <td className="px-4 py-4">Leopard</td>
                      <td className="px-4 py-4">Tiger</td>
                      <td className="px-4 py-4">Asiatic Lion</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-4 font-semibold bg-gray-50">Crowd Level</td>
                      <td className="px-4 py-4 text-green-700 font-bold">Low</td>
                      <td className="px-4 py-4">Very High</td>
                      <td className="px-4 py-4">Medium</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-4 font-semibold bg-gray-50">Photography</td>
                      <td className="px-4 py-4">High Freedom</td>
                      <td className="px-4 py-4">Restricted</td>
                      <td className="px-4 py-4">Moderate</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* FAQ SECTION */}
            <section id="faq" className="mb-16 scroll-mt-24">
              <h2 className="text-2xl font-bold mb-6 text-gray-900">
                Common Questions About Jawai Travel
              </h2>
              <div className="space-y-8">
                {[
                  {
                    q: "How much does Jawai safari really cost for couples and families?",
                    a: "Costs vary by season and stay category. Entry-level safaris start around ₹3,500, while luxury experiences can be higher. Use our calculator for accurate estimates."
                  },
                  {
                    q: "How many safaris and days are actually enough in Jawai?",
                    a: "A 2–3 night stay with 3–4 safaris is recommended for excellent sighting chances and a relaxed pace."
                  },
                  {
                    q: "Is Jawai safari safe compared to tiger safaris?",
                    a: "Yes, it is very safe. Safari vehicles are private, and most luxury camps have strong safety protocols for children."
                  },
                  {
                    q: "How reliable are leopard sightings on Jawai safari routes?",
                    a: "No wildlife sighting is 100% guaranteed, but Jawai has one of India’s highest sighting rates due to the granite hill terrain."
                  },
                  {
                    q: "Is Jawai safari worth it for first-time wildlife travelers?",
                    a: "Absolutely. Jawai’s safaris are calm, easy to access, and ideal for beginners—no forest bureaucracy or overcrowding."
                  },
                  {
                    q: "What’s the best time of year for Jawai safari?",
                    a: "October to April is best for weather and sightings, but summer and monsoon offer unique experiences with fewer visitors."
                  },
                  {
                    q: "Can I do a Jawai safari with kids or elderly family?",
                    a: "Yes. Safaris are private and can be tailored for comfort. Many camps offer special arrangements for families and elderly guests."
                  },
                  {
                    q: "How do I avoid Jawai safari booking scams?",
                    a: "Book only through verified camps or operators. See our genuine booking guide for step-by-step tips."
                  },
                  {
                    q: "What’s the difference between Jawai and Ranthambore?",
                    a: "Jawai offers open landscapes, lower crowds, and more freedom for photography. Ranthambore is a national park with tigers and stricter rules."
                  },
                  {
                    q: "Can I self-drive or do a walking safari in Jawai?",
                    a: "No, only guided jeep safaris are allowed for safety and conservation reasons."
                  }
                ].map((item, idx) => (
                  <div key={idx} className="border-b pb-6 last:border-0">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{item.q}</h3>
                    <p className="text-gray-700 leading-relaxed text-sm md:text-base">{item.a}</p>
                  </div>
                ))}
              </div>
              {/* Show more questions button */}
              <div className="mt-8 flex justify-center">
                <Link
                  to="/faq"
                  className="px-5 py-2 rounded-full bg-blue-50 text-blue-700 font-semibold text-base hover:bg-blue-100 transition"
                >
                  Show more questions
                </Link>
              </div>
              {/* Internal full FAQ list (hidden, for SEO/expansion only) */}
              <div style={{ display: "none" }}>
                {Array.from({ length: 50 }).map((_, i) => (
                  <div key={i}>
                    <h3>FAQ #{i + 1}</h3>
                    <p>Answer for FAQ #{i + 1}.</p>
                  </div>
                ))}
              </div>
            </section>

            {/* TRUST BLOCK */}
            <section className="bg-gray-900 text-white rounded-2xl p-6 md:p-10 mb-10 overflow-hidden relative">
              <div className="relative z-10">
                <h2 className="text-2xl font-bold mb-4">Why Trust Jawai Unfiltered</h2>
                <p className="text-gray-300 leading-relaxed mb-4 md:text-lg">
                  Built with on-ground experience and local knowledge. We do not promote unrealistic sightings 
                  or misleading luxury claims. 
                </p>
                <p className="text-gray-300 leading-relaxed md:text-lg">
                  Every guide is updated regularly with real data and honest travel advice.
                </p>
              </div>
              <div className="absolute top-0 right-0 opacity-10 text-9xl font-bold -mr-10 -mt-10 select-none">🐆</div>
            </section>

            <p className="text-xs text-gray-400 text-center md:text-left mb-10">
              © 2026 Jawai Unfiltered. All rights reserved. Locally sourced insights for ethical wildlife travel.
            </p>
          </div>
        </div>
      </main>
    </>
  );
}

function Highlight({ label, value }) {
  return (
    <div className="border border-gray-100 rounded-xl p-4 text-center bg-white shadow-sm flex flex-col justify-center h-full">
      <p className="text-[10px] md:text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">{label}</p>
      <p className="text-base md:text-lg font-bold text-gray-900">{value}</p>
    </div>
  );
}

function GuideCard({ title, description, link, anchor }) {
  return (
    <Link
      to={link}
      className="group flex flex-col border border-gray-100 rounded-xl p-6 hover:border-blue-200 hover:shadow-lg transition-all bg-white"
    >
      <h3 className="text-lg font-bold mb-2 text-gray-900 group-hover:text-blue-700 transition-colors">{title}</h3>
      <p className="text-gray-600 text-sm leading-relaxed mb-4 flex-grow">{description}</p>
      <span className="text-sm font-bold text-blue-700 flex items-center">
        {anchor ? anchor : "Read Full Guide"} <span className="ml-1 group-hover:ml-2 transition-all">→</span>
      </span>
    </Link>
  );
}