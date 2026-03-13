"use client";
import WelcomeBanner from "../../../components/admin/dashboard/WelcomeBanner";
import StatCard from "../../../components/admin/dashboard/StatCard";
import SalesChart from "../../../components/admin/dashboard/SalesChart";
import RecentPatrons from "../../../components/admin/dashboard/RecentPatrons";
import { DollarSign, Package, Users, Palette, Loader2 } from "lucide-react";
import ClientTable from "../../../components/admin/dashboard/ClientTable";
import InventoryAlerts from "../../../components/admin/dashboard/InventoryAlerts";
import BannerStatus from "../../../components/admin/dashboard/BannerStatus";
import LogisticsPulse from "../../../components/admin/dashboard/LogisticsPulse";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch("/api/admin/dashboard");
        const json = await res.json();
        if (json.success) setData(json);
      } catch (err) {
        console.error("Dashboard error:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  if (loading) return (
    <div className="h-96 flex items-center justify-center">
      <Loader2 className="animate-spin text-zinc-900" size={32} />
    </div>
  );
  return (
    <div className="space-y-8">
      <WelcomeBanner userName="Aishwarya Arts" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          label="Total Revenue"
          value={`₹${(data.stats.totalRevenue / 100000).toFixed(1)}L`}
          change="+12%"
          Icon={DollarSign}
          trend="up"
        />
        <StatCard
          label="Active Orders"
          value={data.stats.activeOrders}
          change="+4"
          Icon={Package}
          trend="up"
        />
        <StatCard
          label="New Patrons"
          value={data.stats.totalPatrons}
          change="-2"
          Icon={Users}
          trend="down"
        />
        <StatCard
          label="Artworks Sold"
          value={data.stats.artworkSold}
          change="+18%"
          Icon={Palette}
          trend="up"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <SalesChart  chartData={data.chartData}/>
        </div>
        <div>
          <RecentPatrons patrons={data.recentOrders || []} />
        </div>
      </div>
      <div>
        <ClientTable />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <InventoryAlerts items={data.lowStock} />
        <LogisticsPulse/>
      </div>
      
    </div>
  );
}
