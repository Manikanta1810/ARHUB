/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { UserCircle, ChevronDown, LayoutDashboard, Users, MessageSquare } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

const MetricCard = ({ title, value, bgColor, textColor = 'text-white' }) => (
    <div className={`${bgColor} ${textColor} rounded-lg shadow-md p-6`}>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-3xl font-bold">{value}</p>
    </div>
  );
  
  const AdminDashboard = () => {
    const lineChartData = [
      { name: 'Jan', users: 4000 },
      { name: 'Feb', users: 3000 },
      { name: 'Mar', users: 5000 },
      { name: 'Apr', users: 4500 },
      { name: 'May', users: 6000 },
      { name: 'Jun', users: 5500 },
    ];
  
    const barChartData = [
      { name: 'Type A', resources: 400 },
      { name: 'Type B', resources: 300 },
      { name: 'Type C', resources: 500 },
      { name: 'Type D', resources: 200 },
    ];
  
    const pieChartData = [
      { name: '5 stars', value: 400 },
      { name: '4 stars', value: 300 },
      { name: '3 stars', value: 200 },
      { name: '2 stars', value: 100 },
      { name: '1 star', value: 50 },
    ];
  
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];
  
    return (
        <div className="p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
          <MetricCard title="Total Users" value="10,000" bgColor="bg-blue-500" />
          <MetricCard title="Today's Registration" value="50" bgColor="bg-green-500" />
          <MetricCard title="Total Resources" value="1,500" bgColor="bg-yellow-500" />
          <MetricCard title="Overall Rating" value="4.5" bgColor="bg-red-500" />
        </div>
  
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">Total Resources</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={barChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="resources" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">Rating Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieChartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
  
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">User Growth</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={lineChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="users" stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  };

  export default AdminDashboard;
  