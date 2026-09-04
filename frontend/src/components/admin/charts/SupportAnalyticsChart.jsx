import { useEffect, useState } from "react";

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

import Card from "../../common/Card";
import { getDashboard } from "../../../services/adminService";

function SupportAnalyticsChart() {

  const [data, setData] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    loadAnalytics();

  }, []);

  const loadAnalytics = async () => {

    try {

      const res = await getDashboard();

      const chartData = (res.supportAnalytics || []).map((item) => ({

        name: item.status,

        value: Number(item.total),

      }));

      setData(chartData);

    } catch (err) {

      console.log(err);

    } finally {

      setLoading(false);

    }

  };

  const COLORS = {

    Open: "#ef4444",

    "In Progress": "#f59e0b",

    Resolved: "#10b981",

  };

  return (

    <Card
      title="Support Analytics"
      subtitle="Ticket status overview"
    >

      {

        loading ?

        (

          <div className="h-80 flex items-center justify-center">

            Loading...

          </div>

        )

        :

        data.length === 0 ?

        (

          <div className="h-80 flex items-center justify-center text-slate-500">

            No Support Data

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
                  innerRadius={70}
                  outerRadius={110}
                  paddingAngle={4}
                >

                  {

                    data.map((entry, index) => (

                      <Cell

                        key={index}

                        fill={COLORS[entry.name] || "#0891b2"}

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

export default SupportAnalyticsChart;