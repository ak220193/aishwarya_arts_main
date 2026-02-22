"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import NotFoundSVG from "../../public/assets/notfound/undraw_air-support.svg";
import Image from "next/image";

export default function NotFound() {
  return (
    <main
      className="w-screen h-screen flex flex-col items-center justify-center bg-white px-4"
      role="main"
      aria-labelledby="not-found-heading"
    >
      {/* Animated SVG as React Component */}
      <motion.figure
        className="w-64 h-auto"
        animate={{ y: [0, -20, 0] }}
        transition={{ repeat: Infinity, repeatType: "loop", duration: 0.8 }}
        aria-hidden="true"
      >
        <Image
          src={NotFoundSVG}
          alt="404 Page Not Found Illustration"
          width={250}
          height={250}
          style={{ height: "auto", width: "auto" }}
        />
      </motion.figure>

      {/* Heading */}
      <h1
        id="not-found-heading"
        className="mt-6 text-4xl md:text-5xl font-bold text-gray-800 font-cinzel"
      >
        404
      </h1>

      {/* Description */}
      <p className="mt-2 text-gray-600 text-center max-w-xs">
        Oops! The page you are looking for does not exist.
      </p>

      {/* Navigation link */}
      <Link
        href="/"
        className="mt-6 px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-lg transition"
      >
        Go Home
      </Link>
    </main>
  );
}
