"use client";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import toast from "react-hot-toast";
import { Loader2, Lock, Mail, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.error) {
      toast.error("Access Denied: Invalid Credentials");
      setIsLoading(false);
    } else {
      toast.success("Welcome back, Akash");
      router.push("/admin/dashboard");
    }
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center p-4 overflow-hidden bg-[#0a0a0a]">
      {/* --- PREMIUM ANIMATED BACKGROUND --- */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Animated Gold Orb */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-[10%] -left-[10%] w-[60%] h-[60%] rounded-full bg-amber-900/30 blur-[120px]"
        />

        {/* Animated Deep Bronze Orb */}
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -40, 0],
            y: [0, -20, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[-15%] right-[-10%] w-[50%] h-[50%] rounded-full bg-orange-900/20 blur-[100px]"
        />

        {/* Center subtle glow */}
        <div className="absolute inset-0 bg-linear-to-tr from-black via-transparent to-black opacity-80" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-105 bg-white/3 backdrop-blur-2xl rounded-[2.5rem] shadow-[0_8px_32px_0_rgba(0,0,0,0.8)] border border-white/10 overflow-hidden"
      >
        {/* Subtle glass reflection effect */}
        <div className="absolute inset-0 bg-linear-to-br from-white/5 to-transparent pointer-events-none" />

        <div className="p-10 lg:p-14 relative z-10">
          {/* Logo & Branding */}
          <div className="flex flex-col items-center mb-12">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="w-20 h-20 relative mb-8 drop-shadow-2xl"
            >
              <Image
                src="/logo.png"
                alt="Aishwarya Arts"
                fill
                className="object-contain"
              />
            </motion.div>
            <h2 className="text-2xl font-light text-white tracking-[0.25em] uppercase text-center">
              Aishwarya <span className="font-bold text-amber-500">Arts</span>
            </h2>
            <div className="h-px w-12 bg-linear-to-r from-transparent via-amber-500/50 to-transparent mt-5"></div>
          </div>

          <form onSubmit={handleLogin} className="space-y-10">
            <div className="space-y-6">
              {/* Email Input */}
              <div className="relative group">
                <Mail
                  className="absolute left-0 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-amber-500 transition-colors"
                  size={18}
                />
                <input
                  type="email"
                  required
                  placeholder="Email"
                  className="w-full bg-transparent border-b border-white/10 py-4 pl-8 pr-4 text-sm text-white outline-none focus:border-amber-500 transition-all placeholder:text-white/20"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              {/* Password Input */}
              <div className="relative group">
                <Lock
                  className="absolute left-0 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-amber-500 transition-colors"
                  size={18}
                />
                <input
                  type="password"
                  required
                  placeholder="Password"
                  className="w-full bg-transparent border-b border-white/10 py-4 pl-8 pr-4 text-sm text-white outline-none focus:border-amber-500 transition-all placeholder:text-white/20"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full relative overflow-hidden bg-amber-600 text-white py-5 rounded-full font-bold text-[12px] uppercase tracking-[0.3em] flex items-center justify-center gap-3 transition-all duration-500 hover:bg-amber-500 hover:shadow-[0_0_30px_rgba(245,158,11,0.4)] disabled:bg-white/10 group"
            >
              {isLoading ? (
                <Loader2 className="animate-spin" size={18} />
              ) : (
                <>
                  Login
                  <ArrowRight
                    size={14}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Minimalist Bottom Bar */}
        <div className="pb-8 text-center">
          <p className="text-[10px] text-white/60 uppercase tracking-[0.5em] font-medium">
            Authorized Personnel Only
          </p>
        </div>
      </motion.div>
    </div>
  );
}
