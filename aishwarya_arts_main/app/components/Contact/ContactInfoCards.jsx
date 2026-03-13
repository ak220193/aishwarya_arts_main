"use client";

import { Mail, Phone, MapPin, Copy, Check, Sparkles } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

export default function ContactInfoCards() {
  const [copied, setCopied] = useState(null);

  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    toast.success("Copied to clipboard");
    setTimeout(() => setCopied(null), 2000);
  };

  const items = [
    {
      id: "email",
      icon: <Mail size={22} />,
      title: "Digital Curators",
      value: "contact.aishwaryaarts@gmail.com",
      link: "mailto:contact.aishwaryaarts@gmail.com",
      label: "Inquiry"
    },
    {
      id: "phone",
      icon: <Phone size={22} />,
      title: "Private Studio",
      value: "+91 75501 52764",
      secondary: "+91 96550 07661",
      link: "tel:+917550152764",
      label: "Direct Line"
    },
    {
      id: "address",
      icon: <MapPin size={22} />,
      title: "Heritage Gallery",
      value: "Namakkal, Tamil Nadu",
      subValue: "3/648, Thuraiyur Road Thuraiyur Road, N. Kosavampatti Namakkal",
      link: "#",
      label: "Visit Us"
    }
  ];

  return (
    <section className="py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative">

        {/* --- PREMIUM AMBIENT GLOW --- */}
        <div className="absolute top-0 -left-20 w-96 h-96 bg-amber-200/20 blur-[120px] rounded-full pointer-events-none" />

        {/* --- HEADER --- */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles size={16} className="text-amber-900 animate-pulse" />
              <span className="text-md font-semibold uppercase tracking-wide text-amber-700/80">Signature Studio</span>
            </div>
            <p className="text-zinc-900 text-5xl md:text-7xl font-bold tracking-tighter leading-[0.95]">
              Invite the <br />
              Divine to <span className="bg-linear-to-r from-amber-500 via-yellow-500 to-amber-700 bg-clip-text text-transparent  px-1"> your Walls</span>
            </p>
          </div>
          <p className="text-zinc-500 text-lg font-medium md:text-right max-w-sm">
            Connect directly with the artisans preserving India’s golden heritage. We are here to help you choose your next masterpiece.
          </p>
        </div>

        {/* --- LUXURY GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-8">
          {items.map((item) => (
            <div
              key={item.id}
              className="group relative flex flex-col justify-between bg-white border border-zinc-100 rounded-[2.5rem] p-10 transition-all duration-700 hover:-translate-y-2 hover:shadow-[0_40px_80px_-20px_rgba(217,119,6,0.12)]"
            >
              {/* HIDDEN GLOW EFFECT ON HOVER */}
              <div className="absolute inset-0 bg-linear-to-br from-amber-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-[2.5rem]" />

              <div className="relative z-10">
                <div className="flex justify-between items-center mb-12">
                  <div className="w-14 h-14 bg-amber-90 rounded-2xl flex items-center justify-center text-amber-400 shadow-2xl group-hover:scale-110 transition-transform duration-500">
                    {item.icon}
                  </div>
                  <span className="text-sm font-semibold uppercase tracking-wide text-amber-700 border border-amber-200/50 bg-amber-50/50 px-4 py-1.5 rounded-full shadow-sm">
                    {item.label}
                  </span>
                </div>

                <h3 className="text-zinc-800 text-sm font-semibold uppercase tracking-wide mb-4">
                  {item.title}
                </h3>

                <div className="space-y-2">
                  <p className="text-zinc-950 text-xl font-bold tracking-tight leading-tight group-hover:text-amber-800 transition-colors">
                    {item.value}
                  </p>
                  {item.secondary && (
                    <p className="text-zinc-950 text-xl font-bold tracking-tight">
                      {item.secondary}
                    </p>
                  )}
                  {item.subValue && (
                    <p className="text-zinc-800 text-sm font-semibold tracking-tight">
                      {item.subValue}
                    </p>
                  )}
                </div>
              </div>

              {/* --- ACTION BAR --- */}
              <div className="mt-14 flex items-center gap-3 relative z-10">
                <a
                  href={item.link}
                  className="flex-1 bg-linear-to-tr from-zinc-900 to-zinc-800 text-white text-[11px] font-bold uppercase tracking-[0.2em] py-4 rounded-2xl text-center shadow-[0_10px_20px_-5px_rgba(0,0,0,0.2)] hover:shadow-[0_15px_30px_-5px_rgba(217,119,6,0.2)] hover:from-amber-600 hover:to-amber-500 transition-all duration-500"
                >
                  Connect
                </a>

              </div>
            </div>
          ))}
        </div>

        {/* --- DECORATIVE LINE --- */}
        <div className="mt-24 flex items-center justify-center">
          <div className="h-px w-24 bg-linear-to-r from-transparent to-amber-200" />
          <div className="px-6 text-sm font-semibold text-amber-800/60 uppercase tracking-[0.6em]">
            Authentic Tanjore
          </div>
          <div className="h-px w-24 bg-linear-to-l from-transparent to-amber-200" />
        </div>
      </div>
    </section>
  );
}