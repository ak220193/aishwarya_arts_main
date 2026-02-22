"use client";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { 
  Home, ShoppingBag, Image as ImageIcon, Users, 
  Settings, ChevronLeft, ChevronRight, LogOut 
} from "lucide-react";
import Link from "next/link";

export default function AdminLayout({ children }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();
  
  // Hide sidebar on the login page (/admin)
  if (pathname === "/admin") return <>{children}</>;

  const menuItems = [
    { icon: Home, label: "Home", href: "/admin/dashboard" },
    { icon: ShoppingBag, label: "Products", href: "/admin/products" },
    { icon: ImageIcon, label: "Banners", href: "/admin/banners" },
    { icon: Users, label: "Customers", href: "/admin/customers" },
  ];

  return (
    <div className="flex h-screen bg-[#f6f6f7]">
      {/* SIDEBAR */}
      <aside className={`bg-[#1a1c1d] text-[#e3e3e3] transition-all duration-300 flex flex-col ${isCollapsed ? "w-20" : "w-64"}`}>
        <div className="p-4 flex items-center justify-between border-b border-gray-700">
          {!isCollapsed && <span className="font-bold text-lg tracking-tight">ADMIN</span>}
          <button onClick={() => setIsCollapsed(!isCollapsed)} className="p-2 hover:bg-gray-800 rounded-lg">
            {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
        </div>

        <nav className="flex-1 p-3 space-y-1">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.label} href={item.href} className={`flex items-center gap-3 p-3 rounded-lg transition-all ${isActive ? "bg-[#303030] text-white" : "hover:bg-gray-800 text-gray-400"}`}>
                <item.icon size={20} />
                {!isCollapsed && <span className="text-sm font-medium">{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-700">
          <button className="flex items-center gap-3 p-3 text-gray-400 hover:text-white w-full">
            <LogOut size={20} />
            {!isCollapsed && <span className="text-sm font-medium">Logout</span>}
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 overflow-y-auto">
        <header className="h-14 bg-white border-b border-gray-200 flex items-center px-8 sticky top-0 z-10">
          <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-widest">Store Management</h2>
        </header>
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}