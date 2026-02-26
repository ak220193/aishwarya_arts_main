"use client";
import React, { useState } from "react";
import {
  Upload, Sparkles, Diamond, Maximize2, Save, Info, DollarSign,
  PenTool, Plus, Layers, ChevronDown, Hash, Clock, X, Trash2
} from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import { UploadButton } from "@uploadthing/react";

// --- DYNAMIC DATA ARRAYS ---
const GODS = [
  "Amman", "Annapoorni", "Annamalai", "Baba", "Balaji Lakshmi", "Balaji Thayaar",
  "Datchnamoorthy", "Durga Devi", "Ganesha", "Gayathri Devi", "Guruvayurappan",
  "Hanuman", "Kamadenu", "Krishna", "Lakshmi", "Lalitha Devi", "Lakshmi Narayana",
  "Meenakshi", "Murugan", "Pooja Set Painting", "Raja Raja Rajeshwari", "Ramar",
  "Renuga Devi", "Sathya Narayana", "Shiva Family", "Shanvanthri", "Vishwa Brahma","GajaLakshmi"
];

const ART_STYLES = [
  { label: "2D Work", value: "2d" },
  { label: "3D Work", value: "3d" },
  { label: "Flat Type", value: "flat" },
  { label: "Embossed", value: "embossed" },
];

const DIMENSIONS = [
  "15\" X 12\"", "18\" X 14\"", "20\" X 16\"", "24\" X 18\"", 
  "30\" X 24\"", "48\" X 36\"", "60\" X 36\"", "72\" X 48\""
];

