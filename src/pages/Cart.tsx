"use client"

import { Link } from "react-router-dom"
import { Navbar } from "../components/Navbar"
import { Footer } from "../components/Footer"
import { CartItem } from "../components/CartItem"
import { Button } from "../components/ui/button"
import { Separator } from "../components/ui/separator"
import { ShoppingBag } from "lucide-react"
import { useCart } from "../context/CartContext"

export default function Cart() {
  const { items, total, clearCart } = useCart()

  const handleClearCart = async () => {
    try {
      await clearCart()
    } catch (error) {
      console.error('Error clearing cart:', error)
    }
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-4">
            <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground" />
            <h1 className="text-2xl font-bold">Your cart is empty</h1>
            <p className="text-muted-foreground">Add some products to get started!</p>
            <Link to="/shop">
              <Button>Continue Shopping</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        <div className="container py-8">
          <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="space-y-4">
                {items.map((item) => (
                  <CartItem key={item.id || item._id} item={item} />
                ))}
              </div>

              <div className="flex justify-between items-center mt-6 pt-6 border-t">
                <Button variant="outline" onClick={handleClearCart}>
                  Clear Cart
                </Button>
                <Link to="/shop">
                  <Button variant="outline">Continue Shopping</Button>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-muted/50 p-6 rounded-lg space-y-4">
                <h2 className="text-xl font-semibold">Order Summary</h2>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping:</span>
                    <span>Free</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax:</span>
                    <span>${(total * 0.08).toFixed(2)}</span>
                  </div>
                </div>

                <Separator />

                <div className="flex justify-between font-semibold text-lg">
                  <span>Total:</span>
                  <span>${(total * 1.08).toFixed(2)}</span>
                </div>

                <Link to="/checkout" className="block">
                  <Button className="w-full" size="lg">
                    Proceed to Checkout
                  </Button>
                </Link>

                <div className="text-xs text-muted-foreground text-center">Secure checkout powered by Stripe</div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
