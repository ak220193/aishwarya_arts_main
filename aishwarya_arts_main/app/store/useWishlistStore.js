import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useWishlistStore = create(
  persist(
    (set, get) => ({
      wishlist: [],

      toggleWishlist: (product) => {
        const productId = product._id || product.id;
        const isFav = get().wishlist.some((item) => item.id === productId);
        if (isFav) {
          set({ wishlist: get().wishlist.filter((item) => item.id !== product.id) });
        } else {
          set({ wishlist: [...get().wishlist, product] });
        }
      },
      
      isInWishlist: (productId) => get().wishlist.some((item) => item.id === productId),
    }),
    { name: 'wishlist-storage' }
  )
);