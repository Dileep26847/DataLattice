import { FaSearch } from "react-icons/fa";

function SearchBar({
  value,
  onChange,
  placeholder = "Search...",
}) {

  return (

    <div className="relative w-full">

      <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"/>

      <input
        type="text"
        value={value}
        onChange={(e)=>onChange(e.target.value)}
        placeholder={placeholder}
        className="
          w-full
          pl-14
          pr-5
          py-4
          rounded-2xl
          border
          border-slate-200
          outline-none
          focus:ring-2
          focus:ring-cyan-500
          transition
        "
      />

    </div>

  );

}

export default SearchBar;