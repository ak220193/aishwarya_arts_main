"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, Star, ArrowUpRight, ShoppingBag } from "lucide-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useWishlistStore } from "../../../store/useWishlistStore";
import { useAuthStore } from "../../../store/useAuthStore";

const ProductCard = ({ product, onWishlistToggle, onAddToCart }) => {
  const router = useRouter();

  const { isLoggedIn } = useAuthStore();

  const wishlist = useWishlistStore((state) => state.wishlist);
  const isInWishlist = useWishlistStore((state) =>
    state.wishlist.some((item) => item.id === product._id),
  );

  if (!product) return null;

  const imageUrl = product.images?.[0] || "/placeholder-art.jpg";
  const title =
    product.title ||
    "Gaja Lakshmi Antique finish Semi Embossed Tanjore Painting";

  // Pricing Logic
  const displayPrice = product.offerPrice || product.price || 14000;
  const originalPrice = product.price || 18000;
  const hasDiscount = product.offerPrice && product.offerPrice < product.price;

  const handleWishlistClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onWishlistToggle(product);
   
  };

  const handleBuyNow = (e) => {
    e.preventDefault();
    onAddToCart(product);
   if (isLoggedIn) {
    router.push("/cart");
  }
  };

  return (
    <div className="group relative flex flex-col bg-white transition-all duration-500 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] rounded-3xl p-2">
      {/* --- IMAGE AREA --- */}
      <div className="relative aspect-4/5 w-full overflow-hidden rounded-2xl transition-all duration-500">
        {/* ABSOLUTE BADGES */}
        <div className="absolute top-4 left-0 z-20 flex flex-col gap-2">
          {product.isBestSeller && (
            <span className="bg-black text-white text-[9px] font-bold uppercase tracking-[0.15em] px-4 py-2 rounded-r-full shadow-lg backdrop-blur-md">
              Best Seller
            </span>
          )}
          <span className="bg-yellow-500 text-black text-[10px] font-medium uppercase tracking-[0.15em] px-4 py-2 rounded-r-md shadow-lg">
            New Arrival
          </span>
        </div>

        {/* WISHLIST */}
        <button
          onClick={handleWishlistClick}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/90 backdrop-blur-md shadow-sm transition-all hover:scale-110 active:scale-95 border border-gray-100"
        >
          <Heart
            size={15}
            className={`transition-colors duration-300  ${isInWishlist ? "fill-red-500 text-red-500" : "text-black"}`}
          />
        </button>

        {/* MAIN IMAGE */}
        <Link
          href={`/collections/${product._id}`}
          className="block h-full w-full relative"
        >
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-contain p-4 transition-transform duration-1000 ease-out group-hover:scale-110"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </Link>

        {/* BUY NOW */}
        <div className="absolute inset-x-4 bottom-4 z-30 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out">
          <button
            onClick={handleBuyNow}
            className="w-full bg-black text-white py-4 rounded-2xl text-[10px] font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-2 hover:bg-yellow-500 hover:text-black transition-colors shadow-2xl"
          >
            <ShoppingBag size={14} /> Buy Now
          </button>
        </div>
      </div>

      {/* --- INFO SECTION --- */}
      <div className="mt-6 flex flex-col px-3 pb-4">
        {/* Category & Rating */}
        <div className="flex justify-between items-center mb-3">
          <p className="text-[12px] uppercase text-black tracking-wide font-medium">
            {product.godName || "Handmade Art"}
          </p>
          <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-full">
            <Star size={10} className="fill-yellow-500 text-yellow-500" />
            <span className="text-[10px] font-black text-black">5.0</span>
          </div>
        </div>

        {/* Title */}
        <Link
          href={`/collections/${product._id}`}
          className="group/title flex justify-between items-start gap-4 mb-2"
        >
          <h3 className="text-[16px] leading-tight font-bold text-black transition-colors line-clamp-2 min-h-10">
            {title}
          </h3>
          <ArrowUpRight
            size={20}
            className="text-gray-300 group-hover/title:text-yellow-600 transition-all shrink-0"
          />
        </Link>

        {/* --- PRICING & ACTION ROW --- */}
        <div className="mt-4 pt-4 border-t border-gray-50 flex flex-col gap-1">
          {/* "Starting from" Label */}
          <p className="text-[10px] uppercase text-black font-bold tracking-wider">
            Starting from
          </p>
          <div className="flex items-center justify-between gap-10">
            <div className="flex items-center gap-3">
              {/* Current/Offer Price */}
              <span className="text-[22px] text-black font-normal tracking-tight">
                ₹{displayPrice?.toLocaleString("en-IN")}
              </span>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center mt-2">
          <Link
            href={`/collections/${product._id}`}
            className="group/link relative py-1 flex items-center gap-1"
          >
            <span className="text-[11px] font-black uppercase tracking-widest text-black">
              Know More
            </span>
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-yellow-500 scale-x-0 group-hover/link:scale-x-100 transition-transform origin-left duration-300" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
