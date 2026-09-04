import { FaSearch } from "react-icons/fa";

function SearchBar({

  value,

  onChange,

  placeholder = "Search...",

}) {

  return (

    <div className="relative w-full">

      <FaSearch
        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
      />

      <input

        type="text"

        value={value}

        onChange={onChange}

        placeholder={placeholder}

        className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition"

      />

    </div>

  );

}

export default SearchBar;