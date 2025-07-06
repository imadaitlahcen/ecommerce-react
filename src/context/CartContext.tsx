"use client"

import type React from "react"
import { createContext, useContext, useReducer, useEffect } from "react"
import type { Product } from "../data/products"

export interface CartItem extends Product {
  quantity: number
}

interface CartState {
  items: CartItem[]
  total: number
}

interface CartContextType extends CartState {
  addItem: (product: Product) => void
  removeItem: (productId: number) => void
  updateQuantity: (productId: number, quantity: number) => void
  clearCart: () => void
  getItemCount: () => number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

type CartAction =
  | { type: "ADD_ITEM"; payload: Product }
  | { type: "REMOVE_ITEM"; payload: number }
  | { type: "UPDATE_QUANTITY"; payload: { id: number; quantity: number } }
  | { type: "CLEAR_CART" }
  | { type: "LOAD_CART"; payload: CartItem[] }

function cartReducer(state: CartState, action: CartAction): CartState {
  console.log('Cart reducer action:', action.type, 'payload:', 'payload' in action ? action.payload : 'none') // Debug log

  switch (action.type) {
    case "ADD_ITEM": {
      const existingItem = state.items.find((item) => item.id === action.payload.id)

      if (existingItem) {
        const updatedItems = state.items.map((item) =>
          item.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item,
        )
        const newTotal = updatedItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
        console.log('Updated existing item, new total:', newTotal) // Debug log
        return {
          items: updatedItems,
          total: newTotal,
        }
      } else {
        const newItems = [...state.items, { ...action.payload, quantity: 1 }]
        const newTotal = newItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
        console.log('Added new item, new total:', newTotal) // Debug log
        return {
          items: newItems,
          total: newTotal,
        }
      }
    }

    case "REMOVE_ITEM": {
      const newItems = state.items.filter((item) => item.id !== action.payload)
      const newTotal = newItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
      console.log('Removed item, new total:', newTotal) // Debug log
      return {
        items: newItems,
        total: newTotal,
      }
    }

    case "UPDATE_QUANTITY": {
      if (action.payload.quantity === 0) {
        const newItems = state.items.filter((item) => item.id !== action.payload.id)
        const newTotal = newItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
        console.log('Quantity set to 0, removed item, new total:', newTotal) // Debug log
        return {
          items: newItems,
          total: newTotal,
        }
      }

      const updatedItems = state.items.map((item) =>
        item.id === action.payload.id ? { ...item, quantity: action.payload.quantity } : item,
      )
      const newTotal = updatedItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
      console.log('Updated quantity, new total:', newTotal) // Debug log
      return {
        items: updatedItems,
        total: newTotal,
      }
    }

    case "CLEAR_CART":
      console.log('Clearing cart') // Debug log
      return { items: [], total: 0 }

    case "LOAD_CART":
      const loadedTotal = action.payload.reduce((sum, item) => sum + item.price * item.quantity, 0)
      console.log('Loaded cart from storage, total:', loadedTotal) // Debug log
      return {
        items: action.payload,
        total: loadedTotal,
      }

    default:
      return state
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [], total: 0 })

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("cart")
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart)
        console.log('Loading cart from localStorage:', parsedCart) // Debug log
        dispatch({ type: "LOAD_CART", payload: parsedCart })
      } catch (error) {
        console.error("Error loading cart from localStorage:", error)
      }
    } else {
      console.log('No saved cart found in localStorage') // Debug log
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    console.log('Saving cart to localStorage:', state.items) // Debug log
    localStorage.setItem("cart", JSON.stringify(state.items))
  }, [state.items])

  const addItem = (product: Product) => {
    console.log('Adding item to cart:', product.name, product.id) // Debug log
    dispatch({ type: "ADD_ITEM", payload: product })
  }

  const removeItem = (productId: number) => {
    console.log('Removing item from cart:', productId) // Debug log
    dispatch({ type: "REMOVE_ITEM", payload: productId })
  }

  const updateQuantity = (productId: number, quantity: number) => {
    console.log('Updating quantity for item:', productId, 'to:', quantity) // Debug log
    dispatch({ type: "UPDATE_QUANTITY", payload: { id: productId, quantity } })
  }

  const clearCart = () => {
    console.log('Clearing cart') // Debug log
    dispatch({ type: "CLEAR_CART" })
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
