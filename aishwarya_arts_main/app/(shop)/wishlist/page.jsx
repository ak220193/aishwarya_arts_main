"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";
import { Trash2, ShoppingBag, ChevronRight, Hash, Box, Heart } from "lucide-react";
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
      id: item.id || item._id,
      title: item.title,
      price: item.price,
      image: item.image || item.images[0],
      sku: item.sku,
      quantity: 1,
      size: item.size,
      frame: item.frame,
      style: item.style,
      godName: item.godName
    });
    
    toggleWishlist(item); 
    toast.success("Moved to cart!");
  };

  const handleRemove = (item) => {
    toggleWishlist(item);
    toast.error("Removed from wishlist");
  };

  if (!mounted) return null;

  return (
    <div className="bg-gray-50 min-h-screen py-6 md:py-10 font-outfit">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Mobile Navigation */}
        <div className="lg:hidden mb-6 flex items-center gap-2 text-sm text-gray-500">
          <Link href="/profile" className="hover:text-amber-600">Account</Link>
          <ChevronRight size={14} />
          <span className="font-bold text-zinc-900">Wishlist</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 md:gap-8">
          
          <div className="hidden lg:block">
            <AccountSidebar />
          </div>

          <section className="lg:col-span-3 space-y-6">
            
            {/* Header Container */}
            <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8 border border-gray-100 flex justify-between items-center">
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-900 flex items-center gap-2">
                   <Heart className="text-amber-600 fill-amber-600" size={24} /> My Wishlist
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  {wishlist.length > 0 
                    ? `You have ${wishlist.length} saved masterpieces`
                    : "Your collection of saved art"} 
                </p>
              </div>
              <h1 className="text-xl md:text-2xl font-bold bg-linear-to-r from-zinc-900 to-amber-600 bg-clip-text text-transparent leading-none hidden sm:block">
                Aishwarya Arts
              </h1>
            </div>

            {/* Wishlist Items List */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              {wishlist.length > 0 ? (
                <div className="divide-y divide-gray-100">
                  {wishlist.map((item) => (
                    <div key={item.id} className="p-5 md:p-8 flex flex-col sm:flex-row items-start gap-6 hover:bg-gray-50/50 transition-colors">
                      
                      {/* Product Image */}
                      <div className="w-full sm:w-40 md:w-48 aspect-square  rounded-xl overflow-hidden  shrink-0 relative">
                        <Image 
                          src={item.image || item.images?.[0]} 
                          alt={item.title} 
                          fill 
                          className="object-contain p-2 md:p-4"
                        />
                        {item.inStock === false && (
                          <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] flex items-center justify-center">
                            <span className="text-[10px] font-black text-red-600 bg-white border border-red-100 px-3 py-1 rounded">SOLD OUT</span>
                          </div>
                        )}
                      </div>

                      {/* Details Section */}
                      <div className="flex flex-col justify-between w-full min-h-full sm:min-h-45">
                        <div className="space-y-4">
                          <div>
                            <h3 className="font-semibold text-zinc-900 text-2xl md:text-2xl tracking-tight leading-tight">
                              {item.title}
                            </h3>
                            <div className="flex flex-wrap items-center gap-2 mt-2">
                              <span className="px-2 py-0.5 bg-amber-50 text-amber-700 text-[15px] md:text-xs font-semibold uppercase tracking-widest border border-amber-100 rounded-md">
                                SKU: {item.sku}
                              </span>
                              <p className="text-[15px] text-md md:text-md font-semibold text-zinc-800 uppercase tracking-wide ml-2">
                                Tanjore Masterpiece
                              </p>
                            </div>
                          </div>

                          {/* Organize Metadata exactly like Cart Page */}
                          <div className="grid grid-cols-2 gap-x-4 gap-y-3 pt-3 border-t border-zinc-50">
                            <div className="flex flex-col">
                              <span className="text-md uppercase font-semibold text-zinc-800 tracking-wide">Dimensions</span>
                              <span className="text-xs md:text-sm font-semibold text-zinc-800">{item.size || 'Standard'}</span>
                            </div>
                            <div className="flex flex-col">
                              <span className="text-md uppercase font-semibold text-zinc-800 tracking-wide">Selected Frame</span>
                              <span className="text-xs md:text-sm font-semibold text-zinc-800">{item.frame || 'Standard'}</span>
                            </div>
                            <div className="flex flex-col">
                              <span className="text-md uppercase font-semibold text-zinc-800 tracking-wide">Work Style</span>
                              <span className="text-xs md:text-sm font-semibold text-zinc-800 uppercase">{item.style || 'Flat'}</span>
                            </div>
                            <div className="flex flex-col">
                              <span className="text-md uppercase font-semibold text-zinc-800 tracking-wide">Pricing</span>
                              <span className="text-md font-semibold text-amber-700">₹{item.price.toLocaleString('en-IN')}</span>
                            </div>
                          </div>
                        </div>

                        {/* Actions Row */}
                        <div className="mt-6 flex items-center justify-between gap-4 border-t border-zinc-50 pt-4">
                          <button 
                            onClick={() => handleRemove(item)} 
                            className="flex items-center gap-2 text-zinc-900 hover:text-red-500 text-xs font-semibold uppercase tracking-widest transition-colors"
                          >
                            <Trash2 size={16} /> Remove
                          </button>
                          
                          <button 
                            onClick={() => handleMoveToCart(item)}
                            disabled={item.inStock === false}
                            className={`px-6 py-3 rounded-xl font-bold uppercase text-[10px] tracking-widest flex items-center gap-2 transition-all shadow-md
                              ${item.inStock !== false 
                                ? "bg-zinc-900 text-white hover:bg-amber-600" 
                                : "bg-zinc-100 text-zinc-400 cursor-not-allowed"}`}
                          >
                            <ShoppingBag size={14} />
                            {item.inStock !== false ? "Move to Cart" : "Sold Out"}
                          </button>
                        </div>
                      </div>

                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-20 flex flex-col items-center justify-center text-center px-6">
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
                  <h3 className="text-xl font-bold text-zinc-900">Your collection awaits</h3>
                  <p className="text-zinc-500 mt-2 max-w-xs">Save your favorite handcrafted paintings here to review them later.</p>
                  <Link href="/collections" className="mt-8 inline-block rounded-lg bg-linear-to-r from-yellow-700 to-yellow-500 px-8 py-4 text-white font-bold uppercase text-[10px] tracking-[0.2em] hover:opacity-90 transition shadow-xl">
                    Browse Masterpieces
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