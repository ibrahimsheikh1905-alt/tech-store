"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useCart } from "@/context/cart-context"
import { useWishlist } from "@/context/wishlist-context"
import {
  Search,
  User,
  ShoppingBag,
  Menu,
  X,
  Heart,
} from "lucide-react"
import MobileMenu from "./mobile-menu"

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [userMenuOpen, setUserMenuOpen] = useState(false)

  // ✅ AUTH REMOVED
  const isAuthenticated = false
  const user = null

  const { cartCount } = useCart()
  const { wishlistCount } = useWishlist()
  const router = useRouter()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { href: "/", label: "HOME" },
    { href: "/products", label: "SHOP" },
    { href: "/products?category=watches", label: "WATCHES" },
    { href: "/products?category=earbuds", label: "EARBUDS" },
    { href: "/products?category=gadgets", label: "GADGETS" },
  ]

  const handleSearch = (e) => {
    e.preventDefault()
    if (!searchQuery.trim()) return
    router.push(`/products?search=${encodeURIComponent(searchQuery)}`)
    setSearchQuery("")
    setSearchOpen(false)
  }

  return (
    <>
      {/* Announcement */}
      <div className="bg-accent text-accent-foreground py-2 text-center text-xs tracking-widest">
        FREE SHIPPING • UP TO 45% OFF • LIMITED TIME
      </div>

      {/* Navbar */}
      <nav
        className={`sticky top-0 z-50 transition-all ${
          scrolled
            ? "bg-background/95 backdrop-blur border-b shadow-sm"
            : "bg-background border-b"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-lg font-bold tracking-widest">
            TECH STORE
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex gap-8">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-xs tracking-widest text-muted-foreground hover:text-foreground"
              >
                {l.label}
              </Link>
            ))}
          </div>

          {/* Icons */}
          <div className="flex items-center gap-2">
            {/* Search */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 hover:bg-muted rounded-full"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist */}
            <Link href="/wishlist" className="relative p-2 hover:bg-muted rounded-full">
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="badge">{wishlistCount}</span>
              )}
            </Link>

            {/* Cart */}
            <Link href="/cart" className="relative p-2 hover:bg-muted rounded-full">
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="badge">{cartCount}</span>
              )}
            </Link>

            {/* Account (Optional UI only) */}
            <button
              onClick={() => router.push("/login")}
              className="p-2 hover:bg-muted rounded-full"
            >
              <User className="w-5 h-5" />
            </button>

            {/* Mobile menu */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 hover:bg-muted rounded-full"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Search Bar */}
        {searchOpen && (
          <form
            onSubmit={handleSearch}
            className="border-t p-4 bg-background"
          >
            <input
              autoFocus
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="w-full bg-muted px-4 py-3 rounded-full outline-none"
            />
          </form>
        )}
      </nav>

      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        links={navLinks}
      />

      <style jsx>{`
        .badge {
          position: absolute;
          top: -4px;
          right: -4px;
          background: red;
          color: white;
          font-size: 10px;
          padding: 2px 6px;
          border-radius: 999px;
        }
      `}</style>
    </>
  )
}