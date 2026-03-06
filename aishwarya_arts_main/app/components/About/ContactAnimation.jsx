"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function ContactAnimation() {
  return (
    <section
      id="contact-cta"
      className="relative overflow-hidden bg-gradient-to-b  py-20"
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
          Preserving the Legacy of{" "}
          <span className="text-yellow-700">Tanjore Painting</span> — Where
          Tradition Meets Creativity
        </motion.h2>

        {/* Description */}
        <motion.p
          className="max-w-3xl mx-auto text-gray-700 text-base md:text-lg leading-relaxed mb-10"
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
            className="inline-block px-8 py-3 rounded-full text-white font-semibold bg-gradient-to-r from-yellow-700 to-yellow-500 shadow-md hover:shadow-xl hover:-translate-y-0.5 transform transition-all duration-300"
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
        <div className="mt-10 text-gray-600 text-sm">
          <p className="mb-1 font-medium text-gray-700">
            Prefer to connect directly?
          </p>
          <p>
            <a
              href="tel:+919655007661"
              className="underline hover:text-yellow-700"
            >
              +91 96550 07661
            </a>{" "}
            •{" "}
            <a
              href="mailto:contact.aishwaryaarts@gmail.com"
              className="underline hover:text-yellow-700"
            >
              contact.aishwaryaarts@gmail.com
            </a>
          </p>
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
