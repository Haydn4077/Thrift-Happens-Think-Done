import type {ClothingProduct} from "../data/data";

interface CheckoutCardProps extends ClothingProduct {
    onRemoveItem: (id: number) => void;
}

export default function CheckoutCard({
  id,
  name,
  image,
  price,
  itemQuantity,
  onRemoveItem,
}: CheckoutCardProps) {
    return (
        <div className="checkoutcard">
            <img src={image} alt={name} />
            <h3>{name}</h3>
            <p>Unit Price: ${price.toFixed(2)}</p>
            <p>Quantity: {itemQuantity}</p>
            <p>SubTotal: ${(price * itemQuantity).toFixed(2)}</p>
            <button onClick={() => onRemoveItem(id)}>Remove</button>
        </div>
    );
}
