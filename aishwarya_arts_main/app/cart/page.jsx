"use client";

import React, { useState } from "react";
import Image from "next/image";
import AccountSidebar from "../components/profile/AccountSidebar";

const initialCart = [
  {
    id: 1,
    title: "Handcrafted Brass Lamp",
    variant: "Antique Finish",
    price: 2499,
    qty: 1,
    image: "/assets/products/lamp.jpg",
  },
  {
    id: 2,
    title: "Wooden Wall Decor",
    variant: "Natural Wood",
    price: 1299,
    qty: 2,
    image: "/assets/products/wall-art.jpg",
  },
];

const CartPage = () => {
  const [cart, setCart] = useState(initialCart);

  const updateQty = (id, qty) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, qty: Math.max(1, qty) } : item
      )
    );
  };

  const removeItem = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

          {/* SIDEBAR */}
          <AccountSidebar />

          {/* CART CONTENT */}
          <section className="lg:col-span-3 grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* LEFT – CART ITEMS */}
            <div className="lg:col-span-2 space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  Shopping Cart
                </h2>
                <div className="mt-2 h-[2px] w-24 bg-gradient-to-r from-yellow-700 to-yellow-500 rounded-full" />
              </div>

              {cart.length === 0 && (
                <p className="text-sm text-gray-500">
                  Your cart is empty.
                </p>
              )}

              {cart.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl shadow-sm p-5 flex gap-4"
                >
                  {/* Image */}
                  <div className="w-24 h-24 relative rounded-lg overflow-hidden border bg-gray-100">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-900">
                      {item.title}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {item.variant}
                    </p>

                    <div className="mt-3 flex items-center justify-between">
                      {/* Qty */}
                      <div className="flex items-center border rounded-lg overflow-hidden">
                        <button
                          onClick={() => updateQty(item.id, item.qty - 1)}
                          className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                        >
                          −
                        </button>
                        <span className="px-4 text-sm">{item.qty}</span>
                        <button
                          onClick={() => updateQty(item.id, item.qty + 1)}
                          className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                        >
                          +
                        </button>
                      </div>

                      {/* Price */}
                      <p className="text-sm font-medium text-gray-900">
                        ₹{item.price * item.qty}
                      </p>
                    </div>

                    {/* Remove */}
                    <button
                      onClick={() => removeItem(item.id)}
                      className="mt-2 text-xs text-red-600 hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* RIGHT – SUMMARY */}
            <div className="bg-white rounded-2xl shadow-sm p-6 h-fit">
              <h3 className="text-lg font-semibold text-gray-900">
                Order Summary
              </h3>

              <div className="mt-4 space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">₹{subtotal}</span>
                </div>

                <div className="flex justify-between text-gray-500">
                  <span>Shipping</span>
                  <span>Calculated at checkout</span>
                </div>

                <div className="flex justify-between text-gray-500">
                  <span>Taxes</span>
                  <span>Included</span>
                </div>

                <div className="border-t pt-4 flex justify-between text-base font-semibold">
                  <span>Total</span>
                  <span>₹{subtotal}</span>
                </div>
              </div>

              <button
                className="mt-6 w-full rounded-xl bg-gradient-to-r from-yellow-700 to-yellow-500
                py-3 text-white font-semibold hover:opacity-90 transition"
              >
                Proceed to Checkout
              </button>

              <p className="mt-3 text-xs text-gray-500 text-center">
                Secure checkout · Trusted payments
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
