import { Star } from "lucide-react"
import { useTheme } from "../context/ThemeContext"

interface StarRatingProps {
  rating: number
  maxRating?: number
  size?: "sm" | "md" | "lg"
  showValue?: boolean
  className?: string
}

export function StarRating({ 
  rating, 
  maxRating = 5, 
  size = "md", 
  showValue = false,
  className = ""
}: StarRatingProps) {
  const { theme } = useTheme()
  
  const sizeClasses = {
    sm: "w-3 h-3",
    md: "w-4 h-4", 
    lg: "w-5 h-5"
  }

  const sizeClass = sizeClasses[size]

  return (
    <div className={`flex items-center space-x-1 ${className}`}>
      {[...Array(maxRating)].map((_, i) => (
        <Star
          key={i}
          className={`${sizeClass} ${
            i < Math.floor(rating)
              ? 'text-yellow-400 fill-current'
              : theme === 'light'
                ? 'text-gray-300'
                : 'text-gray-600'
          }`}
        />
      ))}
      {showValue && (
        <span className={`text-sm ${
          theme === 'light' ? 'text-gray-600' : 'text-gray-400'
        }`}>
          ({rating.toFixed(1)})
        </span>
      )}
    </div>
  )
} 