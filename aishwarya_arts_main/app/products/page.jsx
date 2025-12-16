"use client";

import React, { useEffect, useState, useMemo } from "react";
import { useParams } from "next/navigation";
import RelatedProducts from "../../components/Collections/RelatedProducts";

export default function ProductPage() {
  const params = useParams();
  const { slug } = params;

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [mainImage, setMainImage] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedFrame, setSelectedFrame] = useState("");
  const [qty, setQty] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/products/${slug}`);
        const data = await res.json();

        if (!res.ok) {
          setError(data.message || "Product not found");
          setProduct(null);
        } else {
          setProduct(data);
          setMainImage(data.images?.[0] || data.img);
          setSelectedSize(data.variations?.sizes?.[0] || "");
          setSelectedFrame(data.variations?.frameTypes?.[0] || "");
        }
      } catch (err) {
        setError("Failed to fetch product");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [slug]);

  const priceInfo = useMemo(() => {
    if (!product) return { hasPrice: false };
    const priceValues = Object.values(product.variations?.prices || {});
    if (priceValues.length === 0) return { hasPrice: false };
    const min = Math.min(...priceValues);
    const max = Math.max(...priceValues);
    return { hasPrice: true, min, max };
  }, [product]);

  if (loading) {
    return <p className="text-center py-20">Loading product…</p>;
  }

  if (error) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center p-8 text-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 mt-10">
      {/* Top two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* IMAGES */}
        <div className="lg:col-span-6 flex gap-6 items-center justify-center">
          <div className="hidden md:flex flex-col gap-4 w-24">
            {product.images?.map((src, i) => (
              <button
                key={src + i}
                onClick={() => setMainImage(src)}
                className={`h-24 w-24 rounded-lg overflow-hidden border ${
                  mainImage === src ? "border-emerald-700" : "border-gray-200"
                } p-1 bg-white shadow-sm hover:shadow-md transition`}
              >
                <img src={src} alt="" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
          <div className="flex-1 flex items-center justify-center bg-gradient-to-b from-white to-gray-50 rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <img
              src={mainImage}
              alt={product.name}
              className="w-full h-[550px] md:h-[650px] object-contain transition-transform duration-300 hover:scale-105"
            />
          </div>
        </div>

        {/* DETAILS */}
        <div className="lg:col-span-6 flex flex-col justify-start">
          <h1 className="text-2xl md:text-3xl font-semibold leading-tight">
            {product.name}
          </h1>
          <p className="text-gray-500 mt-2">{product.category}</p>

          <div className="mt-5 flex items-baseline gap-4">
            {priceInfo.hasPrice ? (
              <>
                <div className="text-3xl font-bold text-gray-900">
                  ₹{priceInfo.min.toLocaleString("en-IN")}
                </div>
                {priceInfo.max !== priceInfo.min && (
                  <div className="text-sm text-gray-500 line-through">
                    ₹{priceInfo.max.toLocaleString("en-IN")}
                  </div>
                )}
              </>
            ) : (
              <div className="text-2xl font-semibold text-gray-900">
                Price on request
              </div>
            )}
          </div>

          {/* Description */}
          <p className="text-gray-700 mt-4 leading-relaxed whitespace-pre-line">
            {product.desc}
          </p>

          {/* Selectors */}
          <div className="mt-6 flex flex-col gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Frame Size
              </label>
              <div className="mt-2 flex flex-wrap gap-3">
                {product.variations?.sizes?.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 rounded-md border text-sm font-medium transition ${
                      selectedSize === size
                        ? "bg-gradient-to-r from-yellow-700 to-yellow-500 shadow-md text-white"
                        : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Painting Type
              </label>
              <div className="mt-2 flex flex-wrap gap-3">
                {product.variations?.frameTypes?.map((type) => (
                  <button
                    key={type}
                    onClick={() => setSelectedFrame(type)}
                    className={`px-4 py-2 rounded-md border text-sm font-medium transition ${
                      selectedFrame === type
                        ? "bg-gradient-to-r from-yellow-700 to-yellow-500 shadow-md text-white"
                        : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RELATED PRODUCTS */}
      <RelatedProducts />
    </div>
  );
}
