import React from "react";

// 1. Data Constants - Keep these outside the component to avoid re-renders
const GOD = [
  "Amman",
  "Annapoorni",
  "Annamalai",
  "Baba",
  "Balaji Lakshmi",
  "Balaji Thayaar",
  "Datchnamoorthy",
  "Durga Devi",
  "Ganesha",
  "Gayathri Devi",
  "Guruvayurappan",
  "Hanuman",
  "Kamadenu",
  "Krishna",
  "Lakshmi",
  "Lalitha Devi",
  "Lakshmi Narayana",
  "Meenakshi",
  "Murugan",
  "Pooja Set Painting",
  "Raja Raja Rajeshwari",
  "Ramar",
  "Renuga Devi",
  "Sathya Narayana",
  "Shiva Family",
  "Shanvanthri",
  "Vishwa Brahma",
  "GajaLakshmi",
  "Saraswathi",
  "Narashimar",
  "Kamatchi amman",
  "Ratha krishnan",
];

const ART_STYLES = [
  { label: "2D Work", value: "2d" },
  
  { label: "Flat Type", value: "flat" },
  { label: "3D Embossed", value: "3D embossed" },
];

const DIMENSIONS = ["15x12", "18x14", "20x16", "24x18", "30x24", "Custom Size"];

const FilterSidebar = ({ selectedFilters, onFilterChange }) => {
  return (
    <div className="space-y-10 sticky top-28 h-[calc(100vh-120px)] overflow-y-auto pr-4 scrollbar-hide">
      
      {/* 1. DEITY FILTER - Added max-height and custom scroll for better UX */}
      <FilterGroup title="GOD">
        <div className="flex flex-col gap-3.5 max-h-64 overflow-y-auto pr-2 custom-scrollbar text-black">
          {GOD.map((god) => (
            <FilterCheckbox key={god} label={god} checked={selectedFilters.godName.includes(god.toLowerCase())} onChange={() => onFilterChange("godName", god.toLowerCase())} />
          ))}
        </div>
      </FilterGroup>

      {/* 2. ART STYLE FILTER */}
      <FilterGroup title="Art Style / Type">
        {ART_STYLES.map((type) => (
          <FilterCheckbox key={type.value} label={type.label}  checked={selectedFilters.workStyle.includes(type.value)} onChange={() => onFilterChange("workStyle", type.value)}/>
        ))}
      </FilterGroup>

      {/* 3. DIMENSIONS FILTER */}
      <FilterGroup title="Dimensions (Inches)">
        {DIMENSIONS.map((size) => (
          <FilterCheckbox key={size} label={size} checked={selectedFilters.dimensions.includes(size.toLowerCase())}  onChange={() => onFilterChange("dimensions", size.toLowerCase())} />
        ))}
      </FilterGroup>
    </div>
  );
};

/* ================= REUSABLE SUB-COMPONENTS ================= */

// Clean Checkbox Component
const FilterCheckbox = ({ label, checked, onChange }) => (
  <label className="flex items-center gap-3 cursor-pointer group">
    <input
      type="checkbox"
      checked={checked}    
      onChange={onChange}
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