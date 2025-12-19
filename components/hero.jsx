"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react"

const slides = [
  {
    id: 1,
    subtitle: "New Collection 2025",
    title: "SMART WATCH",
    titleLine2: "SERIES X",
    description: "Experience the future on your wrist with advanced health tracking and seamless connectivity",
    cta: "SHOP NOW",
    link: "/products?category=watches",
    bgColor: "from-zinc-900 via-zinc-800 to-zinc-900",
  },
  {
    id: 2,
    subtitle: "Premium Audio",
    title: "EARBUDS PRO",
    titleLine2: "MAX",
    description: "Immersive sound with active noise cancellation technology for pure audio experience",
    cta: "DISCOVER",
    link: "/products?category=earbuds",
    bgColor: "from-slate-900 via-slate-800 to-slate-900",
  },
  {
    id: 3,
    subtitle: "Studio Quality",
    title: "HEADPHONES",
    titleLine2: "ELITE",
    description: "Studio quality sound, premium comfort - everywhere you go",
    cta: "EXPLORE",
    link: "/products?category=headphones",
    bgColor: "from-neutral-900 via-neutral-800 to-neutral-900",
  },
]

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      handleSlideChange((currentSlide + 1) % slides.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [currentSlide])

  const handleSlideChange = (index) => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentSlide(index)
    setTimeout(() => setIsAnimating(false), 800)
  }

  const nextSlide = () => handleSlideChange((currentSlide + 1) % slides.length)
  const prevSlide = () => handleSlideChange((currentSlide - 1 + slides.length) % slides.length)

  return (
    <section className="relative h-[80vh] lg:h-[85vh] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-all duration-800 ${
            index === currentSlide ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          {/* Gradient Background */}
          <div className={`absolute inset-0 bg-gradient-to-br ${slide.bgColor}`} />

          {/* Decorative Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-accent/10 rounded-full blur-2xl" />
          </div>

          {/* Content */}
          <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
            <div className="w-full lg:w-2/3 space-y-6 lg:space-y-8">
              <div
                className={`transform transition-all duration-700 delay-100 ${
                  index === currentSlide ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                }`}
              >
                <span className="inline-block px-4 py-1.5 bg-accent/20 text-accent text-xs tracking-widest uppercase rounded-full border border-accent/30">
                  {slide.subtitle}
                </span>
              </div>

              <div
                className={`transform transition-all duration-700 delay-200 ${
                  index === currentSlide ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                }`}
              >
                <h1 className="text-4xl sm:text-5xl lg:text-7xl xl:text-8xl font-bold tracking-tight leading-none text-white">
                  {slide.title}
                  <span className="block text-accent mt-2">{slide.titleLine2}</span>
                </h1>
              </div>

              <p
                className={`text-zinc-400 text-base lg:text-lg max-w-lg transform transition-all duration-700 delay-300 ${
                  index === currentSlide ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                }`}
              >
                {slide.description}
              </p>

              <div
                className={`flex flex-wrap items-center gap-4 transform transition-all duration-700 delay-400 ${
                  index === currentSlide ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                }`}
              >
                <Link
                  href={slide.link}
                  className="group inline-flex items-center gap-3 px-8 py-4 bg-accent text-accent-foreground text-sm tracking-widest font-semibold hover:bg-accent/90 transition-all rounded-lg"
                >
                  {slide.cta}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/products"
                  className="px-8 py-4 border border-zinc-600 text-white text-sm tracking-widest font-medium hover:bg-white/10 transition-all rounded-lg"
                >
                  VIEW ALL
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <div className="absolute bottom-8 right-8 flex items-center gap-3 z-10">
        <button
          onClick={prevSlide}
          className="p-3 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-colors border border-white/20"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-5 h-5 text-white" />
        </button>
        <button
          onClick={nextSlide}
          className="p-3 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-colors border border-white/20"
          aria-label="Next slide"
        >
          <ChevronRight className="w-5 h-5 text-white" />
        </button>
      </div>

      {/* Progress Bar Only */}
      <div className="absolute bottom-8 left-8 flex items-center gap-2 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => handleSlideChange(index)}
            className={`h-1 transition-all duration-500 rounded-full ${
              index === currentSlide ? "w-10 bg-accent" : "w-3 bg-white/30 hover:bg-white/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
