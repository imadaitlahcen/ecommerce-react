import { motion } from "framer-motion"
import { ThumbsUp, MessageCircle } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Button } from "./ui/button"
import { StarRating } from "./StarRating"
import { useTheme } from "../context/ThemeContext"

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

interface ReviewCardProps {
  review: Review
  index: number
}

export function ReviewCard({ review, index }: ReviewCardProps) {
  const { theme } = useTheme()

  return (
    <motion.div
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
            <StarRating rating={review.rating} size="sm" />
          </div>
          
          <p className={`mb-3 leading-relaxed ${
            theme === 'light' ? 'text-gray-600' : 'text-gray-300'
          }`}>
            {review.comment}
          </p>
          
          <div className="flex items-center justify-between">
            <span className={`text-sm ${
              theme === 'light' ? 'text-gray-500' : 'text-gray-400'
            }`}>
              {new Date(review.createdAt).toLocaleDateString('fr-FR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </span>
            
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" className="h-8">
                <ThumbsUp className="w-4 h-4 mr-1" />
                Utile ({review.helpful})
              </Button>
              <Button variant="ghost" size="sm" className="h-8">
                <MessageCircle className="w-4 h-4 mr-1" />
                Répondre
              </Button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
} 