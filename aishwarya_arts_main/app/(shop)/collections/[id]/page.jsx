"use client";
import React, { useState, useRef, use, useEffect, useMemo } from "react";
import axios from "axios";
import Image from "next/image";
import {
  Heart,
  Truck,
  Plus,
  Minus,
  CheckCircle2,
  ShieldAlert,
  ShoppingBag,
  ArrowLeft,
  Loader2,
  ChevronRight,
  Award,
  Zap,
  Lock,
} from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import { useCartStore } from "../../../../store/useCartStore";
import { useWishlistStore } from "../../../../store/useWishlistStore";
import { useAuthStore } from "../../../../store/useAuthStore";
import { GLOBAL_ASSETS } from "@/lib/constants";

const DIMENSIONS = [
  '15" X 12"',
  '18" X 14"',
  '20" X 16"',
  '24" X 18"',
  '30" X 24"',
  '36" X 24"',
  '48" X 36"',
  '60" X 36"',
  '72" X 48"',
];

const ProductPage = ({ params }) => {
  const [mounted, setMounted] = useState(false);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { isLoggedIn } = useAuthStore();
  const router = useRouter();
  const resolvedParams = use(params);
  const productId = resolvedParams.id;

  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedFrame, setSelectedFrame] = useState("");
  const [selectedStyle, setSelectedStyle] = useState("");
  const [zoomData, setZoomData] = useState({ x: 0, y: 0, show: false });
  const imgRef = useRef(null);

  const normalize = (s) => s?.replace(/["\s]/g, "").toLowerCase() || "";

  useEffect(() => {
    setMounted(true);
    const fetchProductDetails = async () => {
      try {
        const res = await axios.get(`/api/admin/products/${productId}`);
        const data = res.data.data;
        setProduct(data);
        setSelectedSize(data.dimensions);
        setSelectedStyle(data.workStyle || "flat");
        setSelectedFrame(data.frameType || "Classic Frame");
        setActiveImage(data.images[0]);
      } catch (err) {
        console.error("Signal Lost:", err);
        toast.error("Failed to load masterpiece details.");
      } finally {
        setLoading(false);
      }
    };
    fetchProductDetails();
  }, [productId]);

  const allGalleryImages = useMemo(() => {
    if (!product) return [];
    return [...product.images, ...GLOBAL_ASSETS.frames.map((f) => f.url)];
  }, [product]);

  // --- LOGIC: 1. FIND SELECTION ---
  const currentSelection = useMemo(() => {
    if (!product || !product.priceMatrix || !selectedSize) return null;

    const searchSize = normalize(selectedSize);
    const searchStyle = normalize(selectedStyle);

    return product.priceMatrix.find((item) => {
      const itemSize = normalize(item.size);
      const itemStyle = normalize(item.style);

      // Check if Size and Style match
      const basicMatch = itemSize === searchSize && itemStyle === searchStyle;

      // If your DB has frames, check them. If not, just match size/style
      if (item.frame) {
        return basicMatch && item.frame === selectedFrame;
      }
      return basicMatch;
    });
  }, [selectedSize, selectedStyle, selectedFrame, product]);

  // Matches 'price' (Selling Price) and 'mrp' (Original Price) from your matrix
  const displayPrice = currentSelection?.price || product?.price || 0;
  const displayMRP =  currentSelection?.mrp || product?.offerPrice || product?.price || 0;

    

  const isSizeAvailable = (sizeString) => {
    if (!product || !product.priceMatrix) return false;
    const search = normalize(sizeString);
    return product.priceMatrix.some((m) => normalize(m.size) === search);
  };

  const addToCart = useCartStore((state) => state.addToCart);
  const toggleWishlist = useWishlistStore((state) => state.toggleWishlist);
  const wishlist = useWishlistStore((state) => state.wishlist);
  const isInWishlist = wishlist.some(
    (item) => item.id === product?._id || item._id === product?._id,
  );

  useEffect(() => {
    if (product) setSelectedSize(product.dimensions);
  }, [product]);

  // --- DEBUG CONSOLE STATEMENTS ---
  useEffect(() => {
    if (product && product.priceMatrix) {
      console.group("🏷️ Price Matrix Debugging");

      // 1. Check current state values being used for search
      console.log(
        "Current State -> Size:",
        selectedSize,
        "| Style:",
        selectedStyle,
        "| Frame:",
        selectedFrame,
      );

      // 2. Check normalized values (how the code "sees" the match)
      const searchSize = normalize(selectedSize);
      const searchStyle = normalize(selectedStyle);
      console.log(
        "Normalized Search -> Size:",
        searchSize,
        "| Style:",
        searchStyle,
      );

      // 3. Look at one sample from your DB to see if strings match
      const sample = product.priceMatrix[0];
      if (sample) {
        console.log(
          "DB Sample Item -> Size:",
          sample.size,
          "| Style:",
          sample.style,
          "| Frame:",
          sample.frame,
        );
        console.log(
          "DB Sample Normalized -> Size:",
          normalize(sample.size),
          "| Style:",
          normalize(sample.style),
        );
      }

      // 4. Final Match Result
      console.log("Match Found:", currentSelection);
      console.log("Display Price Result:", displayPrice);

      console.groupEnd();
    }
  }, [
    selectedSize,
    selectedStyle,
    selectedFrame,
    product,
    currentSelection,
    displayPrice,
  ]);

  // --- CALIBRATED INTERACTION HANDLER FOR ALL SCREENS ---
  const handleInteraction = (e) => {
    if (!imgRef.current) return;
    // Support both mouse and touch events
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    const { left, top, width, height } = imgRef.current.getBoundingClientRect();
    // Calculate percentage and clamp between 0-100 to prevent edge glitches
    let x = ((clientX - left) / width) * 100;
    let y = ((clientY - top) / height) * 100;
    x = Math.max(0, Math.min(100, x));
    y = Math.max(0, Math.min(100, y));
    setZoomData({ x, y, show: true });
  };

  const onAddToCart = () => {
    if (!selectedSize || !selectedFrame) {
      toast.error("Please select a dimension and frame type first.");
      return;
    }

    if (!isLoggedIn) {
      toast.error("Please login to start shopping");
      router.push("/login");
      return;
    }
    addToCart({
      id: product._id,
      title: product.title,
      price: product.offerPrice || product.price,
      image: product.images[0],
      quantity: quantity,
      size: selectedSize,
      frame: selectedFrame,
    });
    toast.success(`${quantity} Item(s) added to cart`);
  };

  const onBuyNow = () => {
    if (!isLoggedIn) {
      toast.error("Please login to proceed");
      router.push("/login");
      return;
    }
    onAddToCart();
    router.push("/cart");
  };

  if (loading)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-white">
        <Loader2 className="animate-spin text-amber-600" size={40} />
        <p className="uppercase text-[10px] font-black tracking-[0.4em] text-amber-800">
          Restoring Art Signal...
        </p>
      </div>
    );

  const technicalSpecs = [
    { label: "Divine Subject", value: product.godName },
    { label: "Work Style", value: product.workStyle },
    { label: "Weight", value: product.weight },
    { label: "Frame Type", value: product.frameType },
    { label: "Lead Time", value: product.leadTime },
  ];

  return (
    <div className="min-h-screen bg-white font-outfit pb-20 overflow-x-hidden">
      {/* BREADCRUMBS */}
      <div className="max-w-360 mx-auto px-4 md:px-6 py-6 md:py-8 text-[10px] md:text-[12px] uppercase tracking-wide text-zinc-600 flex items-center gap-2 overflow-hidden">
        <Link href="/" className="hover:text-amber-700 whitespace-nowrap">
          Home
        </Link>
        <ChevronRight size={10} className="shrink-0" />
        <Link
          href="/collections"
          className="hover:text-amber-700 whitespace-nowrap"
        >
          Collections
        </Link>
        <ChevronRight size={10} className="shrink-0" />
        <span className="text-zinc-900 font-semibold truncate">
          {product.title}
        </span>
      </div>

      <div className="max-w-360 mx-auto px-4 md:px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-20">
          {/* --- LEFT: IMAGE EXHIBIT --- */}
          <div className="lg:col-span-7 space-y-6 md:space-y-8">
            <div
              className="relative aspect-4/5 rounded-3xl md:rounded-[2.5rem] overflow-hidden cursor-crosshair group touch-none border border-zinc-100 bg-zinc-50"
              onMouseMove={handleInteraction}
              onTouchMove={handleInteraction}
              onMouseEnter={() =>
                setZoomData((prev) => ({ ...prev, show: true }))
              }
              onMouseLeave={() =>
                setZoomData((prev) => ({ ...prev, show: false }))
              }
              onTouchStart={() =>
                setZoomData((prev) => ({ ...prev, show: true }))
              }
              onTouchEnd={() =>
                setZoomData((prev) => ({ ...prev, show: false }))
              }
            >
              <Image
                ref={imgRef}
                src={activeImage}
                alt={product.title || "Masterpiece"}
                fill
                className={`object-contain p-4 transition-opacity duration-300 ${zoomData.show ? "opacity-0 md:opacity-0" : "opacity-100"}`}
                priority
              />
              {zoomData.show && (
                <div
                  className="absolute inset-0 z-10 w-full h-full pointer-events-none"
                  style={{
                    backgroundImage: `url(${product.images[activeImage]})`,
                    backgroundPosition: `${zoomData.x}% ${zoomData.y}%`,
                    backgroundSize: "clamp(180%, 20vw + 150%, 280%)", // Adaptive zoom scale
                    backgroundRepeat: "no-repeat",
                  }}
                />
              )}
              <button
                onClick={onBuyNow}
                className="absolute top-4 right-4 md:top-6 md:right-6 z-20 p-3 md:p-4 rounded-full bg-white/90 shadow-xl hover:scale-110 active:scale-90 transition-transform"
              >
                <Heart
                  size={20}
                  className={
                    isInWishlist ? "fill-red-500 text-red-500" : "text-zinc-900"
                  }
                />
              </button>
            </div>

            <div className="flex gap-3 md:gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x">
              {allGalleryImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`relative w-16 h-16 md:w-24 md:h-24 shrink-0 rounded-xl md:rounded-2xl overflow-hidden transition-all duration-300 snap-center ${activeImage === img ? "ring-2 ring-amber-600 ring-offset-2" : "opacity-60 hover:opacity-100"}`}
                >
                  <Image src={img} alt="thumb" fill className="object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* --- RIGHT: THE NARRATIVE --- */}
          <div className="lg:col-span-5 flex flex-col space-y-8 md:space-y-10">
            <header className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="h-px w-6 md:w-8 bg-amber-600" />
                <span className="text-sm md:text-md font-semibold uppercase tracking-[0.2em] text-amber-700 italic">
                  Artisan Masterpiece
                </span>
              </div>
              <h1 className="text-3xl md:text-5xl font-semibold tracking-tighter text-zinc-900 leading-tight md:leading-[0.9]">
                {product.title}
              </h1>

              
              <div className="flex flex-col gap-1">
                <div className="flex items-baseline gap-4">
                  {/* Use displayPrice to show matrix-updated value */}
                  <span className="text-3xl md:text-4xl font-bold text-zinc-900 tracking-tight">
                    ₹{displayPrice.toLocaleString("en-IN")}
                  </span>

                  {/* Use displayMRP for the strikethrough price */}
                  {displayMRP > displayPrice && (
                    <span className="text-lg md:text-xl text-zinc-400 line-through font-light">
                      ₹{displayMRP.toLocaleString("en-IN")}
                    </span>
                  )}
                </div>

                {/* Calculates savings automatically based on current selection */}
                {displayMRP > displayPrice && (
                  <p className="text-xs md:text-md font-bold text-green-700 uppercase tracking-widest bg-green-50 w-fit px-3 py-1 rounded-full border border-green-100 mt-2">
                    Save ₹{(displayMRP - displayPrice).toLocaleString("en-IN")}{" "}
                    Today
                  </p>
                )}
              </div>

              <div className="flex items-center gap-2 text-xs md:text-md font-semibold text-amber-700 uppercase tracking-widest bg-amber-50/50 w-fit px-4 py-1.5 rounded-full border border-amber-100/50">
                <CheckCircle2 size={12} /> Authentic 22ct Gold Foil
              </div>
            </header>

            {/* SIZE CARDS */}
            {/* --- IMPROVISED DIMENSIONS SECTION --- */}
            <div className="space-y-4">
              <div className="flex justify-between items-end">
                <label className="text-sm md:text-md font-semibold uppercase tracking-widest text-zinc-800">
                  Available Dimensions
                </label>
                <span className="text-[10px] text-amber-600 font-bold uppercase tracking-tight">
                  Select size to update price
                </span>
              </div>

              {/* --- IMPROVISED DIMENSIONS SECTION --- */}
              <div className="space-y-4">
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                  {DIMENSIONS.map((size) => {
                    const isAvailable = isSizeAvailable(size);
                    const isSelected = selectedSize === size;
                    return (
                      <button
                        key={size}
                        type="button"
                        disabled={!isAvailable}
                        onClick={() => setSelectedSize(size)}
                        className={`relative py-2 px-1 rounded-lg border text-lg font-semibold transition-all duration-300
                        ${
                          !isAvailable
                            ? "bg-zinc-50 border-zinc-100 text-zinc-400 cursor-not-allowed"
                            : isSelected
                              ? "border-amber-600 bg-amber-900 text-white shadow-md ring-2 ring-amber-100"
                              : "border-zinc-200 bg-white text-zinc-800 hover:border-amber-400"
                        }`}
                      >
                        {size.replace(/["\s]/g, "").replace("X", "x")}
                        {!isAvailable && (
                          <Lock
                            size={8}
                            className="absolute top-1 right-1 opacity-50"
                          />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* FRAME PILLS */}
            {/* --- IMPROVISED FRAME STYLE SECTION --- */}
            <div className="space-y-4">
              <label className="text-sm md:text-md font-semibold uppercase tracking-widest text-zinc-800">
                Frame selection
              </label>
              <div className="flex flex-wrap gap-4 mt-5">
                {GLOBAL_ASSETS.frames.map((frame) => (
                  <button
                    key={frame.id}
                    onClick={() => {
                      setSelectedFrame(frame.name);
                      setActiveImage(frame.url); // Use frame URL from GLOBAL_ASSETS
                    }}
                    className={`px-4 py-2 rounded-full border text-md font-semibold uppercase tracking-wider transition-all duration-300
                      ${
                        selectedFrame === frame.name
                          ? "bg-amber-900 text-white border-amber-900 shadow-lg scale-105"
                          : "bg-zinc-50 text-zinc-800 border-zinc-200 hover:border-amber-500 hover:text-amber-800 hover:bg-white"
                      }`}
                  >
                    {frame.name.replace(" Frame", "")}
                  </button>
                ))}
              </div>
            </div>

            {/* QUANTITY & ACTIONS */}
            <div className="space-y-6 md:space-y-8">
              <div className="space-y-3">
                <label className="text-sm md:text-md font-semibold uppercase tracking-widest text-zinc-800">
                  Quantity
                </label>
                <div className="flex items-center justify-between bg-zinc-50 border border-zinc-100 rounded-2xl px-6 py-3 md:py-4 max-w-40">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="text-zinc-400 hover:text-amber-700 p-1"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="font-bold text-sm md:text-base text-zinc-900">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="text-zinc-400 hover:text-amber-700 p-1"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>

              <div className="flex flex-col gap-3 md:gap-4">
                <button
                  onClick={onAddToCart}
                  className="group relative w-full py-5 md:py-6 bg-zinc-900 text-white rounded-3xl md:rounded-[2.5rem] font-semibold uppercase text-sm md:text-md tracking-[0.2em] md:tracking-[0.3em] overflow-hidden shadow-xl active:scale-95 transition-all"
                >
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    Add to Cart <ShoppingBag size={18} />
                  </span>
                  <div className="absolute inset-0 bg-linear-to-r from-amber-600 to-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </button>
                <button
                  onClick={onBuyNow}
                  className="w-full py-5 md:py-6 border-2 border-zinc-100 text-zinc-900 rounded-3xl md:rounded-[2.5rem] font-semibold uppercase text-sm md:text-md tracking-[0.2em] md:tracking-[0.3em] hover:bg-amber-500 active:scale-95 transition-all"
                >
                  Buy Now
                </button>
              </div>
            </div>

            {/* SHIPPING INFO BOX */}
            <div className="p-4 md:p-5 bg-amber-50/30 rounded-2xl border border-amber-100/50 space-y-2">
              <div className="flex items-center gap-3 text-amber-900 font-semibold uppercase text-sm md:text-md tracking-widest">
                <Truck size={16} /> Shipping Logistics
              </div>
              <p className="text-sm md:text-md text-zinc-900 leading-relaxed italic">
                Shipping charges calculated after packing. Lead time:{" "}
                <span className="text-zinc-800 font-semibold">
                  {product.leadTime || "7-18 Days"}
                </span>
                .
              </p>
            </div>
          </div>
        </div>
        {/* --- BOTTOM EXHIBIT --- */}
        <div className="mt-20 md:mt-32 pt-12 md:pt-20 border-t border-zinc-100 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-32">
          {/* TECHNICAL SPECS */}
          <div className="lg:col-span-5 space-y-8 md:space-y-10">
            <h3 className="text-sm font-semibold uppercase tracking-widest text-amber-700">
              Specifications
            </h3>
            <div className="divide-y divide-zinc-50 bg-white rounded-3xl md:rounded-[2.5rem] px-6 md:px-8 py-2 border border-zinc-50 shadow-sm">
              {technicalSpecs.map((spec) => (
                <div
                  key={spec.label}
                  className="flex justify-between items-center py-5 md:py-6 gap-4"
                >
                  <span className="text-xs md:text-sm font-semibold text-zinc-500 uppercase tracking-widest shrink-0">
                    {spec.label}
                  </span>
                  <span className="text-sm md:text-base font-semibold uppercase text-zinc-900 italic text-right">
                    {spec.value || "Not Specified"}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* PRODUCT STORY */}
          <div className="lg:col-span-7 space-y-10 md:space-y-12">
            <div className="space-y-6">
              <h3 className="text-sm font-semibold uppercase tracking-widest text-amber-700">
                The Story
              </h3>
              <h2 className="text-3xl md:text-5xl font-semibold text-zinc-900 tracking-tight leading-tight">
                {product.storyTitle || "Heritage in Every Stroke"}
              </h2>
              <div className="space-y-4">
                <p className="text-zinc-700 text-lg md:text-xl leading-relaxed font-medium">
                  {product.description}
                </p>
                <p className="text-zinc-500 text-md md:text-lg leading-relaxed italic border-l-4 border-amber-200 pl-6 py-2">
                  {product.detailedDescription}
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* ARTISAN HALLMARKS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-10 pt-20">
          {[
            {
              icon: <Award />,
              title: "30+ Years Legacy",
              desc: "Crafted by master artisans from Thanjavur.",
            },
            {
              icon: <Zap />,
              title: "22ct Gold foil",
              desc: "Certified original gold leaf used.",
            },
            {
              icon: <ShieldAlert />,
              title: "Safety & Care",
              desc: "Avoid direct sunlight and moisture.",
            },
            {
              icon: <CheckCircle2 />,
              title: "Durability",
              desc: "Traditional Teak frames and waterproof base.",
            },
          ].map((item, i) => (
            <div key={i} className="flex gap-4 md:gap-5">
              <div className="h-10 w-10 md:h-12 md:w-12 shrink-0 bg-amber-50 rounded-xl md:rounded-2xl flex items-center justify-center text-amber-600 shadow-sm">
                {item.icon}
              </div>
              <div className="space-y-1">
                <h4 className="font-semibold text-sm md:text-md uppercase tracking-widest text-zinc-900">
                  {item.title}
                </h4>
                <p className="text-xs md:text-sm text-zinc-900 leading-relaxed font-medium">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
