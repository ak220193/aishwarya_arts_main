import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useAuthStore } from "./useAuthStore";

export const useCartStore = create(
  persist(
    (set, get) => ({
      cart: [],

      // Add to Cart
      addToCart: (product) => {
        const currentCart = get().cart;
        const productId = product._id || product.id;

        // Find item matching ID AND Variant Specs
        const existingItem = currentCart.find(
          (item) =>
            item.id === productId &&
            item.size === product.size &&
            item.frame === product.frame,
        );

        if (existingItem) {
          set({
            cart: currentCart.map((item) =>
              item.id === productId &&
              item.size === product.size &&
              item.frame === product.frame
                ? { ...item, quantity: item.quantity + (product.quantity || 1) }
                : item,
            ),
          });
        } else {
          set({
            cart: [
              ...currentCart,
              { ...product, id: productId, quantity: product.quantity || 1 },
            ],
          });
        }
      },

      // Remove from Cart
      removeFromCart: (productId) =>
        set({ cart: get().cart.filter((item) => item.id !== productId) }),

      // Clear Cart (useful after purchase)
      clearCart: () => set({ cart: [] }),

      // Helper for Navbar Icon Count
      getTotalItems: () =>
        get().cart.reduce((acc, item) => acc + item.quantity, 0),
    }),
    {
      name: "cart-storage", // name of the item in localStorage
    },
  ),
);
