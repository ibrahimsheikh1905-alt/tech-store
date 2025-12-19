"use client"

import Link from "next/link"
import { useCart } from "@/context/cart-context"
import Navbar from "@/components/navbar"
import CartItem from "@/components/cart-item"
import Footer from "@/components/footer"
import { ShoppingBag, ArrowRight } from "lucide-react"

export default function CartPage() {
  const { cart, cartTotal, clearCart } = useCart()

  // ✅ EMPTY CART
  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />

        <div className="max-w-lg mx-auto px-4 py-24 text-center">
          <ShoppingBag className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
          <h1 className="text-2xl mb-4">Your cart is empty</h1>

          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded"
          >
            Continue Shopping <ArrowRight />
          </Link>
        </div>

        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 py-12 grid md:grid-cols-3 gap-8">
        {/* CART ITEMS */}
        <div className="md:col-span-2 space-y-4">
          {cart.map((item) => (
            <CartItem key={item.cartId} item={item} />
          ))}
        </div>

        {/* SUMMARY */}
        <div className="bg-card p-6 rounded-lg h-fit sticky top-24">
          <h2 className="text-lg font-semibold mb-6">Summary</h2>

          <div className="flex justify-between mb-3 text-sm">
            <span>Subtotal</span>
            <span>Rs {cartTotal.toFixed(2)}</span>
          </div>

          <div className="border-t pt-4 mt-4 flex justify-between font-semibold">
            <span>Total</span>
            <span>Rs {cartTotal.toFixed(2)}</span>
          </div>

          {/* ✅ CHECKOUT BUTTON */}
          <Link
            href="/checkout"
            className="block w-full mt-6 py-3 text-center bg-primary text-primary-foreground rounded-lg tracking-widest hover:opacity-90 transition"
          >
            CHECKOUT
          </Link>

          {/* CLEAR CART */}
          <button
            onClick={clearCart}
            className="mt-3 w-full py-2 border rounded hover:bg-muted transition"
          >
            Clear Cart
          </button>
        </div>
      </div>

      <Footer />
    </div>
  )
}