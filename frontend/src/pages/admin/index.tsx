import { useEffect, useState, useCallback } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import useAdminGuard, { useAuth } from "@/context/AuthContext";
import axios from "axios";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';

const COLORS = ["#FF6384", "#36A2EB", "#FFCE56", "#4CAF50", "#FF9F40"];

const AdminDashboard = () => {
  const { user } = useAuth();
  useAdminGuard();

  const [totalSales, setTotalSales] = useState(0);
  const [topProducts, setTopProducts] = useState([]);
  const [orderTrends, setOrderTrends] = useState([]);
  const [filter, setFilter] = useState("7d");
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async () => {
    if (!user) return;

    setLoading(true);
    try {
      const headers = { Authorization: `Bearer ${user.token}` };

      const [salesRes, productsRes, trendsRes] = await Promise.all([
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/admin/analytics/total-sales`, { headers }),
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/admin/analytics/top-products`, { headers }),
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/admin/analytics/order-trends?range=${filter}`, { headers }),
      ]);

      setTotalSales(salesRes.data.totalSales);
      console.log(productsRes.data)
      setTopProducts(productsRes.data);
      setOrderTrends(trendsRes.data);
    } catch (error) {
      console.error("Failed to fetch dashboard data", error);
    } finally {
      setLoading(false);
    }
  }, [user, filter]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold text-pink-600 mb-8">Admin Dashboard</h1>

      {/* Filter Range */}
      <div className="flex justify-end mb-6">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border border-gray-300 px-3 py-2 rounded shadow"
        >
          <option value="7d">Last 7 Days</option>
          <option value="30d">Last 30 Days</option>
          <option value="365d">Last Year</option>
        </select>
      </div>

      {/* Total Sales */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-6 rounded shadow text-center">
          <h2 className="text-gray-500 text-sm mb-2">Total Sales</h2>
          <p className="text-3xl font-bold text-pink-600">${totalSales.toFixed(2)}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Order Trends (Line Chart) */}
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">Order Trends</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={orderTrends}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="_id.day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="totalSales" stroke="#FF6384" name="Sales" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Top Products (Pie Chart) */}
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">Best-Selling Products</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={topProducts}
                dataKey="totalSold"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {topProducts.map((_entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {loading && <p className="text-center text-gray-500 mt-6">Loading dashboard data...</p>}
    </AdminLayout>
  );
};

export default AdminDashboard;
