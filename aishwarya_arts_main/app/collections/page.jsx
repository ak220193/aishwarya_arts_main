'use client'
import React, { useEffect, useState } from "react";
import { useStore } from "../store/useStore"; // Import the store
import GodFilter from "../components/Collections/GodFilter";
import FrameSizeFilter from "../components/Collections/FrameSizeFilter";
import PriceFilter from "../components/Collections/PriceFilter";
import AvailabilityFilter from "../components/Collections/AvailablityFilter";
import ProductGrid from "../components/Collections/ProductGrid";
import ModernTanjore from "../components/Collections/ModernTanjore";

const CollectionsPage = () => {
  const [products, setProducts] = useState([]);   // Raw data from DB
  const [filtered, setFiltered] = useState([]);   // Data to display
  const [loading, setLoading] = useState(true);

  // Get filter state and setter from Zustand
  const { filters, setFilters, searchQuery } = useStore();

  // 1. FETCH PRODUCTS
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/products");
        const data = await res.json();
        setProducts(data);
        setFiltered(data);
      } catch (err) {
        console.error("Failed to fetch products", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // 2. APPLY FILTERS (Listens to Zustand 'filters' and 'searchQuery')
  useEffect(() => {
    if (!products.length) return;

    let temp = [...products];

    // Search Query Filter (from Navbar)
    if (searchQuery) {
      temp = temp.filter((p) => 
        p.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // God/Category Filter
    if (filters.god) {
      temp = temp.filter((p) => p.category === filters.god);
    }

    // Frame Size Filter
    if (filters.frameSize) {
      temp = temp.filter((p) =>
        p.variations?.sizes?.includes(filters.frameSize)
      );
    }

    // Price Filter
    temp = temp.filter((p) => {
      const prices = Object.values(p.variations?.prices || {});
      if (!prices.length) return true;
      const minPrice = Math.min(...prices);
      const maxPrice = Math.max(...prices);
      return maxPrice >= filters.min && minPrice <= filters.max;
    });

    // Availability Filter
    if (filters.availability === "in-stock") {
      temp = temp.filter((p) => p.inStock);
    } else if (filters.availability === "out-of-stock") {
      temp = temp.filter((p) => !p.inStock);
    }

    setFiltered(temp);
  }, [filters, products, searchQuery]); 

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col items-center text-center mb-10">
        <h1 className="text-3xl font-semibold">Aishwarya Arts — Collections</h1>
        <p className="mt-2 text-lg">Explore our exquisite Tanjore paintings</p>
      </div>

      <div className="flex gap-10">
        <aside className="w-72 hidden md:block p-5 h-fit bg-white rounded-xl shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Filters</h2>

          <div className="space-y-6 border-t pt-4">
            <GodFilter
              selected={filters.god}
              onChange={(v) => setFilters({ god: v })}
            />

            <FrameSizeFilter
              selected={filters.frameSize}
              onChange={(v) => setFilters({ frameSize: v })}
            />

            <PriceFilter
              selected={[filters.min, filters.max]}
              onChange={([min, max]) => setFilters({ min, max })}
            />

            <AvailabilityFilter
              selected={filters.availability}
              onChange={(v) => setFilters({ availability: v })}
            />
            
            <button 
              onClick={() => useStore.getState().resetFilters()}
              className="text-xs text-red-500 underline mt-4"
            >
              Clear All Filters
            </button>
          </div>
        </aside>

        <main className="flex-1">
          {loading ? (
            <div className="text-center py-20">Loading paintings...</div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-2xl shadow-sm">
              No paintings match your selection.
            </div>
          ) : (
            <ProductGrid products={filtered} />
          )}
          <ModernTanjore />
        </main>
      </div>
    </div>
  );
};

export default CollectionsPage;