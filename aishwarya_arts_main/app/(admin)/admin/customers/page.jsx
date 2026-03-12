"use client";
import React, { useEffect, useState } from "react";
import {
  Search, Filter, Mail, Phone,
  MapPin, Download, ArrowUpRight,
  ShoppingBag, Users, TrendingUp,
  Crown, Loader2, CreditCard
} from "lucide-react";

const CustomersAdmin = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // 1. Correct Fetching Logic
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await fetch("/api/admin/customers");
        const result = await response.json();
        // Check if backend returned success and data
        if (result.success && result.data) {
          setCustomers(result.data);
        } else {
          console.error("Backend Error:", result.error);
        }
      } catch (error) {
        console.error("Network Error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCustomers();
  }, []);

  const getPaymentBadge = (status) => {
    return status === "Pending"
      ? "bg-red-50 text-red-500 border-red-100"
      : "bg-emerald-50 text-emerald-600 border-emerald-100";
  };

  // 2. Updated Filtering (using keys from your backend Lookup)
  const filteredCustomers = customers.filter(customer =>
    customer.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.phone?.includes(searchTerm)
  );

  if (loading) return (
    <div className="h-screen flex flex-col items-center justify-center bg-white">
      <Loader2 className="animate-spin text-zinc-900 mb-4" size={32} />
      <span className="text-zinc-400 font-semibold tracking-widest text-[10px] uppercase">
        Retrieving Patron Records...
      </span>
    </div>
  );

  const exportToCSV = () => {
  // 1. Define the headers for your CSV
  const headers = ["Idx,Name,Email,Phone,Location,Orders,TotalValue\n"];

  // 2. Map through your filtered customers to create rows
  const rows = filteredCustomers.map((c, index) => {
    return `${index + 1},"${c.name} ${c.lastName || ''}",${c.email || 'N/A'},${c.phone},"${c.location || 'N/A'}",${c.ordersCount},${c.totalValue}`;
  }).join("\n");

  // 3. Create the file content
  const csvContent = headers + rows;

  // 4. Create a Blob and trigger download
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  
  link.setAttribute("href", url);
  link.setAttribute("download", `Aishwarya_Arts_Patrons_${new Date().toLocaleDateString()}.csv`);
  link.style.visibility = "hidden";
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
  return (
    <div className="min-h-screen bg-[#fafafa] p-8 font-semibold text-zinc-900">

      {/* --- HEADER --- */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <div className="flex items-center gap-2 text-zinc-700 mb-4 font-semibold uppercase tracking-wide text-sm">
            <Users size={16} /> Patron Ledger
          </div>
          <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 leading-none">Customer Data</h1>
          <p className="text-zinc-700 text-md font-semibold italic mt-2  underline-offset-4 decoration-zinc-100">
            Aishwarya Arts Integrated Network
          </p>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 bg-black border border-zinc-200 rounded-xl text-xs font-semibold text-white cursor-pointer hover:scale-110" onClick={exportToCSV}>
          <Download size={14} /> Export Data
        </button>
      </div>

      {/* --- INSIGHTS --- */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
        <InsightCard
          label="Portfolio Value"
          value={`₹${customers.reduce((acc, c) => acc + c.totalValue, 0).toLocaleString()}`}
          icon={<TrendingUp size={18} />}
        />
        <InsightCard
          label="Total Patrons"
          value={customers.length}
          icon={<Users size={18} />}
        />
        <InsightCard
          label="Elite Circle"
          value={customers.filter(c => c.totalValue >= 100000).length}
          icon={<Crown size={18} />}
        />
        <InsightCard
          label="Acquisitions"
          value={customers.reduce((acc, c) => acc + c.ordersCount, 0)}
          icon={<ShoppingBag size={18} />}
        />
      </div>

      {/* --- TABLE CONTAINER --- */}
      <div className="bg-white rounded-3xl border border-zinc-200/60 shadow-[0_4px_20px_rgb(0,0,0,0.03)] overflow-hidden">
        <div className="p-6 border-b border-zinc-50 flex items-center justify-between">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-900" size={16} />
            <input
              type="text"
              placeholder="Search by name, email or phone..."
              className="w-full pl-12 pr-4 py-2.5 bg-zinc-50 border-none rounded-xl text-sm font-medium focus:ring-1 focus:ring-zinc-200 outline-none transition-all"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="p-2.5 text-zinc-900 hover:text-zinc-700 rounded-lg transition-all">
            <Filter size={18} />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-250">
            <thead>
              <tr className="bg-zinc-50/50">
                <th className="px-8 py-4 text-sm font-semibold uppercase tracking-wide text-zinc-900">S No</th>
                <th className="px-8 py-4 text-sm font-semibold uppercase tracking-wide text-zinc-900">Patron Identity</th>
                <th className="px-8 py-4 text-sm font-semibold uppercase tracking-wide text-zinc-900">Mail & Contact</th>
                <th className="px-8 py-4 text-sm font-semibold uppercase tracking-wide text-zinc-900">Location</th>
                <th className="px-8 py-4 text-sm font-semibold uppercase tracking-wide text-zinc-900">Account</th>
                <th className="px-8 py-4 text-sm font-semibold uppercase tracking-wide text-zinc-900 text-center">Works</th>
                <th className="px-8 py-4 text-sm font-semibold uppercase tracking-wide text-zinc-900 text-right">Value</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-50">
              {filteredCustomers.map((customer, index) => (
                <tr key={customer._id} className="hover:bg-zinc-50/50 transition-all group">
                  <td className="px-8 py-6 text-xs font-medium text-zinc-900 italic">{index + 1}</td>
                  <td className="px-8 py-6">
                    <span className="text-sm font-semibold text-zinc-900 uppercase tracking-tight">
                      {customer.name} {customer.lastName}
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    <div className="space-y-1 font-medium text-sm text-zinc-900">
                      <div className="flex items-center gap-2 italic lowercase font-semibold">
                        <Mail size={12} className="text-zinc-900" /> {customer.email || "No Email"}
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone size={12} className="text-zinc-900" /> {customer.phone}
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2 text-zinc-900 font-semibold text-sm uppercase">
                      <MapPin size={14} className="text-zinc-800" /> {customer.location || "Namakkal"}
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className={`text-sm font-semibold px-2.5 py-0.5 rounded-full border ${getPaymentBadge(customer.paymentStatus)}`}>
                      {customer.paymentStatus}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-center font-medium">
                    <span className="px-3 py-1 bg-white border border-zinc-200 rounded-lg text-[11px] text-zinc-600 shadow-sm">
                      {customer.ordersCount}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-right font-medium italic">
                    <span className="text-sm font-semibold text-zinc-900 tracking-tight">₹{customer.totalValue.toLocaleString()}</span>
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

const InsightCard = ({ label, value, icon }) => (
  <div className="bg-white p-6 rounded-3xl border border-zinc-200/60 shadow-sm flex items-center justify-between group transition-all">
    <div className="space-y-1">
      <p className="text-sm font-semibold uppercase text-zinc-800 tracking-wide mb-0.5">{label}</p>
      <h3 className="text-xl font-semibold text-zinc-900 tracking-tight">{value}</h3>
    </div>
    <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center text-zinc-900 group-hover:bg-zinc-900 group-hover:text-white transition-all shadow-inner">
      {icon}
    </div>
  </div>
);

export default CustomersAdmin;