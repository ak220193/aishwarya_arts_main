"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import React from "react";
import Link from "next/link";

export default function FeaturedProducts() {
 

  return (
    <section className="max-w-7xl mx-auto py-20 px-4 md:px-8">
      {/* Heading */}
      <div className="text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-8  text-center cursor-pointer inline-block group">
          Featured Selling Products
          <span className="block h-1 w-0 bg-red-400 transition-all group-hover:w-full mt-1"></span>
        </h1>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      </div>
    </section>
  );
}
