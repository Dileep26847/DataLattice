import { FaSearch } from "react-icons/fa";

function SearchBar({
  value,
  onChange,
}) {
  return (
    <div className="relative w-full">

      <FaSearch className="absolute left-5 top-5 text-gray-400" />

      <input
        type="text"
        placeholder="Search courses..."
        value={value}
        onChange={onChange}
        className="w-full pl-14 pr-5 py-4 rounded-2xl border bg-white shadow-md focus:ring-2 focus:ring-blue-600 outline-none"
      />

    </div>
  );
}

export default SearchBar;