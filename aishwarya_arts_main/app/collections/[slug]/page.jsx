"use client";
import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import RelatedProducts from "../../components/Collections/RelatedProducts";
import { useParams } from "next/navigation";

export default function ProductPage({ params }) {
  const { slug } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [mainImage, setMainImage] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedFrame, setSelectedFrame] = useState("");
  const [qty, setQty] = useState(1);

  // 🔥 FETCH SINGLE PRODUCT FROM BACKEND
  useEffect(() => {
    if (!slug) return;

    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await fetch(`/api/products/${slug}`);
        if (!res.ok) throw new Error("Product not found");

        const data = await res.json();
        setProduct(data);

        const imgs = data.images?.length ? data.images : [data.img];
        setMainImage(imgs[0] || "");
        setSelectedSize(data.variations?.sizes?.[0] ?? "");
        setSelectedFrame(data.variations?.frameTypes?.[0] ?? "");
      } catch (err) {
        setError(err.message);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [slug]);

  // ---- PRICE LOGIC ----
  const priceInfo = useMemo(() => {
    if (!product) return { hasPrice: false };
    const values = Object.values(product.variations?.prices || {});
    if (!values.length) return { hasPrice: false };

    return {
      hasPrice: true,
      min: Math.min(...values),
      max: Math.max(...values),
    };
  }, [product]);

  // ---- LOADING ----
  if (loading) {
    return <p className="text-center py-20">Loading product…</p>;
  }

  // ---- ERROR ----
  if (error || !product) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center p-8">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-2">Product not found</h2>
          <p className="text-gray-600">
            The product you are looking for does not exist.
          </p>
          <Link
            href="/collections"
            className="inline-block mt-4 text-emerald-700"
          >
            Back to collections
          </Link>
        </div>
      </div>
    );
  }

  const images = product.images?.length ? product.images : [product.img];

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 mt-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* LEFT – IMAGES */}
        <div className="lg:col-span-6 flex gap-6">
          <div className="hidden md:flex flex-col gap-4 w-24">
            {images.map((src, i) => (
              <button
                key={src + i}
                onClick={() => setMainImage(src)}
                className={`h-24 w-24 border rounded ${
                  mainImage === src ? "border-emerald-700" : "border-gray-300"
                }`}
              >
                <img src={src} alt="" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>

          <div className="flex-1">
            <img
              src={mainImage}
              alt={product.name}
              className="w-full h-[600px] object-contain"
            />
          </div>
        </div>

        {/* RIGHT – DETAILS */}
        <div className="lg:col-span-6">
          <h1 className="text-3xl font-semibold">{product.name}</h1>
          <p className="text-gray-500 mt-2">{product.category}</p>

          {/* PRICE */}
          <div className="mt-5">
            {priceInfo.hasPrice ? (
              <div className="text-3xl font-bold">
                ₹{priceInfo.min.toLocaleString("en-IN")}
              </div>
            ) : (
              <div className="text-xl font-semibold">Price on request</div>
            )}
          </div>

          <p className="mt-4 text-gray-700">{product.desc}</p>

          {/* SIZE */}
          <div className="mt-6">
            <label className="font-medium">Frame Size</label>
            <div className="flex gap-3 mt-2">
              {product.variations?.sizes?.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 border rounded ${
                    selectedSize === size ? "bg-emerald-700 text-white" : ""
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* FRAME TYPE */}
          <div className="mt-6">
            <label className="font-medium">Painting Type</label>
            <div className="flex gap-3 mt-2">
              {product.variations?.frameTypes?.map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedFrame(type)}
                  className={`px-4 py-2 border rounded ${
                    selectedFrame === type ? "bg-emerald-700 text-white" : ""
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* QTY */}
          <div className="mt-6 flex items-center gap-3">
            <button onClick={() => setQty((q) => Math.max(1, q - 1))}>−</button>
            <span>{qty}</span>
            <button onClick={() => setQty((q) => q + 1)}>+</button>
          </div>

          <div className="mt-4 text-sm">
            {product.inStock ? (
              <span className="text-green-600">In stock</span>
            ) : (
              <span className="text-red-500">Out of stock</span>
            )}
          </div>
        </div>
      </div>

      <RelatedProducts category={product.category} currentSlug={product.slug} />
    </div>
  );
}
