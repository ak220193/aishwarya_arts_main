"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import toast from "react-hot-toast";

const SidebarLink = ({ href, label }) => (
  <Link
    href={href}
    className="block px-4 py-2 rounded-lg hover:bg-gray-100 text-gray-700 transition-colors"
  >
    {label}
  </Link>
);

const AccountSidebar = () => {
  const { data: session, update } = useSession();
  const [uploading, setUploading] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [dbImage, setDbImage] = useState(null);

  const [displayName, setDisplayName] = useState("");

  useEffect(() => {
    const fetchLatestProfile = async () => {
      const res = await fetch("/api/users/profile");
      const data = await res.json();
      if (data.success && data.data) {
        // Update Image
        if (data.data.avatar) setDbImage(data.data.avatar);
        
        // 2. Update Name: Priority DB -> Session -> Fallback
        const fName = data.data.firstName?.trim();
        const lName = data.data.lastName?.trim();
        
        if (fName) {
          setDisplayName(`${fName} ${lName || ""}`);
        } else {
          setDisplayName(session?.user?.name || "User");
        }
      }
    };
    if (session) fetchLatestProfile();
  }, [session]);



  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new window.Image();
      img.src = event.target.result;

      img.onload = async () => {
        const canvas = document.createElement("canvas");
        const MAX_WIDTH = 400;
        const scaleSize = MAX_WIDTH / img.width;
        canvas.width = MAX_WIDTH;
        canvas.height = img.height * scaleSize;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        const compressedBase64 = canvas.toDataURL("image/jpeg", 0.7);

        try {
          const res = await fetch("/api/users/profile", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ avatar: compressedBase64 }),
          });

          const data = await res.json();
          if (data.success) {
            setDbImage(compressedBase64);
            toast.success("Avatar updated!");
            if (update) await update();
            setTimeout(() => window.location.reload(), 500);
          } else {
            toast.error(data.message);
          }
        } catch (err) {
          toast.error("Upload failed.");
        } finally {
          setUploading(false);
        }
      };
    };
  };

  useEffect(() => {
    const fetchLatestImage = async () => {
      const res = await fetch("/api/users/profile");
      const data = await res.json();
      if (data.success && data.data.avatar) {
        setDbImage(data.data.avatar);
      }
    };
    fetchLatestImage();
  }, []);

  const handleLogout = async () => {
    await signOut({
      callbackUrl: "/",
      redirect: true,
    });
  };

  const profileSrc = dbImage || session?.user?.image;
  return (
    <aside className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 h-fit">
      <div className="flex flex-col items-center text-center">
        <div className="relative">
          <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-amber-50 bg-gray-50 flex items-center justify-center">
            {profileSrc && !imgError ? (
              <Image
                src={profileSrc}
                alt="Profile"
                width={96}
                height={96}
                className="object-cover"
                priority
                onError={() => setImgError(true)} // Stops the infinite loop
              />
            ) : (
              <span className="text-amber-800 font-bold text-3xl uppercase">
                {session?.user?.name ? session.user.name.charAt(0) : "U"}
              </span>
            )}
          </div>

          <label className="mt-3 inline-block text-xs font-medium text-amber-700 cursor-pointer hover:underline">
            {uploading ? "Uploading..." : "Change photo"}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
              disabled={uploading}
            />
          </label>
        </div>

        <p className="mt-4 text-sm font-semibold text-gray-800">
          {displayName}
        </p>
        <p className="text-md text-gray-900 font-semibold">
          {session?.user?.email || "user@email.com"}
        </p>
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
