"use client";

import Image from "next/image";
import { Heart } from "lucide-react";
import { getProductPrice } from "@/lib/product-price";

export default function WishlistItem({ product, onToggle }) {
  // 🔥 SAME PRICE LOGIC EVERYWHERE
  const price = getProductPrice(product);

  return (
    <div className="flex gap-4 py-4 border-b">
      {/* IMAGE */}
      <div className="w-24 h-24 bg-muted rounded overflow-hidden">
        <Image
          src={product.images?.[0]?.url || "/placeholder.png"}
          alt={product.name}
          width={96}
          height={96}
          className="object-cover w-full h-full"
        />
      </div>

      {/* INFO */}
      <div className="flex-1">
        <h3 className="font-semibold">{product.name}</h3>

        {/* ✅ PRICE FIXED */}
        <p className="text-lg font-bold mt-1">
          Rs {price}
        </p>

        <button
          onClick={() => onToggle(product._id)}
          className="mt-2 text-red-500 flex items-center gap-1 text-sm"
        >
          <Heart size={14} /> Remove
        </button>
      </div>
    </div>
  );
}