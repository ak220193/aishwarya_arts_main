"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";
import Button from "./Button";

const images = [
  "/assets/aboutCTA/2.webp",
  "/assets/aboutCTA/3.webp",
  "/assets/aboutCTA/4.webp",
  "/assets/aboutCTA/5.webp",
];

const Story = () => {
  const [currentImage, setCurrentImage] = useState(0);

  // Rotate every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className="max-w-7xl mx-auto py-16 px-6 md:px-16"
      aria-labelledby="story-title"
    >
      <div className="grid md:grid-cols-2 gap-10 items-center">
        {/* Left: Image slideshow */}
        <motion.div
          key={currentImage}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="relative w-full h-120 md:h-145 lg:h-160"
        >
          <Image
            src={images[currentImage]}
            alt={`Traditional Tanjore Painting ${currentImage + 1}`}
            fill
            priority={currentImage === 0}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="rounded-2xl shadow-lg object-cover transition-all duration-700"
          />
        </motion.div>

        {/* Right: Content */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h1
            id="story-title"
            className="text-3xl md:text-4xl font-semibold mb-4 text-black"
          >
            Our Story & Tradition
          </h1>
          <p className="text-black leading-relaxed mb-4 text-lg md:text-xl">
            At <span className="font-medium text-gray-800">Aishwarya Arts</span>
            , we celebrate the timeless beauty of{" "}
            <span className="text-yellow-700 font-medium">
              Traditional Tanjore Paintings
            </span>{" "}
            — an ancient South Indian art form known for its rich colors,
            intricate details, and use of pure gold foil. Every stroke we create
            carries the essence of Tamil heritage and devotion.
          </p>
          <p className="text-black leading-relaxed mb-6 text-lg md:text-xl">
            Our artists blend traditional techniques with contemporary finesse,
            ensuring that each piece reflects both cultural depth and modern
            elegance. From divine deities to custom designs, every artwork
            embodies the spiritual and artistic soul of Tamil Nadu.
          </p>

          <div className=" flex justify-center items-center">
            <Button
              href="/about"
              color="emerald"
              className="bg-linear-to-r from-yellow-700 to-yellow-500 shadow-md hover:shadow-xl hover:-translate-y-0.5  hover:bg-[#000000] transition transform duration-300 hover:scale-105 text-white"
            >
              Know About us
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Story;
