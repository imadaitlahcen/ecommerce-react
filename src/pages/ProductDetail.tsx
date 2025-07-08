"use client"

import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { Navbar } from "../components/Navbar"
import { Footer } from "../components/Footer"
import { Button } from "../components/ui/button"
import { Badge } from "../components/ui/badge"
import { Separator } from "../components/ui/separator"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar"
import { 
  Heart, 
  ShoppingCart, 
  Star, 
  ArrowLeft, 
  Share2, 
  MessageCircle,
  ThumbsUp,
  Eye,
  Package,
  Truck,
  Shield,
  ArrowRight,
  Loader2
} from "lucide-react"
import { useTheme } from "../context/ThemeContext"
import { useLikes } from "../context/LikesContext"
import { useCart } from "../context/CartContext"
import { useToast } from "../context/ToastContext"
import { AddToCartDialog } from "../components/AddToCartDialog"
import { ProductCard } from "../components/ProductCard"
import { productsService } from "../services/api"

interface Product {
  _id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  stock: number
  minStock: number
  sku: string
  brand: string
  category: string
  image: string
  images: string[]
  weight: number
  dimensions: string
  tags: string[]
  isActive: boolean
  rating: number
  reviewCount: number
  soldCount: number
  isFeatured: boolean
  isOnSale: boolean
  discountPercentage?: number
  createdAt: string
  updatedAt: string
}

interface Review {
  _id: string
  userId: string
  userName: string
  userAvatar?: string
  rating: number
  comment: string
  createdAt: string
  helpful: number
}

