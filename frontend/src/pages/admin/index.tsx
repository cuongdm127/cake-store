import AdminLayout from "@/components/admin/AdminLayout";
import useAdminGuard from "@/context/AuthContext";

const AdminDashboard = () => {
  useAdminGuard();
  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold mb-6 text-pink-600">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded shadow text-center">
          <h2 className="text-lg font-semibold mb-2">Total Products</h2>
          <p className="text-2xl font-bold">12</p>
        </div>
        <div className="bg-white p-6 rounded shadow text-center">
          <h2 className="text-lg font-semibold mb-2">Total Orders</h2>
          <p className="text-2xl font-bold">28</p>
        </div>
        <div className="bg-white p-6 rounded shadow text-center">
          <h2 className="text-lg font-semibold mb-2">Total Users</h2>
          <p className="text-2xl font-bold">45</p>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
