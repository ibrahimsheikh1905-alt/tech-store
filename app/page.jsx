"use client"

import { AuthProvider } from "@/context/auth-context"
import { CartProvider } from "@/context/cart-context"
import { WishlistProvider } from "@/context/wishlist-context"
import Navbar from "@/components/navbar"
import Hero from "@/components/hero"
import ProductGrid from "@/components/product-grid"
import FeaturedBanner from "@/components/featured-banner"
import CollectionsGrid from "@/components/collections-grid"
import Footer from "@/components/footer"
import { products } from "@/lib/mock-data"
import { Truck, Shield, RotateCcw, Headphones } from "lucide-react"

function HomePage() {
  const hotSelling = products.slice(0, 4)
  const newArrivals = products.slice(4, 8)

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <Hero />

      {/* Hot Selling Section */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-accent text-sm tracking-widest uppercase">Best Sellers</span>
            <h2 className="text-3xl lg:text-5xl font-bold mt-2 tracking-tight">Hot Selling</h2>
          </div>
          <ProductGrid products={hotSelling} />
        </div>
      </section>

      {/* Featured Banner */}
      <FeaturedBanner />

      {/* Collections Grid */}
      <CollectionsGrid />

      {/* New Arrivals Section */}
      <section className="py-20 lg:py-28 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-accent text-sm tracking-widest uppercase">Just Arrived</span>
            <h2 className="text-3xl lg:text-5xl font-bold mt-2 tracking-tight">New Arrivals</h2>
          </div>
          <ProductGrid products={newArrivals} />
        </div>
      </section>

      {/* Trust Section - Improved design with icons */}
      <section className="py-20 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {[
              { icon: Truck, title: "Free Shipping", desc: "On orders over $100" },
              { icon: Shield, title: "Secure Payment", desc: "100% secure checkout" },
              { icon: RotateCcw, title: "Easy Returns", desc: "30 day return policy" },
              { icon: Headphones, title: "24/7 Support", desc: "Expert assistance" },
            ].map((item) => (
              <div key={item.title} className="text-center group">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-muted mb-4 group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                  <item.icon className="w-6 h-6" />
                </div>
                <h4 className="font-semibold mb-1 text-foreground">{item.title}</h4>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default function Page() {
  return (
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <HomePage />
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  )
}
