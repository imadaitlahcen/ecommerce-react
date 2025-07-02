"use client"

import { Minus, Plus, Trash2 } from "lucide-react"
import { Button } from "../components/ui/button"
import { useCart, type CartItem as CartItemType } from "../context/CartContext"

interface CartItemProps {
  item: CartItemType
}

export function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCart()

  return (
    <div className="flex items-center gap-4 py-4 border-b">
      <div className="relative h-16 w-16 overflow-hidden rounded-md">
        <img src={item.image || "/placeholder.svg"} alt={item.name} className="w-full h-full object-cover" />
      </div>

      <div className="flex-1 space-y-1">
        <h3 className="font-medium line-clamp-1">{item.name}</h3>
        <p className="text-sm text-muted-foreground">${item.price}</p>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 bg-transparent"
          onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
        >
          <Minus className="h-3 w-3" />
        </Button>

        <span className="w-8 text-center text-sm">{item.quantity}</span>

        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 bg-transparent"
          onClick={() => updateQuantity(item.id, item.quantity + 1)}
        >
          <Plus className="h-3 w-3" />
        </Button>
      </div>

      <div className="text-right">
        <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
      </div>

      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 text-destructive hover:text-destructive"
        onClick={() => removeItem(item.id)}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  )
}
