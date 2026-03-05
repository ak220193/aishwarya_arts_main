"use client";

import Image from "next/image";
import { motion, useMotionValue, useTransform } from "framer-motion";
import React from "react";
import Link from "next/link";
import { Award, Target, Users, ArrowRight } from "lucide-react";

// --- 1. PERSPECTIVE TILT CARD ---
const ArtFrame = ({ children, className }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [8, -8]);
  const rotateY = useTransform(x, [-100, 100], [-8, 8]);

  return (
    <motion.div
      style={{ rotateX, rotateY, perspective: 1000 }}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        x.set(e.clientX - rect.left - rect.width / 2);
        y.set(e.clientY - rect.top - rect.height / 2);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default function ArtistAboutSection() {
  // --- 2. ANIMATION VARIANTS (The missing link) ---
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { y: 25, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 18 },
    },
  };

  const images = [
    {
      src: "/assets/grid/grid-image-1.jpg",
      alt: "Tanjore Detail",
      className: "lg:mt-0",
    },
    {
      src: "/assets/grid/grid-image-7.jpg",
      alt: "Gold Foil",
      className: "lg:mt-20 mt-10",
    },
    {
      src: "/assets/grid/grid-image-8.jpg",
      alt: "Artisan Work",
      className: "lg:-mt-20 -mt-10",
    },
    {
      src: "/assets/grid/grid-image-6.jpg",
      alt: "Final Masterpiece",
      className: "lg:mt-0",
    },
  ];

  const infoBoxes = [
    {
      icon: <Award />,
      title: "30+ Years",
      label: "Heritage",
      fullDesc: "Preserving the 16th-century soul of Thanjavur.",
    },
    {
      icon: <Target />,
      title: "2500+",
      label: "Creations",
      fullDesc: "Unique masterpieces adorned in 22ct gold.",
    },
    {
      icon: <Users />,
      title: "10k+",
      label: "Patrons",
      fullDesc: "Bringing divine radiance to homes worldwide.",
    },
  ];

  return (
    <section className="relative bg-[#050505] w-full overflow-hidden font-outfit text-white py-24 md:py-40">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          {/* --- LEFT: GALLERY --- */}
          <motion.div
            variants={itemVariants}
            className="order-2 lg:order-1 grid grid-cols-2 gap-4 md:gap-8 relative"
          >
            {images.map((img, idx) => (
              <ArtFrame
                key={idx}
                className={`relative rounded-2xl overflow-hidden aspect-[3/4] shadow-2xl border border-white/5 group bg-zinc-900 ${img.className}`}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
              </ArtFrame>
            ))}
          </motion.div>

          {/* --- RIGHT: CONTENT --- */}
          <div className="order-1 lg:order-2 space-y-12">
            <motion.div variants={itemVariants} className="space-y-6">
              <div className="flex items-center gap-4">
                <span className="h-px w-12 bg-amber-600" />
                <h2 className="text-[15px] uppercase tracking-[0.5em] text-amber-500 font-semibold text-center md:text-left">
                  Since 1995 • Thanjavur
                </h2>
              </div>
              <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.95] text-white">
                Sacred Gold <br />
                <span className="bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-400 bg-clip-text text-transparent italic drop-shadow-[0_4px_15px_rgba(251,191,36,0.3)] select-none px-4">
                  Timeless Art
                </span>
              </h1>
              <p className="text-zinc-200 text-lg md:text-xl leading-relaxed max-w-xl font-medium">
                Rooted in centuries of devotion, Aishwaraya Arts preserves the
                regal legacy of Tanjore. We turn traditional spirituality into
                golden heirlooms for your modern sanctuary.
              </p>
            </motion.div>

            {/* --- REFINED STATS --- */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4"
            >
              {infoBoxes.map((box, idx) => (
                <div
                  key={idx}
                  className="group border-l border-white/10 pl-6 py-2 hover:border-amber-600 transition-colors flex flex-col justify-center items-center"
                >
                  <div className="text-amber-500 mb-3 transition-transform items-center group-hover:scale-110">
                    {React.cloneElement(box.icon, { size: 40 })}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-1 tracking-tight">
                    {box.title}
                  </h3>
                  <p className="text-md uppercase tracking-widest text-amber-700 font-semibold mb-2">
                    {box.label}
                  </p>
                  <p className="text-zinc-200 text-sm leading-snug tracking-normal">
                    {box.fullDesc}
                  </p>
                </div>
              ))}
            </motion.div>

            {/* --- RESTORED MAGNETIC GOLD CTA --- */}
            <motion.div
              variants={itemVariants}
              className="pt-6 flex items-center justify-center flex-col"
            >
              <Link
                href="/collections"
                className="group relative inline-flex items-center justify-center px-12 py-5 font-semibold text-md uppercase tracking-widest text-zinc-950 overflow-hidden rounded-full transition-all active:scale-95 shadow-[0_0_20px_rgba(217,119,6,0.3)] hover:shadow-[0_0_35px_rgba(251,191,36,0.5)]"
              >
                {/* BASE PREMIUM GOLD SIGNAL (Before Hover) */}
                <div className="absolute inset-0 bg-[#D4AF37] bg-linear-to-tr from-[#B8860B] via-[#FFD700] to-[#FDB931]" />

                {/* THE TEXT (Using dark zinc for maximum contrast on gold) */}
                <span className="relative z-10 flex items-center gap-3">
                  Explore Collection
                  <ArrowRight
                    size={17}
                    strokeWidth={1}
                    className="transition-transform group-hover:translate-x-1.5"
                  />
                </span>

                {/* DYNAMIC METALLIC SHINE (Hover Layer 1) */}
                <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />

                {/* RADIAL GLOW (Hover Layer 2) */}
                <div className="absolute inset-0 bg-radial-at-tl from-yellow-200 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* BORDER SHARPENING */}
                <div className="absolute inset-0 rounded-full border border-white/20 group-hover:border-white/40 transition-all" />
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
