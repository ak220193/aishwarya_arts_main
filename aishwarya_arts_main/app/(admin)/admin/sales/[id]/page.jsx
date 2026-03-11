"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { 
  ArrowLeft, MapPin, User, CreditCard, ShieldCheck, Printer, 
  ExternalLink, Package, Truck, CheckCircle2, Copy, Phone, 
  Mail, Hash, Clock, Landmark,
  AlertCircle
} from "lucide-react";
import { toast } from "react-hot-toast";

const OrderDetail = () => {
  const { id } = useParams();
  const router = useRouter();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrderDetail = async () => {
      try {
        const res = await fetch(`/api/admin/sales/${id}`);
        const data = await res.json();
        setOrder(data);
      } catch (error) {
        toast.error("Data Sync Failed");
      } finally {
        setLoading(false);
      }
    };
    fetchOrderDetail();
  }, [id]);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success("ID Copied");
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50">
      <div className="flex flex-col items-center gap-2">
        <div className="w-8 h-8 border-2 border-amber-600 border-t-transparent rounded-full animate-spin" />
        <p className="text-[10px] font-semibold uppercase tracking-widest text-zinc-500">Retrieving Transaction...</p>
      </div>
    </div>
  );

  return (
    <div className="max-w-[1600px] mx-auto p-6 space-y-6 font-outfit">
      
      {/* --- HEADER BAR --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => router.back()}
            className="p-2.5 bg-white border border-zinc-200 rounded-xl hover:bg-zinc-50 transition-all"
          >
            <ArrowLeft size={18} />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-semibold text-zinc-400 uppercase tracking-widest">Transaction Record</span>
              <span className="px-2 py-0.5 bg-zinc-100 text-zinc-600 text-[10px] font-bold rounded uppercase tracking-tighter">Verified</span>
            </div>
            <h1 className="text-xl font-semibold text-zinc-900 flex items-center gap-2">
              Order {order.orderId}
              <button onClick={() => copyToClipboard(order.orderId)} className="text-zinc-300 hover:text-amber-600"><Copy size={14} /></button>
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button onClick={() => window.print()} className="flex items-center gap-2 px-4 py-2 bg-white border border-zinc-200 text-zinc-600 rounded-xl text-[11px] font-semibold uppercase tracking-widest hover:border-amber-500 transition-all">
            <Printer size={14} /> Print Invoice
          </button>
          <button className="px-6 py-2 bg-zinc-900 text-white rounded-xl text-[11px] font-semibold uppercase tracking-widest hover:bg-amber-700 transition-all shadow-lg shadow-zinc-200">
            Dispatch Order
          </button>
        </div>
      </div>

      {/* --- MAIN DASHBOARD GRID --- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* COLUMN 1: PATRON INTELLIGENCE (LHS) */}
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-white border border-zinc-200 rounded-3xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center">
                <User size={20} />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-zinc-900">{order.name}</h3>
                <p className="text-[10px] text-zinc-400 font-semibold uppercase tracking-widest">Master Patron</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3 text-zinc-600">
                <div className="w-8 h-8 bg-zinc-50 rounded-lg flex items-center justify-center border border-zinc-100"><Mail size={14} /></div>
                <p className="text-xs font-medium truncate">{order.email}</p>
              </div>
              <div className="flex items-center gap-3 text-zinc-600">
                <div className="w-8 h-8 bg-zinc-50 rounded-lg flex items-center justify-center border border-zinc-100"><Phone size={14} /></div>
                <p className="text-xs font-semibold">{order.contact}</p>
              </div>
              <div className="flex items-start gap-3 text-zinc-600 pt-4 border-t border-zinc-50">
                <div className="w-8 h-8 bg-zinc-50 rounded-lg flex items-center justify-center border border-zinc-100 mt-1"><MapPin size={14} /></div>
                <p className="text-xs font-medium leading-relaxed">{order.location}</p>
              </div>
            </div>
          </div>

          <div className="bg-zinc-900 rounded-3xl p-6 text-white overflow-hidden relative">
            <Landmark size={80} className="absolute -bottom-4 -right-4 opacity-10" />
            <h4 className="text-[10px] font-semibold text-zinc-500 uppercase tracking-[0.2em] mb-4">Financial Status</h4>
            <div className="space-y-1">
              <p className="text-2xl font-semibold text-white">{order.amount}</p>
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${order.paymentStatus === 'Paid' ? 'bg-green-500' : 'bg-amber-500'}`} />
                <p className="text-[10px] font-semibold uppercase text-zinc-400">{order.paymentStatus} via {order.method}</p>
              </div>
            </div>
          </div>
        </div>

        {/* COLUMN 2: ARTWORK SPECS (CENTER) */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-white border border-zinc-200 rounded-[2.5rem] p-8 shadow-sm">
            <div className="flex justify-between items-start mb-6">
              <div>
                <p className="text-[10px] font-semibold text-amber-600 uppercase tracking-[0.2em] mb-1">Stock Item</p>
                <h2 className="text-2xl font-semibold text-zinc-900 tracking-tight italic">{order.artwork}</h2>
              </div>
              <button className="p-2.5 bg-zinc-50 text-zinc-400 rounded-xl hover:text-zinc-900 border border-zinc-100">
                <ExternalLink size={16} />
              </button>
            </div>

            {/* Admin Checklist UI */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
              {[
                { label: "Frame Material", val: "A-Grade Teakwood", icon: ShieldCheck },
                { label: "Surface Finish", val: "22K Pure Gold Foil", icon: CheckCircle2 },
                { label: "Packing Status", val: "Multi-Layer Fragile", icon: Package },
                { label: "Verification", val: "Aishwarya Arts Certified", icon: ShieldCheck },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 p-4 bg-zinc-50 rounded-2xl border border-zinc-100/50">
                  <div className="p-2 bg-white rounded-lg shadow-sm text-amber-600"><item.icon size={16} /></div>
                  <div>
                    <p className="text-[9px] font-semibold text-zinc-400 uppercase tracking-widest">{item.label}</p>
                    <p className="text-xs font-semibold text-zinc-800">{item.val}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white border border-zinc-200 rounded-[2.5rem] p-8 flex items-center justify-between shadow-sm">
             <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center"><CheckCircle2 size={24} /></div>
                <div>
                   <p className="text-sm font-semibold text-zinc-900">Final Inspection Passed</p>
                   <p className="text-[10px] text-zinc-400 font-semibold uppercase tracking-widest">System Timestamp: 11 March 2026</p>
                </div>
             </div>
             <button className="text-xs font-semibold text-amber-600 underline">View Quality Logs</button>
          </div>
        </div>

        {/* COLUMN 3: LOGISTICS CONTROL (RHS) */}
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-white border border-zinc-200 rounded-3xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h4 className="text-[10px] font-semibold text-zinc-400 uppercase tracking-widest">Shipping Workflow</h4>
              <Truck size={16} className="text-zinc-300" />
            </div>

            <div className="relative pl-6 space-y-8">
               {/* Vertical Tracker Line */}
               <div className="absolute left-1.5 top-1.5 bottom-1.5 w-[2px] bg-zinc-100" />
               
               <div className="relative">
                  <div className="absolute -left-6 top-1 w-3 h-3 rounded-full bg-amber-500 ring-4 ring-amber-50" />
                  <p className="text-[10px] font-semibold text-zinc-400 uppercase tracking-widest">Order Logged</p>
                  <p className="text-xs font-semibold text-zinc-800">{order.date}</p>
               </div>
               
               <div className="relative">
                  <div className="absolute -left-6 top-1 w-3 h-3 rounded-full bg-zinc-200" />
                  <p className="text-[10px] font-semibold text-zinc-400 uppercase tracking-widest">Packing & Framing</p>
                  <p className="text-xs font-semibold text-zinc-400 italic">In Progress...</p>
               </div>

               <div className="relative">
                  <div className="absolute -left-6 top-1 w-3 h-3 rounded-full bg-zinc-200" />
                  <p className="text-[10px] font-semibold text-zinc-400 uppercase tracking-widest">Shipment Dispatch</p>
                  <p className="text-xs font-semibold text-zinc-400 italic">Awaiting Courier</p>
               </div>
            </div>

            <div className="mt-8 space-y-3">
               <button className="w-full py-3 bg-zinc-100 text-zinc-900 rounded-xl text-[10px] font-semibold uppercase tracking-widest hover:bg-zinc-200 transition-all">
                  Assign BlueDart Tracking
               </button>
               <button className="w-full py-3 border border-zinc-200 text-zinc-400 rounded-xl text-[10px] font-semibold uppercase tracking-widest cursor-not-allowed">
                  Manifest Generated
               </button>
            </div>
          </div>

          <div className="p-4 bg-amber-50 border border-amber-100 rounded-2xl">
             <div className="flex gap-3">
                <AlertCircle size={16} className="text-amber-600 shrink-0" />
                <p className="text-[10px] font-medium text-amber-800 leading-relaxed">
                   <span className="font-bold">Admin Note:</span> This artwork requires wooden crate packaging for interstate transport.
                </p>
             </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default OrderDetail;