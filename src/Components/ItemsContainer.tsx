import type { ClothingProduct } from "../data/data";
import ItemCard from "./ItemCard";

interface ItemsContainerProps {
  products: ClothingProduct[];
  onAddToCart: (product: ClothingProduct, quantity: number) => void;
}

export default function ItemsContainer({ products, onAddToCart }: ItemsContainerProps) {
  return (
    <div className="itemscontainer">
        <h2>Products</h2>  
        {products.length === 0 ? (
            <p>No products available.</p>
        ) : (
            <p>Available products: {products.length}</p>
        )}
      {products.map((product) => (
        <ItemCard key={product.id} {...product} onAddToCart={onAddToCart} />
      ))}
    </div>
  );
}