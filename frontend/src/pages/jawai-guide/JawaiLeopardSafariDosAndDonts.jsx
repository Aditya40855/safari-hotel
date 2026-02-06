import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import {
  FaCheckCircle,
  FaTimesCircle,
  FaInfoCircle,
  FaPrint,
  FaCamera,
  FaCarSide,
  FaUsers
} from "react-icons/fa";

export default function JawaiLeopardSafariDosAndDonts() {
  return (
    <main className="max-w-5xl mx-auto px-4 py-10">
      <Helmet>
        {/* BreadcrumbList Schema for SEO */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://www.jawaiunfiltered.com/"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Jawai Guide",
                "item": "https://www.jawaiunfiltered.com/jawai-guide"
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": "Jawai Leopard Safari Do’s & Don’ts",
                "item": "https://www.jawaiunfiltered.com/jawai-guide/jawai-leopard-safari-dos-and-donts"
              }
            ]
          })}
        </script>
        <title>Jawai Leopard Safari Do’s & Don’ts | Official Visitor Guide</title>
        <meta
          name="description"
          content="Official Jawai Leopard Safari Do’s & Don’ts guide. Learn what to follow, what to avoid, safety rules, family guidelines, photography tips, and ethical practices for a safe safari."
        />
        <link
          rel="canonical"
          href="https://www.jawaiunfiltered.com/jawai-guide/jawai-leopard-safari-dos-and-donts"
        />

        {/* Article Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "Jawai Leopard Safari Do’s & Don’ts",
            "description":
              "A practical visitor guide explaining Jawai Leopard Safari do’s and don’ts, safety rules, family guidelines, and ethical practices.",
            "author": {
              "@type": "Organization",
              "name": "Jawai Unfiltered"
            },
            "datePublished": "2026-02-02",
            "dateModified": "2026-02-02"
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
                "name": "Can visitors step out of the safari vehicle in Jawai?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text":
                    "No. Stepping out of the safari vehicle is strictly prohibited at all times for safety reasons."
                }
              },
              {
                "@type": "Question",
                "name": "Is Jawai Leopard Safari safe for families and children?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text":
                    "Yes. Jawai Leopard Safari is safe for families when children are supervised and safari rules are followed."
                }
              },
              {
                "@type": "Question",
                "name": "Are drones allowed during Jawai safari?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text":
                    "Drones are not allowed unless specifically permitted in designated zones by local authorities."
                }
              }
            ]
          })}
        </script>
      </Helmet>

      {/* Hero */}
      <section className="mb-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-3">
              Jawai Leopard Safari Do’s & Don’ts
            </h1>
            <span className="inline-block bg-gray-100 text-gray-500 text-xs px-3 py-1 rounded-full mb-2">
              Last updated: 2 Feb 2026 &middot; On-ground verified rules
            </span>
          </div>
        </div>
        <p className="text-gray-700 text-lg">
          A practical, official-style visitor guide explaining what to follow
          and what to avoid for a safe, respectful, and memorable Jawai Leopard
          Safari experience.
        </p>
        <p className="mt-2 text-sm text-gray-500">
          Based on on-ground safari practices followed by local trackers and
          community-managed safari operators in Jawai.
        </p>
      </section>

      {/* Quick Rules Feature Snippet */}
      <section className="mb-8">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-5 shadow-sm">
          <h2 className="text-lg font-semibold mb-3 flex items-center text-yellow-800">
            <FaInfoCircle className="mr-2 text-yellow-600" />
            Quick Jawai Safari Rules (1‑Minute Read)
          </h2>
          <ul className="list-disc list-inside text-sm text-gray-800 space-y-1 pl-1">
            <li>Always remain inside the safari vehicle; stepping out is <b>not allowed</b>.</li>
            <li>Follow your guide’s instructions and maintain silence near wildlife.</li>
            <li>No feeding, chasing, or approaching leopards and other animals.</li>
            <li>Photography is permitted, but <b>no flash or drones</b> (unless authorized).</li>
            <li>Maximum 6 guests per vehicle; no standing or sitting on the roof.</li>
            <li>Respect villagers, livestock, and all local community rules.</li>
          </ul>
          <div className="mt-3">
            <a href="#full-rules" className="text-blue-700 underline text-sm">
              Read full official rules below &darr;
            </a>
          </div>
        </div>
      </section>

      {/* Allowed / Not Allowed Table */}
      <section className="mb-12">
        <div className="overflow-x-auto max-w-full">
          <table className="min-w-[300px] w-full border border-gray-200 text-sm bg-white rounded shadow-sm">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-2 border-b border-gray-200 text-green-700 font-semibold">
                  Allowed
                </th>
                <th className="px-4 py-2 border-b border-gray-200 text-red-700 font-semibold">
                  Not Allowed
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-4 py-2 border-b border-gray-100">
                  Following guide instructions
                </td>
                <td className="px-4 py-2 border-b border-gray-100">
                  Stepping out of the vehicle
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 border-b border-gray-100">
                  Silent, non-flash photography
                </td>
                <td className="px-4 py-2 border-b border-gray-100">
                  Flash, drone, or loud music
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 border-b border-gray-100">
                  Respecting villagers & livestock
                </td>
                <td className="px-4 py-2 border-b border-gray-100">
                  Feeding or approaching wildlife
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 border-b border-gray-100">
                  Up to 6 guests per vehicle
                </td>
                <td className="px-4 py-2 border-b border-gray-100">
                  Overcrowding or sitting on roof
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2">
                  Informing guides of health issues
                </td>
                <td className="px-4 py-2">
                  Littering or plastic waste
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Quick Snapshot */}
      <section className="grid md:grid-cols-2 gap-6 mb-12">
        <div className="border rounded-xl p-5 bg-green-50">
          <h2 className="font-semibold text-lg mb-3 text-green-700">✔ Do These</h2>
          <ul className="space-y-2 text-sm">
            <li>Follow guide instructions at all times</li>
            <li>Maintain silence during sightings</li>
            <li>Keep hands and cameras inside the vehicle</li>
            <li>Respect local communities and livestock</li>
            <li>Inform guides about health concerns</li>
          </ul>
        </div>
        <div className="border rounded-xl p-5 bg-red-50">
          <h2 className="font-semibold text-lg mb-3 text-red-700">✖ Avoid These</h2>
          <ul className="space-y-2 text-sm">
            <li>Do not step out of the safari vehicle</li>
            <li>No loud talking, music, or shouting</li>
            <li>No feeding or approaching wildlife</li>
            <li>No littering or plastic waste</li>
            <li>No overcrowding of vehicles</li>
          </ul>
        </div>
      </section>

      {/* Sections */}
      <section className="space-y-10" id="full-rules">
        <div>
          <h2 className="text-2xl font-semibold mb-3 flex items-center">
            <FaCheckCircle className="mr-2 text-green-600" />
            Do’s & Don’ts During Jawai Safari
          </h2>
          <p className="text-gray-700">
            Jawai safaris operate in open, community-managed landscapes. Following
            basic conduct rules ensures safety for visitors, wildlife, and
            villagers.
          </p>
          <p className="mt-2 text-sm">
            Learn more in the{" "}
            <Link
              to="/jawai-guide/travel-awareness/jawai-safari-safety"
              className="text-blue-600 underline"
            >
              Jawai Safari Safety Guide
            </Link>.
          </p>
          <p className="mt-4 text-gray-700">
            These rules exist because Jawai is not a fenced national park but a shared space where leopards roam freely among villages and livestock. Unlike traditional reserves, the landscape is open and community-managed, requiring visitors to respect the delicate balance between humans and wildlife. Adhering to guidelines such as remaining inside the vehicle and maintaining silence helps minimize disturbance to the leopards, allowing them to behave naturally without feeling threatened.
          </p>
          <p className="mt-2 text-gray-700">
            The behavior of leopards in Jawai is highly sensitive to human presence. Sudden movements, loud noises, or stepping out of vehicles can cause stress or provoke defensive reactions. By following the do’s and don’ts, visitors contribute to a safe environment that supports peaceful coexistence and enhances the chances of observing these elusive animals in their natural habitat.
          </p>
          <p className="mt-2 text-gray-700">
            Additionally, the safety of visitors depends on respecting these rules. Leopards are wild predators, and any breach of protocol can lead to dangerous encounters. The community’s collective effort to enforce these guidelines has resulted in a safe safari experience for all.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-3 flex items-center">
            <FaInfoCircle className="mr-2 text-gray-600" />
            Hotel & Stay Area Do’s & Don’ts
          </h2>
          <p className="text-gray-700">
            Safari responsibility continues at lodges and village stays. Avoid
            noise at night, respect staff instructions, and keep the natural
            environment undisturbed.
          </p>
          <p className="mt-4 text-gray-700">
            Maintaining silence during the night is crucial because many wildlife species, including leopards, are nocturnal and use the cover of darkness to move and hunt. Loud noises can disrupt their natural behavior and cause unnecessary stress. Moreover, many lodges and camps are located close to wildlife corridors where animals frequently pass, so respectful behavior helps preserve these essential pathways.
          </p>
          <p className="mt-2 text-gray-700">
            The coexistence model in Jawai relies heavily on the relationship between visitors, local communities, and wildlife. Lodges act as gateways to this experience and must foster an environment that supports conservation efforts. Following staff instructions and minimizing disturbances helps protect both the guests and the sensitive ecosystem surrounding the accommodations.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-3 flex items-center">
            <FaUsers className="mr-2 text-blue-700" />
            Family & Children Guidelines
          </h2>
          <p className="text-gray-700">
            Children are welcome on Jawai safaris with adult supervision.
            Parents should ensure children remain seated and calm throughout
            the safari.
          </p>
          <p className="mt-2 text-sm">
            Planning with family?{" "}
            <Link
              to="/jawai-guide/jawai-safari-cost-for-2-4-families"
              className="text-blue-600 underline"
            >
              Jawai Safari Cost for Families
            </Link>
          </p>
          <p className="mt-4 text-gray-700">
            The terrain in Jawai can be rugged with bumpy tracks and uneven surfaces, which may be challenging for young children. Safari rides often last several hours, requiring patience and the ability to remain seated for extended periods. Families should consider these factors when planning to ensure a comfortable and safe experience for all members.
          </p>
          <p className="mt-2 text-gray-700">
            Supervision is critical because sudden movements or loud noises from children can startle wildlife and disrupt the safari. Adults must guide children to respect the environment and follow the rules, ensuring safety for the entire group and enhancing the quality of the wildlife encounter.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-3 flex items-center">
            <FaCamera className="mr-2 text-purple-700" />
            Photography Do’s & Don’ts
          </h2>
          <p className="text-gray-700">
            Photography is allowed with silent shutters. Flash photography and
            unauthorized drones are not permitted.
          </p>
          <p className="mt-2 text-sm">
            Read the full{" "}
            <Link
              to="/jawai-guide/jawai-safari-photography-guide"
              className="text-blue-600 underline"
            >
              Jawai Photography Guide
            </Link>.
          </p>
          <p className="mt-4 text-gray-700">
            Wildlife can be easily stressed by bright flashes and sudden noises from cameras. Flash photography can cause animals to become disoriented or frightened, which may alter their natural behavior or cause them to flee the area. Using silent shutter modes and avoiding flash helps minimize disturbance and allows for more authentic wildlife observations.
          </p>
          <p className="mt-2 text-gray-700">
            Drone usage is strictly regulated because drones can intrude on wildlife habitats, causing stress and potential harm. Only authorized drone operations in designated zones are permitted to ensure the safety of both animals and visitors. Ethical wildlife photography practices prioritize the welfare of animals and the preservation of their environment over getting the perfect shot.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-3 flex items-center">
            <FaCarSide className="mr-2 text-orange-600" />
            Vehicle & Seating Rules
          </h2>
          <p className="text-gray-700">
            A maximum of six guests are allowed per safari vehicle. Standing,
            leaning out, or sitting on the roof is strictly prohibited.
          </p>
          <p className="mt-2 text-sm">
            Understand terrain limitations in{" "}
            <Link
              to="/jawai-guide/jawai-safari-routes"
              className="text-blue-600 underline"
            >
              Jawai Safari Routes Explained
            </Link>.
          </p>
          <p className="mt-4 text-gray-700">
            The six-person limit per vehicle is designed to maintain balance and safety on the often rocky and uneven terrain of Jawai. Overloading vehicles or unsafe seating positions like standing or sitting on the roof increase the risk of accidents such as tipping or falls. These rules are based on past safety learnings and aim to protect all passengers.
          </p>
          <p className="mt-2 text-gray-700">
            Navigating the rugged landscape requires stable and secure seating for everyone. Following seating rules ensures that vehicles can move safely without compromising passenger safety or disturbing the wildlife. This careful approach helps maintain the integrity of the safari experience.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-3 flex items-center">
            <FaInfoCircle className="mr-2 text-green-700" />
            Ethical & Community Guidelines
          </h2>
          <p className="text-gray-700">
            Jawai is a coexistence-based landscape. Visitors must respect
            villagers, avoid trespassing, and never disturb livestock or daily
            routines.
          </p>
          <p className="mt-4 text-gray-700">
            The landscape of Jawai is community-managed, where villagers live alongside wildlife and actively participate in conservation efforts. Respecting their land, customs, and livestock is essential to maintaining this unique model of coexistence. Trespassing or disruptive behavior can damage trust and negatively impact both the community and the environment.
          </p>
          <p className="mt-2 text-gray-700">
            Livestock are a vital part of the local economy and culture, and disturbing them can lead to conflicts between humans and wildlife. By following ethical guidelines, visitors contribute to the long-term conservation of the area, supporting sustainable tourism that benefits both people and nature.
          </p>
        </div>
      </section>

      {/* Safety Callout */}
      <div className="mt-12 p-5 border-l-4 border-green-600 bg-green-50 rounded">
        <p className="font-medium flex items-center">
          <FaCheckCircle className="mr-2 text-green-600" />
          Safety First:
        </p>
        <p className="text-sm mt-1">
          Jawai has maintained a strong safety record because visitors and guides
          strictly follow these do’s and don’ts.
        </p>
      </div>

      {/* New subsection after Safety Callout */}
      <section className="mt-8 p-5 border-l-4 border-blue-600 bg-blue-50 rounded">
        <h2 className="text-xl font-semibold mb-3 text-blue-700 flex items-center">
          <FaInfoCircle className="mr-2 text-blue-700" />
          Why These Rules Matter in Jawai
        </h2>
        <p className="text-gray-700 text-sm">
          Jawai’s zero-incident safety record is a testament to the effectiveness of strict adherence to these rules. The community-managed approach depends on mutual respect and discipline, which allows leopards and humans to coexist peacefully. By following these guidelines, visitors help maintain this delicate balance, ensuring that safaris remain safe, ethical, and rewarding for everyone involved.
        </p>
      </section>

      {/* Concluding section */}
      <section className="mt-12">
        <h2 className="text-2xl font-semibold mb-4 flex items-center">
          <FaCheckCircle className="mr-2 text-green-600" />
          Following the Rules Creates Better Safari Experiences
        </h2>
        <p className="text-gray-700">
          Complying with the do’s and don’ts not only safeguards your safety but also enriches your wildlife encounter. Respectful behavior minimizes disturbance to animals, improves sighting opportunities, and supports the conservation ethos of Jawai. Ultimately, these rules foster a deeper connection with the environment and ensure that future generations can enjoy the wonder of Jawai Leopard Safari.
        </p>
        <p className="mt-4 text-sm text-blue-700">
          Curious about routes? Learn <Link to="/jawai-guide/jawai-safari-routes" className="underline">how Jawai safari routes actually work</Link>.
        </p>
        <div className="mt-6">
          <span className="block text-xs text-gray-500 italic">
            This guide can be printed or shared with your safari group before arrival.
          </span>
        </div>
      </section>

      {/* FAQs */}
      <section className="mt-14">
        <h2 className="text-2xl font-semibold mb-6 flex items-center">
          <FaInfoCircle className="mr-2 text-blue-700" />
          Frequently Asked Questions
        </h2>

        <div className="space-y-4 text-sm">
          <p>
            <strong>Can I get down from the safari vehicle?</strong><br />
            No. Getting down is strictly prohibited.{" "}
            <Link
              to="/jawai-guide/travel-awareness/jawai-safari-safety"
              className="text-blue-600 underline"
            >
              Read safety details
            </Link>.
          </p>

          <p>
            <strong>Are Jawai safaris safe?</strong><br />
            Yes, when rules are followed.{" "}
            <Link
              to="/jawai-guide/price-vs-experience"
              className="text-blue-600 underline"
            >
              Learn how structure impacts safety
            </Link>.
          </p>

          <p>
            <strong>Are children allowed?</strong><br />
            Yes, with supervision.{" "}
            <Link
              to="/jawai-guide/jawai-safari-cost-for-2-4-families"
              className="text-blue-600 underline"
            >
              Family planning guide
            </Link>.
          </p>

          <p>
            <strong>Is drone photography allowed?</strong><br />
            Only in specific zones with permission.
          </p>
        </div>
      </section>
    </main>
  );
}