"use client";
import { useEffect, useState } from "react";
import BackHome from "../../../components/Home";
import CartProductCard from "../../../components/CartProductCard";
import { useCartStore } from "../../../store/cart";

export default function CartPage() {
  const cartItems = useCartStore((state) => state.items); // IDs in cart
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (cartItems.length > 0) {
      // Send the IDs in the cart to your API
      fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids: cartItems.map((item) => item.id) }),
      })
        .then((res) => res.json())
        .then((data) => {
          setProducts(data); // products from DB
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    } else {
      setProducts([]);
      setLoading(false);
    }
  }, [cartItems]);

  return (
    <div className="min-h-screen bg-[#fffaf0] flex flex-col">
      <BackHome />

      <main className="flex-1 px-2 py-6 flex flex-col items-center gap-6">
        {loading ? (
          <p>Loading cart...</p>
        ) : products.length > 0 ? (
          products.map((product) => (
            <CartProductCard key={product._id} item={product} />
          ))
        ) : (
          <p>No items in cart</p>
        )}
      </main>
    </div>
  );
}
