import { useEffect, useState } from "react";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

import Card from "../../common/Card";
import { getDashboard } from "../../../services/adminService";

function StudentGrowthChart() {

  const [data, setData] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    loadChart();

  }, []);

  const loadChart = async () => {

    try {

      const res = await getDashboard();

      setData(res.studentGrowth || []);

    } catch (err) {

      console.log(err);

    } finally {

      setLoading(false);

    }

  };

  return (

    <Card
      title="Student Growth"
      subtitle="Monthly student registrations"
    >

      {

        loading ?

        (

          <div className="h-80 flex items-center justify-center">

            Loading Chart...

          </div>

        )

        :

        (

          <div className="h-80">

            <ResponsiveContainer width="100%" height="100%">

              <LineChart data={data}>

                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="month" />

                <YAxis />

                <Tooltip />

                <Line
                  type="monotone"
                  dataKey="students"
                  stroke="#0891b2"
                  strokeWidth={4}
                  dot={{ r: 5 }}
                />

              </LineChart>

            </ResponsiveContainer>

          </div>

        )

      }

    </Card>

  );

}

export default StudentGrowthChart;