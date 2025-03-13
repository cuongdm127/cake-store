import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import Link from "next/link";
import { Order } from "@/types/Order";

const OrdersPage = () => {
  const { user } = useAuth();

  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) return;

      setLoading(true);
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/orders/mine?page=${page}&limit=5`,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );

        setOrders(res.data.orders);
        setPage(res.data.page);
        setPages(res.data.pages);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user, page]);

  if (!user) {
    return (
      <div className="text-center py-10">
        <p className="text-lg">You need to be logged in to view your orders.</p>
        <Link href="/login" className="text-pink-600 hover:underline">
          Login
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8 text-pink-600">My Orders</h1>

      {loading ? (
        <div className="text-center text-gray-500">Loading orders...</div>
      ) : orders.length === 0 ? (
        <div className="text-center text-gray-500">
          <p>No orders found. Start shopping!</p>
          <Link
            href="/products"
            className="mt-4 inline-block bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700"
          >
            Browse Products
          </Link>
        </div>
      ) : (
        <>
          <div className="grid gap-6">
            {orders.map((order) => (
              <div
                key={order._id}
                className="border border-gray-200 rounded-lg p-6 shadow hover:shadow-md transition"
              >
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <p className="text-sm text-gray-500">Order ID:</p>
                    <p className="font-semibold">{order._id}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Date:</p>
                    <p>{new Date(order.createdAt).toLocaleDateString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Total:</p>
                    <p className="text-lg font-bold text-pink-600">
                      ${order.totalPrice.toFixed(2)}
                    </p>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-500">Delivery Status:</p>
                    {order.isDelivered ? (
                      <p className="text-green-600 font-semibold">Delivered</p>
                    ) : (
                      <p className="text-yellow-600 font-semibold">Processing</p>
                    )}
                  </div>

                  <Link href={`/orders/${order._id}`}>
                    <button className="bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700">
                      View Details
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center mt-10 space-x-2">
            <button
              disabled={page === 1}
              onClick={() => setPage((prev) => prev - 1)}
              className="px-3 py-2 bg-gray-200 rounded disabled:opacity-50"
            >
              Prev
            </button>

            <span className="px-3 py-2">{`Page ${page} of ${pages}`}</span>

            <button
              disabled={page === pages}
              onClick={() => setPage((prev) => prev + 1)}
              className="px-3 py-2 bg-gray-200 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default OrdersPage;
