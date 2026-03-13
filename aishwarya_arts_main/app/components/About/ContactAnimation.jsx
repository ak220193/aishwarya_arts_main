"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function ContactAnimation() {
  return (
    <section
      id="contact-cta"
      className="relative overflow-hidden bg-linear-to-b  py-20"
      aria-labelledby="contact-cta-heading"
    >
      {/* Decorative background accent */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[url('/assets/patterns/tanjore-bg-pattern.webp')] opacity-10 bg-center bg-cover"
      ></div>

      <div className="relative max-w-6xl mx-auto px-6 text-center">
        {/* Heading */}
        <motion.h2
          id="contact-cta-heading"
          className="text-3xl md:text-4xl font-semibold text-gray-900 mb-6 leading-tight tracking-wide"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Preserving the Legacy of
          <span className="text-yellow-700 ml-2 ">Tanjore Painting</span> —
          Where Tradition Meets Creativity
        </motion.h2>

        {/* Description */}
        <motion.p
          className="max-w-3xl mx-auto text-zinc-900 text-base md:text-lg leading-relaxed mb-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Aishwarya Arts is more than a gallery — it’s a legacy of devotion,
          craftsmanship, and culture. Each painting carries the grace of
          centuries-old tradition, fused with modern artistry. Explore our
          divine collections or reach out for custom commissions crafted with
          authentic gold foil and timeless precision.
        </motion.p>

        {/* Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-5"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Link
            href="/contact"
            className="inline-block px-8 py-3 rounded-full text-white font-semibold bg-linear-to-r from-yellow-700 to-yellow-500 shadow-md hover:shadow-xl hover:-translate-y-0.5 transform transition-all duration-300"
            aria-label="Contact Aishwarya Arts"
          >
            Contact Us
          </Link>
          <Link
            href="/collections"
            className="inline-block px-8 py-3 rounded-full border border-yellow-300 bg-white text-gray-800 font-medium hover:bg-yellow-50 hover:border-yellow-500 transition-colors duration-300"
            aria-label="Explore Tanjore Art Collection"
          >
            Explore Our Collection
          </Link>
        </motion.div>

        {/* Contact Info */}
        <div className="mt-24 mb-16 px-4">
          <div className="max-w-4xl mx-auto relative">
            {/* --- AMBIENT BACKGROUND GLOW --- */}
            <div className="absolute -inset-10 bg-amber-500/5 blur-[100px] rounded-full" />

            {/* --- SECTION HEADER --- */}
            <div className="text-center mb-10 space-y-2">
              <h2 className="text-amber-600 text-xl md:text-sm lg:text-2xl font-semibold uppercase tracking-wide drop-shadow-sm">
                Tailored Masterpieces
              </h2>
              <p className="text-3xl md:text-4xl font-serif italic text-zinc-900 tracking-tight">
                Enquire Now For Custom Orders
              </p>
            </div>

            {/* --- THE EMBOSSED CARD --- */}
            <div className="relative bg-[#fafafa] rounded-[3rem] p-1 md:p-2 shadow-[inset_0_1px_1px_rgba(255,255,255,1),0_20px_40px_rgba(0,0,0,0.04)] border border-zinc-200/50">
              <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-[10px_10px_20px_#bebebe,-10px_-10px_20px_#ffffff] flex flex-col md:flex-row items-center justify-around gap-10 overflow-hidden">
                {/* Phone Section */}
                <a
                  href="tel:+917550152764"
                  className="group flex flex-col items-center gap-4 transition-all hover:scale-105"
                >
                  <div className="w-14 h-14 rounded-full bg-zinc-50 shadow-[inset_4px_4px_8px_#d1d1d1,inset_-4px_-4px_8px_#ffffff] flex items-center justify-center text-amber-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                    </svg>
                  </div>
                  <div className="text-center">
                    <span className="text-lg font-semibold text-zinc-900  tracking-wide">
                      Direct Line
                    </span>
                    <p className="text-xl md:text-2xl font-bold text-zinc-900 mt-1 tabular-nums">
                      +91 75501 52764
                    </p>
                  </div>
                </a>

                {/* Grand Divider */}
                <div className="hidden md:block h-20 w-px bg-linear-to-b from-transparent via-zinc-200 to-transparent" />

                {/* Email Section */}
                <a
                  href="mailto:contact.aishwaryaarts@gmail.com"
                  className="group flex flex-col items-center gap-4 transition-all hover:scale-105"
                >
                  <div className="w-14 h-14 rounded-full bg-zinc-50 shadow-[inset_4px_4px_8px_#d1d1d1,inset_-4px_-4px_8px_#ffffff] flex items-center justify-center text-amber-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                    </svg>
                  </div>
                  <div className="text-center">
                    <span className="text-lg font-semibold text-zinc-900  tracking-wide">
                      Customer Support
                    </span>
                    <p className="text-xl md:text-2xl font-bold text-zinc-900 mt-1 lowercase">
                      aishwaryaarts@gmail.com
                    </p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hidden SEO text */}
      <h3 className="sr-only">
        Contact Aishwarya Arts — Authentic Tanjore Painting Artists in Tamil
        Nadu, India. Custom gold foil paintings, deity art, and heritage
        designs.
      </h3>
    </section>
  );
}
