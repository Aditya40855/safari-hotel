import React from 'react';
import { Helmet } from "react-helmet-async";

const todayDate = new Date().toISOString().split('T')[0];

const JawaiSafariWithChildren = () => {
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
        "name": "Jawai Safari With Children",
        "item": `${window.location.origin}/jawai-guide/jawai-safari-with-children`
      }
    ]
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Jawai Safari With Children – Safety, Age Guidelines & Family Tips",
    "description": "A practical and safety-focused guide for families planning a Jawai safari with children, covering age suitability, safety rules, and family travel tips.",
    "author": {
      "@type": "Organization",
      "name": "Jawai Safari Local Experts"
    },
    "datePublished": "2023-10-27", // Original publish date
    "dateModified": todayDate, // Updated date
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${window.location.origin}/jawai-guide/jawai-safari-with-children`
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is the recommended minimum age for children on a Jawai safari?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Children under 3 years are not recommended; ages 3-5 are strongly discouraged due to unpredictability; 5 years and above are generally suitable with close supervision."
        }
      },
      {
        "@type": "Question",
        "name": "Are open gypsy safaris safe for children in Jawai?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, they can be safe with strict adherence to safety rules: no standing, no leaning out, and keeping children seated securely between adults."
        }
      },
      {
        "@type": "Question",
        "name": "Have there been any incidents involving children on Jawai safaris?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No. To date, there have been zero recorded incidents involving children on Jawai safaris when standard safety protocols have been followed."
        }
      },
      {
        "@type": "Question",
        "name": "What should I do if my child cries during the safari?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Immediately speak to the driver or co-driver. The safari can slow down, stop in a safe spot, or adjust the route to ensure your child's comfort. Your child's well-being is the priority."
        }
      },
      {
        "@type": "Question",
        "name": "Can I bring a stroller on the gypsy safari?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No, strollers are not practical due to the rugged and bumpy terrain of the safari routes. It's better to carry child comfort items like blankets or favorite toys."
        }
      },
      {
        "@type": "Question",
        "name": "Is it okay to bring food and snacks for children?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, bringing light, non-messy snacks and sufficient water is highly recommended to keep children comfortable and hydrated during the safari."
        }
      },
      {
        "@type": "Question",
        "name": "What happens in case of a medical emergency with a child on safari?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Inform the driver immediately. Safaris are conducted with safety as the priority. The driver will take immediate action to return to the resort or reach medical aid if needed."
        }
      },
      {
        "@type": "Question",
        "name": "Is the safari route too bumpy for young children?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "While some parts of the terrain can be bumpy, early morning safaris are generally calmer. Proper seating between adults and slow driving by experienced drivers help mitigate discomfort."
        }
      },
      {
        "@type": "Question",
        "name": "Are school-aged children suitable for Jawai safari?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, children aged 5 and above generally enjoy the experience and can safely participate with proper supervision and adherence to rules."
        }
      },
      {
        "@type": "Question",
        "name": "Can toddlers join the safari?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "It is strongly recommended against bringing toddlers under 3 years due to significant safety, comfort, and unpredictability concerns in an open-vehicle jungle environment."
        }
      },
      {
        "@type": "Question",
        "name": "Is a morning safari better than an evening safari for children?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, morning safaris are generally preferred for families. The conditions are usually calmer, cooler, and the light is softer, making it a more comfortable experience for children."
        }
      },
      {
        "@type": "Question",
        "name": "Are there any special rules for children during the safari?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, strict rules apply: Children must remain seated at all times, avoid loud noises to prevent startling wildlife, and parents must ensure all instructions from the driver/tracker are followed instantly."
        }
      },
      {
        "@type": "Question",
        "name": "What should parents carry for their children on safari?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Essential items include extra clothes, light snacks, water, sun protection (hat/sunscreen), a light jacket for morning safaris, and comfort items like a favorite toy or blanket."
        }
      }
    ]
  };

  const speakableSchema = {
    "@context": "https://schema.org",
    "@type": "SpeakableSpecification",
    "xpath": [
      "/html/head/title",
      "//h2[contains(text(),'Core Safety Rules for Children')]//following-sibling::ul[1]/li[1]",
      "//h2[contains(text(),'If Your Child Feels Uncomfortable')]",
      "//h2[contains(text(),'Age Guidance Section (Clear & Honest)')]//following-sibling::ul[1]/li[3]"
    ]
  };

  return (
    <>
      <Helmet>
        <link rel="canonical" href={`${window.location.origin}/jawai-guide/jawai-safari-with-children`} />
        <title>Jawai Safari With Children – Safety, Age Guidelines & Family Tips</title>
        <meta name="description" content="Practical and safety-first guide for families planning a Jawai safari with children. Covers age suitability, safety rules, zero incident record, and essential family travel tips for a safe adventure." />
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(speakableSchema)}</script>
      </Helmet>

      <main className="max-w-4xl mx-auto p-6 font-sans text-gray-800 leading-relaxed">
        {/* Header Section with Update Notice */}
        <header className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-blue-900 mb-4">Jawai Safari With Children: What Parents Must Know</h1>
          <p className="text-xl text-gray-600 mb-4">
            A practical, safety-first guide for families planning a safari adventure in Jawai with children.
          </p>
          <div className="flex flex-col md:flex-row justify-center items-center gap-4 text-sm text-gray-500">
            <span><span className="font-semibold">Based on:</span> Real on-ground safari operations in Jawai</span>
            <span className="hidden md:inline">|</span>
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-medium">Updated: February 2026</span>
          </div>
        </header>

        {/* Introduction & Who This Guide Is For */}
        <section className="mb-12">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold text-blue-800 mb-4">Who This Guide Is For</h2>
            <p className="mb-4">This guide is specifically crafted for:</p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>Families planning a trip to Jawai with kids of varying ages.</li>
              <li>First-time safari travelers unsure about logistics with children.</li>
              <li>Parents with concerns about safety in open gypsy vehicles.</li>
              <li>Anyone looking for honest, practical advice on managing a safari with young ones.</li>
            </ul>
          </div>
        </section>

        {/* Age Guidance Section (Enhanced with Visuals) */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-blue-900 mb-6">Age Guidance: Honest & Clear Recommendations</h2>
          <p className="mb-6 text-gray-700">
            While there are no strict legal mandates, these guidelines are based on years of experience to ensure the safety and comfort of your child and the smooth operation of the safari.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6">
            {/* Under 3 Years */}
            <div className="bg-red-50 p-6 rounded-lg border-t-4 border-red-500 shadow-sm">
              <div className="flex items-center mb-4">
                <span className="text-3xl mr-3">👶</span>
                <h3 className="text-xl font-bold text-red-800">Under 3 Years</h3>
              </div>
              <p className="font-bold text-red-700 mb-2">Not Recommended</p>
              <p className="text-sm text-gray-600">Due to significant safety concerns in open vehicles, comfort issues on bumpy terrain, and unpredictability.</p>
            </div>

            {/* 3–5 Years */}
            <div className="bg-orange-50 p-6 rounded-lg border-t-4 border-orange-500 shadow-sm">
              <div className="flex items-center mb-4">
                <span className="text-3xl mr-3">🧒</span>
                <h3 className="text-xl font-bold text-orange-800">3–5 Years</h3>
              </div>
              <p className="font-bold text-orange-700 mb-2">Strongly Discouraged</p>
              <p className="text-sm text-gray-600">The unpredictable nature of wildlife and terrain makes this age group challenging to manage safely and comfortably.</p>
            </div>

            {/* 5+ Years */}
            <div className="bg-green-50 p-6 rounded-lg border-t-4 border-green-500 shadow-sm">
              <div className="flex items-center mb-4">
                <span className="text-3xl mr-3">🧑</span>
                <h3 className="text-xl font-bold text-green-800">5+ Years</h3>
              </div>
              <p className="font-bold text-green-700 mb-2">Generally Suitable</p>
              <p className="text-sm text-gray-600">Can enjoy the safari with close parental supervision and strict adherence to all safety rules.</p>
            </div>
          </div>
        </section>

        {/* Safety Record Microsection (New) */}
        <section className="mb-12">
          <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-600 shadow-sm flex items-start">
            <div className="mr-4 text-4xl text-blue-600">🛡️</div>
            <div>
              <h2 className="text-xl font-bold text-blue-900 mb-2">Safety Record: Zero Incidents</h2>
              <p className="text-gray-700 font-medium">
                It is important to note that to date, there have been <span className="font-bold">zero recorded incidents</span> involving children on Jawai safaris when standard safety protocols and guidelines have been followed. Your family's safety is our utmost priority.
              </p>
            </div>
          </div>
        </section>

        {/* First 30 Minutes Micro Experience */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-blue-900 mb-6">The First 30 Minutes: A Micro-Experience</h2>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <p className="mb-4 text-gray-700">Knowing what to expect right at the start can help settle nerves:</p>
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="inline-block p-2 bg-blue-100 text-blue-600 rounded-full mr-4">🌅</span>
                <div>
                  <h3 className="font-bold text-lg text-gray-800">Early Morning Calm</h3>
                  <p className="text-gray-600">Safaris usually start in the peaceful, cooler early morning hours, which is often the most comfortable time for children.</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="inline-block p-2 bg-blue-100 text-blue-600 rounded-full mr-4">🚜</span>
                <div>
                  <h3 className="font-bold text-lg text-gray-800">Bumpy Terrain Awareness</h3>
                  <p className="text-gray-600">The route will have uneven and bumpy sections. Ensure children are securely seated right from the start.</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="inline-block p-2 bg-blue-100 text-blue-600 rounded-full mr-4">👨‍👩‍👧</span>
                <div>
                  <h3 className="font-bold text-lg text-gray-800">Strategic Seating</h3>
                  <p className="text-gray-600">Always seat children in the middle row, securely between two adults, for maximum safety and supervision.</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="inline-block p-2 bg-blue-100 text-blue-600 rounded-full mr-4">🤫</span>
                <div>
                  <h3 className="font-bold text-lg text-gray-800">Noise Discipline</h3>
                  <p className="text-gray-600">Gently explain the importance of being quiet. Sudden loud noises can startle wildlife and detract from the experience.</p>
                </div>
              </li>
            </ul>
          </div>
        </section>

        {/* Core Safety Rules for Children (Enhanced Alert Box) */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-blue-900 mb-6">Core Safety Rules: Non-Negotiable</h2>
          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 mb-6 rounded-r-lg shadow-sm">
            <div className="flex items-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-yellow-600 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <h3 className="text-xl font-bold text-yellow-800">Critical Safety Note</h3>
            </div>
            <p className="text-yellow-800 font-medium">Open gypsy safaris pose inherent risks. Strict adherence to these rules by both parents and children is mandatory for a safe experience.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <ul className="list-decimal list-inside space-y-3 text-lg text-gray-700 ml-4">
              <li><span className="font-bold text-red-600">NO Standing or Leaning Out:</span> Children must remain seated with their limbs inside the vehicle at all times.</li>
              <li><span className="font-bold text-red-600">NO Getting Down:</span> Never exit the vehicle in the jungle area unless explicitly instructed by the driver at a designated safe zone.</li>
              <li><span className="font-bold">Secure Seating:</span> Children must always be seated between adults.</li>
              <li><span className="font-bold">Follow Instructions Promptly:</span> Immediate compliance with all instructions from the driver and tracker is crucial.</li>
              <li><span className="font-bold">Maintain Silence:</span> Keep noise to a minimum to avoid disturbing wildlife or other guests.</li>
            </ul>
          </div>
        </section>

        {/* Parent's Checklist Microsection (New Content Box) */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-blue-900 mb-6">Parent's Safari Checklist: What to Carry</h2>
          <div className="bg-indigo-50 p-6 rounded-lg shadow-sm border border-indigo-100 grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-bold text-indigo-800 mb-4 flex items-center"><span className="mr-2">🎒</span> Essentials</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Water bottles (stay hydrated!)</li>
                <li>Light, non-messy snacks</li>
                <li>Sunscreen & hats/caps</li>
                <li>Sunglasses for glare</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold text-indigo-800 mb-4 flex items-center"><span className="mr-2">👕</span> Clothing & Comfort</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Light jacket/fleece (for morning chill)</li>
                <li>Extra set of clothes (accidents happen)</li>
                <li>Comfort item (favorite small toy/blanket)</li>
                <li>Wet wipes & tissues</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Handling Discomfort Section (Enhanced Tip Box) */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-blue-900 mb-6">If Your Child Feels Uncomfortable</h2>
          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-6 rounded-r-lg shadow-sm flex items-start">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            <div>
              <h3 className="text-xl font-bold text-blue-800 mb-2">Pro-Parent Tip: Communication is Key</h3>
               <p className="text-blue-800 font-medium">Always communicate openly and immediately with your driver or co-driver. They are there to ensure your safety and comfort.</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <ul className="list-disc list-inside space-y-3 text-lg text-gray-700 ml-4">
              <li><strong>Speak Up Immediately:</strong> Don't hesitate to inform the driver if your child is crying, scared, or feeling unwell.</li>
              <li><strong>Adjustments Can Be Made:</strong> The driver can slow down, find quieter routes, or stop in a safe area to help calm your child.</li>
              <li><strong>Prioritize Comfort Over Sightings:</strong> Your child's well-being always comes first. It is perfectly okay to cut a safari short if needed.</li>
            </ul>
          </div>
        </section>

        {/* What Is Not Allowed & Ethical Notes (Combined & Enhanced) */}
        <section className="mb-12 grid md:grid-cols-2 gap-8">
          {/* What Is Not Allowed */}
          <div>
            <h2 className="text-2xl font-bold text-red-800 mb-6">Strictly Prohibited</h2>
            <div className="bg-red-50 p-6 rounded-lg shadow-sm border-t-4 border-red-600 h-full">
              <ul className="list-disc list-inside space-y-3 text-gray-700">
                <li>Children roaming around inside the moving gypsy.</li>
                <li>Shouting, screaming, or making loud noises.</li>
                <li>Getting down from the vehicle in the jungle.</li>
                <li>Feeding any wildlife.</li>
                <li>Forcing a visibly scared or distressed child to continue.</li>
              </ul>
            </div>
          </div>

          {/* Community & Ethical Notes */}
          <div>
             <h2 className="text-2xl font-bold text-green-800 mb-6">Community & Ethical Notes</h2>
            <div className="bg-green-50 p-6 rounded-lg shadow-sm border-t-4 border-green-600 h-full">
              <ul className="list-disc list-inside space-y-3 text-gray-700">
                <li>Respect local villagers and their privacy.</li>
                <li>Maintain a strict "no littering" policy; carry all trash back.</li>
                <li>Teach children about the unique human-wildlife coexistence in Jawai.</li>
                <li>Support local conservation efforts by following rules.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Helpful Links Section (Styled) */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-blue-900 mb-6">Helpful Resources for Families</h2>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <ul className="grid md:grid-cols-2 gap-4 text-blue-700 font-medium">
              <li><a href="/jawai-guide/travel-awareness/jawai-safari-safety" className="hover:underline hover:text-blue-900 flex items-center"><span className="mr-2">👉</span> Jawai Safari Safety Tips</a></li>
              <li><a href="/jawai-guide/jawai-safari-routes" className="hover:underline hover:text-blue-900 flex items-center"><span className="mr-2">👉</span> Jawai Safari Routes & Terrains</a></li>
              <li><a href="/jawai-guide/best-time-to-visit" className="hover:underline hover:text-blue-900 flex items-center"><span className="mr-2">👉</span> Best Time to Visit Jawai</a></li>
              <li><a href="/jawai-guide/jawai-safari-cost-for-2-4-families" className="hover:underline hover:text-blue-900 flex items-center"><span className="mr-2">👉</span> Jawai Safari Cost for Families</a></li>
              <li><a href="/jawai-guide/price-vs-experience" className="hover:underline hover:text-blue-900 flex items-center"><span className="mr-2">👉</span> Price vs Experience Analysis</a></li>
              <li><a href="/jawai-guide/travel-awareness/driver-family-facilities" className="hover:underline hover:text-blue-900 flex items-center"><span className="mr-2">👉</span> Driver & Family Facilities</a></li>
              <li><a href="/jawai-guide/jawai-safari-rules-guidelines" className="hover:underline hover:text-blue-900 flex items-center"><span className="mr-2">👉</span> Complete Safari Rules & Guidelines</a></li>
            </ul>
          </div>
        </section>

        {/* Frequently Asked Questions Section (Accordion Style - Concept) */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-blue-900 mb-8">Frequently Asked Questions</h2>
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

        {/* Call to Action / Final Note */}
        <section className="mt-12 p-8 bg-blue-50 rounded-lg shadow-sm text-center border border-blue-100">
          <h3 className="text-2xl font-bold text-blue-900 mb-4">Still Unsure?</h3>
          <p className="text-lg text-gray-700 mb-6">
            Making the right decision for your child's safety is paramount. If you have more questions, explore our detailed resources or contact us directly.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
             <a href="/jawai-guide/jawai-safari-cost-for-2-4-families" className="bg-blue-600 text-white px-6 py-3 rounded-md font-bold hover:bg-blue-700 transition-colors shadow-md">
              See Family Costs
            </a>
            <a href="/jawai-guide/travel-awareness/jawai-safari-safety" className="bg-white text-blue-600 px-6 py-3 rounded-md font-bold border-2 border-blue-600 hover:bg-blue-50 transition-colors shadow-sm">
              Read Safety Guide
            </a>
          </div>
        </section>
      </main>
    </>
  );
};

export default JawaiSafariWithChildren;