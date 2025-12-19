"use client"

import Link from "next/link"
import { X, Heart, ShoppingBag, User } from "lucide-react"
import { useCart } from "@/context/cart-context"
import { useWishlist } from "@/context/wishlist-context"

export default function MobileMenu({ isOpen, onClose, links = [] }) {
  const { cartCount } = useCart()
  const { wishlistCount } = useWishlist()

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/50">
      <div className="absolute right-0 top-0 h-full w-72 bg-background shadow-xl p-6 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <span className="text-lg font-bold tracking-widest">
            TECH STORE
          </span>
          <button onClick={onClose}>
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Links */}
        <nav className="flex flex-col gap-4">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className="text-sm tracking-widest hover:text-accent"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="border-t my-6" />

        {/* Actions */}
        <div className="flex flex-col gap-4">
          <Link
            href="/wishlist"
            onClick={onClose}
            className="flex items-center gap-3"
          >
            <Heart className="w-5 h-5" />
            Wishlist ({wishlistCount})
          </Link>

          <Link
            href="/cart"
            onClick={onClose}
            className="flex items-center gap-3"
          >
            <ShoppingBag className="w-5 h-5" />
            Cart ({cartCount})
          </Link>

          {/* Optional Login page (UI only) */}
          <Link
            href="/login"
            onClick={onClose}
            className="flex items-center gap-3 text-muted-foreground"
          >
            <User className="w-5 h-5" />
            Account
          </Link>
        </div>
      </div>
    </div>
  )
}