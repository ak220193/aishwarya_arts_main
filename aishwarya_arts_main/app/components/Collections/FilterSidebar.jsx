import React from "react";

// 1. Data Constants - Keep these outside the component to avoid re-renders
const GOD = [
  "Amman", "Annapoorni", "Annamalai", "Baba", "Balaji Lakshmi", "Balaji Thayaar",
  "Datchnamoorthy", "Durga Devi", "Ganesha", "Gayathri Devi", "Guruvayurappan",
  "Hanuman", "Kamadenu", "Krishna", "Lakshmi", "Lalitha Devi", "Lakshmi Narayana",
  "Meenakshi", "Murugan", "Pooja Set Painting", "Raja Raja Rajeshwari", "Ramar",
  "Renuga Devi", "Sathya Narayana", "Shiva Family", "Shanvanthri", "Vishwa Brahma"
];

const ART_STYLES = [
  { label: "2D Work", value: "2d" },
  { label: "3D Work", value: "3d" },
  { label: "Flat Type", value: "flat" },
  { label: "Embossed", value: "embossed" },
];

const DIMENSIONS = ["15x12", "18x14", "20x16", "24x18", "30x24", "Custom Size"];

const FilterSidebar = () => {
  return (
    <div className="space-y-10 sticky top-28 h-[calc(100vh-120px)] overflow-y-auto pr-4 scrollbar-hide">
      
      {/* 1. DEITY FILTER - Added max-height and custom scroll for better UX */}
      <FilterGroup title="GOD">
        <div className="flex flex-col gap-3.5 max-h-64 overflow-y-auto pr-2 custom-scrollbar text-black">
          {GOD.map((god) => (
            <FilterCheckbox key={god} label={god} />
          ))}
        </div>
      </FilterGroup>

      {/* 2. ART STYLE FILTER */}
      <FilterGroup title="Art Style / Type">
        {ART_STYLES.map((type) => (
          <FilterCheckbox key={type.value} label={type.label} />
        ))}
      </FilterGroup>

      {/* 3. DIMENSIONS FILTER */}
      <FilterGroup title="Dimensions (Inches)">
        {DIMENSIONS.map((size) => (
          <FilterCheckbox key={size} label={size} />
        ))}
      </FilterGroup>

      {/* 4. PRICE RANGE FILTER */}
      <FilterGroup title="Price Range">
        <div className="space-y-4 px-1">
          <input
            type="range"
            min="1000"
            max="100000"
            className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-amber-700"
          />
          <div className="flex justify-between text-[10px] font-bold text-gray-400 uppercase tracking-tighter">
            <span>₹1,000</span>
            <span>₹1,00,000+</span>
          </div>
        </div>
      </FilterGroup>
    </div>
  );
};

/* ================= REUSABLE SUB-COMPONENTS ================= */

// Clean Checkbox Component
const FilterCheckbox = ({ label }) => (
  <label className="flex items-center gap-3 cursor-pointer group">
    <input
      type="checkbox"
      className="w-4 h-4 rounded border-gray-300 text-amber-700 focus:ring-amber-500 accent-amber-700 cursor-pointer transition-all"
    />
    <span className="text-sm text-black group-hover:text-amber-800 transition-colors">
      {label}
    </span>
  </label>
);

// Group Wrapper
const FilterGroup = ({ title, children }) => (
  <div className="border-b border-gray-100 pb-8">
    <h2 className="text-md uppercase tracking-[0.15em] font-bold text-black mb-5">
      {title}
    </h2>
    <div className="flex flex-col gap-3.5">{children}</div>
  </div>
);

export default FilterSidebar;