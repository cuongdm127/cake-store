import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import AdminLayout from "@/components/admin/AdminLayout";
import useAdminGuard, { useAuth } from "@/context/AuthContext";
import { Product } from "@/types/Product";

const AdminProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  // ✅ Use admin guard and get its loading/admin status
  const { isLoading: authLoading, isAdmin } = useAdminGuard();

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get<Product[]>(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/products`,
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );
      setProducts(res.data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setLoading(false);
    }
  },[user?.token]);

  // ✅ Wait until admin check finishes
  useEffect(() => {
    if (authLoading || !isAdmin) return; // Wait until user loads and is verified as admin
    // ✅ Fetch products inside useEffect (no direct calls!)
    
    fetchProducts();
  }, [authLoading, fetchProducts, isAdmin]);

  const deleteProduct = async (productId: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/products/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );
      fetchProducts(); // Refresh product list after delete
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  // ✅ Show loading while adminGuard is still running
  if (authLoading) {
    return (
      <AdminLayout>
        <p>Checking admin permissions...</p>
      </AdminLayout>
    );
  }

  // ✅ Optionally render nothing (already redirecting in useAdminGuard)
  if (!isAdmin) {
    return null;
  }

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-pink-600">
          Products Management
        </h1>
        <Link
          href="/admin/products/create"
          className="bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700"
        >
          Add Product
        </Link>
      </div>

      {loading ? (
        <p>Loading products...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded">
            <thead className="bg-pink-600 text-white">
              <tr>
                <th className="py-3 px-6 text-left">Name</th>
                <th className="py-3 px-6 text-left">Price</th>
                <th className="py-3 px-6 text-left">Stock</th>
                <th className="py-3 px-6 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.length === 0 && (
                <tr>
                  <td className="py-4 px-6" colSpan={4}>
                    No products found.
                  </td>
                </tr>
              )}
              {products.map((product) => (
                <tr key={product._id} className="border-t">
                  <td className="py-3 px-6">{product.name}</td>
                  <td className="py-3 px-6">${product.price}</td>
                  <td className="py-3 px-6">{product.stock > 0 ? product.stock : 'Out Of Stock'}</td>
                  <td className="py-3 px-6 flex gap-2">
                    <Link
                      href={`/admin/products/${product._id}/edit`}
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => deleteProduct(product._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminProductsPage;
