import { useState } from "react";
import {
  products as initialProducts,
  type ClothingProduct,
} from "../data/data";
import ItemsContainer from "./ItemsContainer";
import CheckoutContainer from "./CheckoutContainer";

export default function ThriftHappens() {
  const [products, setProducts] = useState<ClothingProduct[]>(initialProducts);
  const [checkoutItems, setCheckoutItems] = useState<ClothingProduct[]>([]);
  const handleAddToCart = (product: ClothingProduct, quantityToAdd: number) => {
    if (quantityToAdd <= 0 || quantityToAdd > product.quantity) return;
    


    setCheckoutItems((prevCart) => {
        const existingItem = prevCart.find((item) => item.id === product.id);
        if (existingItem) {
            return prevCart.map((item) => {
                if (item.id === product.id) {
                    return { ...item, itemQuantity: item.itemQuantity + quantityToAdd };
                }
                else {
                    return {...item}
                }
            });
        } else {
            return [...prevCart, { ...product, itemQuantity: quantityToAdd }];
        }
    });



    setProducts((prevProducts) =>
        prevProducts.map((p) =>
            p.id === product.id
                ? { ...p, quantity: p.quantity - quantityToAdd }
                : p
        )
    );
  }



  const handleRemoveItem = (id: number) => {
    const removedItem = checkoutItems.find((item) => item.id === id);
    if (!removedItem) return;

    setProducts((prevProducts) => 
        prevProducts.map((product) => 
            product.id === id
                ? { ...product, quantity: product.quantity + removedItem.itemQuantity }
                : product
        )
    );
    setCheckoutItems((prev) => prev.filter((item) => item.id !== id));
};


    const handleEmptyCheckout = () => {
        setProducts((prevProducts) =>
            prevProducts.map((product) => {
                const checkoutItem = checkoutItems.find((item) => item.id === product.id);
                if (checkoutItem) {
                    return { ...product, quantity: product.quantity + checkoutItem.itemQuantity };
                }   
            return product;
            }
        )
    );
        setCheckoutItems([]);
  };



  return (
    <div>
      <div>
        <ItemsContainer products={products} onAddToCart={handleAddToCart} />
        <CheckoutContainer
          checkoutItems={checkoutItems}
          onRemoveItem={handleRemoveItem}
          onEmptyCheckout={handleEmptyCheckout}
        />
      </div>
    </div>
  );
}