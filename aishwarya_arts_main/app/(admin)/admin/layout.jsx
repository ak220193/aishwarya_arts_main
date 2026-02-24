"use client";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import Sidebar from "../../components/admin/Sidebar";
import Navbar from "../../components/admin/Navbar";

export default function AdminLayout({ children }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();

  const isLoginPage = pathname === "/admin";

  // Debugging logs
  console.log("Layout Render - isMobileOpen:", isMobileOpen);

  const handleToggleMobileMenu = () => {
    console.log("Hamburger Clicked! Setting isMobileOpen to true");
    setIsMobileOpen(true);
  };

  if (isLoginPage) {
    return (
      <div className="min-h-screen bg-[#0a0a0a]">
        {children}
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-[#f8f9fa]">
      <Sidebar 
        isCollapsed={isCollapsed} 
        setIsCollapsed={setIsCollapsed} 
        isMobileOpen={isMobileOpen}     
        setIsMobileOpen={setIsMobileOpen} 
      />
      
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Navbar onMenuClick={handleToggleMobileMenu} />

        <main className="flex-1 overflow-y-auto p-6 lg:p-10">
          <div className="">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}