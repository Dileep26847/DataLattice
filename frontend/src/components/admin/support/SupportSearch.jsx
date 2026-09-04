import { FaSearch } from "react-icons/fa";

function SupportSearch({ search, setSearch }) {

  return (

    <div className="relative mb-8">

      <FaSearch
        className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"
      />

      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search by student, email, title, category or status..."
        className="
          w-full
          pl-14
          pr-5
          py-4
          rounded-2xl
          border
          border-slate-200
          bg-white
          outline-none
          text-slate-700
          placeholder:text-slate-400
          focus:ring-2
          focus:ring-cyan-500
          focus:border-cyan-500
          transition-all
          duration-300
        "
      />

    </div>

  );

}

export default SupportSearch;