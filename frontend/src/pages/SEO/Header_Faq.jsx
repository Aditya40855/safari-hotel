import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';

const faqData = [
  // --- LEOPARD SAFARI QUESTIONS ---
  {
    question: "What is the best time for a Leopard Safari in Jawai?",
    answer: "The ideal time is from September to May. During these months, the weather is pleasant, and leopards are frequently spotted sunbathing on the granite rocks."
  },
  {
    question: "What are the chances of spotting a leopard in Jawai?",
    answer: "Jawai has one of the highest leopard densities in the world. While sightings are never guaranteed in the wild, our expert trackers maintain a 90% success rate."
  },
  {
    question: "Are there morning and evening safaris?",
    answer: "Yes, we offer two slots: Morning (around 6:00 AM) and Evening (around 4:00 PM). Timings vary slightly depending on the season."
  },
  {
    question: "How long does a typical safari last?",
    answer: "A standard safari usually lasts between 3 to 4 hours, including tracking time and a break for tea/coffee in the wilderness."
  },
  {
    question: "Is it safe to go on an open-top 4x4 safari?",
    answer: "Absolutely. Our vehicles are specially designed for safety, and our drivers are trained professionals who respect the animal's space."
  },
  // --- BOOKING & LOGISTICS ---
  {
    question: "How do I reach Jawai?",
    answer: "Jawai is best reached via Mori Bera railway station (15 mins away) or by road from Udaipur (3 hours) or Jodhpur (3 hours)."
  },
  {
    question: "Do you offer pickup and drop services?",
    answer: "Yes, we provide transfers from nearby railway stations and airports. Please mention your requirements during booking."
  },
  {
    question: "What should I wear on a safari?",
    answer: "We recommend neutral colors (khaki, olive, brown). Bring a warm jacket for morning safaris and a hat/sunglasses for the afternoon."
  },
  {
    question: "Can I book a private safari vehicle?",
    answer: "Yes, private safaris are available for families or photographers who want a more personalized experience."
  },
  {
    question: "Is a safari suitable for elderly people?",
    answer: "Yes, however, the terrain is bumpy. We choose smoother tracks for senior citizens to ensure a comfortable experience."
  },
  // --- ACCOMMODATION & AMENITIES ---
  {
    question: "Are meals included in the hotel packages?",
    answer: "Most of our packages are all-inclusive (Breakfast, Lunch, and Dinner) featuring authentic Rajasthani cuisine."
  },
  {
    question: "Is there Wi-Fi available at the resort?",
    answer: "Yes, we offer complimentary Wi-Fi in the common areas and rooms, though speeds may vary due to the remote hilly terrain."
  },
  {
    question: "Do the rooms have air conditioning?",
    answer: "Yes, all our luxury tents and rooms are fully air-conditioned for your comfort."
  },
  {
    question: "Is there a swimming pool?",
    answer: "Yes, our resort features an infinity pool overlooking the Jawai hills."
  },
  {
    question: "Can you accommodate dietary restrictions?",
    answer: "Certainly. Please inform us of any allergies or dietary needs (Vegan, Gluten-free, etc.) at the time of booking."
  },
  // --- WILDLIFE & NATURE ---
  {
    question: "What animals can I see besides leopards?",
    answer: "You can spot crocodiles, hyenas, sloth bears, migratory birds, and the famous Jawai flamingos during winter."
  },
  {
    question: "Is Jawai a National Park?",
    answer: "No, it is a community reserve where humans and leopards co-exist peacefully. There are no fences here."
  },
  {
    question: "Is photography allowed during the safari?",
    answer: "Yes, photography is encouraged. We also offer specialized photography safaris with bean bags for camera stability."
  },
  {
    question: "What is the 'Jawai Dam' famous for?",
    answer: "The Jawai Dam is the largest in Western Rajasthan and is a hub for crocodiles and winter migratory birds."
  },
  {
    question: "Do you offer walking tours?",
    answer: "Yes, we organize guided nature walks and village tours to experience the local Rabari tribe culture."
  }
];

const FAQPage = () => {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <Helmet>
        <title>Frequently Asked Questions | Jawai Leopard Safari & Stays</title>
        <meta name="description" content="Find answers to common questions about Jawai leopard safaris, hotel bookings, travel logistics, and wildlife sightings." />
      </Helmet>

      <div className="max-w-3xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
            Planning Your <span className="text-orange-600">Jawai Adventure?</span>
          </h1>
          <p className="text-lg text-gray-600">
            Everything you need to know about safaris, stays, and the wild leopards of Rajasthan.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4" itemScope itemType="https://schema.org/FAQPage">
          {faqData.map((item, index) => (
            <div 
              key={index} 
              className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-200 hover:shadow-md"
              itemProp="mainEntity" itemScope itemType="https://schema.org/Question"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-5 text-left focus:outline-none"
              >
                <span className="text-lg font-semibold text-gray-800 pr-8" itemProp="name">
                  {item.question}
                </span>
                <span className={`transform transition-transform duration-200 text-orange-600 font-bold text-2xl ${openIndex === index ? 'rotate-45' : 'rotate-0'}`}>
                  +
                </span>
              </button>

              <div 
                className={`transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}
                itemProp="acceptedAnswer" itemScope itemType="https://schema.org/Answer"
              >
                <div className="p-5 pt-0 text-gray-600 leading-relaxed border-t border-gray-50" itemProp="text">
                  {item.answer}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action Section */}
        <div className="mt-16 bg-orange-600 rounded-3xl p-8 text-center text-white shadow-xl">
          <h2 className="text-2xl font-bold mb-2">Still have questions?</h2>
          <p className="mb-6 opacity-90">Our safari experts are available 24/7 to help you plan your trip.</p>
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