"use client";

import React, { useState } from "react";
import Image from "next/image";
import AccountSidebar from "../components/profile/AccountSidebar";

const initialWishlist = [
  {
    id: 1,
    title: "Handcrafted Brass Lamp",
    price: 2499,
    image: "/assets/products/lamp.jpg",
  },
  {
    id: 2,
    title: "Traditional Wooden Wall Art",
    price: 1899,
    image: "/assets/products/wall-art.jpg",
  },
  {
    id: 3,
    title: "Ceramic Vase – Blue Finish",
    price: 999,
    image: "/assets/products/vase.jpg",
  },
];

const WishlistPage = () => {
  const [wishlist, setWishlist] = useState(initialWishlist);

  const removeItem = (id) => {
    setWishlist((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

          {/* SIDEBAR */}
          <AccountSidebar />

          {/* MAIN CONTENT */}
          <section className="lg:col-span-3">
            {/* Heading */}
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                My Wishlist
              </h2>
              <div className="mt-2 h-[2px] w-24 bg-gradient-to-r from-yellow-700 to-yellow-500 rounded-full" />
            </div>

            {/* Empty State */}
            {wishlist.length === 0 && (
              <div className="bg-white rounded-2xl shadow-sm p-10 text-center text-gray-500">
                Your wishlist is empty.
              </div>
            )}

            {/* Wishlist Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {wishlist.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl shadow-sm p-4 hover:shadow-md transition"
                >
                  {/* Image */}
                  <div className="relative w-full h-48 rounded-xl overflow-hidden bg-gray-100">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Details */}
                  <div className="mt-4">
                    <p className="text-sm font-medium text-gray-900">
                      {item.title}
                    </p>
                    <p className="mt-1 text-sm font-semibold text-gray-800">
                      ₹{item.price}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="mt-4 flex gap-2">
                    <button
                      className="flex-1 rounded-lg bg-gradient-to-r from-yellow-700 to-yellow-500
                      py-2 text-xs text-white font-semibold hover:opacity-90 transition"
                    >
                      Move to Cart
                    </button>

                    <button
                      onClick={() => removeItem(item.id)}
                      className="rounded-lg border border-gray-300 px-3 py-2
                      text-xs text-gray-600 hover:bg-gray-100"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default WishlistPage;
