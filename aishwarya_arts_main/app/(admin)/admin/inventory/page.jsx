"use client";
import React from "react";
import { 
  Search, Filter, Edit3, Eye, Trash2, 
  Plus, MoreVertical, Package, Layers,
  AlertCircle, ChevronRight, Frame
} from "lucide-react";

const inventoryData = [
  {
    sNo: "01",
    sku: "GA3D01",
    name: "Raja Alangara Ganesha",
    image: "https://i.pinimg.com/1200x/ae/9b/72/ae9b72b10034ea10397ac96f7abb0287.jpg",
    category: "3D Tanjore",
    stock: 12,
    accessories: ["Teak Wood Frame", "Glass Cover"],
    status: "In Stock"
  },
  {
    sNo: "02",
    sku: "KR01",
    name: "Krishna Rasa Leela",
    image: "https://i.pinimg.com/736x/b7/57/0c/b7570c2868e72717ce38f99e6756c25d.jpg",
    category: "Classical Flat",
    stock: 2,
    accessories: ["Rose Wood Frame"],
    status: "Low Stock"
  }
];

const InventoryTable = () => {
  return (
    // max-w-7xl added to match your previous layout requirements while maintaining responsiveness
    <div className=" px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-8 animate-in fade-in duration-1000">
      
      {/* 1. TOP STATS & ACTIONS - Responsive stacking */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 px-2 sm:px-5">
        <div className="w-full md:w-auto">
          <h2 className="text-2xl sm:text-3xl font-semibold text-zinc-800 tracking-wide uppercase">Inventory Control</h2>
          <p className="text-sm text-zinc-800 font-semibold tracking-normal mt-1">Real-time Stock Synchronization</p>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
          <div className="relative group w-full sm:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-amber-500 transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Search SKU or Artwork..." 
              className="bg-white border border-zinc-200 rounded-2xl py-3 pl-12 pr-6 text-sm font-medium outline-none focus:ring-4 focus:ring-amber-500/5 focus:border-amber-500/30 transition-all w-full"
            />
          </div>
          <button className="p-3.5 bg-zinc-800 text-white rounded-2xl hover:bg-amber-600 transition-all shadow-xl w-full sm:w-auto flex justify-center">
            <Plus size={20} />
          </button>
        </div>
      </div>

      {/* 2. THE DATA TABLE - Horizontal scroll for small screens */}
      <div className="bg-white rounded-3xl sm:rounded-[2.5rem] border border-zinc-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto scrollbar-hide">
          <table className="w-full text-left border-collapse min-w-200">
            <thead>
              <tr className="bg-zinc-50/50 border-b border-zinc-100">
                <th className="p-4 sm:p-6 text-[13px] sm:text-[15px] font-semibold text-zinc-900 uppercase tracking-widest pl-6 sm:pl-10">S.No</th>
                <th className="p-4 sm:p-6 text-[13px] sm:text-[15px] font-semibold text-zinc-900 uppercase tracking-widest">Products</th>
                <th className="p-4 sm:p-6 text-[13px] sm:text-[15px] font-semibold text-zinc-900 uppercase tracking-widest text-center">SKU ID</th>
                <th className="p-4 sm:p-6 text-[13px] sm:text-[15px] font-semibold text-zinc-900 uppercase tracking-widest">Category</th>
                <th className="p-4 sm:p-6 text-[13px] sm:text-[15px] font-semibold text-zinc-900 uppercase tracking-widest">Available Units</th>
                <th className="p-4 sm:p-6 text-[13px] sm:text-[15px] font-semibold text-zinc-900 uppercase tracking-widest text-right pr-6 sm:pr-10">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-50">
              {inventoryData.map((item) => (
                <tr key={item.sku} className="group hover:bg-zinc-50/50 transition-all duration-300">
                  <td className="p-4 sm:p-6 pl-6 sm:pl-10 text-sm font-semibold text-zinc-900">{item.sNo}</td>
                  
                  <td className="p-4 sm:px-10">
                    <div className="flex items-center gap-2 sm:gap-4">
                      <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl overflow-hidden border border-zinc-100 shadow-sm bg-zinc-100 ">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      </div>
                      <p className="text-sm sm:text-md font-semibold text-zinc-800 leading-tight line-clamp-1">{item.name}</p>
                    </div>
                  </td>

                  <td className="p-4 sm:px-10 text-center">
                    <span className="px-3 py-1 bg-zinc-100 rounded-lg text-[12px] sm:text-[15px] font-semibold text-zinc-800 uppercase tracking-tighter">
                      {item.sku}
                    </span>
                  </td>

                  <td className="p-4 sm:p-10">
                    <div className="flex items-center gap-2">
                      <Layers size={14} className="text-zinc-300 shrink-0" />
                      <span className="text-sm sm:text-md font-semibold text-zinc-800 uppercase tracking-normal whitespace-nowrap">{item.category}</span>
                    </div>
                  </td>

                  <td className="p-4 sm:p-6">
                    <div className="flex flex-col gap-1">
                      <span className={`text-sm sm:text-md font-semibold whitespace-nowrap ${item.stock < 5 ? "text-red-500" : "text-zinc-800"}`}>
                        {item.stock} Units
                      </span>
                      <div className="flex items-center gap-1.5">
                        <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${item.stock < 5 ? "bg-red-500 animate-pulse" : "bg-green-500"}`} />
                        <span className="text-[10px] sm:text-[12px] font-bold text-zinc-400 uppercase">{item.status}</span>
                      </div>
                    </div>
                  </td>

                  <td className="p-4 sm:p-6 text-right pr-6 sm:pr-10">
                    <div className="flex items-center justify-end gap-2 transition-all duration-300">
                      <button className="p-2 sm:p-2.5 bg-white border border-zinc-200 rounded-xl text-zinc-400 hover:text-amber-600 shadow-sm transition-all"><Eye size={16} /></button>
                      <button className="p-2 sm:p-2.5 bg-white border border-zinc-200 rounded-xl text-zinc-400 hover:text-blue-600 shadow-sm transition-all"><Edit3 size={16} /></button>
                      <button className="p-2 sm:p-2.5 bg-white border border-zinc-200 rounded-xl text-zinc-400 hover:text-red-500 shadow-sm transition-all"><Trash2 size={16} /></button>
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

export default InventoryTable;