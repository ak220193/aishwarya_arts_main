"use client";
import React from "react";
import { 
  Upload, Sparkles, Trash2, Save, 
  Eye, Monitor, Smartphone, Layout,
  ArrowRight, CheckCircle2, Clock, Image as ImageIcon
} from "lucide-react";

const BannerManager = () => {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-10 space-y-12 animate-in fade-in duration-1000">
      
      {/* 1. HEADER SECTION */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 border-b border-zinc-100 pb-8">
        <div>
          <h2 className="text-3xl font-semibold text-zinc-800 tracking-tight">Hero Banners</h2>
          <p className="text-sm text-zinc-800 font-semibold italic tracking-wide mt-1">Storefront Campaign Manager</p>
        </div>
        <div className="flex items-center gap-4">
          <button className="px-8 py-3 bg-zinc-800 text-white rounded-2xl font-semibold text-sm uppercase tracking-widest shadow-xl flex items-center gap-2 hover:bg-amber-600 transition-all">
            <Save size={16} /> Update Carousel
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
        
        {/* LEFT: UPLOAD & PREVIEW (8 Columns) */}
        <div className="xl:col-span-8 space-y-10">
          
          {/* PRIMARY UPLOAD ZONE */}
          <section className="bg-white p-10 rounded-[3rem] border border-zinc-100 shadow-sm space-y-8">
            <div className="flex items-center justify-between">
               <h3 className="text-sm font-semibold text-zinc-800 uppercase tracking-widest flex items-center gap-2">
                 <ImageIcon size={16} className="text-amber-600" /> New Poster Upload
               </h3>
               <div className="flex gap-2">
                  <div className="p-2 bg-zinc-100 rounded-lg text-zinc-800"><Monitor size={14} /></div>
                  <div className="p-2 bg-zinc-100 rounded-lg text-zinc-800"><Smartphone size={14} /></div>
               </div>
            </div>

            <div className="aspect-21/9 w-full bg-zinc-50 border-2 border-dashed border-zinc-200 rounded-[2.5rem] flex flex-col items-center justify-center group hover:border-amber-400 hover:bg-amber-50/30 transition-all cursor-pointer overflow-hidden relative">
               <div className="flex flex-col items-center group-hover:scale-110 transition-transform duration-500">
                  <Upload className="text-zinc-300 group-hover:text-amber-500 mb-4" size={40} />
                  <p className="text-sm font-bold text-zinc-800 uppercase tracking-widest">Upload Campaign Image</p>
                  <p className="text-[12px] text-zinc-800 mt-2 font-medium italic">Recommended: 1920x800px (Desktop Wide)</p>
               </div>
            </div>
          </section>



          {/* <section className="space-y-6">
            <h3 className="text-[10px] font-black text-zinc-400 uppercase tracking-widest px-4">Live Carousel Sequence</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               {[1, 2].map((i) => (
                 <div key={i} className="bg-white p-4 rounded-[2.5rem] border border-zinc-100 shadow-sm group hover:border-amber-200 transition-all">
                    <div className="aspect-video rounded-[1.8rem] bg-zinc-100 overflow-hidden relative mb-4">
                       <img 
                        src={i === 1 ? "https://i.pinimg.com/1200x/ae/9b/72/ae9b72b10034ea10397ac96f7abb0287.jpg" : "https://i.pinimg.com/736x/b7/57/0c/b7570c2868e72717ce38f99e6756c25d.jpg"} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        alt="Banner" 
                       />
                       <div className="absolute top-4 right-4 flex gap-2">
                          <button className="p-2 bg-white/90 backdrop-blur-md rounded-xl text-zinc-400 hover:text-red-500 shadow-sm"><Trash2 size={14} /></button>
                       </div>
                    </div>
                    <div className="px-2 space-y-3">
                       <input type="text" placeholder="Campaign Title (e.g. Festival Sale)" className="w-full text-sm font-black text-zinc-800 outline-none bg-transparent border-b border-zinc-50 focus:border-amber-500" />
                       <div className="flex justify-between items-center">
                          <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-tighter italic">Sequence Order: #{i}</span>
                          <div className="flex items-center gap-1.5 px-3 py-1 bg-green-50 text-green-600 rounded-full">
                            <div className="w-1 h-1 bg-green-500 rounded-full animate-pulse" />
                            <span className="text-[8px] font-black uppercase tracking-widest">Live</span>
                          </div>
                       </div>
                    </div>
                 </div>
               ))}
            </div>
          </section> */}
        </div>

        {/* RIGHT: CAMPAIGN LOGIC (4 Columns) */}
        <div className="xl:col-span-4 space-y-8">
          
          <section className="bg-white rounded-[3.5rem] p-10 shadow-2xl text-white space-y-10 relative overflow-hidden">
            <div className="absolute -right-8 -top-8 w-32 h-32 bg-amber-500 rounded-full blur-[60px] opacity-20" />
            
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-white/10 rounded-xl text-amber-500"><Sparkles size={18} /></div>
              <h3 className="text-sm text-black font-semibold uppercase tracking-[0.2em]">Banner Settings</h3>
            </div>

            <div className="space-y-8 relative z-10">
               <div className="space-y-3">
                  <label className="text-sm font-semibold text-zinc-800 uppercase tracking-widest ml-1">Redirect Link</label>
                  <div className="relative">
                    <select className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-sm font-bold text-black outline-none appearance-none cursor-pointer">
                      <option className="bg-zinc-100 text-black">New Collection</option>
                      <option className="bg-zinc-100 text-black">Best Sellers</option>
                      <option className="bg-zinc-100 text-black">Exclusive offer</option>
                    </select>
                    <Layout className="absolute right-6 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
                  </div>
               </div>

               <div className="space-y-3">
                  <label className="text-sm font-semibold text-zinc-500 uppercase tracking-widest ml-1">Display Schedule</label>
                  <div className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-2xl p-4 ">
                     <Clock className="text-amber-500" size={18} />
                     <span className="text-xs font-bold text-black">Show Immediately</span>
                  </div>
               </div>
            </div>
          </section>

          {/* VISIBILITY TOGGLES */}
          <div className="space-y-4">
            <label className="w-full cursor-pointer group">
              <input type="checkbox" className="hidden peer" defaultChecked />
              <div className="flex items-center justify-between p-6 rounded-[2.5rem] border transition-all  peer-checked:bg-green-50 peer-checked:text-green-700 peer-checked:border-green-200 bg-zinc-50 text-zinc-900 border-zinc-100">
                <div className="flex items-center gap-3">
                  <CheckCircle2 size={18} />
                  <span className="text-sm font-semibold uppercase tracking-widest">Active Carousel</span>
                </div>
                <div className="w-4 h-4 rounded-full border-2 border-current flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-current rounded-full" />
                </div>
              </div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerManager;