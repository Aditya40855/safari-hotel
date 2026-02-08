import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

const MorningVsEveningJawaiSafari = () => {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Is morning safari better than evening in Jawai?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Both morning and evening safaris in Jawai offer unique experiences. Morning safaris (starting 5:00–5:30 AM) are generally cooler, calmer, and ideal for soft light photography, often showing leopards returning to resting spots. Evening safaris (starting 4:00–4:30 PM) are warmer, feature dramatic golden-hour light, and often have higher visible leopard movement as they become active.",
        },
      },
      {
        "@type": "Question",
        name: "Which safari has higher leopard sightings in Jawai?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Leopard sightings in Jawai do not depend solely on the time of day. While evening safaris often show more active movement, morning safaris offer chances to see leopards in calm, resting states. Sightings ultimately depend on expert tracking by guides, seasonal patterns, and luck.",
        },
      },
      {
        "@type": "Question",
        name: "Is evening safari more crowded than morning safari in Jawai?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, evening safaris in Jawai tend to be slightly more crowded than morning safaris, especially during peak tourist seasons. Morning safaris are generally quieter with fewer jeeps on the trails.",
        },
      },
      {
        "@type": "Question",
        name: "Are morning safaris suitable for families with children?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, morning safaris are suitable for families, offering a calm and cool environment. However, keep in mind the early wake-up times (5:00–5:30 AM start) and potentially chilly temperatures, especially in winter. Layered clothing is recommended.",
        },
      },
      {
        "@type": "Question",
        name: "What is the best time for photography in Jawai?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "For photography, the best time depends on your preference. Morning safaris (5:00–8:00 AM) offer soft, diffused, golden light shortly after sunrise, which is excellent for portraits and capturing calm behavior. Evening safaris (4:00–7:30 PM) provide dramatic golden-hour lighting before sunset, perfect for silhouettes and action shots against a colorful sky.",
        },
      },
      // New timing-focused FAQs
      {
        "@type": "Question",
        name: "What time does the morning safari start in Jawai?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Morning safaris in Jawai typically start between 5:00 and 5:30 AM, well before sunrise, to maximize chances of spotting leopards as they return to their resting spots. The safari usually ends by 7:30–8:00 AM.",
        },
      },
      {
        "@type": "Question",
        name: "Can I see the sunrise during the morning safari in Jawai?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, since the morning safari begins before sunrise (5:00–5:30 AM), you get to experience the beautiful sunrise over Jawai's granite hills while on the trail—an unforgettable highlight for many visitors.",
        },
      },
      {
        "@type": "Question",
        name: "Why do evening safari timings in Jawai vary?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Evening safari timings in Jawai generally start between 4:00 and 4:30 PM and end by 7:00–7:30 PM, but may vary depending on the season, daylight hours, and especially based on leopard movement and sightings. Guides may adjust the timing slightly for guest safety and to maximize wildlife viewing opportunities.",
        },
      },
    ],
  };
  // Schema.org Event for safari timings
  const safariTimingSchema = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: "Jawai Leopard Safari Timings",
    description:
      "Morning and evening Jawai safari timings: Morning safari starts 5:00–5:30 AM (before sunrise), ends 7:30–8:00 AM. Evening safari starts 4:00–4:30 PM, ends 7:00–7:30 PM, may vary based on leopard movement.",
    startDate: "2024-01-01T05:00:00+05:30",
    endDate: "2024-01-01T19:30:00+05:30",
    eventSchedule: [
      {
        "@type": "Schedule",
        name: "Morning Safari",
        startTime: "05:00",
        endTime: "08:00",
        byDay: ["https://schema.org/Monday", "https://schema.org/Tuesday", "https://schema.org/Wednesday", "https://schema.org/Thursday", "https://schema.org/Friday", "https://schema.org/Saturday", "https://schema.org/Sunday"],
      },
      {
        "@type": "Schedule",
        name: "Evening Safari",
        startTime: "16:00",
        endTime: "19:30",
        byDay: ["https://schema.org/Monday", "https://schema.org/Tuesday", "https://schema.org/Wednesday", "https://schema.org/Thursday", "https://schema.org/Friday", "https://schema.org/Saturday", "https://schema.org/Sunday"],
      },
    ],
    location: {
      "@type": "Place",
      name: "Jawai Bandh, Rajasthan, India",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Jawai Bandh",
        addressRegion: "Rajasthan",
        addressCountry: "IN",
      },
    },
    organizer: {
      "@type": "Organization",
      name: "Jawai Unfiltered",
      url: "https://www.jawaiunfiltered.com",
    },
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    url: "https://www.jawaiunfiltered.com/jawai-guide/morning-vs-evening-jawai-safari",
    image: "https://www.jawaiunfiltered.com/images/jawai-safari-morning-evening.jpg",
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Morning vs Evening Jawai Safari: Which One Is Better?",
    description:
      "Compare Morning vs Evening Jawai Leopard Safari. Learn about sighting chances, light conditions, crowd levels, costs, and which safari is best for you.",
    image: "https://www.jawaiunfiltered.com/images/jawai-safari-morning-evening.jpg", // Replace with actual image URL
    author: {
      "@type": "Organization",
      name: "Jawai Unfiltered",
      url: "https://www.jawaiunfiltered.com",
    },
    publisher: {
      "@type": "Organization",
      name: "Jawai Unfiltered",
      logo: {
        "@type": "ImageObject",
        url: "https://www.jawaiunfiltered.com/logo.png", // Replace with actual logo URL
      },
    },
    datePublished: "2024-01-01", // Replace with actual publish date
    dateModified: "2024-01-01", // Replace with actual modified date
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": "https://www.jawaiunfiltered.com/jawai-guide/morning-vs-evening-jawai-safari",
    },
  };

  return (
    <>
      <Helmet>
        <title>Morning vs Evening Jawai Safari: Best Time, Sightings & Experience</title>
        <meta
          name="description"
          content="Compare Morning vs Evening Jawai Leopard Safari. Discover the best time for sightings, photography lighting, crowd levels, and overall experience to choose the perfect safari for you."
        />
        <meta
          name="keywords"
          content="Jawai safari morning vs evening, best time for Jawai safari, Jawai leopard sighting morning evening, Jawai safari photography timing, morning safari Jawai experience, evening safari Jawai experience"
        />
        <link
          rel="canonical"
          href="https://www.jawaiunfiltered.com/jawai-guide/morning-vs-evening-jawai-safari"
        />
        <meta property="og:type" content="article" />
        <meta
          property="og:title"
          content="Morning vs Evening Jawai Safari: Best Time, Sightings & Experience"
        />
        <meta
          property="og:description"
          content="Compare Morning vs Evening Jawai Leopard Safari. Discover the best time for sightings, photography lighting, crowd levels, and overall experience."
        />
        <meta
          property="og:url"
          content="https://www.jawaiunfiltered.com/jawai-guide/morning-vs-evening-jawai-safari"
        />
        <meta
          property="og:image"
          content="https://www.jawaiunfiltered.com/images/jawai-safari-morning-evening.jpg" // Replace with actual image URL
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Morning vs Evening Jawai Safari: Best Time, Sightings & Experience"
        />
        <meta
          name="twitter:description"
          content="Compare Morning vs Evening Jawai Leopard Safari. Discover the best time for sightings, photography lighting, crowd levels, and overall experience."
        />
        <meta
          name="twitter:image"
          content="https://www.jawaiunfiltered.com/images/jawai-safari-morning-evening.jpg" // Replace with actual image URL
        />
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(safariTimingSchema)}</script>
      </Helmet>

      <div className="max-w-5xl mx-auto px-4 py-10 font-sans text-gray-800 leading-relaxed">
        {/* HERO SECTION */}
        <header className="mb-10 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-blue-900 leading-tight">
            Morning vs Evening Jawai Safari: Which One Is Better for You?
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Deciding between a <strong>morning safari</strong> and an{" "}
            <strong>evening safari</strong> is a crucial step in planning your Jawai Leopard Safari.
            Both offer distinct experiences, from lighting and temperature to leopard behavior and crowd
            levels. <br />
            <span className="block mt-2">
              <strong>Morning safaris</strong> start <b>5:00–5:30 AM (before sunrise)</b> and end by <b>7:30–8:00 AM</b>.
              <br />
              <strong>Evening safaris</strong> start <b>4:00–4:30 PM</b> and end by <b>7:00–7:30 PM</b> (timing may vary with leopard movement).
            </span>
            This comprehensive guide compares them to help you make the best choice for your adventure.
          </p>
        </header>

        {/* AUTHORITY & TRUST BLOCK */}
        <div className="bg-blue-50 border-l-4 border-blue-600 p-6 mb-12 rounded-r-lg shadow-sm">
          <p className="text-md text-blue-800 font-medium">
            <span className="font-bold">Expert Insight:</span> This guide is based on years of on-ground
            safari operations, insights from experienced local guides, and detailed knowledge of seasonal
            leopard movement patterns within Jawai’s unique community-managed landscape.
          </p>
        </div>

        {/* WHO IS THIS GUIDE FOR */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-blue-900">Who Should Read This Guide?</h2>
          <ul className="list-disc pl-8 space-y-3 text-lg text-gray-700">
            <li>First-time visitors to Jawai unsure about the best safari timing.</li>
            <li>Wildlife photographers planning for specific light conditions (soft morning vs. golden hour).</li>
            <li>Families deciding based on comfort, temperature, and activity levels for children.</li>
            <li>Travelers with limited time who want to maximize their Jawai experience.</li>
            <li>Anyone looking to understand leopard behavior at different times of the day.</li>
          </ul>
        </section>

        {/* MORNING SAFARI DETAILED SECTION */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-blue-900">
            Morning Jawai Safari: The Calm & Cool Experience
          </h2>
          <p className="text-lg text-gray-700 mb-6">
            Morning safaris in Jawai <b>start between 5:00 and 5:30 AM (before sunrise)</b> and finish by <b>7:30–8:00 AM</b>. The landscape is cool, fresh, and bathed in soft, diffused light. During this time, leopards are often observed returning to their daytime resting spots in the granite hills after their nightly activities.
          </p>
          {/* Micro-experience: First 30 Minutes */}
          <div className="bg-blue-50 border-l-4 border-blue-400 p-5 mb-6 rounded">
            <h4 className="text-lg font-semibold mb-2 text-blue-800">First 30 Minutes: A Unique Jawai Experience</h4>
            <p>
              The safari begins in the low light before sunrise, with the air crisp and the landscape still. Guides and trackers communicate quietly, scanning for fresh pugmarks and listening for alarm calls. As the first golden rays break over the granite hills, you may spot leopards making their way back to their resting spots—one of the most magical moments of the day.
            </p>
          </div>

          <h3 className="text-2xl font-semibold mb-4 text-blue-800">What to Expect in the Morning:</h3>
          <ul className="list-disc pl-8 space-y-3 mb-8 text-lg text-gray-700">
            <li>
              <strong>Cooler Temperatures:</strong> Pleasant and fresh, especially refreshing in summer.
              Winter mornings can be chilly, so layering is essential.
            </li>
            <li>
              <strong>Ideal Photography Light:</strong> Soft, golden morning light creates beautiful
              contrasts and is perfect for capturing portraits and landscapes without harsh shadows.
            </li>
            <li>
              <strong>Calm Leopard Behavior:</strong> Higher chances of seeing leopards in a relaxed state,
              resting on rocks or slowly moving towards shelter.
            </li>
            <li>
              <strong>Fewer Crowds:</strong> Generally quieter with fewer jeeps, offering a more tranquil
              and exclusive viewing experience.
            </li>
            <li>
              <strong>Active Birdlife:</strong> Mornings are excellent for birdwatching as many species are
              most active during this time.
            </li>
          </ul>

          <p className="text-lg text-gray-700 bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
            <strong>Best For:</strong> Photographers seeking soft light, wildlife enthusiasts who prefer
            calm observations, birdwatchers, and travelers who enjoy cooler weather and quieter environments.
          </p>
        </section>

        {/* EVENING SAFARI DETAILED SECTION */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-blue-900">
            Evening Jawai Safari: The Golden Hour & Active Wildlife
          </h2>
          <p className="text-lg text-gray-700 mb-6">
            Evening safaris in Jawai <b>start between 4:00 and 4:30 PM</b> and end by <b>7:00–7:30 PM</b>, with slight variations depending on leopard movement and season. As temperatures begin to drop, the landscape transforms with dramatic lighting. Leopards and other wildlife often become more active during this period, moving out from their resting zones to commence their evening activities like hunting or patrolling territory.
          </p>
          {/* Micro-experience: First 30 Minutes */}
          <div className="bg-orange-50 border-l-4 border-orange-400 p-5 mb-6 rounded">
            <h4 className="text-lg font-semibold mb-2 text-orange-800">First 30 Minutes: A Unique Jawai Experience</h4>
            <p>
              The safari sets out in the late afternoon as the heat of the day softens. You may see leopards emerging from shade, beginning to walk and scan their territory. Guides track their movement as daylight fades, often leading to exciting sightings of leopards on the move just before sunset.
            </p>
          </div>

          <h3 className="text-2xl font-semibold mb-4 text-blue-800">What to Expect in the Evening:</h3>
          <ul className="list-disc pl-8 space-y-3 mb-8 text-lg text-gray-700">
            <li>
              <strong>Dramatic Lighting:</strong> Stunning "golden hour" light before sunset creates
              magical landscapes, silhouettes, and vibrant skies.
            </li>
            <li>
              <strong>Visible Leopard Movement:</strong> Increased likelihood of seeing leopards actively
              walking, stalking, or interacting as they prepare for the night.
            </li>
            <li>
              <strong>Warmer Temperatures:</strong> Starts warm, especially in summer, but cools down
              pleasantly towards sunset.
            </li>
            <li>
              <strong>Higher Crowd Presence:</strong> Tends to be more popular, potentially leading to more
              jeeps at prime sighting locations compared to mornings.
            </li>
            <li>
              <strong>Sunset Views:</strong> Spectacular opportunities to witness the sun setting behind the
              Aravalli hills, a breathtaking sight in Jawai.
            </li>
          </ul>

          <p className="text-lg text-gray-700 bg-orange-50 p-4 rounded-lg border-l-4 border-orange-500">
            <strong>Best For:</strong> Casual travelers, families, photographers looking for dramatic
            sunset shots and active wildlife, and those who prefer not to wake up very early.
          </p>
        </section>

        {/* TIMING SNAPSHOT SECTION */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-blue-900">
            Morning vs Evening Safari Timings at a Glance
          </h2>
          <div className="overflow-x-auto max-w-md mx-auto mb-4">
            <table className="w-full border-collapse text-lg text-center">
              <thead>
                <tr className="bg-blue-100">
                  <th className="p-3 font-semibold">Safari</th>
                  <th className="p-3 font-semibold">Start Time</th>
                  <th className="p-3 font-semibold">End Time</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-3 font-medium text-gray-800">Morning</td>
                  <td className="p-3 text-gray-700">5:00–5:30 AM<br /><span className="text-xs text-gray-500">(before sunrise)</span></td>
                  <td className="p-3 text-gray-700">7:30–8:00 AM</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="p-3 font-medium text-gray-800">Evening</td>
                  <td className="p-3 text-gray-700">4:00–4:30 PM</td>
                  <td className="p-3 text-gray-700">7:00–7:30 PM<br /><span className="text-xs text-gray-500">(may vary with leopard activity)</span></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="flex items-center justify-center mt-2">
            <span className="bg-yellow-50 border-l-4 border-yellow-400 p-3 rounded text-yellow-900 text-base max-w-2xl">
              <strong>Local Insight:</strong> Actual timings may shift slightly depending on sunrise, sunset, and especially on real-time leopard sightings and safety considerations. Your guide will always advise the best time to depart.
            </span>
          </div>
        </section>

        {/* DETAILED COMPARISON TABLE */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-blue-900">
            Morning vs Evening Safari: Detailed Comparison Chart
          </h2>
          <div className="overflow-x-auto shadow-md rounded-lg">
            <table className="w-full border-collapse text-left text-lg">
              <thead className="bg-blue-900 text-white">
                <tr>
                  <th className="p-4 font-semibold">Factor</th>
                  <th className="p-4 font-semibold">Morning Safari</th>
                  <th className="p-4 font-semibold">Evening Safari</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b hover:bg-gray-50">
                  <td className="p-4 font-medium text-gray-800">Timing</td>
                  <td className="p-4 text-gray-700">5:00–5:30 AM (before sunrise) to 7:30–8:00 AM</td>
                  <td className="p-4 text-gray-700">4:00–4:30 PM to 7:00–7:30 PM (may vary with leopard movement)</td>
                </tr>
                <tr className="border-b hover:bg-gray-50 bg-gray-50">
                  <td className="p-4 font-medium text-gray-800">Temperature</td>
                  <td className="p-4 text-gray-700">Cool, refreshing (Cold in winter)</td>
                  <td className="p-4 text-gray-700">Warm to pleasant (Hot start in summer)</td>
                </tr>
                <tr className="border-b hover:bg-gray-50">
                  <td className="p-4 font-medium text-gray-800">Leopard Behavior</td>
                  <td className="p-4 text-gray-700">Often calm, resting, returning to dens</td>
                  <td className="p-4 text-gray-700">More active, moving, starting nightly routine</td>
                </tr>
                <tr className="border-b hover:bg-gray-50 bg-gray-50">
                  <td className="p-4 font-medium text-gray-800">Photography Light</td>
                  <td className="p-4 text-gray-700">Soft, diffused, golden morning light</td>
                  <td className="p-4 text-gray-700">Dramatic golden hour, sunset colors, silhouettes</td>
                </tr>
                <tr className="border-b hover:bg-gray-50">
                  <td className="p-4 font-medium text-gray-800">Crowd Levels</td>
                  <td className="p-4 text-gray-700">Generally lower, quieter</td>
                  <td className="p-4 text-gray-700">Slightly higher, more popular</td>
                </tr>
                <tr className="border-b hover:bg-gray-50 bg-gray-50">
                  <td className="p-4 font-medium text-gray-800">Other Wildlife</td>
                  <td className="p-4 text-gray-700">Excellent for birdwatching, active small mammals</td>
                  <td className="p-4 text-gray-700">Good for seeing nocturnal animals starting activity</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="p-4 font-medium text-gray-800">Vibe & Atmosphere</td>
                  <td className="p-4 text-gray-700">Serene, tranquil, fresh</td>
                  <td className="p-4 text-gray-700">Vibrant, dramatic, exciting</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* CONCLUSION & RECOMMENDATION */}
        <section className="mb-12 bg-blue-100 p-8 rounded-lg shadow-md">
          <h2 className="text-3xl font-bold mb-6 text-blue-900 text-center">
            Which Safari Should You Choose?
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4 text-blue-800">Choose Morning Safari if:</h3>
              <ul className="list-disc pl-6 space-y-2 text-lg text-gray-700">
                <li>You are an early riser and enjoy calm mornings.</li>
                <li>Photography with soft, natural light is a priority.</li>
                <li>You prefer cooler temperatures and a quieter environment.</li>
                <li>You are keen on birdwatching along with leopards.</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4 text-blue-800">Choose Evening Safari if:</h3>
              <ul className="list-disc pl-6 space-y-2 text-lg text-gray-700">
                <li>You want to see more active leopard movement.</li>
                <li>You love dramatic sunsets and golden-hour photography.</li>
                <li>You prefer warmer temperatures and don't mind slightly more people.</li>
                <li>Waking up very early is not your preference.</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 text-center">
            <p className="text-xl font-bold text-blue-900">
              Our Recommendation: For the most complete Jawai experience, if your schedule allows, we
              highly recommend trying both a morning and an evening safari to witness the diverse moods
              of the landscape and its magnificent wildlife.
            </p>
          </div>
        </section>

        {/* INTERNAL LINKS SECTION */}
        <section className="bg-gray-50 p-8 border rounded-lg shadow-sm mb-12">
          <h3 className="text-2xl font-semibold mb-6 text-blue-900">Explore More Jawai Guides</h3>
          <ul className="grid md:grid-cols-3 gap-4 text-lg">
            <li>
              <Link
                to="/jawai-guide/best-time-to-visit"
                className="text-blue-700 hover:text-blue-900 hover:underline flex items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V7z"
                    clipRule="evenodd"
                  />
                </svg>
                Best Time to Visit Jawai
              </Link>
            </li>
            <li>
              <Link
                to="/jawai-guide/jawai-leopard-sighting-chances"
                className="text-blue-700 hover:text-blue-900 hover:underline flex items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                    clipRule="evenodd"
                  />
                </svg>
                Leopard Sighting Chances
              </Link>
            </li>
            <li>
              <Link
                to="/jawai-guide/jawai-safari-cost-breakdown"
                className="text-blue-700 hover:text-blue-900 hover:underline flex items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
                    clipRule="evenodd"
                  />
                </svg>
                Safari Cost Breakdown
              </Link>
            </li>
          </ul>
          <div className="mt-6 text-center text-base text-blue-800">
            Curious about how Jawai safari routes are chosen and how timings fit in? Check out our{" "}
            <Link to="/jawai-guide/jawai-safari-routes" className="text-blue-700 underline hover:text-blue-900">
              detailed guide on how Jawai safari routes work
            </Link>
            .
          </div>
        </section>

        {/* FAQ SECTION */}
        <section>
          <h2 className="text-3xl font-bold mb-8 text-blue-900">
            Frequently Asked Questions: Morning vs Evening Safari
          </h2>
          <div className="space-y-6 text-lg text-gray-700">
            {faqSchema.mainEntity.map((faq, index) => (
              <div key={index} className="border-b border-gray-200 pb-6">
                <h3 className="text-xl font-semibold mb-3 text-blue-800 flex items-start">
                  <span className="mr-2 text-blue-500">Q:</span> {faq.name}
                </h3>
                <div
                  className="pl-6"
                  dangerouslySetInnerHTML={{ __html: faq.acceptedAnswer.text }}
                />
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
};

export default MorningVsEveningJawaiSafari;