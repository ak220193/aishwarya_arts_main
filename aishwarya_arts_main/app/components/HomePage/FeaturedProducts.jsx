"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import React from "react";
import Link from "next/link";

export default function FeaturedProducts() {
  const products = [
    {
      name: "Ganesha",
      img: "/assets/bestsellers/image1.jpg",
      desc: "Beautifully handcrafted Tanjore painting of Lord Ganesha.",
      price: "₹12,000",
      size: "12x16 inch",
    },
    {
      name: "Saraswathi",
      img: "/assets/Products/24+18/saraswathi/saraswa.hd.jpg",
      desc: "Vibrant Saraswathi artwork in gold foil painting finish with beads.",
      price: "₹15,000",
      size: "14x18 inch",
    },
    {
      name: "Shiva",
      img: "/assets/Products/24+18/Shiva/Shivap.jpg",
      desc: "Hand-painted Shiva portrait with traditional detailing.",
      price: "₹10,500",
      size: "10x14 inch",
    },
    {
      name: "RadhaeKrishna",
      img: "/assets/Products/webp/RADHEKRISHNA.webp",
      desc: "Beautifully handcrafted Tanjore painting of Lord RadhaeKrishna.",
      price: "₹12,000",
      size: "12x16 inch",
    },
    {
      name: "Lord Murga",
      img: "/assets/Products/24+18/Murugan/Murgan-hd.jpg",
      desc: "Vibrant Krishna artwork in gold foil painting finish with beads.",
      price: "₹15,000",
      size: "14x18 inch",
    },
    {
      name: "GajaLakshmi",
      img: "/assets/Products/15+12/lakshmi/Lakshmi.jpg",
      desc: "Hand-painted GajaLakshmi portrait with traditional detailing.",
      price: "₹10,500",
      size: "10x14 inch",
    },
  ];

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
        {products.map((product, idx) => (
          <motion.div
            key={idx}
            className="bg-white backdrop-blur-md rounded-2xl shadow-lg overflow-hidden flex flex-col"
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
          >
             <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-yellow-200/30 via-amber-100/20 to-transparent opacity-60 blur-3xl animate-pulse pointer-events-none"></div>
            {/* Image */}
            <div className="relative w-full h-100">
              <Image
                src={product.img}
                alt={product.name}
                fill
                className="object-cover"
                placeholder="blur"
                blurDataURL="/assets/bestsellers/image1.jpg"
              />
            </div>

            {/* Product Info */}
            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-bold mb-1 tracking-wide leading-snug">
                  {product.name}
                </h3>
                <p className="text-black text-lg mb-2">{product.desc}</p>
                <p className="text-black text-lg">Frame Size: {product.size}</p>
                <p className="text-black font-medium text-xl">{product.price}</p>
                
              </div>

              <Link
                href="/collections"
                className="py-2 mt-5 text-center bg-gradient-to-r from-yellow-700 to-yellow-500 shadow-md hover:shadow-xl hover:-translate-y-0.5 text-white rounded-lg font-medium  transition-transform transform "
                role="button"
                aria-label="Explore Tanjore art collections"
              >
                View Details
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
