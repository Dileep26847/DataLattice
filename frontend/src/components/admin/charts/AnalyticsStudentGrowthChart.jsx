import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

function AnalyticsStudentGrowthChart({
  data = [],
}) {

  const chartData = Array.isArray(data)
    ? data.map((item) => ({
        month:
          item.month_label ||
          item.month ||
          "",
        students:
          Number(item.students) || 0,
      }))
    : [];

  return (

    <div className="bg-white rounded-3xl shadow-xl p-8">

      {/* ==========================================
          HEADER
      ========================================== */}

      <div className="mb-8">

        <h2 className="text-2xl font-black text-slate-800">
          Student Growth
        </h2>

        <p className="text-slate-500 mt-2">
          Student registrations over time
        </p>

      </div>


      {/* ==========================================
          EMPTY STATE
      ========================================== */}

      {chartData.length === 0 ? (

        <div className="h-80 flex items-center justify-center">

          <div className="text-center">

            <div className="text-4xl mb-3">
              📊
            </div>

            <h3 className="font-bold text-slate-700">
              No student growth data
            </h3>

            <p className="text-sm text-slate-500 mt-1">
              Student registration data will appear here.
            </p>

          </div>

        </div>

      ) : (

        /* ==========================================
           CHART
        ========================================== */

        <div className="w-full h-80">

          <ResponsiveContainer
            width="100%"
            height="100%"
          >

            <LineChart
              data={chartData}
              margin={{
                top: 10,
                right: 20,
                left: 0,
                bottom: 10,
              }}
            >

              <CartesianGrid
                strokeDasharray="3 3"
              />

              <XAxis
                dataKey="month"
                tick={{
                  fontSize: 12,
                }}
                tickLine={false}
                axisLine={false}
              />

              <YAxis
                allowDecimals={false}
                tick={{
                  fontSize: 12,
                }}
                tickLine={false}
                axisLine={false}
              />

              <Tooltip
                formatter={(value) => [
                  value,
                  "Students",
                ]}
                labelFormatter={(label) =>
                  `Month: ${label}`
                }
              />

              <Line
                type="monotone"
                dataKey="students"
                strokeWidth={3}
                dot={{
                  r: 4,
                }}
                activeDot={{
                  r: 7,
                }}
              />

            </LineChart>

          </ResponsiveContainer>

        </div>

      )}

    </div>

  );

}

export default AnalyticsStudentGrowthChart;