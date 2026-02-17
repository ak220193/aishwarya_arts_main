"use client";
import React, { useState } from "react";
import FilterSidebar from "../components/Collections/FilterSidebar";
import ProductGrid from "../components/Collections/ProductGrid";
import SortDropdown from "../components/Collections/SortDropdown";
import { SlidersHorizontal, X } from "lucide-react"; // Install lucide-react if not already

const CollectionsPage = () => {
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const dummyProducts = [
    {
      _id: "1",
      title: "Lord Ganesha 3D Gold Foil Painting",
      price: 18000,
      offerPrice: 15500,
      godName: "Ganesha",
      workType: "3d",
      images: [
        "https://i.pinimg.com/1200x/ae/9b/72/ae9b72b10034ea10397ac96f7abb0287.jpg",
      ],
    },
    {
      _id: "2",
      title: "Gajalakshmi Traditional Teak Frame",
      price: 25000,
      offerPrice: 22000,
      godName: "Lakshmi",
      workType: "2d",
      images: [
        "https://i.pinimg.com/736x/b7/57/0c/b7570c2868e72717ce38f99e6756c25d.jpg",
      ],
    },
    ...Array(4)
      .fill({})
      .map((_, i) => ({
        _id: `temp-${i}`,
        title: "Traditional Tanjore Artwork",
        price: 15000,
        offerPrice: 13500,
        godName: "Traditional",
        workType: "flat",
        images: [
          "https://i.pinimg.com/736x/b7/57/0c/b7570c2868e72717ce38f99e6756c25d.jpg",
        ],
      })),
  ];

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
            <h1 className="text-2xl lg:text-4xl font-bold text-gray-900">
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
              <div className="h-4 w-[1px] "></div>
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
            <ProductGrid products={dummyProducts} />

            <div className="mt-16 flex flex-col items-center gap-4">
              <div className="h-[1px] w-12 bg-amber-200"></div>
              <button className="w-full md:w-auto px-12 py-4 border border-gray-900 rounded-full font-bold text-[10px] uppercase tracking-[0.2em] hover:bg-gray-900 hover:text-white transition-all duration-300">
                Load More
              </button>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default CollectionsPage;
