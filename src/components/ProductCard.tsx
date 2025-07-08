"use client"

import { motion } from "framer-motion"
import { Button } from "./ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card"
import { Badge } from "./ui/badge"
import { Heart, ShoppingCart } from "lucide-react"
import { Link } from "react-router-dom"
import { useState } from "react"
import { useTheme } from "../context/ThemeContext"
import { useLikes } from "../context/LikesContext"
import { useCart } from "../context/CartContext"
import { useAuth } from "../context/AuthContext"
import { useToast } from "../context/ToastContext"
import { AddToCartDialog } from "./AddToCartDialog"

// Unified interface that works with both static data and API data
interface UnifiedProduct {
  id?: number; // For static data
  _id?: string; // For API data
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  brand?: string;
  rating: number;
  reviewCount?: number;
  reviews?: number;
  isFeatured?: boolean;
  isOnSale?: boolean;
  discountPercentage?: number;
  stock?: number;
  minStock?: number;
  sku?: string;
  isActive?: boolean;
}

interface ProductCardProps {
  product: UnifiedProduct
}

export function ProductCard({ product }: ProductCardProps) {
  const { theme } = useTheme()
  const { isLiked, toggleLike } = useLikes()
  const { addItem } = useCart()
  const { user } = useAuth()
  const { toast } = useToast()
  const [showDialog, setShowDialog] = useState(false)

  // Get the correct ID (either id or _id)
  const productId = product.id || product._id || ''

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    // Vérifier si l'utilisateur est connecté
    if (!user) {
      toast({
        title: "Connexion requise",
        description: "Veuillez vous connecter pour ajouter des produits au panier",
        variant: "destructive"
      })
      return
    }
    
    console.log('Add to cart clicked for product:', product.name, productId)
    try {
      await addItem(product)
      setShowDialog(true)
    } catch (error) {
      console.error('Error adding item to cart:', error)
      toast({
        title: "Erreur",
        description: "Impossible d'ajouter le produit au panier",
        variant: "destructive"
      })
    }
  }

  const handleLikeClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    toggleLike(productId)
  }

  return (
    <>
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ duration: 0.2 }}
        className="group"
      >
        <Card className={`overflow-hidden transition-all duration-200 ${
          theme === 'light'
            ? 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-lg'
            : 'bg-gray-800 border-gray-700 hover:border-gray-600 hover:shadow-xl'
        }`}>
          <CardHeader className="p-0">
            <div className="relative overflow-hidden">
              <Link to={`/product/${productId}`}>
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </Link>
              
              {/* Like Button */}
              <Button
                variant="ghost"
                size="icon"
                className={`absolute top-2 right-2 h-8 w-8 rounded-full transition-all duration-200 ${
                  theme === 'light'
                    ? 'bg-white/90 hover:bg-white text-gray-600 hover:text-red-500'
                    : 'bg-gray-800/90 hover:bg-gray-800 text-gray-400 hover:text-red-400'
                } ${isLiked(productId) ? 'text-red-500' : ''}`}
                onClick={handleLikeClick}
                aria-label="Toggle like"
              >
                <Heart className={`h-4 w-4 transition-all duration-200 ${
                  isLiked(productId) ? 'fill-current' : ''
                }`} />
              </Button>

              {/* Category Badge */}
              <div className="absolute top-2 left-2">
                <Badge variant="secondary" className="text-xs">
                  {product.category}
                </Badge>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-4">
            <Link to={`/product/${productId}`}>
              <h3 className={`font-semibold text-lg mb-2 line-clamp-2 transition-colors duration-200 ${
                theme === 'light'
                  ? 'text-gray-900 group-hover:text-gray-700'
                  : 'text-white group-hover:text-gray-300'
              }`}>
                {product.name}
              </h3>
            </Link>
            
            <p className={`text-sm mb-3 line-clamp-2 ${
              theme === 'light' ? 'text-gray-600' : 'text-gray-400'
            }`}>
              {product.description}
            </p>
            
            <div className="flex items-center justify-between">
              <span className={`text-xl font-bold ${
                theme === 'light' ? 'text-gray-900' : 'text-white'
              }`}>
                ${product.price}
              </span>
              
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(product.rating)
                        ? 'text-yellow-400 fill-current'
                        : theme === 'light'
                          ? 'text-gray-300'
                          : 'text-gray-600'
                    }`}
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className={`text-sm ml-1 ${
                  theme === 'light' ? 'text-gray-600' : 'text-gray-400'
                }`}>
                  ({product.rating})
                </span>
              </div>
            </div>
          </CardContent>

          <CardFooter className="p-4 pt-0">
            <Button
              onClick={handleAddToCart}
              className="w-full group/btn transition-all duration-200"
              size="lg"
            >
              <ShoppingCart className="w-4 h-4 mr-2 group-hover/btn:scale-110 transition-transform duration-200" />
              {user ? 'Add to Cart' : 'Sign in to Add'}
            </Button>
          </CardFooter>
        </Card>
      </motion.div>

      {/* Add to Cart Dialog */}
      <AddToCartDialog
        isOpen={showDialog}
        onClose={() => setShowDialog(false)}
        product={product}
      />
    </>
  )
}

export default ProductCard;
