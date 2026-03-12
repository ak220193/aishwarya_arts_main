"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import AccountSidebar from "../../components/profile/AccountSidebar";
import { Loader2, PackageOpen } from "lucide-react"; // Optional for better UX

const Page = () => {
  // 1. Backend Data State
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // 2. Fetch Orders from Backend
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
      <div className="h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="animate-spin text-amber-700" size={40} />
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-10 font-outfit">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <AccountSidebar />

          <section className="lg:col-span-3 space-y-6">
            <div className="flex items-center justify-between bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h1 className="text-2xl font-bold text-gray-800">Order History</h1>
              <p className="text-sm text-gray-500">{orders.length} total orders</p>
            </div>

            {orders.length === 0 ? (
              <div className="bg-white rounded-2xl p-20 text-center border border-gray-100">
                <PackageOpen className="mx-auto text-gray-300 mb-4" size={48} />
                <p className="text-gray-500">You haven't placed any orders yet.</p>
                <Link href="/collections" className="text-amber-700 font-bold mt-4 inline-block hover:underline">
                  Browse Collection
                </Link>
              </div>
            ) : (
              orders.map((order) => {
                // Get the first item to show on the main card
                const firstItem = order.orderItems[0];

                return (
                  <div
                    key={order._id}
                    className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:border-amber-200 transition-colors"
                  >
                    {/* Order Header */}
                    <div className="bg-gray-50/50 px-6 py-4 border-b border-gray-100 flex flex-wrap justify-between items-center gap-4">
                      <div className="flex gap-8">
                        <div>
                          <p className="text-[10px] uppercase tracking-wider text-gray-500 font-bold">Order ID</p>
                          <p className="text-sm font-semibold text-gray-800">{order.orderId || order._id.slice(-8).toUpperCase()}</p>
                        </div>
                        <div>
                          <p className="text-[10px] uppercase tracking-wider text-gray-500 font-bold">Date Placed</p>
                          <p className="text-sm font-semibold text-gray-800">
                            {new Date(order.createdAt).toLocaleDateString("en-IN", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            })}
                          </p>
                        </div>
                        <div>
                          <p className="text-[10px] uppercase tracking-wider text-gray-500 font-bold">Total Amount</p>
                          <p className="text-sm font-bold text-amber-700">₹{order.totalAmount.toLocaleString("en-IN")}</p>
                        </div>
                      </div>
                      <StatusBadge status={order.orderStatus} />
                    </div>

                    {/* Order Body */}
                    <div className="p-6 flex flex-col md:flex-row justify-between items-center gap-6">
                      <div className="flex items-center gap-4">
                        <div className="w-20 h-20 bg-gray-100 rounded-xl overflow-hidden border border-gray-100 shrink-0 relative">
                          {firstItem?.image ? (
                            <Image
                              src={firstItem.image}
                              alt={firstItem.title}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-slate-200" />
                          )}
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-800 line-clamp-1">
                            {firstItem?.title || "Artwork Purchase"}
                            {order.orderItems.length > 1 && ` +${order.orderItems.length - 1} more`}
                          </h3>
                          <p className="text-sm text-gray-500 mt-1">
                            Items: {order.orderItems.reduce((acc, item) => acc + item.quantity, 0)}
                          </p>
                          <Link
                            href={`/orders/${order._id}`}
                            className="text-amber-700 text-xs font-bold hover:underline mt-2 inline-block"
                          >
                            View Order Details
                          </Link>
                        </div>
                      </div>

                      <div className="flex gap-3 w-full md:w-auto">
                        <Link href={`/orders/${order._id}`} target="_blank">
                          <button className="flex-1 md:flex-none px-6 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold hover:bg-gray-50 transition-colors">
                            View Invoice
                          </button>
                        </Link>
                        <Link
                          href="/collections"
                          className="flex-1 md:flex-none px-6 py-2.5 rounded-xl bg-amber-700 text-white text-center text-sm font-semibold hover:bg-amber-800 transition-shadow shadow-sm"
                        >
                          Buy it again
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })
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
    Delivered: "bg-green-100 text-green-700",
    Processing: "bg-blue-100 text-blue-700",
    Cancelled: "bg-red-100 text-red-700",
    Shipped: "bg-purple-100 text-purple-700",
  };
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-bold ${styles[status] || "bg-gray-100 text-gray-600"}`}>
      {status || "Processing"}
    </span>
  );
};

export default Page;