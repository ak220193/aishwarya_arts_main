"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, ShoppingBag, Users, 
  Truck, Image as ImageIcon, LogOut, Settings 
} from "lucide-react";
import { signOut } from "next-auth/react";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/admin" },
  { icon: ShoppingBag, label: "Products", href: "/admin/products" },
  { icon: Truck, label: "Orders", href: "/admin/orders" },
  { icon: Users, label: "Customers", href: "/admin/customers" },
  { icon: ImageIcon, label: "Banners", href: "/admin/banners" },
];

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-zinc-900 text-white min-h-screen flex flex-col border-r border-zinc-800">
      <div className="p-6">
        <h1 className="text-xl font-bold tracking-tighter uppercase text-amber-500">
          Art Heritage <span className="text-white block text-[10px]">Admin Panel</span>
        </h1>
      </div>

      <nav className="flex-1 mt-4 px-4 space-y-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all ${
                isActive 
                  ? "bg-amber-500 text-black font-bold shadow-lg shadow-amber-500/20" 
                  : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
              }`}
            >
              <item.icon size={18} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-zinc-800 space-y-2">
        <button 
          onClick={() => signOut({ callbackUrl: "/" })}
          className="flex items-center gap-3 w-full px-4 py-3 text-sm text-red-400 hover:bg-red-500/10 rounded-xl transition-all"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;