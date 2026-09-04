function StatCard({
  title,
  value,
  icon,
  color = "bg-cyan-100",
  iconColor = "text-cyan-600",
}) {

  return (

    <div className="bg-white rounded-3xl border border-slate-100 shadow-lg hover:shadow-xl transition-all p-6">

      <div className="flex items-center justify-between">

        <div>

          <p className="text-slate-500">

            {title}

          </p>

          <h2 className="text-4xl font-black mt-3">

            {value}

          </h2>

        </div>

        <div
          className={`w-16 h-16 rounded-2xl flex items-center justify-center ${color}`}
        >

          <div className={`${iconColor} text-2xl`}>

            {icon}

          </div>

        </div>

      </div>

    </div>

  );

}

export default StatCard;