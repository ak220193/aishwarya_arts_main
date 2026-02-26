"use client";
import React, { useState, useRef, use, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import {
  Heart, Star, Truck, Plus, Minus, CheckCircle2, 
  ShieldAlert, ShoppingBag, ArrowLeft, Loader2
} from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import { useCartStore } from "../../../../store/useCartStore";
import { useWishlistStore } from "../../../../store/useWishlistStore";
import { useAuthStore } from "../../../../store/useAuthStore";

const ProductPage = ({params}) => {
  const [mounted, setMounted] = useState(false);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { isLoggedIn } = useAuthStore();
  const router = useRouter();
  const resolvedParams = use(params);
  const productId = resolvedParams.id;

  // 1. SIGNAL FETCH: Connects to your live MongoDB controller
  useEffect(() => {
    setMounted(true);
    const fetchProductDetails = async () => {
      try {
        const res = await axios.get(`/api/admin/products/${productId}`);
        setProduct(res.data.data);
      } catch (err) {
        console.error("Signal Lost:", err);
        toast.error("Failed to load masterpiece details.");
      } finally {
        setLoading(false);
      }
    };
    fetchProductDetails();
  }, [productId]);

  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [zoomData, setZoomData] = useState({ x: 0, y: 0, show: false });
  const imgRef = useRef(null);
  const addToCart = useCartStore((state) => state.addToCart);
  const toggleWishlist = useWishlistStore((state) => state.toggleWishlist);
  const wishlist = useWishlistStore((state) => state.wishlist);

  const isInWishlist = wishlist.some((item) => (item.id === product?._id || item._id === product?._id));

  useEffect(() => {
    if (product) setSelectedSize(product.dimensions);
  }, [product]);

  if (loading) return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <Loader2 className="animate-spin text-yellow-600" size={40} />
      <p className="uppercase text-[10px] font-bold tracking-[0.3em]">Restoring Art Signal...</p>
    </div>
  );

  if (!product) return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6">
      <h1 className="text-2xl font-bold uppercase tracking-tighter">Masterpiece not found</h1>
      <Link href="/collections" className="flex items-center gap-2 text-sm font-bold uppercase underline underline-offset-8 decoration-yellow-500">
        <ArrowLeft size={16} /> Back to Gallery
      </Link>
    </div>
  );

  const handleMouseMove = (e) => {
    if (!imgRef.current) return;
    const { left, top, width, height } = imgRef.current.getBoundingClientRect();
    const x = ((e.pageX - left - window.scrollX) / width) * 100;
    const y = ((e.pageY - top - window.scrollY) / height) * 100;
    setZoomData({ x, y, show: true });
  };

  const handleWishlistToggle = () => {
   const isActuallyLoggedIn = useAuthStore.getState().isLoggedIn;
   if (!isActuallyLoggedIn) {
      toast.error("Login to wishlist this painting");
      router.push("/login");
      return;
    }
    toggleWishlist({
      id: product._id,
      title: product.title,
      price: product.offerPrice || product.price,
      image: product.images[0],
    });
    if (!isInWishlist) toast.success("Added to Wishlist");
  };

  const onAddToCart = () => {
    const isActuallyLoggedIn = useAuthStore.getState().isLoggedIn;
    if (!isActuallyLoggedIn) {
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
    });
    toast.success(`${quantity} Item(s) added to cart`);
  };

  const onBuyNow = () => {
    const isActuallyLoggedIn = useAuthStore.getState().isLoggedIn;
    if (!isActuallyLoggedIn) {
      toast.error("Please login to proceed to checkout");
      router.push("/login");
      return;
    }
    onAddToCart();
    router.push("/cart");
  };

  // 2. DATA MAPPING: Converting flat DB fields to the spec table format
  const technicalSpecs = [
    { label: "Divine Subject", value: product.godName },
    { label: "Work Style", value: product.workStyle },
    { label: "Weight", value: product.weight },
    { label: "Frame Type", value: product.frameType },
    { label: "Lead Time", value: product.leadTime },
  ];

  return (
    <div className="min-h-screen pb-12 md:pb-24 font-outfit">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 md:py-6 text-[10px] uppercase tracking-[0.2em] text-gray-400">
        <Link href="/" className="hover:text-yellow-600 cursor-pointer">Home</Link> /
        <Link href="/collections" className="hover:text-yellow-600 cursor-pointer mx-2">Collections</Link> /
        <span className="text-black ml-2 line-clamp-1 inline">{product.title}</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
          <div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-4">
            <div className="flex flex-row md:flex-col gap-3 overflow-x-auto md:overflow-visible pb-2 md:pb-0 md:mt-0 lg:mt-8">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={`relative shrink-0 w-20 h-20 bg-zinc-50 rounded-2xl overflow-hidden transition-all duration-300 ${
                    activeImage === idx ? "ring-2 ring-yellow-500 ring-offset-4" : "opacity-60 hover:opacity-100"
                  }`}
                >
                  <Image src={img} alt="thumb" fill className="object-cover" />
                </button>
              ))}
            </div>

            <div
              className="relative w-full max-w-xl aspect-square md:h-120 lg:h-140 xl:h-160 rounded-3xl md:rounded-[2.5rem] overflow-hidden cursor-crosshair group mb-5"
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setZoomData((prev) => ({ ...prev, show: true }))}
              onMouseLeave={() => setZoomData((prev) => ({ ...prev, show: false }))}
            >
              <Image
                ref={imgRef}
                src={product.images[activeImage]}
                alt={product.title}
                fill
                className={`object-contain p-2 transition-opacity duration-300 ${zoomData.show ? "opacity-0" : "opacity-100"}`}
                priority
              />
              {zoomData.show && (
                <div
                  className="hidden md:block absolute inset-0 z-10 w-full h-full pointer-events-none"
                  style={{
                    backgroundImage: `url(${product.images[activeImage]})`,
                    backgroundPosition: `${zoomData.x}% ${zoomData.y}%`,
                    backgroundSize: "250%",
                    backgroundRepeat: "no-repeat",
                  }}
                />
              )}
              <button onClick={handleWishlistToggle} className="absolute top-4 right-4 md:top-6 md:right-6 z-20 p-2 md:p-3 rounded-full bg-white/90 shadow-sm transition-transform hover:scale-110">
                <Heart size={20} className={isInWishlist ? "fill-red-500 text-red-500" : "text-black"} />
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-6 md:space-y-10 py-2">
            <div className="space-y-4">
              <div className="space-y-1">
                <h2 className="text-3xl lg:text-3xl text-black font-normal ">{product.title}</h2>
                <p className="text-yellow-700 font-medium opacity-80 uppercase text-[12px] tracking-widest">{product.workStyle} Tanjore Work</p>
              </div>
            </div>

            <div className="p-2 md:p-4 rounded-3xl md:rounded-4xl border border-yellow-50 space-y-4">
              <div className="flex flex-row items-end gap-3 md:gap-4">
                <span className="text-4xl md:text-5xl text-black tracking-tighter font-normal">
                  ₹{(product.offerPrice || product.price).toLocaleString("en-IN")}
                </span>
                {product.offerPrice && (
                  <span className="text-lg md:text-xl text-gray-400 line-through mb-1">
                    ₹{product.price.toLocaleString("en-IN")}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2 text-[10px] font-bold text-green-600 uppercase tracking-widest bg-green-50 w-fit px-3 py-1 rounded-full border border-green-100">
                <CheckCircle2 size={12} /> Authentic 22ct Gold Foil
              </div>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <label className="text-[14px] md:text-[18px] font-semibold text-gray-900 tracking-wider">Frame Size</label>
                  <div className="w-full bg-white border border-gray-100 rounded-2xl px-5 py-3 md:py-4 text-sm font-normal uppercase">{product.dimensions}</div>
                </div>
                <div className="space-y-3">
                  <label className="text-[14px] md:text-[18px] font-semibold text-gray-900 tracking-wider">Quantity</label>
                  <div className="flex items-center justify-between bg-white border border-gray-100 rounded-2xl px-5 py-3 md:py-4 shadow-sm">
                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="hover:text-yellow-600 p-1"><Minus size={16} /></button>
                    <span className="font-normal text-sm">{quantity}</span>
                    <button onClick={() => setQuantity(quantity + 1)} className="hover:text-yellow-600 p-1"><Plus size={16} /></button>
                  </div>
                </div>
              </div>

              <div className="flex flex-row gap-3">
                <button onClick={onBuyNow} className="w-full bg-black text-white py-4 md:py-5 rounded-2xl font-semibold text-sm uppercase tracking-[0.2em] hover:bg-yellow-600 transition-all shadow-xl flex items-center justify-center gap-3">
                  <ShoppingBag size={18} /> Buy Now
                </button>
                <button onClick={onAddToCart} className="w-full bg-white text-black border border-black py-4 md:py-5 rounded-2xl font-semibold text-sm uppercase tracking-[0.2em] hover:bg-gray-100 transition-all">Add To Cart</button>
              </div>
            </div>

            <div className="flex items-start md:items-center gap-4 p-4 md:p-5 bg-[#FAF8F2] rounded-2xl border border-yellow-100/50">
              <div className="p-3 bg-white rounded-xl shadow-sm shrink-0"><Truck size={25} className="text-yellow-700" /></div>
              <div className="flex-1">
                <span className="text-[13px] md:text-[15px] font-semibold uppercase tracking-wider text-yellow-800">Secure Delivery</span>
                <p className="text-sm md:text-sm font-medium text-gray-800 mt-1">Insured & careful shipping for these fragile masterpieces.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 md:mt-32 pt-12 md:pt-20 border-t border-yellow-100 grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-20">
          <div className="lg:col-span-5 space-y-6 md:space-y-8">
            <h3 className="text-[16px] md:text-[18px] font-semibold uppercase tracking-wide text-yellow-600">Specifications</h3>
            <div className="space-y-1 divide-y divide-yellow-100 bg-white rounded-3xl md:rounded-[2.5rem] px-6 md:px-8 py-4 border border-yellow-50 shadow-sm">
              {technicalSpecs.map((spec) => (
                <div key={spec.label} className="flex flex-row justify-between items-center py-4 md:py-6">
                  <span className="text-[12px] md:text-[15px] font-semibold text-gray-900 uppercase tracking-wider pr-2">{spec.label}</span>
                  <span className="text-sm md:text-md font-bold text-black text-right capitalize">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7 space-y-8 md:space-y-12">
            <div>
              <h3 className="text-[16px] md:text-[18px] font-semibold uppercase tracking-wide text-yellow-600">Product Story</h3>
              <h2 className="text-2xl md:text-3xl font-semibold text-black leading-tight mt-2">Heritage in Every Stroke</h2>
              <p className="text-zinc-500 leading-relaxed mt-4">{product.description}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
              {[
                { title: "Skill", desc: "Crafted by master artisans in Thanjavur." },
                { title: "Authentic", desc: "22 Carat Original Gold Foil used." },
                { title: "Premium", desc: "Water-resistant plywood & cloth base." },
                { title: "Durable", desc: "Traditional Teak Wood Frame." },
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="h-10 w-10 shrink-0 bg-yellow-500 rounded-full flex items-center justify-center font-semibold text-sm text-white">{i + 1}</div>
                  <div className="space-y-1">
                    <h4 className="font-semibold text-sm uppercase tracking-widest text-black">{item.title}</h4>
                    <p className="text-sm text-gray-500 leading-relaxed font-medium">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-6 md:p-8 bg-neutral-800 rounded-3xl md:rounded-4xl text-white space-y-4">
              <div className="flex items-center gap-2 text-yellow-500">
                <ShieldAlert size={20} /><span className="text-sm font-semibold uppercase tracking-widest">Safety & Care</span>
              </div>
              <p className="text-sm md:text-sm text-white leading-relaxed">This artwork is fragile. Avoid direct sunlight and moisture to preserve the 22K Gold Foil for generations.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;