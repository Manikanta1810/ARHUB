import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { firestore } from '../../firebase'; // Adjust the import path as necessary
import { collection, query, getDocs, orderBy, limit, where } from 'firebase/firestore';

const MetricCard = ({ title, value, bgColor, textColor = 'text-white' }) => (
  <div className={`${bgColor} ${textColor} rounded-lg shadow-md p-6`}>
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    <p className="text-3xl font-bold">{value}</p>
  </div>
);

const AdminDashboard = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [todayRegistrations, setTodayRegistrations] = useState(0);
  const [totalResources, setTotalResources] = useState(0);
  const [overallRating, setOverallRating] = useState(0);
  const [resourceTypes, setResourceTypes] = useState([]);
  const [ratingDistribution, setRatingDistribution] = useState([]);
  const [userGrowth, setUserGrowth] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch total users (including Google users)
        const usersQuery = query(collection(firestore, 'users'));
        const googleUsersQuery = query(collection(firestore, 'google_users'));
        const [usersSnapshot, googleUsersSnapshot] = await Promise.all([
          getDocs(usersQuery),
          getDocs(googleUsersQuery)
        ]);
        setTotalUsers(usersSnapshot.size + googleUsersSnapshot.size);

        // Fetch today's registrations (including Google users)
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const todayUsersQuery = query(collection(firestore, 'users'), where('createdAt', '>=', today));
        const todayGoogleUsersQuery = query(collection(firestore, 'google_users'), where('createdAt', '>=', today));
        const [todayUsersSnapshot, todayGoogleUsersSnapshot] = await Promise.all([
          getDocs(todayUsersQuery),
          getDocs(todayGoogleUsersQuery)
        ]);
        setTodayRegistrations(todayUsersSnapshot.size + todayGoogleUsersSnapshot.size);

        // Fetch total resources
        const resourcesQuery = query(collection(firestore, 'user_resources'));
        const resourcesSnapshot = await getDocs(resourcesQuery);
        setTotalResources(resourcesSnapshot.size);

        // Fetch overall rating
        const feedbackQuery = query(collection(firestore, 'feedback_data'));
        const feedbackSnapshot = await getDocs(feedbackQuery);
        let totalRating = 0;
        feedbackSnapshot.forEach(doc => {
          totalRating += doc.data().rating;
        });
        setOverallRating((totalRating / (feedbackSnapshot.size || 1)).toFixed(1));

        // Fetch resource types
        const resourceTypesMap = {};
        resourcesSnapshot.forEach(doc => {
          const category = doc.data().category;
          resourceTypesMap[category] = (resourceTypesMap[category] || 0) + 1;
        });
        setResourceTypes(Object.entries(resourceTypesMap).map(([name, value]) => ({ name, value })));

        // Fetch rating distribution
        const ratingDistributionMap = { '1': 0, '2': 0, '3': 0, '4': 0, '5': 0 };
        feedbackSnapshot.forEach(doc => {
          const rating = doc.data().rating.toString();
          ratingDistributionMap[rating]++;
        });
        setRatingDistribution(Object.entries(ratingDistributionMap).map(([name, value]) => ({ name, value })));

        // Fetch user growth (last 6 months, including Google users)
        const sixMonthsAgo = new Date();
        sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
        const userGrowthQuery = query(
          collection(firestore, 'users'),
          where('createdAt', '>=', sixMonthsAgo),
          orderBy('createdAt', 'asc')
        );
        const googleUserGrowthQuery = query(
          collection(firestore, 'google_users'),
          where('createdAt', '>=', sixMonthsAgo),
          orderBy('createdAt', 'asc')
        );
        const [userGrowthSnapshot, googleUserGrowthSnapshot] = await Promise.all([
          getDocs(userGrowthQuery),
          getDocs(googleUserGrowthQuery)
        ]);
        const growthData = {};
        [...userGrowthSnapshot.docs, ...googleUserGrowthSnapshot.docs].forEach(doc => {
          const date = doc.data().createdAt.toDate();
          const monthYear = `${date.getMonth() + 1}/${date.getFullYear()}`;
          growthData[monthYear] = (growthData[monthYear] || 0) + 1;
        });
        setUserGrowth(Object.entries(growthData).map(([name, users]) => ({ name, users })));

        setLoading(false);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        setError("Failed to load dashboard data. Please try again later.");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  if (loading) {
    return <div className="text-center py-10">Loading dashboard data...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">{error}</div>;
  }

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
        <MetricCard title="Total Users" value={totalUsers} bgColor="bg-blue-500" />
        {/* <MetricCard title="Today's Registration" value={todayRegistrations} bgColor="bg-green-500" /> */}
        <MetricCard title="Total Resources" value={totalResources} bgColor="bg-yellow-500" />
        <MetricCard title="Overall Rating" value={overallRating} bgColor="bg-red-500" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Resource Types</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={resourceTypes}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Rating Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={ratingDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {ratingDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
};

export default AdminDashboard;