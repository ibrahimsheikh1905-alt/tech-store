"use client"

import Link from "next/link"

export default function FeaturedBanner() {
  return (
    <section className="relative py-20 lg:py-32 overflow-hidden bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-accent/5 rounded-full blur-2xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left Content */}
          <div className="text-center lg:text-left lg:max-w-xl">
            <span className="inline-block px-4 py-1.5 bg-accent/20 text-accent text-xs tracking-widest uppercase rounded-full border border-accent/30 mb-6">
              Limited Edition
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight text-white mb-6">
              Premium
              <span className="block text-accent">Audio Series</span>
            </h2>
            <p className="text-zinc-400 text-lg mb-8 max-w-md mx-auto lg:mx-0">
              Experience studio-quality sound with our flagship earbuds and headphones. Designed for audiophiles.
            </p>
            <div className="flex flex-wrap justify-center lg:justify-start gap-4">
              <Link
                href="/products?category=earbuds"
                className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-accent-foreground text-sm tracking-widest font-semibold hover:bg-accent/90 transition-all rounded-lg"
              >
                SHOP EARBUDS
              </Link>
              <Link
                href="/products?category=headphones"
                className="px-8 py-4 border border-zinc-600 text-white text-sm tracking-widest font-medium hover:bg-white/10 transition-all rounded-lg"
              >
                SHOP HEADPHONES
              </Link>
            </div>
          </div>

          {/* Right Product Display */}
          <div className="relative">
            <div className="relative w-72 h-72 lg:w-96 lg:h-96">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-transparent rounded-full blur-2xl" />
              <img
                src="/premium-black-wireless-earbuds-modern-design-produ.jpg"
                alt="Premium Earbuds"
                className="relative w-full h-full object-contain drop-shadow-2xl"
              />
            </div>
            {/* Floating price tag */}
            <div className="absolute -bottom-4 -right-4 lg:bottom-4 lg:right-0 bg-white text-zinc-900 px-6 py-3 rounded-lg shadow-xl">
              <span className="text-xs text-zinc-500 block">Starting at</span>
              <span className="text-2xl font-bold">Rs299</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
