"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Button } from "./ui/button"
import { Card, CardContent, CardHeader } from "./ui/card"
import { Badge } from "./ui/badge"
import { X, ShoppingCart, CreditCard, ArrowLeft, Check } from "lucide-react"
import { Link } from "react-router-dom"
import { useTheme } from "../context/ThemeContext"
import { useCart } from "../context/CartContext"
import type { Product } from "../data/products"

interface AddToCartDialogProps {
  isOpen: boolean
  onClose: () => void
  product: Product | null
}

export function AddToCartDialog({ isOpen, onClose, product }: AddToCartDialogProps) {
  const { theme } = useTheme()
  const { getItemCount } = useCart()

  if (!product) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Dialog */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <Card className={`w-full max-w-md overflow-hidden shadow-2xl ${
              theme === 'light'
                ? 'bg-white border-gray-200'
                : 'bg-gray-800 border-gray-700'
            }`}>
              {/* Header */}
              <CardHeader className={`relative p-6 pb-4 ${
                theme === 'light' ? 'bg-gradient-to-r from-green-50 to-emerald-50' : 'bg-gradient-to-r from-green-900/20 to-emerald-900/20'
              }`}>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onClose}
                  className={`absolute top-4 right-4 h-8 w-8 rounded-full ${
                    theme === 'light'
                      ? 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                      : 'text-gray-400 hover:text-gray-200 hover:bg-gray-700'
                  }`}
                >
                  <X className="h-4 w-4" />
                </Button>

                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="mx-auto w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4"
                >
                  <Check className="h-6 w-6 text-green-600" />
                </motion.div>

                <motion.h2
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className={`text-xl font-bold text-center ${
                    theme === 'light' ? 'text-gray-900' : 'text-white'
                  }`}
                >
                  Added to Cart!
                </motion.h2>
              </CardHeader>

              <CardContent className="p-6">
                {/* Product Info */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="flex items-center space-x-4 mb-6 p-4 rounded-lg bg-gray-50 dark:bg-gray-700/50"
                >
                  <div className="relative h-16 w-16 overflow-hidden rounded-lg">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className={`font-semibold text-sm line-clamp-2 ${
                      theme === 'light' ? 'text-gray-900' : 'text-white'
                    }`}>
                      {product.name}
                    </h3>
                    <div className="flex items-center justify-between mt-1">
                      <span className={`font-bold ${
                        theme === 'light' ? 'text-gray-900' : 'text-white'
                      }`}>
                        ${product.price}
                      </span>
                      <Badge variant="secondary" className="text-xs">
                        {product.category}
                      </Badge>
                    </div>
                  </div>
                </motion.div>

                {/* Cart Summary */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className={`mb-6 p-4 rounded-lg border ${
                    theme === 'light'
                      ? 'bg-blue-50 border-blue-200'
                      : 'bg-blue-900/20 border-blue-700'
                  }`}
                >
                  <div className="flex items-center justify-between text-sm">
                    <span className={theme === 'light' ? 'text-gray-600' : 'text-gray-300'}>
                      Items in cart:
                    </span>
                    <span className={`font-semibold ${
                      theme === 'light' ? 'text-gray-900' : 'text-white'
                    }`}>
                      {getItemCount()}
                    </span>
                  </div>
                </motion.div>

                {/* Action Buttons */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="space-y-3"
                >
                  {/* Continue Shopping */}
                  <Button
                    variant="outline"
                    onClick={onClose}
                    className={`w-full h-12 group transition-all duration-200 ${
                      theme === 'light'
                        ? 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
                        : 'border-gray-600 hover:border-gray-500 hover:bg-gray-700'
                    }`}
                  >
                    <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform duration-200" />
                    Continue Shopping
                  </Button>

                  {/* Proceed to Checkout */}
                  <Link to="/cart" onClick={onClose}>
                    <Button className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold group transition-all duration-200">
                      <CreditCard className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform duration-200" />
                      Proceed to Checkout
                    </Button>
                  </Link>

                  {/* View Cart */}
                  <Link to="/cart" onClick={onClose}>
                    <Button
                      variant="ghost"
                      className={`w-full h-10 group transition-all duration-200 ${
                        theme === 'light'
                          ? 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                          : 'text-gray-400 hover:text-white hover:bg-gray-700'
                      }`}
                    >
                      <ShoppingCart className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform duration-200" />
                      View Cart Details
                    </Button>
                  </Link>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
} 