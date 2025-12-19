"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { CheckCircle } from "lucide-react"

export default function SuccessPage() {
  const [order, setOrder] = useState(null)

  useEffect(() => {
    const saved = localStorage.getItem("lastOrder")
    if (saved) {
      setOrder(JSON.parse(saved))
    }
  }, [])

  if (!order) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="max-w-lg mx-auto px-4 py-24 text-center">
          <p className="text-muted-foreground">
            No order found. Please place an order first.
          </p>
          <Link
            href="/products"
            className="inline-block mt-6 px-6 py-3 bg-primary text-primary-foreground rounded"
          >
            Go Shopping
          </Link>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />

        <h1 className="text-3xl font-bold mb-3">
          Order Placed Successfully 🎉
        </h1>

        <p className="text-muted-foreground mb-8">
          Thank you <b>{order.customer.name}</b>!  
          Your order has been received.
        </p>

        {/* ORDER SUMMARY */}
        <div className="bg-card rounded-xl p-6 text-left space-y-3">
          <h2 className="font-semibold text-lg mb-2">Order Summary</h2>

          {order.items.map((item) => (
            <div
              key={item.cartId}
              className="flex justify-between text-sm"
            >
              <span>
                {item.name} × {item.quantity}
              </span>
              <span>
                Rs {(item.price * item.quantity).toFixed(2)}
              </span>
            </div>
          ))}

          <div className="border-t pt-3 flex justify-between font-semibold">
            <span>Total</span>
            <span>Rs {order.total.toFixed(2)}</span>
          </div>

          <p className="text-xs text-muted-foreground mt-2">
            Payment Method: <b>Cash on Delivery</b>
          </p>
        </div>

        <Link
          href="/products"
          className="inline-block mt-10 px-8 py-3 bg-primary text-primary-foreground rounded-lg"
        >
          Continue Shopping
        </Link>
      </div>

      <Footer />
    </div>
  )
}