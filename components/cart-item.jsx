"use client"

import Link from "next/link"
import { Minus, Plus, X } from "lucide-react"
import { useCart } from "@/context/cart-context"

export default function CartItem({ item }) {
  const { updateQuantity, removeFromCart } = useCart()

  return (
    <div className="flex gap-4 py-6 border-b border-border">
      {/* Image */}
      <Link href={`/product/${item.id}`} className="flex-shrink-0">
        <div className="w-24 h-24 bg-muted rounded-lg overflow-hidden">
          <img
            src={item.images?.[0] || "/placeholder.svg"}
            alt={item.name}
            className="w-full h-full object-cover"
          />
        </div>
      </Link>

      {/* Details */}
      <div className="flex-1 flex flex-col">
        <div className="flex justify-between">
          <div>
            <p className="text-xs text-muted-foreground uppercase">
              {item.brand}
            </p>
            <Link href={`/product/${item.id}`}>
              <h3 className="font-medium hover:text-accent">
                {item.name}
              </h3>
            </Link>
          </div>

          <button
            onClick={() => removeFromCart(item.cartId)}
            className="p-1 hover:bg-muted rounded"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Bottom */}
        <div className="mt-auto flex items-center justify-between">
          {/* Quantity */}
          <div className="flex items-center border rounded-lg">
            <button
              onClick={() =>
                updateQuantity(item.cartId, item.quantity - 1)
              }
              className="p-2 hover:bg-muted"
            >
              <Minus className="w-4 h-4" />
            </button>

            <span className="px-4">{item.quantity}</span>

            <button
              onClick={() =>
                updateQuantity(item.cartId, item.quantity + 1)
              }
              className="p-2 hover:bg-muted"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* Price (RUPEES) */}
          <div className="text-right">
            <p className="font-semibold">
              Rs {(item.price * item.quantity).toFixed(2)}
            </p>
            {item.quantity > 1 && (
              <p className="text-xs text-muted-foreground">
                Rs {item.price.toFixed(2)} each
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}