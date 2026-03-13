"use client";
import React, { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, Star, ArrowUpRight, ShoppingBag, ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import { useWishlistStore } from "../../../store/useWishlistStore";
import { useAuthStore } from "../../../store/useAuthStore";

const ProductCard = ({ product, onWishlistToggle, onAddToCart }) => {
  const router = useRouter();
  const { isLoggedIn } = useAuthStore();
  const isInWishlist = useWishlistStore((state) =>
    state.wishlist.some((item) => item.id === product._id)
  );

  const { randomRating, reviewCount } = useMemo(() => {
    const seed = product._id ? product._id.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0) : 0;
    const rating = (4.4 + (seed % 7) / 10).toFixed(1);
    const reviews = 18 + (seed % 103);
    return { randomRating: rating, reviewCount: reviews };
  }, [product._id]);

  if (!product) return null;

  const imageUrl = product.images?.[0] || "/placeholder-art.jpg";
  const title = product.title || "Gaja Lakshmi Antique Tanjore Painting";
  const displayPrice = product.offerPrice || product.price || 14000;

  return (
    <div className="group relative flex flex-col bg-white transition-all duration-500 rounded-4xl p-3 border border-zinc-100 hover:border-amber-200 hover:shadow-[0_20px_50px_-20px_rgba(217,119,6,0.15)]">

      {/* --- IMAGE AREA --- */}
      <div className="relative aspect-4/5 w-full overflow-hidden rounded-3xl bg-[#F9F9F7]">

        {/* TOP BADGES */}
        <div className="absolute top-3 left-3 z-20">
          {product.isBestSeller && (
            <div className="bg-zinc-900 text-amber-400 text-[8px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-full shadow-xl flex items-center gap-1.5">
              <Star size={10} className="fill-amber-400" /> Best Seller
            </div>
          )}
        </div>

        {/* WISHLIST BUTTON */}
        <button
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); onWishlistToggle(product); }}
          className="absolute top-3 right-3 z-20 p-2.5 rounded-full bg-white/80 backdrop-blur-md shadow-sm transition-all hover:bg-white hover:scale-110 active:scale-95 border border-zinc-100"
        >
          <Heart size={16} className={`transition-colors duration-300 ${isInWishlist ? "fill-red-500 text-red-500" : "text-zinc-400"}`} />
        </button>

        {/* MAIN IMAGE WITH GRADIENT OVERLAY */}
        <Link href={`/collections/${product._id}`} className="block h-full w-full relative">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-contain p-6 transition-transform duration-1000 ease-out group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          {/* Soft vignette for a "gallery" look */}
          <div className="absolute inset-0 bg-linear-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </Link>

        {/* QUICK ACTION BUTTON */}
        <div className="absolute inset-x-3 bottom-3 z-30 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
          <button
            onClick={(e) => { e.preventDefault(); onAddToCart(product); if (isLoggedIn) router.push("/cart"); }}
            className="w-full bg-zinc-900 text-white py-3.5 rounded-xl text-[10px] font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-2 hover:bg-amber-600 transition-colors shadow-xl"
          >
            <ShoppingBag size={14} /> Buy Now
          </button>
        </div>
      </div>

      {/* --- INFO SECTION --- */}
      <div className="mt-5 flex flex-col px-2 pb-2">

        {/* God Name & Rating */}
        <div className="flex justify-between items-center mb-2">
          <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-amber-600 bg-amber-50 px-2 py-0.5 rounded">
            {product.godName || "Traditional Art"}
          </span>
          <div className="flex items-center gap-1 text-zinc-500">
            <Star size={12} className="fill-amber-400 text-amber-400" />
            <span className="text-xs font-bold">{randomRating}</span>
          </div>
        </div>

        {/* Title */}
        <Link href={`/collections/${product._id}`} className="group/title">
          <h3 className="text-xl leading-loose font-bold text-zinc-900 line-clamp-2 min-h-10 group-hover/title:text-amber-700 transition-colors">
            {title}
          </h3>
        </Link>

        {/* PRICING BLOCK */}
        <div className="mt-4 pt-4 border-t border-zinc-100">
          <div className="flex items-end justify-between">
            <div className="flex flex-col">
              <span className="text-sm font-semibold uppercase tracking-wide text-zinc-900 mb-1">Authentic Work From</span>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-black text-zinc-900">₹{displayPrice?.toLocaleString("en-IN")}</span>
                <span className="text-sm font-bold text-zinc-400 line-through ml-3">₹{(displayPrice * 1.2).toFixed(0).toLocaleString("en-IN")}</span>
              </div>
            </div>

            {/* "View Details" Mini-CTA */}
            <Link
              href={`/collections/${product._id}`}
              className="w-10 h-10 rounded-full border border-zinc-200 flex items-center justify-center hover:bg-zinc-900 hover:text-white hover:border-zinc-900 transition-all duration-300"
            >
              <ArrowUpRight size={18} />
            </Link>
          </div>
        </div>

        {/* TRUST TAG */}
        <div className="mt-3 flex items-center gap-1.5 text-sm font-semibold text-emerald-600  tracking-normal">
          <ShieldCheck size={12} />
          Genuine 22K Gold Leaf Guaranteed
        </div>
      </div>
    </div>
  );
};

export default ProductCard;