'use client'
import React, { useEffect, useState } from "react";
import ProductCard from "../Collections/ProductCard";

const ModernTanjore = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await fetch("/api/products?collection=modern-tanjore");
        if (!res.ok) throw new Error("Failed to fetch Modern Tanjore products");

        const data = await res.json();
        setProducts(data.slice(0, 3)); // top 3 products
      } catch (err) {
        setError(err.message);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <p className="text-center py-10">Loading Modern Tanjore products…</p>;
  if (error) return <p className="text-center py-10 text-red-600">{error}</p>;
  if (!products.length) return <p className="text-center py-10">No Modern Tanjore products found</p>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 mt-10">
      <h1 className="text-2xl font-semibold mb-6 text-center">
        Modern Tanjore Arts
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ModernTanjore;
