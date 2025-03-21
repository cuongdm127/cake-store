import AdminLayout from "@/components/admin/AdminLayout";
import useAdminGuard, { useAuth } from "@/context/AuthContext";

import { useAdminProducts } from "./hooks";
import ProductFilters from "./components/ProductFilters";
import ProductTable from "./components/ProductTable";
import Link from "next/link";

const AdminProductsPage = () => {
  const { user } = useAuth();
  const { isLoading: authLoading, isAdmin } = useAdminGuard();

  const {
    products,
    loading,
    page,
    totalPages,
    search,
    setSearch,
    setPage,
    deleteProduct,
  } = useAdminProducts(user);

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

      <ProductFilters search={search} setSearch={setSearch} />

      {loading ? (
        <p>Loading products...</p>
      ) : (
        <>
          <ProductTable products={products} deleteProduct={deleteProduct} />

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
