import { useEffect, useState } from "react";

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Tooltip,
  Cell,
  Legend,
} from "recharts";

import Card from "../../common/Card";
import { getDashboard } from "../../../services/adminService";

function CourseDistributionChart() {

  const [data, setData] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    loadChart();

  }, []);

  const loadChart = async () => {

    try {

      const res = await getDashboard();

      setData(res.courseDistribution || []);

    } catch (err) {

      console.log(err);

    } finally {

      setLoading(false);

    }

  };

  const COLORS = [
    "#0891b2",
    "#10b981",
    "#8b5cf6",
    "#f59e0b",
    "#ef4444",
    "#ec4899",
    "#6366f1",
    "#14b8a6",
  ];

  return (

    <Card
      title="Course Distribution"
      subtitle="Courses by category"
    >

      {

        loading ?

        (

          <div className="h-80 flex items-center justify-center">

            Loading Chart...

          </div>

        )

        :

        data.length === 0 ?

        (

          <div className="h-80 flex items-center justify-center text-slate-500">

            No Course Data Available

          </div>

        )

        :

        (

          <div className="h-80">

            <ResponsiveContainer width="100%" height="100%">

              <PieChart>

                <Pie
                  data={data}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={110}
                  innerRadius={55}
                  label
                >

                  {

                    data.map((entry, index) => (

                      <Cell
                        key={index}
                        fill={COLORS[index % COLORS.length]}
                      />

                    ))

                  }

                </Pie>

                <Tooltip />

                <Legend />

              </PieChart>

            </ResponsiveContainer>

          </div>

        )

      }

    </Card>

  );

}

export default CourseDistributionChart;