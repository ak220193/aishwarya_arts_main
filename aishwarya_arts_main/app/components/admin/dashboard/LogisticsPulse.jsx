"use client";
import React from "react";
import { Truck, Clock, AlertCircle, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const delayedOrders = [
  { id: "ORD-9901", patron: "TT Art Gallery", status: "Delayed", days: 4, location: "Chennai" },
  { id: "ORD-9905", patron: "Mangala Arts", status: "In Transit", days: 2, location: "Mumbai" },
];

const LogisticsPulse = () => {
  return (
    <div className="bg-white rounded-[2.5rem] p-8 border border-zinc-100 shadow-sm h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
            <Truck size={18} />
          </div>
          <h2 className="text-lg font-bold text-zinc-900 leading-none">Logistics Pulse</h2>
        </div>
        <span className="text-[10px] font-semibold text-zinc-800 uppercase tracking-[0.2em]">Live Tracking</span>
      </div>

      <div className="flex-1 space-y-4">
        {delayedOrders.map((order) => (
          <div key={order.id} className="p-4 rounded-2xl bg-zinc-50 border border-zinc-100 flex items-center justify-between group hover:border-blue-200 transition-all">
            <div className="flex items-center gap-3">
              <div className={`p-1.5 rounded-full ${order.status === 'Delayed' ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'}`}>
                <Clock size={14} />
              </div>
              <div>
                <p className="text-sm font-bold text-zinc-900">{order.patron}</p>
                <p className="text-[12px] text-zinc-800 font-medium  tracking-tighter">{order.id} • {order.location}</p>
              </div>
            </div>
            <div className="text-right">
              <p className={`text-xs font-black ${order.status === 'Delayed' ? 'text-red-600' : 'text-blue-600'}`}>
                {order.days} Days
              </p>
              <p className="text-[10px] text-zinc-800 font-medium">{order.status}</p>
            </div>
          </div>
        ))}
      </div>

      <button className="w-full mt-6 py-3 bg-zinc-900 text-white text-[10px] font-bold uppercase tracking-[0.2em] rounded-xl hover:bg-zinc-800 transition-all flex items-center justify-center gap-2">
        Full Logistics View <ArrowRight size={14} />
      </button>
    </div>
  );
};

export default LogisticsPulse;