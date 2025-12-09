"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { User, ChevronDown } from "lucide-react";

export default function UserDropdown() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [user, setUser] = useState(null);

  // Check login token
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setUser({ name: "User" }); // You can decode real name later
    }
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!user) return null; // user not logged in → return nothing

  const logout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Avatar button */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition"
      >
        <User size={22} />
        <ChevronDown size={18} />
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg border p-2">
          <button
            onClick={() => router.push("/profile")}
            className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded"
          >
            My Profile
          </button>

          <button
            onClick={() => router.push("/orders")}
            className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded"
          >
            My Orders
          </button>

          <button
            onClick={logout}
            className="w-full text-left px-3 py-2 text-red-600 hover:bg-red-50 rounded"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
