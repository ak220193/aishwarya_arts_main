"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import LogoMain from "../../../public/Logo.png";
import { FaFacebookF, FaInstagram, FaYoutube, FaTwitter } from "react-icons/fa";
import Logo from "../../../public/LOGO.svg";

const Footer = () => {
  return (
    <footer className="text-black px-6 py-10 mt-10" aria-label="Footer">
      {/* Main Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* 1. Logo + Description */}
        <div className="">
          <Link href="/" aria-label="Go to homepage" className="inline-block">
            <Image
              src={Logo}
              alt="Aishwarya Arts Logo"
              width={100}
              height={40}
              className="rounded-md p-1"
              priority
            />
          </Link>
          <div className="space-y-6">
            {/* BRAND IDENTITY */}
            <div className="flex flex-col ">
              <h1 className="text-2xl font-bold bg-linear-to-r from-zinc-900 to-amber-600 bg-clip-text text-transparent">
                Aishwaraya Arts
              </h1>
              <p className="text-sm uppercase tracking-wide text-zinc 900 font-semibold mt-1">
                Tanjore Art Gallery
              </p>
            </div>

            {/* THE MISSION (Improved Content) */}
            <p className="text-sm leading-relaxed text-zinc-900 max-w-xs font-normal">
              Every stroke a story, every leaf a legacy. We bring the 16th-century soul of Tamil Nadu to your modern sanctuary.
            </p>

            {/* HERITAGE TAG */}
            <div className="flex items-center gap-3 pt-2">
              <div className="h-px w-8 bg-amber-300"></div>
              <span className="text-[10px] font-semibold uppercase tracking-widest text-zinc-800">
                ESTD. 1995 • Tamil Nadu
              </span>
            </div>
          </div>
        </div>

        {/* 2. Quick Links */}
        <nav aria-label="Quick Links">
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/about">About Us</Link>
            </li>
            <li>
              <Link href="/collections">Collections</Link>
            </li>
            <li>
              <Link href="/contact">Contact</Link>
            </li>
            <li>
              <Link href="/blog">Blog</Link>
            </li>
          </ul>
        </nav>

        {/* 3. Policies */}
        <nav aria-label="Policies">
          <h3 className="text-lg font-semibold mb-3">Policies</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/privacy-policy">Privacy Policy</Link>
            </li>
            <li>
              <Link href="/terms">Terms & Conditions</Link>
            </li>
            <li>
              <Link href="/refund-policy">Refund Policy</Link>
            </li>
          </ul>
        </nav>

        {/* 4. Contact Info */}
        <address className="not-italic">
          <h3 className="text-lg font-semibold mb-3">Contact Us</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a
                href="mailto:contact.aishwaryaarts@gmail.com"
                className="hover:underline"
              >
                contact.aishwaryaarts@gmail.com
              </a>
            </li>
            <li>
              <a href="tel:+919655007661" className="hover:underline">
                +91 9655007661
              </a>
            </li>
            <li>Namakkal, Tamil Nadu</li>
          </ul>
        </address>
      </div>

      {/* Social Links */}
      <div className="flex justify-center items-center py-6 space-x-6 text-2xl">
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Facebook"
          className="hover:text-blue-500 transition"
        >
          <FaFacebookF />
        </a>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
          className="hover:text-pink-500 transition"
        >
          <FaInstagram />
        </a>
        <a
          href="https://youtube.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="YouTube"
          className="hover:text-red-500 transition"
        >
          <FaYoutube />
        </a>
        <a
          href="https://twitter.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Twitter"
          className="hover:text-sky-400 transition"
        >
          <FaTwitter />
        </a>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/30 mt-6 pt-4 text-center text-sm text-black">
        <p className="space-x-6">
          © {new Date().getFullYear()} Aishwarya Art Gallery | All Rights
          Reserved | Developed by{" "}
          <Link
            href="https://webxode.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold hover:underline"
          >
            Webxode Technologies
          </Link>
        </p>
      </div>

      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Aishwarya Arts",
            url: "https://aishwaryaarts.com",
            logo: "https://aishwaryaarts.com/assets/logo/logosample.png",
            sameAs: [
              "https://facebook.com",
              "https://instagram.com",
              "https://youtube.com",
              "https://twitter.com",
            ],
            contactPoint: {
              "@type": "ContactPoint",
              telephone: "+91-96550-07661",
              contactType: "customer service",
              email: "contact.aishwaryaarts@gmail.com",
              areaServed: "IN",
              availableLanguage: ["English", "Tamil"],
            },
            address: {
              "@type": "PostalAddress",
              addressLocality: "Namakkal",
              addressRegion: "Tamil Nadu",
              addressCountry: "IN",
            },
          }),
        }}
      />
    </footer>
  );
};

export default Footer;
