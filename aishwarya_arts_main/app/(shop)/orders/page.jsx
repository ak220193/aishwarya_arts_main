import Image from "next/image";
import Link from "next/link";
import React from "react";
import AccountSidebar from "../../components/profile/AccountSidebar";

const Page = () => {
  const orders = [
    {
      id: "ORD-99210",
      date: "Oct 12, 2024",
      status: "Delivered",
      total: 12500,
      image: "/assets/products/painting-1.png", // Example path
      title: "Ganesha Tanjore Painting - 3D Gold Work",
      itemsCount: 1,
    },
    {
      id: "ORD-88125",
      date: "Feb 10, 2026",
      status: "Processing",
      total: 25000,
      image: "/assets/products/painting-2.png",
      title: "Lakshmi Saraswati Set - Classic Flat Work",
      itemsCount: 2,
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen py-10 font-outfit">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* ================= SIDEBAR ================= */}
          <AccountSidebar/>

          {/* ================= MAIN CONTENT (ORDERS) ================= */}
          <section className="lg:col-span-3 space-y-6">
            <div className="flex items-center justify-between bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h1 className="text-2xl font-bold text-gray-800">
                Order History
              </h1>
              <p className="text-sm text-gray-500">
                {orders.length} total orders
              </p>
            </div>

            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:border-amber-200 transition-colors"
              >
                {/* Order Header */}
                <div className="bg-gray-50/50 px-6 py-4 border-b border-gray-100 flex flex-wrap justify-between items-center gap-4">
                  <div className="flex gap-8">
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-gray-500 font-bold">
                        Order ID
                      </p>
                      <p className="text-sm font-semibold text-gray-800">
                        #{order.id}
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-gray-500 font-bold">
                        Date Placed
                      </p>
                      <p className="text-sm font-semibold text-gray-800">
                        {order.date}
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-gray-500 font-bold">
                        Total Amount
                      </p>
                      <p className="text-sm font-bold text-amber-700">
                        ₹{order.total.toLocaleString("en-IN")}
                      </p>
                    </div>
                  </div>
                  <StatusBadge status={order.status} />
                </div>

                {/* Order Body */}
                <div className="p-6 flex flex-col md:flex-row justify-between items-center gap-6">
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 bg-gray-100 rounded-xl overflow-hidden border border-gray-100 shrink-0">
                      <div className="w-full h-full bg-slate-200 animate-pulse" />
                      {/* Replace pulse div with <Image /> when ready */}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800 line-clamp-1">
                        {order.title}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                        Quantity: {order.itemsCount}
                      </p>
                      <Link
                        href={`/orders/${order.id}`}
                        className="text-amber-700 text-xs font-bold hover:underline mt-2 inline-block"
                      >
                        View Order Details
                      </Link>
                    </div>
                  </div>

                  <div className="flex gap-3 w-full md:w-auto">
                    <button className="flex-1 md:flex-none px-6 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold hover:bg-gray-50 transition-colors">
                      Invoice
                    </button>
                    <button className="flex-1 md:flex-none px-6 py-2.5 rounded-xl bg-amber-700 text-white text-sm font-semibold hover:bg-amber-800 transition-shadow shadow-sm">
                      Buy it again
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </section>
        </div>
      </div>
    </div>
  );
};

// Reusable Components for this page
const StatusBadge = ({ status }) => {
  const styles = {
    Delivered: "bg-green-100 text-green-700",
    Processing: "bg-blue-100 text-blue-700",
    Cancelled: "bg-red-100 text-red-700",
  };
  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-bold ${styles[status] || "bg-gray-100 text-gray-600"}`}
    >
      {status}
    </span>
  );
};

const SidebarLink = ({ href, label, active = false }) => (
  <Link
    href={href}
    className={`block px-4 py-2 rounded-lg transition-all ${
      active
        ? "bg-amber-50 text-amber-800 font-bold"
        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
    }`}
  >
    {label}
  </Link>
);

export default Page;
