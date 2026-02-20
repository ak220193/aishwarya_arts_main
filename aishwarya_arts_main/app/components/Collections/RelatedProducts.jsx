"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

export default function RelatedProducts({ category, currentSlug }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!category) return;

    const fetchRelated = async () => {
      try {
        const res = await fetch(
          `/api/products/related?category=${category}&exclude=${currentSlug}`
        );
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRelated();
  }, [category, currentSlug]);

  if (loading || products.length === 0) return null;

  return (
    <div className="my-20 max-w-7xl mx-auto px-4">
      <h2 className="text-3xl font-bold mb-10 text-center">
        Related Products
      </h2>

      <div className="flex flex-col gap-8">
        {products.map((product) => (
          <Link
            href={`/collections/${product.slug}`}
            key={product._id}
            className="group flex flex-col sm:flex-row gap-8 bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-xl transition"
          >
            {/* IMAGE */}
            <div className="w-full sm:w-60 h-60 flex items-center justify-center overflow-hidden rounded-xl bg-white">
              <img
                src={product.images?.[0] || product.img}
                alt={product.name}
                className="object-contain w-full h-full group-hover:scale-105 transition"
              />
            </div>

            {/* CONTENT */}
            <div className="flex flex-col justify-between flex-1">
              <div>
                <h3 className="text-2xl font-semibold">{product.name}</h3>
                <p className="text-gray-600 mt-1">{product.category}</p>

                <p className="text-gray-700 mt-4 line-clamp-3">
                  {product.desc}
                </p>

                <div className="mt-4 text-xl font-bold text-emerald-700">
                  Price on Request
                </div>
              </div>

              <div className="mt-6 flex gap-4">
                <button className="w-1/2 bg-linear-to-r from-yellow-700 to-yellow-500 text-white py-3 rounded-lg font-semibold">
                  Buy Now
                </button>

                <button className="w-1/2 border border-emerald-600 text-emerald-700 py-3 rounded-lg font-semibold">
                  Add to Cart
                </button>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
