import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";

const Header = () => {
  const { user, logout } = useAuth();
  const { state } = useCart();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const totalItems = state.items.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <span className="text-3xl">🍰</span>
          <h1 className="text-2xl font-bold text-pink-600">Bake Store</h1>
        </div>

        {/* Navigation Links */}
        <nav className="flex space-x-6 items-center relative">
          <Link href="/" className="text-gray-600 hover:text-pink-600 transition">
            Home
          </Link>

          <Link href="/products" className="text-gray-600 hover:text-pink-600 transition">
            Products
          </Link>

          <Link href="/about" className="text-gray-600 hover:text-pink-600 transition">
            About
          </Link>

          <Link href="/cart" className="relative text-gray-600 hover:text-pink-600 transition">
            Cart
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-3 bg-pink-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {totalItems}
              </span>
            )}
          </Link>

          {/* User Dropdown */}
          {user ? (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center text-gray-600 hover:text-pink-600 transition focus:outline-none"
              >
                Hello, {user.name} ⬇️
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg z-20">
                  <Link
                    href="/orders"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-pink-50"
                    onClick={() => setDropdownOpen(false)}
                  >
                    My Orders
                  </Link>

                  <Link
                    href="/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-pink-50"
                    onClick={() => setDropdownOpen(false)}
                  >
                    My Profile
                  </Link>

                  {user.role === "admin" && (
                    <Link
                      href="/admin/dashboard"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-pink-50"
                      onClick={() => setDropdownOpen(false)}
                    >
                      Admin Panel
                    </Link>
                  )}

                  <button
                    onClick={() => {
                      logout();
                      setDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-pink-50"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link href="/login" className="text-gray-600 hover:text-pink-600 transition">
                Login
              </Link>
              <Link href="/register" className="text-gray-600 hover:text-pink-600 transition">
                Register
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
