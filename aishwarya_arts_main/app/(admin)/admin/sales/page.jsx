"use client";
import React, { useEffect, useState, useMemo } from "react";
import { 
  Download, Search, Filter, Eye, Edit3, Trash2, 
  Mail, Phone, MapPin, CreditCard, Printer 
} from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

// Helpers & Components
import { downloadCSV, handlePrint, deleteOrder } from "../../../utils/salesHelpers";
import Modal from "../../../components/admin/Modal";

const SalesReports = () => {
  const router = useRouter();
  
  // State Management
  const [salesData, setSalesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Modal State
  const [activeModal, setActiveModal] = useState(null); // 'edit' | 'delete' | null
  const [selectedOrder, setSelectedOrder] = useState(null);

  // 1. Initial Data Fetch
  useEffect(() => {
    const fetchSales = async () => {
      try {
        const res = await fetch("/api/admin/sales");
        if (!res.ok) throw new Error("Fetch failed");
        const data = await res.json();
        setSalesData(data);
      } catch (error) {
        toast.error("Failed to sync with ledger");
        console.error("Fetch Error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSales();
  }, []);

  // 2. Search Optimization (useMemo)
  const filteredData = useMemo(() => {
    return salesData.filter(item => 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.artwork.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [salesData, searchQuery]);

  // 3. Action: Delete Logic
  const handleConfirmDelete = async () => {
    if (!selectedOrder) return;
    const loadingToast = toast.loading("Processing deletion...");
    
    try {
      const success = await deleteOrder(selectedOrder.orderId);
      if (success) {
        setSalesData(prev => prev.filter(item => item.orderId !== selectedOrder.orderId));
        toast.success("Transaction removed", { id: loadingToast });
        setActiveModal(null);
      } else {
        throw new Error();
      }
    } catch {
      toast.error("Error deleting record", { id: loadingToast });
    }
  };

  // 4. Action: Toggle Payment Status (Edit)
  const toggleStatus = async (order) => {
    const newStatus = order.paymentStatus === "Paid" ? "Pending" : "Paid";
    const loadingToast = toast.loading(`Updating to ${newStatus}...`);

    try {
      const res = await fetch(`/api/admin/sales/${order.orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ paymentStatus: newStatus }),
      });

      if (res.ok) {
        setSalesData(prev => prev.map(item => 
          item.orderId === order.orderId ? { ...item, paymentStatus: newStatus } : item
        ));
        toast.success(`Marked as ${newStatus}`, { id: loadingToast });
        setActiveModal(null);
      }
    } catch {
      toast.error("Update failed", { id: loadingToast });
    }
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center p-20 space-y-4">
      <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
      <p className="font-black text-zinc-900 uppercase tracking-widest text-xs">Syncing Aishwarya Arts Ledger...</p>
    </div>
  );

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-700">
      
      {/* ACTION BAR */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-zinc-900 tracking-tight">Sales Operations</h1>
          <p className="text-md text-zinc-600 font-bold  tracking-wide mt-1">Real-time Transactional Data</p>
        </div>
        <div className="flex items-center gap-3">
          {/* <button onClick={handlePrint} className="p-2.5 bg-white border border-zinc-200 text-zinc-500 rounded-xl hover:text-amber-600 transition-all shadow-sm">
            <Printer size={18} />
          </button> */}
          <button 
            onClick={() => downloadCSV(salesData)}
            className="flex items-center gap-2 bg-zinc-900 text-white px-5 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-amber-600 transition-all shadow-xl shadow-zinc-200"
          >
            <Download size={14} /> Download CSV
          </button>
        </div>
      </div>

      {/* TABLE CONTAINER */}
      <div className="bg-white rounded-[2.5rem] border border-zinc-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-zinc-50 flex items-center gap-4 bg-zinc-50/30">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-900" size={16} />
            <input 
              type="text" 
              placeholder="Filter by patron or artwork..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-zinc-200 rounded-2xl py-2.5 pl-11 text-sm outline-none focus:border-amber-500/30 focus:ring-4 focus:ring-amber-500/5 transition-all"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-250">
            <thead>
              <tr className="bg-zinc-50/50">
                <th className="p-5 text-md font-semibold text-zinc-900 uppercase tracking-wide pl-8">S.No</th>
                <th className="p-5 text-md font-semibold text-zinc-900 uppercase tracking-wide">Patron</th>
                <th className="p-5 text-md font-semibold text-zinc-900 uppercase tracking-wide">Contact</th>
                <th className="p-5 text-md font-semibold text-zinc-900 uppercase tracking-wide">Artwork & Order</th>
                <th className="p-5 text-md font-semibold text-zinc-900 uppercase tracking-wide">Status</th>
                <th className="p-5 text-md font-semibold text-zinc-900 uppercase tracking-wide text-right pr-8">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-50">
              {filteredData.map((row) => (
                <tr key={row.orderId} className="group hover:bg-amber-50/30 transition-all duration-300">
                  <td className="p-5 pl-8 text-xs font-bold text-zinc-800">{row.sNo}</td>
                  <td className="p-5">
                    <span className="text-sm font-bold text-zinc-900 block">{row.name}</span>
                    <span className="flex items-center gap-1 text-sm text-zinc-700 font-bold uppercase mt-1">
                      <MapPin size={8} /> {row.location}
                    </span>
                  </td>
                  <td className="p-5">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2 text-zinc-900 font-bold text-xs"><Phone size={12} className="text-zinc-700" /> {row.contact}</div>
                      <div className="flex items-center gap-2 text-zinc-900 text-sm font-semibold"><Mail size={12} className="text-zinc-700" /> {row.email}</div>
                    </div>
                  </td>
                  <td className="p-5">
                    <div className="flex flex-col">
                      <span className="text-md font-bold text-zinc-900">{row.artwork}</span>
                      <span className="text-sm text-zinc-800 font-bold">#{row.orderId}</span>
                      <div className="flex items-center gap-1.5 mt-1 text-sm font-bold text-amber-600 uppercase">
                         <CreditCard size={10} /> {row.method} • {row.amount}
                      </div>
                    </div>
                  </td>
                  <td className="p-5">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold uppercase tracking-widest border shadow-sm ${
                      row.paymentStatus === 'Paid' ? 'bg-green-50 text-green-600 border-green-100' : 'bg-amber-50 text-amber-600 border-amber-100'
                    }`}>
                      {row.paymentStatus}
                    </span>
                  </td>
                  <td className="p-5 text-right pr-8">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => router.push(`/admin/sales/${row.orderId}`)} className="p-2 hover:bg-white rounded-xl text-zinc-400 hover:text-amber-600 shadow-sm border border-transparent hover:border-amber-100 transition-all">
                        <Eye size={16} />
                      </button>
                      <button onClick={() => { setSelectedOrder(row); setActiveModal('edit'); }} className="p-2 hover:bg-white rounded-xl text-zinc-400 hover:text-blue-600 shadow-sm border border-transparent hover:border-blue-100 transition-all">
                        <Edit3 size={16} />
                      </button>
                      <button onClick={() => { setSelectedOrder(row); setActiveModal('delete'); }} className="p-2 hover:bg-white rounded-xl text-zinc-400 hover:text-red-500 shadow-sm border border-transparent hover:border-red-100 transition-all">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- REUSABLE MODAL BRIDGES --- */}

      {/* Delete Confirmation */}
      <Modal 
        isOpen={activeModal === 'delete'} 
        onClose={() => setActiveModal(null)} 
        title="Delete Transaction"
      >
        <div className="space-y-6">
          <p className="text-sm text-zinc-600 leading-relaxed">
            Are you sure you want to remove the record for <span className="font-bold text-zinc-900">{selectedOrder?.name}</span>? This will permanently delete the transaction history for order <span className="font-mono bg-zinc-100 px-1">#{selectedOrder?.orderId}</span>.
          </p>
          <div className="flex gap-3">
            <button onClick={() => setActiveModal(null)} className="flex-1 py-3 text-xs font-bold uppercase tracking-widest border border-zinc-200 rounded-2xl hover:bg-zinc-50 transition-all">Cancel</button>
            <button onClick={handleConfirmDelete} className="flex-1 py-3 bg-red-600 text-white text-xs font-bold uppercase tracking-widest rounded-2xl hover:bg-red-700 shadow-lg shadow-red-200 transition-all">Delete Forever</button>
          </div>
        </div>
      </Modal>

      {/* Edit (Status Toggle) Confirmation */}
      <Modal 
        isOpen={activeModal === 'edit'} 
        onClose={() => setActiveModal(null)} 
        title="Update Status"
      >
        <div className="space-y-6">
          <p className="text-sm text-zinc-600 leading-relaxed">
            Change payment status for <span className="font-bold text-zinc-900">{selectedOrder?.artwork}</span> to <span className="text-amber-600 font-bold">{selectedOrder?.paymentStatus === 'Paid' ? 'Pending' : 'Paid'}</span>?
          </p>
          <div className="flex gap-3">
            <button onClick={() => setActiveModal(null)} className="flex-1 py-3 text-xs font-bold uppercase tracking-widest border border-zinc-200 rounded-2xl">Cancel</button>
            <button onClick={() => toggleStatus(selectedOrder)} className="flex-1 py-3 bg-zinc-900 text-white text-xs font-bold uppercase tracking-widest rounded-2xl hover:bg-amber-600 transition-all shadow-xl shadow-zinc-200">Confirm Update</button>
          </div>
        </div>
      </Modal>

    </div>
  );
};

export default SalesReports;