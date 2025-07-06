"use client"

import { motion } from "framer-motion"
import { Navbar } from "../components/Navbar"
import { Footer } from "../components/Footer"
import { ProductCard } from "../components/ProductCard"
import { Button } from "../components/ui/button"
import { Heart, ArrowLeft, ShoppingBag } from "lucide-react"
import { Link } from "react-router-dom"
import { useLikes } from "../context/LikesContext"
import { useTheme } from "../context/ThemeContext"
import { products } from "../data/products"

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

export default function LikedProducts() {
  const { likedProducts, getLikedCount } = useLikes()
  const { theme } = useTheme()

  // Filter products to show only liked ones
  const likedProductsList = products.filter(product => likedProducts.includes(product.id))
  const likedCount = getLikedCount()

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />
      <main className="flex-1">
        {/* Header Section */}
        <section className={`py-16 lg:py-24 ${
          theme === 'light'
            ? 'bg-gradient-to-br from-violet-50 via-white to-blue-50'
            : 'bg-gradient-to-br from-violet-900/10 via-background to-blue-900/10'
        }`}>
          <div className="container">
            <motion.div
              className="text-center space-y-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.div
                className="inline-flex items-center justify-center w-16 h-16 rounded-full mx-auto mb-6"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              >
                <div className={`w-full h-full rounded-full flex items-center justify-center ${
                  theme === 'light'
                    ? 'bg-red-100 text-red-600'
                    : 'bg-red-500/20 text-red-400'
                }`}>
                  <Heart className="w-8 h-8 fill-current" />
                </div>
              </motion.div>

              <motion.h1
                className={`text-4xl lg:text-6xl font-bold bg-clip-text text-transparent ${
                  theme === 'light'
                    ? 'bg-gradient-to-r from-gray-900 via-red-600 to-red-700'
                    : 'bg-gradient-to-r from-white via-red-400 to-red-500'
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                Mes Favoris
              </motion.h1>

              <motion.p
                className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                Découvrez votre collection personnelle de produits que vous avez aimés
              </motion.p>

              <motion.div
                className="flex items-center justify-center space-x-4 text-lg text-muted-foreground"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                <Heart className={`w-5 h-5 ${
                  theme === 'light' ? 'text-red-600' : 'text-red-400'
                }`} />
                <span>{likedCount} produit{likedCount > 1 ? 's' : ''} favori{likedCount > 1 ? 's' : ''}</span>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Products Section */}
        <section className="py-16 lg:py-24">
          <div className="container">
            {likedCount === 0 ? (
              // Empty State
              <motion.div
                className="text-center space-y-8"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <motion.div
                  className="w-24 h-24 mx-auto rounded-full flex items-center justify-center"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                >
                  <div className={`w-full h-full rounded-full flex items-center justify-center ${
                    theme === 'light'
                      ? 'bg-gray-100 text-gray-400'
                      : 'bg-gray-800 text-gray-500'
                  }`}>
                    <Heart className="w-12 h-12" />
                  </div>
                </motion.div>

                <div className="space-y-4">
                  <h2 className={`text-2xl lg:text-3xl font-semibold ${
                    theme === 'light' ? 'text-gray-900' : 'text-white'
                  }`}>
                    Aucun favori pour le moment
                  </h2>
                  <p className="text-lg text-muted-foreground max-w-md mx-auto">
                    Commencez à explorer nos produits et ajoutez vos favoris en cliquant sur le cœur
                  </p>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                >
                  <Link to="/shop">
                    <Button
                      size="lg"
                      className="bg-violet-600 hover:bg-violet-700 text-white px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300 hover:scale-105"
                    >
                      <ShoppingBag className="mr-2 h-5 w-5" />
                      Découvrir les produits
                    </Button>
                  </Link>
                </motion.div>
              </motion.div>
            ) : (
              // Products Grid
              <div className="space-y-12">
                <motion.div
                  className="flex items-center justify-between"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="flex items-center space-x-4">
                    <Link to="/shop">
                      <Button
                        variant="outline"
                        size="sm"
                        className={`flex items-center space-x-2 ${
                          theme === 'light'
                            ? 'border-gray-300 hover:border-violet-500 text-gray-700 hover:text-violet-700 hover:bg-violet-50'
                            : 'border-gray-600 hover:border-violet-500 text-gray-300 hover:text-violet-400 hover:bg-violet-500/10'
                        }`}
                      >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Retour au shop</span>
                      </Button>
                    </Link>
                  </div>

                  <div className={`text-sm text-muted-foreground ${
                    theme === 'light' ? 'text-gray-600' : 'text-gray-400'
                  }`}>
                    {likedCount} produit{likedCount > 1 ? 's' : ''} trouvé{likedCount > 1 ? 's' : ''}
                  </div>
                </motion.div>

                <motion.div
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
                  variants={staggerContainer}
                  initial="initial"
                  animate="animate"
                >
                  {likedProductsList.map((product, index) => (
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

                {/* Continue Shopping CTA */}
                <motion.div
                  className="text-center pt-12"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                >
                  <Link to="/shop">
                    <Button
                      variant="outline"
                      size="lg"
                      className={`px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300 hover:scale-105 ${
                        theme === 'light'
                          ? 'border-gray-300 hover:border-violet-500 text-gray-700 hover:text-violet-700 hover:bg-violet-50'
                          : 'border-gray-600 hover:border-violet-500 text-gray-300 hover:text-violet-400 hover:bg-violet-500/10'
                      }`}
                    >
                      <ShoppingBag className="mr-2 h-5 w-5" />
                      Continuer les achats
                    </Button>
                  </Link>
                </motion.div>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
} 