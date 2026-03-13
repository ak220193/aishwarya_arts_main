"use client";
import React, { useEffect, useState } from "react";
import { 
  Truck, Search, Filter, Map, 
  ChevronRight, ArrowUpRight, Loader2,
  Box, CheckCircle2, AlertTriangle, Globe
} from "lucide-react";
import Link from "next/link";

const ShippingManifest = () => {
  const [shipments, setShipments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("In Transit");

  useEffect(() => {
    const fetchShipments = async () => {
      try {
        const res = await fetch("/api/admin/orders"); // Using existing orders API
        const result = await res.json();
        if (result.success) {
          // Filter only orders that have been Shipped or Delivered
          const logisticsOnly = result.data.filter(o => o.orderStatus !== "Processing");
          setShipments(logisticsOnly);
        }
      } catch (err) { console.error(err); } finally { setLoading(false); }
    };
    fetchShipments();
  }, []);

  if (loading) return (
    <div className="h-screen flex flex-col items-center justify-center bg-white">
      <Loader2 className="animate-spin text-zinc-900 mb-4" size={32} />
      <span className="text-zinc-400 font-semibold tracking-widest text-[10px] uppercase">Accessing Logistics Server...</span>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#fafafa] p-8 font-outfit text-zinc-900">
      
      {/* --- HEADER --- */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <div className="flex items-center gap-2 text-zinc-400 mb-2 font-semibold uppercase tracking-[0.2em] text-[10px]">
            <Globe size={16} /> Global Logistics
          </div>
          <h1 className="text-3xl font-semibold tracking-tight text-zinc-900">Shipping Manifest</h1>
          <p className="text-zinc-500 text-sm font-medium italic mt-2">Tracking the journey of Aishwarya Arts masterpieces.</p>
        </div>
      </div>

      {/* --- STATS GRID --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <StatCard label="Live Shipments" value={shipments.filter(s => s.orderStatus === "Shipped").length} icon={<Truck size={18}/>} />
        <StatCard label="Avg. Delivery Time" value="4.2 Days" icon={<Box size={18}/>} />
        <StatCard label="Successful Deliveries" value={shipments.filter(s => s.orderStatus === "Delivered").length} icon={<CheckCircle2 size={18}/>} />
      </div>

      {/* --- MANIFEST TABLE --- */}
      <div className="bg-white rounded-3xl border border-zinc-200/60 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-zinc-50/50">
                <th className="px-8 py-4 text-[10px] font-semibold uppercase tracking-widest text-zinc-400">Tracking ID</th>
                <th className="px-8 py-4 text-[10px] font-semibold uppercase tracking-widest text-zinc-400">Recipient / Region</th>
                <th className="px-8 py-4 text-[10px] font-semibold uppercase tracking-widest text-zinc-400">Carrier</th>
                <th className="px-8 py-4 text-[10px] font-semibold uppercase tracking-widest text-zinc-400">Last Update</th>
                <th className="px-8 py-4 text-[10px] font-semibold uppercase tracking-widest text-zinc-400">Status</th>
                <th className="px-8 py-4 text-[10px] font-semibold uppercase tracking-widest text-zinc-400 text-right">Route</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-50">
              {shipments.map((ship) => (
                <tr key={ship._id} className="hover:bg-zinc-50/50 transition-all group">
                  <td className="px-8 py-6">
                    <span className="text-xs font-mono font-semibold text-zinc-900 uppercase">
                        {ship.trackingId || "PENDING_ID"}
                    </span>
                    <p className="text-[10px] text-zinc-400 mt-1 font-medium">{ship.orderId}</p>
                  </td>
                  <td className="px-8 py-6">
                    <span className="text-sm font-semibold text-zinc-800">{ship.customerName}</span>
                    <p className="text-[11px] text-zinc-400 font-medium uppercase">{ship.shippingAddress.city}, {ship.shippingAddress.state}</p>
                  </td>
                  <td className="px-8 py-6 text-sm font-medium text-zinc-600">
                    {ship.logisticsPartner || "Unassigned"}
                  </td>
                  <td className="px-8 py-6 text-xs text-zinc-500 font-medium">
                    {new Date(ship.updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} • {new Date(ship.updatedAt).toLocaleDateString()}
                  </td>
                  <td className="px-8 py-6">
                    <span className={`text-[9px] font-semibold px-2.5 py-1 rounded-full border uppercase tracking-wider ${
                        ship.orderStatus === 'Delivered' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-amber-50 text-amber-600 border-amber-100'
                    }`}>
                      {ship.orderStatus}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <Link href={`/admin/shipping/${ship._id}`} className="p-2 inline-block bg-zinc-50 text-zinc-400 rounded-lg group-hover:bg-zinc-900 group-hover:text-white transition-all">
                      <ChevronRight size={16} />
                    </Link>
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

const StatCard = ({ label, value, icon }) => (
    <div className="bg-white p-6 rounded-3xl border border-zinc-200/60 shadow-sm flex items-center gap-4">
        <div className="w-10 h-10 bg-zinc-50 rounded-xl flex items-center justify-center text-zinc-400">{icon}</div>
        <div>
            <p className="text-[10px] font-semibold text-zinc-400 uppercase tracking-widest">{label}</p>
            <p className="text-xl font-semibold text-zinc-900 leading-none mt-1">{value}</p>
        </div>
    </div>
);

export default ShippingManifest;