import { GetServerSideProps } from "next";
import MainLayout from "@/components/layout/MainLayout";
import ProductCard from "@/components/ProductCard";
import { Product } from "@/types/Product";

interface ProductListPageProps {
  products: Product[];
}

const ProductListPage = ({ products }: ProductListPageProps) => {
  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-8 text-center">Our Cakes 🍰</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  
  const res = await fetch(`${process.env.API_URL}/products`);
  console.log(res);
  const products: Product[] = await res.json();

  return {
    props: {
      products,
    },
  };
};

export default ProductListPage;
