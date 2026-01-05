"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import AccountSidebar from "../components/profile/AccountSidebar";
import { useStore } from "../store/useStore"; // Import your store

const CartPage = () => {
  // Pull state and actions from Zustand
  const cartItems = useStore((state) => state.cartItems);
  const removeFromCart = useStore((state) => state.removeFromCart);
  const updateQty = useStore((state) => state.updateQty);

  const [isMounted, setIsMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + (item.price || 0) * (item.qty || 1),
    0
  );

  if (!isMounted) return null;

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <AccountSidebar />

          <section className="lg:col-span-3 grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* LEFT – CART ITEMS */}
            <div className="lg:col-span-2 space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Shopping Cart</h2>
                <div className="mt-2 h-[2px] w-24 bg-gradient-to-r from-yellow-700 to-yellow-500 rounded-full" />
              </div>

              {cartItems.length === 0 ? (
                <div className="bg-white p-10 rounded-2xl text-center border border-dashed">
                  <p className="text-gray-500">Your cart is empty.</p>
                </div>
              ) : (
                cartItems.map((item) => (
                  <div key={item._id} className="bg-white rounded-2xl shadow-sm p-5 flex gap-4 border border-gray-100">
                    {/* Image - using item.img to match ProductCard */}
                    <div className="w-24 h-24 relative rounded-lg overflow-hidden border bg-gray-100 flex-shrink-0">
                      <Image
                        src={item.img || "/assets/placeholder.jpg"}
                        alt={item.name || "Product"}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-sm font-semibold text-gray-900">{item.name}</p>
                          <p className="text-xs text-gray-500 mt-1 line-clamp-1">{item.desc}</p>
                        </div>
                        <p className="text-sm font-bold text-gray-900">₹{item.price * item.qty}</p>
                      </div>

                      <div className="mt-4 flex items-center justify-between">
                        {/* Quantity Controls */}
                        <div className="flex items-center border rounded-lg overflow-hidden bg-gray-50">
                          <button
                            onClick={() => updateQty(item._id, item.qty - 1)}
                            className="px-3 py-1 text-gray-600 hover:bg-gray-200 transition"
                          >
                            −
                          </button>
                          <span className="px-4 text-sm font-medium">{item.qty}</span>
                          <button
                            onClick={() => updateQty(item._id, item.qty + 1)}
                            className="px-3 py-1 text-gray-600 hover:bg-gray-200 transition"
                          >
                            +
                          </button>
                        </div>

                        <button
                          onClick={() => removeFromCart(item._id)}
                          className="text-xs text-red-500 font-medium hover:text-red-700 underline"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* RIGHT – SUMMARY */}
            <div className="bg-white rounded-2xl shadow-sm p-6 h-fit border border-gray-100 sticky top-24">
              <h3 className="text-lg font-semibold text-gray-900 border-b pb-4">Order Summary</h3>
              <div className="mt-4 space-y-3 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-medium text-gray-900">₹{subtotal}</span>
                </div>
                <div className="flex justify-between text-gray-500">
                  <span>Shipping</span>
                  <span className="text-green-600">FREE</span>
                </div>
                <div className="border-t pt-4 flex justify-between text-lg font-bold text-gray-900">
                  <span>Total</span>
                  <span>₹{subtotal}</span>
                </div>
              </div>

              <button
                disabled={cartItems.length === 0}
                className="mt-6 w-full rounded-xl bg-gradient-to-r from-yellow-700 to-yellow-500 py-3 text-white font-semibold hover:shadow-lg transition transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Proceed to Checkout
              </button>

              <div className="mt-4 flex items-center justify-center gap-2 text-[10px] text-gray-400 uppercase tracking-widest">
                <span>Safe</span> • <span>Secure</span> • <span>Fast</span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default CartPage;