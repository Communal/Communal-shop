"use client";
import CartSummary from "@/components/CartSummary";
import { useCartStore } from "@/store/cart";

export default function CartPage() {
  const { items, removeFromCart, clearCart, getTotalItems, getTotalAmount } =
    useCartStore();

  const proceedToCheckout = () => {};

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">🛒 Your Cart</h1>

      {items.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item._id}
              className="flex justify-between items-center border-b pb-2"
            >
              <div>
                <h2 className="font-semibold">{item.name}</h2>
                <p>
                  ₦{item.price.toLocaleString()} × {item.quantity}
                </p>
              </div>
              <button
                onClick={() => removeFromCart(item._id)}
                className="text-red-500 hover:underline"
              >
                Remove
              </button>
            </div>
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
