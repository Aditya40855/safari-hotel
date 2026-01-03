import React, { useState } from 'react';
import { ShieldCheck, FileText, RefreshCcw, Truck, Mail } from 'lucide-react';

const LegalPages = () => {
  const [activeTab, setActiveTab] = useState('terms');

  const policies = {
    terms: {
      title: "Terms & Conditions",
      icon: <FileText size={20} />,
      content: `
        Welcome to Jawai Unfiltered. By booking with us, you agree to:
        1. Wildlife Sightings: While we use expert trackers, leopard sightings are natural events and cannot be 100% guaranteed.
        2. Conduct: Guests must follow all forest department guidelines. Off-roading or disturbing wildlife is strictly prohibited.
        3. Identity: All guests must carry valid government ID (Aadhar/Passport) for park entry.
        4. Liability: Jawai Unfiltered is not liable for personal injury or loss of property due to natural factors or third-party transport.
      `
    },
    privacy: {
      title: "Privacy Policy",
      icon: <ShieldCheck size={20} />,
      content: `
        Your privacy is our priority. We collect:
        1. Booking Data: Name, contact, and ID details required for safari permits.
        2. Payment Info: We use Razorpay; your card details are never stored on our servers.
        3. Usage: Data is shared only with necessary partners like the Forest Department or hotels for your stay.
      `
    },
    refund: {
      title: "Cancellation & Refund",
      icon: <RefreshCcw size={20} />,
      content: `
        Our safari cancellation policy is tiered:
        1. 30+ Days Before: 90% refund (10% administrative fee).
        2. 15-29 Days Before: 50% refund.
        3. 7-14 Days Before: 25% refund.
        4. Less than 7 Days: No refund.
        Note: Government permit fees are non-refundable in all cases. Refunds are processed within 7-10 business days.
      `
    },
    shipping: {
      title: "Shipping & Delivery",
      icon: <Truck size={20} />,
      content: `
        As a service-based business, we do not ship physical products. 
        Booking Confirmation: Your digital safari permit and hotel vouchers will be delivered via Email/WhatsApp within 24 hours of successful payment.
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