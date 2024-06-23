import { FaSuitcaseRolling, FaCalendarCheck, FaBug } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import AreaChartComponent from "./AreaChart";
import BarChartComponent from "./BarChart";

const DashStats = () => {
  const [stat, setStat] = useState({});
  const [chartData, setChartData] = useState([]);
  const [barChart, setBarChart] = useState(true);

  const fetchStats = async () => {
    const res = await fetch(`/api/job/getJobStats`);
    if (!res.ok) {
      return;
    }
    if (res.ok) {
      const data = await res.json();
      setStat(data.defaultStats);
      setChartData(data.monthlyApplications);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className="p-12 pt-7 w-full min-h-screen">
      <div className="grid grid-cols-1 gap-4  lg:grid-cols-3">
        <div className="flex flex-col p-8 pt-2 box-shadow-2 rounded-md border-b-4 border-b-yellow-800">
          <div className="flex justify-between items-center pt-6">
            <h1 className="text-yellow-800 text-4xl font-medium">
              {stat.pending}
            </h1>
            <div className="p-3 rounded-sm pending text-4xl">
              <FaSuitcaseRolling />
            </div>
          </div>
          <p className="pt-6">Pending Applications</p>
        </div>
        <div className="flex flex-col p-8 pt-2 box-shadow-2 rounded-md border-b-4 border-b-purple-900">
          <div className="flex justify-between items-center pt-6">
            <h1 className="text-purple-900 text-4xl font-medium">
              {stat.interview}
            </h1>
            <div className="p-3 rounded-sm interview text-4xl">
              <FaCalendarCheck />
            </div>
          </div>
          <p className="pt-6">Interviews Sheduled</p>
        </div>
        <div className="flex flex-col p-8 pt-2 box-shadow-2 rounded-md border-b-4 border-b-red-800">
          <div className="flex justify-between items-center pt-6">
            <h1 className="text-red-800 text-4xl font-medium">
              {stat.declined}
            </h1>
            <div className="p-3 rounded-sm declined text-4xl">
              <FaSuitcaseRolling />
            </div>
          </div>
          <p className="pt-6">Jobs Declined</p>
        </div>
      </div>
      <div className="mt-10">
        <div className="flex flex-col items-center">
          <h1 className="text-xl font-medium mb-5">Monthly Applications</h1>
          <button
            className="purple-button"
            type="button"
            onClick={() => setBarChart(!barChart)}
          >
            {barChart ? "Area Chart" : "Bar Chart"}
          </button>
          {barChart ? (
            <AreaChartComponent data={chartData} />
          ) : (
            <BarChartComponent data={chartData} />
          )}
        </div>
      </div>
    </div>
  );
};

export default DashStats;
