"use client";
import React from "react";
import { 
  Download, Search, Filter, MoreHorizontal, 
  Eye, Edit3, Trash2, Mail, Phone, MapPin, 
  CreditCard, Printer, Share2 
} from "lucide-react";

const salesData = [
  {
    sNo: 1,
    name: "TT Art Gallery",
    contact: "+91 98450 12345",
    email: "suresh.r@example.com",
    location: "Chennai, TN",
    orderId: "ORD-TJ-7701",
    artwork: "Goddess Lakshmi (24x30)",
    paymentStatus: "Paid",
    method: "UPI",
    amount: "₹45,000",
    date: "22 Feb 2026"
  },
  {
    sNo: 2,
    name: "Sandiv Art Gallery",
    contact: "+91 99001 88722",
    email: "priya.s@gallery.in",
    location: "Bangalore, KA",
    orderId: "ORD-TJ-7702",
    artwork: "Krishna Rasa Leela",
    paymentStatus: "Pending",
    method: "Bank Transfer",
    amount: "₹1,25,000",
    date: "23 Feb 2026"
  }
];

const SalesReports = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      
      {/* 1. TOP ACTION BAR */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-zinc-900 tracking-tight">Sales Operations</h1>
          <p className="text-[10px] text-zinc-800 font-bold uppercase tracking-[0.2em] mt-1">Detailed Transaction Ledger</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="p-2.5 bg-white border border-zinc-200 text-zinc-500 rounded-xl hover:text-amber-600 transition-all shadow-sm">
            <Printer size={18} />
          </button>
          <button className="flex items-center gap-2 bg-zinc-900 text-white px-5 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-amber-600 transition-all shadow-xl shadow-zinc-200">
            <Download size={14} /> Download CSV
          </button>
        </div>
      </div>

      {/* 2. DATA TABLE CONTAINER */}
      <div className="bg-white rounded-[2.5rem] border border-zinc-100 shadow-sm overflow-hidden">
        
        {/* Table Filters */}
        <div className="p-6 border-b border-zinc-50 flex flex-wrap items-center gap-4 bg-zinc-50/30">
          <div className="flex-1 min-w-75 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={16} />
            <input 
              type="text" 
              placeholder="Search patron, email, or order ID..." 
              className="w-full bg-white border border-zinc-200 rounded-2xl py-2.5 pl-11 text-sm outline-none focus:border-amber-500/30 focus:ring-4 focus:ring-amber-500/5 transition-all"
            />
          </div>
          <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-zinc-200 text-zinc-600 rounded-2xl text-[11px] font-bold uppercase tracking-widest hover:border-amber-200 transition-all">
            <Filter size={14} /> Advanced Filters
          </button>
        </div>

        {/* The Main Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-250">
            <thead>
              <tr className="bg-zinc-60/50">
                <th className="p-5 text-[10px] font-semibold text-zinc-800 uppercase tracking-widest pl-8">S.No</th>
                <th className="p-5 text-[10px] font-semibold text-zinc-800 uppercase tracking-widest">Patron Name</th>
                <th className="p-5 text-[10px] font-semibold text-zinc-800 uppercase tracking-widest">Contact Number</th>
                <th className="p-5 text-[10px] font-semibold text-zinc-800 uppercase tracking-widest">Email Address</th>
                <th className="p-5 text-[10px] font-semibold text-zinc-800 uppercase tracking-widest">Order Details</th>
                <th className="p-5 text-[10px] font-semibold text-zinc-800 uppercase tracking-widest">Status</th>
                <th className="p-5 text-[10px] font-semibold text-zinc-800 uppercase tracking-widest text-right pr-8">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-50">
              {salesData.map((row) => (
                <tr key={row.orderId} className="group hover:bg-amber-50/20 transition-all duration-300">
                  <td className="p-5 pl-8 text-xs font-bold text-zinc-400">{row.sNo}</td>
                  <td className="p-5">
                    <span className="text-sm font-bold text-zinc-900 block">{row.name}</span>
                    <span className="flex items-center gap-1 text-[9px] text-zinc-800 font-bold uppercase mt-1">
                      <MapPin size={8} /> {row.location}
                    </span>
                  </td>
                  <td className="p-5">
                    <div className="flex items-center gap-2 text-zinc-800 hover:text-amber-600 cursor-pointer transition-colors">
                      <div className="p-1.5 bg-zinc-100 rounded-lg group-hover:bg-white group-hover:shadow-sm">
                        <Phone size={12} />
                      </div>
                      <span className="text-sm font-bold">{row.contact}</span>
                    </div>
                  </td>
                  <td className="p-5">
                    <div className="flex items-center gap-2 text-zinc-800 hover:text-amber-600 cursor-pointer transition-colors">
                      <div className="p-1.5 bg-zinc-100 rounded-lg group-hover:bg-white group-hover:shadow-sm">
                        <Mail size={12} />
                      </div>
                      <span className="text-sm font-medium text--zinc-800">{row.email}</span>
                    </div>
                  </td>
                  <td className="p-5">
                    <div className="flex flex-col">
                      <span className="text-[12px] font-semibold text-zinc-900">{row.orderId}</span>
                      <span className="text-[12px] text-zinc-800  mt-0.5">{row.artwork}</span>
                      <div className="flex items-center gap-1.5 mt-1 text-[9px] font-bold text-amber-600 uppercase">
                         <CreditCard size={10} /> {row.method} • {row.amount}
                      </div>
                    </div>
                  </td>
                  <td className="p-5">
                    <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${
                      row.paymentStatus === 'Paid' ? 'bg-green-50 text-green-600 border-green-100' : 'bg-amber-50 text-amber-600 border-amber-100'
                    }`}>
                      {row.paymentStatus}
                    </span>
                  </td>
                  <td className="p-5 text-right pr-8">
                    <div className="flex items-center justify-end gap-2  transition-opacity">
                      <button title="View Details" className="p-2 hover:bg-white rounded-xl text-zinc-400 hover:text-amber-600 shadow-sm border border-transparent hover:border-amber-100 transition-all">
                        <Eye size={16} />
                      </button>
                      <button title="Edit Order" className="p-2 hover:bg-white rounded-xl text-zinc-400 hover:text-blue-600 shadow-sm border border-transparent hover:border-blue-100 transition-all">
                        <Edit3 size={16} />
                      </button>
                      <button title="Delete Record" className="p-2 hover:bg-white rounded-xl text-zinc-400 hover:text-red-500 shadow-sm border border-transparent hover:border-red-100 transition-all">
                        <Trash2 size={16} />
                      </button>
                    </div>
                    {/* Fallback for touch devices */}
                    <div className="lg:hidden">
                       <MoreHorizontal size={20} className="text-zinc-300" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SalesReports;