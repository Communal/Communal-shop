"use client";
import React from "react";
import Button from "./Button";
import { useCartStore } from "../store/cart";

const ProductCard = ({ product }) => {
  const { _id, name, icon, info, stock, price } = product;
  const id = _id; // explicitly use _id from MongoDB

  const addItem = useCartStore((state) => state.addItem);
  const removeItem = useCartStore((state) => state.removeItem);
  const items = useCartStore((state) => state.items);

  // DEBUG LOGS
  console.log("Rendering ProductCard for:", name);
  console.log("Product ID:", id);
  console.log("Cart Items:", items);
  console.log(
    "Is in cart:",
    items.some((i) => i.id === id)
  );

  const isInCart = items.some((i) => i.id === id);

  const handleAddToCart = () => {
    addItem({ id });
  };

  const handleRemoveFromCart = () => {
    removeItem(id);
  };

  const buyNow = () => {
    alert("hello");
  };

  return (
    <div className="w-full max-w-2xl rounded-2xl bg-background-2 shadow-md py-2 flex flex-col gap-0.5 mb-6">
      <div className="flex items-center justify-between px-3 pt-2 pb-1">
        <div className="flex items-center gap-2">
          {icon}
          <span className="text-xl font-bold text-foreground">{name}</span>
        </div>
      </div>

      <div className="bg-foreground text-black px-3 py-3 text-base font-medium rounded-t-none rounded-b-none">
        {product?.info}
      </div>

      <div className="bg-foreground px-3 py-3 flex flex-col gap-2">
        <div className="flex items-center justify-between mt-1">
          <span className="font-semibold text-lg text-neutral-100">
            Price in USD :
          </span>
          <span className="bg-[#e6e6e6] text-foreground font-bold text-lg px-6 py-1 rounded-xl border-2 border-white">
            ${price}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between px-3 py-3">
        <Button onClick={buyNow}>Buy Now</Button>
        {isInCart ? (
          <Button onClick={handleRemoveFromCart}>Remove Item</Button>
        ) : (
          <Button onClick={handleAddToCart}>Add to Cart</Button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
