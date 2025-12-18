"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { FiSearch, FiHeart, FiShoppingCart, FiX } from "react-icons/fi";
import { CiMenuFries } from "react-icons/ci";
import { usePathname, useRouter } from "next/navigation";
import { navItems, utilities } from "../HomePage";
import LogoMain from "../../../public/assets/logo/logosample.png";
import { useStore } from "../../store/useStore";
import toast from "react-hot-toast";

const iconMap = {
  FiSearch,
  FiHeart,
  FiShoppingCart,
};

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const pathname = usePathname();
  const router = useRouter();
  const { token, logout } = useStore();
  const isLoggedIn = Boolean(token);

  const handleLogout = () => {
    logout();
    setMobileOpen(false);
    setDropdownOpen(false);
    toast.success("Account Logged out")
    router.push("/");
  };

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      {/* ================= DESKTOP HEADER ================= */}
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" aria-label="Home">
          <Image src={LogoMain} alt="Logo" width={100} priority />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`relative font-medium transition ${
                pathname === item.href ? "text-amber-800" : "text-black"
              }`}
            >
              {item.label}
              <span
                className={`absolute left-0 -bottom-1 h-[2px] bg-amber-800 transition-all ${
                  pathname === item.href ? "w-full" : "w-0"
                }`}
              />
            </Link>
          ))}
        </nav>

        {/* Desktop Utilities + Auth */}
        <div className="hidden lg:flex items-center space-x-4">
          {utilities
            .filter((u) => u.type === "icon")
            .map((item) => {
              const Icon = iconMap[item.icon];
              return (
                <button key={item.label} aria-label={item.label}>
                  <Icon size={22} />
                </button>
              );
            })}

          {isLoggedIn ? (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen((p) => !p)}
                className="w-10 h-10 rounded-full overflow-hidden border"
              >
                <Image
                  src="/assets/about/female-1.png"
                  alt="Avatar"
                  width={40}
                  height={40}
                />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-md">
                  <Link
                    href="/profile"
                    className="block px-4 py-2 hover:bg-gray-100"
                    onClick={() => setDropdownOpen(false)}
                  >
                    My Profile
                  </Link>
                  <Link
                    href="/orders"
                    className="block px-4 py-2 hover:bg-gray-100"
                    onClick={() => setDropdownOpen(false)}
                  >
                    My Orders
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            utilities
              .filter((u) => u.type === "button")
              .map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="px-6 py-2 rounded bg-gradient-to-r from-yellow-700 to-yellow-500 text-white font-semibold"
                >
                  {item.label}
                </Link>
              ))
          )}
        </div>

        {/* Mobile Menu Button */}
        {/* Mobile / Tablet Right Actions */}
        <div className="lg:hidden flex items-center gap-3">
          {isLoggedIn && (
            <button
              onClick={() => setMobileOpen(true)}
              className="w-9 h-9 rounded-full overflow-hidden border"
              aria-label="User menu"
            >
              <Image
                src="/assets/about/female-1.png"
                alt="User Avatar"
                width={36}
                height={36}
              />
            </button>
          )}

          <button onClick={() => setMobileOpen(true)} aria-label="Open menu">
            <CiMenuFries size={28} />
          </button>
        </div>
      </div>

      {/* ================= MOBILE OVERLAY ================= */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* ================= MOBILE DRAWER ================= */}
      {mobileOpen && (
        <div className="fixed top-0 right-0 h-full w-full bg-white z-50">
          <div className="flex items-center justify-between px-6 py-4 border-b">
            <Image src={LogoMain} alt="Logo" width={80} />
            <button onClick={() => setMobileOpen(false)}>
              <FiX size={26} />
            </button>
          </div>

          <nav className="flex flex-col items-center mt-10 space-y-6 px-6">
            {/* Nav Links */}
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="text-lg font-medium"
              >
                {item.label}
              </Link>
            ))}

            {/* Icons */}
            <div className="flex space-x-4 mt-6">
              {utilities
                .filter((u) => u.type === "icon")
                .map((item) => {
                  const Icon = iconMap[item.icon];
                  return <Icon key={item.label} size={24} />;
                })}
            </div>

            {/* Login (when logged out) */}
            {!isLoggedIn && (
              <div className="mt-8 w-full">
                {utilities
                  .filter((u) => u.type === "button")
                  .map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className="block w-full text-center py-3 rounded-md bg-gradient-to-r from-yellow-700 to-yellow-500 text-white font-semibold"
                    >
                      {item.label}
                    </Link>
                  ))}
              </div>
            )}

            {/* Profile / Orders / Logout (when logged in) */}
            {isLoggedIn && (
              <div className="mt-10 w-full border-t pt-6 text-center space-y-4">
                <Link
                  href="/profile"
                  onClick={() => setMobileOpen(false)}
                  className="block font-medium"
                >
                  My Profile
                </Link>
                <Link
                  href="/orders"
                  onClick={() => setMobileOpen(false)}
                  className="block font-medium"
                >
                  My Orders
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-red-600 font-medium"
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
