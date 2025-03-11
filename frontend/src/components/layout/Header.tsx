import Link from "next/link";
import { useCart } from "@/context/CartContext";

const Header = () => {
  const { state } = useCart();
  const totalItems = state.items.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <span className="text-3xl">🍰</span>
          <h1 className="text-2xl font-bold text-pink-600">Bake Store</h1>
        </div>

        <nav className="flex space-x-6">
          <Link
            href="/"
            className="text-gray-600 hover:text-pink-600 transition"
          >
            Home
          </Link>
          <Link
            href="/products"
            className="text-gray-600 hover:text-pink-600 transition"
          >
            Products
          </Link>
          <Link
            href="/about"
            className="text-gray-600 hover:text-pink-600 transition"
          >
            About
          </Link>
          <Link
            href="/cart"
            className="relative text-gray-600 hover:text-pink-600 transition"
          >
            Cart
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-3 bg-pink-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {totalItems}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
