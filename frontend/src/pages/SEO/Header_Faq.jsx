import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';

// Utility to get current month and year for "Last updated"
const getLastUpdatedString = () => {
  const now = new Date();
  const month = now.toLocaleString('default', { month: 'long' });
  const year = now.getFullYear();
  return `${month} ${year}`;
};

const faqData = [
  // --- LEOPARD SAFARI QUESTIONS ---
  {
    question: "What is the best time for a Leopard Safari in Jawai?",
    answer: "September to May is ideal for leopard safaris. <a href=\"/jawai-guide/best-time-to-visit\">See the full best time guide &rarr;</a>",
    isExpandedByDefault: true
  },
  {
    question: "What are the chances of spotting a leopard in Jawai?",
    answer: "Chances are very high due to dense leopard population.",
    isExpandedByDefault: true
  },
  {
    question: "Are there morning and evening safaris?",
    answer: "Yes, both morning and evening safaris are available.",
    isExpandedByDefault: false
  },
  {
    question: "How long does a typical safari last?",
    answer: "Most safaris last about 3–4 hours.",
    isExpandedByDefault: false
  },
  {
    question: "Is it safe to go on an open-top 4x4 safari?",
    answer: "Open-top safaris are safe with trained guides. <a href=\"/jawai-guide/travel-safety\">Read the full safety guide &rarr;</a>",
    isExpandedByDefault: true
  },
  // --- BOOKING & LOGISTICS ---
  {
    question: "How do I reach Jawai?",
    answer: "You can reach Jawai by train or road from Udaipur or Jodhpur.",
    isExpandedByDefault: false
  },
  {
    question: "Do you offer pickup and drop services?",
    answer: "Yes, pickup and drop services are available on request.",
    isExpandedByDefault: false
  },
  {
    question: "What should I wear on a safari?",
    answer: "Wear neutral colors and a jacket for morning safaris.",
    isExpandedByDefault: false
  },
  {
    question: "Can I book a private safari vehicle?",
    answer: "Yes, private vehicles can be arranged for your group.",
    isExpandedByDefault: false
  },
  {
    question: "Is a safari suitable for elderly people?",
    answer: "Safaris can be tailored for seniors. <a href=\"/jawai-guide/jawai-safari-cost-for-2-4-families\">See tips for families &rarr;</a>",
    isExpandedByDefault: false
  },
  // --- ACCOMMODATION & AMENITIES ---
  {
    question: "Are meals included in the hotel packages?",
    answer: "Most hotel packages include all meals.",
    isExpandedByDefault: false
  },
  {
    question: "Is there Wi-Fi available at the resort?",
    answer: "Yes, Wi-Fi is provided but may be slow in remote areas.",
    isExpandedByDefault: false
  },
  {
    question: "Do the rooms have air conditioning?",
    answer: "All rooms and tents have air conditioning.",
    isExpandedByDefault: false
  },
  {
    question: "Is there a swimming pool?",
    answer: "Yes, the resort features a swimming pool.",
    isExpandedByDefault: false
  },
  {
    question: "Can you accommodate dietary restrictions?",
    answer: "Yes, let us know your dietary needs at booking.",
    isExpandedByDefault: false
  },
  // --- WILDLIFE & NATURE ---
  {
    question: "What animals can I see besides leopards?",
    answer: "You may see crocodiles, hyenas, sloth bears, and many birds.",
    isExpandedByDefault: false
  },
  {
    question: "Is Jawai a National Park?",
    answer: "No, it's a community reserve where wildlife and people coexist.",
    isExpandedByDefault: false
  },
  {
    question: "Is photography allowed during the safari?",
    answer: "Photography is allowed and encouraged. <a href=\"/jawai-guide/jawai-safari-photography-guide\">See our Photography Guide &rarr;</a>",
    isExpandedByDefault: false
  },
  {
    question: "What is the 'Jawai Dam' famous for?",
    answer: "Jawai Dam is famous for crocodiles and migratory birds.",
    isExpandedByDefault: false
  },
  {
    question: "Do you offer walking tours?",
    answer: "Yes, guided nature walks are available.",
    isExpandedByDefault: false
  },
  // --- NEW FAQ ITEMS ---
  {
    question: "What is the Jawai Safari Price Calculator?",
    answer: "It helps estimate your safari and stay costs. <a href=\"/jawai-guide/safari-pricing-guide\">See the pricing guide &rarr;</a>",
    isExpandedByDefault: false
  },
  {
    question: "Is the Jawai budget calculator free to use?",
    answer: "Yes, the calculator is free to use.",
    isExpandedByDefault: false
  },
  {
    question: "Can I calculate Jawai safari costs for families and groups?",
    answer: "Yes, the calculator adjusts for families and groups.",
    isExpandedByDefault: false
  },
  {
    question: "Are children charged for Jawai safaris?",
    answer: "Children may get discounts; check the calculator for details.",
    isExpandedByDefault: false
  },
  {
    question: "Does the calculator include hotel stay prices?",
    answer: "Yes, hotel prices are included in estimates.",
    isExpandedByDefault: false
  },
  {
    question: "Can I compare different Jawai safari packages using the calculator?",
    answer: "Yes, you can compare various packages easily.",
    isExpandedByDefault: false
  },
  {
    question: "Are the prices shown in the calculator final?",
    answer: "Prices are estimates and may change. <a href=\"/jawai-guide/safari-pricing-guide\">See details &rarr;</a>",
    isExpandedByDefault: false
  },
  {
    question: "Does the Jawai calculator show budget-friendly options?",
    answer: "Yes, you can find affordable options using the tool.",
    isExpandedByDefault: false
  },
  {
    question: "Can I request a custom Jawai safari plan after using the calculator?",
    answer: "Yes, you can request a personalized plan.",
    isExpandedByDefault: false
  },
  {
    question: "Why should I trust the Jawai Safari Price Calculator?",
    answer: "It uses local expertise for accurate pricing.",
    isExpandedByDefault: false
  },
  {
    question: "What is included in the pricing of a safari?",
    answer: "Pricing covers vehicle, guide, permits, and meals. <a href=\"/jawai-guide/safari-pricing-guide\">See what's included &rarr;</a>",
    isExpandedByDefault: false
  },
  {
    question: "Are there any discounts or seasonal offers available?",
    answer: "Discounts may be offered for groups or off-peak dates. <a href=\"/jawai-guide/safari-pricing-guide\">See current offers &rarr;</a>",
    isExpandedByDefault: false
  },
  {
    question: "What is the cancellation and refund policy?",
    answer: "Refunds depend on notice period and booking terms.",
    isExpandedByDefault: false
  },
  // --- ADDITIONAL ADVANCED SEO FAQS ---
  {
    question: "Is leopard safari safe for families with children?",
    answer: "Leopard safaris in Jawai are generally safe when guided by trained locals. <a href=\"/jawai-guide/travel-safety\">Read the full safety guide &rarr;</a>",
    isExpandedByDefault: true
  },
  {
    question: "How do leopards in Jawai behave differently from tigers in other reserves?",
    answer: "Leopards here are used to humans, unlike tigers elsewhere. <a href=\"/jawai-guide/leopard-safari-guide\">Leopard behavior explained &rarr;</a>",
    isExpandedByDefault: false
  },
  {
    question: "What factors influence the Jawai safari pricing?",
    answer: "Pricing depends on vehicle type, exclusivity, and season. <a href=\"/jawai-guide/safari-pricing-guide\">See pricing breakdown &rarr;</a>",
    isExpandedByDefault: true
  },
  {
    question: "Should I choose a budget or luxury safari experience in Jawai?",
    answer: "Budget covers basics; luxury adds comfort. <a href=\"/jawai-guide/safari-pricing-guide\">See comparison &rarr;</a>",
    isExpandedByDefault: false
  },
  {
    question: "Are Jawai safaris suitable for elderly travelers?",
    answer: "Yes, safaris can be adjusted for seniors.",
    isExpandedByDefault: false
  },
  {
    question: "What are the main safari routes in Jawai?",
    answer: "Routes change based on leopard movement. <a href=\"/jawai-guide/jawai-safari-routes\">See route guide &rarr;</a>",
    isExpandedByDefault: false
  },
  {
    question: "How do trackers locate leopards during a safari?",
    answer: "Trackers use signs and local knowledge to find leopards.",
    isExpandedByDefault: false
  },
  {
    question: "What kind of terrain should I expect on a Jawai safari?",
    answer: "Expect rocky hills and dry riverbeds.",
    isExpandedByDefault: false
  },
  {
    question: "Is a photography permit required for Jawai safaris?",
    answer: "No permit is needed for personal photography.",
    isExpandedByDefault: false
  },
  {
    question: "What are the ethical guidelines for wildlife photography in Jawai?",
    answer: "Keep distance and avoid disturbing animals.",
    isExpandedByDefault: false
  },
  {
    question: "When is the best season to visit Jawai for fewer crowds?",
    answer: "Visit in September–October or March–April for fewer tourists.",
    isExpandedByDefault: false
  },
  {
    question: "How does Jawai compare to other leopard safari destinations in India?",
    answer: "Jawai is special for its high leopard density and local coexistence. <a href=\"/jawai-guide/jawai-vs-other-safaris\">Compare destinations &rarr;</a>",
    isExpandedByDefault: false
  },
  {
    question: "Can I combine a Jawai safari with other attractions nearby?",
    answer: "Yes, you can also visit nearby attractions.",
    isExpandedByDefault: false
  },
  {
    question: "Are private vehicles allowed inside the Jawai safari area?",
    answer: "Only authorized safari vehicles are allowed.",
    isExpandedByDefault: false
  },
  {
    question: "Is Jawai a good destination for solo travelers?",
    answer: "Yes, solo travelers can join group safaris.",
    isExpandedByDefault: false
  },
  {
    question: "What are the typical group sizes on a shared safari?",
    answer: "Shared safaris usually have 4–6 guests.",
    isExpandedByDefault: false
  },
  {
    question: "How much walking is involved during a Jawai safari?",
    answer: "Most time is spent in the vehicle; short walks are optional.",
    isExpandedByDefault: false
  },
  {
    question: "Can I book last-minute safaris in Jawai?",
    answer: "Last-minute bookings are possible if slots are available.",
    isExpandedByDefault: false
  },
  {
    question: "Do I need to tip my safari guide and driver?",
    answer: "Tipping is appreciated but not required.",
    isExpandedByDefault: false
  },
  {
    question: "Are safaris operational during the monsoon season?",
    answer: "Safaris may pause during heavy rains. <a href=\"/jawai-guide/best-time-to-visit\">See monsoon details &rarr;</a>",
    isExpandedByDefault: false
  },
  {
    question: "How early should I arrive before my safari slot?",
    answer: "Arrive 15–20 minutes before your safari.",
    isExpandedByDefault: false
  },
  {
    question: "Can I bring snacks or drinks on the safari?",
    answer: "Light snacks are provided; you may bring your own.",
    isExpandedByDefault: false
  },
  {
    question: "Is there mobile network coverage in Jawai?",
    answer: "Network is patchy; most resorts offer Wi-Fi.",
    isExpandedByDefault: false
  },
  {
    question: "What should I pack for a winter safari in Jawai?",
    answer: "Bring warm clothes, gloves, and a hat.",
    isExpandedByDefault: false
  },
  {
    question: "How can I verify the credibility of Jawai Unfiltered?",
    answer: "Our team consists of experienced local experts. <a href=\"/jawai-guide/why-jawai-safari-feels-personal\">See why locals trust us &rarr;</a>",
    isExpandedByDefault: false
  },
  {
    question: "Does Jawai Unfiltered use local guides?",
    answer: "Yes, all safaris are led by local trackers.",
    isExpandedByDefault: false
  },
  {
    question: "What is the process for booking a safari through Jawai Unfiltered?",
    answer: "Choose your dates and we confirm your booking.",
    isExpandedByDefault: false
  },
  {
    question: "Can I request a specific guide or tracker for my safari?",
    answer: "Yes, you may request a guide when booking.",
    isExpandedByDefault: false
  },
  {
    question: "Are there any age restrictions for participating in a safari?",
    answer: "There is no strict age limit, but rides may be bumpy.",
    isExpandedByDefault: false
  },
  {
    question: "Is it possible to see leopards during every safari?",
    answer: "Sightings are likely but never guaranteed.",
    isExpandedByDefault: false
  },
  {
    question: "How can I maximize my chances of seeing leopards?",
    answer: "Book multiple safaris and follow your guide's advice.",
    isExpandedByDefault: false
  },
  {
    question: "What are the rules regarding noise and behavior during a safari?",
    answer: "Stay quiet and follow your guide's instructions.",
    isExpandedByDefault: false
  },
  {
    question: "Are night safaris available in Jawai?",
    answer: "Night safaris are not permitted in core areas.",
    isExpandedByDefault: false
  },
  {
    question: "Which Jawai lodges are best for wildlife photographers?",
    answer: "Some lodges offer special facilities for photographers. <a href=\"/jawai-guide/jawai-safari-photography-guide\">See Photography Lodge Guide &rarr;</a>",
    isExpandedByDefault: false
  },
  {
    question: "How does the leopard population in Jawai stay stable?",
    answer: "Community support and low disturbance help maintain numbers.",
    isExpandedByDefault: false
  },
  {
    question: "Are there opportunities for birdwatching in Jawai?",
    answer: "Yes, especially in winter at the dam.",
    isExpandedByDefault: false
  },
  {
    question: "Can I do a self-drive safari in Jawai?",
    answer: "Self-drive safaris are not allowed for safety.",
    isExpandedByDefault: false
  },
  {
    question: "What steps are taken for guest safety during a safari?",
    answer: "Guides carry first-aid and communication devices. <a href=\"/jawai-guide/travel-safety\">See safety details &rarr;</a>",
    isExpandedByDefault: true
  },
  {
    question: "Is Jawai a good place for a multi-generational family trip?",
    answer: "Yes, activities suit all ages.",
    isExpandedByDefault: false
  },
  {
    question: "How do I know if a safari in Jawai is worth it?",
    answer: "Jawai offers a unique wildlife and cultural experience. <a href=\"/jawai-guide/is-jawai-safari-worth-it\">Read our worth-it guide &rarr;</a>",
    isExpandedByDefault: false
  },
  {
    question: "Are there any medical facilities nearby in case of emergencies?",
    answer: "Basic aid is available; hospital is 30 minutes away.",
    isExpandedByDefault: false
  },
  {
    question: "What wildlife can I see apart from leopards and crocodiles?",
    answer: "You may also spot hyenas, jungle cats, and birds.",
    isExpandedByDefault: false
  },
  {
    question: "How does Jawai Unfiltered ensure ethical tourism?",
    answer: "We partner with locals and follow wildlife guidelines.",
    isExpandedByDefault: false
  },
  {
    question: "Do Jawai safaris run during local festivals or holidays?",
    answer: "Safaris run year-round but book early during festivals.",
    isExpandedByDefault: false
  },
  {
    question: "Can I extend my stay or add more safaris after arrival?",
    answer: "Yes, you can extend or add safaris if available.",
    isExpandedByDefault: false
  },
  {
    question: "What happens if a safari is cancelled due to weather?",
    answer: "You can reschedule or get a refund for that safari.",
    isExpandedByDefault: false
  },
  {
    question: "Are there eco-friendly safari options in Jawai?",
    answer: "Some lodges use eco-friendly practices.",
    isExpandedByDefault: false
  },
  {
    question: "Are safaris safe and do they require permits?",
    answer: "Safaris are safe and permits are arranged for you.",
    isExpandedByDefault: false
  },
  {
    question: "Is the safari suitable for children and families?",
    answer: "Yes, families are welcome. <a href=\"/jawai-guide/jawai-safari-cost-for-2-4-families\">See family tips &rarr;</a>",
    isExpandedByDefault: true
  },
  {
    question: "Which months are best for photography during the safari?",
    answer: "October to March offers the best light and sightings.",
    isExpandedByDefault: false
  },
  {
    question: "How does Jawai safari differ from Ranthambore?",
    answer: "Jawai is known for leopards and open hills; Ranthambore for tigers.",
    isExpandedByDefault: false
  },
  {
    question: "What makes Jawai Unfiltered different?",
    answer: "We offer ethical tourism with local guides.",
    isExpandedByDefault: false
  }
];

