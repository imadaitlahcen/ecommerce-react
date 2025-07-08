"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Button } from "./ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { CheckCircle, XCircle, AlertCircle, Loader } from "lucide-react"
import { useTheme } from "../context/ThemeContext"

interface AuthDialogProps {
  isOpen: boolean
  onClose: () => void
  type: "success" | "error" | "loading"
  title: string
  message: string
  onConfirm?: () => void
  confirmText?: string
}

export function AuthDialog({
  isOpen,
  onClose,
  type,
  title,
  message,
  onConfirm,
  confirmText = "Continue"
}: AuthDialogProps) {
  const { theme } = useTheme()

  const getIcon = () => {
    switch (type) {
      case "success":
        return <CheckCircle className="h-12 w-12 text-green-500" />
      case "error":
        return <XCircle className="h-12 w-12 text-red-500" />
      case "loading":
        return <Loader className="h-12 w-12 text-blue-500 animate-spin" />
      default:
        return <AlertCircle className="h-12 w-12 text-yellow-500" />
    }
  }

  const getCardStyle = () => {
    switch (type) {
      case "success":
        return theme === 'light' 
          ? 'bg-white border-green-200 shadow-lg' 
          : 'bg-gray-800 border-green-700 shadow-lg'
      case "error":
        return theme === 'light' 
          ? 'bg-white border-red-200 shadow-lg' 
          : 'bg-gray-800 border-red-700 shadow-lg'
      case "loading":
        return theme === 'light' 
          ? 'bg-white border-blue-200 shadow-lg' 
          : 'bg-gray-800 border-blue-700 shadow-lg'
      default:
        return theme === 'light' 
          ? 'bg-white border-gray-200 shadow-lg' 
          : 'bg-gray-800 border-gray-700 shadow-lg'
    }
  }

  const getTitleStyle = () => {
    switch (type) {
      case "success":
        return theme === 'light' ? 'text-green-900' : 'text-green-400'
      case "error":
        return theme === 'light' ? 'text-red-900' : 'text-red-400'
      case "loading":
        return theme === 'light' ? 'text-blue-900' : 'text-blue-400'
      default:
        return theme === 'light' ? 'text-gray-900' : 'text-white'
    }
  }

  const getMessageStyle = () => {
    return theme === 'light' ? 'text-gray-600' : 'text-gray-300'
  }

  const getButtonStyle = () => {
    switch (type) {
      case "success":
        return "bg-green-600 hover:bg-green-700 text-white"
      case "error":
        return "bg-red-600 hover:bg-red-700 text-white"
      case "loading":
        return "bg-blue-600 hover:bg-blue-700 text-white"
      default:
        return "bg-gray-600 hover:bg-gray-700 text-white"
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            <Card className={`w-full max-w-md ${getCardStyle()}`}>
              <CardHeader className="text-center pb-4">
                <div className="flex justify-center mb-4">
                  {getIcon()}
                </div>
                <CardTitle className={`text-xl font-semibold ${getTitleStyle()}`}>
                  {title}
                </CardTitle>
              </CardHeader>
              
              <CardContent className="text-center space-y-6">
                <p className={`text-sm leading-relaxed ${getMessageStyle()}`}>
                  {message}
                </p>
                
                <div className="flex flex-col sm:flex-row gap-3">
                  {type === "error" && (
                    <Button
                      variant="outline"
                      onClick={onClose}
                      className="flex-1"
                    >
                      Try Again
                    </Button>
                  )}
                  <Button
                    onClick={onConfirm || onClose}
                    className={`flex-1 ${getButtonStyle()}`}
                    disabled={type === "loading"}
                  >
                    {confirmText}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
} 