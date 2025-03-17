import { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import useAdminGuard, { useAuth } from "@/context/AuthContext";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const COLORS = ["#FF6384", "#36A2EB", "#FFCE56", "#4CAF50", "#FF9F40"];

const AdminDashboard = () => {
  const { user } = useAuth();
  useAdminGuard();

  const [totalSales, setTotalSales] = useState(0);
  const [completedRevenue, setCompletedRevenue] = useState(0);
  const [topProducts, setTopProducts] = useState([]);
  const [orderTrends, setOrderTrends] = useState([]);
  const [orderStats, setOrderStats] = useState({
    totalOrders: 0,
    paidOrders: 0,
    unpaidOrders: 0,
    deliveredOrders: 0,
  });
  const [filter, setFilter] = useState("7d");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;

      setLoading(true);
      try {
        const headers = { Authorization: `Bearer ${user.token}` };

        const [
          salesRes,
          productsRes,
          trendsRes,
          statsRes,
          completedRevenueRes,
        ] = await Promise.all([
          axios.get(`${process.env.NEXT_PUBLIC_API_URL}/admin/analytics/total-sales`, { headers }),
          axios.get(`${process.env.NEXT_PUBLIC_API_URL}/admin/analytics/top-products`, { headers }),
          axios.get(`${process.env.NEXT_PUBLIC_API_URL}/admin/analytics/order-trends?range=${filter}`, { headers }),
          axios.get(`${process.env.NEXT_PUBLIC_API_URL}/admin/analytics/orders-stats`, { headers }),
          axios.get(`${process.env.NEXT_PUBLIC_API_URL}/admin/analytics/completed-revenue`, { headers }),
        ]);

        setTotalSales(salesRes.data.totalSales);
        setTopProducts(productsRes.data);
        setOrderTrends(trendsRes.data);
        setOrderStats(statsRes.data);
        setCompletedRevenue(completedRevenueRes.data.totalRevenue || 0);
      } catch (error) {
        console.error("Failed to fetch dashboard data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user, filter]);

  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold text-pink-600 mb-8">Admin Dashboard</h1>

      {/* Filter */}
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

      {loading ? (
        <p className="text-center text-gray-500 mt-6">Loading dashboard data...</p>
      ) : (
        <>
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-10">
            <DashboardCard title="Total Sales" value={`$${totalSales.toFixed(2)}`} color="text-pink-600" />
            <DashboardCard title="Completed Revenue" value={`$${completedRevenue.toFixed(2)}`} color="text-green-600" />
            <DashboardCard title="Total Orders" value={orderStats.totalOrders} />
            <DashboardCard title="Delivered Orders" value={orderStats.deliveredOrders} color="text-green-600" />
            <DashboardCard title="Unpaid Orders" value={orderStats.unpaidOrders} color="text-red-600" />
          </div>

          {/* Sales Trends Chart */}
          <div className="bg-white p-6 rounded shadow mb-10">
            <h2 className="text-lg font-semibold mb-4 text-gray-700">Sales Trends</h2>
            {orderTrends.length === 0 ? (
              <p className="text-center text-gray-400">No trend data available.</p>
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={orderTrends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey={filter === "365d" ? "_id.month" : "_id.day"}
                    tickFormatter={(tick) => {
                      if (filter === "365d") {
                        const months = [
                          "Jan", "Feb", "Mar", "Apr", "May", "Jun",
                          "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
                        ];
                        return months[tick - 1];
                      }
                      return tick;
                    }}
                  />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="totalSales"
                    stroke="#FF6384"
                    name="Sales ($)"
                  />
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>

          {/* Orders Trends Chart */}
          <div className="bg-white p-6 rounded shadow mb-10">
            <h2 className="text-lg font-semibold mb-4 text-gray-700">Orders Trends</h2>
            {orderTrends.length === 0 ? (
              <p className="text-center text-gray-400">No order trend data available.</p>
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={orderTrends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey={filter === "365d" ? "_id.month" : "_id.day"}
                    tickFormatter={(tick) => {
                      if (filter === "365d") {
                        const months = [
                          "Jan", "Feb", "Mar", "Apr", "May", "Jun",
                          "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
                        ];
                        return months[tick - 1];
                      }
                      return tick;
                    }}
                  />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="totalOrders"
                    stroke="#36A2EB"
                    name="Total Orders"
                  />
                  <Line
                    type="monotone"
                    dataKey="deliveredOrders"
                    stroke="#4CAF50"
                    name="Delivered Orders"
                  />
                  <Line
                    type="monotone"
                    dataKey="unpaidOrders"
                    stroke="#FF9F40"
                    name="Unpaid Orders"
                  />
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>

          {/* Best-Selling Products */}
          <div className="bg-white p-6 rounded shadow mb-10">
            <h2 className="text-lg font-semibold mb-4 text-gray-700">Best-Selling Products</h2>
            {topProducts.length === 0 ? (
              <p className="text-center text-gray-400">No top product data available.</p>
            ) : (
              <ResponsiveContainer width="100%" height={400}>
                <PieChart>
                  <Pie
                    data={topProducts}
                    dataKey="totalSold"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={150}
                    label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                  >
                    {topProducts.map((_entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: number) => `${value} sold`} />
                  <Legend verticalAlign="bottom" height={36} />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>
        </>
      )}
    </AdminLayout>
  );
};

// ✅ Reusable Dashboard Card Component
const DashboardCard = ({ title, value, color = "text-black" }: { title: string; value: number | string; color?: string }) => (
  <div className="bg-white p-6 rounded shadow text-center">
    <h2 className="text-gray-500 text-sm mb-2">{title}</h2>
    <p className={`text-3xl font-bold ${color}`}>{value}</p>
  </div>
);

export default AdminDashboard;
