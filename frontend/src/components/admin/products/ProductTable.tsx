import Link from "next/link";

type ProductTableProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  products: any[];
  deleteProduct: (id: string) => void;
};

const ProductTable = ({ products, deleteProduct }: ProductTableProps) => (
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
            <td className="py-4 px-6 text-center" colSpan={4}>
              No products found.
            </td>
          </tr>
        ) : (
          products.map((product) => (
            <tr key={product._id} className="border-t">
              <td className="py-3 px-6">{product.name}</td>
              <td className="py-3 px-6">${product.price}</td>
              <td className="py-3 px-6">
                {product.stock > 0 ? product.stock : "Out Of Stock"}
              </td>
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
);

export default ProductTable;
