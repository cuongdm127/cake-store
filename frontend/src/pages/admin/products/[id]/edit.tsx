import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/router";
import AdminLayout from "@/components/admin/AdminLayout";
import axios from "axios";

const EditProductPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { user } = useAuth();
  const [loadingProduct, setLoadingProduct] = useState(true);

  const [name, setName] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [stock, setStock] = useState<number>(0);
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id || !user) return;

    const fetchProduct = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/admin/products/${id}`,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        const product = res.data;

        // Fallback values to prevent uncontrolled inputs
        setName(product.name || "");
        setPrice(product.price ?? 0);
        setStock(product.stock ?? 0);
        setDescription(product.description || "");
        setImageUrl(product.image || "");
      } catch (error) {
        console.error("Failed to fetch product:", error);
      } finally {
        setLoadingProduct(false); // ✅ Move this inside finally block!
      }
    };

    fetchProduct();
  }, [id, user]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/products/${id}`,
        {
          name,
          price,
          stock,
          description,
          image: imageUrl,
        },
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );

      router.push("/admin/products");
    } catch (error) {
      console.error("Failed to update product:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loadingProduct) {
    return (
      <AdminLayout>
        <div className="text-center py-20">Loading product...</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold text-pink-600 mb-6">Edit Product</h1>

      <form
        onSubmit={handleUpdate}
        className="max-w-2xl mx-auto bg-white p-6 shadow rounded"
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
            <label className="block mb-1">Price</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="w-full border px-4 py-2 rounded"
              required
            />
          </div>

          <div>
            <label className="block mb-1">Stock</label>
            <input
              type="number"
              value={stock}
              onChange={(e) => setStock(Number(e.target.value))}
              className="w-full border px-4 py-2 rounded"
              required
            />
          </div>

          <div>
            <label className="block mb-1">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border px-4 py-2 rounded"
              rows={4}
            />
          </div>

          <div>
            <label className="block mb-1">Image URL</label>
            <input
              type="text"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full border px-4 py-2 rounded"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? "Updating..." : "Update Product"}
          </button>
        </div>
      </form>
    </AdminLayout>
  );
};

export default EditProductPage;
