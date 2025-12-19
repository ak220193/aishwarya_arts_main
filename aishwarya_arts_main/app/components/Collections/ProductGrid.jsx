import React, { useEffect, useRef } from "react";
import ProductCard from "./ProductCard";
import { useStore } from "../../store/useStore";
import { useSession } from "next-auth/react";

const ProductGrid = ({ products = [] }) => {
  const { data: session } = useSession();
  const { fetchWishlist } = useStore();
  const fetchedRef = useRef(false);

  // Fetch wishlist on login
  useEffect(() => {
    if (session && !fetchedRef.current) {
      fetchWishlist();
      fetchedRef.current = true;
    }
  }, [session, fetchWishlist]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => {
        return (
          <div key={product._id} className="relative">
            <ProductCard product={product} />
          </div>
        );
      })}
    </div>
  );
};

export default ProductGrid;
