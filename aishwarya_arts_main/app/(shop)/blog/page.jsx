"use client";

import React from "react";
import Link from "next/link";

const blogPosts = [
  {
    id: 1,
    title: "The Legacy of Tanjore Painting Culture",
    category: "Traditional Art",
    summary: "Discover the intricate beauty and history of Tanjore paintings.",
    slug: "/blog/tanjore-paintings",
    image: "/assets/blog/img1.png"
  },
  {
    id: 2,
    title: "Modern Approaches to Custom Art",
    category: "Contemporary Art",
    summary: "How artists blend tradition with modern creativity for bespoke artworks.",
    slug: "/blog/custom-art",
    image: "/assets/blog/img2.png"
  },
  {
    id: 3,
    title: "Understanding Indian Heritage Art Forms",
    category: "Heritage Art",
    summary: "Explore various Indian art forms that have survived generations.",
    slug: "/blog/heritage-art",
    image: "/assets/blog/img3.png"
  },
];

export default function BlogPage() {
  return (
    <section className="py-16 max-w-7xl mx-auto px-6">
      
      <h1 className="text-5xl font-bold text-center mb-12">
        Our Art Blog
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {blogPosts.map((post) => (
          <div
            key={post.id}
            className="group relative rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500"
          >
            {/* Image with hover zoom */}
            <div className="overflow-hidden">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-72 md:h-80 object-cover transform group-hover:scale-110 transition-transform duration-500"
              />
            </div>

            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>

            {/* Text content */}
            <div className="p-6 bg-white relative -mt-16 rounded-t-3xl z-10 ">
              <span className="inline-block bg-yellow-500 text-white text-xs font-semibold px-3 py-1 rounded-full mb-3">
                {post.category}
              </span>
              <h2 className="text-2xl font-bold mb-3 group-hover:text-yellow-700 transition-colors">
                {post.title}
              </h2>
              <p className="text-gray-600 mb-4">{post.summary}</p>
              <Link
                href={post.slug}
                className="text-yellow-700 font-semibold hover:underline"
              >
                Read More &rarr;
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