const FAQPage = () => {
  const [openIndex, setOpenIndex] = useState(null);

  // Build JSON-LD structured data for FAQ
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqData.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  };

  // Category section header indexes (based on faqData order)
  const categoryHeaders = [
    { index: 0, label: "Safari Safety" },
    { index: 5, label: "Booking & Logistics" },
    { index: 10, label: "Families & Kids" },
    { index: 15, label: "Leopard Behavior & Wildlife" },
    { index: 20, label: "Pricing & Budget" }
    // Adjust indexes as per faqData structure if needed
  ];

  // Featured Quick Answer Box content
  const featuredAnswers = [
    {
      q: "Is Jawai leopard safari safe?",
      a: (
        <>
          Yes, safaris are conducted by trained local guides and safety is a top priority.{' '}
          <a href="/jawai-guide/safety" className="text-orange-600 underline">See our safety guide</a>.
        </>
      )
    },
    {
      q: "What does a Jawai safari typically cost?",
      a: (
        <>
          Safari prices start from ₹3,000–₹7,000 per person depending on season and package.{' '}
          <a href="/jawai-guide/safari-pricing" className="text-orange-600 underline">Full pricing details</a>.
        </>
      )
    },
    {
      q: "Is Jawai suitable for families?",
      a: (
        <>
          Absolutely. Jawai offers family-friendly safaris and comfortable stays.{' '}
          <a href="/jawai-guide/family-safaris" className="text-orange-600 underline">Family travel tips</a>.
        </>
      )
    }
  ];

  // Helper to append "Learn more →" for long answers (basic heuristic: >180 chars)
  const appendLearnMore = (answer, index) => {
    let learnMoreLink = null;
    // Map FAQ index or keywords to relevant guide links
    if (
      /safety|safe|permit/i.test(answer)
    ) {
      learnMoreLink = "/jawai-guide/safety";
    } else if (
      /price|cost|budget|discount|seasonal offer/i.test(answer)
    ) {
      learnMoreLink = "/jawai-guide/safari-pricing";
    } else if (
      /family|child|kid|elderly|senior/i.test(answer)
    ) {
      learnMoreLink = "/jawai-guide/family-safaris";
    } else if (
      /route|terrain|track|photography|photo/i.test(answer)
    ) {
      learnMoreLink = "/jawai-guide/photography";
    } else if (
      /best time|season|month/i.test(answer)
    ) {
      learnMoreLink = "/jawai-guide/best-time";
    } else if (
      /eco|green|sustainable/i.test(answer)
    ) {
      learnMoreLink = "/jawai-guide/eco-safaris";
    } else if (
      /about us|credibility/i.test(answer)
    ) {
      learnMoreLink = "/jawai-guide/about-us";
    }
    if (answer.length > 180 && learnMoreLink) {
      return (
        <>
          <span dangerouslySetInnerHTML={{ __html: answer }} />
          {' '}
          <a href={learnMoreLink} className="text-orange-600 underline ml-1" target="_blank" rel="noopener noreferrer">Learn more &rarr;</a>
        </>
      );
    } else {
      // Render as HTML if answer contains anchor tags
      if (/<a\s/i.test(answer)) {
        return <span dangerouslySetInnerHTML={{ __html: answer }} />;
      }
      return answer;
    }
  };

  // Speakable Schema: expanded to include safety, pricing, family, leopard behavior FAQs
  const speakableJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "speakable": {
      "@type": "SpeakableSpecification",
      "cssSelector": [
        "#faq-question-0",     // Best time (existing)
        "#faq-question-1",     // Chances of leopard sighting (existing)
        "#faq-question-4",     // Open-top 4x4 safety (safety)
        "#faq-question-5",     // How to reach (existing)
        "#faq-question-20",    // Jawai Safari Price Calculator (pricing)
        "#faq-question-30",    // Is leopard safari safe for families (safety/family)
        "#faq-question-32",    // What factors influence pricing (pricing)
        "#faq-question-60",    // Steps for guest safety (safety)
        "#faq-question-73",    // Is the safari suitable for children and families (family)
        "#faq-question-31"     // Leopard behavior vs tigers (leopard behavior)
      ]
    }
  };

  // Breadcrumb Schema
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://jawaiunfiltered.com/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Jawai Guide",
        "item": "https://jawaiunfiltered.com/jawai-guide"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "FAQs",
        "item": "https://jawaiunfiltered.com/faq"
      }
    ]
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <Helmet>
        <title>Frequently Asked Questions | Jawai Leopard Safari & Stays</title>
        <meta name="description" content="50+ real questions answered by Jawai safari experts. Find answers to common questions about Jawai leopard safaris, hotel bookings, travel logistics, and wildlife sightings." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://jawaiunfiltered.com/faq" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Jawai Leopard Safari FAQs | Jawai Unfiltered" />
        <meta property="og:description" content="50+ real questions answered by Jawai safari experts. Find answers to common questions about Jawai leopard safaris, hotel bookings, travel logistics, and wildlife sightings." />
        <meta property="og:url" content="https://jawaiunfiltered.com/faq" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Jawai Leopard Safari FAQs | Jawai Unfiltered" />
        <meta name="twitter:description" content="50+ real questions answered by Jawai safari experts. Find answers to common questions about Jawai leopard safaris, hotel bookings, travel logistics, and wildlife sightings." />
        <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(speakableJsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbJsonLd)}</script>
      </Helmet>

      <div className="max-w-3xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
            Planning Your <span className="text-orange-600">Jawai Adventure?</span>
          </h1>
          <h2 className="sr-only">Jawai Leopard Safari Frequently Asked Questions</h2>
          <p className="text-lg text-gray-600">
            Everything you need to know about safaris, stays, and the wild leopards of Rajasthan.
          </p>
        </div>

        {/* Authority Framing + Audience Section */}
        <div className="mb-6 bg-white rounded-2xl shadow border border-gray-100 px-6 py-5">
          <p className="text-base text-gray-700 mb-2 font-medium">
            <span className="font-semibold text-orange-700">Expert Answers:</span> Every response here is curated and reviewed by local Jawai trackers, safari planners, and on-ground experts with years of real-world experience in the region.
          </p>
          <div className="text-sm text-gray-500 mb-2">
            Last updated: {getLastUpdatedString()} &bull; Reviewed by Jawai Unfiltered local safari experts
          </div>
          <div className="mt-3">
            <span className="font-semibold text-gray-800">Who this FAQ is for:</span>
            <ul className="list-disc pl-5 mt-1 text-gray-600 text-sm">
              <li>First-time visitors</li>
              <li>Families</li>
              <li>Photographers</li>
              <li>Budget planners</li>
              <li>Safety-conscious travelers</li>
            </ul>
          </div>
        </div>

        {/* Featured Quick Answer Box */}
        <div className="mb-8 bg-orange-50 border-l-4 border-orange-500 rounded-xl px-6 py-5 shadow-sm">
          <div className="mb-2 font-semibold text-orange-700">Quick Answers</div>
          <dl className="space-y-2">
            {featuredAnswers.map((item, idx) => (
              <div key={idx}>
                <dt className="font-medium text-gray-800">
                  <span className="mr-1 text-orange-600">Q.</span>{item.q}
                </dt>
                <dd className="ml-5 text-gray-700">{item.a}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* FAQ Accordion with Category Grouping and "People Also Ask" Formatting */}
        + <div className="space-y-4">
          {/* --- FAQ Category Sections with semantic signals and comments --- */}
          {/* Safari Safety */}
          {/* FAQ Category: Safari Safety – short answers, link to safety guide */}
          <section data-faq-category="Safari Safety">
            {faqData.slice(0, 5).map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-200 hover:shadow-md"
                itemProp="mainEntity" itemScope itemType="https://schema.org/Question"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full flex items-center justify-between p-5 text-left focus:outline-none"
                  aria-expanded={openIndex === index}
                  aria-controls={`faq-answer-${index}`}
                  id={`faq-question-${index}`}
                >
                  <span className="text-lg font-semibold text-gray-800 pr-8 flex items-center" itemProp="name">
                    <span className="inline-block mr-2 text-orange-500 font-bold">Q.</span>
                    {item.question}
                  </span>
                  <span className={`transform transition-transform duration-200 text-orange-600 font-bold text-2xl ${openIndex === index ? 'rotate-45' : 'rotate-0'}`}>
                    +
                  </span>
                </button>
                <div
                  className={`transition-all duration-300 ease-in-out ${item.isExpandedByDefault && openIndex === null ? 'max-h-96 opacity-100' : openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}
                  itemProp="acceptedAnswer" itemScope itemType="https://schema.org/Answer"
                  id={`faq-answer-${index}`}
                  aria-labelledby={`faq-question-${index}`}
                >
                  <div className="p-5 pt-0 text-gray-600 leading-relaxed border-t border-gray-50" itemProp="text">
                    {appendLearnMore(item.answer, index)}
                  </div>
                </div>
              </div>
            ))}
          </section>
          {/* Booking & Logistics */}
          {/* FAQ Category: Booking & Logistics – short answers, link to logistics guide */}
          <section data-faq-category="Booking & Logistics">
            {faqData.slice(5, 10).map((item, idx) => {
              const index = 5 + idx;
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-200 hover:shadow-md"
                  itemProp="mainEntity" itemScope itemType="https://schema.org/Question"
                >
                  <button
                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                    className="w-full flex items-center justify-between p-5 text-left focus:outline-none"
                    aria-expanded={openIndex === index}
                    aria-controls={`faq-answer-${index}`}
                    id={`faq-question-${index}`}
                  >
                    <span className="text-lg font-semibold text-gray-800 pr-8 flex items-center" itemProp="name">
                      <span className="inline-block mr-2 text-orange-500 font-bold">Q.</span>
                      {item.question}
                    </span>
                    <span className={`transform transition-transform duration-200 text-orange-600 font-bold text-2xl ${openIndex === index ? 'rotate-45' : 'rotate-0'}`}>
                      +
                    </span>
                  </button>
                  <div
                    className={`transition-all duration-300 ease-in-out ${item.isExpandedByDefault && openIndex === null ? 'max-h-96 opacity-100' : openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}
                    itemProp="acceptedAnswer" itemScope itemType="https://schema.org/Answer"
                    id={`faq-answer-${index}`}
                    aria-labelledby={`faq-question-${index}`}
                  >
                    <div className="p-5 pt-0 text-gray-600 leading-relaxed border-t border-gray-50" itemProp="text">
                      {appendLearnMore(item.answer, index)}
                    </div>
                  </div>
                </div>
              );
            })}
          </section>
          {/* Families & Kids */}
          {/* FAQ Category: Families & Kids – short answers, link to family/kids guide */}
          <section data-faq-category="Families & Kids">
            {faqData.slice(10, 15).map((item, idx) => {
              const index = 10 + idx;
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-200 hover:shadow-md"
                  itemProp="mainEntity" itemScope itemType="https://schema.org/Question"
                >
                  <button
                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                    className="w-full flex items-center justify-between p-5 text-left focus:outline-none"
                    aria-expanded={openIndex === index}
                    aria-controls={`faq-answer-${index}`}
                    id={`faq-question-${index}`}
                  >
                    <span className="text-lg font-semibold text-gray-800 pr-8 flex items-center" itemProp="name">
                      <span className="inline-block mr-2 text-orange-500 font-bold">Q.</span>
                      {item.question}
                    </span>
                    <span className={`transform transition-transform duration-200 text-orange-600 font-bold text-2xl ${openIndex === index ? 'rotate-45' : 'rotate-0'}`}>
                      +
                    </span>
                  </button>
                  <div
                    className={`transition-all duration-300 ease-in-out ${item.isExpandedByDefault && openIndex === null ? 'max-h-96 opacity-100' : openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}
                    itemProp="acceptedAnswer" itemScope itemType="https://schema.org/Answer"
                    id={`faq-answer-${index}`}
                    aria-labelledby={`faq-question-${index}`}
                  >
                    <div className="p-5 pt-0 text-gray-600 leading-relaxed border-t border-gray-50" itemProp="text">
                      {appendLearnMore(item.answer, index)}
                    </div>
                  </div>
                </div>
              );
            })}
          </section>
          {/* Leopard Behavior & Wildlife */}
          {/* FAQ Category: Leopard Behavior & Wildlife – short answers, link to wildlife/behavior/photography guide */}
          <section data-faq-category="Leopard Behavior & Wildlife">
            {faqData.slice(15, 20).map((item, idx) => {
              const index = 15 + idx;
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-200 hover:shadow-md"
                  itemProp="mainEntity" itemScope itemType="https://schema.org/Question"
                >
                  <button
                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                    className="w-full flex items-center justify-between p-5 text-left focus:outline-none"
                    aria-expanded={openIndex === index}
                    aria-controls={`faq-answer-${index}`}
                    id={`faq-question-${index}`}
                  >
                    <span className="text-lg font-semibold text-gray-800 pr-8 flex items-center" itemProp="name">
                      <span className="inline-block mr-2 text-orange-500 font-bold">Q.</span>
                      {item.question}
                    </span>
                    <span className={`transform transition-transform duration-200 text-orange-600 font-bold text-2xl ${openIndex === index ? 'rotate-45' : 'rotate-0'}`}>
                      +
                    </span>
                  </button>
                  <div
                    className={`transition-all duration-300 ease-in-out ${item.isExpandedByDefault && openIndex === null ? 'max-h-96 opacity-100' : openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}
                    itemProp="acceptedAnswer" itemScope itemType="https://schema.org/Answer"
                    id={`faq-answer-${index}`}
                    aria-labelledby={`faq-question-${index}`}
                  >
                    <div className="p-5 pt-0 text-gray-600 leading-relaxed border-t border-gray-50" itemProp="text">
                      {appendLearnMore(item.answer, index)}
                    </div>
                  </div>
                </div>
              );
            })}
          </section>
          {/* Pricing & Budget */}
          {/* FAQ Category: Pricing & Budget – short answers, link to pricing guide */}
          <section data-faq-category="Pricing & Budget">
            {faqData.slice(20).map((item, idx) => {
              const index = 20 + idx;
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-200 hover:shadow-md"
                  itemProp="mainEntity" itemScope itemType="https://schema.org/Question"
                >
                  <button
                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                    className="w-full flex items-center justify-between p-5 text-left focus:outline-none"
                    aria-expanded={openIndex === index}
                    aria-controls={`faq-answer-${index}`}
                    id={`faq-question-${index}`}
                  >
                    <span className="text-lg font-semibold text-gray-800 pr-8 flex items-center" itemProp="name">
                      <span className="inline-block mr-2 text-orange-500 font-bold">Q.</span>
                      {item.question}
                    </span>
                    <span className={`transform transition-transform duration-200 text-orange-600 font-bold text-2xl ${openIndex === index ? 'rotate-45' : 'rotate-0'}`}>
                      +
                    </span>
                  </button>
                  <div
                    className={`transition-all duration-300 ease-in-out ${item.isExpandedByDefault && openIndex === null ? 'max-h-96 opacity-100' : openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}
                    itemProp="acceptedAnswer" itemScope itemType="https://schema.org/Answer"
                    id={`faq-answer-${index}`}
                    aria-labelledby={`faq-question-${index}`}
                  >
                    <div className="p-5 pt-0 text-gray-600 leading-relaxed border-t border-gray-50" itemProp="text">
                      {appendLearnMore(item.answer, index)}
                    </div>
                  </div>
                </div>
              );
            })}
          </section>
        </div>

        {/* Call to Action Section */}
        <div className="mt-16 bg-orange-600 rounded-3xl p-8 text-center text-white shadow-xl">
          <h2 className="text-2xl font-bold mb-2">Still have questions?</h2>
          <p className="mb-6 opacity-90">
            Our safari experts are available 24/7 to help you plan your trip.{' '}
            <a
              href="/safaris"
              className="inline-block bg-white text-orange-600 px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition shadow-lg"
            >
              Explore Jawai Leopard Safaris
            </a>
          </p>
          <a
            href="/contact"
            className="inline-block bg-white text-orange-600 px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition shadow-lg"
          >
            Contact Support
          </a>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;