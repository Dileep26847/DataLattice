function StatusBadge({ status }) {

  const getClasses = () => {

    switch (status) {

      case "Resolved":
        return "bg-emerald-100 text-emerald-700";

      case "In Progress":
        return "bg-amber-100 text-amber-700";

      default:
        return "bg-rose-100 text-rose-700";

    }

  };

  const getIcon = () => {

    switch (status) {

      case "Resolved":
        return "🟢";

      case "In Progress":
        return "🟡";

      default:
        return "🔴";

    }

  };

  return (

    <span
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold ${getClasses()}`}
    >

      <span>

        {getIcon()}

      </span>

      {status}

    </span>

  );

}

export default StatusBadge;