"use client";
import CartSummary from "@/components/CartSummary";
import CartCard from "@/components/CartCard";
import { useCartStore } from "@/store/cart";

export default function CartPage() {
  const { items, removeFromCart, clearCart, getTotalItems, getTotalAmount } =
    useCartStore();

  const proceedToCheckout = () => {};

  return (
    <div className="p-2">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>

      {items.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {items.map((item) => (
            <CartCard
              key={item._id}
              item={item}
              removeItem={() => removeFromCart(item._id)}
            />
          ))}

          {/* Summary Component */}
          <CartSummary
            onClick={proceedToCheckout}
            totalAmount={getTotalAmount()}
            totalItems={getTotalItems()}
          />
        </div>
      )}
    </div>
  );
}
