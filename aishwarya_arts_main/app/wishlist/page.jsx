"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import AccountSidebar from "../components/profile/AccountSidebar";
import { useStore } from "../store/useStore";

const WishlistPage = () => {
  // 1. Connect to Zustand Store
  const { wishlist, toggleWishlist, addToCart } = useStore();

  // 2. Prevent Next.js Hydration errors
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  // 3. Logic Handlers
  const handleMoveToCart = (product) => {
    // Adds to cart and removes from wishlist (standard e-commerce flow)
    addToCart(product, 1);
    toggleWishlist(product);
  };

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* SIDEBAR */}
          <AccountSidebar />

          {/* MAIN CONTENT */}
          <section className="lg:col-span-3">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                My Wishlist ({wishlist.length})
              </h2>
              <div className="mt-2 h-[2px] w-24 bg-gradient-to-r from-yellow-700 to-yellow-500 rounded-full" />
            </div>

            {/* Empty State */}
            {wishlist.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-sm p-10 text-center text-gray-500 border border-dashed border-gray-300">
                Your wishlist is empty. Explore our Tanjore paintings!
              </div>
            ) : (
              /* Wishlist Grid */
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {wishlist.map((item) => (
                  <div
                    key={item._id}
                    className="bg-white rounded-2xl shadow-sm p-4 hover:shadow-md transition group"
                  >
                    {/* Image */}
                    <div className="relative w-full h-48 rounded-xl overflow-hidden bg-gray-100">
                      <Image
                        src={item.image || (item.images && item.images[0]) || "/placeholder.jpg"}
                        alt={item.title}
                        fill
                        className="object-cover group-hover:scale-105 transition duration-300"
                      />
                    </div>

                    {/* Details */}
                    <div className="mt-4">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {item.name}
                      </p>
                      <p className="mt-1 text-sm font-semibold text-gray-800">
                        {item.desc}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="mt-4 flex gap-2">
                      <button
                        onClick={() => handleMoveToCart(item)}
                        className="flex-1 rounded-lg bg-gradient-to-r from-yellow-700 to-yellow-500
                        py-2 text-xs text-white font-semibold hover:opacity-90 transition shadow-sm"
                      >
                        Move to Cart
                      </button>

                      <button
                        onClick={() => toggleWishlist(item)}
                        className="rounded-lg border border-gray-300 px-3 py-2
                        text-xs text-red-500 hover:bg-red-50 transition font-medium"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default WishlistPage;
