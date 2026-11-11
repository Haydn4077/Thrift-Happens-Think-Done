import type { ClothingProduct } from "../data/data";
import CheckoutCard from "./CheckoutCard";

interface CheckoutContainerProps {
    checkoutItems: ClothingProduct[];
    onRemoveItem: (id: number) => void;
    onEmptyCheckout: () => void;
}

export default function CheckoutContainer({
    checkoutItems,
    onRemoveItem,
    onEmptyCheckout,
}: CheckoutContainerProps) {
    const totalPrice = checkoutItems.reduce(
        (total, item) => total + item.price * item.itemQuantity,
        0
    );

    return (
        <div className="checkoutcontainer">
            <h2>Checkout</h2>
            {checkoutItems.length === 0 ? (
                <p>Cart is empty</p>
            ) : (
                checkoutItems.map((item) => (
                    <CheckoutCard
                        key={item.id}
                        {...item}
                        onRemoveItem={onRemoveItem}
                    />
                ))
            )}
            {checkoutItems.length > 0 && (
                <div>
                    <p>GrandTotal Price: ${totalPrice.toFixed(2)}</p>
                    <button onClick={onEmptyCheckout}>Empty Checkout</button>
                </div>
            )}
            </div>
    );
}
