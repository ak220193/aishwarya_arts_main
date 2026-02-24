"use client";
import React, { useState, useEffect } from "react";

const quotes = [
  { text: "Art speaks where words are unable to explain.", emoji: "🎨" },
  { text: "Every artist dips his brush in his own soul.", emoji: "✨" },
  { text: "Creativity takes courage.", emoji: "🦁" },
  { text: "Design is thinking made visual.", emoji: "👁️" }
];

const WelcomeBanner = ({ userName }) => {
  const [quote, setQuote] = useState(quotes[0]);

  useEffect(() => {
    setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
  }, []);

  return (
    <section className="bg-white rounded-[2.5rem] p-8 border border-amber-100 shadow-sm relative overflow-hidden group">
      <div className="absolute top-0 right-0 p-8 text-7xl  transition-opacity duration-700">
        {quote.emoji}
      </div>
      <div className="relative z-10">
        <h1 className="text-3xl font-bold text-zinc-900 tracking-tight">
          Welcome back, <span className="text-amber-600">{userName}!</span>
        </h1>
        <p className="text-zinc-800 mt-2 font-medium italic max-w-md uppercase tracking-wider text-[12px]">
          "{quote.text}"
        </p>
      </div>
    </section>
  );
};

export default WelcomeBanner;