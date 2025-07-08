"use client"

import type React from "react"
import { createContext, useContext, useReducer, useEffect } from "react"
import { useAuth } from "./AuthContext"
import axios from "axios"

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

export interface CartItem extends UnifiedProduct {
  quantity: number
}

interface CartState {
  items: CartItem[]
  total: number
  loading: boolean
}

interface CartContextType extends CartState {
  addItem: (product: UnifiedProduct) => void
  removeItem: (productId: string | number) => void
  updateQuantity: (productId: string | number, quantity: number) => void
  clearCart: () => void
  getItemCount: () => number
  loadCartFromBackend: () => Promise<void>
}

const CartContext = createContext<CartContextType | undefined>(undefined)

type CartAction =
  | { type: "ADD_ITEM"; payload: UnifiedProduct }
  | { type: "REMOVE_ITEM"; payload: string | number }
  | { type: "UPDATE_QUANTITY"; payload: { id: string | number; quantity: number } }
  | { type: "CLEAR_CART" }
  | { type: "LOAD_CART"; payload: CartItem[] }
  | { type: "SET_LOADING"; payload: boolean }

function cartReducer(state: CartState, action: CartAction): CartState {
  console.log('Cart reducer action:', action.type, 'payload:', 'payload' in action ? action.payload : 'none')

  switch (action.type) {
    case "ADD_ITEM": {
      const productId = action.payload.id || action.payload._id
      const existingItem = state.items.find((item) => (item.id || item._id) === productId)

      if (existingItem) {
        const updatedItems = state.items.map((item) =>
          (item.id || item._id) === productId ? { ...item, quantity: item.quantity + 1 } : item,
        )
        const newTotal = updatedItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
        return {
          ...state,
          items: updatedItems,
          total: newTotal,
        }
      } else {
        const newItems = [...state.items, { ...action.payload, quantity: 1 }]
        const newTotal = newItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
        return {
          ...state,
          items: newItems,
          total: newTotal,
        }
      }
    }

    case "REMOVE_ITEM": {
      const newItems = state.items.filter((item) => (item.id || item._id) !== action.payload)
      const newTotal = newItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
      return {
        ...state,
        items: newItems,
        total: newTotal,
      }
    }

    case "UPDATE_QUANTITY": {
      if (action.payload.quantity === 0) {
        const newItems = state.items.filter((item) => (item.id || item._id) !== action.payload.id)
        const newTotal = newItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
        return {
          ...state,
          items: newItems,
          total: newTotal,
        }
      }

      const updatedItems = state.items.map((item) =>
        (item.id || item._id) === action.payload.id ? { ...item, quantity: action.payload.quantity } : item,
      )
      const newTotal = updatedItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
      return {
        ...state,
        items: updatedItems,
        total: newTotal,
      }
    }

    case "CLEAR_CART":
      return { ...state, items: [], total: 0 }

    case "LOAD_CART":
      const loadedTotal = action.payload.reduce((sum, item) => sum + item.price * item.quantity, 0)
      return {
        ...state,
        items: action.payload,
        total: loadedTotal,
      }

    case "SET_LOADING":
      return { ...state, loading: action.payload }

    default:
      return state
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [], total: 0, loading: false })
  const { user } = useAuth()

  // API functions for backend communication
  const api = axios.create({
    baseURL: 'http://localhost:3001/api',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  // Add auth token to requests if user is logged in
  api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  })

  const loadCartFromBackend = async () => {
    if (!user) return

    try {
      dispatch({ type: "SET_LOADING", payload: true })
      const response = await api.get('/cart')
      const backendCart = response.data

      // Convert backend cart items to frontend format
      const cartItems: CartItem[] = backendCart.items.map((item: any) => ({
        _id: item.productId,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image || '',
        description: '',
        category: '',
        brand: '',
        rating: 0,
        reviewCount: 0,
        reviews: 0,
        isFeatured: false,
        isOnSale: false,
        discountPercentage: 0,
        stock: 0,
        minStock: 0,
        sku: '',
        isActive: true,
      }))

      dispatch({ type: "LOAD_CART", payload: cartItems })
      console.log('Loaded cart from backend:', cartItems)
    } catch (error) {
      console.error('Error loading cart from backend:', error)
    } finally {
      dispatch({ type: "SET_LOADING", payload: false })
    }
  }

  const syncCartToBackend = async (items: CartItem[]) => {
    if (!user) return

    try {
      // Clear current cart and add all items
      await api.delete('/cart/clear')
      
      // Add each item to backend
      for (const item of items) {
        await api.post('/cart/add', {
          productId: item._id || item.id,
          quantity: item.quantity,
          price: item.price,
          name: item.name,
          image: item.image,
        })
      }
      console.log('Synced cart to backend')
    } catch (error) {
      console.error('Error syncing cart to backend:', error)
    }
  }

  const addItemToBackend = async (product: UnifiedProduct) => {
    if (!user) return

    try {
      await api.post('/cart/add', {
        productId: product._id || product.id,
        quantity: 1,
        price: product.price,
        name: product.name,
        image: product.image,
      })
      console.log('Added item to backend cart')
    } catch (error) {
      console.error('Error adding item to backend cart:', error)
    }
  }

  const updateItemInBackend = async (productId: string | number, quantity: number) => {
    if (!user) return

    try {
      await api.put(`/cart/item/${productId}`, { quantity })
      console.log('Updated item in backend cart')
    } catch (error) {
      console.error('Error updating item in backend cart:', error)
    }
  }

  const removeItemFromBackend = async (productId: string | number) => {
    if (!user) return

    try {
      await api.delete(`/cart/item/${productId}`)
      console.log('Removed item from backend cart')
    } catch (error) {
      console.error('Error removing item from backend cart:', error)
    }
  }

  const clearCartFromBackend = async () => {
    if (!user) return

    try {
      await api.delete('/cart/clear')
      console.log('Cleared backend cart')
    } catch (error) {
      console.error('Error clearing backend cart:', error)
    }
  }

  // Load cart from backend when user logs in
  useEffect(() => {
    if (user) {
      loadCartFromBackend()
    } else {
      // If no user, clear cart (guest mode)
      dispatch({ type: "CLEAR_CART" })
    }
  }, [user?.id])

  const addItem = async (product: UnifiedProduct) => {
    const productId = product.id || product._id
    console.log('Adding item to cart:', product.name, productId)
    
    // Update local state first
    dispatch({ type: "ADD_ITEM", payload: product })
    
    // Sync to backend if user is logged in
    if (user) {
      await addItemToBackend(product)
    }
  }

  const removeItem = async (productId: string | number) => {
    console.log('Removing item from cart:', productId)
    
    // Update local state first
    dispatch({ type: "REMOVE_ITEM", payload: productId })
    
    // Sync to backend if user is logged in
    if (user) {
      await removeItemFromBackend(productId)
    }
  }

  const updateQuantity = async (productId: string | number, quantity: number) => {
    console.log('Updating quantity for item:', productId, 'to:', quantity)
    
    // Update local state first
    dispatch({ type: "UPDATE_QUANTITY", payload: { id: productId, quantity } })
    
    // Sync to backend if user is logged in
    if (user) {
      await updateItemInBackend(productId, quantity)
    }
  }

  const clearCart = async () => {
    console.log('Clearing cart')
    
    // Update local state first
    dispatch({ type: "CLEAR_CART" })
    
    // Sync to backend if user is logged in
    if (user) {
      await clearCartFromBackend()
    }
  }

  const getItemCount = () => {
    return state.items.reduce((sum, item) => sum + item.quantity, 0)
  }

  return (
    <CartContext.Provider
      value={{
        ...state,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        getItemCount,
        loadCartFromBackend,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
