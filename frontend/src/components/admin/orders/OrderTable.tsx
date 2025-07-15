import Link from "next/link";
import React from "react";

// Type Definitions
interface User {
  email?: string;
}

interface Order {
  _id: string;
  user?: User;
  createdAt: string;
  totalPrice: number;
  isPaid: boolean;
  isDelivered: boolean;
}

interface OrderTableProps {
  orders: Order[];
  markAsPaid: (orderId: string) => void;
  markAsDelivered: (orderId: string) => void;
  deleteOrder: (orderId: string) => void;
}

const OrderTable: React.FC<OrderTableProps> = ({
  orders,
  markAsPaid,
  markAsDelivered,
  deleteOrder,
}) => (
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
            <td className="py-4 px-6 text-center text-gray-500" colSpan={7}>
              No orders found.
            </td>
          </tr>
        ) : (
          orders.map((order) => (
            <tr key={order._id} className="border-t">
              <td className="py-3 px-2 md:px-6 break-all">{order._id}</td>
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
);

export default OrderTable;
