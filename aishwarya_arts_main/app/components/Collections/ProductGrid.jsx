'use client'
import React from "react";
import ProductCard from "./ProductCard";

const ProductGrid = ({ products = [], onWishlistToggle, onAddToCart }) => {
  

  // If no products are found (e.g., after filtering)
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-32 border-2 border-dashed border-gray-100 rounded-3xl">
        <p className="text-gray-400 font-medium">No paintings found in this collection.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
      {products.map((product) => (
        <ProductCard 
          key={product._id} 
          product={product}
          onWishlistToggle={onWishlistToggle} 
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  );
};

export default ProductGrid;