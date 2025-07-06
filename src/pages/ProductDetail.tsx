"use client"

import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { motion } from "framer-motion"
import { Navbar } from "../components/Navbar"
import { Footer } from "../components/Footer"
import { Button } from "../components/ui/button"
import { Badge } from "../components/ui/badge"
import { Separator } from "../components/ui/separator"
import { Heart, ShoppingCart, Star, ArrowLeft, Share2 } from "lucide-react"
import { useTheme } from "../context/ThemeContext"
import { useLikes } from "../context/LikesContext"
import { useCart } from "../context/CartContext"
import { AddToCartDialog } from "../components/AddToCartDialog"
import { products } from "../data/products"
import type { Product } from "../data/products"

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>()
  const { theme } = useTheme()
  const { isLiked, toggleLike } = useLikes()
  const { addItem } = useCart()
  const [product, setProduct] = useState<Product | null>(null)
  const [showDialog, setShowDialog] = useState(false)
  const [selectedImage, setSelectedImage] = useState(0)

  useEffect(() => {
    if (id) {
      const foundProduct = products.find(p => p.id === parseInt(id))
      setProduct(foundProduct || null)
    }
  }, [id])

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-4">
            <h1 className="text-2xl font-bold">Product Not Found</h1>
            <p className="text-muted-foreground">The product you're looking for doesn't exist.</p>
            <Link to="/shop">
              <Button>Back to Shop</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  const handleAddToCart = () => {
    console.log('Adding to cart from product detail:', product.name, product.id)
    addItem(product)
    setShowDialog(true)
  }

  const handleLikeClick = () => {
    toggleLike(product.id)
  }

  return (
    <>
      <div className="min-h-screen flex flex-col">
        <Navbar />

        <main className="flex-1">
          <div className="container py-8">
            {/* Breadcrumb */}
            <div className="mb-8">
              <Link to="/shop">
                <Button variant="ghost" className="mb-4">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Shop
                </Button>
              </Link>
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
              {/* Product Images */}
              <div className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="relative aspect-square overflow-hidden rounded-2xl bg-gray-100 dark:bg-gray-800"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Like Button */}
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleLikeClick}
                    className={`absolute top-4 right-4 h-10 w-10 rounded-full ${
                      theme === 'light'
                        ? 'bg-white/90 hover:bg-white text-gray-600 hover:text-red-500'
                        : 'bg-gray-800/90 hover:bg-gray-800 text-gray-400 hover:text-red-400'
                    } ${isLiked(product.id) ? 'text-red-500' : ''}`}
                    aria-label="Toggle like"
                  >
                    <Heart className={`h-5 w-5 transition-all duration-200 ${
                      isLiked(product.id) ? 'fill-current' : ''
                    }`} />
                  </Button>

                  {/* Share Button */}
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`absolute top-4 left-4 h-10 w-10 rounded-full ${
                      theme === 'light'
                        ? 'bg-white/90 hover:bg-white text-gray-600 hover:text-gray-900'
                        : 'bg-gray-800/90 hover:bg-gray-800 text-gray-400 hover:text-white'
                    }`}
                    aria-label="Share product"
                  >
                    <Share2 className="h-5 w-5" />
                  </Button>
                </motion.div>
              </div>

              {/* Product Info */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="space-y-6"
              >
                {/* Category and Rating */}
                <div className="flex items-center justify-between">
                  <Badge variant="secondary" className="text-sm">
                    {product.category}
                  </Badge>
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(product.rating)
                              ? 'text-yellow-400 fill-current'
                              : theme === 'light'
                                ? 'text-gray-300'
                                : 'text-gray-600'
                          }`}
                        />
                      ))}
                    </div>
                    <span className={`text-sm ${
                      theme === 'light' ? 'text-gray-600' : 'text-gray-400'
                    }`}>
                      ({product.rating})
                    </span>
                  </div>
                </div>

                {/* Product Name */}
                <h1 className={`text-3xl font-bold ${
                  theme === 'light' ? 'text-gray-900' : 'text-white'
                }`}>
                  {product.name}
                </h1>

                {/* Price */}
                <div className="flex items-center space-x-4">
                  <span className={`text-3xl font-bold ${
                    theme === 'light' ? 'text-gray-900' : 'text-white'
                  }`}>
                    ${product.price}
                  </span>
                  {product.originalPrice && (
                    <span className={`text-xl line-through ${
                      theme === 'light' ? 'text-gray-500' : 'text-gray-400'
                    }`}>
                      ${product.originalPrice}
                    </span>
                  )}
                </div>

                {/* Description */}
                <div>
                  <h3 className={`text-lg font-semibold mb-2 ${
                    theme === 'light' ? 'text-gray-900' : 'text-white'
                  }`}>
                    Description
                  </h3>
                  <p className={`leading-relaxed ${
                    theme === 'light' ? 'text-gray-600' : 'text-gray-300'
                  }`}>
                    {product.description}
                  </p>
                </div>

                <Separator />

                {/* Features */}
                <div>
                  <h3 className={`text-lg font-semibold mb-3 ${
                    theme === 'light' ? 'text-gray-900' : 'text-white'
                  }`}>
                    Features
                  </h3>
                  <ul className={`space-y-2 ${
                    theme === 'light' ? 'text-gray-600' : 'text-gray-300'
                  }`}>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                      High quality materials
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                      Fast shipping available
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                      30-day return policy
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                      Customer support 24/7
                    </li>
                  </ul>
                </div>

                {/* Add to Cart Button */}
                <div className="pt-4">
                  <Button
                    onClick={handleAddToCart}
                    size="lg"
                    className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 group transition-all duration-200"
                  >
                    <ShoppingCart className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform duration-200" />
                    Add to Cart
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </main>

        <Footer />
      </div>

      {/* Add to Cart Dialog */}
      <AddToCartDialog
        isOpen={showDialog}
        onClose={() => setShowDialog(false)}
        product={product}
      />
    </>
  )
}
