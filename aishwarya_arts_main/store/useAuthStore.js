import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      isLoggedIn: false,
      
      // Action to login
      login: (userData) => set({ user: userData, isLoggedIn: true }),
      
      // Action to logout
      logout: () => {
        // We use curly braces here so we can execute logic if needed
        set({ user: null, isLoggedIn: false });
        // The 'persist' middleware will automatically update 'auth-storage' in localStorage
      },
    }),
    {
      name: 'auth-storage', 
      onRehydrateStorage: () => (state) => {
        console.log("🛠 AUTH STORE HYDRATED. Current State:", state);
      }
    }
  )
);