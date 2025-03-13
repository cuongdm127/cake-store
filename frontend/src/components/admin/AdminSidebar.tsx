import Link from "next/link";

const AdminSidebar = () => {
  return (
    <aside className="w-64 bg-white shadow-lg p-6">
      <h2 className="text-xl font-bold mb-6 text-pink-600">Admin Panel</h2>
      <nav className="flex flex-col space-y-4">
        <Link href="/admin/dashboard" className="hover:text-pink-600">
          Dashboard
        </Link>
        <Link href="/admin/products" className="hover:text-pink-600">
          Products
        </Link>
        <Link href="/admin/orders" className="hover:text-pink-600">
          Orders
        </Link>
        <Link href="/admin/users" className="hover:text-pink-600">
          Users
        </Link>
      </nav>
    </aside>
  );
};

export default AdminSidebar;
