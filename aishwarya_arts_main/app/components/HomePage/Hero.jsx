"use client";
import { useEffect, useState, useRef } from "react";
import dynamic from "next/dynamic";

const NextImage = dynamic(() => import("next/image"));

const heroImages = [
   "/assets/hero/heroimageswebp/AishwarayaArts-1-cpy.png",
   "/assets/hero/heroimageswebp/AishwarayaArts-3.png",
  "/assets/hero/heroimageswebp/paintwithframe.webp",
  "/assets/hero/heroimageswebp/pencilarts.webp",
  "/assets/hero/heroimageswebp/watercolor-elephant-illustration.webp",
  "/assets/hero/heroimageswebp/womencelebration.webp",
];

export default function Hero() {
  const [index, setIndex] = useState(0);
  const timeoutRef = useRef(null);
  const delay = 3000;

  const resetTimeout = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(() => {
      setIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, delay);
    return () => resetTimeout();
  }, [index]);

  return (
    <section className="relative w-full py-4 overflow-hidden">
      {/* Slider Wrapper */}
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{
          transform: `translateX(-${index * 100}vw)`,
        }}
      >
        {heroImages.map((src, i) => (
          <div
            key={i}
            className="w-[100vw] flex-shrink-0 flex justify-center px-2"
          >
            {/* IMAGE BOX */}
            <div className="w-full max-w-7xl rounded-2xl overflow-hidden bg-green-300">
              <div className="relative w-full h-[420px] sm:h-[500px] md:h-[600px] lg:h-[850px]">
                <NextImage
                  src={src}
                  alt={`Hero Image ${i + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={() =>
          setIndex((prev) => (prev === 0 ? heroImages.length - 1 : prev - 1))
        }
        className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2
        bg-white text-black rounded-full w-12 h-12 items-center justify-center shadow-xl"
      >
        ‹
      </button>

      <button
        onClick={() => setIndex((prev) => (prev + 1) % heroImages.length)}
        className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2
        bg-white text-black rounded-full w-12 h-12 items-center justify-center shadow-xl"
      >
        ›
      </button>
    </section>
  );
}
