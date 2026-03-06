"use client";
import React, { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Sidebar from "../../components/admin/Sidebar";
import Navbar from "../../components/admin/Navbar";
import { Loader2 } from "lucide-react";

export default function AdminLayout({ children }) {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const router = useRouter();
  
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Set mounted to true once the client-side code loads
  useEffect(() => { 
    setMounted(true); 
  }, []);

  // 1. AUTH PROTECTION LOGIC
  useEffect(() => {
    if (status === "loading" || !mounted) return;

    const isAdmin = session?.user?.role === "admin";

    // If not admin and trying to access dashboard, force to login
    if (!isAdmin && pathname !== "/admin") {
      router.replace("/admin");
    } 
    // If already admin and on login page, skip to dashboard
    else if (isAdmin && pathname === "/admin") {
      router.replace("/admin/dashboard");
    }
  }, [session, status, pathname, router, mounted]);

  // Prevent Hydration Mismatch
  if (!mounted) return null;

  const isLoginPage = pathname === "/admin";

  // 2. RENDER LOGIN PAGE (No Sidebar, No Navbar, No Layout wrapping)
  if (isLoginPage) {
    return (
      <div className="min-h-screen bg-[#0a0a0a]">
        {children}
      </div>
    );
  }

  // 3. LOADING STATE (Shows while checking Akash's credentials)
  if (status === "loading") {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-[#0a0a0a]">
        <Loader2 className="animate-spin text-amber-500" size={40} />
      </div>
    );
  }

  // 4. SECURE DASHBOARD RENDER
  return (
    <div className="flex h-screen overflow-hidden bg-[#f8f9fa]">
      <Sidebar 
        isCollapsed={isCollapsed} 
        setIsCollapsed={setIsCollapsed} 
        isMobileOpen={isMobileOpen}     
        setIsMobileOpen={setIsMobileOpen} 
      />
      
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Navbar toggle handles the Mobile Sidebar Signal */}
        <Navbar onMenuClick={() => setIsMobileOpen(true)} />

        <main className="flex-1 overflow-y-auto p-6 lg:p-10">
          <div className="animate-in fade-in duration-700">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}