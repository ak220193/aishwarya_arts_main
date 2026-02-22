import React from "react";
import { blogPosts } from "../../../data/blogdata";

export default function BlogDetail({ params }) {
  const { slug } = React.use(params);

  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) return <p>Blog not found</p>;

  return (
    <section className="py-20 max-w-5xl mx-auto px-6">
      <h1 className="text-4xl font-bold mb-6">{post.title}</h1>
      <span className="text-md text-gray-500 mb-4 block">{post.category}</span>

      <img
        src={post.image}
        alt={post.title}
        className="w-full h-auto rounded-xl mb-8"
      />

      <div
        className="prose prose-lg text-gray-700"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </section>
  );
}
