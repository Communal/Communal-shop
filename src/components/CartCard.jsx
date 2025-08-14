// components/CartProductCard.jsx
"use client";
import { useCartStore } from "@/store/cart";

export default function CartProductCard({ item }) {
  const removeItem = useCartStore((state) => state.removeItem);

  return (
    <div className="bg-white rounded-lg shadow p-4 w-full max-w-md">
      {/* Top Section */}
      <div className="flex items-center gap-2 mb-2">
        <span className="font-semibold text-orange-500">
          {item?.name || "Product"}
        </span>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-700 mb-3">{item?.name}</p>

      {/* Price Row */}
      <div className="flex justify-between items-center border-t pt-2">
        <span className="font-medium">Price in USD:</span>
        <span className="bg-orange-500 text-white px-3 py-1 rounded">
          ${item?.price}
        </span>
      </div>

      {/* Remove Button */}
      <button
        onClick={() => removeItem(item._id)}
        className="mt-3 bg-red-500 text-white px-4 py-1 rounded flex items-center gap-1"
      >
        🗑 Remove
      </button>
    </div>
  );
}
