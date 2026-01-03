import React, { useState } from 'react';
import { 
  PartyPopper, Sparkles, Camera, Music, Utensils, 
  MapPin, Users, Calendar, MessageSquare, ChevronRight, 
  ChevronLeft, Wine, Gift, Flame 
} from 'lucide-react';

const CelebrationConcierge = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    occasions: [],
    vibes: [],
    services: [],
    guestCount: '',
    date: '',
    requirements: ''
  });

  // Toggle multi-select items
  const toggleItem = (category, item) => {
    setFormData(prev => ({
      ...prev,
      [category]: prev[category].includes(item)
        ? prev[category].filter(i => i !== item)
        : [...prev[category], item]
    }));
  };

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

  const startWhatsApp = () => {
    const message = `*New Celebration Inquiry - Jawai Unfiltered*%0A%0A` +
      `*Occasions:* ${formData.occasions.join(', ') || 'N/A'}%0A` +
      `*Vibes:* ${formData.vibes.join(', ') || 'N/A'}%0A` +
      `*Services:* ${formData.services.join(', ') || 'N/A'}%0A` +
      `*Guests:* ${formData.guestCount}%0A` +
      `*Date:* ${formData.date}%0A` +
      `*Our Vision:* ${formData.requirements}%0A%0A` +
      `_Let's plan this together!_`;
    
    window.location.href = `https://wa.me/919351411559?text=${message}`;
  };

  return (
    <div className="max-w-5xl mx-auto my-12 px-4 font-sans">
      <div className="bg-slate-950 rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/5 relative">
        
        {/* PROGRESS BAR */}
        <div className="h-1.5 w-full bg-white/5">
          <div 
            className="h-full bg-orange-600 transition-all duration-500 ease-out" 
            style={{ width: `${(step / 4) * 100}%` }}
          />
        </div>

        <div className="p-8 md:p-16 relative z-10">
          
          {/* STEP 1: MULTI-OCCASION SELECTION */}
          {step === 1 && (
            <div className="animate-in fade-in slide-in-from-right-8 duration-500">
              <span className="text-orange-500 font-bold tracking-[0.2em] text-xs uppercase mb-4 block">Stage 01 — Selection</span>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-8">What are we <br/><span className="text-orange-600">Celebrating?</span></h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                {[
                  { name: 'Birthday', icon: <PartyPopper size={20}/> },
                  { name: 'Anniversary', icon: <Sparkles size={20}/> },
                  { name: 'Proposal', icon: <Wine size={20}/> },
                  { name: 'Family Reunion', icon: <Users size={20}/> },
                  { name: 'Pre-Wedding', icon: <Camera size={20}/> },
                  { name: 'Corporate', icon: <MapPin size={20}/> },
                ].map((item) => (
                  <button
                    key={item.name}
                    onClick={() => toggleItem('occasions', item.name)}
                    className={`p-6 rounded-3xl border-2 transition-all flex flex-col items-center gap-3 text-center ${
                      formData.occasions.includes(item.name) 
                      ? 'bg-orange-600 border-orange-600 text-white shadow-lg shadow-orange-600/20' 
                      : 'bg-white/5 border-white/5 text-gray-400 hover:border-white/20'
                    }`}
                  >
                    {item.icon}
                    <span className="font-bold text-sm">{item.name}</span>
                  </button>
                ))}
              </div>
              <button onClick={nextStep} disabled={formData.occasions.length === 0}
                className="w-full md:w-auto px-10 py-5 bg-white text-black rounded-2xl font-black flex items-center justify-center gap-2 hover:bg-orange-600 hover:text-white transition-all disabled:opacity-50">
                Next Stage <ChevronRight size={20}/>
              </button>
            </div>
          )}

          {/* STEP 2: SERVICES & ADD-ONS */}
          {step === 2 && (
            <div className="animate-in fade-in slide-in-from-right-8 duration-500">
              <span className="text-orange-500 font-bold tracking-[0.2em] text-xs uppercase mb-4 block">Stage 02 — Enhancements</span>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-8">Elevate the <span className="text-orange-600">Experience.</span></h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
                {[
                  { id: 'Dining', label: 'Private Hilltop Bush Dinner', icon: <Flame size={18}/> },
                  { id: 'Music', label: 'Live Rajasthani Folk Musicians', icon: <Music size={18}/> },
                  { id: 'Photo', label: 'Professional Wildlife Photographer', icon: <Camera size={18}/> },
                  { id: 'Decor', label: 'Custom Luxury Floral & Decor', icon: <Gift size={18}/> },
                  { id: 'Menu', label: 'Bespoke Curated Menu', icon: <Utensils size={18}/> },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => toggleItem('services', item.label)}
                    className={`p-5 rounded-2xl border transition-all flex items-center gap-4 text-left ${
                      formData.services.includes(item.label) 
                      ? 'bg-orange-600/10 border-orange-600 text-orange-500' 
                      : 'bg-white/5 border-white/5 text-gray-400 hover:border-white/10'
                    }`}
                  >
                    <div className={formData.services.includes(item.label) ? 'text-white' : 'text-gray-500'}>
                      {item.icon}
                    </div>
                    <span className="font-semibold">{item.label}</span>
                  </button>
                ))}
              </div>
              <div className="flex gap-4">
                <button onClick={prevStep} className="p-5 bg-white/5 text-white rounded-2xl hover:bg-white/10"><ChevronLeft/></button>
                <button onClick={nextStep} className="flex-1 py-5 bg-white text-black rounded-2xl font-black flex items-center justify-center gap-2 hover:bg-orange-600 hover:text-white transition-all">
                  Next Stage <ChevronRight size={20}/>
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: DETAILS & REQUIREMENTS */}
          {step === 3 && (
            <div className="animate-in fade-in slide-in-from-right-8 duration-500">
              <span className="text-orange-500 font-bold tracking-[0.2em] text-xs uppercase mb-4 block">Stage 03 — Final Details</span>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-8">Tell us your <span className="text-orange-600">Vision.</span></h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase mb-2 block">Expected Date</label>
                  <input 
                    type="date" 
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white focus:border-orange-600 outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase mb-2 block">Guest Count</label>
                  <input 
                    type="number" 
                    placeholder="Approx number of guests"
                    onChange={(e) => setFormData({...formData, guestCount: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white focus:border-orange-600 outline-none"
                  />
                </div>
              </div>

              <div className="mb-10">
                <label className="text-xs font-bold text-gray-500 uppercase mb-2 block">Describe your dream celebration</label>
                <textarea 
                  rows="4"
                  placeholder="E.g. I want a private hilltop dinner for my wife's 30th birthday with live music and a leopard safari at sunrise..."
                  onChange={(e) => setFormData({...formData, requirements: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-3xl p-6 text-white focus:border-orange-600 outline-none resize-none"
                />
              </div>

              <div className="flex gap-4">
                <button onClick={prevStep} className="p-5 bg-white/5 text-white rounded-2xl hover:bg-white/10"><ChevronLeft/></button>
                <button onClick={startWhatsApp} className="flex-1 py-5 bg-orange-600 text-white rounded-2xl font-black text-xl flex items-center justify-center gap-3 hover:bg-orange-700 transition-all shadow-xl shadow-orange-600/20">
                  <MessageSquare size={24}/> Co-Plan on WhatsApp
                </button>
              </div>
            </div>
          )}
        </div>

        {/* BACKGROUND DECOR */}
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-orange-600/10 rounded-full blur-[100px] pointer-events-none"/>
        <div className="absolute top-1/2 right-8 -translate-y-1/2 opacity-[0.03] pointer-events-none hidden lg:block">
          <PartyPopper size={400} />
        </div>
      </div>
      
      {/* TRUST FOOTER */}
      <p className="mt-8 text-center text-gray-400 text-xs tracking-widest uppercase">
        Government Registered Travel Enterprise | UDYAM-RJ-22-0193418
      </p>
    </div>
  );
};

export default CelebrationConcierge;