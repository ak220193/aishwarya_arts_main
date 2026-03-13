"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import AccountSidebar from "../../components/profile/AccountSidebar";
import { Loader2, PackageOpen, ShoppingBag, Clock, CheckCircle2, Search, ArrowRight } from "lucide-react";

const Page = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch("/api/orders");
        const result = await res.json();
        if (result.success) {
          setOrders(result.data);
        }
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-zinc-50">
        <Loader2 className="animate-spin text-amber-700" size={40} />
      </div>
    );
  }

  return (
    <div className="bg-[#fcfcfc] min-h-screen py-12 font-outfit">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">

          {/* Sidebar */}
          <div className="hidden lg:block">
            <AccountSidebar />
          </div>

          <section className="lg:col-span-3 space-y-8">

            {/* --- ENHANCED DASHBOARD HEADER --- */}
            <header className="bg-white rounded-4xl p-8 border border-zinc-100 shadow-sm relative overflow-hidden">
              {/* Subtle Background Icon */}
              <ShoppingBag className="absolute -right-6 -bottom-6 text-zinc-50 size-48 -rotate-12 pointer-events-none" />

              <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-center gap-5">
                  <div className="p-4 bg-amber-50 rounded-2xl text-amber-700">
                    <ShoppingBag size={32} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h2 className="text-3xl font-semibold text-zinc-900 tracking-tight">Order History</h2>
                    <p className="text-zinc-800 font-medium mt-1">Manage and track your heritage acquisitions</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="px-6 py-3  bg-zinc-900 rounded-2xl text-center shadow-xl">
                    <p className="text-[10px] text-white uppercase font-bold tracking-widest">Total Orders</p>
                    <p className="text-2xl font-black text-amber-400">{orders.length}</p>
                  </div>
                </div>
              </div>

              {/* Quick Stats Mini-Row */}
              <div className="mt-8 pt-8 border-t border-zinc-50 flex flex-wrap gap-8">
                <div className="flex items-center gap-2 text-zinc-600 text-sm font-semibold">
                  <Clock size={16} className="text-blue-500" />
                  <span>{orders.filter(o => o.orderStatus !== 'Delivered').length} Active</span>
                </div>
                <div className="flex items-center gap-2 text-zinc-600 text-sm font-semibold">
                  <CheckCircle2 size={16} className="text-emerald-500" />
                  <span>{orders.filter(o => o.orderStatus === 'Delivered').length} Delivered</span>
                </div>
              </div>
            </header>

            {/* --- ORDER LISTING --- */}
            {orders.length === 0 ? (
              <div className="bg-white rounded-[2.5rem] p-24 text-center border border-dashed border-zinc-200">
                <div className="w-20 h-20 bg-zinc-50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <PackageOpen className="text-zinc-300" size={40} />
                </div>
                <h3 className="text-xl font-bold text-zinc-800">No orders found</h3>
                <p className="text-zinc-500 mt-2 max-w-xs mx-auto">It looks like you haven't started your collection with us yet.</p>
                <Link href="/collections" className="bg-zinc-900 text-white px-8 py-3 rounded-full font-bold mt-8 inline-block hover:bg-amber-700 transition-colors">
                  Start Browsing
                </Link>
              </div>
            ) : (
              <div className="space-y-6">
                {orders.map((order) => {
                  const firstItem = order.orderItems[0];
                  return (
                    <div
                      key={order._id}
                      className="group bg-white rounded-3xl border border-zinc-100 hover:border-amber-200 transition-all duration-300 overflow-hidden"
                    >
                      {/* Top Bar */}
                      <div className="bg-zinc-50/50 px-8 py-5 border-b border-zinc-100 flex flex-wrap justify-between items-center gap-6">
                        <div className="flex items-center gap-10">
                          <div className="space-y-1">
                            <span className="text-md  font-semibold text-zinc-900 tracking-tight">Transaction ID</span>
                            <p className="text-xl font-semibold uppercase text-zinc-900">#{order.orderId || order._id.slice(-8).to()}</p>
                          </div>
                          <div className="space-y-1">
                            <span className="text-md  font-semibold text-zinc-900 tracking-tight">Purchase Date</span>
                            <p className="text-xl font-semibold text-zinc-900">
                              {new Date(order.createdAt).toLocaleDateString("en-IN", { day: '2-digit', month: 'short', year: 'numeric' })}
                            </p>
                          </div>
                          <div className="space-y-1">
                            <span className="text-md font-semibold text-zinc-900 tracking-tight">Investment</span>
                            <p className="text-xl font-semibold text-amber-900">₹{order.totalAmount.toLocaleString("en-IN")}</p>
                          </div>
                        </div>
                        <StatusBadge status={order.orderStatus} />
                      </div>

                      {/* Content Area */}
                      <div className="p-8 flex flex-col md:flex-row items-center justify-between gap-8">
                        <div className="flex items-center gap-6">
                          <div className="relative w-24 h-24 bg-zinc-50 rounded-2xl overflow-hidden border border-zinc-100">
                            {firstItem?.image ? (
                              <Image src={firstItem.image} alt={firstItem.title} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                            ) : (
                              <div className="w-full h-full bg-zinc-200" />
                            )}
                          </div>
                          <div className="space-y-1">
                            <h4 className="text-lg font-bold text-zinc-900 leading-tight">
                              {firstItem?.title || "Aishwarya Arts Piece"}
                              {order.orderItems.length > 1 && <span className="text-amber-600 font-medium ml-2 text-sm">+{order.orderItems.length - 1} More</span>}
                            </h4>
                            <p className="text-zinc-900 text-md font-semibold italic">Hand-crafted Tanjore Masterpiece</p>
                            <div className="pt-2">
                              <Link href={`/orders/${order._id}`} className="inline-flex items-center gap-1 text-[11px] font-black uppercase text-amber-700 tracking-widest hover:text-zinc-900 transition-colors">
                                Track Detail <ArrowRight size={12} />
                              </Link>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 w-full md:w-auto">
                          <Link href={`/orders/${order._id}`} className="flex-1">
                            <button className="w-full px-8 py-3 rounded-xl border border-zinc-200 text-xs font-semibold uppercase tracking-wide hover:bg-zinc-900 hover:text-white transition-all">
                              Invoice
                            </button>
                          </Link>
                          <Link href="/collections" className="flex-1">
                            <button className="w-full px-8 py-3 rounded-xl bg-amber-700 text-white text-xs font-semibold uppercase tracking-widest hover:bg-amber-800 shadow-lg shadow-amber-700/10 transition-all">
                              Reorder
                            </button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

// Reusable Components
const StatusBadge = ({ status }) => {
  const styles = {
    Delivered: "bg-emerald-50 text-emerald-700 border-emerald-100",
    Processing: "bg-blue-50 text-blue-700 border-blue-100",
    Cancelled: "bg-red-50 text-red-700 border-red-100",
    Shipped: "bg-amber-50 text-amber-700 border-amber-100",
  };
  return (
    <span className={`px-4 py-1.5 rounded-full text-sm font-semibold uppercase tracking-wide border ${styles[status] || "bg-zinc-50 text-zinc-600 border-zinc-100"}`}>
      {status || "Active"}
    </span>
  );
};

export default Page;