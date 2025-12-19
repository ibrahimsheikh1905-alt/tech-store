"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Heart, Eye, ShoppingCart } from "lucide-react"
import { useWishlist } from "@/context/wishlist-context"
import { useCart } from "@/context/cart-context"
import { useAuth } from "@/context/auth-context"

export default function ProductCard({ product }) {
  const [isHovered, setIsHovered] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)

  const router = useRouter()
  const { toggleWishlist, isInWishlist } = useWishlist()
  const { addToCart } = useCart()
  const { isAuthenticated, setPendingProduct } = useAuth()

  const isLiked = isInWishlist(product.id)

  const discount = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      )
    : 0

  const handleCardClick = () => {
    router.push(`/product/${product.id}`)
  }

  const handleAddToCart = (e) => {
    e.stopPropagation()
    if (!isAuthenticated) {
      setPendingProduct(product)
      router.push("/login")
      return
    }
    addToCart(product, 1)
  }

  const handleWishlistToggle = (e) => {
    e.stopPropagation()
    toggleWishlist(product)
  }

  return (
    <div
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image */}
      <div
        className="relative aspect-[3/4] overflow-hidden bg-card rounded-xl cursor-pointer"
        onClick={handleCardClick}
      >
        {!imageLoaded && (
          <div className="absolute inset-0 bg-muted animate-pulse" />
        )}

        <img
          src={product.images?.[0] || "/placeholder.svg"}
          alt={product.name}
          onLoad={() => setImageLoaded(true)}
          className={`w-full h-full object-cover transition-all duration-700 ${
            isHovered ? "scale-110" : "scale-100"
          } ${imageLoaded ? "opacity-100" : "opacity-0"}`}
        />

        {product.images?.[1] && (
          <img
            src={product.images[1]}
            alt={product.name}
            className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${
              isHovered ? "opacity-100 scale-110" : "opacity-0 scale-100"
            }`}
          />
        )}

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {discount > 0 && (
            <span className="px-3 py-1 bg-red-500 text-white text-xs rounded-full">
              -{discount}%
            </span>
          )}
          {product.isNew && (
            <span className="px-3 py-1 bg-accent text-accent-foreground text-xs rounded-full">
              NEW
            </span>
          )}
        </div>

        {/* Wishlist */}
        <button
          onClick={handleWishlistToggle}
          className={`absolute top-3 right-3 p-2 rounded-full ${
            isLiked
              ? "bg-red-500 text-white"
              : "bg-background/80 text-foreground"
          }`}
        >
          <Heart className={`w-4 h-4 ${isLiked ? "fill-current" : ""}`} />
        </button>

        {/* Hover actions */}
        <div
          className={`absolute bottom-0 left-0 right-0 p-4 transition-all ${
            isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <div className="flex gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation()
                router.push(`/product/${product.id}`)
              }}
              className="flex-1 flex items-center justify-center gap-2 py-3 bg-background rounded-lg"
            >
              <Eye className="w-4 h-4" /> Quick View
            </button>

            <button
              onClick={handleAddToCart}
              className="p-3 bg-accent text-accent-foreground rounded-lg"
            >
              <ShoppingCart className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="mt-4 space-y-2">
        <p className="text-xs text-muted-foreground uppercase">
          {product.brand}
        </p>

        <h3
          onClick={handleCardClick}
          className="text-sm font-medium hover:text-accent cursor-pointer"
        >
          {product.name}
        </h3>

        {/* ✅ PRICE FIXED TO RS */}
        <div className="flex items-center gap-3">
          <span className="text-base font-bold">
            Rs {product.price.toFixed(2)}
          </span>

          {product.originalPrice && (
            <span className="text-sm line-through text-muted-foreground">
              Rs {product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>

        {/* Rating */}
        {product.rating && (
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <span key={i} className={i < product.rating ? "text-yellow-400" : "text-muted"}>
                ★
              </span>
            ))}
            <span className="text-xs text-muted-foreground">
              ({product.reviews})
            </span>
          </div>
        )}
      </div>
    </div>
  )
}