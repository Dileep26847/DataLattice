function StatCard({

  title,

  value,

  icon,

  color = "bg-cyan-500",

}) {

  return (

    <div className="bg-white rounded-2xl shadow p-6 flex justify-between items-center">

      <div>

        <p className="text-gray-500">

          {title}

        </p>

        <h2 className="text-3xl font-bold mt-2">

          {value}

        </h2>

      </div>

      <div

        className={`${color} text-white p-4 rounded-2xl text-2xl`}

      >

        {icon}

      </div>

    </div>

  );

}

export default StatCard;