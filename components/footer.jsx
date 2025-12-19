import Link from "next/link"
import { Instagram, Twitter, Facebook, Youtube, Mail, Phone, MapPin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-zinc-950 text-white">
      {/* Newsletter Section */}
      <div className="border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-2xl lg:text-3xl font-bold tracking-tight mb-3">Stay in the Loop</h3>
            <p className="text-zinc-400 mb-8">
              Subscribe to get exclusive offers, early access, and updates on new arrivals.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 bg-zinc-900 border border-zinc-800 rounded-lg px-5 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent placeholder:text-zinc-500"
              />
              <button
                type="submit"
                className="px-8 py-3.5 bg-accent text-accent-foreground text-sm font-semibold tracking-wider hover:bg-accent/90 transition-colors rounded-lg whitespace-nowrap"
              >
                SUBSCRIBE
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <h4 className="text-xl font-bold tracking-[0.15em] mb-5">TECH STORE</h4>
            <p className="text-sm text-zinc-400 leading-relaxed mb-6 max-w-sm">
              Premium tech gadgets and accessories for the modern lifestyle. Experience technology at its finest with
              our curated collection.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="#"
                className="p-2.5 bg-zinc-900 rounded-lg hover:bg-zinc-800 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="p-2.5 bg-zinc-900 rounded-lg hover:bg-zinc-800 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="p-2.5 bg-zinc-900 rounded-lg hover:bg-zinc-800 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="p-2.5 bg-zinc-900 rounded-lg hover:bg-zinc-800 transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h5 className="text-xs font-semibold tracking-widest text-zinc-500 uppercase mb-5">Shop</h5>
            <ul className="space-y-3">
              {[
                { label: "All Products", href: "/products" },
                { label: "Earbuds", href: "/products?category=earbuds" },
                { label: "Watches", href: "/products?category=watches" },
                { label: "Gadgets", href: "/products?category=gadgets" },
                { label: "Accessories", href: "/products?category=accessories" },
              ].map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="text-sm text-zinc-400 hover:text-white transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h5 className="text-xs font-semibold tracking-widest text-zinc-500 uppercase mb-5">Support</h5>
            <ul className="space-y-3">
              {["Contact Us", "FAQ", "Shipping Info", "Returns & Exchanges", "Track Order"].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-sm text-zinc-400 hover:text-white transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h5 className="text-xs font-semibold tracking-widest text-zinc-500 uppercase mb-5">Contact</h5>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-zinc-500 mt-0.5" />
                <span className="text-sm text-zinc-400">support@techstore.com</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-zinc-500 mt-0.5" />
                <span className="text-sm text-zinc-400">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-zinc-500 mt-0.5" />
                <span className="text-sm text-zinc-400">
                  Tech Street
                  <br />
                  Pakistan, lahore 
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-xs text-zinc-500">© 2025 TECH STORE. All rights reserved.</p>

            <div className="flex items-center gap-6">
              <Link href="#" className="text-xs text-zinc-500 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="text-xs text-zinc-500 hover:text-white transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
