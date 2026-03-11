"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const Modal = ({ isOpen, onClose, title, children, type = "default" }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-900/60 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className={`bg-white rounded-[2.5rem] shadow-2xl w-full max-w-md overflow-hidden border border-zinc-100 ${
            type === "danger" ? "border-t-4 border-t-red-500" : "border-t-4 border-t-amber-500"
          }`}
        >
          {/* Header */}
          <div className="px-8 py-6 flex items-center justify-between border-b border-zinc-50">
            <h3 className="text-xl font-semibold text-zinc-900 tracking-tight">{title}</h3>
            <button onClick={onClose} className="p-2 hover:bg-zinc-100 rounded-full transition-colors">
              <X size={20} className="text-zinc-500" />
            </button>
          </div>

          {/* Content */}
          <div className="p-8">
            {children}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default Modal;