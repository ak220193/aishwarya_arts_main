"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { 
    ArrowLeft, Truck, Package, 
    MapPin, Calendar, ExternalLink,
    ShieldCheck, Loader2
} from "lucide-react";
import Link from "next/link";

const ShippingDetails = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      const res = await fetch(`/api/admin/orders/${id}`);
      const result = await res.json();
      if (result.success) setOrder(result.data);
      setLoading(false);
    };
    fetchOrder();
  }, [id]);

  if (loading) return <div className="h-screen flex items-center justify-center font-outfit text-zinc-400">SYNCHRONIZING...</div>;

  return (
    <div className="min-h-screen bg-[#fafafa] p-8 lg:p-12 font-outfit text-zinc-900">
      
      {/* --- TOP BAR --- */}
      <div className="flex items-center justify-between mb-12">
        <Link href="/admin/shipping" className="flex items-center gap-2 text-zinc-400 hover:text-zinc-900 font-semibold text-sm transition-all">
          <ArrowLeft size={18} /> Manifest Overview
        </Link>
        <span className="text-[10px] font-semibold px-4 py-1.5 bg-zinc-900 text-white rounded-full uppercase tracking-[0.2em]">
            Internal Logistics Audit
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* Left: Shipment Info */}
        <div className="lg:col-span-2 space-y-10">
          
          <div className="space-y-2">
            <h1 className="text-4xl font-semibold tracking-tighter text-zinc-900 uppercase">
                {order.trackingId || "UNASSIGNED"}
            </h1>
            <p className="text-zinc-500 font-medium italic underline underline-offset-8 decoration-zinc-100">
                {order.logisticsPartner} • Last scanned {new Date(order.updatedAt).toLocaleDateString()}
            </p>
          </div>

          {/* Timeline View (Subtle UX) */}
          <div className="bg-white p-10 rounded-[2.5rem] border border-zinc-200/60 shadow-sm relative overflow-hidden">
            <h3 className="text-[10px] font-semibold uppercase tracking-widest text-zinc-400 mb-10">Transit Timeline</h3>
            
            <div className="space-y-12 relative z-10">
                <TimelineItem title="Delivered" date={order.updatedAt} active={order.orderStatus === "Delivered"} />
                <TimelineItem title="Out for Delivery" date={order.updatedAt} active={order.orderStatus === "Delivered"} />
                <TimelineItem title="In Transit" date={order.updatedAt} active={order.orderStatus === "Shipped"} />
                <TimelineItem title="Handed over to Carrier" date={order.updatedAt} active={true} />
            </div>
            
            {/* Background Icon */}
            <Truck className="absolute -bottom-10 -right-10 text-zinc-50 opacity-50" size={250} />
          </div>
        </div>

        {/* Right: Asset & Security */}
        <div className="space-y-6">
            <div className="bg-zinc-900 p-8 rounded-4xl text-white">
                <ShieldCheck className="text-emerald-400 mb-4" size={24} />
                <h4 className="text-sm font-semibold uppercase tracking-widest mb-2">Authenticated Shipment</h4>
                <p className="text-zinc-400 text-xs font-medium leading-relaxed">
                    This art piece has been verified by Aishwarya Arts Gallery and is traveling under tamper-proof packaging.
                </p>
            </div>

            <div className="bg-white p-8 rounded-4xl border border-zinc-200/60 shadow-sm">
                <h4 className="text-[10px] font-semibold text-zinc-400 uppercase tracking-widest mb-4">Patron Details</h4>
                <p className="text-sm font-semibold text-zinc-800">{order.shippingAddress.fullName}</p>
                <div className="mt-4 space-y-2">
                    <div className="flex items-center gap-2 text-xs text-zinc-500 font-medium">
                        <MapPin size={12} /> {order.shippingAddress.city}, {order.shippingAddress.state}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-zinc-500 font-medium">
                        <Calendar size={12} /> Ordered on {new Date(order.createdAt).toLocaleDateString()}
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

const TimelineItem = ({ title, date, active }) => (
    <div className={`flex gap-6 relative ${!active ? 'opacity-20 grayscale' : ''}`}>
        <div className={`w-3 h-3 rounded-full mt-1.5 z-10 ${active ? 'bg-zinc-900 shadow-[0_0_0_4px_white,0_0_0_8px_#f4f4f5]' : 'bg-zinc-200'}`} />
        <div>
            <p className="text-sm font-semibold text-zinc-900 leading-none">{title}</p>
            <p className="text-[10px] text-zinc-400 font-medium mt-1">{new Date(date).toDateString()}</p>
        </div>
    </div>
);

export default ShippingDetails;