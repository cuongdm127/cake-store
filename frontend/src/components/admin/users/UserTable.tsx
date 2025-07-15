/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from "next/link";

type Props = {
  users: any[];
  deleteUser: (id: string) => void;
};

const UserTable = ({ users, deleteUser }: Props) => (
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
          users.map((u) => (
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
);

export default UserTable;
