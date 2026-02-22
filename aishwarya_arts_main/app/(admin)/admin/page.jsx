"use client";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await signIn("credentials", {
      email, password, redirect: false 
    });

    if (res.error) toast.error("Unauthorized Access");
    else {
      toast.success("Login Successful");
      router.push("/admin/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-[#f1f1f1] flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-[400px] bg-white rounded-xl shadow-xl p-8 border border-gray-200">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Art Heritage</h1>
          <p className="text-gray-500 text-sm mt-2 font-medium">Log in to manage your store</p>
        </div>
        
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Email</label>
            <input 
              type="email" 
              className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-black outline-none transition-all"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@heritage.com"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Password</label>
            <input 
              type="password" 
              className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-black outline-none transition-all"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>
          <button className="w-full bg-[#1a1a1a] text-white font-bold py-3 rounded-lg hover:bg-black transition-colors shadow-lg">
            Continue
          </button>
        </form>
      </div>
    </div>
  );
}