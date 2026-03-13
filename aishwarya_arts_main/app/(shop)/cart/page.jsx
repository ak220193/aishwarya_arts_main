"use client";

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Minus, Plus, Trash2, ShoppingBag, ChevronRight } from 'lucide-react'
import AccountSidebar from '../../components/profile/AccountSidebar'
import { useCartStore } from '../../../store/useCartStore'
import Empty from "../../../public/assets/notfound/Blink Emoji yellow.gif"

const Page = () => {
  const { cart, removeFromCart, addToCart } = useCartStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const totalAmount = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  if (!mounted) return null;

  return (
    <div className="bg-gray-50 min-h-screen py-6 md:py-10 font-outfit">
      <div className="max-w-7xl mx-auto px-4">

        {/* Mobile Sidebar Trigger/Breadcrumb (Optional) */}
        <div className="lg:hidden mb-6 flex items-center gap-2 text-sm text-gray-500">
          <Link href="/profile" className="hover:text-amber-600">Account</Link>
          <ChevronRight size={14} />
          <span className="font-bold text-zinc-900">Shopping Cart</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 md:gap-8">

          {/* SIDEBAR - Hidden on mobile, visible on LG screens */}
          <div className="hidden lg:block">
            <AccountSidebar />
          </div>

          {/* MAIN CONTENT */}
          <section className="lg:col-span-3 space-y-6">
            {/* --- ENHANCED CART HEADER --- */}
            <header className="bg-white rounded-4xl p-6 md:p-8 border border-zinc-100 shadow-sm relative overflow-hidden">

              {/* Decorative Background Icon */}
              <ShoppingBag className="absolute -right-6 -bottom-6 text-zinc-50 size-48 -rotate-12 pointer-events-none" />

              <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">

                {/* Left Side: Title and Icon */}
                <div className="flex items-center gap-5">
                  <div className="p-4 bg-amber-50 rounded-2xl text-amber-600 shadow-sm">
                    <ShoppingBag size={32} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h2 className="text-2xl md:text-3xl font-semibold text-zinc-900 tracking-tight">
                      Shopping Cart
                    </h2>
                    <p className="text-sm md:text-base text-zinc-800 font-medium mt-1 leading-tight">
                      {cart.length > 0
                        ? `Reviewing your ${cart.length} selected masterpieces`
                        : "Your gallery collection is currently empty"}
                    </p>
                  </div>
                </div>

                {/* Right Side: High-Contrast Stats Badge */}
                <div className="flex items-center md:justify-end">
                  <div className="px-6 py-3 bg-zinc-950 rounded-2xl text-center shadow-2xl border border-white/5 min-w-30">
                    <p className="text-sm text-white uppercase font-semibold tracking-wide mb-0.5">
                      Paintings
                    </p>
                    <p className="text-3xl font-black text-amber-400">
                      {cart.length}
                    </p>
                  </div>
                </div>
              </div>

              {/* Quick Summary Row (Visible only if items exist) */}
              {cart.length > 0 && (
                <div className="mt-8 pt-6 border-t border-zinc-50 flex flex-wrap gap-6 md:gap-10">
                  <div className="flex items-center gap-2 text-zinc-900 text-md font-semibold uppercase tracking-wide">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    Verified Items
                  </div>
                  <div className="flex items-center gap-2 text-zinc-600 text-md font-bold uppercase tracking-wide">
                    <span className="text-zinc-800">Cart Value:</span>
                    <span className="text-zinc-900 ">₹{totalAmount.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              )}
            </header>

            {/* Cart Items List */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              {cart.length > 0 ? (
                <div className="divide-y divide-gray-100">
                  {cart.map((item) => (
                    <div key={item.id} className="p-5 md:p-8 flex flex-col sm:flex-row items-start gap-6 hover:bg-gray-50/50 transition-colors">

                      {/* Product Image - Responsive Sizing */}
                      <div className="w-full sm:w-40 md:w-52 aspect-square  rounded-xl overflow-hidden  shrink-0 relative ">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-contain p-2 md:p-4"
                        />
                      </div>

                      {/* Product Details Section */}
                      <div className="flex flex-col justify-between w-full min-h-full sm:min-h-45">
                        <div className="space-y-4">
                          {/* Title & SKU Area */}
                          <div>
                            <h3 className="font-bold text-zinc-900 text-xl md:text-2xl tracking-tight leading-tight">
                              {item.title}
                            </h3>
                            <div className="flex flex-wrap items-center gap-2 mt-2">
                              <span className="px-2 py-0.5 bg-amber-50 text-amber-700 text-md font-semibold uppercase tracking-widest border border-amber-100 rounded">
                                SKU: {item.sku}
                              </span>
                              <span className="hidden sm:block h-px w-6 bg-zinc-200" />
                              <p className="text-[1px] md:text-xs font-semibold text-zinc-800 uppercase tracking-wide">
                                Authentic Tanjore Masterpiece
                              </p>
                            </div>
                          </div>

                          {/* Metadata Grid - 2 columns on all screens */}
                          <div className="grid grid-cols-2 gap-x-4 gap-y-3 pt-3 border-t border-zinc-50">
                            <div className="flex flex-col">
                              <span className="text-md uppercase font-semibold text-zinc-800 tracking-widest">Dimensions</span>
                              <span className="text-md md:text-md font-semibold text-zinc-800">{item.size}</span>
                            </div>
                            <div className="flex flex-col">
                              <span className="text-md uppercase font-semibold text-zinc-800 tracking-widest">Selected Frame</span>
                              <span className="text-md md:text-md font-semibold text-zinc-800">{item.frame}</span>
                            </div>
                            <div className="flex flex-col">
                              <span className="text-md uppercase font-semibold text-zinc-800 tracking-widest">Work Style</span>
                              <span className="text-md md:text-md font-semibold text-zinc-800 uppercase">{item.style}</span>
                            </div>
                            <div className="flex flex-col">
                              <span className="text-md uppercase font-semibold text-zinc-800 tracking-widest">Subject</span>
                              <span className="text-md md:text-md font-semibold text-zinc-800">{item.godName}</span>
                            </div>
                          </div>
                        </div>

                        {/* Bottom Actions & Price Row */}
                        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-zinc-50 pt-4">
                          <div className="flex items-center gap-4">
                            {/* Quantity Control */}
                            <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm">
                              <button
                                onClick={() => addToCart({ ...item, quantity: -1 })}
                                className="px-3 py-1.5 hover:bg-gray-100 text-gray-500 transition-colors"
                              >
                                <Minus size={14} />
                              </button>
                              <span className="px-4 py-1 text-sm font-bold border-x border-gray-100 text-zinc-800">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => addToCart({ ...item, quantity: 1 })}
                                className="px-3 py-1.5 hover:bg-gray-100 text-gray-500 transition-colors"
                              >
                                <Plus size={14} />
                              </button>
                            </div>

                            {/* Trash Button */}
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>

                          <div className="text-right">
                            <span className="block text-[15px]  font-semibold text-zinc-800 tracking-widest mb-0.5">Item Total</span>
                            <span className="text-xl font-semibold text-zinc-900">
                              ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                            </span>
                          </div>
                        </div>
                      </div>

                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-20 text-center px-6">
                  <div className="w-24 md:w-32 mx-auto mb-6">
                    <Image src={Empty} alt="Empty" width={120} height={120} unoptimized />
                  </div>
                  <h3 className="text-xl font-bold text-zinc-900">Your collection is empty</h3>
                  <p className="text-gray-500 mb-8 mt-2 max-w-xs mx-auto">Start adding premium handcrafted Tanjore paintings to your gallery.</p>
                  <Link href="/collections" className="inline-block rounded-full bg-zinc-900 px-8 py-4 text-white font-bold uppercase text-[10px] tracking-[0.2em] hover:bg-amber-600 transition shadow-xl">
                    Explore Collections
                  </Link>
                </div>
              )}
            </div>

            {/* Responsive Summary Bar */}
            {cart.length > 0 && (
              <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-amber-100 flex flex-col md:flex-row items-center justify-between gap-6 sticky bottom-4 z-20">
                <div className="text-center md:text-left">
                  <p className="text-sm uppercase font-bold text-zinc-800 tracking-widest">Estimated Total</p>
                  <div className="flex items-baseline justify-center md:justify-start gap-4">
                    <span className="text-sm text-gray-800 font-medium">INR</span>
                    <p className="text-3xl font-semibold text-zinc-900">
                      ₹{totalAmount.toLocaleString('en-IN')}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                  <Link href="/collections" className="px-8 py-4 rounded-xl border border-zinc-200 font-semibold uppercase text-md tracking-widest text-zinc-600 hover:bg-gray-50 transition text-center order-2 sm:order-1">
                    Continue Shopping
                  </Link>
                  <Link href="/checkout" className="px-10 py-4 rounded-xl bg-linear-to-r from-amber-600 to-amber-500 text-white font-semibold uppercase text-md tracking-widest hover:shadow-lg hover:shadow-amber-200 transition text-center shadow-md order-1 sm:order-2">
                    Secure Checkout
                  </Link>
                </div>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  )
}

export default Page;