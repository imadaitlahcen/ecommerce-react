import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Heart, Share2, ZoomIn } from "lucide-react"
import { Button } from "./ui/button"
import { useTheme } from "../context/ThemeContext"

interface ProductGalleryProps {
  images: string[]
  productName: string
  isLiked: boolean
  onLikeClick: () => void
  onShareClick: () => void
}

export function ProductGallery({ 
  images, 
  productName, 
  isLiked, 
  onLikeClick, 
  onShareClick 
}: ProductGalleryProps) {
  const { theme } = useTheme()
  const [selectedImage, setSelectedImage] = useState(0)

  const mainImage = images[selectedImage] || images[0]

  return (
    <div className="space-y-4">
      {/* Image principale */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative aspect-square overflow-hidden rounded-2xl bg-gray-100 dark:bg-gray-800 group"
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={selectedImage}
            src={mainImage}
            alt={`${productName} ${selectedImage + 1}`}
            className="w-full h-full object-cover"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          />
        </AnimatePresence>
        
        {/* Bouton Like */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onLikeClick}
          className={`absolute top-4 right-4 h-10 w-10 rounded-full backdrop-blur-sm transition-all ${
            theme === 'light'
              ? 'bg-white/90 hover:bg-white text-gray-600 hover:text-red-500'
              : 'bg-gray-800/90 hover:bg-gray-800 text-gray-400 hover:text-red-400'
          } ${isLiked ? 'text-red-500' : ''}`}
          aria-label="Toggle like"
        >
          <Heart className={`h-5 w-5 transition-all duration-200 ${
            isLiked ? 'fill-current' : ''
          }`} />
        </Button>

        {/* Bouton Share */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onShareClick}
          className={`absolute top-4 left-4 h-10 w-10 rounded-full backdrop-blur-sm transition-all ${
            theme === 'light'
              ? 'bg-white/90 hover:bg-white text-gray-600 hover:text-gray-900'
              : 'bg-gray-800/90 hover:bg-gray-800 text-gray-400 hover:text-white'
          }`}
          aria-label="Share product"
        >
          <Share2 className="h-5 w-5" />
        </Button>

        {/* Bouton Zoom (pour future fonctionnalité) */}
        <Button
          variant="ghost"
          size="icon"
          className={`absolute bottom-4 right-4 h-10 w-10 rounded-full backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all ${
            theme === 'light'
              ? 'bg-white/90 hover:bg-white text-gray-600 hover:text-gray-900'
              : 'bg-gray-800/90 hover:bg-gray-800 text-gray-400 hover:text-white'
          }`}
          aria-label="Zoom image"
        >
          <ZoomIn className="h-5 w-5" />
        </Button>
      </motion.div>

      {/* Galerie miniatures */}
      {images.length > 1 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex space-x-2 overflow-x-auto pb-2"
        >
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all hover:scale-105 ${
                selectedImage === index
                  ? 'border-blue-500 ring-2 ring-blue-200'
                  : 'border-transparent hover:border-gray-300'
              }`}
            >
              <img
                src={image}
                alt={`${productName} ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </motion.div>
      )}
    </div>
  )
} 