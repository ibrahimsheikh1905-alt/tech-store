"use client"

import { useState, useMemo } from "react"
import { useParams, useRouter } from "next/navigation"
import { useCart } from "@/context/cart-context"
import { useWishlist } from "@/context/wishlist-context"
import Navbar from "@/components/navbar"
import ProductGallery from "@/components/product-gallery"
import ProductGrid from "@/components/product-grid"
import Footer from "@/components/footer"
import { products } from "@/lib/mock-data"
import {
  Star,
  Truck,
  Shield,
  RotateCcw,
  Minus,
  Plus,
  Loader2,
  Heart,
} from "lucide-react"

export default function ProductDetailsPage() {
  const { id } = useParams()
  const router = useRouter()

  const { addToCart } = useCart()
  const { toggleWishlist, isInWishlist } = useWishlist()

  const product = products.find((p) => p.id === Number(id))
  const isLiked = product ? isInWishlist(product.id) : false

  const [quantity, setQuantity] = useState(1)
  const [addedToCart, setAddedToCart] = useState(false)

  const relatedProducts = useMemo(() => {
    if (!product) return []
    return products
      .filter((p) => p.category === product.category && p.id !== product.id)
      .slice(0, 4)
  }, [product])

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center text-muted-foreground">
        Product not found
      </div>
    )
  }

  const handleAddToCart = () => {
    addToCart(product, quantity)
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 1500)
    router.push("/cart")
  }

  const discount =
    product.originalPrice && product.originalPrice > product.price
      ? Math.round(
          ((product.originalPrice - product.price) /
            product.originalPrice) *
            100
        )
      : 0

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="max-w-7xl mx-auto px-4 py-10 grid lg:grid-cols-2 gap-12">
        {/* Gallery */}
        <ProductGallery
          images={product.images}
          productName={product.name}
        />

        {/* Info */}
        <div className="space-y-6">
          <div className="flex justify-between items-start">
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <button onClick={() => toggleWishlist(product.id)}>
              <Heart
                className={`w-6 h-6 ${
                  isLiked ? "fill-red-500 text-red-500" : ""
                }`}
              />
            </button>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(product.rating)
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-muted-foreground"
                }`}
              />
            ))}
            <span className="text-sm text-muted-foreground">
              ({product.reviews} reviews)
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-4">
            <span className="text-3xl font-bold">
              Rs {product.price}
            </span>

            {product.originalPrice && (
              <>
                <span className="line-through text-muted-foreground">
                  Rs {product.originalPrice}
                </span>
                <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">
                  SAVE {discount}%
                </span>
              </>
            )}
          </div>

          {/* Quantity */}
          <div className="flex gap-4">
            <div className="flex items-center border rounded-lg">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-3"
              >
                <Minus />
              </button>
              <span className="px-4">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="p-3"
              >
                <Plus />
              </button>
            </div>

            <button
              onClick={handleAddToCart}
              className="flex-1 bg-primary text-primary-foreground rounded-lg py-3"
            >
              {addedToCart ? "ADDED ✓" : "ADD TO CART"}
            </button>
          </div>

          {/* Trust */}
          <div className="grid grid-cols-3 gap-4 pt-6 border-t">
            <div className="text-center">
              <Truck className="mx-auto" /> Free Shipping
            </div>
            <div className="text-center">
              <Shield className="mx-auto" /> Warranty
            </div>
            <div className="text-center">
              <RotateCcw className="mx-auto" /> Easy Returns
            </div>
          </div>
        </div>
      </section>

      {/* Related */}
      {relatedProducts.length > 0 && (
        <section className="py-16 bg-muted">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8 text-center">
              You May Also Like
            </h2>
            <ProductGrid products={relatedProducts} />
          </div>
        </section>
      )}

      <Footer />
    </div>
  )
}