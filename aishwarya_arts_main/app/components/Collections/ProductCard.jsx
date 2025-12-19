import React from "react";
import Link from "next/link";
import { Heart } from "lucide-react";
import { useStore } from "../../store/useStore";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";

const ProductCard = ({ product }) => {
  const { data: session } = useSession();
  const wishlist = useStore((state) => state.wishlist);
  const toggleWishlist = useStore((state) => state.toggleWishlist);

  const isWishlisted = wishlist.some((p) => p._id === product._id);

  const handleWishlist = () => {
    if (!session) {
      toast.error("Login to add wishlist");
      return;
    }
    toggleWishlist(product);
  };


  return (
    <div
      className="
        bg-white rounded-2xl p-4 border border-gray-200 
        shadow-[0_2px_10px_rgba(0,0,0,0.05)]
        hover:shadow-[0_6px_20px_rgba(0,0,0,0.12)]
        transition-all duration-300 hover:-translate-y-1
      "
    >
      {/* Image Wrapper with Absolute Badges */}
      <div className="relative w-full flex justify-center">
        {/* New Badge */}
        <span
          className="
            absolute top-3 left-3
            bg-gradient-to-r from-yellow-700 to-yellow-500 hover:shadow-xl hover:-translate-y-0.5  hover:bg-[#000000] transition transform  hover:scale-105 text-white text-xs px-3 py-1 
            rounded-md shadow-sm
          "
        >
          New
        </span>

        {/* Heart Button */}
         <button
          className={`absolute top-3 right-3 p-2 rounded-full shadow-sm transition
            ${
              isWishlisted
                ? "bg-gradient-to-r from-yellow-700 to-yellow-500 text-white"
                : "bg-white border text-gray-700 hover:bg-amber-100"
            }
          `}
          onClick={handleWishlist}
        >
          <Heart className="w-4 h-4" />
        </button>

        {/* Product Image */}
        <img
          src={product.img}
          alt={product.name}
          className="h-80 w-auto object-cover rounded-lg"
        />
      </div>

      {/* Title */}
      <h3 className="font-semibold text-[15px] mt-3 leading-tight text-center">
        {product.name}
      </h3>

      {/* Description */}
      <h5 className="font-medium text-md mt-3 leading-snug text-center">
        {product.desc}
      </h5>

      {/* Ratings */}
      <div className="flex items-center gap-1 mt-2 justify-center">
        {Array(4)
          .fill(0)
          .map((_, i) => (
            <span key={i} className="text-yellow-500 text-sm">
              ★
            </span>
          ))}
        <span className="text-gray-400 text-sm">★</span>
        <span className="text-gray-500 text-xs ml-1">(5)</span>
      </div>

      {/* CTA Button */}
      <Link href={`/collections/${product.slug}`}>
        <button
          className="
            mt-4 w-full py-2 rounded-md bg-[#006D5B] inline-block px-8  text-white font-semibold bg-gradient-to-r from-yellow-700 to-yellow-500 shadow-md hover:shadow-xl hover:-translate-y-0.5  hover:bg-[#000000] transition transform  hover:scale-105"
        >
          Shop now
        </button>
      </Link>
    </div>
  );
};

export default ProductCard;
