import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import AdminLayout from "@/components/admin/AdminLayout";
import useAdminGuard, { useAuth } from "@/context/AuthContext";
import { Product } from "@/types/Product";

const AdminProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10; // per page
  const { user } = useAuth();

  const { isLoading: authLoading, isAdmin } = useAdminGuard();

  const fetchProducts = useCallback(async () => {
    if (!user) return;

    setLoading(true);
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/products`,
        {
          params: { page, limit, search },
          headers: { Authorization: `Bearer ${user?.token}` },
        }
      );

      setProducts(res.data.products);
      setTotalPages(res.data.totalPages);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setLoading(false);
    }
  }, [user, page, search]);

  useEffect(() => {
    if (!authLoading && isAdmin) {
      fetchProducts();
    }
  }, [authLoading, isAdmin, fetchProducts]);

  const deleteProduct = async (productId: string) => {
    if (!confirm("Delete this product?")) return;

    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/products/${productId}`,
        { headers: { Authorization: `Bearer ${user?.token}` } }
      );
      fetchProducts();
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  if (authLoading) {
    return (
      <AdminLayout>
        <p>Checking admin permissions...</p>
      </AdminLayout>
    );
  }

  if (!isAdmin) return null;

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-pink-600">Products Management</h1>
        <Link href="/admin/products/create" className="bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700">
          Add Product
        </Link>
      </div>

      {/* Search bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-4 py-2 rounded w-full md:w-1/3"
        />
      </div>

      {loading ? (
        <p>Loading products...</p>
      ) : (
        <>
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
                {products.length === 0 ? (
                  <tr>
                    <td className="py-4 px-6 text-center" colSpan={4}>No products found.</td>
                  </tr>
                ) : (
                  products.map((product) => (
                    <tr key={product._id} className="border-t">
                      <td className="py-3 px-6">{product.name}</td>
                      <td className="py-3 px-6">${product.price}</td>
                      <td className="py-3 px-6">{product.stock > 0 ? product.stock : "Out Of Stock"}</td>
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
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination controls */}
          <div className="flex justify-center items-center gap-2 mt-6">
            <button
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
              className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 disabled:opacity-50"
            >
              Prev
            </button>
            <span className="px-4 py-2">{page} / {totalPages}</span>
            <button
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={page === totalPages}
              className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      )}
    </AdminLayout>
  );
};

export default AdminProductsPage;
