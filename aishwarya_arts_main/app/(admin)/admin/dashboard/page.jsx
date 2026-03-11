"use client";
import WelcomeBanner from "../../../components/admin/dashboard/WelcomeBanner";
import StatCard from "../../../components/admin/dashboard/StatCard";
import SalesChart from "../../../components/admin/dashboard/SalesChart";
import RecentPatrons from "../../../components/admin/dashboard/RecentPatrons";
import { DollarSign, Package, Users, Palette } from "lucide-react";
import ClientTable from "../../../components/admin/dashboard/ClientTable";
import InventoryAlerts from "../../../components/admin/dashboard/InventoryAlerts";
import BannerStatus from "../../../components/admin/dashboard/BannerStatus";
import LogisticsPulse from "../../../components/admin/dashboard/LogisticsPulse";

export default function DashboardPage() {
  const patronData = [
    { name: "TT Artgallery", city: "Chennai", amount: "₹45,000" },
    { name: "Mangala Arts", city: "Coimbatore", amount: "₹12,500" },
    { name: "Sandiv Art Gallery", city: "Chennai", amount: "₹85,000" },
  ];

  return (
    <div className="space-y-8">
      <WelcomeBanner userName="Aishwarya Arts" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          label="Total Revenue"
          value="₹4.2L"
          change="+12%"
          Icon={DollarSign}
          trend="up"
        />
        <StatCard
          label="Active Orders"
          value="24"
          change="+4"
          Icon={Package}
          trend="up"
        />
        <StatCard
          label="New Patrons"
          value="12"
          change="-2"
          Icon={Users}
          trend="down"
        />
        <StatCard
          label="Artworks Sold"
          value="156"
          change="+18%"
          Icon={Palette}
          trend="up"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <SalesChart />
        </div>
        <div>
          <RecentPatrons patrons={patronData} />
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <InventoryAlerts />
        <LogisticsPulse/>
      </div>
      <div>
        <ClientTable />
      </div>
    </div>
  );
}
