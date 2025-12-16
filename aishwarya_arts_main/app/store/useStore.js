// app/store/useStore.js
import { create } from "zustand";

export const useStore = create((set, get) => ({
  
  
  // ================= AUTH STATE =================
  user: null,            // logged-in user info
  token: null,           // JWT token
  login: (userData, token) => set({ user: userData, token }), 
  logout: () => set({ user: null, token: null }),

 
 
  // ================= CART STATE =================
  cartItems: [],

  addToCart: (product, qty = 1) =>
    set((state) => {
      const exist = state.cartItems.find((p) => p._id === product._id);
      if (exist) {
        return {
          cartItems: state.cartItems.map((p) =>
            p._id === product._id ? { ...p, qty: (p.qty || 1) + qty } : p
          ),
        };
      } else {
        return { cartItems: [...state.cartItems, { ...product, qty }] };
      }
    }),

  removeFromCart: (id) =>
    set((state) => ({
      cartItems: state.cartItems.filter((item) => item._id !== id),
    })),

  clearCart: () => set({ cartItems: [] }),

  totalCartItems: () =>
    get().cartItems.reduce((acc, item) => acc + (item.qty || 1), 0),

  totalPrice: () =>
    get().cartItems.reduce((acc, item) => {
      const price =
        item.variations?.prices?.[item.selectedSize] ||
        0; // fallback if price not set
      return acc + price * (item.qty || 1);
    }, 0),

 
    // ================= WISHLIST STATE =================
  wishlist: [],
  toggleWishlist: (product) =>
    set((state) => {
      const exists = state.wishlist.find((p) => p._id === product._id);
      if (exists) {
        return {
          wishlist: state.wishlist.filter((p) => p._id !== product._id),
        };
      } else {
        return { wishlist: [...state.wishlist, product] };
      }
    }),
  totalWishlistItems: () => get().wishlist.length,

  
  // ================= UI STATE =================
  isSidebarOpen: false,
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),

  isCartModalOpen: false,
  toggleCartModal: () => set((state) => ({ isCartModalOpen: !state.isCartModalOpen })),

  toast: { message: "", type: "" },
  setToast: (toast) => set({ toast }),

 
  // ================= FILTERS / SEARCH =================
  filters: {
    god: "",
    frameSize: "",
    min: 0,
    max: 100000,
    availability: "",
  },
  setFilters: (filters) => set({ filters }),

  searchQuery: "",
  setSearchQuery: (q) => set({ searchQuery: q }),

  sortBy: "price-low",
  setSortBy: (sort) => set({ sortBy: sort }),
}));
