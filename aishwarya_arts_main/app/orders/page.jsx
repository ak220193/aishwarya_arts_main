"use client";

import React from "react";
import Image from "next/image";
import AccountSidebar from "../components/profile/AccountSidebar";

const orders = [
  {
    id: "ORD-1001",
    status: "Delivered",
    date: "12 Sep 2025",
    products: [
      {
        id: 1,
        title: "Handcrafted Brass Lamp",
        description: "Traditional deepam with antique finish",
        price: 2499,
        qty: 1,
        image: "/assets/Products/New folder/others/group.jpg",
      },
      {
        id: 2,
        title: "Wooden Wall Decor",
        description: "Hand-carved ethnic wall art",
        price: 1299,
        qty: 2,
        image: "/assets/Products/15+12/ganapthy/pilliyar-frame.jpg",
      },
    ],
  },
  {
    id: "ORD-1002",
    status: "Processing",
    date: "08 Sep 2025",
    products: [
      {
        id: 3,
        title: "Terracotta Vase",
        description: "Handmade clay vase",
        price: 899,
        qty: 1,
        image: "/assets/Products/15+12/ganapthy/pilliyar-frame.jpg",
      },
    ],
  },
];

const OrdersPage = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

          {/* SIDEBAR */}
          <AccountSidebar />

          {/* RIGHT CONTENT */}
          <section className="lg:col-span-3 space-y-6">
            {/* Header */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                My Orders
              </h2>
              <div className="mt-2 h-[2px] w-24 bg-gradient-to-r from-yellow-700 to-yellow-500 rounded-full" />
            </div>

            {/* Orders */}
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-2xl shadow-sm p-6 space-y-4"
              >
                {/* Order Header */}
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Order ID: {order.id}
                    </p>
                    <p className="text-xs text-gray-500">
                      Placed on {order.date}
                    </p>
                  </div>

                  <OrderStatus status={order.status} />
                </div>

                {/* Products */}
                <div className="divide-y">
                  {order.products.map((product) => (
                    <div
                      key={product.id}
                      className="flex gap-4 py-4"
                    >
                      {/* Product Image */}
                      <div className="w-20 h-20 relative rounded-lg overflow-hidden border bg-gray-100">
                        <Image
                          src={product.image}
                          alt={product.title}
                          fill
                          className="object-cover"
                        />
                      </div>

                      {/* Product Info */}
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-gray-900">
                          {product.title}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {product.description}
                        </p>

                        <div className="mt-2 flex items-center gap-6 text-sm">
                          <span className="text-gray-700">
                            ₹{product.price}
                          </span>
                          <span className="text-gray-500">
                            Qty: {product.qty}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </section>
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;

/* ================= STATUS BADGE ================= */

const OrderStatus = ({ status }) => {
  const statusStyles = {
    Delivered: "bg-green-100 text-green-700",
    Processing: "bg-yellow-100 text-yellow-700",
    Pending: "bg-orange-100 text-orange-700",
    Cancelled: "bg-red-100 text-red-700",
  };

  return (
    <span
      className={`rounded-full px-4 py-1 text-xs font-semibold ${
        statusStyles[status] || "bg-gray-100 text-gray-700"
      }`}
    >
      {status}
    </span>
  );
};
