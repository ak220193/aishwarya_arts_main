"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { FiSearch, FiHeart, FiShoppingCart, FiX } from "react-icons/fi";
import { CiMenuFries } from "react-icons/ci";
import { usePathname, useRouter } from "next/navigation";
import { navItems } from "../HomePage";
import toast from "react-hot-toast";
import { useSession, signOut } from "next-auth/react";
import { useAuthStore } from "../../../store/useAuthStore";
import Logo from "../../../public/LOGO.svg";

// Zustand Stores
import { useCartStore } from "../../../store/useCartStore";
import { useWishlistStore } from "../../../store/useWishlistStore";

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const [dbImage, setDbImage] = useState(null);

  // Get Store Data
  const cart = useCartStore((state) => state.cart);
  const wishlist = useWishlistStore((state) => state.wishlist);

  const pathname = usePathname();
  const router = useRouter();
  const { data: session, status } = useSession();
  const isLoggedIn = status === "authenticated";

  // Fix Hydration mismatch (Wait until client-side to show badges)
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const fetchHeaderAvatar = async () => {
      try {
        const res = await fetch("/api/users/profile");
        const data = await res.json();
        if (data.success && data.data.avatar) {
          setDbImage(data.data.avatar);
        }
      } catch (err) {
        console.error("Header Avatar Sync Error:", err);
      }
    };

    if (isLoggedIn) fetchHeaderAvatar();
  }, [isLoggedIn, session]);

  const logoutZustand = useAuthStore((state) => state.logout);
  const loginZustand = useAuthStore((state) => state.login);
  const zustandLoggedIn = useAuthStore((state) => state.isLoggedIn);

  useEffect(() => {
    // If NextAuth says we are logged in, but Zustand is still 'false'
    if (status === "authenticated" && !zustandLoggedIn && session?.user) {
      loginZustand(session.user);
    }

    // If NextAuth says we are logged out, but Zustand is still 'true'
    if (status === "unauthenticated" && zustandLoggedIn) {
      logoutZustand();
    }
  }, [status, session, zustandLoggedIn, loginZustand, logoutZustand]);

  const handleLogout = async () => {
    logoutZustand();
    await signOut({ redirect: false });
    setMobileOpen(false);
    setDropdownOpen(false);
    toast.success("Account logged out");
    router.push("/");
  };

  

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const headerProfileSrc = dbImage || session?.user?.image;

  // Updated Helper to render Icons with Real-Time Badges
  const renderIcon = (type) => {
    if (type === "wishlist")
      return (
        <div className="relative">
          <FiHeart size={22} />
          {mounted && wishlist.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold h-4 w-4 flex items-center justify-center rounded-full animate-in zoom-in duration-300">
              {wishlist.length}
            </span>
          )}
        </div>
      );
    if (type === "cart")
      return (
        <div className="relative">
          <FiShoppingCart size={22} />
          {mounted && cart.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-amber-600 text-white text-[10px] font-bold h-4 w-4 flex items-center justify-center rounded-full animate-in zoom-in duration-300">
              {cart.length}
            </span>
          )}
        </div>
      );
    return null;
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 font-outfit">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link
          href="/"
          aria-label="Home"
          className="flex items-center gap-4 group"
        >
          <div className="relative overflow-hidden rounded-xl transition-transform group-hover:scale-105">
            <Image
              src={Logo}
              alt="Logo"
              width={55}
              priority
              className="object-contain"
            />
          </div>

          <div className="flex flex-col mt-2">
            <h1 className="text-xl md:text-2xl font-bold bg-linear-to-r from-zinc-900 to-amber-600 bg-clip-text text-transparent leading-none">
              Aishwaraya Arts
            </h1>
            <span className="text-sm md:text-[15px] uppercase trackaing-wide text-zinc-900 font-semibold mt-1">
              Crafting Tanjore Masterpieces 
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`relative text-lg font-bold tracking-normal transition ${pathname === item.href ? "text-amber-800" : "text-black hover:text-amber-700"}`}
            >
              {item.label}
              <span
                className={`absolute left-0 -bottom-1 h-0.5 bg-amber-800 transition-all ${pathname === item.href ? "w-full" : "w-0"}`}
              />
            </Link>
          ))}
        </nav>

        {/* Desktop Utilities */}
        <div className="hidden lg:flex items-center space-x-6">
          <Link href="/wishlist" className="hover:text-amber-800 transition">
            {renderIcon("wishlist")}
          </Link>

          <Link href="/cart" className="hover:text-amber-800 transition">
            {renderIcon("cart")}
          </Link>

          {isLoggedIn ? (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen((p) => !p)}
                className="w-10 h-10 rounded-full overflow-hidden border-2 border-amber-100 flex items-center justify-center transition-all hover:border-amber-300 shadow-sm"
              >
                {headerProfileSrc ? (
                  <Image
                    src={headerProfileSrc}
                    alt="Avatar"
                    width={40}
                    height={40}
                    className="object-cover"
                  />
                ) : (
                  <div className="bg-amber-100 text-amber-800 font-bold w-full h-full flex items-center justify-center uppercase text-sm">
                    {session?.user?.name ? session.user.name.charAt(0) : "U"}
                  </div>
                )}
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded-xl shadow-xl py-2 overflow-hidden z-60">
                  <Link
                    href="/profile"
                    className="block px-4 py-3 text-sm hover:bg-gray-50  transition"
                    onClick={() => setDropdownOpen(false)}
                  >
                    My Profile
                  </Link>
                  <Link
                    href="/orders"
                    className="block px-4 py-3 text-sm hover:bg-gray-50  transition"
                    onClick={() => setDropdownOpen(false)}
                  >
                    My Orders
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-3 text-sm hover:bg-gray-50 text-red-600 font-medium transition"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              href="/login"
              className="px-6 py-2 rounded-md bg-linear-to-r from-yellow-700 to-yellow-500 text-white font-semibold hover:shadow-lg transition shadow-yellow-700/20"
            >
              Login
            </Link>
          )}
        </div>

        {/* Mobile Button */}
        <div className="lg:hidden flex items-center gap-4">
          {/* Mobile Cart/Wishlist quick access */}
          <Link href="/cart" className="relative">
            {renderIcon("cart")}
          </Link>
          <button onClick={() => setMobileOpen(true)} className="p-1">
            <CiMenuFries size={28} />
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-100 bg-white p-6 transition-all animate-in slide-in-from-right duration-300">
          <div className="flex justify-between items-center mb-12">
            <Image src={Logo} alt="Logo" width={60} />
            <div className="flex flex-col">
              <h1 className="text-xl font-bold bg-linear-to-r from-zinc-900 to-amber-600 bg-clip-text text-transparent ">
                Aishwaraya Arts
              </h1>
              <span className="text-[12px] uppercase tracking-wide text-zinc-900 font-semibold">
                Tanjore Gallery
              </span>
            </div>
            <button
              onClick={() => setMobileOpen(false)}
              className="p-2 bg-gray-100 rounded-full"
            >
              <FiX size={24} />
            </button>
          </div>
          <nav className="flex flex-col gap-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`text-2xl font-semibold italic tracking-tighter  ${pathname === item.href ? "text-amber-800" : "text-black"}`}
              >
                {item.label}
              </Link>
            ))}

            <div className="grid grid-cols-2 gap-4 pt-6 border-t mt-4">
              <Link
                href="/wishlist"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center gap-3 py-4 bg-gray-50 rounded-2xl"
              >
                {renderIcon("wishlist")}{" "}
                <span className="font-bold">Wishlist</span>
              </Link>
              <Link
                href="/cart"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center gap-3 py-4 bg-gray-50 rounded-2xl"
              >
                {renderIcon("cart")} <span className="font-bold">Cart</span>
              </Link>
            </div>

            {!isLoggedIn ? (
              <Link
                href="/login"
                onClick={() => setMobileOpen(false)}
                className="py-4 bg-amber-700 text-white rounded-2xl font-bold text-center mt-4"
              >
                Login / Register
              </Link>
            ) : (
              <div className="space-y-4">
                <Link
                  href="/profile"
                  onClick={() => setMobileOpen(false)}
                  className="block text-center py-4 border-2 border-gray-100 rounded-2xl font-bold"
                >
                  My Account
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full py-4 text-red-600 font-bold border-2 border-red-50 rounded-2xl"
                >
                  Logout
                </button>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
