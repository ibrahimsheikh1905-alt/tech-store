"use client"

import Link from "next/link"

const collections = [
  {
    id: 1,
    name: "Smart Watches",
    slug: "watches",
    description: "Luxury timepieces for the modern era",
    gradient: "from-blue-900/80 to-indigo-900/80",
  },
  {
    id: 2,
    name: "Audio Elite",
    slug: "earbuds",
    description: "Premium sound experiences",
    gradient: "from-emerald-900/80 to-teal-900/80",
  },
  {
    id: 3,
    name: "Essential Gadgets",
    slug: "gadgets",
    description: "Must-have tech for everyday life",
    gradient: "from-amber-900/80 to-orange-900/80",
  },
  {
    id: 4,
    name: "Power Accessories",
    slug: "accessories",
    description: "Power up your devices in style",
    gradient: "from-rose-900/80 to-pink-900/80",
  },
]

export default function CollectionsGrid() {
  return (
    <section className="py-20 lg:py-28 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-3xl lg:text-5xl font-bold tracking-tight mb-4">Shop by Category</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Explore our curated collections of premium tech products
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {collections.map((collection) => (
            <Link
              key={collection.id}
              href={`/products?category=${collection.slug}`}
              className="group relative aspect-[4/5] rounded-xl overflow-hidden bg-zinc-900"
            >
              {/* Gradient Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${collection.gradient} opacity-90`} />

              {/* Icon/Visual Element */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-24 h-24 lg:w-32 lg:h-32 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                  <div className="w-12 h-12 lg:w-16 lg:h-16 rounded-full bg-white/20" />
                </div>
              </div>

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-5 lg:p-6">
                <h3 className="text-lg lg:text-xl font-semibold text-white mb-1">{collection.name}</h3>
                <p className="text-sm text-white/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {collection.description}
                </p>
              </div>

              {/* Hover effect */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
