"use client";

import React from "react";
import { motion } from "framer-motion";
import { Target, Globe2, HeartHandshake } from "lucide-react";

export default function MissionVision() {
const cards = [
  {
    id: 1,
    title: "Our Mission",
    icon: <Target aria-hidden="true" className="text-amber-500 w-12 h-12" />,
    text: "Preserving the 16th-century soul of Thanjavur through authentic 22ct gold masterpieces crafted for the modern home.",
  },
  {
    id: 2,
    title: "Our Vision",
    icon: <Globe2 aria-hidden="true" className="text-amber-500 w-12 h-12" />,
    text: "To set the global gold standard in luxury decor by ensuring ancient Tanjore craftsmanship never fades.",
  },
  {
    id: 3,
    title: "30-Year Vow",
    icon: <HeartHandshake aria-hidden="true" className="text-amber-500 w-12 h-12" />,
    text: "Three decades of mastery in every stroke. We guarantee pure gold, sacred precision, and art that lasts generations.",
  },
];

  return (
    <section
      className="max-w-7xl mx-auto py-20 px-6 md:px-8 text-center"
      aria-labelledby="mission-vision-heading"
    >
      <h1
        id="mission-vision-heading"
        className="text-4xl font-bold mb-12 text-gray-900 tracking-wide"
      >
        Our Mission & Vision
      </h1>

      <div className="grid md:grid-cols-3 gap-10">
        {cards.map((card, index) => (
          <motion.article
            key={card.id}
            className="bg-white rounded-2xl shadow-md p-8 hover:shadow-xl transition-shadow duration-300"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.03 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: 0.5,
              delay: index * 0.1,
              ease: "easeOut",
            }}
          >
            <div className="flex justify-center mb-6">{card.icon}</div>
            <h3 className="text-2xl font-semibold mb-4 text-gray-900">
              {card.title}
            </h3>
            <p className="text-gray-700 leading-relaxed text-lg">{card.text}</p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
