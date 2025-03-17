import { useEffect, useState, useCallback } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import useAdminGuard, { useAuth } from "@/context/AuthContext";
import axios from "axios";
import Link from "next/link";

const AdminOrdersPage = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  useAdminGuard();
  // ✅ Ensure user is loaded before calling API
  useEffect(() => {
    if (!user) return;
    fetchOrders();
  }, [user]);

  // ✅ Use useCallback to prevent re-creation on every render
  const fetchOrders = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/orders`,
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );
      setOrders(res.data);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  const markAsDelivered = async (orderId: string) => {
    if (!confirm("Mark this order as delivered?")) return;
    try {
      await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/orders/${orderId}/deliver`,
        {},
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
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
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );
      fetchOrders(); // refresh orders list
    } catch (error) {
      console.error("Failed to mark as paid:", error);
    }
  };

  const deleteOrder = async (orderId: string) => {
    if (!confirm("Are you sure you want to delete this order?")) return;
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/orders/${orderId}`,
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
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

      {loading ? (
        <p>Loading orders...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded">
            <thead className="bg-pink-600 text-white">
              <tr>
                <th className="py-3 px-6 text-left">ID</th>
                <th className="py-3 px-6 text-left">User</th>
                <th className="py-3 px-6 text-left">Date</th>
                <th className="py-3 px-6 text-left">Total</th>
                <th className="py-3 px-6 text-left">Paid</th>
                <th className="py-3 px-6 text-left">Delivered</th>
                <th className="py-3 px-6 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.length === 0 ? (
                <tr>
                  <td className="py-4 px-6" colSpan={7}>
                    No orders found.
                  </td>
                </tr>
              ) : (
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                orders.map((order: any) => (
                  <tr key={order._id} className="border-t">
                    <td className="py-3 px-6">{order._id}</td>
                    <td className="py-3 px-6">
                      {order.userId?.name || "Guest User"}
                    </td>
                    <td className="py-3 px-6">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-6">
                      ${order.totalPrice.toFixed(2)}
                    </td>
                    <td className="py-3 px-6">
                      {order.isPaid ? (
                        <span className="text-green-600">Paid</span>
                      ) : (
                        <span className="text-red-600">Not Paid</span>
                      )}
                    </td>
                    <td className="py-3 px-6">
                      {order.isDelivered ? (
                        <span className="text-green-600">Delivered</span>
                      ) : (
                        <span className="text-yellow-600">Pending</span>
                      )}
                    </td>
                    <td className="py-3 px-6">
                      <div className="flex flex-wrap gap-2 justify-start">
                        {!order.isPaid && (
                          <button
                            onClick={() => markAsPaid(order._id)}
                            className="bg-green-500 hover:bg-green-600 text-white text-sm px-4 py-2 rounded transition w-full sm:w-auto"
                            title="Mark order as paid"
                          >
                            Mark as Paid
                          </button>
                        )}

                        {!order.isDelivered && (
                          <button
                            onClick={() => markAsDelivered(order._id)}
                            className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-4 py-2 rounded transition w-full sm:w-auto"
                            title="Mark order as delivered"
                          >
                            Mark as Delivered
                          </button>
                        )}

                        <Link
                          href={`/orders/${order._id}`}
                          className="bg-gray-500 hover:bg-gray-600 text-white text-sm px-4 py-2 rounded transition text-center w-full sm:w-auto"
                          title="View order details"
                        >
                          View
                        </Link>

                        <button
                          onClick={() => deleteOrder(order._id)}
                          className="bg-red-500 hover:bg-red-600 text-white text-sm px-4 py-2 rounded transition w-full sm:w-auto"
                          title="Delete order"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminOrdersPage;
