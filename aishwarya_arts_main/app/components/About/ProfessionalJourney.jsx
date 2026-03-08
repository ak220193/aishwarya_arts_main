"use client";

import React from "react";
import Image from "next/image";
import Img1 from "../../../public/assets/about/man-2.jpg";

export default function ProfessionalJourney() {
  return (
    <section
      className="max-w-7xl mx-auto py-24 px-6 md:px-10 grid md:grid-cols-2 gap-20 items-center"
      aria-labelledby="professional-journey-title"
    >
      {/* Left: Founder Image */}
      <figure className="relative group order-2 md:order-1">
        <div className="relative w-full h-90 md:h-100 xl:h-150 rounded-3xl overflow-hidden shadow-2xl transition-all duration-500 group-hover:scale-[1.03] group-hover:shadow-yellow-700/20">
          <Image
            src={Img1}
            alt="Portrait of Aishwarya, founder of Aishwarya Art Gallery"
            className="object-cover object-center scale-105 group-hover:scale-110 transition-transform duration-700 ease-out"
            priority
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent"></div>
        </div>
        <figcaption className="sr-only">
          Devandran K — founder of Aishwarya Art Gallery
        </figcaption>
      </figure>

      {/* Right: Text Content */}
      <article className="order-1 md:order-2 text-center md:text-left">
        <h1
          id="professional-journey-title"
          className="text-4xl md:text-4xl font-bold mb-6 text-gray-900 tracking-wide leading-snug "
        >
          Our Professional Journey
        </h1>

        <p className="text-black leading-relaxed mb-5 text-lg md:text-xl">
          Founded by
          <span className="font-semibold text-gray-900 ml-2">Devandran K </span>, the
          gallery began as a small creative studio deeply committed to
          preserving the intricate legacy of Tanjore art. From humble
          beginnings, her path evolved through years of dedication, innovation,
          and a relentless passion for artistic excellence.
        </p>

        <p className="text-black leading-relaxed text-lg md:text-xl">
          Today, Aishwarya Art Gallery stands as a symbol of how traditional
          craftsmanship can harmonize with digital precision — carrying the
          cultural essence of Tanjore paintings into modern homes across the
          world.
        </p>

        <div
          className="mt-10 w-24 h-0.75 bg-linear-to-r from-yellow-500 to-yellow-700 mx-auto md:mx-0 rounded-full"
          role="presentation"
        ></div>
      </article>
    </section>
  );
}
