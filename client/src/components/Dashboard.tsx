import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { BarChart2, LineChart, PieChart, TrendingUp, Users, Activity } from "lucide-react";
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, 
  LineChart as ReLineChart, Line, 
  PieChart as RePieChart, Pie, Cell, Legend 
} from "recharts";

export function Dashboard() {
  const [insights, setInsights] = useState([]);
  const [visibleCount, setVisibleCount] = useState(5);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const storedUser = Cookies.get("user");
    if (storedUser) {
      setUserName(JSON.parse(storedUser).name);
    }

    fetchInsights();
  }, []);

  const fetchInsights = async () => {
    try {
      const response = await fetch("http://localhost:4444/api/users/insight", { method: "POST" });
      const data = await response.json();
      setInsights(data);
    } catch (error) {
      toast.error("Error fetching insights");
    }
  };

  const handleViewMore = () => {
    setVisibleCount((prev) => prev + 5);
  };

  const barChartData = [
    { month: "Jan", views: 40 },
    { month: "Feb", views: 55 },
    { month: "Mar", views: 72 },
    { month: "Apr", views: 90 },
    { month: "May", views: 110 },
  ];

  const lineChartData = [
    { day: "Mon", users: 20 },
    { day: "Tue", users: 35 },
    { day: "Wed", users: 50 },
    { day: "Thu", users: 65 },
    { day: "Fri", users: 80 },
    { day: "Sat", users: 95 },
    { day: "Sun", users: 120 },
  ];

  const pieChartData = [
    { name: "Fitness", value: 30 },
    { name: "Nutrition", value: 25 },
    { name: "Mental Health", value: 20 },
    { name: "Heart Care", value: 25 },
  ];
  const COLORS = ["#FF5733", "#33FF57", "#3357FF", "#FF33A1"];

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center sm:text-left">
        Welcome, <span className="text-blue-400">{userName || "Guest"} 👋</span>
      </h1>

      {/* 📊 Analytics Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* 📊 Bar Chart - Insights Growth */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <div className="flex items-center mb-4">
            <TrendingUp className="w-7 h-7 text-yellow-400 mr-3" />
            <h2 className="text-lg sm:text-xl font-semibold text-white">Insights Growth</h2>
          </div>
          <ResponsiveContainer width="100%" height={230}>
            <BarChart data={barChartData}>
              <XAxis dataKey="month" stroke="#ddd" />
              <YAxis stroke="#ddd" />
              <Tooltip />
              <Bar dataKey="views" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* 📈 Line Chart - User Engagement */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <div className="flex items-center mb-4">
            <Users className="w-7 h-7 text-green-400 mr-3" />
            <h2 className="text-lg sm:text-xl font-semibold text-white">User Engagement</h2>
          </div>
          <ResponsiveContainer width="100%" height={230}>
            <ReLineChart data={lineChartData}>
              <XAxis dataKey="day" stroke="#ddd" />
              <YAxis stroke="#ddd" />
              <Tooltip />
              <Line type="monotone" dataKey="users" stroke="#ff7f50" strokeWidth={3} />
            </ReLineChart>
          </ResponsiveContainer>
        </div>

        {/* 🔵 Pie Chart - Category Distribution */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <div className="flex items-center mb-4">
            <Activity className="w-7 h-7 text-purple-400 mr-3" />
            <h2 className="text-lg sm:text-xl font-semibold text-white">Category Distribution</h2>
          </div>
          <ResponsiveContainer width="100%" height={230}>
            <RePieChart>
              <Tooltip />
              <Legend />
              <Pie data={pieChartData} dataKey="value" nameKey="name" outerRadius={80}>
                {pieChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </RePieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 📌 Insights Section */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {insights.slice(0, visibleCount).map((insight) => (
          <div key={insight._id} className="bg-gray-800 rounded-lg p-6 shadow-lg">
            {/* <img src={insight.photo} alt={insight.title} className="w-full h-40 object-cover rounded-lg mb-4" /> */}
            <h2 className="text-lg sm:text-xl font-semibold text-white">{insight.title}</h2>
            <p className="text-gray-400 text-sm sm:text-base">{insight.description}</p>
            <span className="text-sm text-blue-400">{insight.category}</span>

            <div className="mt-4 text-gray-300">
              <p className="font-semibold">{insight.createdBy.name}</p>
              <p className="text-sm">{insight.createdBy.specialization.join(", ")}</p>
            </div>
          </div>
        ))}
      </div>

      {/* 🔽 View More Button */}
      {visibleCount < insights.length && (
        <div className="text-center">
          <button
            onClick={handleViewMore}
            className="mt-6 bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition shadow-md"
          >
            View More
          </button>
        </div>
      )}
    </div>
  );
}
