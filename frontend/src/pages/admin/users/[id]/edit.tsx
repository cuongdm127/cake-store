import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import AdminLayout from "@/components/admin/AdminLayout";
import useAdminGuard, { useAuth } from "@/context/AuthContext";
import axios from "axios";

const EditUserPage = () => {
  const router = useRouter();
  const { id } = router.query; // user ID from URL
  const { user } = useAuth();
  useAdminGuard();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("user");

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id || !user) return;
    if (!router.isReady || !user) return;

    const fetchUser = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/admin/users/${id}`,
          {
            headers: { Authorization: `Bearer ${user.token}` },
          }
        );
        const u = res.data;
        setName(u.name);
        setEmail(u.email);
        setRole(u.role);
      } catch (err) {
        console.error("Failed to fetch user", err);
        setError("Failed to load user data.");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id, user, router.isReady]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setSaving(true);
    try {
      await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/users/${id}`,
        { name, email, role },
        {
          headers: { Authorization: `Bearer ${user?.token}` },
        }
      );

      router.push("/admin/users");
    } catch (err) {
      console.error("Failed to update user", err);
      setError("Failed to update user.");
    } finally {
      setSaving(false);
    }
  };

  if (typeof window === "undefined" || !router.isReady) return null;

  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold text-pink-600 mb-8">Edit User</h1>

      {loading ? (
        <p>Loading user data...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="max-w-lg mx-auto bg-white shadow p-6 rounded"
        >
          <div className="space-y-4">
            <div>
              <label className="block mb-1">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border px-4 py-2 rounded"
                required
              />
            </div>

            <div>
              <label className="block mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border px-4 py-2 rounded"
                required
              />
            </div>

            <div>
              <label className="block mb-1">Role</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full border px-4 py-2 rounded"
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={saving}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      )}
    </AdminLayout>
  );
};

export default EditUserPage;
