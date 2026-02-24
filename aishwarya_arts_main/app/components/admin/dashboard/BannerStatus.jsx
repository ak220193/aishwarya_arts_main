"use client";
import React from "react";
import { ImageIcon, ExternalLink, Sparkles } from "lucide-react";
import Image from "next/image";

const BannerStatus = () => {
  // Mock data for the active banner in your "Hero Banners" menu
  const activeBanner = {
    title: "Maha Shivaratri Special",
    status: "Live",
    lastUpdated: "2 days ago",
    thumbnail: "https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?q=80&w=300&h=150&fit=crop"
  };

  return (
    <div className="bg-white rounded-[2.5rem] p-8 border border-zinc-100 shadow-sm h-full">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-amber-50 text-amber-600 rounded-lg">
            <Sparkles size={18} />
          </div>
          <h2 className="text-lg font-bold text-zinc-900">Active Campaign</h2>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Live</span>
        </div>
      </div>

      <div className="relative h-32 w-full rounded-2xl overflow-hidden border border-zinc-100 shadow-inner group cursor-pointer">
        <img 
          src={activeBanner.thumbnail} 
          alt="Banner Preview" 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-4">
          <p className="text-white text-xs font-black uppercase tracking-widest">{activeBanner.title}</p>
          <p className="text-white/70 text-[9px] font-medium italic">Updated {activeBanner.lastUpdated}</p>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3">
        <button className="flex items-center justify-center gap-2 py-3 bg-zinc-900 text-white text-[10px] font-bold uppercase tracking-widest rounded-xl hover:bg-zinc-800 transition-all">
          <ImageIcon size={14} /> Change
        </button>
        <button className="flex items-center justify-center gap-2 py-3 bg-zinc-50 text-zinc-500 text-[10px] font-bold uppercase tracking-widest rounded-xl hover:bg-zinc-100 transition-all">
          <ExternalLink size={14} /> View
        </button>
      </div>
    </div>
  );
};

export default BannerStatus;