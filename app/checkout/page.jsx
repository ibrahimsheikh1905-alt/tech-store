"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useCart } from "@/context/cart-context"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function CheckoutPage() {
  const router = useRouter()
  const { cart, cartTotal, clearCart } = useCart()

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    city: "",
    address: "",
    notes: "",
  })

  const [loading, setLoading] = useState(false)

  // ✅ ONLY ON FIRST LOAD
  useEffect(() => {
    if (cart.length === 0) {
      router.replace("/cart")
    }
  }, []) // ❗ cart dependency removed

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!form.name || !form.phone || !form.city || !form.address) {
      alert("Please fill all required fields")
      return
    }

    setLoading(true)

    // ✅ SAVE ORDER BEFORE CLEARING CART
    localStorage.setItem(
      "lastOrder",
      JSON.stringify({
        customer: form,
        items: cart,
        total: cartTotal,
        date: new Date().toISOString(),
      })
    )

    clearCart()

    // ✅ DELAY FIX (IMPORTANT)
    setTimeout(() => {
      router.replace("/success")
    }, 100)
  }

  if (cart.length === 0) return null

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 py-12 grid md:grid-cols-3 gap-8">
        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="md:col-span-2 bg-card p-6 rounded-xl space-y-5"
        >
          <h1 className="text-2xl font-semibold">Checkout</h1>

          <input name="name" placeholder="Full Name *" value={form.name} onChange={handleChange} className="w-full p-3 rounded bg-muted" />
          <input name="phone" placeholder="Phone *" value={form.phone} onChange={handleChange} className="w-full p-3 rounded bg-muted" />
          <input name="email" placeholder="Email (optional)" value={form.email} onChange={handleChange} className="w-full p-3 rounded bg-muted" />
          <input name="city" placeholder="City *" value={form.city} onChange={handleChange} className="w-full p-3 rounded bg-muted" />

          <textarea name="address" placeholder="Address *" rows={4} value={form.address} onChange={handleChange} className="w-full p-3 rounded bg-muted" />
          <textarea name="notes" placeholder="Notes (optional)" rows={3} value={form.notes} onChange={handleChange} className="w-full p-3 rounded bg-muted" />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-primary text-primary-foreground rounded-lg"
          >
            {loading ? "PLACING ORDER..." : "PLACE ORDER (COD)"}
          </button>
        </form>

        {/* SUMMARY */}
        <div className="bg-card p-6 rounded-xl h-fit">
          <h2 className="font-semibold mb-4">Order Summary</h2>

          {cart.map((item) => (
            <div key={item.cartId} className="flex justify-between text-sm mb-2">
              <span>{item.name} × {item.quantity}</span>
              <span>Rs {(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}

          <div className="border-t pt-4 flex justify-between font-semibold">
            <span>Total</span>
            <span>Rs {cartTotal.toFixed(2)}</span>
          </div>

          <p className="text-xs text-muted-foreground mt-2">
            Payment Method: <b>Cash on Delivery</b>
          </p>
        </div>
      </div>

      <Footer />
    </div>
  )
}