"use client";

import React, {useState,useEffect} from 'react'
import Image from 'next/image'
import Link from 'next/link'
import AccountSidebar from '../components/profile/AccountSidebar'
import { useCartStore } from '../store//useCartStore'
import Empty from "../../public/assets/notfound/Blink Emoji yellow.gif"

const page = () => {

  // zustand store data 
  const { cart, removeFromCart, addToCart } = useCartStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

 const totalAmount = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  if (!mounted) return null;




  return (
    <div className="bg-gray-50 min-h-screen py-10 font-outfit">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* SIDEBAR (Consistent with Profile/Orders) */}
          <AccountSidebar />

          {/* MAIN CONTENT (Exact same container style as Profile) */}
          <section className="lg:col-span-3 space-y-6">
            
            {/* Page Header Container */}
            <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100">
              <h2 className="text-xl font-semibold text-gray-900">My Shopping Cart</h2>
              <p className="text-sm text-gray-500 mt-1">
               {cart.length > 0 
                  ? `You have ${cart.length} handmade paintings in your cart`
                  : "Your cart is currently empty."}
              </p>
            </div>

            {/* Cart Items List */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              {cart.length > 0 ? (
                <div className="divide-y divide-gray-100">
                  {cart.map((item) => (
                    <div key={item.id} className="p-8 flex flex-col md:flex-row items-center justify-between gap-6 hover:bg-gray-50/50 transition-colors">
                      <div className="flex items-center gap-6 w-full md:w-auto">
                        {/* Product Image */}
                        {/* <div className="w-24 h-24 bg-gray-50 rounded-xl overflow-hidden border border-gray-100 flex-shrink-0 relative">
                          <div className="w-full h-full bg-slate-200 animate-pulse" />
                        </div> */}
                        <div className="w-24 h-24 bg-gray-50 rounded-xl overflow-hidden border border-gray-100 flex-shrink-0 relative">
                           <Image 
                             src={item.image} 
                             alt={item.title} 
                             fill 
                             className="object-contain p-2"
                           />
                        </div>

                        {/* Product Details */}
                        <div>
                          <h3 className="font-bold text-gray-800 text-lg">{item.title}</h3>
                          <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1">
                            <p className="text-xs text-gray-500 font-medium">Size: <span className="text-gray-700">{item.size}</span></p>
                            <p className="text-xs text-gray-500 font-medium">Type: <span className="text-gray-700">{item.godName}</span></p>
                          </div>
                          <div className="mt-3 flex items-center gap-3">
                            
                            <span className="text-sm text-gray-400 line-through">₹{item.price.toLocaleString('en-IN')}</span>
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end">
                        <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden bg-white">
                          <button onClick={() => addToCart({ ...item, quantity: -1 })} className="px-3 py-1 hover:bg-gray-100 text-gray-600">-</button>
                          <span className="px-3 py-1 text-sm font-bold border-x border-gray-200">{item.quantity}</span>
                          <button  onClick={() => addToCart({ ...item, quantity: 1 })} className="px-3 py-1 hover:bg-gray-100 text-gray-600">+</button>
                        </div>
                        <button onClick={() => removeFromCart(item.id)} className="text-red-500 text-xs font-bold hover:bg-red-50 px-3 py-2 rounded-lg transition-colors">
                          Remove Item
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-20 text-center">
                  <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Image src={Empty} alt="Empty" width={120} height={120}  unoptimized />
                  </div>
                  <p className="text-gray-500 mb-6">Your cart is empty.</p>
                  <Link href="/collections" className="bg-amber-700 text-white px-8 py-3 rounded-xl font-bold shadow-md hover:bg-amber-800 transition">
                    Browse Paintings
                  </Link>
                </div>
              )}
            </div>

            {/* Bottom Summary Bar (Matching the Form Save section style) */}
            {cart.length > 0 && (
              <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <p className="text-sm text-gray-500">Estimated Total (Incl. Taxes)</p>
                  <p className="text-2xl font-bold text-gray-900">
                    ₹{totalAmount.toLocaleString('en-IN')}
                  </p>
                </div>
                <div className="flex gap-4 w-full md:w-auto">
                   <Link href="/collections" className="flex-1 md:flex-none text-center px-8 py-3 rounded-xl border border-gray-200 font-semibold hover:bg-gray-50 transition">
                    Continue Shopping
                  </Link>
                  <Link href="/checkout" className="flex-1 md:flex-none text-center px-8 py-3 rounded-xl bg-gradient-to-r from-amber-700 to-amber-600 text-white font-bold shadow-md hover:opacity-95 transition">
                    Proceed to Checkout
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

export default page;