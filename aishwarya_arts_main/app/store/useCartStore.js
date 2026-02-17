import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { useAuthStore } from './useAuthStore';

export const useCartStore = create(
  persist(
    (set, get) => ({
      cart: [],
      
      // Add to Cart
      addToCart: (product) => {

        const isAuth = useAuthStore.getState().isLoggedIn;
        if (!isAuth){
          console.error("Unauthorized add attempt blocked.");
        return
        } ;

        const currentCart = get().cart;
        const productId = product._id || product.id;
        const existingItem = currentCart.find((item) => item.id === productId);

        if (existingItem) {
          // If already in cart, just increase quantity
          set({
            cart: currentCart.map((item) =>
              item.id === product.id 
                ? { ...item, quantity: item.quantity + (product.quantity || 1) }
                : item
            ),
          });
        } else {
          // New item
          set({ cart: [...currentCart, { ...product, quantity: product.quantity || 1 }] });
        }
      },

      // Remove from Cart
      removeFromCart: (productId) => 
        set({ cart: get().cart.filter((item) => item.id !== productId) }),

      // Clear Cart (useful after purchase)
      clearCart: () => set({ cart: [] }),

      // Helper for Navbar Icon Count
      getTotalItems: () => get().cart.reduce((acc, item) => acc + item.quantity, 0),
    }),
    {
      name: 'cart-storage', // name of the item in localStorage
    }
  )
);