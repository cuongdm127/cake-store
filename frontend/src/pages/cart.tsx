import { useCart } from "@/context/CartContext";
import Link from "next/link"; // ✅ Import Link to navigate to checkout

const CartPage = () => {
  const { state, removeItem, clearCart, increaseItem, decreaseItem } = useCart();

  const totalPrice = state.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
      <div className="max-w-4xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-8">Your Cart 🛒</h1>

        {state.items.length === 0 ? (
          <p className="text-gray-600">Your cart is empty.</p>
        ) : (
          <>
            <ul className="space-y-4">
              {state.items.map((item) => (
                <li
                  key={item._id}
                  className="flex justify-between items-center border-b pb-4"
                >
                  <div>
                    <h3 className="font-semibold">{item.name}</h3>
                    <div className="flex items-center space-x-2 mt-2">
                      <button
                        onClick={() => decreaseItem(item._id)}
                        className="px-2 py-1 bg-gray-300 rounded hover:bg-gray-400"
                      >
                        -
                      </button>
                      <span className="text-sm">{item.quantity}</span>
                      <button
                        onClick={() => increaseItem(item._id)}
                        className="px-2 py-1 bg-gray-300 rounded hover:bg-gray-400"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <span className="font-bold text-pink-600">
                      ${item.price * item.quantity}
                    </span>
                    <button
                      onClick={() => removeItem(item._id)}
                      className="text-red-500 hover:underline text-sm"
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <span className="text-xl font-bold">
                Total: ${totalPrice.toFixed(2)}
              </span>

              <div className="flex space-x-4">
                <button
                  onClick={clearCart}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                >
                  Clear Cart
                </button>

                {/* ✅ Checkout Button */}
                <Link href="/checkout">
                  <button
                    className={`px-6 py-2 rounded text-white ${
                      state.items.length === 0
                        ? "bg-gray-300 cursor-not-allowed"
                        : "bg-pink-600 hover:bg-pink-700"
                    }`}
                    disabled={state.items.length === 0}
                  >
                    Proceed to Checkout
                  </button>
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
  );
};

export default CartPage;
