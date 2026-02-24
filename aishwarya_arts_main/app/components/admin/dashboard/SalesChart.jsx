"use client";
import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "Jan", revenue: 45000 },
  { month: "Feb", revenue: 52000 },
  { month: "Mar", revenue: 48000 },
  { month: "Apr", revenue: 70000 },
  { month: "May", revenue: 61000 },
  { month: "Jun", revenue: 85000 },
  { month: "Jul", revenue: 78000 },
];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 border border-amber-100 shadow-xl rounded-2xl">
        <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1">
          Monthly Revenue
        </p>
        <p className="text-lg font-black text-zinc-900">
          ₹{payload[0].value.toLocaleString()}
        </p>
      </div>
    );
  }
  return null;
};

const SalesChart = () => {
  return (
    <div className="bg-white rounded-[2.5rem] p-8 border border-zinc-100 shadow-sm h-full flex flex-col">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-lg font-bold text-zinc-900 leading-none tracking-tight">
            Revenue Analytics
          </h2>
          <p className="text-[10px] text-zinc-800 font-bold uppercase tracking-[0.2em] mt-2">
            7-Month Performance Trend
          </p>
        </div>
        <div className="flex items-center gap-2">
           <span className="w-3 h-3 bg-amber-500 rounded-full shadow-[0_0_10px_rgba(245,158,11,0.4)]" />
           <span className="text-[10px] font-bold text-zinc-500 uppercase">Revenue</span>
        </div>
      </div>

      <div className="flex-1 w-full min-h-[300px] -ml-6 mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid 
                strokeDasharray="3 3" 
                vertical={false} 
                stroke="#f1f1f1" 
            />
            <XAxis 
              dataKey="month" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#a1a1aa', fontSize: 10, fontWeight: 600 }}
              dy={15}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#a1a1aa', fontSize: 10, fontWeight: 600 }}
              tickFormatter={(value) => `₹${value / 1000}k`}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#f59e0b', strokeWidth: 1, strokeDasharray: '4 4' }} />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#f59e0b"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorRevenue)"
              animationDuration={2000}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SalesChart;