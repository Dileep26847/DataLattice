function SupportFilter({ statusFilter, setStatusFilter }) {

  return (

    <select

      value={statusFilter}

      onChange={(e) => setStatusFilter(e.target.value)}

      className="
        px-5
        py-4
        rounded-2xl
        border
        border-slate-200
        outline-none
        bg-white
        focus:ring-2
        focus:ring-cyan-500
        transition-all
      "

    >

      <option value="All">
        All Tickets
      </option>

      <option value="Open">
        🔴 Open
      </option>

      <option value="In Progress">
        🟡 In Progress
      </option>

      <option value="Resolved">
        🟢 Resolved
      </option>

    </select>

  );

}

export default SupportFilter;