import { motion } from "framer-motion"
import { Badge } from "./ui/badge"
import { useTheme } from "../context/ThemeContext"

interface ProductSpecificationsProps {
  product: {
    brand: string
    sku: string
    weight: number
    dimensions: string
    tags: string[]
    category: string
  }
}

export function ProductSpecifications({ product }: ProductSpecificationsProps) {
  const { theme } = useTheme()

  const specifications = [
    { label: "Marque", value: product.brand },
    { label: "SKU", value: product.sku },
    { label: "Poids", value: `${product.weight} kg` },
    { label: "Dimensions", value: product.dimensions },
    { label: "Catégorie", value: product.category },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="space-y-6"
    >
      {/* Spécifications techniques */}
      <div>
        <h4 className={`font-semibold mb-4 ${
          theme === 'light' ? 'text-gray-900' : 'text-white'
        }`}>
          Spécifications techniques
        </h4>
        <div className="space-y-3">
          {specifications.map((spec, index) => (
            <motion.div
              key={spec.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700 last:border-b-0"
            >
              <span className={`${
                theme === 'light' ? 'text-gray-600' : 'text-gray-400'
              }`}>
                {spec.label}
              </span>
              <span className={`font-medium ${
                theme === 'light' ? 'text-gray-900' : 'text-white'
              }`}>
                {spec.value}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Tags */}
      <div>
        <h4 className={`font-semibold mb-3 ${
          theme === 'light' ? 'text-gray-900' : 'text-white'
        }`}>
          Tags
        </h4>
        <div className="flex flex-wrap gap-2">
          {product.tags.map((tag, index) => (
            <motion.div
              key={tag}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Badge variant="outline" className="text-sm">
                {tag}
              </Badge>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
} 