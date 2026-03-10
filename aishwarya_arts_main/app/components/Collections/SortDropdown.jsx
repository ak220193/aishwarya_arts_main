
 const SortDropdown = ({ currentSort, onSortChange }) => (
  <div className="flex items-center gap-3">
      <span className="text-xs font-bold text-black uppercase tracking-widest">
        Sort By:
      </span>
      <select 
        value={currentSort} // Binds the UI to the 'sortBy' state
        onChange={(e) => onSortChange(e.target.value)} // Notifies CollectionsPage of the change
        className="text-sm font-semibold bg-transparent border-none focus:ring-0 cursor-pointer text-gray-900 outline-none"
      >
        <option value="newest">Newest Arrivals</option>
        <option value="price-low">Price: Low to High</option>
        <option value="price-high">Price: High to Low</option>
        <option value="name-az">Name (A-Z)</option>
        <option value="name-za">Name (Z-A)</option>
      </select>
    </div>
);

export default SortDropdown;

