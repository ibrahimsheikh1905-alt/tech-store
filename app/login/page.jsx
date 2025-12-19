"use client"

import Link from "next/link"
import { AuthProvider } from "@/context/auth-context"
import { CartProvider } from "@/context/cart-context"
import { WishlistProvider } from "@/context/wishlist-context"
import LoginForm from "@/components/login-form"

function LoginPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="p-6 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold tracking-[0.2em]">
          TECH STORE
        </Link>
        <Link href="/signup" className="text-sm text-accent hover:underline">
          Create account
        </Link>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <LoginForm />
      </main>

      {/* Footer */}
      <footer className="p-6 text-center text-xs text-muted-foreground">© 2025 TECH STORE. All rights reserved.</footer>
    </div>
  )
}

export default function Page() {
  return (
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <LoginPage />
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  )
}
