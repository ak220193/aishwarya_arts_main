"use client";
import React, { useState } from "react";
import { 
  Globe, Truck, ShieldCheck, 
  Bell, CreditCard, Save, 
  Info, Percent, Loader2,
  Mail, MapPin, Receipt
} from "lucide-react";

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState("general");
  const [saving, setSaving] = useState(false);

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      alert("Settings synchronized successfully.");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#fafafa] p-6 lg:p-12 font-outfit text-zinc-900">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">System Settings</h1>
          <p className="text-zinc-400 text-sm font-medium mt-1 uppercase tracking-widest italic">Core configuration for Aishwarya Arts</p>
        </div>
        <button 
          onClick={handleSave}
          className="flex items-center gap-2 px-8 py-3.5 bg-zinc-900 text-white rounded-2xl text-xs font-semibold hover:bg-black transition-all shadow-xl active:scale-95"
        >
          {saving ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />}
          Apply Global Settings
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
        
        {/* Sidebar Tabs */}
        <div className="space-y-2">
          <TabNav active={activeTab === "general"} icon={<Globe size={18}/>} label="General" onClick={() => setActiveTab("general")} />
          <TabNav active={activeTab === "tax"} icon={<Receipt size={18}/>} label="Tax & Currency" onClick={() => setActiveTab("tax")} />
          <TabNav active={activeTab === "shipping"} icon={<Truck size={18}/>} label="Shipping & Delivery" onClick={() => setActiveTab("shipping")} />
          <TabNav active={activeTab === "notifications"} icon={<Bell size={18}/>} label="Notifications" onClick={() => setActiveTab("notifications")} />
          <TabNav active={activeTab === "legal"} icon={<ShieldCheck size={18}/>} label="Legal & Policies" onClick={() => setActiveTab("legal")} />
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-[2.5rem] border border-zinc-200/60 shadow-sm p-10">
            
            {activeTab === "general" && (
              <div className="space-y-8 animate-in fade-in duration-500">
                <SectionHeader title="Store Identity" desc="Basic information about your gallery visible to patrons." />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InputBox label="Gallery Name" value="Aishwarya Arts" />
                  <InputBox label="Public Email" value="contact@aishwaryaarts.com" />
                  <InputBox label="Phone Number" value="+91 98765 43210" />
                  <InputBox label="Store Currency" value="INR (₹)" disabled />
                  <div className="md:col-span-2">
                    <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em] mb-3 block">Gallery Location (for Invoices)</label>
                    <textarea className="w-full p-4 bg-zinc-50 border border-zinc-100 rounded-2xl text-sm outline-none focus:ring-1 focus:ring-zinc-900 h-24 transition-all" defaultValue="No. 12, Temple Street, Thanjavur, Tamil Nadu - 613001" />
                  </div>
                </div>
              </div>
            )}

            {activeTab === "tax" && (
              <div className="space-y-8 animate-in fade-in duration-500">
                <SectionHeader title="Taxation Logic" desc="Configure how GST is applied to your masterpieces." />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InputBox label="GST Registration Number" placeholder="22AAAAA0000A1Z5" />
                  <InputBox label="Default GST Rate (%)" value="12" />
                  <div className="md:col-span-2 flex items-center gap-3 p-4 bg-zinc-50 rounded-2xl text-[11px] font-medium text-zinc-500 italic">
                    <Info size={14} /> Tax will be automatically added to the base price during checkout.
                  </div>
                </div>
              </div>
            )}

            {activeTab === "shipping" && (
              <div className="space-y-8 animate-in fade-in duration-500">
                <SectionHeader title="Shipping Logistics" desc="Set the thresholds for delivery charges." />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InputBox label="Standard Shipping Fee (₹)" value="650" />
                  <InputBox label="Free Shipping Threshold (₹)" value="25000" />
                  <div className="md:col-span-2">
                    <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em] mb-3 block">Estimated Fulfillment Time</label>
                    <select className="w-full p-4 bg-zinc-50 border border-zinc-100 rounded-2xl text-sm outline-none transition-all">
                      <option>3 - 5 Business Days</option>
                      <option>7 - 10 Business Days (Custom Art)</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

             {activeTab === "legal" && (
              <div className="space-y-8 animate-in fade-in duration-500">
                <SectionHeader title="Policies" desc="Manage the legal fine print for your footer." />
                <div className="space-y-6">
                  <PolicyEditor label="Refund & Return Policy" />
                  <PolicyEditor label="Shipping Policy" />
                  <PolicyEditor label="Terms of Service" />
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

// --- Sub-Components ---

const TabNav = ({ active, icon, label, onClick }) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-sm font-semibold transition-all ${
      active ? "bg-zinc-900 text-white shadow-lg translate-x-2" : "text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100"
    }`}
  >
    {icon} {label}
  </button>
);

const SectionHeader = ({ title, desc }) => (
  <div className="border-b border-zinc-100 pb-6 mb-6">
    <h3 className="text-xl font-semibold text-zinc-900">{title}</h3>
    <p className="text-xs text-zinc-400 mt-1 font-medium italic">{desc}</p>
  </div>
);

const InputBox = ({ label, value, placeholder, disabled }) => (
  <div>
    <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em] mb-3 block">{label}</label>
    <input 
      disabled={disabled}
      className="w-full p-4 bg-zinc-50 border border-zinc-100 rounded-2xl text-sm outline-none focus:ring-1 focus:ring-zinc-900 transition-all disabled:opacity-50"
      defaultValue={value}
      placeholder={placeholder}
    />
  </div>
);

const PolicyEditor = ({ label }) => (
    <div>
        <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em] mb-3 block">{label}</label>
        <div className="p-4 bg-zinc-50 border border-zinc-100 rounded-2xl flex items-center justify-between">
            <span className="text-xs font-medium text-zinc-400 italic font-outfit uppercase tracking-widest">Document Configured</span>
            <button className="text-[10px] font-bold text-zinc-900 underline underline-offset-4 uppercase">Edit Content</button>
        </div>
    </div>
)

export default SettingsPage;