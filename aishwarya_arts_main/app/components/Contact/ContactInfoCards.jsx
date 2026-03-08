"use client";

import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactInfoCards() {
  const items = [
    {
      icon: <Mail size={40} className="text-black transition-colors duration-300" />,
      title: "Email Us",
      desc: "We reply within 24 hours.",
      value: "contact.aishwaryaarts@gmail.com",
      hoverColor: "text-yellow-600",
    },
    {
      icon: <Phone size={40} className="text-black transition-colors duration-300" />,
      title: "Call Us",
      desc: "Mon – Sat, 10am – 7pm",
      value: "+91 9655007661",
      hoverColor: "text-green-600",
    },
    {
      icon: <MapPin size={40} className="text-black transition-colors duration-300" />,
      title: "Visit Us",
      desc: "Our studio & showroom",
      value: "Namakkal, Tamil Nadu",
      hoverColor: "text-red-600",
    },
  ];

  return (
    <section className="py-16 max-w-7xl mx-auto px-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-14 text-center">
        {items.map((item, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center group transition-all"
          >
            {/* Icon */}
            <div className={`mb-5 transition duration-300 group-hover:scale-110 ${item.hoverColor}`}>
              {item.icon}
            </div>

            {/* Title */}
            <h3 className="text-3xl font-semibold tracking-wide leading-tight">
              {item.title}
            </h3>

            {/* Description */}
            <p className="text-gray-600 mt-2 text-lg font-medium leading-relaxed">
              {item.desc}
            </p>

            {/* Value */}
            <p className="text-zinc-900 mt-3 text-xl font-semibold">
              {item.value}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
