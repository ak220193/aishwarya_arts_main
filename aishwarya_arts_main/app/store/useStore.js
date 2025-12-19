// app/store/useStore.js
import { create } from "zustand";
import toast from "react-hot-toast";

export const useStore = create((set, get) => ({
  // ================= AUTH STATE =================
  // user: null, // logged-in user info
  // token: null, // JWT token
  // login: (userData, token) => set({ user: userData, token }),
  // logout: () => set({ user: null, token: null }),

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
      const price = item.variations?.prices?.[item.selectedSize] || 0; // fallback if price not set
      return acc + price * (item.qty || 1);
    }, 0),

  // ================= WISHLIST STATE =================
  wishlist: [],

  // Toggle wishlist
  toggleWishlist: async (product) => {
    const currentWishlist = get().wishlist;
    const exists = currentWishlist.some((p) => p._id === product._id);

    // Optimistic UI update
    set({
      wishlist: exists
        ? currentWishlist.filter((p) => p._id !== product._id)
        : [...currentWishlist, product],
    });

    try {
      const res = await fetch("/api/wishlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: product._id }),
        credentials: "include",
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Failed");

      // Sync with server
      set({ wishlist: data.wishlist });

      // Toast
      if (!exists) toast.success("Product added to wishlist!");
      else toast.error("Product removed from wishlist");
    } catch (err) {
      console.error(err);
      // Rollback if API fails
      set({ wishlist: currentWishlist });
      toast.error("Something went wrong. Please try again.");
    }
  },

  // Fetch wishlist on login/session restore
  fetchWishlist: async () => {
    try {
      const res = await fetch("/api/wishlist", { credentials: "include" });
      const data = await res.json();
      if (res.ok) set({ wishlist: data.wishlist });
    } catch (err) {
      console.error(err);
    }
  },

  totalWishlistItems: () => get().wishlist.length,

  // ================= UI STATE =================
  isSidebarOpen: false,
  toggleSidebar: () =>
    set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),

  isCartModalOpen: false,
  toggleCartModal: () =>
    set((state) => ({ isCartModalOpen: !state.isCartModalOpen })),

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
