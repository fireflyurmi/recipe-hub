"use client";
import React from "react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, PieChart, Pie, Cell,
} from "recharts";

const STATIC_DATA = {
  stats: [
    { title: "Total Users", value: "1,245", color: "text-gray-900 dark:text-white" },
    { title: "Total Recipes", value: "2,346", color: "text-gray-900 dark:text-white" },
    { title: "Premium Members", value: "320", color: "text-gray-900 dark:text-white" },
    { title: "Total Reports", value: "15", color: "text-red-500" },
  ],
  lineData: [
    { name: "Jan", users: 100 }, { name: "Feb", users: 300 },
    { name: "Mar", users: 200 }, { name: "Apr", users: 500 },
  ],
  pieData: [
    { name: "Dinner", value: 40 }, { name: "Lunch", value: 25 }, { name: "Dessert", value: 15 },
  ],
  COLORS: ["#0088fe", "#ffbb28", "#ff8042"]
};

const StatsCard = ({ title, value, color }) => (
  <div className="bg-white dark:bg-[#161a29] p-6 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-0">
    <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">{title}</p>
    <h3 className={`text-3xl font-bold ${color}`}>{value}</h3>
  </div>
);

const AdminDashboardOverviewPage = () => {
  const data = STATIC_DATA;

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold dark:text-white">Admin Dashboard - Overview</h1>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {data.stats.map((stat, i) => <StatsCard key={i} {...stat} />)}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Area Chart */}
        <div className="bg-white dark:bg-[#161a29] p-6 rounded-2xl shadow-sm border-0">
          <h2 className="font-bold mb-6 dark:text-white">Users Overview</h2>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={data.lineData}>
              <defs>
                <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: "#9ca3af"}} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: "#9ca3af"}} />
              <Tooltip />
              <Area type="monotone" dataKey="users" stroke="#8b5cf6" fillOpacity={1} fill="url(#colorUsers)" strokeWidth={3} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Donut Chart */}
        <div className="bg-white dark:bg-[#161a29] p-6 rounded-2xl shadow-sm border-0">
          <h2 className="font-bold mb-6 dark:text-white">Recipes by Category</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie 
                data={data.pieData} 
                innerRadius={80} 
                outerRadius={100} 
                paddingAngle={8} 
                cornerRadius={10} 
                dataKey="value"
              >
                {data.pieData.map((entry, index) => (
                  <Cell key={index} fill={data.COLORS[index % data.COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardOverviewPage;