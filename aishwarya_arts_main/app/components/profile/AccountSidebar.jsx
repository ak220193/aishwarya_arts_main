"use client";

import Image from "next/image";
import Link from "next/link";


/* SidebarLink stays SAME */
const SidebarLink = ({ href, label }) => (
  <Link
    href={href}
    className="block px-4 py-2 rounded-lg hover:bg-gray-100 text-gray-700"
  >
    {label}
  </Link>
);

const AccountSidebar = () => {
  

  return (
    <aside className="bg-white rounded-2xl shadow-sm p-6">
      <div className="flex flex-col items-center text-center">
        <div className="relative">
          <div className="w-24 h-24 rounded-full overflow-hidden border">
            <Image
              src="/assets/about/female-1.png"
              alt="Profile"
              width={96}
              height={96}
            />
          </div>

          {/* Change Photo */}
          <label className="mt-3 inline-block text-xs font-medium text-amber-700 cursor-pointer hover:underline">
            Change photo
            <input type="file" accept="image/*" className="hidden" />
          </label>
        </div>

        <p className="mt-4 text-sm text-gray-600">
           user@email.com
        </p>
      </div>

      <nav className="mt-8 space-y-2 text-sm font-medium">
        <SidebarLink href="/profile" label="Profile" />
        <SidebarLink href="/orders" label="My Orders" />
        <SidebarLink href="/cart" label="Cart" />
        <SidebarLink href="/wishlist" label="Wishlist" />

        <button
          className="w-full text-left px-4 py-2 rounded-lg text-red-600 hover:bg-red-50"
        >
          Logout
        </button>
      </nav>
    </aside>
  );
};

export default AccountSidebar;
