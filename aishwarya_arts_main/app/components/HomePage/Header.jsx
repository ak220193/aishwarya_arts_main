"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { FiSearch, FiHeart, FiShoppingCart, FiX } from "react-icons/fi";
import { CiMenuFries } from "react-icons/ci";
import { usePathname, useRouter } from "next/navigation";
import { navItems, utilities } from "../HomePage";
import LogoMain from "../../../public/Logo.png";
import toast from "react-hot-toast";
import { useSession, signOut } from "next-auth/react";


const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const pathname = usePathname();
  const router = useRouter();

  const { data: session, status } = useSession();
  const isLoggedIn = status === "authenticated";


  const handleLogout = async () => {
    await signOut({ redirect: false });
    setMobileOpen(false);
    setDropdownOpen(false);
    toast.success("Account logged out");
    router.push("/");
  };

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  // Helper to render Icons with Badges
  const renderIcon = (iconName) => {
    if (iconName === "FiHeart") return (
      <div className="relative">
        <FiHeart size={22} />
      </div>
    );
    if (iconName === "FiShoppingCart") return (
      <div className="relative">
        <FiShoppingCart size={22} />
      </div>
    );
    if (iconName === "FiSearch") return <FiSearch size={22} />;
    return null;
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" aria-label="Home">
          <Image src={LogoMain} alt="Logo" width={80} priority />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`relative font-medium transition ${pathname === item.href ? "text-amber-800" : "text-black"}`}
            >
              {item.label}
              <span className={`absolute left-0 -bottom-1 h-[2px] bg-amber-800 transition-all ${pathname === item.href ? "w-full" : "w-0"}`} />
            </Link>
          ))}
        </nav>

        {/* Desktop Utilities */}
        <div className="hidden lg:flex items-center space-x-6">
         
          
          <Link href="/wishlist" className="hover:text-amber-800 transition">
            {renderIcon("FiHeart")}
          </Link>
          
          <Link href="/cart" className="hover:text-amber-800 transition">
            {renderIcon("FiShoppingCart")}
          </Link>

          {isLoggedIn ? (
            <div className="relative">
              <button onClick={() => setDropdownOpen((p) => !p)} className="w-10 h-10 rounded-full overflow-hidden border">
                <Image src={session?.user?.image || "/assets/about/female-1.png"} alt="Avatar" width={40} height={40} />
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-md py-2">
                  <Link href="/profile" className="block px-4 py-2 hover:bg-gray-100" onClick={() => setDropdownOpen(false)}>My Profile</Link>
                  <Link href="/orders" className="block px-4 py-2 hover:bg-gray-100" onClick={() => setDropdownOpen(false)}>My Orders</Link>
                  <button onClick={handleLogout} className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600">Logout</button>
                </div>
              )}
            </div>
          ) : (
            <Link href="/login" className="px-6 py-2 rounded bg-gradient-to-r from-yellow-700 to-yellow-500 text-white font-semibold">
              Login
            </Link>
          )}
        </div>

        {/* Mobile Button */}
        <div className="lg:hidden flex items-center gap-3">
          <button onClick={() => setMobileOpen(true)}><CiMenuFries size={28} /></button>
        </div>
      </div>

      {/* Mobile Drawer (simplified for space) */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 bg-white p-6">
           <div className="flex justify-between items-center mb-10">
              <Image src={LogoMain} alt="Logo" width={80} />
              <button onClick={() => setMobileOpen(false)}><FiX size={26} /></button>
           </div>
           <nav className="flex flex-col gap-6 text-center">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href} onClick={() => setMobileOpen(false)} className="text-xl font-medium">{item.label}</Link>
              ))}
              <div className="flex justify-center gap-8 py-6 border-y">
                <Link href="/wishlist" onClick={() => setMobileOpen(false)}>{renderIcon("FiHeart")}</Link>
                <Link href="/cart" onClick={() => setMobileOpen(false)}>{renderIcon("FiShoppingCart")}</Link>
              </div>
              {!isLoggedIn ? (
                <Link href="/login" className="py-3 bg-amber-700 text-white rounded-lg">Login</Link>
              ) : (
                <button onClick={handleLogout} className="text-red-600">Logout</button>
              )}
           </nav>
        </div>
      )}
    </header>
  );
};

export default Header;