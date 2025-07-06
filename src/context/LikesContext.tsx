"use client"

import React, { createContext, useContext, useState, useEffect } from 'react'

interface LikesContextType {
  likedProducts: number[]
  toggleLike: (productId: number) => void
  isLiked: (productId: number) => boolean
  getLikedCount: () => number
}

const LikesContext = createContext<LikesContextType | undefined>(undefined)

export function LikesProvider({ children }: { children: React.ReactNode }) {
  const [likedProducts, setLikedProducts] = useState<number[]>([])

  // Load liked products from localStorage on mount
  useEffect(() => {
    const savedLikes = localStorage.getItem('likedProducts')
    if (savedLikes) {
      try {
        setLikedProducts(JSON.parse(savedLikes))
      } catch (error) {
        console.error('Error loading liked products:', error)
      }
    }
  }, [])

  // Save liked products to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('likedProducts', JSON.stringify(likedProducts))
  }, [likedProducts])

  const toggleLike = (productId: number) => {
    setLikedProducts(prev => {
      if (prev.includes(productId)) {
        return prev.filter(id => id !== productId)
      } else {
        return [...prev, productId]
      }
    })
  }

  const isLiked = (productId: number) => {
    return likedProducts.includes(productId)
  }

  const getLikedCount = () => {
    return likedProducts.length
  }

  return (
    <LikesContext.Provider value={{
      likedProducts,
      toggleLike,
      isLiked,
      getLikedCount
    }}>
      {children}
    </LikesContext.Provider>
  )
}

export function useLikes() {
  const context = useContext(LikesContext)
  if (context === undefined) {
    throw new Error('useLikes must be used within a LikesProvider')
  }
  return context
} 