
 const SortDropdown = () => (
  <div className="flex items-center gap-3">
    <span className="text-xs font-bold text-black uppercase tracking-widest">Sort By:</span>
    <select className="text-sm font-semibold bg-transparent border-none focus:ring-0 cursor-pointer text-gray-900">
      <option>Featured</option>
      <option>Newest Arrivals</option>
      <option>Price: Low to High</option>
      <option>Price: High to Low</option>
      <option>Name (A-Z)</option>
      <option> Name (Z-A)</option>
    </select>
  </div>
);

export default SortDropdown;

