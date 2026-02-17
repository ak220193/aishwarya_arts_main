import React from "react";
import { Check } from "lucide-react";

const AvailabilityFilter = ({ selected, onChange }) => {
  const options = [
    { label: "In Stock", value: "in-stock" },
    { label: "Out of Stock", value: "out-of-stock" },
  ];

  return (
    <div className="w-full">
      {/* Title with specialized font and subtle gold border */}
      <h3 className="text-sm font-bold uppercase tracking-widest text-gray-900 pb-2 border-b border-amber-100">
        Availability
      </h3>

      <div className="flex flex-col gap-1 mt-4">
        {options.map((opt) => {
          const active = selected === opt.value;

          return (
            <button
              key={opt.value}
              onClick={() => onChange(active ? null : opt.value)} // Toggle behavior
              className={`
                group flex items-center justify-between w-full py-2.5 px-2 rounded-xl
                text-sm transition-all duration-200
                ${active ? "bg-amber-50 text-amber-900 font-semibold" : "text-gray-600 hover:bg-gray-50"}
              `}
            >
              <span className="tracking-tight">{opt.label}</span>

              {/* Checkbox Design */}
              <div
                className={`w-5 h-5 rounded-lg flex items-center justify-center transition-all duration-300 border
                ${active 
                  ? "bg-amber-700 border-amber-700 scale-110 shadow-sm" 
                  : "bg-white border-gray-300 group-hover:border-amber-400"}`}
              >
                {active && <Check size={12} strokeWidth={3} className="text-white" />}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default AvailabilityFilter;