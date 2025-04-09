import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import { useRouter } from "next/router";

const CheckoutPage = () => {
  const { state, clearCart } = useCart();
  const { user } = useAuth();
  const router = useRouter();

  const [shippingAddress, setShippingAddress] = useState({
    fullName: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
    phone: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const totalPrice = state.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShippingAddress({ ...shippingAddress, [e.target.name]: e.target.value });
  };

  const placeOrder = async () => {
    setLoading(true);
    setError("");

    try {
      console.log(state);
      const orderItems = state.items.map((item) => ({
        productId: item._id,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
      }));
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/orders`,
        {
          orderItems,
          shippingAddress,
          paymentMethod: "Cash on Delivery",
          totalPrice,
        },
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );

      clearCart();
      router.push(`/order-success?id=${res.data._id}`);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || "Failed to place order");
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>

      <div className="space-y-4">
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={shippingAddress.fullName}
          onChange={handleInputChange}
          className="border p-2 w-full"
          required
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={shippingAddress.address}
          onChange={handleInputChange}
          className="border p-2 w-full"
          required
        />
        <input
          type="text"
          name="city"
          placeholder="City"
          value={shippingAddress.city}
          onChange={handleInputChange}
          className="border p-2 w-full"
          required
        />
        <input
          type="text"
          name="postalCode"
          placeholder="Postal Code"
          value={shippingAddress.postalCode}
          onChange={handleInputChange}
          className="border p-2 w-full"
          required
        />
        <input
          type="text"
          name="country"
          placeholder="Country"
          value={shippingAddress.country}
          onChange={handleInputChange}
          className="border p-2 w-full"
          required
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={shippingAddress.phone}
          onChange={handleInputChange}
          className="border p-2 w-full"
          required
        />

        {error && <p className="text-red-500">{error}</p>}

        <button
          onClick={placeOrder}
          className="bg-pink-600 text-white px-4 py-2 rounded disabled:bg-pink-300"
          disabled={loading}
        >
          {loading ? "Placing Order..." : "Place Order"}
        </button>
      </div>
    </div>
  );
};

export default CheckoutPage;
