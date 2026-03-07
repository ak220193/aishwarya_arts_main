"use client";
import React, { useEffect, useState } from "react";
import FilterSidebar from "../../components/Collections/FilterSidebar";
import ProductGrid from "../../components/Collections/ProductGrid";
import SortDropdown from "../../components/Collections/SortDropdown";
import { Loader2, SlidersHorizontal, X } from "lucide-react"; 

import axios from "axios";

import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useCartStore } from "../../../store/useCartStore";
import { useWishlistStore } from "../../../store/useWishlistStore";
import { useAuthStore } from "../../../store/useAuthStore";
import { useSession } from "next-auth/react";

const CollectionsPage = () => {
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const { data: session, status } = useSession();
  const { isLoggedIn } = useAuthStore();
  
  const addToCart = useCartStore((state) => state.addToCart);
  const toggleWishlist = useWishlistStore((state) => state.toggleWishlist);

  useEffect(() => {
    setMounted(true);
    const fetchLiveProducts = async () => {
      try {
        const res = await axios.get("/api/admin/products");
        // Filter: Only show products that are marked "In Stock" for customers
        const publicProducts = (res.data.data || []).filter(p => p.inStock);
        setProducts(publicProducts);
      } catch (err) {
        console.error("COLLECTION SIGNAL ERROR:", err);
        toast.error("Could not sync gallery data.");
      } finally {
        setLoading(false);
      }
    };
    fetchLiveProducts();
  }, []);



useEffect(() => {
  const checkGoogleUserProfile = async () => {
    if (status === "authenticated" && session?.user) {
      const res = await fetch("/api/users/profile");
      const result = await res.json();
      
      // If a Google user has no phone, they can't buy. Remind them!
      if (result.success && !result.data.primaryPhone) {
        toast("Complete your profile to enable express checkout!", {
          icon: '🎨',
          duration: 6000,
        });
      }
    }
  };
  checkGoogleUserProfile();
}, [status]);



  const handleAddToCart = (product) => {
    const absoluteAuth = useAuthStore.getState().isLoggedIn;

    if (!absoluteAuth) {
      toast.error("Please login to add items to cart!");
      router.push("/login"); 
      return;
    }

    addToCart({
      id: product._id,
      title: product.title,
      // Fallback SKU if not present
      sku: product.sku || `AA-${product._id.slice(-5).toUpperCase()}`, 
      // Use the product's base price since no matrix selection is made here
      price: product.offerPrice || product.price, 
      image: product.images[0],
      quantity: 1, // Default to 1 from grid view
      size: product.dimensions || "Standard", // Default size from DB
      frame: product.frameType || "Classic Frame", // Default frame from DB
      style: product.workStyle || "Flat", // Default style from DB
      godName: product.godName
    });
    
    toast.success(`${product.title} added to cart!`);
  };

  const handleWishlistToggle = (product) => {
    const currentLoginStatus = useAuthStore.getState().isLoggedIn;

    if (!currentLoginStatus) {
      toast.error("Please login to save favorites!");
      router.push("/login");
      return;
    }

    toggleWishlist({
      id: product._id,
      title: product.title,
      sku: product.sku || `AA-${product._id.slice(-5).toUpperCase()}`,
      price: product.offerPrice || product.price, 
      image: product.images[0],
      size: product.dimensions || "Standard",
      frame: product.frameType || "Classic Frame",
      style: product.workStyle || "Flat",
      godName: product.godName,
      inStock: product.inStock
    });
  };

  if (!mounted) return null;
  
  return (
    <div className="bg-white min-h-screen font-outfit relative">
      {/* --- MOBILE FILTER DRAWER --- */}
      <div
        className={`fixed inset-0 z-50 lg:hidden transition-transform duration-300 ${isMobileFilterOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div
          className="absolute inset-0"
          onClick={() => setIsMobileFilterOpen(false)}
        />
        <div className="absolute inset-y-0 left-0 w-4/5 max-w-xs bg-white p-6 shadow-xl overflow-y-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold">Filters</h2>
            <button
              onClick={() => setIsMobileFilterOpen(false)}
              className="p-2"
            >
              <X size={24} />
            </button>
          </div>
          <FilterSidebar />
        </div>
      </div>

      {/* --- HEADER --- */}
      <header className="border-b border-gray-100 py-6 lg:py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <nav className="hidden md:block text-[10px] uppercase tracking-[0.2em] text-black mb-4">
            <a href="/" className="hover:text-amber-700">
              Home
            </a>{" "}
            / Collections
          </nav>

          <div className="flex flex-col gap-6">
            <h1 className="text-2xl lg:text-4xl font-semibold text-gray-900">
              All Paintings
            </h1>

            {/* Mobile Filter & Sort Bar */}
            <div className="flex items-center justify-between border-y border-gray-100 py-4 lg:hidden">
              <button
                onClick={() => setIsMobileFilterOpen(true)}
                className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest"
              >
                <SlidersHorizontal size={16} /> Filters
              </button>
              <div className="h-4 w-px "></div>
              <SortDropdown />
            </div>

            {/* Desktop Count & Sort */}
            <div className="hidden lg:flex items-center justify-between">
              <p className="text-md text-black italic">
                Showing unique designs
              </p>
              <SortDropdown />
            </div>
          </div>
        </div>
      </header>

      {/* --- MAIN CONTENT --- */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 lg:py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* DESKTOP SIDEBAR */}
          <aside className="hidden lg:block lg:w-1/4 h-fit sticky top-24">
            <FilterSidebar />
          </aside>

          {/* PRODUCT GRID */}
          <main className="lg:w-3/4 w-full">
            {/* 4. Conditional Rendering based on Signal Status */}
            {loading ? (
              <div className="h-96 flex flex-col items-center justify-center text-zinc-400 gap-4">
                <Loader2 className="animate-spin" size={32} />
                <p className="font-bold uppercase tracking-widest text-xs">Syncing Art Gallery...</p>
              </div>
            ) : products.length > 0 ? (
              <ProductGrid 
                products={products} // Now using live database signal
                onWishlistToggle={handleWishlistToggle} 
                onAddToCart={handleAddToCart}
              />
            ) : (
              <div className="h-96 flex items-center justify-center border-2 border-dashed border-zinc-100 rounded-[3rem]">
                 <p className="text-zinc-400 font-bold uppercase tracking-tighter">No masterpieces currently in stock.</p>
              </div>
            )}

            {products.length > 12 && (
              <div className="mt-16 flex flex-col items-center gap-4">
                <div className="h-px w-12 bg-amber-200"></div>
                <button className="w-full md:w-auto px-12 py-4 border border-gray-900 rounded-full font-bold text-[10px] uppercase tracking-[0.2em] hover:bg-gray-900 hover:text-white transition-all duration-300">
                  Load More
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default CollectionsPage;
