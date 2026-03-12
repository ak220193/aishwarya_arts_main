"use client";
import React, { useEffect, useState } from "react";
import {
  Search, Filter, Mail, Phone,
  MapPin, Download, ArrowUpRight,
  Package, TrendingUp, Clock,
  CheckCircle2, Loader2
} from "lucide-react";
import Link from "next/link";

const OrdersAdmin = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch("/api/admin/orders");
        if (!res.ok) {
          throw new Error(`Server error: ${res.status}`);
        }
        const result = await res.json();
        if (result.success) {
          setOrders(result.data);
        }
      } catch (error) {
        console.error("Fetch error detail:", error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const getStatusStyle = (status) => {
    switch (status) {
      case "Processing": return "bg-blue-50 text-blue-600 border-blue-100";
      case "Shipped": return "bg-amber-50 text-amber-600 border-amber-100";
      case "Delivered": return "bg-emerald-50 text-emerald-600 border-emerald-100";
      default: return "bg-zinc-50 text-zinc-500 border-zinc-200";
    }
  };

  const filteredOrders = orders.filter(o =>
    o.orderId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    o.customerName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return (
    <div className="h-screen flex flex-col items-center justify-center bg-white">
      <Loader2 className="animate-spin text-zinc-900 mb-4" size={32} />
      <span className="text-zinc-400 font-semibold tracking-widest text-[10px] uppercase">Mapping Gallery Sales...</span>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#fafafa] p-8 font-outfit text-zinc-900">

      {/* --- HEADER --- */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <div className="flex items-center gap-2 text-zinc-900 mb-2 font-semibold uppercase tracking-wide text-sm">
            <Package size={16} /> Fulfillment Center
          </div>
          <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 leading-none">Order Management</h1>
          <p className="text-zinc-900 text-sm font-semibold italic mt-2">Overseeing logistics and payment reconciliations.</p>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 bg-zinc-900 text-white rounded-xl text-xs font-semibold hover:bg-black transition-all shadow-md">
          <Download size={14} /> Export data
        </button>
      </div>

      {/* --- INSIGHTS --- */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-10">
        <StatBox label="Active Orders" value={orders.filter(o => o.orderStatus === 'Processing').length} icon={<Clock size={16} />} />
        <StatBox label="Total Sales" value={`₹${orders.reduce((acc, o) => acc + o.totalAmount, 0).toLocaleString()}`} icon={<TrendingUp size={16} />} />
        <StatBox label="Completed" value={orders.filter(o => o.orderStatus === 'Delivered').length} icon={<CheckCircle2 size={16} />} />
        <StatBox label="Shipped Today" value={orders.filter(o => o.orderStatus === 'Shipped').length} icon={<Package size={16} />} />
      </div>

      {/* --- DATA TABLE --- */}
      <div className="bg-white rounded-3xl border border-zinc-200/60 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-zinc-50 flex items-center justify-between">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-900" size={16} />
            <input
              type="text"
              placeholder="Search by Order ID or Patron..."
              className="w-full pl-12 pr-4 py-3 bg-zinc-50 border-none rounded-2xl text-sm font-medium focus:ring-1 focus:ring-zinc-200 outline-none transition-all"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-275">
            <thead>
              <tr className="bg-zinc-50/50">
                <th className="px-8 py-4 text-sm font-semibold uppercase tracking-widest text-zinc-900">Order ID</th>
                <th className="px-8 py-4 text-sm font-semibold uppercase tracking-widest text-zinc-900">Customer Detail</th>
                <th className="px-8 py-4 text-sm font-semibold uppercase tracking-widest text-zinc-900">Payment</th>
                <th className="px-8 py-4 text-sm font-semibold uppercase tracking-widest text-zinc-900">Logistics</th>
                <th className="px-8 py-4 text-sm font-semibold uppercase tracking-widest text-zinc-900">Status</th>
                <th className="px-8 py-4 text-sm font-semibold uppercase tracking-widest text-zinc-900 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-50">
              {filteredOrders.map((order, idx) => (
                <tr key={order._id} className="hover:bg-zinc-50/50 transition-all group">
                  <td className="px-8 py-6">
                    <span className="text-sm font-semibold text-zinc-900 tracking-tight">{order.orderId}</span>
                    <p className="text-sm text-zinc-900 mt-1 font-medium italic">{new Date(order.createdAt).toDateString()}</p>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-zinc-800 uppercase tracking-tight">{order.customerName}</span>
                      <span className="text-sm text-zinc-900 font-medium lowercase italic">{order.email}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className="text-sm font-semibold text-zinc-900 tracking-tight">₹{order.totalAmount.toLocaleString()}</span>
                    <p className="text-sm text-zinc-900 mt-1 font-medium">{order.paymentMethod}</p>
                  </td>
                  <td className="px-8 py-6">
                    <span className={`text-sm font-semibold px-2.5 py-1 rounded-full border uppercase tracking-wider ${getStatusStyle(order.orderStatus)}`}>
                      {order.orderStatus}
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    <span className={`text-sm font-semibold px-2.5 py-1 rounded-full border uppercase tracking-wider ${order.paymentStatus === 'Pending' ? 'bg-red-50 text-red-600 border-red-100' : 'bg-emerald-50 text-emerald-600 border-emerald-100'
                      }`}>
                      {order.paymentStatus}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <Link
                      href={`/admin/orders/${order._id}`}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-zinc-200 text-zinc-600 rounded-xl text-[10px] font-semibold hover:border-zinc-900 hover:text-zinc-900 transition-all opacity-0 group-hover:opacity-100"
                    >
                      View Details <ArrowUpRight size={12} />
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

const StatBox = ({ label, value, icon }) => (
  <div className="bg-white p-6 rounded-3xl border border-zinc-200/60 shadow-sm flex items-center justify-between group transition-all hover:border-zinc-400">
    <div className="space-y-1">
      <p className="text-sm font-semibold uppercase text-zinc-900 tracking-wide">{label}</p>
      <h3 className="text-xl font-semibold text-zinc-900 tracking-tight leading-none">{value}</h3>
    </div>
    <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center text-zinc-900 group-hover:bg-zinc-900 group-hover:text-white transition-all shadow-inner">
      {icon}
    </div>
  </div>
);

export default OrdersAdmin;