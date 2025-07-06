"use client"

import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { Navbar } from "../components/Navbar"
import { Footer } from "../components/Footer"
import { ProductCard } from "../components/ProductCard"
import { Button } from "../components/ui/button"
import { ArrowRight, Zap, Shield, Truck, Star, Sparkles, ShoppingBag } from "lucide-react"
import { products } from "../data/products"
import { useEffect, useState } from "react"
import { useTheme } from "../context/ThemeContext"

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const Counter = ({ end, duration = 2, suffix = "" }: { end: number; duration?: number; suffix?: string }) => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let startTime: number
    let animationFrame: number

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1)

      setCount(Math.floor(progress * end))

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrame)
  }, [end, duration])

  return (
    <span>
      {count.toLocaleString()}
      {suffix}
    </span>
  )
}

export default function Home() {
  const featuredProducts = products.slice(0, 8)
  const { theme } = useTheme()

  const categories = [
    {
      name: "Electronics",
      description: "Latest gadgets and tech",
      icon: "/images/electronics-icon.svg",
      color: "from-violet-500 to-purple-600",
      path: "/shop?category=electronics"
    },
    {
      name: "Fashion",
      description: "Trendy clothing & accessories",
      icon: "/images/fashion-icon.svg",
      color: "from-pink-500 to-rose-600",
      path: "/shop?category=clothing"
    },
    {
      name: "Home & Living",
      description: "Beautiful home essentials",
      icon: "/images/home-icon.svg",
      color: "from-emerald-500 to-green-600",
      path: "/shop?category=home"
    },
    {
      name: "Fitness",
      description: "Health & wellness products",
      icon: "/images/electronics-icon.svg",
      color: "from-blue-500 to-cyan-600",
      path: "/shop?category=fitness"
    }
  ]

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className={`relative min-h-screen flex items-center overflow-hidden ${
          theme === 'light' 
            ? 'bg-gradient-to-br from-violet-50 via-white to-blue-50' 
            : 'bg-gradient-to-br from-purple-900/20 via-background to-blue-900/20'
        }`}>
          {/* Animated Background Gradient */}
          <div className={`absolute inset-0 ${
            theme === 'light'
              ? 'bg-gradient-to-br from-violet-100/30 via-purple-50/20 to-blue-100/30 animate-pulse'
              : 'bg-gradient-to-br from-violet-600/10 via-purple-600/5 to-blue-600/10 animate-pulse'
          }`} />

          {/* Grid Pattern */}
          <div className={`absolute inset-0 ${
            theme === 'light'
              ? 'bg-[linear-gradient(rgba(139,92,246,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.05)_1px,transparent_1px)] bg-[size:50px_50px]'
              : 'bg-[linear-gradient(rgba(139,92,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.03)_1px,transparent_1px)] bg-[size:50px_50px]'
          }`} />

          {/* Floating Orbs */}
          <div className={`absolute top-20 left-20 w-32 h-32 rounded-full blur-3xl animate-pulse ${
            theme === 'light' ? 'bg-violet-200' : 'bg-violet-500/20'
          }`} />
          <div className={`absolute top-40 right-32 w-48 h-48 rounded-full blur-3xl animate-pulse delay-1000 ${
            theme === 'light' ? 'bg-blue-200' : 'bg-blue-500/15'
          }`} />
          <div className={`absolute bottom-32 left-1/3 w-40 h-40 rounded-full blur-3xl animate-pulse delay-2000 ${
            theme === 'light' ? 'bg-purple-200' : 'bg-purple-500/20'
          }`} />

          <div className="container relative z-10 py-20 lg:py-32">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div
                className="space-y-12"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <motion.div className="space-y-8" {...fadeInUp} transition={{ delay: 0.2, duration: 0.6 }}>
                  <motion.div
                    className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm ${
                      theme === 'light'
                        ? 'bg-violet-100 border border-violet-200 text-violet-700'
                        : 'bg-violet-500/10 border border-violet-500/20 text-violet-300'
                    }`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1, duration: 0.5 }}
                  >
                    <Sparkles className="w-4 h-4 mr-2" />
                    Trusted by 10,000+ customers
                  </motion.div>

                  <motion.h1
                    className={`text-6xl lg:text-8xl font-bold tracking-tight bg-clip-text text-transparent leading-tight ${
                      theme === 'light'
                        ? 'bg-gradient-to-r from-gray-900 via-violet-600 to-violet-700'
                        : 'bg-gradient-to-r from-foreground via-violet-200 to-violet-400'
                    }`}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                  >
                    The Future of Shopping
                  </motion.h1>

                  <motion.p
                    className="text-xl lg:text-2xl text-muted-foreground max-w-2xl leading-relaxed"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                  >
                    Experience next-generation e-commerce with AI-powered recommendations, lightning-fast delivery, and
                    products that adapt to your lifestyle.
                  </motion.p>
                </motion.div>

                <motion.div
                  className="flex flex-col sm:flex-row gap-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.6 }}
                >
                  <Link to="/shop">
                    <Button
                      size="lg"
                      className="w-full sm:w-auto group bg-violet-600 hover:bg-violet-700 text-white px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_0px_rgba(139,92,246,0.5)]"
                    >
                      Start Shopping
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
                    </Button>
                  </Link>
                  <Link to="/about">
                    <Button
                      variant="outline"
                      size="lg"
                      className={`w-full sm:w-auto border-2 px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300 hover:scale-105 bg-transparent ${
                        theme === 'light'
                          ? 'border-gray-300 hover:border-violet-500 text-gray-700 hover:text-violet-700 hover:bg-violet-50'
                          : 'border-border hover:border-violet-500 text-muted-foreground hover:text-foreground hover:bg-violet-500/10'
                      }`}
                    >
                      Learn More
                    </Button>
                  </Link>
                </motion.div>

                {/* Enhanced Stats */}
                <motion.div
                  className="grid grid-cols-3 gap-8 pt-12"
                  variants={staggerContainer}
                  initial="initial"
                  animate="animate"
                >
                  {[
                    { number: 10, suffix: "K+", label: "Happy Customers", icon: Star },
                    { number: 500, suffix: "+", label: "Products", icon: ShoppingBag },
                    { number: 24, suffix: "/7", label: "Support", icon: Zap },
                  ].map((stat, index) => (
                    <motion.div
                      key={index}
                      className="text-center group"
                      variants={fadeInUp}
                      transition={{ delay: 0.9 + index * 0.1 }}
                    >
                      <div className={`text-4xl lg:text-5xl font-bold bg-clip-text text-transparent mb-2 ${
                        theme === 'light'
                          ? 'bg-gradient-to-r from-violet-600 to-blue-600'
                          : 'bg-gradient-to-r from-violet-400 to-blue-400'
                      }`}>
                        <Counter end={stat.number} suffix={stat.suffix} />
                      </div>
                      <div className="text-sm lg:text-base text-muted-foreground font-medium mb-2">{stat.label}</div>
                      <stat.icon className={`w-6 h-6 mx-auto group-hover:scale-110 transition-transform duration-200 ${
                        theme === 'light' ? 'text-violet-600' : 'text-violet-400'
                      }`} />
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>

              <motion.div
                className="relative"
                initial={{ opacity: 0, x: 50, rotate: -5 }}
                animate={{ opacity: 1, x: 0, rotate: 0 }}
                transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
              >
                <motion.div
                  className="relative aspect-square max-w-lg mx-auto"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  {/* Main Hero Visual */}
                  <div className={`absolute inset-0 rounded-3xl backdrop-blur-sm border shadow-2xl ${
                    theme === 'light'
                      ? 'bg-gradient-to-br from-violet-100 via-purple-50 to-blue-100 border-violet-200'
                      : 'bg-gradient-to-br from-violet-600/20 via-purple-600/20 to-blue-600/20 border-violet-500/20'
                  }`}>
                    <div className="w-full h-full flex items-center justify-center">
                      <motion.div
                        className="w-32 h-32 bg-gradient-to-br from-violet-500 to-blue-500 rounded-3xl flex items-center justify-center shadow-[0_0_50px_0px_rgba(139,92,246,0.5)]"
                        animate={{
                          rotate: [0, 360],
                          scale: [1, 1.1, 1],
                        }}
                        transition={{
                          duration: 8,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "linear",
                        }}
                      >
                        <ShoppingBag className="w-16 h-16 text-white" />
                      </motion.div>
                    </div>
                  </div>

                  {/* Floating Feature Cards */}
                  <motion.div
                    className={`absolute -top-6 -right-6 rounded-2xl p-4 shadow-xl backdrop-blur-sm ${
                      theme === 'light'
                        ? 'bg-white border border-violet-200'
                        : 'bg-card border border-violet-500/20'
                    }`}
                    animate={{ y: [-10, 10, -10] }}
                    transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        theme === 'light' ? 'bg-violet-100' : 'bg-violet-500/20'
                      }`}>
                        <Shield className={`w-6 h-6 ${theme === 'light' ? 'text-violet-600' : 'text-violet-400'}`} />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-foreground">Secure</div>
                        <div className="text-xs text-muted-foreground">100% Protected</div>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    className={`absolute -bottom-6 -left-6 rounded-2xl p-4 shadow-xl backdrop-blur-sm ${
                      theme === 'light'
                        ? 'bg-white border border-blue-200'
                        : 'bg-card border border-blue-500/20'
                    }`}
                    animate={{ y: [10, -10, 10] }}
                    transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 2 }}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        theme === 'light' ? 'bg-blue-100' : 'bg-blue-500/20'
                      }`}>
                        <Truck className={`w-6 h-6 ${theme === 'light' ? 'text-blue-600' : 'text-blue-400'}`} />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-foreground">Fast Delivery</div>
                        <div className="text-xs text-muted-foreground">2-Day Shipping</div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-24 lg:py-32 bg-background relative">
          <div className="container relative z-10">
            <motion.div
              className="text-center space-y-6 mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <motion.div
                className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm mb-4 ${
                  theme === 'light'
                    ? 'bg-violet-100 border border-violet-200 text-violet-700'
                    : 'bg-violet-500/10 border border-violet-500/20 text-violet-300'
                }`}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Shop by Category
              </motion.div>

              <h2 className={`text-4xl lg:text-6xl font-bold bg-clip-text text-transparent ${
                theme === 'light'
                  ? 'bg-gradient-to-r from-gray-900 via-violet-600 to-violet-700'
                  : 'bg-gradient-to-r from-foreground via-violet-200 to-violet-400'
              }`}>
                Explore Categories
              </h2>

              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Discover our curated selection of products organized by category for easy browsing
              </p>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: "-50px" }}
            >
              {categories.map((category, index) => (
                <motion.div
                  key={category.name}
                  variants={{
                    initial: { opacity: 0, y: 50 },
                    animate: { opacity: 1, y: 0 },
                  }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link to={category.path}>
                    <motion.div
                      className={`group relative rounded-2xl p-8 text-center hover:shadow-xl transition-all duration-300 hover:scale-105 ${
                        theme === 'light'
                          ? 'bg-white border border-gray-200 hover:border-violet-300'
                          : 'bg-card border border-border'
                      }`}
                      whileHover={{ y: -5 }}
                    >
                      <div className={`w-16 h-16 mx-auto mb-6 bg-gradient-to-br ${category.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300`}>
                        <img src={category.icon} alt={category.name} className="w-8 h-8" />
                      </div>
                      <h3 className={`text-xl font-semibold mb-2 transition-colors duration-200 ${
                        theme === 'light'
                          ? 'text-gray-900 group-hover:text-violet-700'
                          : 'text-foreground group-hover:text-violet-400'
                      }`}>
                        {category.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {category.description}
                      </p>
                    </motion.div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-24 lg:py-32 bg-background relative">
          {/* Background Elements */}
          <div className={`absolute inset-0 ${
            theme === 'light'
              ? 'bg-gradient-to-b from-violet-50 to-transparent'
              : 'bg-gradient-to-b from-violet-900/5 to-transparent'
          }`} />

          <div className="container relative z-10">
            <motion.div
              className="text-center space-y-6 mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <motion.div
                className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm mb-4 ${
                  theme === 'light'
                    ? 'bg-violet-100 border border-violet-200 text-violet-700'
                    : 'bg-violet-500/10 border border-violet-500/20 text-violet-300'
                }`}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Handpicked Selection
              </motion.div>

              <h2 className={`text-4xl lg:text-6xl font-bold bg-clip-text text-transparent ${
                theme === 'light'
                  ? 'bg-gradient-to-r from-gray-900 via-violet-600 to-violet-700'
                  : 'bg-gradient-to-r from-foreground via-violet-200 to-violet-400'
              }`}>
                Featured Products
              </h2>

              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Discover our AI-curated selection of the best products, chosen specifically for your preferences and
                lifestyle
              </p>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: "-50px" }}
            >
              {featuredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  variants={{
                    initial: { opacity: 0, y: 50 },
                    animate: { opacity: 1, y: 0 },
                  }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Link to="/shop">
                <Button
                  size="lg"
                  variant="outline"
                  className={`px-8 py-4 text-lg font-semibold border-2 rounded-xl transition-all duration-300 hover:scale-105 bg-transparent ${
                    theme === 'light'
                      ? 'border-gray-300 hover:border-violet-500 text-gray-700 hover:text-violet-700 hover:bg-violet-50 hover:shadow-[0_0_20px_0px_rgba(139,92,246,0.3)]'
                      : 'border-border hover:border-violet-500 text-muted-foreground hover:text-foreground hover:bg-violet-500/10 hover:shadow-[0_0_20px_0px_rgba(139,92,246,0.3)]'
                  }`}
                >
                  View All Products
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className={`py-24 lg:py-32 relative overflow-hidden ${
          theme === 'light'
            ? 'bg-gradient-to-br from-violet-50 via-white to-blue-50'
            : 'bg-gradient-to-br from-violet-900/10 via-background to-blue-900/10'
        }`}>
          {/* Background Pattern */}
          <div className={`absolute inset-0 ${
            theme === 'light'
              ? 'bg-[linear-gradient(rgba(139,92,246,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.05)_1px,transparent_1px)] bg-[size:50px_50px]'
              : 'bg-[linear-gradient(rgba(139,92,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.03)_1px,transparent_1px)] bg-[size:50px_50px]'
          }`} />

          <div className="container relative z-10">
            <motion.div
              className="max-w-4xl mx-auto text-center space-y-10"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                className="space-y-6"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm mb-4 ${
                  theme === 'light'
                    ? 'bg-violet-100 border border-violet-200 text-violet-700'
                    : 'bg-violet-500/10 border border-violet-500/20 text-violet-300'
                }`}>
                  <Zap className="w-4 h-4 mr-2" />
                  Stay Connected
                </div>

                <h2 className={`text-4xl lg:text-6xl font-bold bg-clip-text text-transparent ${
                  theme === 'light'
                    ? 'bg-gradient-to-r from-gray-900 via-violet-600 to-violet-700'
                    : 'bg-gradient-to-r from-foreground via-violet-200 to-violet-400'
                }`}>
                  Stay Updated
                </h2>

                <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                  Get exclusive access to new products, AI-powered recommendations, and special offers delivered to your
                  inbox.
                </p>
              </motion.div>

              <motion.div
                className="max-w-md mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <form className={`flex flex-col sm:flex-row gap-4 p-2 rounded-2xl shadow-xl backdrop-blur-sm ${
                  theme === 'light'
                    ? 'bg-white border border-gray-200'
                    : 'bg-card border border-border'
                }`}>
                  <motion.input
                    type="email"
                    placeholder="Enter your email address"
                    className="flex-1 px-6 py-4 bg-transparent border-0 focus:outline-none focus:ring-0 text-foreground placeholder-muted-foreground text-lg"
                    required
                    whileFocus={{ scale: 1.02 }}
                  />
                  <Button
                    type="submit"
                    className="px-8 py-4 bg-violet-600 hover:bg-violet-700 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_0px_rgba(139,92,246,0.5)]"
                  >
                    Subscribe
                  </Button>
                </form>
              </motion.div>

              <motion.div
                className="flex items-center justify-center space-x-8 text-sm text-muted-foreground"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <div className="flex items-center space-x-2">
                  <Shield className={`w-4 h-4 ${theme === 'light' ? 'text-violet-600' : 'text-violet-400'}`} />
                  <span>No spam, ever</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Zap className={`w-4 h-4 ${theme === 'light' ? 'text-violet-600' : 'text-violet-400'}`} />
                  <span>Unsubscribe anytime</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
