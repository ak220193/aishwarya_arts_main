// app/store/useStore.js
import { create } from "zustand";

export const useStore = create((set, get) => ({
  // --- AUTH STATE ---
  user: null,            // logged-in user info
  token: null,           // JWT token
  login: (userData, token) => set({ user: userData, token }), // login function
  logout: () => set({ user: null, token: null }),             // logout function

  // --- CART STATE ---
  cartItems: [],

  addToCart: (product) =>
    set((state) => ({ cartItems: [...state.cartItems, product] })),

  removeFromCart: (id) =>
    set((state) => ({
      cartItems: state.cartItems.filter((item) => item.id !== id),
    })),

  clearCart: () => set({ cartItems: [] }),

  totalPrice: () =>
    get().cartItems.reduce((acc, item) => acc + item.price, 0),

  // --- UI STATE (optional) ---
  isSidebarOpen: false,
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
}));
