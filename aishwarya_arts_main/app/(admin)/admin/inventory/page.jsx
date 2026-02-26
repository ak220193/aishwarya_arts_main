"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { 
  Search, Edit3, Eye, Trash2, 
  Plus, Layers, Clock
} from "lucide-react";
import Link from "next/link";

const InventoryTable = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  // 1. FETCH LIVE SIGNAL FROM DB
  const fetchInventory = async () => {
    try {
      const res = await axios.get("/api/admin/products");
      // Responding with the data array we calibrated in Phase 1
      setProducts(res.data.data || []);
    } catch (err) {
      toast.error("Handshake failed: Could not fetch inventory");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  // 2. SEARCH CALIBRATION
  const filteredProducts = products.filter(p => 
    p.sku?.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.title?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-8 animate-in fade-in duration-1000">
      
      {/* TOP STATS & ACTIONS */}
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
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-white border border-zinc-200 rounded-2xl py-3 pl-12 pr-6 text-sm font-medium outline-none focus:ring-4 focus:ring-amber-500/5 focus:border-amber-500/30 transition-all w-full"
            />
          </div>
          <Link href="/admin/add-product" className="p-3.5 bg-zinc-800 text-white rounded-2xl hover:bg-amber-600 transition-all shadow-xl w-full sm:w-auto flex justify-center">
            <Plus size={20} />
          </Link>
        </div>
      </div>

      {/* THE DATA TABLE */}
      <div className="bg-white rounded-3xl sm:rounded-[2.5rem] border border-zinc-100 shadow-sm overflow-hidden min-h-[400px]">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-64 space-y-4">
             <Clock className="animate-spin text-amber-500" size={32} />
             <p className="uppercase text-[10px] font-bold tracking-widest text-zinc-400">Syncing Live Signals...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="bg-zinc-50/50 border-b border-zinc-100">
                  <th className="p-4 sm:p-6 text-[13px] font-semibold text-zinc-900 uppercase tracking-widest pl-10">S.No</th>
                  <th className="p-4 sm:p-6 text-[13px] font-semibold text-zinc-900 uppercase tracking-widest">Products</th>
                  <th className="p-4 sm:p-6 text-[13px] font-semibold text-zinc-900 uppercase tracking-widest text-center">SKU ID</th>
                  <th className="p-4 sm:p-6 text-[13px] font-semibold text-zinc-900 uppercase tracking-widest">Category</th>
                  <th className="p-4 sm:p-6 text-[13px] font-semibold text-zinc-900 uppercase tracking-widest">Status</th>
                  <th className="p-4 sm:p-6 text-[13px] font-semibold text-zinc-900 uppercase tracking-widest text-right pr-10">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-50">
                {filteredProducts.map((item, index) => (
                  <tr key={item._id} className="group hover:bg-zinc-50/50 transition-all duration-300">
                    <td className="p-4 sm:p-6 pl-10 text-sm font-semibold text-zinc-900">{index + 1}</td>
                    
                    <td className="p-4 sm:px-6">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-2xl overflow-hidden border border-zinc-100 shadow-sm bg-zinc-100">
                          <img src={item.images[0]} alt={item.title} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500" />
                        </div>
                        <p className="text-sm font-semibold text-zinc-800 leading-tight max-w-[200px] truncate">{item.title}</p>
                      </div>
                    </td>

                    <td className="p-4 text-center">
                      <span className="px-3 py-1 bg-zinc-100 rounded-lg text-[13px] font-semibold text-zinc-800 uppercase">
                        {item.sku}
                      </span>
                    </td>

                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <Layers size={14} className="text-zinc-300 shrink-0" />
                        <span className="text-sm font-semibold text-zinc-800 uppercase">{item.workStyle || "Tanjore"}</span>
                      </div>
                    </td>

                    <td className="p-4">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-1.5">
                          <div className={`w-1.5 h-1.5 rounded-full ${item.inStock ? "bg-green-500" : "bg-red-500 animate-pulse"}`} />
                          <span className="text-[12px] font-bold text-zinc-400 uppercase">
                            {item.inStock ? "In Stock" : "Out of Stock"}
                          </span>
                        </div>
                        <span className="text-xs font-bold text-zinc-800 italic">₹{item.price?.toLocaleString()}</span>
                      </div>
                    </td>

                    <td className="p-4 text-right pr-10">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-2.5 bg-white border border-zinc-200 rounded-xl text-zinc-400 hover:text-amber-600 shadow-sm transition-all"><Eye size={16} /></button>
                        <button className="p-2.5 bg-white border border-zinc-200 rounded-xl text-zinc-400 hover:text-red-500 shadow-sm transition-all"><Trash2 size={16} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default InventoryTable;