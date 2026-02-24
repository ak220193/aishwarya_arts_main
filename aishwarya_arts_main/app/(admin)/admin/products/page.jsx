"use client";
import React from "react";
import {
  Upload,
  Sparkles,
  Diamond,
  Maximize2,
  Save,
  Box,
  Info,
  DollarSign,
  PenTool,
  Ruler,
  Plus,
  Layers,
  ChevronDown,
  CheckCircle,
  Hash,
  Clock,
  ClipboardPenLine,
} from "lucide-react";

const AddProductFinal = () => {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-10 animate-in fade-in duration-700">
      {/* 1. STICKY HEADER - Balanced within the 7xl container */}
      <div className="flex flex-col md:flex-row justify-between  items-center bg-white/90  sticky top-0 z-30 py-6 px-3 rounded-4xl border-b border-zinc-100 mb-10  shadow-sm">
        <div className="ml-5">
          <h2 className="text-4xl font-semibold text-zinc-800 tracking-wide uppercase">
            Products
          </h2>
          <p className="text-[12px] text-zinc-800 font-bold uppercase tracking-[0.3em]">
            Gallery Asset Management
          </p>
        </div>
        <div className="flex items-center gap-4 mr-5">
          <button className="px-6 py-2.5 bg-zinc-50 text-zinc-80 rounded-xl font-semibold text-sm uppercase tracking-widest border border-zinc-200">
            Save Draft
          </button>
          <button className="px-8 py-2.5 bg-zinc-800 text-white rounded-xl font-semibold text-sm uppercase tracking-widest shadow-lg flex items-center gap-2 hover:bg-amber-600 transition-all">
            <Save size={16} /> Publish Artwork
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
        {/* LEFT & CENTER: VISUALS & IDENTITY (8 Columns) */}
        <div className="xl:col-span-8 space-y-10">
          {/* MEDIA GALLERY SECTION */}
          <section className="bg-white p-8 rounded-[2.5rem] border border-zinc-100 shadow-sm">
            <h3 className="text-md font-semibold text-zinc-800 uppercase tracking-widest mb-6 flex items-center gap-2">
              <Layers size={14} /> Artwork Media Gallery
            </h3>
            <div className="grid grid-cols-4 grid-rows-2 gap-4 h-112.5">
              <div className="col-span-2 row-span-2 bg-zinc-50 border-2 border-dashed border-zinc-200 rounded-[2.5rem] flex flex-col items-center justify-center hover:border-amber-400 hover:bg-amber-50/30 transition-all cursor-pointer group">
                <Upload
                  className="text-zinc-300 group-hover:text-amber-500 mb-2"
                  size={32}
                />
                <p className="text-[10px] font-semibold text-zinc-800  tracking-widest">
                  Upload Image
                </p>
              </div>
              <div className="col-span-2 bg-zinc-50 border-2 border-dashed border-zinc-200 rounded-4xl flex items-center justify-center hover:border-amber-400 transition-all cursor-pointer">
                <Plus className="text-zinc-300" size={24} />
              </div>
              <div className="bg-zinc-50 border-2 border-dashed border-zinc-200 rounded-4xl flex items-center justify-center hover:border-amber-400 transition-all cursor-pointer">
                <Plus className="text-zinc-200" size={20} />
              </div>
              <div className="bg-zinc-50 border-2 border-dashed border-zinc-200 rounded-4xl flex items-center justify-center hover:border-amber-400 transition-all cursor-pointer">
                <Plus className="text-zinc-200" size={20} />
              </div>
            </div>
          </section>

          {/* ART IDENTITY SECTION */}
          <section className="bg-white p-10 rounded-[2.5rem] border border-zinc-100 shadow-sm space-y-8">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-amber-100 text-amber-600 rounded-xl">
                <PenTool size={18} />
              </div>
              <h3 className="text-md font-semibold text-zinc-800 uppercase tracking-widest">
                Product Category
              </h3>
            </div>

            <input
              type="text"
              placeholder="Enter Title..."
              className="w-full text-4xl font-semibold text-zinc-800 placeholder:text-zinc-100 outline-none border-b-2 border-zinc-50 focus:border-amber-500 pb-4 transition-all"
            />

            <div className="grid grid-cols-2 gap-8 pt-4 pb-4">
              <div className="space-y-3">
                <label className="text-sm font-semibold text-zinc-800 uppercase tracking-widest ml-2">
                  Divine Subject (God Name)
                </label>
                <div className="relative mt-2">
                  <select className="w-full bg-zinc-50 border border-zinc-100 rounded-2xl py-4 px-6 text-sm font-bold text-zinc-800 outline-none appearance-none focus:bg-white focus:ring-4 focus:ring-amber-500/5 transition-all">
                    <option value="" disabled selected>
                      Select God Name
                    </option>
                    <option value="ganesha">Lord Ganesha</option>
                    <option value="krishna">Lord Krishna</option>
                    <option value="lakshmi">Goddess Lakshmi</option>
                    <option value="shiva">Lord Shiva</option>
                  </select>
                  <ChevronDown
                    className="absolute right-5 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none"
                    size={16}
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-sm font-semibold text-zinc-800 uppercase tracking-widest ml-2">
                  Work Style
                </label>
                <div className="relative mt-2">
                  <select className="w-full bg-zinc-50 border border-zinc-100 rounded-2xl py-4 px-6 text-sm font-bold text-zinc-800 outline-none appearance-none focus:bg-white focus:ring-4 focus:ring-amber-500/5 transition-all">
                    <option value="" disabled selected>
                      Select Work Style
                    </option>
                    <option value="3d">3D Gold Foil Tanjore</option>
                    <option value="2d">Classical Flat Tanjore</option>
                  </select>
                  <ChevronDown
                    className="absolute right-5 top-1/2 -translate-y-1/2 text-zinc-100 pointer-events-none"
                    size={16}
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-amber-100 text-amber-600 rounded-xl">
                <ClipboardPenLine size={18} className="text-amber-600" />
              </div>
              <h3 className="text-sm font-semibold text-zinc-800 uppercase tracking-widest">
                Technical Specifications
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-10">
              {[
                {
                  label: "SKU / Asset ID",
                  type: "input",
                  placeholder: "e.g., AA-GAN-3D-001",
                  icon: Hash,
                },
                {
                  label: "Category",
                  type: "select",
                  options: [
                    "3D Tanjore Painting",
                    "Home Decor",
                    "Premium Gifts",
                  ],
                  icon: Box,
                },
                {
                  label: "Physical Size",
                  type: "select",
                  options: ["12x15 inches", "18x24 inches", "24x30 inches"],
                  icon: Maximize2,
                },
                {
                  label: "Wood Frame",
                  type: "select",
                  options: ["Genuine Teak Wood", "Rose Wood Finish"],
                  icon: Diamond,
                },
                {
                  label: "Total Weight",
                  type: "select",
                  options: ["2.5 kg", "3.5 kg", "5.0 kg"],
                  icon: Info,
                },
                {
                  label: "Lead Time", // New necessary column for operations
                  type: "select",
                  options: ["Ready to Ship", "2-3 Weeks", "1 Month (Custom)"],
                  icon: Clock,
                },
              ].map((spec, i) => (
                <div key={i} className="flex items-center gap-5 group">
                  <div className="p-4 bg-zinc-50 rounded-2xl text-zinc-800 group-hover:bg-amber-50 group-hover:text-amber-600 transition-all shadow-sm">
                    <spec.icon size={18} />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-[12px] font-semibold text-zinc-800 uppercase tracking-widest ml-1">
                      {spec.label}
                    </p>
                    <div className="relative">
                      {spec.type === "input" ? (
                        <input
                          type="text"
                          placeholder={spec.placeholder}
                          className="w-full bg-transparent border-b border-zinc-100 pb-2 outline-none text-sm font-bold text-zinc-800 placeholder:text-zinc-200 focus:border-amber-500 transition-all uppercase"
                        />
                      ) : (
                        <>
                          <select className="w-full bg-transparent border-b border-zinc-100 pb-2 outline-none text-sm font-bold text-zinc-800 appearance-none cursor-pointer focus:border-amber-500 transition-all">
                            <option value="">Select {spec.label}</option>
                            {spec.options.map((opt) => (
                              <option key={opt} value={opt}>
                                {opt}
                              </option>
                            ))}
                          </select>
                          <ChevronDown
                            className="absolute right-0 top-1 text-zinc-300 pointer-events-none"
                            size={14}
                          />
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* RIGHT: COMMERCIALS (4 Columns) */}
        <div className="xl:col-span-4 space-y-8">
          <section className="bg-white rounded-[3rem] p-10 shadow-3xl text-white relative overflow-hidden group">
            <div className="absolute -right-8 -top-8 w-32 h-32 bg-amber-500 rounded-full blur-[60px] opacity-20" />
            <div className="flex items-center gap-3 mb-10">
              <div className="p-2.5 bg-white/10 rounded-xl">
                <DollarSign size={18} className="text-amber-500" />
              </div>
              <h3 className="text-md font-semibold  uppercase tracking-[0.2em] text-black">
                Price
              </h3>
            </div>
            <div className="space-y-10 relative z-10">
              <div className="relative">
                <span className="absolute left-0 top-1 text-zinc-800 font-black text-2xl">
                  ₹
                </span>
                <input
                  type="number"
                  placeholder="18,000"
                  className="w-full bg-transparent border-b border-zinc-700 pb-6 pl-8  text-4xl font-semibold text-black outline-none focus:border-amber-500 transition-all"
                />
                <label className="text-[12px] font-semibold text-zinc-800 uppercase mt-3 block">
                  Retail Price
                </label>
              </div>
              <div className="relative bg-white/5 p-8 rounded-4xl border border-black/50">
                <span className="absolute left-6 top-10  text-zinc-600 font-black text-2xl">
                  ₹
                </span>
                <input
                  type="number"
                  placeholder="15,500"
                  className="w-full bg-transparent pb-1 pl-8 text-4xl font-semibold text-black outline-none"
                />
                <label className="text-[12px] font-bold text-black uppercase tracking-widest mt-4 block">
                  Active Offer
                </label>
              </div>
            </div>
          </section>

          {/* STATUS SELECTION ROW */}
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-2 2xl:grid-cols-3 gap-4">
            {/* IN STOCK CHECKBOX */}
            <label className="cursor-pointer group">
              <input type="checkbox" className="hidden peer" defaultChecked />
              <div
                className="flex items-center justify-center gap-3 py-4 sm:py-5 rounded-2xl lg:rounded-4xl text-[11px] sm:text-xs font-bold uppercase tracking-widest border transition-all peer-checked:bg-green-50 peer-checked:text-green-700 peer-checked:border-green-200  bg-zinc-50 text-zinc-800 border-zinc-100 group-hover:border-zinc-200 shadow-sm"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                In Stock
              </div>
            </label>

            {/* BEST SELLER CHECKBOX */}
            <label className="cursor-pointer group">
              <input type="checkbox" className="hidden peer" />
              <div
                className="flex items-center justify-center gap-3 py-4 sm:py-5 rounded-2xl lg:rounded-4xl text-[11px] sm:text-xs font-bold uppercase tracking-widest border transition-all peer-checked:bg-amber-50 peer-checked:text-amber-700 peer-checked:border-amber-200 bg-zinc-50 text-zinc-800 border-zinc-100 group-hover:border-zinc-200 shadow-sm"
              >
                <Sparkles size={14} />
                Best Seller
              </div>
            </label>

            {/* NEW ARRIVAL CHECKBOX */}
            <label className="cursor-pointer group">
              <input type="checkbox" className="hidden peer" />
              <div
                className="flex items-center justify-center gap-3 py-4 sm:py-5 rounded-2xl lg:rounded-4xl text-[11px] sm:text-xs font-bold uppercase tracking-widest border transition-all peer-checked:bg-blue-50 peer-checked:text-blue-700 peer-checked:border-blue-200  bg-zinc-50 text-zinc-800 border-zinc-100 group-hover:border-zinc-200 shadow-sm"
              >
                <CheckCircle size={14} />
                New Arrival
              </div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProductFinal;