const AddProductFinal = () => {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    sku: "",
    title: "",
    description: "Handcrafted 22ct Gold Leaf Tanjore Painting",
    price: "",
    offerPrice: "",
    category: "others",
    godName: "",
    workStyle: "3d",
    dimensions: "15\" X 12\"", // Default to first value in array
    frameType: "Genuine Teak Wood",
    weight: "2.5 kg",
    leadTime: "Ready to Ship",
    images: [],
    inStock: true,
    isBestSeller: false,
    isNewArrival: false,
  });

  const removeImage = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
    toast.success("Image removed from selection");
  };

  const handlePublish = async () => {
    if (!formData.sku || !formData.price || formData.images.length === 0) {
      return toast.error("SKU, Price, and Image are mandatory!");
    }

    setLoading(true);
    try {
      const payload = {
        ...formData,
        sku: formData.sku.toUpperCase(),
        godName: formData.godName // Sending the actual string from the array
      };

      const res = await axios.post("/api/admin/products", payload);
      if (res.status === 201 || res.status === 200) {
        toast.success("Masterpiece Published to Database!");
        // Reset Logic can be added here
      }
    } catch (err) {
      const serverMessage = err.response?.data?.error || "Database connection failed";
      toast.error(serverMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-10 animate-in fade-in duration-700">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-center bg-white/90 sticky top-0 z-30 py-6 px-3 rounded-4xl border-b border-zinc-100 mb-10 shadow-sm">
        <div className="ml-5">
          <h2 className="text-4xl font-semibold text-zinc-800 tracking-wide uppercase">Products</h2>
          <p className="text-[12px] text-zinc-800 font-bold uppercase tracking-[0.3em]">Gallery Management</p>
        </div>
        <div className="flex items-center gap-4 mr-5">
          <button className="px-6 py-2.5 bg-zinc-50 text-zinc-80 rounded-xl font-semibold text-sm uppercase border border-zinc-200">Save Draft</button>
          <button onClick={handlePublish} disabled={loading} className="px-8 py-2.5 bg-zinc-800 text-white rounded-xl font-semibold text-sm uppercase shadow-lg flex items-center gap-2 hover:bg-amber-600 transition-all disabled:opacity-50">
            {loading ? <Clock className="animate-spin" size={16} /> : <Save size={16} />}
            {loading ? "Syncing..." : "Publish Artwork"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
        <div className="xl:col-span-8 space-y-10">
          
          {/* MEDIA GALLERY */}
          <section className="bg-white p-8 rounded-[2.5rem] border border-zinc-100 shadow-sm">
            <h3 className="text-md font-semibold text-zinc-800 uppercase tracking-widest mb-6 flex items-center gap-2"><Layers size={14} /> Artwork Media Gallery</h3>
            <div className="grid grid-cols-4 grid-rows-2 gap-4 h-112.5">
              <div className="col-span-2 row-span-2 bg-zinc-50 border-2 border-dashed border-zinc-200 rounded-[2.5rem] flex flex-col items-center justify-center hover:border-amber-400 cursor-pointer overflow-hidden transition-all relative">
                {formData.images[0] ? (
                  <>
                    <img src={formData.images[0]} className="w-full h-full object-contain" alt="Main" />
                    <button onClick={() => removeImage(0)} className="absolute top-4 right-4 p-2 bg-red-500 text-white rounded-full shadow-lg"><Trash2 size={16}/></button>
                  </>
                ) : (
                  <UploadButton
                    endpoint="imageUploader"
                    onClientUploadComplete={(res) => {
                      setFormData(prev => ({ ...prev, images: [...prev.images, res[0].url] }));
                      toast.success("Main view uploaded");
                    }}
                    onUploadError={(err) => toast.error(err.message)}
                    appearance={{
                      button: "bg-transparent text-zinc-300 w-full h-full border-none after:hidden before:hidden focus-within:ring-0",
                      allowedContent: "hidden"
                    }}
                    content={{ button: <Upload size={32} /> }}
                  />
                )}
              </div>
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-zinc-50 border-2 border-dashed border-zinc-200 rounded-4xl flex items-center justify-center hover:border-amber-400 cursor-pointer overflow-hidden transition-all relative">
                  {formData.images[i] ? (
                    <>
                      <img src={formData.images[i]} className="w-full h-full object-contain" alt={`View ${i}`} />
                      <button onClick={() => removeImage(i)} className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full shadow-md"><Trash2 size={12}/></button>
                    </>
                  ) : (
                    <UploadButton
                      endpoint="imageUploader"
                      onClientUploadComplete={(res) => {
                        setFormData(prev => ({ ...prev, images: [...prev.images, res[0].url] }));
                        toast.success("Angle uploaded");
                      }}
                      onUploadError={(err) => toast.error(err.message)}
                      appearance={{
                        button: "bg-transparent text-zinc-300 w-full h-full border-none after:hidden before:hidden focus-within:ring-0",
                        allowedContent: "hidden"
                      }}
                      content={{ button: <Plus size={24} /> }}
                    />
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* ART IDENTITY */}
          <section className="bg-white p-10 rounded-[2.5rem] border border-zinc-100 shadow-sm space-y-8">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-amber-100 text-amber-600 rounded-xl"><PenTool size={18} /></div>
              <h3 className="text-md font-semibold text-zinc-800 uppercase">Art Identity</h3>
            </div>
            <input type="text" placeholder="Enter Title..." value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} className="w-full text-4xl font-semibold outline-none border-b-2 border-zinc-50 focus:border-amber-500 pb-4 transition-all" />
            
            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="text-sm font-semibold uppercase ml-2 text-zinc-500">Divine Subject</label>
                <div className="relative">
                  <select value={formData.godName} onChange={(e) => setFormData({...formData, godName: e.target.value})} className="w-full bg-zinc-50 border rounded-2xl py-4 px-6 font-bold outline-none appearance-none">
                    <option value="">Select God Name</option>
                    {GODS.map(god => <option key={god} value={god}>{god}</option>)}
                  </select>
                  <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" size={16} />
                </div>
              </div>
              <div className="space-y-3">
                <label className="text-sm font-semibold uppercase ml-2 text-zinc-500">Work Style</label>
                <div className="relative">
                  <select value={formData.workStyle} onChange={(e) => setFormData({...formData, workStyle: e.target.value})} className="w-full bg-zinc-50 border rounded-2xl py-4 px-6 font-bold outline-none appearance-none">
                    {ART_STYLES.map(style => <option key={style.value} value={style.value}>{style.label}</option>)}
                  </select>
                  <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" size={16} />
                </div>
              </div>
            </div>

            {/* TECHNICAL SPECS ARRAY MAP */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-10 pt-6">
              {[
                { label: "SKU / ID", key: "sku", icon: Hash, type: "input", placeholder: "AA-GAN-101" },
                { label: "Dimensions", key: "dimensions", icon: Maximize2, type: "select", options: DIMENSIONS },
                { label: "Frame", key: "frameType", icon: Diamond, type: "select", options: ["Classic Frame", "Chettinadu Frame", "Mani Frame", "Teakwood Frame"] },
                { label: "Weight", key: "weight", icon: Info, type: "select", options: ["2.5 kg", "3.5 kg", "5.0 kg"] },
                { label: "Lead Time", key: "leadTime", icon: Clock, type: "select", options: ["Ready to Ship", "2-3 Weeks", "Custom Order"] }
              ].map((spec, i) => (
                <div key={i} className="flex items-center gap-5">
                  <div className="p-4 bg-zinc-50 rounded-2xl text-zinc-600"><spec.icon size={18} /></div>
                  <div className="flex-1">
                    <p className="text-[12px] font-semibold uppercase text-zinc-400 mb-1">{spec.label}</p>
                    {spec.type === "input" ? (
                      <input value={formData[spec.key]} onChange={(e) => setFormData({...formData, [spec.key]: e.target.value.toUpperCase()})} placeholder={spec.placeholder} className="w-full bg-transparent border-b border-zinc-100 outline-none font-bold text-sm focus:border-amber-500 transition-all" />
                    ) : (
                      <div className="relative">
                        <select value={formData[spec.key]} onChange={(e) => setFormData({...formData, [spec.key]: e.target.value})} className="w-full bg-transparent border-b border-zinc-100 outline-none font-bold text-sm appearance-none pr-6">
                          {spec.options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                        </select>
                        <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 text-zinc-300 pointer-events-none" size={12} />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* RIGHT COLUMN */}
        <div className="xl:col-span-4 space-y-8">
          <section className="bg-white rounded-[3rem] p-10 shadow-xl border border-zinc-100 text-black">
            <h3 className="text-md font-semibold uppercase mb-10 flex items-center gap-3"><DollarSign size={18} className="text-amber-500" /> Pricing</h3>
            <div className="space-y-10">
              <div className="relative">
                <span className="absolute left-0 top-1 font-black text-2xl text-zinc-400">₹</span>
                <input type="number" value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} placeholder="18000" className="w-full bg-transparent border-b border-zinc-200 pb-6 pl-8 text-4xl font-semibold outline-none focus:border-amber-500 transition-all" />
                <label className="text-[12px] font-semibold text-zinc-400 mt-3 block uppercase">Retail Price</label>
              </div>
              <div className="relative">
                <span className="absolute left-0 top-1 font-black text-2xl text-zinc-400">₹</span>
                <input type="number" value={formData.offerPrice} onChange={(e) => setFormData({...formData, offerPrice: e.target.value})} placeholder="15500" className="w-full bg-transparent border-b border-zinc-100 pb-6 pl-8 text-4xl font-semibold outline-none focus:border-amber-500 transition-all" />
                <label className="text-[12px] font-semibold text-zinc-400 mt-3 block uppercase">Offer Price</label>
              </div>
            </div>
          </section>

          <div className="grid grid-cols-2 gap-4">
            <button onClick={() => setFormData({...formData, inStock: !formData.inStock})} className={`py-5 rounded-2xl text-xs font-bold uppercase border transition-all shadow-sm ${formData.inStock ? 'bg-green-50 text-green-700 border-green-200' : 'bg-zinc-50 text-zinc-400'}`}>
              {formData.inStock ? "● In Stock" : "Out of Stock"}
            </button>
            <button onClick={() => setFormData({...formData, isBestSeller: !formData.isBestSeller})} className={`py-5 rounded-2xl text-xs font-bold uppercase border transition-all shadow-sm ${formData.isBestSeller ? 'bg-amber-50 text-amber-700 border-amber-200' : 'bg-zinc-50 text-zinc-400'}`}>Best Seller</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProductFinal;