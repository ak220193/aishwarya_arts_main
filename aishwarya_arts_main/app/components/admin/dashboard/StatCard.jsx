"use client";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { motion } from "framer-motion";

const StatCard = ({ label, value, change, Icon, trend }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="bg-white p-6 rounded-3xl border border-zinc-100 shadow-sm"
  >
    <div className="flex items-center justify-between mb-4">
      <div className="p-3 bg-amber-50 text-amber-600 rounded-2xl">
        <Icon size={20} />
      </div>
      <span className={`text-[15px] font-black px-2 py-1 rounded-full flex items-center gap-1 ${
        trend === "up" ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"
      }`}>
        {trend === "up" ? <ArrowUpRight size={12}/> : <ArrowDownRight size={12}/>}
        {change}
      </span>
    </div>
    <p className="text-zinc-900 text-[10px] font-semibold uppercase tracking-widest">{label}</p>
    <h3 className="text-2xl font-medium text-zinc-900 mt-1">{value}</h3>
  </motion.div>
);

export default StatCard;