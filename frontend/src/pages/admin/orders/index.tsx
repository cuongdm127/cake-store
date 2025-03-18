import { useEffect, useState, useCallback } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import useAdminGuard, { useAuth } from "@/context/AuthContext";
import axios from "axios";
import Link from "next/link";

const AdminOrdersPage = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [paymentStatusFilter, setPaymentStatusFilter] = useState("");
  const [shipmentStatusFilter, setShipmentStatusFilter] = useState("");

  const [dateRange, setDateRange] = useState("7d"); // 7d, 30d, all
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10;

  useAdminGuard();

  const fetchOrders = useCallback(async () => {
    if (!user) return;

    setLoading(true);
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/orders`,
        {
          params: {
            page,
            limit,
            search,
            paymentStatus: paymentStatusFilter,
            shipmentStatus: shipmentStatusFilter,
            dateRange,
          },
          headers: { Authorization: `Bearer ${user?.token}` },
        }
      );

      setOrders(res.data.orders);
      setTotalPages(res.data.totalPages);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    } finally {
      setLoading(false);
    }
  }, [
    user,
    page,
    search,
    paymentStatusFilter,
    shipmentStatusFilter,
    dateRange,
  ]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const markAsDelivered = async (orderId: string) => {
    if (!confirm("Mark this order as delivered?")) return;
    try {
      await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/orders/${orderId}/deliver`,
        {},
        { headers: { Authorization: `Bearer ${user?.token}` } }
      );
      fetchOrders();
    } catch (error) {
      console.error("Failed to mark as delivered:", error);
    }
  };

  const markAsPaid = async (orderId: string) => {
    if (!confirm("Mark this order as paid?")) return;
    try {
      await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/orders/${orderId}/pay`,
        {},
        { headers: { Authorization: `Bearer ${user?.token}` } }
      );
      fetchOrders();
    } catch (error) {
      console.error("Failed to mark as paid:", error);
    }
  };

  const deleteOrder = async (orderId: string) => {
    if (!confirm("Are you sure you want to delete this order?")) return;
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/orders/${orderId}`,
        { headers: { Authorization: `Bearer ${user?.token}` } }
      );
      fetchOrders();
    } catch (error) {
      console.error("Failed to delete order:", error);
    }
  };

  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold text-pink-600 mb-6">
        Orders Management
      </h1>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by order_id/email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-4 py-2 rounded w-full md:w-1/3"
        />

        <select
          value={paymentStatusFilter}
          onChange={(e) => setPaymentStatusFilter(e.target.value)}
          className="border px-4 py-2 rounded w-full md:w-1/6"
        >
          <option value="">Payment Status</option>
          <option value="paid">Paid</option>
          <option value="unpaid">Unpaid</option>
        </select>

        <select
          value={shipmentStatusFilter}
          onChange={(e) => setShipmentStatusFilter(e.target.value)}
          className="border px-4 py-2 rounded w-full md:w-1/6"
        >
          <option value="">Shipping Status</option>
          <option value="delivered">Delivered</option>
          <option value="pending">Pending</option>
        </select>

        <select
          value={dateRange}
          onChange={(e) => setDateRange(e.target.value)}
          className="border px-4 py-2 rounded w-full md:w-1/6"
        >
          <option value="7d">Last 7 Days</option>
          <option value="30d">Last 30 Days</option>
          <option value="all">All Time</option>
        </select>
      </div>

      {loading ? (
        <p>Loading orders...</p>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow-md rounded text-sm md:text-base">
              <thead className="bg-pink-600 text-white">
                <tr>
                  <th className="py-3 px-2 md:px-6 text-left">ID</th>
                  <th className="py-3 px-2 md:px-6 text-left">User</th>
                  <th className="py-3 px-2 md:px-6 text-left">Date</th>
                  <th className="py-3 px-2 md:px-6 text-left">Total</th>
                  <th className="py-3 px-2 md:px-6 text-left">Payment</th>
                  <th className="py-3 px-2 md:px-6 text-left">Shipment</th>
                  <th className="py-3 px-2 md:px-6 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.length === 0 ? (
                  <tr>
                    <td
                      className="py-4 px-6 text-center text-gray-500"
                      colSpan={7}
                    >
                      No orders found.
                    </td>
                  </tr>
                ) : (
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  orders.map((order: any) => (
                    <tr key={order._id} className="border-t">
                      <td className="py-3 px-2 md:px-6 break-all">
                        {order._id}
                      </td>
                      <td className="py-3 px-2 md:px-6">
                        {order.user?.email || "Guest"}
                      </td>
                      <td className="py-3 px-2 md:px-6">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-2 md:px-6">
                        ${order.totalPrice.toFixed(2)}
                      </td>
                      <td className="py-3 px-2 md:px-6">
                        {order.isPaid ? "Paid" : "Not Paid"}
                      </td>
                      <td className="py-3 px-2 md:px-6">
                        {order.isDelivered ? "Delivered" : "Pending"}
                      </td>
                      <td className="py-3 px-2 md:px-6 flex flex-wrap gap-2">
                        {!order.isPaid && (
                          <button
                            onClick={() => markAsPaid(order._id)}
                            className="bg-green-500 text-white px-2 py-1 rounded text-xs md:text-sm"
                          >
                            Mark as Paid
                          </button>
                        )}
                        {!order.isDelivered && (
                          <button
                            onClick={() => markAsDelivered(order._id)}
                            className="bg-blue-500 text-white px-2 py-1 rounded text-xs md:text-sm"
                          >
                            Mark as Delivered
                          </button>
                        )}
                        <Link
                          href={`/orders/${order._id}`}
                          className="bg-gray-500 text-white px-2 py-1 rounded text-xs md:text-sm"
                        >
                          View
                        </Link>
                        <button
                          onClick={() => deleteOrder(order._id)}
                          className="bg-red-500 text-white px-2 py-1 rounded text-xs md:text-sm"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center gap-2 mt-6 flex-wrap">
            <button
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
              className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 disabled:opacity-50"
            >
              Prev
            </button>
            <span className="px-4 py-2">
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={page === totalPages}
              className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      )}
    </AdminLayout>
  );
};

export default AdminOrdersPage;
