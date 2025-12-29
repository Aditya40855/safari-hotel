import React, { useState, useEffect } from 'react';
import { Phone, MessageCircle, Mail, X, Headphones, Send, Clock } from 'lucide-react';

const ContactHub = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  // Show a welcome tooltip after 5 seconds to encourage interaction
  useEffect(() => {
    const timer = setTimeout(() => setShowTooltip(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  const contactMethods = [
    { 
      title: "WhatsApp", 
      desc: "Fastest response", 
      icon: <MessageCircle size={24} />, 
      color: "bg-[#25D366]", 
      link: "https://wa.me/919351411559?text=I'm%20interested%20in%20booking%20a%20Safari" 
    },
    { 
      title: "Quick Call", 
      desc: "Talk to an expert", 
      icon: <Phone size={24} />, 
      color: "bg-orange-600", 
      link: "tel:+919351411559" 
    },
    { 
      title: "Email", 
      desc: "For group bookings", 
      icon: <Mail size={24} />, 
      color: "bg-gray-800", 
      link: "mailto:info@safarihotels.com" 
    }
  ];

  return (
    <div className="fixed bottom-6 right-6 z-[10000] flex flex-col items-end pointer-events-none">

      {/* 2. Interactive Menu List */}
      <div className={`flex flex-col gap-4 mb-4 pointer-events-auto transition-all duration-500 ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}>
        {contactMethods.map((item, i) => (
          <a key={i} href={item.link} className="flex items-center gap-4 group">
            <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl shadow-lg border border-gray-100 opacity-0 group-hover:opacity-100 transition-opacity">
              <p className="text-sm font-bold text-gray-900 leading-none">{item.title}</p>
              <p className="text-[10px] text-gray-500">{item.desc}</p>
            </div>
            <div className={`${item.color} text-white p-4 rounded-2xl shadow-xl hover:scale-110 active:scale-95 transition-all transform hover:-rotate-6`}>
              {item.icon}
            </div>
          </a>
        ))}
      </div>

      {/* 3. The Core Floating Action Button (Bathing Theme) */}
      <button
        onClick={() => { setIsOpen(!isOpen); setShowTooltip(false); }}
        className={`pointer-events-auto p-5 rounded-[2.2rem] shadow-[0_20px_50px_rgba(0,0,0,0.2)] transition-all duration-500 flex items-center justify-center 
          ${isOpen ? 'bg-gray-900 rotate-90' : 'bg-orange-600 hover:bg-orange-700 hover:shadow-orange-500/40'}
        `}
      >
        {isOpen ? <X size={32} className="text-white" /> : <Headphones size={32} className="text-white animate-pulse" />}
      </button>
    </div>
  );
};

export default ContactHub;