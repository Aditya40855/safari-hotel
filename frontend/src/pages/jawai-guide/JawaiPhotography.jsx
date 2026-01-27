import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function JawaiPhotography() {
  const images = [
    {
      src: "/public/opt-1767729050581-641085066.webp",
      title: "Granite Hills of Jawai",
      desc: "Ancient granite formations offering dramatic compositions and natural symmetry."
    },
    {
      src: "/public/PHOTO-2026-01-27-22-04-07.webp",
      title: "Sunset Silhouettes",
      desc: "Golden-hour skies with silhouettes of hills, trees, and wildlife."
    },
  ];

  const faqs = [
    {
      question: "Why is Jawai considered a great photography destination?",
      answer: (
        <>
          Jawai offers unique granite landscapes, open wildlife movement, dramatic light, and cultural coexistence, making it visually distinct from conventional safari regions. The diversity of subjects and the natural harmony between humans and wildlife create compelling photographic opportunities.
        </>
      )
    },
    {
      question: "What types of photography are best in Jawai?",
      answer: (
        <>
          Landscape, wildlife, cultural, sunrise, sunset, and storytelling photography work exceptionally well in Jawai. The region’s varied environments and lighting conditions allow photographers to explore multiple styles and narratives in one trip.
        </>
      )
    },
    {
      question: "Is Jawai suitable for beginner photographers?",
      answer: (
        <>
          Yes. Jawai’s open terrain and natural light make it accessible for both beginners and experienced photographers. Beginners can practice composition and lighting without the constraints often found in denser safari areas.
        </>
      )
    },
    {
      question: "Which season is best for Jawai photography?",
      answer: (
        <>
          October to April offers the best balance of light, wildlife movement, and landscape clarity. For more details on timing, check our <Link to="/jawai-guide/best-time-to-visit-jawai" className="text-green-700 hover:underline">Best Time to Visit Jawai</Link> guide.
        </>
      )
    },
    {
      question: "Can Jawai photography focus beyond wildlife?",
      answer: (
        <>
          Absolutely. Village life, landscapes, and natural light transitions are major photographic subjects. Exploring cultural elements alongside nature enriches the storytelling aspect of your photography.
        </>
      )
    },
    {
      question: "Are leopards easy to photograph in Jawai?",
      answer: (
        <>
          Leopard sightings are frequent, but photography relies on patience and ethical distance. For those planning a trip, consider our <Link to="/jawai-safari-packages" className="text-green-700 hover:underline">Jawai Safari Packages</Link> which include guided wildlife photography experiences.
        </>
      )
    },
    {
      question: "Does Jawai allow sunrise and sunset photography?",
      answer: (
        <>
          Yes. Sunrise and sunset are among the most visually rewarding times in Jawai. The soft morning and golden evening light enhance textures and colors, perfect for capturing dramatic landscapes.
        </>
      )
    },
    {
      question: "Is Jawai photography suitable for mobile users?",
      answer: (
        <>
          Yes. The region’s open vistas and natural light are ideal even for smartphone photography. With the right timing and composition, mobile users can capture stunning images without professional gear.
        </>
      )
    },
    {
      question: "Can Jawai be combined with safari planning?",
      answer: (
        <>
          Photography experiences are often planned alongside safari and stay itineraries. For budgeting and planning, see our <Link to="/jawai-guide/jawai-safari-cost-breakdown" className="text-green-700 hover:underline">Jawai Safari Cost Breakdown</Link>.
        </>
      )
    },
    {
      question: "How long should a photography trip to Jawai be?",
      answer: (
        <>
          A 2–4 day visit allows enough time to capture diverse landscapes and light conditions. This duration balances exploration and rest, making the most of your photographic opportunities.
        </>
      )
    },
    {
      question: "What professional gear is recommended for Jawai photography?",
      answer: (
        <>
          DSLR or mirrorless cameras with telephoto and wide-angle lenses are ideal for capturing Jawai’s diverse scenes. Tripods, polarizing filters, and remote triggers can enhance stability and creative control.
        </>
      )
    },
    {
      question: "Is smartphone photography effective in Jawai?",
      answer: (
        <>
          Yes. Jawai’s open landscapes and natural lighting conditions make it well-suited for smartphone photography. Using features like HDR and portrait mode can help capture memorable images.
        </>
      )
    },
    {
      question: "What are the ethical considerations for photography in Jawai?",
      answer: (
        <>
          Maintaining respectful distance from wildlife, avoiding disturbance, and adhering to local guidelines ensure ethical photography. Patience and observation are key to capturing authentic moments responsibly.
        </>
      )
    },
    {
      question: "How can photography be combined with safari planning in Jawai?",
      answer: (
        <>
          Many safari packages include guided photography sessions, allowing visitors to balance wildlife viewing with capturing quality images. Planning itineraries with photography in mind optimizes both experiences.
        </>
      )
    }
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      <Helmet>
        <title>Jawai Photography Guide | Best Photo Spots, Landscapes & Light</title>
        <meta
          name="description"
          content="A complete Jawai photography guide covering landscapes, wildlife moments, sunrise & sunset spots, village life, and seasonal light conditions in Jawai, Rajasthan."
        />
        <link
          rel="canonical"
          href="https://www.jawaiunfiltered.com/jawai-guide/jawai-safari-photography-guide"
        />

        {/* ImageObject Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ImageGallery",
            "name": "Jawai Photography Locations",
            "image": images.map((img) => ({
              "@type": "ImageObject",
              "contentUrl": `https://www.jawaiunfiltered.com${img.src}`,
              "caption": img.title,
              "description": img.desc
            }))
          })}
        </script>

        {/* FAQ Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "Why is Jawai considered a great photography destination?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Jawai offers unique granite landscapes, open wildlife movement, dramatic light, and cultural coexistence, making it visually distinct from conventional safari regions."
                }
              },
              {
                "@type": "Question",
                "name": "What types of photography are best in Jawai?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Landscape, wildlife, cultural, sunrise, sunset, and storytelling photography work exceptionally well in Jawai."
                }
              },
              {
                "@type": "Question",
                "name": "Is Jawai suitable for beginner photographers?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes. Jawai’s open terrain and natural light make it accessible for both beginners and experienced photographers."
                }
              },
              {
                "@type": "Question",
                "name": "Which season is best for Jawai photography?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "October to April offers the best balance of light, wildlife movement, and landscape clarity."
                }
              },
              {
                "@type": "Question",
                "name": "Can Jawai photography focus beyond wildlife?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Absolutely. Village life, landscapes, and natural light transitions are major photographic subjects."
                }
              },
              {
                "@type": "Question",
                "name": "Are leopards easy to photograph in Jawai?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Leopard sightings are frequent, but photography relies on patience and ethical distance."
                }
              },
              {
                "@type": "Question",
                "name": "Does Jawai allow sunrise and sunset photography?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes. Sunrise and sunset are among the most visually rewarding times in Jawai."
                }
              },
              {
                "@type": "Question",
                "name": "Is Jawai photography suitable for mobile users?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes. The region’s open vistas and natural light are ideal even for smartphone photography."
                }
              },
              {
                "@type": "Question",
                "name": "Can Jawai be combined with safari planning?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Photography experiences are often planned alongside safari and stay itineraries."
                }
              },
              {
                "@type": "Question",
                "name": "How long should a photography trip to Jawai be?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A 2–4 day visit allows enough time to capture diverse landscapes and light conditions."
                }
              },
              {
                "@type": "Question",
                "name": "What professional gear is recommended for Jawai photography?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "DSLR or mirrorless cameras with telephoto and wide-angle lenses are ideal for capturing Jawai’s diverse scenes."
                }
              },
              {
                "@type": "Question",
                "name": "Is smartphone photography effective in Jawai?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Jawai’s open landscapes and natural lighting conditions make it well-suited for smartphone photography."
                }
              },
              {
                "@type": "Question",
                "name": "What are the ethical considerations for photography in Jawai?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Maintaining respectful distance from wildlife, avoiding disturbance, and adhering to local guidelines ensure ethical photography."
                }
              },
              {
                "@type": "Question",
                "name": "How can photography be combined with safari planning in Jawai?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Many safari packages include guided photography sessions, allowing visitors to balance wildlife viewing with capturing quality images."
                }
              }
            ]
          })}
        </script>
      </Helmet>

      <main className="max-w-7xl mx-auto px-4 py-12">
        {/* Breadcrumbs */}
        <nav className="text-sm text-gray-500 mb-6">
          <Link to="/" className="hover:underline">Home</Link> ›{" "}
          <Link to="/jawai-guide" className="hover:underline">Jawai Guide</Link> ›{" "}
          <span className="text-gray-700">Jawai Photography</span>
        </nav>

        {/* Hero */}
        <section className="mb-14">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-green-700">
            Jawai Photography Guide: Landscapes, Wildlife & Light
          </h1>
          <p className="text-gray-700 text-lg leading-relaxed max-w-3xl">
            Jawai is a visual narrative of granite hills, roaming wildlife, pastoral
            life, and constantly shifting light. This guide explores Jawai as a
            photography landscape rather than a single-subject destination.
          </p>
        </section>

        {/* At a Glance Highlight Boxes */}
        <section className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
            <div className="flex items-center border border-green-100 bg-green-50 rounded-xl p-4">
              <span className="text-2xl mr-3" aria-hidden="true" role="img">🌅</span>
              <div>
                <div className="font-semibold text-green-700">Best Light</div>
                <div className="text-gray-700 text-sm">Sunrise &amp; Sunset</div>
              </div>
            </div>
            <div className="flex items-center border border-amber-100 bg-amber-50 rounded-xl p-4">
              <span className="text-2xl mr-3" aria-hidden="true" role="img">🎯</span>
              <div>
                <div className="font-semibold text-amber-600">Skill Level</div>
                <div className="text-gray-700 text-sm">Beginner to Pro</div>
              </div>
            </div>
            <div className="flex items-center border border-green-100 bg-green-50 rounded-xl p-4">
              <span className="text-2xl mr-3" aria-hidden="true" role="img">📱</span>
              <div>
                <div className="font-semibold text-green-700">Gear Friendly</div>
                <div className="text-gray-700 text-sm">Mobile to DSLR</div>
              </div>
            </div>
          </div>
        </section>

        {/* Gallery */}
        <section className="mb-20">
          <h2 className="text-2xl font-semibold mb-2 text-green-700">
            Jawai Photography Gallery & Key Locations
          </h2>
          <div className="h-1 w-16 bg-green-600 rounded-full mb-6" aria-hidden="true" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {images.map((img, idx) => (
              <figure
                key={idx}
                className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition relative group"
              >
                <img
                  src={img.src}
                  alt={img.title}
                  className="w-full h-56 object-cover"
                  loading="lazy"
                />
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" aria-hidden="true" />
                <figcaption className="p-4 relative">
                  <h3 className="font-semibold mb-1 transition-opacity opacity-100 group-hover:opacity-100">{img.title}</h3>
                  <p className="text-sm text-gray-600 transition-opacity opacity-100 group-hover:opacity-100">{img.desc}</p>
                  {/* Title overlay on hover (for accessibility, keep also in normal caption) */}
                  <span className="absolute left-0 right-0 bottom-0 px-4 py-2 text-white font-semibold text-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none bg-gradient-to-t from-black/80 to-transparent">{img.title}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* Light & Composition */}
        <section className="mb-16 max-w-4xl mx-auto bg-green-50 rounded-2xl shadow-sm p-6 md:p-8">
          <h2 className="text-2xl font-semibold mb-2 text-green-700">
            Light, Composition & Storytelling in Jawai
          </h2>
          <div className="h-1 w-16 bg-green-600 rounded-full mb-4" aria-hidden="true" />
          <p className="text-gray-700 mb-4 leading-relaxed max-w-3xl">
            Jawai’s light evolves through the day — diffused mornings, dramatic
            afternoons, and warm sunsets. Photographers often focus on layered
            compositions rather than isolated subjects.
          </p>
          <p className="text-gray-700 leading-relaxed max-w-3xl">
            Natural foregrounds, open space, and coexistence between wildlife and
            human settlements create frames that feel authentic and timeless.
          </p>
        </section>

        <section className="mb-20 max-w-5xl mx-auto bg-amber-50 rounded-2xl shadow-sm p-6 md:p-8">
          <h2 className="text-2xl font-semibold mb-2 text-amber-600">
            Jawai Photography for Different Perspectives
          </h2>
          <div className="h-1 w-16 bg-green-600 rounded-full mb-4" aria-hidden="true" />

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-semibold mb-3 text-green-700">
                For Professional &amp; Enthusiast Photographers
              </h3>
              <ul className="list-disc pl-5 space-y-2 text-gray-700 leading-relaxed max-w-3xl">
                <li>Unrestricted granite landscapes allow layered compositions and wide-angle storytelling.</li>
                <li>Leopard sightings often happen in open terrain, ideal for ethical long-lens photography.</li>
                <li>Rare coexistence scenes (wildlife near villages) create once-in-a-lifetime documentary frames.</li>
                <li>Morning and sunset light offers soft gradients, shadow play, and natural contrast.</li>
                <li>Minimal tourism pressure enables patience-based photography rather than rushed captures.</li>
              </ul>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-semibold mb-3 text-amber-600">
                For Travelers &amp; Memory Seekers
              </h3>
              <ul className="list-disc pl-5 space-y-2 text-gray-700 leading-relaxed max-w-3xl">
                <li>Open vistas make smartphone photography easy and forgiving.</li>
                <li>Sunsets, breakfasts, and village walks naturally create memorable photos.</li>
                <li>No dense forests—clear backgrounds improve portraits and group shots.</li>
                <li>Guided experiences help visitors capture moments without technical knowledge.</li>
                <li>Photos focus on emotions, travel memories, and storytelling rather than technical perfection.</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-20 max-w-5xl mx-auto bg-white rounded-2xl shadow-sm p-6 md:p-8">
          <h2 className="text-2xl font-semibold mb-2 text-green-700">
            How Jawai Photography Differs by Intent
          </h2>
          <div className="h-1 w-16 bg-green-600 rounded-full mb-4" aria-hidden="true" />

          {/* Visual Comparison Cards */}
          <div className="flex flex-col md:flex-row gap-6 mb-8">
            <div className="flex-1 bg-gradient-to-br from-green-100 to-green-50 rounded-xl shadow-sm p-6">
              <div className="flex items-center mb-3">
                <span className="text-3xl mr-2" aria-hidden="true" role="img">📷</span>
                <div className="font-semibold text-green-700 text-lg">Professional Photographer Experience</div>
              </div>
              <ul className="list-disc pl-6 text-gray-700 space-y-1 leading-relaxed">
                <li>Focus on light, composition, and rare moments</li>
                <li>DSLR/Mirrorless with long lenses</li>
                <li>Slow, observational, patient approach</li>
                <li>Portfolio-worthy frames</li>
              </ul>
            </div>
            <div className="flex-1 bg-gradient-to-br from-amber-100 to-amber-50 rounded-xl shadow-sm p-6">
              <div className="flex items-center mb-3">
                <span className="text-3xl mr-2" aria-hidden="true" role="img">🌄</span>
                <div className="font-semibold text-amber-600 text-lg">Traveler / Memory Seeker Experience</div>
              </div>
              <ul className="list-disc pl-6 text-gray-700 space-y-1 leading-relaxed">
                <li>Memories, people, scenery</li>
                <li>Smartphones &amp; compact cameras</li>
                <li>Relaxed, guided, intuitive</li>
                <li>Personal memories &amp; travel stories</li>
              </ul>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300 text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border px-4 py-2 text-left">Aspect</th>
                  <th className="border px-4 py-2 text-left">Photographers</th>
                  <th className="border px-4 py-2 text-left">Travelers</th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                <tr>
                  <td className="border px-4 py-2">Focus</td>
                  <td className="border px-4 py-2">Light, composition, rare moments</td>
                  <td className="border px-4 py-2">Memories, people, scenery</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">Gear</td>
                  <td className="border px-4 py-2">DSLR / Mirrorless / Long lenses</td>
                  <td className="border px-4 py-2">Smartphones &amp; compact cameras</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">Experience</td>
                  <td className="border px-4 py-2">Slow, patient, observational</td>
                  <td className="border px-4 py-2">Relaxed, guided, intuitive</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">Outcome</td>
                  <td className="border px-4 py-2">Portfolio-worthy frames</td>
                  <td className="border px-4 py-2">Personal memories &amp; travel stories</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="mb-20 max-w-4xl mx-auto bg-green-50 rounded-2xl shadow-sm p-6 md:p-8">
          <h2 className="text-2xl font-semibold mb-2 text-green-700">
            Growing Interest in Jawai Photography
          </h2>
          <div className="h-1 w-16 bg-green-600 rounded-full mb-4" aria-hidden="true" />
          <p className="text-gray-700 mb-3 leading-relaxed max-w-3xl">
            Over recent years, Jawai has seen a steady rise in visiting photographers due to
            increased awareness of ethical wildlife viewing, open landscapes, and natural light conditions.
          </p>
          <p className="text-gray-700 leading-relaxed max-w-3xl">
            The region now attracts a mix of professional photographers, travel creators, and
            everyday visitors—each finding value through different visual experiences.
          </p>
          {/* Graph-style visual */}
          <div className="mt-8 mb-2">
            <div className="text-sm text-gray-700 font-semibold mb-2">Photography Visitors (Past Years)</div>
            <div className="space-y-2">
              <div className="flex items-center">
                <div className="w-2/5 bg-green-700 h-4 rounded-l-full" style={{maxWidth: "40%"}} />
                <span className="ml-2 text-gray-600 text-xs">Year 1</span>
              </div>
              <div className="flex items-center">
                <div className="w-2/3 bg-green-700 h-4 rounded-l-full" style={{maxWidth: "65%"}} />
                <span className="ml-2 text-gray-600 text-xs">Year 2</span>
              </div>
              <div className="flex items-center">
                <div className="w-5/6 bg-green-700 h-4 rounded-l-full" style={{maxWidth: "85%"}} />
                <span className="ml-2 text-gray-600 text-xs">Year 3</span>
              </div>
            </div>
            <div className="text-xs text-gray-500 mt-1">Indicative trend (observational, non-statistical)</div>
          </div>
        </section>

        {/* Interlinks */}
        <section className="bg-green-50 p-6 rounded-lg mb-20">
          <h2 className="text-xl font-semibold mb-3">
            Related Jawai Guides & Planning Resources
          </h2>
          <ul className="space-y-2 text-green-800">
            <li>
              <Link to="/jawai-guide/leopard-safari-guide" className="hover:underline">
                Leopard Safari & Wildlife Guide
              </Link>
            </li>
            <li>
              <Link to="/jawai-guide/best-time-to-visit-jawai" className="hover:underline">
                Best Time to Visit Jawai
              </Link>
            </li>
            <li>
              <Link to="/jawai-safari-packages" className="hover:underline">
                Jawai Safari Packages
              </Link>
            </li>
            <li>
              <Link to="/jawai-guide/jawai-safari-cost-breakdown" className="hover:underline">
                Jawai Safari Cost Breakdown
              </Link>
            </li>
          </ul>
        </section>

        {/* FAQ Section */}
        <section className="mb-20 max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold mb-2 text-green-700">Frequently Asked Questions</h2>
          <div className="h-1 w-16 bg-green-600 rounded-full mb-6" aria-hidden="true" />
          <div className="space-y-6">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-white shadow-sm border border-gray-200 rounded-lg">
                <button
                  onClick={() => toggleFAQ(idx)}
                  className="w-full text-left px-4 py-3 focus:outline-none flex justify-between items-center"
                  aria-expanded={openIndex === idx}
                  aria-controls={`faq-panel-${idx}`}
                >
                  <h3 className="text-lg font-medium">{faq.question}</h3>
                  <span className="ml-2 text-green-700 font-bold text-xl">
                    {openIndex === idx ? "−" : "+"}
                  </span>
                </button>
                {openIndex === idx && (
                  <div
                    id={`faq-panel-${idx}`}
                    className="px-4 pb-4 text-gray-700 leading-relaxed max-w-3xl"
                    role="region"
                    aria-labelledby={`faq-header-${idx}`}
                  >
                    <p className="mt-2">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* EEAT */}
        <section className="text-sm text-gray-500 max-w-3xl mx-auto leading-relaxed">
          <p>
            This guide is based on field observation, seasonal landscape study,
            and on-ground photographic exploration across Jawai’s terrain.
          </p>
          <p className="mt-2">Last updated: January 2026</p>
        </section>
      </main>
    </>
  );
}
