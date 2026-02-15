"use client";
import { memo } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiHeart } from "react-icons/fi";
import { toast } from "react-hot-toast";

const BestSellers = () => {


  return (
    <section
      className="max-w-7xl mx-auto py-20 px-4"
      aria-labelledby="best-sellers-heading"
      itemScope
      itemType="https://schema.org/CollectionPage"
    >
      {/* Heading */}
      <header className="text-center mb-12">
        <h1
          id="best-sellers-heading"
          className="text-4xl md:text-5xl font-bold text-gray-900 leading-relaxed tracking-wider font-cinzel"
        >
          Best Sellers
        </h1>
        <p className="text-black text-lg max-w-xl mx-auto">
          Discover our most admired handmade artworks — crafted with precision
          and passion to bring culture and creativity home.
        </p>
      </header>

      {/* Product Grid */}
      <ul
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
        itemScope
        itemType="https://schema.org/ItemList"
      >
        
      </ul>
    </section>
  );
};

export default memo(BestSellers);
