import React, { useState } from 'react';
import { ShieldCheck, FileText, RefreshCcw, Truck, Mail } from 'lucide-react';

const LegalPages = () => {
  const [activeTab, setActiveTab] = useState('terms');

  const policies = {
    terms: {
      title: "Terms & Conditions",
      icon: <FileText size={20} />,
      content: `
Welcome to Jawai Unfiltered, a Rajasthan-based experiential travel brand offering ethical wildlife safaris, nature stays, and curated desert experiences around Jawai Bandh.

By booking with us, you agree to the following terms:

1. Wildlife Sightings:
   Jawai Unfiltered works with experienced local trackers and forest-authorized guides. However, wildlife sightings (including leopards) are natural occurrences and cannot be guaranteed.

2. Responsible Conduct:
   All guests must strictly follow Forest Department regulations. Any off-roading, loud disturbances, feeding wildlife, or unsafe behavior may result in immediate termination of the safari without refund.

3. Identity Verification:
   Valid government-issued identification (Aadhar Card, Passport, or equivalent) is mandatory for safari permits and hotel check-ins.

4. Liability Disclaimer:
   Jawai Unfiltered is not responsible for personal injury, loss, or damage caused by natural events, wildlife behavior, weather conditions, or third-party transport services.

5. Certifications & Ethics:
   Jawai Unfiltered operates under responsible tourism principles and holds MSCE certification, reflecting our commitment to ethical tourism practices, sustainability, and guest safety.

6. Governing Law:
   These terms are governed by and construed in accordance with the laws of India.
      `
    },
    privacy: {
      title: "Privacy Policy",
      icon: <ShieldCheck size={20} />,
      content: `
At Jawai Unfiltered, your privacy and data security are taken seriously.

We collect and process the following information:

1. Booking Information:
   Name, contact number, email address, and government ID details are collected solely for safari permits, hotel reservations, and regulatory compliance.

2. Payment Information:
   All payments are processed securely via Razorpay. Jawai Unfiltered does not store or process your card or banking details.

3. Data Usage & Sharing:
   Your information is shared only with essential partners such as forest authorities, hotels, or service providers required to fulfill your booking.

4. Data Retention:
   Personal data is retained only for as long as necessary to fulfill booking obligations and comply with legal requirements.

5. Your Rights:
   You may request access, correction, or deletion of your personal data by contacting us at info@jawaiunfiltered.com.

Last updated: January 2026
      `
    },
    refund: {
      title: "Cancellation & Refund",
      icon: <RefreshCcw size={20} />,
      content: `
Our cancellation and refund policy is designed to be fair and transparent:

1. 30+ Days Before Travel:
   90% refund (10% administrative and processing fee).

2. 15–29 Days Before Travel:
   50% refund.

3. 7–14 Days Before Travel:
   25% refund.

4. Less Than 7 Days:
   No refund applicable.

Important Notes:
• Government permit fees are non-refundable in all cases.
• Refunds are processed within 7–10 business days to the original payment method.
• Date changes are subject to availability and forest department approval.

Last updated: January 2026
      `
    },
    shipping: {
      title: "Shipping & Delivery",
      icon: <Truck size={20} />,
      content: `
Jawai Unfiltered provides service-based travel experiences and does not ship physical products.

Digital Delivery:
• Safari permits, hotel vouchers, and booking confirmations are delivered digitally via Email and WhatsApp.
• Delivery typically occurs within 24 hours of successful payment.

For any assistance related to booking delivery or documentation, please contact:
info@jawaiunfiltered.com

Last updated: January 2026
      `
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 text-gray-800">
      <h1 className="text-3xl font-bold mb-8 text-center text-orange-600">Legal & Policies</h1>
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {Object.keys(policies).map((key) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all ${
              activeTab === key ? 'bg-orange-600 text-white shadow-lg' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {policies[key].icon} {policies[key].title}
          </button>
        ))}
      </div>
      <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm">
        <h2 className="text-2xl font-bold mb-4">{policies[activeTab].title}</h2>
        <div className="whitespace-pre-line leading-relaxed text-gray-600">
          {policies[activeTab].content}
        </div>
      </div>
    </div>
  );
};

export default LegalPages;