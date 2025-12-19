"use client";
import { memo } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiHeart } from "react-icons/fi";
import { PRODUCTS } from "./index";
import { useStore } from "../../store/useStore";
import { toast } from "react-hot-toast";

const BestSellers = () => {
  const user = useStore((state) => state.user);
  const userLoaded = useStore((state) => state.userLoaded);
  const wishlist = useStore((state) => state.wishlist);
  const toggleWishlist = useStore((state) => state.toggleWishlist);

  const handleWishlist = (product) => {
  

    const isInWishlist = wishlist.some((p) => p._id === product.id);
    toggleWishlist({ ...product, _id: product.id });
    toast.success(isInWishlist ? "Removed from wishlist" : "Added to wishlist");
  };

  return (
    <section
      className="max-w-7xl mx-auto py-20 px-4"
      aria-labelledby="best-sellers-heading"
      itemScope
      itemType="https://schema.org/CollectionPage"
    >
      {/* Heading */}
      <header className="text-center mb-12">
        <h1
          id="best-sellers-heading"
          className="text-4xl md:text-5xl font-bold text-gray-900 leading-relaxed tracking-wider font-cinzel"
        >
          Best Sellers
        </h1>
        <p className="text-black text-lg max-w-xl mx-auto">
          Discover our most admired handmade artworks — crafted with precision
          and passion to bring culture and creativity home.
        </p>
      </header>

      {/* Product Grid */}
      <ul
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
        itemScope
        itemType="https://schema.org/ItemList"
      >
        {PRODUCTS.map((product, idx) => {
          const isInWishlist = wishlist.some((p) => p._id === product.id);

          return (
            <li
              key={product.id}
              itemProp="itemListElement"
              itemScope
              itemType="https://schema.org/Product"
              className="group bg-white rounded-2xl border border-gray-100 shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden relative"
            >
              {/* Hover Glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-tr from-yellow-200/30 via-amber-100/20 to-transparent blur-xl pointer-events-none" />

              {/* Product Image */}
              <figure className="relative w-full overflow-hidden">
                <Image
                  src={product.image}
                  alt={`${product.title} – ${product.frameSize} frame`}
                  loading={idx === 0 ? "eager" : "lazy"}
                  priority={idx === 0}
                  width={400}
                  height={320}
                  className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                />

                {/* Wishlist icon */}
                <button
                  aria-label="Add to wishlist"
                  className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm p-2 rounded-full shadow hover:bg-white transition"
                  onClick={() => handleWishlist(product)}
                >
                  <FiHeart
                    className={`text-lg ${
                      wishlist.some((p) => p._id === product.id)
                        ? "text-red-500"
                        : "text-gray-700"
                    }`}
                    aria-hidden="true"
                  />
                </button>

                {/* New Tag */}
                {product.isNew && (
                  <span className="absolute top-3 left-0 bg-gradient-to-r from-yellow-700 to-yellow-500 shadow-md hover:shadow-xl hover:-translate-y-0.5  hover:bg-[#000000] transition transform duration-300 hover:scale-105 text-white text-lg font-semibold px-6 py-2 rounded-md">
                    New
                  </span>
                )}
              </figure>

              {/* Product Content */}
              <div className="p-6 flex flex-col justify-between cursor-pointer">
                <header>
                  <h2
                    itemProp="name"
                    className="text-lg font-semibold text-gray-800 transition"
                  >
                    {product.title}
                  </h2>
                  <p
                    itemProp="description"
                    className="text-md text-gray-600 mt-2 line-clamp-2"
                  >
                    {product.description}
                  </p>
                  <p className="text-md text-black mt-1">
                    Frame Size:{" "}
                    <span className="font-medium">{product.frameSize}</span>
                  </p>
                </header>

                {/* Price & Rating */}
                <div className="mt-4 flex items-center justify-between">
                  <span
                    itemProp="price"
                    content={product.price.replace(/[^0-9.]/g, "")}
                    className="text-xl font-bold text-black"
                  >
                    {product.price}
                  </span>
                  <div
                    className="text-sm text-black"
                    itemProp="aggregateRating"
                    itemScope
                    itemType="https://schema.org/AggregateRating"
                  >
                    <meta
                      itemProp="ratingValue"
                      content={String(product.rating)}
                    />
                    <meta
                      itemProp="reviewCount"
                      content={String(product.reviews)}
                    />
                    <span aria-label={`Rated ${product.rating} out of 5`}>
                      ⭐ {product.rating} ({product.reviews})
                    </span>
                  </div>
                </div>

                {/* CTA */}
                <Link
                  href={`/shop/${product.id}`}
                  itemProp="url"
                  prefetch={false}
                  className="mt-5 w-full py-2 bg-gradient-to-r from-yellow-700 to-yellow-500 shadow-md hover:shadow-xl hover:-translate-y-0.5 text-white rounded-lg font-medium text-center transition"
                >
                  Shop Now
                </Link>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default memo(BestSellers);
