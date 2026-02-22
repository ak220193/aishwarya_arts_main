"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";
import AccountSidebar from "../../components/profile/AccountSidebar";
import EmptyWishlistGif from "../../../public/assets/notfound/Girl holding bag.gif";

import { useWishlistStore } from "../../../store/useWishlistStore";
import { useCartStore } from "../../../store/useCartStore";

const WishlistPage = () => {
  const { wishlist, toggleWishlist } = useWishlistStore();
  const { addToCart } = useCartStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleMoveToCart = (item) => {
    addToCart({
      id: item.id,
      title: item.title,
      price: item.price,
      image: item.image,
      quantity: 1,
      size: item.size || "18x24 inches",
    });
    
    // Remove from wishlist after moving to cart
    toggleWishlist(item); 
    toast.success("Moved to cart!");
  };

  const handleRemove = (item) => {
    toggleWishlist(item);
    toast.error("Removed from wishlist");
  };

  if (!mounted) return null;

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
                {wishlist.length > 0 
                  ? `You have ${wishlist.length} paintings saved for later`
                  : "Your collection of saved masterpieces"} 
              </p>
            </div>

            {/* Wishlist Items List */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              {wishlist.length > 0 ? (
                <div className="divide-y divide-gray-100">
                  {wishlist.map((item) => (
                    <div key={item.id} className="p-8 flex flex-col md:flex-row items-center justify-between gap-6 hover:bg-gray-50/20 transition-colors">
                      
                      <div className="flex items-center gap-6 w-full md:w-auto">
                        {/* Product Image Container */}
                        <div className="w-24 h-24 bg-gray-50 rounded-xl overflow-hidden border border-gray-100 flex-shrink-0 relative">
                          <Image 
                            src={item.image} 
                            alt={item.title} 
                            fill 
                            className="object-contain p-2"
                          />
                          
                          {/* Sold Out Overlay Logic */}
                          {item.inStock === false && (
                            <div className="absolute inset-0 bg-white/60 flex items-center justify-center">
                              <span className="text-[10px] font-bold text-red-600 bg-white px-2 py-0.5 rounded shadow-sm">SOLD</span>
                            </div>
                          )}
                        </div>

                        {/* Details */}
                        <div>
                          <h3 className="font-bold text-gray-800 line-clamp-1">{item.title}</h3>
                          <p className="text-xs text-gray-500 mt-0.5">Category: {item.godName || "Tanjore Art"}</p>
                          <div className="mt-3 flex items-center gap-3">
                            <span className="text-lg font-bold text-amber-700">₹{item.price.toLocaleString('en-IN')}</span>
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
                        <button 
                          onClick={() => handleRemove(item)} 
                          className="text-gray-400 hover:text-red-500 p-2 transition-colors"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                        
                        <button 
                          onClick={() => handleMoveToCart(item)}
                          disabled={item.inStock === false}
                          className={`flex-1 md:flex-none text-sm  shadow-sm rounded-lg bg-linear-to-r from-yellow-700 to-yellow-500
               px-8 py-3 text-white font-semibold hover:opacity-90 transition
                            ${item.inStock !== false 
                              ? "bg-amber-700 text-white hover:bg-amber-800" 
                              : "bg-gray-100 text-gray-400 cursor-not-allowed"}`}
                        >
                          {item.inStock !== false ? "Move to Cart" : "Out of Stock"}
                        </button>
                      </div>

                    </div>
                  ))}
                </div>
              ) : (
                /* --- EMPTY STATE WITH GIF --- */
                <div className="p-16 flex flex-col items-center justify-center text-center">
                  <div className="w-48 h-48 relative mb-6">
                    <Image 
                      src={EmptyWishlistGif} 
                      alt="Empty Wishlist" 
                      fill 
                      unoptimized 
                      priority
                      className="object-contain"
                    />
                  </div>
                  <p className="text-gray-500 font-medium italic">Add Your Products to wishlist</p>
                  <Link href="/collections" className="mt-6 inline-block rounded-lg bg-gradient-to-r from-yellow-700 to-yellow-500
               px-8 py-3 text-white font-semibold hover:opacity-90 transition">
                    Explore our Premium Tanjore Collections
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