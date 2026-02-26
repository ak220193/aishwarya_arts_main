"use client";
import React, { useState } from "react";
import { 
  Menu, Search, Bell, User, Plus, 
  Settings, LogOut, Globe, Command, 
  CheckCircle2, Sparkles 
} from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { signOut } from "next-auth/react";

const Navbar = ({ onMenuClick }) => {
  const [showProfile, setShowProfile] = useState(false);
  

  const handleLogout = async () => {
    // This clears the JWT, sessions, and redirects to /admin
    await signOut({ callbackUrl: "/admin" });
  };

  return (
    <header className="h-20 border-b border-amber-100/50 bg-white/70 backdrop-blur-xl sticky top-0 z-30 px-4 lg:px-8 flex items-center justify-between">
      
      {/* LEFT: MOBILE TOGGLE & BRAND (MOBILE ONLY) */}
      <div className="flex items-center gap-4">
        <button 
          onClick={onMenuClick}
          className="lg:hidden p-2.5 text-zinc-600 hover:bg-amber-50 hover:text-amber-600 rounded-xl transition-all"
        >
          <Menu size={22} />
        </button>
        
        <Link href="/" className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg border border-zinc-200 hover:border-amber-200 text-zinc-500 hover:text-amber-600 transition-all group">
          <Globe size={14} className="group-hover:rotate-12 transition-transform" />
          <span className="text-md font-semibold uppercase tracking-wide text-black">Admin Contol Center</span>
        </Link>
      </div>

      {/* CENTER: GLOBAL SEARCH (The Shopify Style) */}
      <div className="flex-1 max-w-xl px-4 hidden md:block">
        <div className="relative group">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2 pointer-events-none">
            <Search size={16} className="text-zinc-400 group-focus-within:text-amber-600 transition-colors" />
          </div>
          <input 
            type="text" 
            placeholder="" 
            className="w-full bg-zinc-100/50 border border-transparent rounded-2xl py-2.5 pl-11 pr-12 text-sm outline-none focus:bg-white focus:border-amber-200 focus:ring-4 focus:ring-amber-500/5 transition-all"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 hidden lg:flex items-center gap-1 bg-white border border-zinc-200 px-1.5 py-1 rounded-md shadow-sm pointer-events-none">
            <Command size={10} className="text-zinc-400" />
          </div>
        </div>
      </div>

      {/* RIGHT: ACTIONS & PROFILE */}
      <div className="flex items-center gap-2 md:gap-5">
        
        {/* Notifications */}
        <button className="p-2.5 text-zinc-500 hover:bg-amber-50 hover:text-amber-600 rounded-xl transition-all relative group">
          <Bell size={20} />
          <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-amber-500 rounded-full border-2 border-white ring-2 ring-amber-500/20 group-hover:scale-125 transition-transform" />
        </button>

        {/* Quick Add Button */}
       
        
        {/* Profile Dropdown Trigger */}
        <div className="relative pl-2 md:pl-5 border-l border-zinc-200 ml-2">
          <button 
            onClick={() => setShowProfile(!showProfile)}
            className="flex items-center gap-3 group"
          >
            <div className="hidden text-right lg:block">
              <p className="text-md font-bold text-zinc-900 leading-none">Akash</p>
              <div className="flex items-center justify-end gap-1 mt-1">
                <Sparkles size={8} className="text-amber-500" />
                <p className="text-[12px] text-zinc-900 font-bold uppercase tracking-wide leading-none">Super Admin</p>
              </div>
            </div>
            <div className="w-10 h-10 rounded-full bg-linear-to-tr from-amber-100 to-amber-50 flex items-center justify-center text-amber-700 border border-amber-200 group-hover:border-amber-400 group-hover:shadow-md transition-all relative">
              <User size={20} />
              <div className="absolute -bottom-0.5 -right-0.5 bg-green-500 w-3 h-3 rounded-full border-2 border-white" />
            </div>
          </button>

          {/* User Dropdown Menu */}
          <AnimatePresence>
            {showProfile && (
              <>
                <div className="fixed inset-0 z-[-1]" onClick={() => setShowProfile(false)} />
                <motion.div 
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 mt-3 w-56 bg-white border border-amber-100 rounded-2xl shadow-2xl shadow-amber-900/5 p-2 overflow-hidden"
                >
                   <div className="px-4 py-3 border-b border-zinc-50 mb-1">
                      <p className="text-sm font-bold text-zinc-900">Akash Control Center</p>
                      <p className="text-sm text-zinc-800 mt-0.5">akash@aishwaryaarts.com</p>
                   </div>
                   <Link href="/admin/settings" className="flex items-center gap-3 px-3 py-2.5 text-xs text-zinc-600 hover:bg-amber-50 hover:text-amber-700 rounded-xl transition-all">
                      <Settings size={14} />
                      Profile Settings
                   </Link>
                   <button onClick={handleLogout} className="flex items-center gap-3 w-full px-3 py-2.5 text-xs text-red-500 hover:bg-red-50 rounded-xl transition-all">
                      <LogOut size={14} />
                      Sign Out
                   </button>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
};

export default Navbar;