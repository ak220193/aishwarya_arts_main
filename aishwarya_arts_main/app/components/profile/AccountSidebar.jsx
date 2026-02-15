"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react"; // Import NextAuth hooks

const SidebarLink = ({ href, label }) => (
  <Link
    href={href}
    className="block px-4 py-2 rounded-lg hover:bg-gray-100 text-gray-700 transition-colors"
  >
    {label}
  </Link>
);

const AccountSidebar = () => {
  const { data: session } = useSession();

  const handleLogout = async () => {
    // signOut automatically clears the session and refreshes/redirects
    await signOut({ 
      callbackUrl: "/", // Redirects to home page after logout
      redirect: true 
    });
  };

  return (
    <aside className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 h-fit">
      <div className="flex flex-col items-center text-center">
        <div className="relative">
          <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-amber-50">
            <Image
              src={session?.user?.image || "/assets/about/female-1.png"}
              alt="Profile"
              width={96}
              height={96}
              className="object-cover"
            />
          </div>

          <label className="mt-3 inline-block text-xs font-medium text-amber-700 cursor-pointer hover:underline">
            Change photo
            <input type="file" accept="image/*" className="hidden" />
          </label>
        </div>

        {/* Dynamic User Info from NextAuth Session */}
        <p className="mt-4 text-sm font-semibold text-gray-800">
           {session?.user?.name || "Art Collector"}
        </p>
        <p className="text-xs text-gray-400">{session?.user?.email || "user@email.com"}</p>
      </div>

      <nav className="mt-8 space-y-2 text-sm font-medium">
        <SidebarLink href="/profile" label="Profile" />
        <SidebarLink href="/orders" label="My Orders" />
        <SidebarLink href="/cart" label="Cart" />
        <SidebarLink href="/wishlist" label="Wishlist" />

        <button
          onClick={handleLogout}
          className="w-full text-left px-4 py-2 rounded-lg text-red-600 hover:bg-red-50 transition-colors mt-4 font-bold"
        >
          Logout
        </button>
      </nav>
    </aside>
  );
};

export default AccountSidebar;