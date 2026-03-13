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
      title: "25+ Years",
      label: "Expertise",
      fullDesc: "Preserving the soul of Thanjavur.",
    },
    {
      icon: <Target />,
      title: "2500+",
      label: "Creations",
      fullDesc: "Unique masterpieces adorned in 22ct gold.",
    },
    {
      icon: <Users />,
      title: "1.5K+",
      label: "Customers",
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
                className={`relative rounded-2xl overflow-hidden aspect-3/4 shadow-2xl border border-white/5 group bg-zinc-900 ${img.className}`}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-60" />
              </ArtFrame>
            ))}
          </motion.div>

          {/* --- RIGHT: CONTENT --- */}
          <div className="order-1 lg:order-2 space-y-10 lg:space-y-12">
            {/* --- TEXT CONTENT --- */}
            <motion.div variants={itemVariants} className="space-y-6 flex flex-col items-center lg:items-start text-center lg:text-left">
              <div className="flex items-center gap-4">
                <span className="hidden md:block h-px w-12 bg-amber-600" />
                <h2 className="text-[13px] md:text-[15px] uppercase tracking-[0.3em] md:tracking-[0.5em] text-amber-500 font-semibold">
                  Since 2000 • Thanjavur
                </h2>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter leading-[0.95] text-white">
                Sacred Gold <br />
                <span className="bg-linear-to-r from-amber-200 via-yellow-400 to-amber-400 bg-clip-text text-transparent italic drop-shadow-[0_4px_15px_rgba(251,191,36,0.3)] select-none">
                  Timeless Art
                </span>
              </h1>

              <p className="text-zinc-300 text-base md:text-xl leading-relaxed max-w-xl font-medium px-4 md:px-0">
                Rooted in centuries of devotion, Aishwarya Arts preserves the
                regal legacy of Tanjore. We turn traditional spirituality into
                golden heirlooms for your modern sanctuary.
              </p>
            </motion.div>

            {/* --- REFINED STATS --- */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-6 pt-4 w-full"
            >
              {infoBoxes.map((box, idx) => (
                <div
                  key={idx}
                  className="group border-b sm:border-b-0 sm:border-l border-white/10 pb-6 sm:pb-0 sm:pl-6 hover:border-amber-600 transition-colors flex flex-col items-center lg:items-start text-center lg:text-left"
                >
                  <div className="text-amber-500 mb-3 transition-transform group-hover:scale-110">
                    {React.cloneElement(box.icon, { size: 32 })}
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-1 tracking-tight">
                    {box.title}
                  </h3>
                  <p className="text-[10px] md:text-xs uppercase tracking-widest text-amber-500 font-semibold mb-2">
                    {box.label}
                  </p>
                  <p className="text-zinc-400 text-xs md:text-sm leading-snug max-w-50 lg:max-w-none">
                    {box.fullDesc}
                  </p>
                </div>
              ))}
            </motion.div>

            {/* --- MAGNETIC GOLD CTA --- */}
            <motion.div
              variants={itemVariants}
              className="pt-6 flex justify-center lg:justify-start"
            >
              <Link
                href="/collections"
                className="group relative inline-flex items-center justify-center px-8 md:px-12 py-4 md:py-5 font-semibold text-sm md:text-md uppercase tracking-widest text-zinc-950 overflow-hidden rounded-full transition-all active:scale-95 shadow-[0_0_20px_rgba(217,119,6,0.3)] hover:shadow-[0_0_35px_rgba(251,191,36,0.5)]"
              >
                <div className="absolute inset-0 bg-linear-to-tr from-[#B8860B] via-[#FFD700] to-[#FDB931]" />
                <span className="relative z-10 flex items-center gap-3">
                  Explore Collection
                  <ArrowRight size={17} className="transition-transform group-hover:translate-x-1.5" />
                </span>
                <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
