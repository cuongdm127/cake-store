import { Product } from "@/data/products";
import Image from "next/image";
import { useCart } from "@/context/CartContext";

type ProductCardProps = {
  product: Product;
};

const ProductCard = ({ product }: ProductCardProps) => {
  const { addItem } = useCart();

  return (
    <div className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden">
      <Image
        src={product.image}
        width={300}
        height={200}
        alt={product.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
        <p className="text-sm text-gray-600 mb-4">{product.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-pink-600 font-bold text-lg">
            ${product.price}
          </span>
          <button
            onClick={() => addItem(product)}
            className="bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700 transition"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
