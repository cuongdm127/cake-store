import { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import useAdminGuard, { useAuth } from "@/context/AuthContext";
import axios from "axios";
import Link from "next/link";

const AdminUsersPage = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10; // items per page

  useAdminGuard();

  useEffect(() => {
    if (!user) return;
    fetchUsers();
  }, [user, page, search]);

  const fetchUsers = async () => {
    if (!user) return;
    setLoading(true);

    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/users`,
        {
          params: {
            page,
            limit,
            search,
          },
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      setUsers(res.data.users);
      setTotalPages(res.data.totalPages);
    } catch (error) {
      console.error("Failed to fetch users", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (userId: string) => {
    if (!confirm("Are you sure you want to delete this user?")) return;
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/users/${userId}`,
        {
          headers: { Authorization: `Bearer ${user?.token}` },
        }
      );
      fetchUsers();
    } catch (error) {
      console.error("Failed to delete user:", error);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1); // reset page on new search
  };

  const handlePrevPage = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNextPage = () => {
    if (page < totalPages) setPage(page + 1);
  };

  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold text-pink-600 mb-8">
        Users Management
      </h1>

      {/* Search Bar */}
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search by name or email"
          value={search}
          onChange={handleSearchChange}
          className="border border-gray-300 px-4 py-2 rounded shadow w-full md:w-1/3"
        />
      </div>

      {loading ? (
        <p>Loading users...</p>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow-md rounded">
              <thead className="bg-pink-600 text-white">
                <tr>
                  <th className="py-3 px-6 text-left">Name</th>
                  <th className="py-3 px-6 text-left">Email</th>
                  <th className="py-3 px-6 text-left">Role</th>
                  <th className="py-3 px-6 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.length === 0 ? (
                  <tr>
                    <td className="py-4 px-6 text-center" colSpan={4}>
                      No users found.
                    </td>
                  </tr>
                ) : (
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  users.map((u: any) => (
                    <tr key={u._id} className="border-t">
                      <td className="py-3 px-6">{u.name}</td>
                      <td className="py-3 px-6">{u.email}</td>
                      <td className="py-3 px-6">{u.role}</td>
                      <td className="py-3 px-6 flex gap-2">
                        <Link
                          href={`/admin/users/${u._id}/edit`}
                          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => deleteUser(u._id)}
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

          {/* Pagination Controls */}
          <div className="flex justify-between items-center mt-6">
            <button
              onClick={handlePrevPage}
              disabled={page === 1}
              className={`px-4 py-2 rounded ${
                page === 1
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-pink-600 text-white hover:bg-pink-700"
              }`}
            >
              Previous
            </button>
            <span>
              Page {page} of {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={page === totalPages}
              className={`px-4 py-2 rounded ${
                page === totalPages
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-pink-600 text-white hover:bg-pink-700"
              }`}
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
