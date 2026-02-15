"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import AccountSidebar from "../components/profile/AccountSidebar";

const WishlistPage = () => {
  // Mock data for saved items
  const [wishlistItems, setWishlistItems] = useState([
    {
      id: "w1",
      title: "Lord Krishna - Hand-painted Gold Foil",
      price: 18000,
      offerPrice: 16500,
      image: "/assets/products/painting-3.png",
      inStock: true,
      godName: "Krishna"
    },
    {
      id: "w2",
      title: "Royal Tanjore Peacock - 3D Embossed",
      price: 9500,
      offerPrice: 8550,
      image: "/assets/products/painting-4.png",
      inStock: false,
      godName: "Nature"
    }
  ]);

  return (
    <div className="bg-gray-50 min-h-screen py-10 font-outfit">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* SIDEBAR */}
          <AccountSidebar />

          {/* MAIN CONTENT */}
          <section className="lg:col-span-3 space-y-6">
            
            {/* Header */}
            <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100">
              <h2 className="text-xl font-semibold text-gray-900">My Wishlist</h2>
              <p className="text-sm text-gray-500 mt-1">
                Paintings you&apos;ve saved for later
              </p>
            </div>

            {/* Wishlist Items List */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              {wishlistItems.length > 0 ? (
                <div className="divide-y divide-gray-100">
                  {wishlistItems.map((item) => (
                    <div key={item.id} className="p-8 flex flex-col md:flex-row items-center justify-between gap-6 hover:bg-gray-50/20 transition-colors">
                      
                      <div className="flex items-center gap-6 w-full md:w-auto">
                        {/* Image */}
                        <div className="w-24 h-24 bg-gray-50 rounded-xl overflow-hidden border border-gray-100 flex-shrink-0 relative">
                           {/* Replace pulse with <Image /> when URLs are ready */}
                          <div className="w-full h-full bg-slate-200 animate-pulse" />
                          {!item.inStock && (
                            <div className="absolute inset-0 bg-white/60 flex items-center justify-center">
                              <span className="text-[10px] font-bold text-red-600 bg-white px-2 py-0.5 rounded shadow-sm">SOLD</span>
                            </div>
                          )}
                        </div>

                        {/* Details */}
                        <div>
                          <h3 className="font-bold text-gray-800">{item.title}</h3>
                          <p className="text-xs text-gray-500 mt-0.5">Category: {item.godName}</p>
                          <div className="mt-3 flex items-center gap-3">
                            <span className="text-lg font-bold text-amber-700">₹{item.offerPrice.toLocaleString('en-IN')}</span>
                            <span className="text-sm text-gray-400 line-through">₹{item.price.toLocaleString('en-IN')}</span>
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-4 w-full md:w-auto">
                        <button className="text-gray-400 hover:text-red-500 p-2 transition-colors">
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                        
                        <button 
                          disabled={!item.inStock}
                          className={`flex-1 md:flex-none px-6 py-2.5 rounded-xl font-bold text-sm transition shadow-sm
                            ${item.inStock 
                              ? "bg-amber-700 text-white hover:bg-amber-800" 
                              : "bg-gray-100 text-gray-400 cursor-not-allowed"}`}
                        >
                          {item.inStock ? "Move to Cart" : "Out of Stock"}
                        </button>
                      </div>

                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-20 text-center">
                  <div className="inline-block p-6 bg-amber-50 rounded-full mb-4 text-amber-600">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <p className="text-gray-500 font-medium">Your wishlist is empty.</p>
                  <Link href="/shop" className="mt-4 inline-block text-amber-700 font-bold hover:underline">
                    Explore Artworks
                  </Link>
                </div>
              )}
            </div>
          </section>

        </div>
      </div>
    </div>
  );
};

export default WishlistPage;