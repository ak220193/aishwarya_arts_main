"use client";
import React from "react";
import { Menu, Search, Bell, User, Plus, Globe, ExternalLink } from "lucide-react";
import Link from "next/link";

const Navbar = ({ onMenuClick }) => {
  return (
    <header className="h-20 border-b border-amber-100/50 bg-white/60 backdrop-blur-md sticky top-0 z-30 px-4 lg:px-8 flex items-center justify-between">
      
      <div className="flex items-center gap-4">
        {/* 📱 MOBILE HAMBURGER BUTTON - Visible only on mobile/tablet */}
        <button 
          onClick={onMenuClick}
          className="lg:hidden p-2.5 text-zinc-600 hover:bg-amber-50 hover:text-amber-600 rounded-xl transition-all"
        >
          <Menu size={24} />
        </button>

        {/* Global Search */}
        <div className="hidden sm:flex relative group max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-amber-600" size={16} />
          <input 
            type="text" 
            placeholder="Search..." 
            className="bg-zinc-100/50 border-none rounded-xl py-2 pl-10 text-sm outline-none focus:bg-white focus:ring-2 focus:ring-amber-500/10 transition-all w-40 md:w-64"
          />
        </div>
      </div>

      {/* RIGHT ACTIONS */}
      <div className="flex items-center gap-3 md:gap-6">
        {/* Quick Add Button */}
        <button className="flex items-center gap-2 bg-amber-600 text-white p-2.5 md:px-5 md:py-2.5 rounded-xl shadow-lg shadow-amber-200 hover:bg-amber-700 transition-all active:scale-95">
          <Plus size={18} />
          <span className="hidden md:inline text-[11px] font-bold uppercase tracking-widest">Add New</span>
        </button>
        
        <div className="flex items-center gap-3 pl-2 md:pl-4 border-l border-zinc-200">
           <div className="hidden text-right md:block">
              <p className="text-[13px] font-bold text-zinc-900 leading-none">Akash</p>
              <p className="text-[10px] text-zinc-400 uppercase tracking-tighter mt-1">Super Admin</p>
           </div>
           <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-100 to-amber-50 flex items-center justify-center text-amber-700 border border-amber-200">
              <User size={20} />
           </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;