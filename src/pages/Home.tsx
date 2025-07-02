import { Link } from "react-router-dom"
import { Navbar } from "../components/Navbar"
import { Footer } from "../components/Footer"
import { ProductCard } from "../components/ProductCard"
import { Button } from "../components/ui/button"
import { ArrowRight } from "lucide-react"
import { products } from "../data/products"

export default function Home() {
  const featuredProducts = products.slice(0, 8)

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-primary/10 via-primary/5 to-background">
          <div className="container py-24 lg:py-32">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div className="space-y-4">
                  <h1 className="text-4xl lg:text-6xl font-bold tracking-tight">Discover Amazing Products</h1>
                  <p className="text-xl text-muted-foreground max-w-lg">
                    Shop the latest trends and find everything you need in one place. Quality products, great prices,
                    fast delivery.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/shop">
                    <Button size="lg" className="w-full sm:w-auto">
                      Shop Now
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link to="/about">
                    <Button variant="outline" size="lg" className="w-full sm:w-auto bg-transparent">
                      Learn More
                    </Button>
                  </Link>
                </div>

                <div className="grid grid-cols-3 gap-8 pt-8">
                  <div className="text-center">
                    <div className="text-2xl font-bold">10K+</div>
                    <div className="text-sm text-muted-foreground">Happy Customers</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">500+</div>
                    <div className="text-sm text-muted-foreground">Products</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">24/7</div>
                    <div className="text-sm text-muted-foreground">Support</div>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="aspect-square bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl flex items-center justify-center">
                  <div className="text-8xl">🛍️</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-16 lg:py-24">
          <div className="container">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold">Featured Products</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Discover our handpicked selection of the best products across all categories
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            <div className="text-center">
              <Link to="/shop">
                <Button size="lg" variant="outline">
                  View All Products
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="bg-muted/50 py-16 lg:py-24">
          <div className="container">
            <div className="max-w-2xl mx-auto text-center space-y-8">
              <div className="space-y-4">
                <h2 className="text-3xl lg:text-4xl font-bold">Stay Updated</h2>
                <p className="text-muted-foreground">
                  Subscribe to our newsletter and be the first to know about new products, exclusive deals, and special
                  offers.
                </p>
              </div>

              <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-3 py-2 border border-input rounded-md bg-background"
                  required
                />
                <Button type="submit">Subscribe</Button>
              </form>

              <p className="text-xs text-muted-foreground">We respect your privacy. Unsubscribe at any time.</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
