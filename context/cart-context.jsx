"use client"

import { createContext, useContext, useEffect, useState } from "react"

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [cart, setCart] = useState([])

  // LOAD FROM LOCALSTORAGE
  useEffect(() => {
    const saved = localStorage.getItem("cart")
    if (saved) setCart(JSON.parse(saved))
  }, [])

  // SAVE TO LOCALSTORAGE
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart))
  }, [cart])

  const addToCart = (product, quantity = 1, variants = {}) => {
    setCart((prev) => {
      const index = prev.findIndex(
        (i) => i.id === String(product.id)
      )

      if (index !== -1) {
        const copy = [...prev]
        copy[index].quantity += quantity
        return copy
      }

      return [
        ...prev,
        {
          ...product,
          id: String(product.id),
          quantity,
          variants,
          cartId: Date.now(),
        },
      ]
    })
  }

  // 🔥 THIS WAS MISSING / OLD
  const updateQuantity = (cartId, qty) => {
    if (qty < 1) {
      setCart((prev) => prev.filter((i) => i.cartId !== cartId))
      return
    }

    setCart((prev) =>
      prev.map((i) =>
        i.cartId === cartId ? { ...i, quantity: qty } : i
      )
    )
  }

  const removeFromCart = (cartId) => {
    setCart((prev) => prev.filter((i) => i.cartId !== cartId))
  }

  const clearCart = () => setCart([])

  const cartCount = cart.reduce((s, i) => s + i.quantity, 0)
  const cartTotal = cart.reduce(
    (s, i) => s + i.price * i.quantity,
    0
  )

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity, // ✅ MUST BE HERE
        removeFromCart,
        clearCart,
        cartCount,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error("useCart must be inside CartProvider")
  return ctx
}