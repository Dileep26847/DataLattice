import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";


// ==========================================
// COURSE DISTRIBUTION CHART
// ==========================================

function AnalyticsCourseDistributionChart({
  data = [],
}) {

  const chartData = Array.isArray(data)
    ? data.map((item) => ({
        name: item.name || "Uncategorized",
        value: Number(item.value) || 0,
      }))
    : [];


  return (

    <div className="bg-white rounded-3xl shadow-xl p-8">

      {/* ==========================================
          HEADER
      ========================================== */}

      <div className="mb-8">

        <h2 className="text-2xl font-black text-slate-800">
          Course Distribution
        </h2>

        <p className="text-slate-500 mt-2">
          Courses grouped by category.
        </p>

      </div>


      {/* ==========================================
          EMPTY STATE
      ========================================== */}

      {chartData.length === 0 ? (

        <div className="h-80 flex items-center justify-center">

          <div className="text-center">

            <div className="text-4xl mb-3">
              📚
            </div>

            <h3 className="font-bold text-slate-700">
              No course data
            </h3>

            <p className="text-sm text-slate-500 mt-1">
              Course categories will appear here.
            </p>

          </div>

        </div>

      ) : (

        /* ==========================================
           PIE CHART
        ========================================== */

        <div className="w-full h-80">

          <ResponsiveContainer
            width="100%"
            height="100%"
          >

            <PieChart>

              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="45%"
                outerRadius={105}
                innerRadius={55}
                paddingAngle={3}
                label
              >

                {chartData.map(
                  (entry, index) => (

                    <Cell
                      key={`course-${index}`}
                    />

                  )
                )}

              </Pie>


              <Tooltip
                formatter={(value, name) => [
                  value,
                  name,
                ]}
              />


              <Legend
                verticalAlign="bottom"
                height={36}
              />

            </PieChart>

          </ResponsiveContainer>

        </div>

      )}

    </div>

  );

}


export default AnalyticsCourseDistributionChart;