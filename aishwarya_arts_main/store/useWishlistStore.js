import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useWishlistStore = create(
  persist(
    (set, get) => ({
      wishlist: [],

      toggleWishlist: (product) => {
        // Normalize ID to ensure we don't have duplicates between _id and id
        const productId = product._id || product.id;
        const currentWishlist = get().wishlist;
        
        const isFav = currentWishlist.some((item) => (item._id || item.id) === productId);

        if (isFav) {
          // Remove item
          set({ 
            wishlist: currentWishlist.filter((item) => (item._id || item.id) !== productId) 
          });
        } else {
          // Add item with full metadata for the UI
          set({ 
            wishlist: [...currentWishlist, { 
              ...product, 
              id: productId, // Ensure ID is consistent
              addedAt: new Date().toISOString() 
            }] 
          });
        }
      },
      
      isInWishlist: (productId) => 
        get().wishlist.some((item) => (item._id || item.id) === productId),
        
      clearWishlist: () => set({ wishlist: [] }),
    }),
    { name: 'wishlist-storage' }
  )
);