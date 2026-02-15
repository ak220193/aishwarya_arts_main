"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import AccountSidebar from "../components/profile/AccountSidebar";


const WishlistPage = () => {




  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* SIDEBAR */}
          <AccountSidebar />
          {/* MAIN CONTENT */}
        </div>
      </div>
    </div>
  );
};

export default WishlistPage;
