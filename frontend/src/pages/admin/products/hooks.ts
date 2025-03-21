import { useCallback, useEffect, useState } from "react";
import {
  fetchProductsApi,
  deleteProductApi,
} from "./services";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useAdminProducts = (user: any) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10;

  // Reset page when search is updated
  useEffect(() => {
    setPage(1);
  }, [search]);

  const fetchProducts = useCallback(async () => {
    if (!user) return;

    setLoading(true);
    try {
      const res = await fetchProductsApi(
        { page, limit, search },
        user.token
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
    fetchProducts();
  }, [fetchProducts]);

  const deleteProduct = async (productId: string) => {
    if (!confirm("Delete this product?")) return;

    try {
      await deleteProductApi(productId, user.token);
      fetchProducts();
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  return {
    products,
    loading,
    page,
    totalPages,
    search,
    setSearch,
    setPage,
    deleteProduct,
  };
};
