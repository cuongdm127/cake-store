/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useState } from "react";
import {
  fetchUsersApi,
  deleteUserApi,
} from "./services";

export const useAdminUsers = (user: any) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10;

  // Reset page when search changes
  useEffect(() => {
    setPage(1);
  }, [search]);

  const fetchUsers = useCallback(async () => {
    if (!user) return;

    setLoading(true);
    try {
      const res = await fetchUsersApi({ page, limit, search }, user.token);
      setUsers(res.data.users);
      setTotalPages(res.data.totalPages);
    } catch (error) {
      console.error("Failed to fetch users", error);
    } finally {
      setLoading(false);
    }
  }, [user, page, search]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const deleteUser = async (id: string) => {
    if (!confirm("Are you sure you want to delete this user?")) return;
    try {
      await deleteUserApi(id, user.token);
      fetchUsers();
    } catch (error) {
      console.error("Failed to delete user:", error);
    }
  };

  return {
    users,
    loading,
    page,
    totalPages,
    search,
    setSearch,
    setPage,
    deleteUser,
  };
};
