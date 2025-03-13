import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import Link from "next/link";
import { Order } from "@/types/Order";

const OrderDetailsPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { user } = useAuth();

  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrder = async () => {
      if (!id || !user) return;

      setLoading(true);
      setError("");

      try {
        const res = await axios.get<Order>(
          `${process.env.NEXT_PUBLIC_API_URL}/orders/${id}`,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        console.log(res.data);
        setOrder(res.data);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err: unknown) {
        setError("Failed to fetch order details.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id, user]);

  if (!user) {
    router.push("/login");
    return null;
  }

  if (loading) {
    return <div className="text-center py-10">Loading order details...</div>;
  }

  if (error) {
    return (
      <div className="text-center py-10 text-red-500">
        {error}
        <br />
        <Link href="/orders" className="text-pink-600 underline mt-2 block">
          Back to My Orders
        </Link>
      </div>
    );
  }

  if (!order) return null;

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-pink-600 mb-6">
        Order Details 🧾
      </h1>

      {/* Order Summary */}
      <div className="border rounded p-6 shadow mb-8">
        <div className="mb-4">
          <p className="text-gray-600">Order ID:</p>
          <p className="font-semibold">{order._id}</p>
        </div>

        <div className="flex justify-between mb-4">
          <div>
            <p className="text-gray-600">Order Date:</p>
            <p>{new Date(order.createdAt).toLocaleDateString()}</p>
          </div>
          <div>
            <p className="text-gray-600">Payment Method:</p>
            <p className="font-semibold">{order.paymentMethod}</p>
          </div>
          <div>
            <p className="text-gray-600">Status:</p>
            {order.isDelivered ? (
              <p className="font-semibold text-green-600">Delivered</p>
            ) : (
              <p className="font-semibold text-yellow-600">Processing</p>
            )}
          </div>
        </div>
      </div>

      {/* Shipping Info */}
      <div className="border rounded p-6 shadow mb-8">
        <h2 className="text-lg font-bold mb-4">Shipping Address 📦</h2>
        <p>{order.shippingAddress.fullName}</p>
        <p>{order.shippingAddress.address}</p>
        <p>
          {order.shippingAddress.city}, {order.shippingAddress.postalCode}
        </p>
        <p>{order.shippingAddress.country}</p>
        <p>Phone: {order.shippingAddress.phone}</p>
      </div>

      {/* Items */}
      <div className="border rounded p-6 shadow">
        <h2 className="text-lg font-bold mb-4">Order Items 🍰</h2>
        <div className="space-y-4">
          {order.orderItems.map((item) => (
            <div
              key={item.productId}
              className="flex justify-between items-center border-b pb-4"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded"
                />
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-sm text-gray-500">
                    {item.quantity} x ${item.price}
                  </p>
                </div>
              </div>

              <div className="font-bold">
                ${(item.quantity * item.price).toFixed(2)}
              </div>
            </div>
          ))}
        </div>

        {/* Total */}
        <div className="text-right mt-6 text-xl font-bold text-pink-600">
          Total Paid: ${order.totalPrice.toFixed(2)}
        </div>
      </div>

      <div className="mt-8 text-center">
        <Link
          href="/orders"
          className="inline-block bg-pink-600 text-white px-6 py-2 rounded hover:bg-pink-700"
        >
          Back to My Orders
        </Link>
      </div>
    </div>
  );
};

export default OrderDetailsPage;
