"use client";
import React from "react";
import { motion } from "framer-motion";
import { MoreHorizontal, Eye, Truck, CheckCircle2, Clock, Mail, Phone } from "lucide-react";


const ClientTable = () => {

    const tableData = [
  {
    id: "ORD-7241",
    name: "TT Art Gallery",
    email: "",
    phone: "+91 98450 12345",
    painting: "Goddess Lakshmi",
    amount: "₹45,000",
    status: "Shipped",
    date: "Feb 22, 2026"
  },
  {
    id: "ORD-7242",
    name: "Mangala Arts",
    email: "",
    phone: "+91 99001 88722",
    painting: "Krishna Rasa Leela",
    amount: "₹1,25,000",
    status: "Processing",
    date: "Feb 23, 2026"
  },
  {
    id: "ORD-7243",
    name: "Sandiv Art Gallery",
    email: "",
    phone: "+91 98860 55432",
    painting: "Tanjore Royal Court",
    amount: "₹85,000",
    status: "Delivered",
    date: "Feb 21, 2026"
  }
];

const StatusBadge = ({ status }) => {
  const styles = {
    Shipped: "bg-blue-50 text-blue-600 border-blue-100",
    Processing: "bg-amber-50 text-amber-600 border-amber-100",
    Delivered: "bg-green-50 text-green-600 border-green-100",
  };

  return (
    <span className={`px-3 py-1 rounded-full text-[10px] font-bold border ${styles[status]}`}>
      {status}
    </span>
  );
};


  return (
    <div className="bg-white rounded-[2.5rem] border border-zinc-100 shadow-sm overflow-hidden">
      <div className="p-8 border-b border-zinc-50 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-zinc-900 tracking-tight">Recent Orders & Customers</h2>
          <p className="text-[10px] text-zinc-800 font-bold uppercase tracking-widest mt-1">Management Ledger</p>
        </div>
        <button className="px-4 py-2 bg-zinc-900 text-white text-[10px] font-bold uppercase tracking-widest rounded-xl hover:bg-zinc-800 transition-all">
          Export CSV
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-zinc-50/50">
              <th className="p-5 text-[10px] font-semibold text-zinc-900 uppercase tracking-widest pl-8">Order ID</th>
              <th className="p-5 text-[10px] font-semibold text-zinc-900 uppercase tracking-widest">Patron Details</th>
              <th className="p-5 text-[10px] font-semibold text-zinc-900 uppercase tracking-widest">Artwork</th>
              <th className="p-5 text-[10px] font-semibold text-zinc-900 uppercase tracking-widest">Amount</th>
              <th className="p-5 text-[10px] font-semibold text-zinc-900 uppercase tracking-widest">Status</th>
              <th className="p-5 text-[10px] font-semibold text-zinc-900 uppercase tracking-widest text-right pr-8">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-50">
            {tableData.map((row, i) => (
              <motion.tr 
                key={row.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="hover:bg-amber-50/30 transition-colors group"
              >
                <td className="p-5 pl-8 text-xs font-bold text-amber-600">{row.id}</td>
                <td className="p-5">
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-zinc-900">{row.name}</span>
                    <div className="flex items-center gap-3 mt-1 text-zinc-800">
                      <span className="flex items-center gap-1 text-[12px] font-medium"><Mail size={10}/> {row.email}</span>
                      <span className="flex items-center gap-1 text-[12px] font-medium"><Phone size={10}/> {row.phone}</span>
                    </div>
                  </div>
                </td>
                <td className="p-5 text-xs font-medium text-zinc-800">{row.painting}</td>
                <td className="p-5 text-sm font-semibold text-zinc-900">{row.amount}</td>
                <td className="p-5">
                  <StatusBadge status={row.status} />
                </td>
                <td className="p-5 text-right pr-8">
                  <div className="flex items-center justify-end gap-2">
                    <button className="p-2 hover:bg-white rounded-lg text-zinc-400 hover:text-amber-600 shadow-sm border border-transparent hover:border-amber-100 transition-all">
                      <Eye size={16} />
                    </button>
                    <button className="p-2 hover:bg-white rounded-lg text-zinc-400 hover:text-zinc-900 shadow-sm border border-transparent hover:border-zinc-200 transition-all">
                      <MoreHorizontal size={16} />
                    </button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="p-6 bg-zinc-50/30 text-center">
        <button className="text-[10px] font-bold text-zinc-800 uppercase tracking-widest hover:text-amber-600 transition-colors">
          Show More Transactions
        </button>
      </div>
    </div>
  );
}

export default ClientTable