"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import React from "react";
import Link from "next/link";

export default function AboutSection() {
  const images = [
    { src: "/assets/grid/grid-image-1.jpg", alt: "Tanjore Art" },
    { src: "/assets/grid/grid-image-7.jpg", alt: "Gold Foil Work" },
    { src: "/assets/grid/grid-image-8.jpg", alt: "Handcrafted Painting" },
    { src: "/assets/grid/grid-image-6.jpg", alt: "Art Detail" },
  ];

  const infoBoxes = [
    {
      title: "30+ Years Experience",
      desc: "of artistic tradition and precision",
    },
    { title: "500+ Designs", desc: "completed with intricate creativity" },
    { title: "Art Enthusiasts", desc: "Cherishing handmade excellence" },
  ];

  return (
    <section className="bg-black/95 w-full h-auto">
      <div className="max-w-7xl mx-auto py-20 px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          {/* Left - Animated Image Grid */}
          <div className="grid grid-cols-2 gap-6">
            {images.map((img, idx) => (
              <motion.div
                key={idx}
                className="relative rounded-2xl overflow-hidden aspect-square shadow-lg hover:shadow-2xl bg-gradient-to-t from-yellow-200/20 via-transparent to-transparent"
                whileHover={{ scale: 1.05, rotate: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover"
                  placeholder="blur"
                  blurDataURL="/assets/about/Rectangle 53.svg"
                />
              </motion.div>
            ))}
          </div>

          {/* Right - Content */}
          <motion.div
            className="flex flex-col justify-center text-center text-white"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-6">
              The Legacy of Tanjore Art
            </h1>

            <p className="text-white mb-10  tracking-tight text-xl">
              Rooted in centuries of precision and devotion, Tanjore art blends
              gold, color, and intricate design to reflect timeless tradition.
              Each piece is a reflection of meticulous craftsmanship passed down
              through generations.
            </p>

            {/* Info Boxes */}
            <div className="relative grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
              {infoBoxes.map((box, idx) => (
                <motion.div
                  key={idx}
                  className="relative p-4 rounded-xl text-center bg-white backdrop-blur-md overflow-hidden group"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                >
                  {/* Inner Glow */}
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-yellow-500/50 via-amber-500/20 to-transparent opacity-70 blur-2xl animate-pulse pointer-events-none"></div>

                  <h3 className="relative text-2xl font-semibold mb-2 z-10 text-black">
                    {box.title}
                  </h3>
                  <p className="relative text-black text-lg z-10">{box.desc}</p>
                </motion.div>
              ))}
            </div>

            <Link
              href="/collections"
              className="py-4 mt-5  text-center text-xl bg-gradient-to-r from-yellow-700 to-yellow-500 shadow-md hover:shadow-xl hover:-translate-y-0.5 text-white rounded-lg font-medium transition transform"
              role="button"
              aria-label="Explore Tanjore art collections"
            >
              Shop Now
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
