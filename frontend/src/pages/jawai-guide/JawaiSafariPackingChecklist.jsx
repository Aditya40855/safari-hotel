import React from 'react';
import { Helmet } from "react-helmet-async";
import { Link } from 'react-router-dom';

const todayDate = new Date().toISOString().split('T')[0];

const JawaiSafariPackingChecklist = () => {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": `${window.location.origin}/`
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Jawai Guide",
        "item": `${window.location.origin}/jawai-guide`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Jawai Safari Packing Checklist",
        "item": `${window.location.origin}/jawai-guide/jawai-safari-packing-checklist`
      }
    ]
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Jawai Safari Packing Checklist (2026) – What to Wear, Carry & Avoid",
    "description": "The ultimate packing guide for Jawai Leopard Safari in 2026. Detailed clothing recommendations for all seasons, essential gear, photography kit, family checklist, and items to strictly avoid for a safe and comfortable experience.",
    "author": {
      "@type": "Organization",
      "name": "Jawai Safari Local Experts"
    },
    "datePublished": "2023-11-15", // Original publish date
    "dateModified": todayDate, // Updated date
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${window.location.origin}/jawai-guide/jawai-safari-packing-checklist`
    },
    "image": {
      "@type": "ImageObject",
      "url": `${window.location.origin}/images/jawai-safari-packing-guide.jpg`, // Replace with actual image URL
      "width": 1200,
      "height": 630
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Do I need special safari clothing for Jawai?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No, specialized safari gear is not required. Comfortable, neutral-colored clothing (like beige, green, or brown) made from breathable fabrics is sufficient. Avoid bright colors and loud patterns."
        }
      },
      {
        "@type": "Question",
        "name": "Is it cold during morning safaris in Jawai?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, morning safaris start before sunrise and can be surprisingly chilly, especially from October to March. A light jacket, fleece, or layers are highly recommended."
        }
      },
      {
        "@type": "Question",
        "name": "What kind of shoes should I wear for a Jawai safari?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Wear closed-toe shoes with good grip, like sneakers or hiking boots. The terrain is rocky and uneven, and you may need to walk short distances. Avoid sandals, flip-flops, or heels."
        }
      },
      {
        "@type": "Question",
        "name": "Can I bring a backpack on the safari gypsy?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, a small daypack is recommended to carry essentials like water, sunscreen, camera gear, and extra layers. Space in the gypsy is limited, so avoid large suitcases."
        }
      },
      {
        "@type": "Question",
        "name": "Is there mobile network coverage during the safari?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Network coverage is spotty and unreliable in the hilly safari terrains. It's best to keep your phone on silent to avoid disturbing wildlife and carry a power bank if needed."
        }
      },
      {
        "@type": "Question",
        "name": "What are the absolute must-carry items?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Must-carry items include a reusable water bottle to stay hydrated, sunscreen, sunglasses, a hat/cap, any necessary personal medication, and your camera/binoculars."
        }
      },
      {
        "@type": "Question",
        "name": "Are there items I am strictly prohibited from carrying?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. Do not carry food to feed animals, alcohol, smoking materials, loud music devices, drones (without permission), or single-use plastic bags which can litter the environment."
        }
      }
    ]
  };

  const speakableSchema = {
    "@context": "https://schema.org",
    "@type": "SpeakableSpecification",
    "xpath": [
      "/html/head/title",
      "//h1",
      "//h2[contains(text(),'Quick Safety Snapshot')]",
      "//h2[contains(text(),'What to Wear: The Golden Rules')]"
    ]
  };

  return (
    <>
      <Helmet>
        <link rel="canonical" href={`${window.location.origin}/jawai-guide/jawai-safari-packing-checklist`} />
        <title>Jawai Safari Packing Checklist (2026) – What to Wear, Carry & Avoid</title>
        <meta name="description" content="Your ultimate Jawai Leopard Safari packing guide for 2026. Detailed checklists for clothing, essentials, photography gear, and family needs. Learn what to wear for comfort and safety, and what to strictly avoid." />
        <meta name="keywords" content="Jawai safari packing list, what to wear on safari India, Jawai leopard safari clothing, safari essentials list, packing for wildlife safari, family safari packing guide Jawai, Jawai safari tips 2026" />
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(speakableSchema)}</script>
      </Helmet>

      <main className="max-w-4xl mx-auto p-6 font-sans text-gray-800 leading-relaxed">
        {/* Header Section with Update Notice */}
        <header className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-blue-900 mb-4">Jawai Safari Packing Checklist (Official Field Guide 2026)</h1>
          <p className="text-xl text-gray-600 mb-4">
            A practical, on-ground packing guide designed for comfort, safety, and the best wildlife viewing experience in Jawai's unique terrain.
          </p>
          <div className="flex flex-col md:flex-row justify-center items-center gap-4 text-sm text-gray-500">
            <span><span className="font-semibold">Based on:</span> Real safari conditions & expert tracker advice</span>
            <span className="hidden md:inline">|</span>
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-medium">Updated: February 2026</span>
          </div>
        </header>

        {/* Who This Guide Is For Section */}
        <section className="mb-12">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold text-blue-800 mb-4">Who This Packing Guide Is For</h2>
            <p className="mb-4">This comprehensive checklist is catered to:</p>
            <ul className="grid md:grid-cols-2 gap-2 text-gray-700">
              <li className="flex items-center"><span className="text-blue-500 mr-2">✓</span> First-time safari visitors to Jawai.</li>
              <li className="flex items-center"><span className="text-blue-500 mr-2">✓</span> Families traveling with children or seniors.</li>
              <li className="flex items-center"><span className="text-blue-500 mr-2">✓</span> Wildlife photographers and birdwatchers.</li>
              <li className="flex items-center"><span className="text-blue-500 mr-2">✓</span> Travelers seeking a safe and comfortable experience.</li>
            </ul>
          </div>
        </section>

        {/* Quick Safety Snapshot Microsection */}
        <section className="mb-12">
          <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-600 shadow-sm flex items-start">
            <div className="mr-4 text-4xl text-blue-600">🛡️</div>
            <div>
              <h2 className="text-xl font-bold text-blue-900 mb-2">Quick Safety Snapshot</h2>
              <ul className="list-disc list-inside text-gray-700 space-y-1 font-medium">
                <li>Zero recorded tourist incidents during Jawai leopard safaris to date.</li>
                <li>Safaris are conducted in open 4x4 gypsy vehicles – proper clothing and grip are essential for safety.</li>
                <li>Morning safaris start in the dark before sunrise; evening safaris end after sunset.</li>
                <li>Temperatures can fluctuate significantly between early morning/late evening and midday.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* What to Wear: The Golden Rules Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-blue-900 mb-6">What to Wear: The Golden Rules</h2>
          <p className="mb-6 text-gray-700">
            Your clothing choice directly impacts your comfort and can even affect wildlife sightings. The key is to blend in and stay comfortable in changing temperatures.
          </p>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Recommended Clothing */}
            <div className="bg-green-50 p-6 rounded-lg border-t-4 border-green-500 shadow-sm h-full">
              <h3 className="text-xl font-bold text-green-800 mb-4 flex items-center"><span className="mr-2">👍</span> Highly Recommended</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="font-bold mr-2">Neutral Colors:</span> Wear khaki, beige, brown, or olive green. These colors blend with the environment and don't startle wildlife.
                </li>
                <li className="flex items-start">
                  <span className="font-bold mr-2">Layered Clothing:</span> Essential! Wear a t-shirt with a shirt or fleece over it. You can peel off layers as the day warms up.
                </li>
                <li className="flex items-start">
                  <span className="font-bold mr-2">Full Sleeves & Trousers:</span> Protects against sun, dust, insects, and thorny bushes. Comfortable cargo pants or cotton trousers are ideal.
                </li>
                <li className="flex items-start">
                  <span className="font-bold mr-2">Closed-Toe Shoes:</span> Sturdy sneakers or hiking boots with good grip are non-negotiable for rocky and uneven terrain.
                </li>
                <li className="flex items-start">
                  <span className="font-bold mr-2">Sun Protection:</span> A wide-brimmed hat or cap and UV-protective sunglasses are crucial throughout the year.
                </li>
              </ul>
            </div>

            {/* What to Avoid */}
            <div className="bg-red-50 p-6 rounded-lg border-t-4 border-red-500 shadow-sm h-full">
              <h3 className="text-xl font-bold text-red-800 mb-4 flex items-center"><span className="mr-2">👎</span> Strictly Avoid</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="font-bold mr-2 text-red-700">Bright/Neon Colors:</span> Red, white, bright yellow, etc., make you highly visible and can scare away animals.
                </li>
                <li className="flex items-start">
                  <span className="font-bold mr-2 text-red-700">Camouflage/Military Prints:</span> In India, wearing military-style camouflage clothing can be problematic and is best avoided.
                </li>
                <li className="flex items-start">
                  <span className="font-bold mr-2 text-red-700">Open Footwear:</span> Sandals, flip-flops, or heels offer zero protection and are dangerous on safari terrain.
                </li>
                <li className="flex items-start">
                  <span className="font-bold mr-2 text-red-700">Strong Perfumes/Deodorants:</span> Strong scents can attract insects or alert animals to your presence from afar.
                </li>
                <li className="flex items-start">
                  <span className="font-bold mr-2 text-red-700">Noisy Jewelry/Accessories:</span> Avoid anything that jingles or reflects light brightly.
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Seasonal Considerations Microsection */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-blue-900 mb-4">Seasonal Packing Adjustments</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-5 rounded-lg shadow-sm border border-blue-100">
              <h3 className="font-bold text-blue-800 mb-2">❄️ Winter (Oct - Mar)</h3>
              <p className="text-gray-700 text-sm">Mornings and evenings are cold (can drop below 5°C). Pack warm jackets, gloves, beanies, and thermal layers. Mid-day is pleasant.</p>
            </div>
            <div className="bg-white p-5 rounded-lg shadow-sm border border-orange-100">
              <h3 className="font-bold text-orange-800 mb-2">☀️ Summer (Apr - Jun)</h3>
              <p className="text-gray-700 text-sm">Extremely hot. Pack very light, breathable cottons. High-SPF sunscreen, sunglasses, and staying hydrated is critical. Early mornings are bearable.</p>
            </div>
          </div>
        </section>

        {/* Essential Gear Checklist Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-blue-900 mb-6">The Essential Gear Checklist</h2>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <p className="mb-4 text-gray-700">Don't leave your accommodation without these items in your daypack:</p>
            <ul className="grid md:grid-cols-2 gap-x-8 gap-y-4 text-gray-700">
              <li className="flex items-center">
                <span className="text-xl mr-3">💧</span> Reusable Water Bottle (Stay hydrated!)
              </li>
              <li className="flex items-center">
                <span className="text-xl mr-3">🧴</span> High-SPF Sunscreen & Lip Balm
              </li>
              <li className="flex items-center">
                <span className="text-xl mr-3">💊</span> Personal Medication & Basic First-Aid
              </li>
              <li className="flex items-center">
                <span className="text-xl mr-3">🕶️</span> Polarized Sunglasses & Sun Hat
              </li>
              <li className="flex items-center">
                <span className="text-xl mr-3">🎒</span> Small, Comfortable Daypack
              </li>
              <li className="flex items-center">
                <span className="text-xl mr-3">🔋</span> Power Bank (Network is limited)
              </li>
              <li className="flex items-center">
                <span className="text-xl mr-3">🧣</span> Dust Mask/Scarf (For dusty tracks)
              </li>
              <li className="flex items-center">
                <span className="text-xl mr-3">🔦</span> Small Flashlight/Headlamp (For early/late hours)
              </li>
            </ul>
          </div>
        </section>

        {/* The First 30 Minutes Micro Experience */}
        <section className="mb-12">
           <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500 shadow-sm flex items-start">
             <span className="text-4xl mr-4">🌄</span>
            <div>
              <h2 className="text-xl font-bold text-blue-900 mb-2">Micro-Experience: The First 30 Minutes</h2>
              <p className="text-gray-700 italic">
                "The safari begins quietly before dawn. The engine hums low as you enter the wilderness. You feel the distinct chill in the air. Trackers communicate in hushed tones, scanning the horizon. The landscape slowly reveals itself as the sun rises. Being packed light, warm, and comfortable allows you to fully absorb this magical, tranquil start without distractions."
              </p>
            </div>
          </div>
        </section>

        {/* Special Checklists: Photography & Family */}
        <section className="mb-12 grid md:grid-cols-2 gap-8">
          {/* Photography Checklist */}
          <div>
            <h2 className="text-2xl font-bold text-blue-900 mb-6 flex items-center"><span className="mr-3">📷</span> For Photographers</h2>
             <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 h-full">
              <ul className="list-disc list-inside space-y-3 text-gray-700">
                <li>Camera body with a sturdy neck/shoulder strap.</li>
                <li>Telephoto lens (at least 300mm+) for wildlife.</li>
                <li>Wide-angle lens for dramatic landscapes.</li>
                <li>Extra fully charged batteries & empty memory cards.</li>
                <li>Lens cleaning cloth/blower (dust is a major issue).</li>
                <li>Bean bag for stabilization on the gypsy frame.</li>
                <li><strong>Note:</strong> Drones are generally not permitted without prior official permissions.</li>
              </ul>
            </div>
          </div>

          {/* Family Checklist */}
          <div>
             <h2 className="text-2xl font-bold text-blue-900 mb-6 flex items-center"><span className="mr-3">👨‍👩‍👧‍👦</span> For Families with Kids</h2>
             <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 h-full">
              <ul className="list-disc list-inside space-y-3 text-gray-700">
                <li>Extra layers of clothing specifically for children.</li>
                <li>Small blanket for early morning chill.</li>
                <li>Plenty of water and non-messy, quiet snacks.</li>
                <li>Sun protection (hats, kids' sunscreen).</li>
                <li>Wet wipes and tissues for quick clean-ups.</li>
                <li>A favorite small, quiet toy or comfort item.</li>
                <li><strong>Rule:</strong> No noisy toys or gadgets are allowed.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Strictly Prohibited Items Section (Enhanced Alert Box) */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-red-800 mb-6">Strictly Prohibited: Do Not Carry</h2>
          <div className="bg-red-50 border-l-4 border-red-600 p-6 mb-6 rounded-r-lg shadow-sm flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-red-600 mr-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
              </svg>
            <div>
              <h3 className="text-xl font-bold text-red-800 mb-1">Zero Tolerance Policy</h3>
               <p className="text-red-800 font-medium">Carrying these items can lead to fines or cancellation of your safari. They pose a threat to wildlife and the ecosystem.</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-red-100 grid md:grid-cols-2 gap-4">
            <ul className="list-disc list-inside space-y-3 text-lg text-gray-700">
              <li><span className="font-bold text-red-700">Food to Feed Animals:</span> Strictly forbidden. Feeding wildlife alters behavior and is dangerous.</li>
              <li><span className="font-bold text-red-700">Alcohol & Drugs:</span> Consumption before or during safari is prohibited for safety.</li>
              <li><span className="font-bold text-red-700">Smoking Materials:</span> Fire hazard risk in the dry landscape.</li>
            </ul>
             <ul className="list-disc list-inside space-y-3 text-lg text-gray-700">
              <li><span className="font-bold text-red-700">Loud Speakers/Music:</span> Disturbs wildlife and other guests. Maintain silence.</li>
              <li><span className="font-bold text-red-700">Single-Use Plastics:</span> Plastic bags, bottles, wrappers, etc., that can litter the environment.</li>
              <li><span className="font-bold text-red-700">Firearms or Weapons:</span> Strictly prohibited on safari vehicles.</li>
            </ul>
          </div>
        </section>

         {/* Trust Section */}
        <section className="mb-12">
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 shadow-sm text-center">
            <h2 className="text-xl font-bold text-gray-800 mb-3">Why This Checklist Is Reliable</h2>
            <p className="text-gray-700 max-w-2xl mx-auto">
              This guide is not theoretical. It is compiled based on the real-world operational realities of Jawai safaris, shaped by feedback from experienced local trackers, understanding of the rugged terrain, and years of incident-free guest experiences. Following it ensures you are prepared for the actual conditions you will encounter.
            </p>
          </div>
        </section>

        {/* Frequently Asked Questions Section (Accordion Style) */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-blue-900 mb-8">Frequently Asked Questions on Packing</h2>
          <div className="space-y-4">
            {faqSchema.mainEntity.map((faq, index) => (
              <details key={index} className="group bg-white rounded-lg shadow-sm border border-gray-100 open:border-blue-200">
                <summary className="flex cursor-pointer items-center justify-between p-6 font-medium text-lg text-gray-800 hover:text-blue-800 focus:outline-none">
                  {faq.name}
                  <span className="ml-4 flex-shrink-0 text-gray-400 group-open:rotate-180 group-open:text-blue-500 transition-transform duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </summary>
                <div className="px-6 pb-6 text-gray-700 leading-relaxed bg-gray-50 rounded-b-lg">
                  {faq.acceptedAnswer.text}
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* Related Jawai Safari Guides */}
        <section className="mb-12">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold text-blue-800 mb-5">Related Jawai Safari Guides</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link
                to="/jawai-guide/best-time-to-visit"
                className="block border border-gray-200 rounded-lg p-5 bg-gray-50 hover:bg-gray-100 transition-colors shadow-sm font-semibold text-blue-900"
              >
                Best Time to Visit Jawai Safari
              </Link>
              <Link
                to="/jawai-guide/jawai-safari-routes"
                className="block border border-gray-200 rounded-lg p-5 bg-gray-50 hover:bg-gray-100 transition-colors shadow-sm font-semibold text-blue-900"
              >
                How Jawai Leopard Safari Routes Work
              </Link>
              <Link
                to="/jawai-guide/travel-awareness/jawai-safari-safety"
                className="block border border-gray-200 rounded-lg p-5 bg-gray-50 hover:bg-gray-100 transition-colors shadow-sm font-semibold text-blue-900"
              >
                Jawai Safari Safety &amp; Rules Guide
              </Link>
              <Link
                to="/jawai-guide/jawai-safari-cost-for-2-4-families"
                className="block border border-gray-200 rounded-lg p-5 bg-gray-50 hover:bg-gray-100 transition-colors shadow-sm font-semibold text-blue-900"
              >
                Jawai Safari Cost for Families
              </Link>
              <Link
                to="/jawai-guide/is-jawai-safari-worth-it"
                className="block border border-gray-200 rounded-lg p-5 bg-gray-50 hover:bg-gray-100 transition-colors shadow-sm font-semibold text-blue-900"
              >
                Is Jawai Safari Worth It?
              </Link>
              <Link
                to="/jawai-guide/why-jawai-safari-feels-personal"
                className="block border border-gray-200 rounded-lg p-5 bg-gray-50 hover:bg-gray-100 transition-colors shadow-sm font-semibold text-blue-900"
              >
                Why Jawai Safari Feels More Personal
              </Link>
            </div>
          </div>
        </section>

        {/* Helpful Links & Call to Action */}
        <section className="mt-12 p-8 bg-blue-50 rounded-lg shadow-sm text-center border border-blue-100">
          <h3 className="text-2xl font-bold text-blue-900 mb-4">Ready to Plan Your Adventure?</h3>
          <p className="text-lg text-gray-700 mb-6">
            Now that you know what to pack, explore other essential guides to plan a perfect and safe Jawai safari.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
             <Link to="/jawai-guide/best-time-to-visit" className="bg-blue-600 text-white px-6 py-3 rounded-md font-bold hover:bg-blue-700 transition-colors shadow-md">
              Check Best Time to Visit
            </Link>
            <Link to="/jawai-guide/travel-awareness/jawai-safari-safety" className="bg-white text-blue-600 px-6 py-3 rounded-md font-bold border-2 border-blue-600 hover:bg-blue-50 transition-colors shadow-sm">
              Read Safety Guide
            </Link>
             <Link to="/jawai-guide/jawai-safari-cost-for-2-4-families" className="bg-white text-blue-600 px-6 py-3 rounded-md font-bold border-2 border-blue-600 hover:bg-blue-50 transition-colors shadow-sm">
              See Safari Costs
            </Link>
          </div>
        </section>

      </main>
    </>
  );
}

export default JawaiSafariPackingChecklist;