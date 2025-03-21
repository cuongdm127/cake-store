import AdminLayout from "@/components/admin/AdminLayout";
import useAdminGuard, { useAuth } from "@/context/AuthContext";

import { useAdminUsers } from "./hooks";
import UserFilters from "./components/UserFilters";
import UserTable from "./components/UserTable";

const AdminUsersPage = () => {
  const { user } = useAuth();
  const { isLoading: authLoading, isAdmin } = useAdminGuard();

  const {
    users,
    loading,
    page,
    totalPages,
    search,
    setSearch,
    setPage,
    deleteUser,
  } = useAdminUsers(user);

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
      <h1 className="text-3xl font-bold text-pink-600 mb-8">
        Users Management
      </h1>

      <UserFilters search={search} setSearch={setSearch} />

      {loading ? (
        <p>Loading users...</p>
      ) : (
        <>
          <UserTable users={users} deleteUser={deleteUser} />

          {/* Pagination Controls */}
          <div className="flex justify-center items-center gap-2 mt-6">
            <button
              onClick={() => setPage((prev: number) => Math.max(prev - 1, 1))}
              disabled={page === 1}
              className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 disabled:opacity-50"
            >
              Previous
            </button>
            <span className="px-4 py-2">
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => setPage((prev: number) => Math.min(prev + 1, totalPages))}
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

export default AdminUsersPage;
