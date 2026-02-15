"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";


const ProfilePage = () => {
  
  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* ================= SIDEBAR ================= */}
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

          {/* ================= MAIN CONTENT ================= */}
          <section className="lg:col-span-3 bg-white rounded-2xl shadow-sm p-8">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                Account Details
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Update your personal information and address
              </p>
            </div>

            <form className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Input label="First Name" />
              <Input label="Last Name" />

              <Input label="Email Address" />
              <Input label="Phone Number" />

              <Input label="Alternate Phone Number" />
              <Input label="City" />

              <Input label="Pincode" />
              <Input label="Landmark" />

              <Input label="Address Line 1" full />
              <Input label="Address Line 2" full />

              <div className="md:col-span-2 pt-6 flex gap-4">
                {/* Save */}
                <button
                  type="submit"
                  className="rounded-lg bg-gradient-to-r from-yellow-700 to-yellow-500
               px-8 py-3 text-white font-semibold hover:opacity-90 transition"
                >
                  Save Changes
                </button>

                {/* Cancel */}
                <button
                  type="button"
                  className="rounded-lg border border-gray-300
               px-8 py-3 text-gray-700 font-medium
               hover:bg-gray-100 transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

/* ================= COMPONENTS ================= */

const SidebarLink = ({ href, label }) => (
  <Link
    href={href}
    className="block px-4 py-2 rounded-lg hover:bg-gray-100 text-gray-700"
  >
    {label}
  </Link>
);

const Input = ({ label, full }) => (
  <div className={full ? "md:col-span-2" : ""}>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <input
      type="text"
      className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm
                 focus:border-amber-600 focus:ring-2 focus:ring-amber-600/20
                 outline-none"
    />
  </div>
);
