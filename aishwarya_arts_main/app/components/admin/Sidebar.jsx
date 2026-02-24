"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ShoppingBag,
  Users,
  Truck,
  Image as ImageIcon,
  LogOut,
  Settings,
  TrendingUp,
  Boxes,
  Package,
  TicketPercent,
  Star,
  FileText,
  MessageSquare,
  ClipboardList,
  PanelLeftClose,
  PanelLeftOpen,
  X,
} from "lucide-react";
import { signOut } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Logo from "../../../public/Logo.png";

const menuItems = [
  {
    group: "Intelligence",
    items: [
      { icon: LayoutDashboard, label: "Overview", href: "/admin/dashboard" },
      { icon: TrendingUp, label: "Sales Reports", href: "/admin/sales" },
    ],
  },
  {
    group: "Gallery Management",
    items: [
      { icon: ShoppingBag, label: "Products", href: "/admin/products" },
      { icon: Boxes, label: "Inventory", href: "/admin/inventory" },
      { icon: ImageIcon, label: "Hero Banners", href: "/admin/banners" },
    ],
  },
  {
    group: "Logistics",
    items: [
      { icon: Users, label: "Customers", href: "/admin/customers" },
      { icon: ClipboardList, label: "Orders", href: "/admin/orders" },
      { icon: Package, label: "Shipments", href: "/admin/shipments" },
    ],
  },
  {
    group: "Editorial (CMS)",
    items: [
      { icon: FileText, label: "Blog Posts", href: "/admin/blog" },
      { icon: MessageSquare, label: "Comments", href: "/admin/comments" },
      { icon: Star, label: "Product Reviews", href: "/admin/reviews" },
    ],
  },
];

const Sidebar = ({
  isCollapsed,
  setIsCollapsed,
  isMobileOpen,
  setIsMobileOpen,
}) => {
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    setIsMounted(true);

    // Function to handle resize and update state
    const handleResize = () => {
      const desktop = window.innerWidth >= 1024;
      setIsDesktop(desktop);
      // Auto-close mobile menu if user expands screen to desktop
      if (desktop) setIsMobileOpen(false);
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [setIsMobileOpen]);

  if (!isMounted) return null;

  return (
    <>
      {/* 📱 MOBILE OVERLAY */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-100 lg:hidden"
          />
        )}
      </AnimatePresence>

      <motion.aside
        initial={false}
        animate={{
          width: isCollapsed ? 80 : 288,
          // Use the state variable instead of direct window access
          x: isDesktop ? 0 : isMobileOpen ? 0 : -300,
        }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className={`fixed lg:sticky top-0 left-0 h-screen bg-[#09090b] text-zinc-400 flex flex-col border-r border-zinc-800/50 z-[101] font-sans shadow-2xl lg:shadow-none`}
      >
        {/* 1. BRANDING & TOGGLE */}
        <div className="p-6 pb-6">
          <div className="flex items-center justify-between mb-8">
            <AnimatePresence mode="wait">
              {!isCollapsed && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="flex items-center gap-3 overflow-hidden"
                >
                  <div className="relative p-1 bg-linear-to-tr from-amber-500/20 to-transparent rounded-xl border border-amber-500/10">
                    <Image
                      src={Logo}
                      width={38}
                      height={38}
                      alt="Logo"
                      className="rounded-lg brightness-110"
                    />
                  </div>
                  <div>
                    <h2 className="text-[14px] text-zinc-100 font-bold tracking-widest uppercase">
                      Aishwarya <span className="text-amber-500">Arts</span>
                    </h2>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <button
              onClick={() =>
                isMobileOpen
                  ? setIsMobileOpen(false)
                  : setIsCollapsed(!isCollapsed)
              }
              className="p-2 hover:bg-zinc-800/50 rounded-lg text-zinc-500 hover:text-amber-500 transition-colors"
            >
              {isMobileOpen ? (
                <X size={20} />
              ) : isCollapsed ? (
                <PanelLeftOpen size={20} />
              ) : (
                <PanelLeftClose size={20} />
              )}
            </button>
          </div>
          <div className="h-px w-full bg-linear-to-r from-amber-500 via-amber-700 to-transparent opacity-50" />
        </div>

        {/* 2. NAVIGATION */}
        <nav className="flex-1 px-4 space-y-8 overflow-y-auto no-scrollbar">
          {menuItems.map((group) => (
            <div key={group.group} className="space-y-2">
              {!isCollapsed && (
                <motion.h3
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="px-4 text-[12px] font-semibold text-zinc-100 uppercase tracking-[0.1rem] mb-2"
                >
                  {group.group}
                </motion.h3>
              )}
              {group.items.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => {
                      if (!isDesktop) setIsMobileOpen(false);
                    }}
                    className={`group flex items-center gap-3.5 px-4 py-2.5 rounded-xl transition-all duration-300 ${
                      isActive
                        ? "bg-zinc-800/40 text-white"
                        : "text-zinc-500 hover:text-white hover:bg-zinc-800/20"
                    }`}
                  >
                    <item.icon
                      size={18}
                      className={
                        isActive
                          ? "text-amber-500"
                          : "group-hover:text-amber-500"
                      }
                    />
                    {!isCollapsed && (
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-[13px] font-medium tracking-wide whitespace-nowrap"
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>

        {/* 3. FOOTER */}
        <div className="p-4 bg-[#09090b] border-t border-zinc-800/50">
          <div className="rounded-2xl bg-zinc-900/40 p-2 space-y-1">
            <Link
              href="/admin/settings"
              onClick={() => {
                if (!isDesktop) setIsMobileOpen(false);
              }}
              className="flex items-center gap-3 px-4 py-3 text-zinc-500 hover:text-white rounded-lg hover:bg-zinc-800/50 transition-all"
            >
              <Settings size={18} />
              {!isCollapsed && (
                <span className="text-xs font-semibold tracking-wide">
                  Settings
                </span>
              )}
            </Link>
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="flex items-center gap-3 w-full px-4 py-3 text-sm text-zinc-500 hover:text-red-400 rounded-lg transition-all"
            >
              <LogOut size={18} />
              {!isCollapsed && (
                <span className="text-xs font-semibold tracking-wide">
                  Logout
                </span>
              )}
            </button>
          </div>
        </div>
      </motion.aside>
    </>
  );
};

export default Sidebar;
