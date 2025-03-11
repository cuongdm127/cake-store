import MainLayout from '@/components/layout/MainLayout';
import ProductCard from '@/components/ProductCard';
import { products } from '@/data/products';

const ProductListPage = () => {
  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-8 text-center">Our Cakes 🍰</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default ProductListPage;
