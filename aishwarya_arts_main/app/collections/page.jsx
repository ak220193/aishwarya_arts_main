'use client'
import React, { useEffect, useState } from "react";
import GodFilter from "../components/Collections/GodFilter";
import FrameSizeFilter from "../components/Collections/FrameSizeFilter";
import PriceFilter from "../components/Collections/PriceFilter";
import AvailabilityFilter from "../components/Collections/AvailablityFilter";
import ProductGrid from "../components/Collections/ProductGrid";
import ModernTanjore from "../components/Collections/ModernTanjore";


const CollectionsPage = () => {
  const [products, setProducts] = useState([]);   // raw DB data
  const [filtered, setFiltered] = useState([]);   // filtered data
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState({
    god: "",
    frameSize: "",
    min: 0,
    max: 100000,
    availability: "",
  });



  // ================= FETCH PRODUCTS =================
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

  // ================= APPLY FILTERS =================
  useEffect(() => {
    if (!products.length) return;

    let temp = [...products];

    // GOD FILTER
    if (filters.god) {
      temp = temp.filter((p) => p.category === filters.god);
    }

    // FRAME SIZE FILTER
    if (filters.frameSize) {
      temp = temp.filter((p) =>
        p.variations?.sizes?.includes(filters.frameSize)
      );
    }

    // PRICE FILTER
    temp = temp.filter((p) => {
      const prices = Object.values(p.variations?.prices || {});
      if (!prices.length) return true;

      const minPrice = Math.min(...prices);
      const maxPrice = Math.max(...prices);

      return (
        maxPrice >= filters.min && minPrice <= filters.max
      );
    });

    // AVAILABILITY FILTER
    if (filters.availability === "in-stock") {
      temp = temp.filter((p) => p.inStock);
    }

    if (filters.availability === "out-of-stock") {
      temp = temp.filter((p) => !p.inStock);
    }

    setFiltered(temp);
  }, [filters, products]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* HEADER */}
      <div className="flex flex-col items-center text-center mb-10">
        <h1 className="text-3xl font-semibold">
          Aishwarya Arts — Collections
        </h1>
        <p className="mt-2 text-lg">
          Explore our exquisite collections
        </p>
      </div>

      <div className="flex gap-10">
        {/* LEFT FILTERS */}
        <aside className="w-72 hidden md:block p-5 h-fit">
          <h2 className="text-lg font-semibold mb-4">Filter</h2>

          <div className="space-y-6 border-t pt-4">
            <GodFilter
              selected={filters.god}
              onChange={(v) =>
                setFilters((prev) => ({ ...prev, god: v }))
              }
            />

            <FrameSizeFilter
              selected={filters.frameSize}
              onChange={(v) =>
                setFilters((prev) => ({ ...prev, frameSize: v }))
              }
            />

            <PriceFilter
              selected={[filters.min, filters.max]}
              onChange={([min, max]) =>
                setFilters((prev) => ({ ...prev, min, max }))
              }
            />
          </div>

          <AvailabilityFilter
            selected={filters.availability}
            onChange={(v) =>
              setFilters((prev) => ({ ...prev, availability: v }))
            }
          />
        </aside>

        {/* MAIN CONTENT */}
        <main className="flex-1">
          {loading ? (
            <p className="text-center py-20">Loading products…</p>
          ) : filtered.length === 0 ? (
            <p className="text-center py-20">
              No products found for selected filters
            </p>
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
