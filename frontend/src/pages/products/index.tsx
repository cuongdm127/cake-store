import { GetServerSideProps } from "next";
import ProductCard from "@/components/ProductCard";
import { Product } from "@/types/Product";

interface ProductListPageProps {
  products: Product[];
  page: number;
  pages: number;
}

const ProductListPage = ({ products, page, pages }: ProductListPageProps) => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8 text-center">Our Cakes 🍰</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-6 space-x-2">
        <button
          disabled={page <= 1}
          onClick={() => {
            window.location.href = `/products?page=${page - 1}`;
          }}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Prev
        </button>

        <span className="px-4 py-2">{`Page ${page} of ${pages}`}</span>

        <button
          disabled={page >= pages}
          onClick={() => {
            window.location.href = `/products?page=${page + 1}`;
          }}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const page = Number(context.query.page) || 1;
  const limit = 6;

  const res = await fetch(
    `${process.env.API_URL}/products?page=${page}&limit=${limit}`
  );

  const data = await res.json();

  return {
    props: {
      products: data.products,
      page: data.page,
      pages: data.pages,
    },
  };
};

export default ProductListPage;
