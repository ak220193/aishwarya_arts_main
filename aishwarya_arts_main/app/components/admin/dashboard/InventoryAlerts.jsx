"use client";
import React from "react";
import { AlertTriangle, ArrowRight, Box } from "lucide-react";
import { motion } from "framer-motion";

const lowStockItems = [
  { id: 1, name: "Goddess Lakshmi (Gold Leaf)", stock: 2, category: "Deity Series" },
  { id: 2, name: "Teakwood Frame (Large)", stock: 1, category: "Accessories" },
  { id: 3, name: "Krishna Rasa Leela (Mini)", stock: 0, category: "Miniatures" },
];

const InventoryAlerts = () => {
  return (
    <div className="bg-white rounded-[2.5rem] p-8 border border-red-50 shadow-sm h-full">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-red-50 text-red-600 rounded-lg">
            <AlertTriangle size={18} />
          </div>
          <h2 className="text-lg font-bold text-zinc-900">Inventory Alerts</h2>
        </div>
        <span className="bg-red-50 text-red-600 text-[10px] font-black px-2 py-1 rounded-full uppercase tracking-widest">
          {lowStockItems.length} Critical
        </span>
      </div>

      <div className="space-y-4">
        {lowStockItems.map((item) => (
          <div key={item.id} className="flex items-center justify-between p-4 rounded-2xl bg-zinc-50 border border-zinc-100 group hover:border-red-200 transition-all">
            <div className="flex items-center gap-3">
              <Box size={16} className="text-zinc-400" />
              <div>
                <p className="text-sm font-bold text-zinc-900">{item.name}</p>
                <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-tighter">{item.category}</p>
              </div>
            </div>
            <div className="text-right">
              <p className={`text-xs font-black ${item.stock === 0 ? "text-red-600" : "text-amber-600"}`}>
                {item.stock === 0 ? "Out of Stock" : `${item.stock} Left`}
              </p>
            </div>
          </div>
        ))}
      </div>

      <button className="w-full mt-6 flex items-center justify-center gap-2 text-[10px] font-bold text-zinc-400 uppercase tracking-widest hover:text-red-600 transition-colors">
        Manage Inventory <ArrowRight size={14} />
      </button>
    </div>
  );
};

export default InventoryAlerts;