interface RelatedProduct {
  _id: string
  name: string
  price: number
  image: string
  category: string
  rating: number
}

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>()
  const { theme } = useTheme()
  const { isLiked, toggleLike } = useLikes()
  const { addItem } = useCart()
  const { toast } = useToast()
  const [product, setProduct] = useState<Product | null>(null)
  const [relatedProducts, setRelatedProducts] = useState<RelatedProduct[]>([])
  const [reviews, setReviews] = useState<Review[]>([])
  const [showDialog, setShowDialog] = useState(false)
  const [selectedImage, setSelectedImage] = useState(0)
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    if (id) {
      loadProduct()
    }
  }, [id])

  const loadProduct = async () => {
    try {
      setLoading(true)
      const productData = await productsService.getById(id!)
      setProduct(productData)
      
      // Load related products
      const related = await productsService.getRelated(id!, productData.category)
      setRelatedProducts(related)
      
      // Load reviews (mock data for now)
      setReviews([
        {
          _id: '1',
          userId: 'user1',
          userName: 'John Doe',
          userAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40',
          rating: 5,
          comment: 'Excellent product! The quality is outstanding and it works perfectly. Highly recommended!',
          createdAt: '2024-01-15T10:30:00Z',
          helpful: 12
        },
        {
          _id: '2',
          userId: 'user2',
          userName: 'Sarah Wilson',
          userAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40',
          rating: 4,
          comment: 'Great product, fast delivery. The only minor issue is the size, but overall very satisfied.',
          createdAt: '2024-01-10T14:20:00Z',
          helpful: 8
        },
        {
          _id: '3',
          userId: 'user3',
          userName: 'Mike Johnson',
          userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40',
          rating: 5,
          comment: 'Amazing quality and design. Worth every penny. Will definitely buy again!',
          createdAt: '2024-01-05T09:15:00Z',
          helpful: 15
        }
      ])
    } catch (error) {
      console.error('Error loading product:', error)
      toast({
        title: "Erreur",
        description: "Impossible de charger le produit",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="flex items-center space-x-2">
            <Loader2 className="h-6 w-6 animate-spin" />
            <span>Chargement du produit...</span>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-4">
            <h1 className="text-2xl font-bold">Produit introuvable</h1>
            <p className="text-muted-foreground">Le produit que vous recherchez n'existe pas.</p>
            <Link to="/shop">
              <Button>Retour à la boutique</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  const handleAddToCart = () => {
    addItem({ ...product, id: product._id }, quantity)
    setShowDialog(true)
  }

  const handleLikeClick = () => {
    toggleLike(product._id)
  }

  const averageRating = reviews.length > 0 
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length 
    : product.rating

  return (
    <>
      <div className="min-h-screen flex flex-col">
        <Navbar />

        <main className="flex-1">
          <div className="container py-8">
            {/* Breadcrumb */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <Link to="/shop">
                <Button variant="ghost" className="mb-4">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Retour à la boutique
                </Button>
              </Link>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-12 mb-16">
              {/* Product Images */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-4"
              >
                <div className="relative aspect-square overflow-hidden rounded-2xl bg-gray-100 dark:bg-gray-800">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={selectedImage}
                      src={product.images[selectedImage] || product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                      initial={{ opacity: 0, scale: 1.1 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                    />
                  </AnimatePresence>
                  
                  {/* Like Button */}
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleLikeClick}
                    className={`absolute top-4 right-4 h-10 w-10 rounded-full backdrop-blur-sm ${
                      theme === 'light'
                        ? 'bg-white/90 hover:bg-white text-gray-600 hover:text-red-500'
                        : 'bg-gray-800/90 hover:bg-gray-800 text-gray-400 hover:text-red-400'
                    } ${isLiked(product._id) ? 'text-red-500' : ''}`}
                    aria-label="Toggle like"
                  >
                    <Heart className={`h-5 w-5 transition-all duration-200 ${
                      isLiked(product._id) ? 'fill-current' : ''
                    }`} />
                  </Button>

                  {/* Share Button */}
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`absolute top-4 left-4 h-10 w-10 rounded-full backdrop-blur-sm ${
                      theme === 'light'
                        ? 'bg-white/90 hover:bg-white text-gray-600 hover:text-gray-900'
                        : 'bg-gray-800/90 hover:bg-gray-800 text-gray-400 hover:text-white'
                    }`}
                    aria-label="Share product"
                  >
                    <Share2 className="h-5 w-5" />
                  </Button>
                </div>

                {/* Image Gallery */}
                {product.images.length > 1 && (
                  <div className="flex space-x-2 overflow-x-auto">
                    {product.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                          selectedImage === index
                            ? 'border-blue-500'
                            : 'border-transparent hover:border-gray-300'
                        }`}
                      >
                        <img
                          src={image}
                          alt={`${product.name} ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </motion.div>

              {/* Product Info */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
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
                            i < Math.floor(averageRating)
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
                      ({averageRating.toFixed(1)})
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
                  {product.isOnSale && product.discountPercentage && (
                    <Badge className="bg-red-500 text-white">
                      -{product.discountPercentage}%
                    </Badge>
                  )}
                </div>

                {/* Stock Status */}
                <div className="flex items-center space-x-4">
                  <span className={`text-sm ${
                    product.stock > 0 
                      ? 'text-green-600' 
                      : 'text-red-600'
                  }`}>
                    {product.stock > 0 ? 'En stock' : 'Rupture de stock'}
                  </span>
                  {product.stock > 0 && (
                    <span className={`text-sm ${
                      theme === 'light' ? 'text-gray-600' : 'text-gray-400'
                    }`}>
                      {product.stock} unités disponibles
                    </span>
                  )}
                </div>

                {/* Quantity Selector */}
                <div className="flex items-center space-x-4">
                  <span className={`font-medium ${
                    theme === 'light' ? 'text-gray-900' : 'text-white'
                  }`}>
                    Quantité:
                  </span>
                  <div className="flex items-center border rounded-lg">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={quantity <= 1}
                    >
                      -
                    </Button>
                    <span className="px-4 py-2">{quantity}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setQuantity(quantity + 1)}
                      disabled={quantity >= product.stock}
                    >
                      +
                    </Button>
                  </div>
                </div>

                {/* Add to Cart Button */}
                <Button
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  className="w-full h-12 text-lg"
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  {product.stock > 0 ? 'Ajouter au panier' : 'Rupture de stock'}
                </Button>

                {/* Features */}
                <div className="grid grid-cols-3 gap-4 pt-6">
                  <div className="text-center">
                    <Package className="w-6 h-6 mx-auto mb-2 text-blue-500" />
                    <p className={`text-sm ${
                      theme === 'light' ? 'text-gray-600' : 'text-gray-400'
                    }`}>
                      Livraison gratuite
                    </p>
                  </div>
                  <div className="text-center">
                    <Truck className="w-6 h-6 mx-auto mb-2 text-green-500" />
                    <p className={`text-sm ${
                      theme === 'light' ? 'text-gray-600' : 'text-gray-400'
                    }`}>
                      Livraison rapide
                    </p>
                  </div>
                  <div className="text-center">
                    <Shield className="w-6 h-6 mx-auto mb-2 text-purple-500" />
                    <p className={`text-sm ${
                      theme === 'light' ? 'text-gray-600' : 'text-gray-400'
                    }`}>
                      Garantie 2 ans
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Product Details Tabs */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mb-16"
            >
              <Card className={`${
                theme === 'light' ? 'bg-white border-gray-200' : 'bg-gray-800 border-gray-700'
              }`}>
                <CardHeader>
                  <CardTitle className={`${
                    theme === 'light' ? 'text-gray-900' : 'text-white'
                  }`}>
                    Description détaillée
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="prose max-w-none">
                    <p className={`leading-relaxed ${
                      theme === 'light' ? 'text-gray-600' : 'text-gray-300'
                    }`}>
                      {product.description}
                    </p>
                  </div>

                  {/* Product Specifications */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className={`font-semibold mb-3 ${
                        theme === 'light' ? 'text-gray-900' : 'text-white'
                      }`}>
                        Spécifications
                      </h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className={`${
                            theme === 'light' ? 'text-gray-600' : 'text-gray-400'
                          }`}>Marque</span>
                          <span className={`font-medium ${
                            theme === 'light' ? 'text-gray-900' : 'text-white'
                          }`}>{product.brand}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className={`${
                            theme === 'light' ? 'text-gray-600' : 'text-gray-400'
                          }`}>SKU</span>
                          <span className={`font-medium ${
                            theme === 'light' ? 'text-gray-900' : 'text-white'
                          }`}>{product.sku}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className={`${
                            theme === 'light' ? 'text-gray-600' : 'text-gray-400'
                          }`}>Poids</span>
                          <span className={`font-medium ${
                            theme === 'light' ? 'text-gray-900' : 'text-white'
                          }`}>{product.weight} kg</span>
                        </div>
                        <div className="flex justify-between">
                          <span className={`${
                            theme === 'light' ? 'text-gray-600' : 'text-gray-400'
                          }`}>Dimensions</span>
                          <span className={`font-medium ${
                            theme === 'light' ? 'text-gray-900' : 'text-white'
                          }`}>{product.dimensions}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className={`font-semibold mb-3 ${
                        theme === 'light' ? 'text-gray-900' : 'text-white'
                      }`}>
                        Tags
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {product.tags.map((tag, index) => (
                          <Badge key={index} variant="outline">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Reviews Section */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mb-16"
            >
              <Card className={`${
                theme === 'light' ? 'bg-white border-gray-200' : 'bg-gray-800 border-gray-700'
              }`}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className={`${
                      theme === 'light' ? 'text-gray-900' : 'text-white'
                    }`}>
                      Avis clients ({reviews.length})
                    </CardTitle>
                    <Button variant="outline" size="sm">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Laisser un avis
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {reviews.map((review, index) => (
                      <motion.div
                        key={review._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="border-b border-gray-200 dark:border-gray-700 pb-6 last:border-b-0"
                      >
                        <div className="flex items-start space-x-4">
                          <Avatar className="w-10 h-10">
                            <AvatarImage src={review.userAvatar} />
                            <AvatarFallback>
                              {review.userName.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className={`font-medium ${
                                theme === 'light' ? 'text-gray-900' : 'text-white'
                              }`}>
                                {review.userName}
                              </h4>
                              <div className="flex items-center space-x-1">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`w-4 h-4 ${
                                      i < review.rating
                                        ? 'text-yellow-400 fill-current'
                                        : theme === 'light'
                                          ? 'text-gray-300'
                                          : 'text-gray-600'
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>
                            <p className={`mb-3 ${
                              theme === 'light' ? 'text-gray-600' : 'text-gray-300'
                            }`}>
                              {review.comment}
                            </p>
                            <div className="flex items-center justify-between">
                              <span className={`text-sm ${
                                theme === 'light' ? 'text-gray-500' : 'text-gray-400'
                              }`}>
                                {new Date(review.createdAt).toLocaleDateString()}
                              </span>
                              <Button variant="ghost" size="sm">
                                <ThumbsUp className="w-4 h-4 mr-1" />
                                Utile ({review.helpful})
                              </Button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Related Products */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <div className="flex items-center justify-between mb-8">
                <h2 className={`text-2xl font-bold ${
                  theme === 'light' ? 'text-gray-900' : 'text-white'
                }`}>
                  Produits similaires
                </h2>
                <Link to="/shop">
                  <Button variant="outline">
                    Voir tout
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map((relatedProduct, index) => (
                  <motion.div
                    key={relatedProduct._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <ProductCard product={relatedProduct} />
                  </motion.div>
                ))}
              </div>
            </motion.div>
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
