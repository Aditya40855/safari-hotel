import React from "react";

export default function ServicesSection() {
  const services = [
    {
      title: "Jawai Leopard Safari",
      desc: "Expert-guided leopard sighting safari in Jawai hills.",
      img: "/images/safari-1.jpg",
    },
    {
      title: "Luxury Hotels & Resorts",
      desc: "Handpicked stays with comfort and premium facilities.",
      img: "/images/hotel-1.jpg",
    },
    {
      title: "Gypsy Ride Experience",
      desc: "Off-road gypsy rides with trained local drivers.",
      img: "/images/gypsy.jpg",
    },
    {
      title: "Photography Safari",
      desc: "Exclusive wildlife photography tours for creators.",
      img: "/images/photo.jpg",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto py-14 px-6">
      <h2 className="text-3xl font-bold text-center mb-2">Our Services</h2>
      <p className="text-center text-gray-600 mb-10">
        Safari tours, hotel stays, photography rides — everything for your wild adventure.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((s, i) => (
          <div
            key={i}
            className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
          >
            <img src={s.img} alt={s.title} className="w-full h-48 object-cover" />
            <div className="p-5">
              <h3 className="text-xl font-semibold mb-2">{s.title}</h3>
              <p className="text-gray-600">{s.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}