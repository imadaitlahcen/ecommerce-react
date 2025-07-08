import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"
import { Button } from "./ui/button"
import { ProductCard } from "./ProductCard"
import { useTheme } from "../context/ThemeContext"

interface RelatedProduct {
  _id: string
  name: string
  price: number
  image: string
  category: string
  rating: number
}

interface RelatedProductsProps {
  products: RelatedProduct[]
  title?: string
}

export function RelatedProducts({ products, title = "Produits similaires" }: RelatedProductsProps) {
  const { theme } = useTheme()

  if (products.length === 0) {
    return null
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.8 }}
      className="space-y-8"
    >
      <div className="flex items-center justify-between">
        <h2 className={`text-2xl font-bold ${
          theme === 'light' ? 'text-gray-900' : 'text-white'
        }`}>
          {title}
        </h2>
        <Link to="/shop">
          <Button variant="outline">
            Voir tout
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product, index) => (
          <motion.div
            key={product._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -5 }}
          >
            <ProductCard product={product} />
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
} 