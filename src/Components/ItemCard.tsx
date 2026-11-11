import { useState } from "react";
import type { ClothingProduct } from "../data/data";

interface ItemCardProps extends ClothingProduct {
    onAddToCart: (product: ClothingProduct, quantity: number) => void;
}

export default function ItemCard({ onAddToCart, ...products }: ItemCardProps) {
    const [selectedQuantity, setSelectedQuantity] = useState<number>(0);

    
    const handleIncrement = () => {
        if (selectedQuantity < products.quantity) {
            setSelectedQuantity(selectedQuantity + 1);
        }
    };


    const handleDecrement = () => {
        if (selectedQuantity > 0) {
            setSelectedQuantity(selectedQuantity - 1);
        }
    };


    const handleAddClick = () => {
        if (selectedQuantity > 0 && selectedQuantity <= products.quantity) {
            onAddToCart(products, selectedQuantity);
            setSelectedQuantity(0);
        }
    };


    const isOutOfStock = products.quantity === 0;

    return <div className="itemcard">
        <img src={products.image} alt={products.name} />
        <h3>{products.name}</h3>
        <p>{products.description}</p>
        <p>fit: {products.fit}</p>
        <p>size: {products.size}</p>
        <p>color: {products.color}</p>
        <p>category: {products.category}</p>
        <p>${products.price.toFixed(2)}</p>
        <p>stock: {isOutOfStock ? "Out of Stock" : `In Stock (${products.quantity})`}</p>
        <p>Selected: {selectedQuantity}</p>

        {!isOutOfStock ? (
            <button onClick={handleAddClick}>
                Add to Cart
            </button>
        ) : (
            <button disabled>
                Add to Cart
            </button>
        )}

        <button onClick={handleDecrement} disabled={selectedQuantity === 0}>
            -
        </button>

        <button onClick={handleIncrement} disabled={selectedQuantity === products.quantity}>
            +
        </button>
    </div>
}