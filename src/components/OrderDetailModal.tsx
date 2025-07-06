"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Button } from "./ui/button"
import { Card, CardContent, CardHeader } from "./ui/card"
import { Badge } from "./ui/badge"
import { Separator } from "./ui/separator"
import { 
  X, 
  User, 
  MapPin, 
  CreditCard, 
  Package, 
  Truck, 
  RotateCcw,
  Calendar,
  Mail,
  Phone
} from "lucide-react"
import { useTheme } from "../context/ThemeContext"

interface OrderProduct {
  name: string
  quantity: number
  price: number
  image?: string
}

interface Order {
  id: string
  customer: string
  email: string
  phone?: string
  products: OrderProduct[]
  total: number
  status: string
  date: string
  shippingAddress: string
  paymentMethod: string
  returnStatus?: string
  trackingNumber?: string
  estimatedDelivery?: string
}

interface OrderDetailModalProps {
  isOpen: boolean
  onClose: () => void
  order: Order | null
}

export function OrderDetailModal({ isOpen, onClose, order }: OrderDetailModalProps) {
  const { theme } = useTheme()

  if (!order) return null

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
      case "pending": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400"
      case "shipped": return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400"
      case "returned": return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400"
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <Card className={`w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl ${
              theme === 'light'
                ? 'bg-white border-gray-200'
                : 'bg-gray-800 border-gray-700'
            }`}>
              <CardHeader className={`relative p-6 pb-4 ${
                theme === 'light' ? 'bg-gray-50' : 'bg-gray-700'
              }`}>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onClose}
                  className={`absolute top-4 right-4 h-8 w-8 rounded-full ${
                    theme === 'light'
                      ? 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                      : 'text-gray-400 hover:text-gray-200 hover:bg-gray-600'
                  }`}
                >
                  <X className="h-4 w-4" />
                </Button>

                <div className="flex items-center justify-between">
                  <div>
                    <h2 className={`text-xl font-bold ${
                      theme === 'light' ? 'text-gray-900' : 'text-white'
                    }`}>
                      Order Details - {order.id}
                    </h2>
                    <p className={`text-sm ${
                      theme === 'light' ? 'text-gray-600' : 'text-gray-400'
                    }`}>
                      Placed on {order.date}
                    </p>
                  </div>
                  <Badge className={getStatusColor(order.status)}>
                    {order.status}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Customer Information */}
                  <Card className={`${
                    theme === 'light' ? 'bg-gray-50 border-gray-200' : 'bg-gray-700 border-gray-600'
                  }`}>
                    <CardHeader className="pb-3">
                      <h3 className={`text-lg font-semibold flex items-center ${
                        theme === 'light' ? 'text-gray-900' : 'text-white'
                      }`}>
                        <User className="h-5 w-5 mr-2" />
                        Customer Information
                      </h3>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div>
                        <p className={`font-medium ${
                          theme === 'light' ? 'text-gray-900' : 'text-white'
                        }`}>
                          {order.customer}
                        </p>
                        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                          <Mail className="h-4 w-4 mr-1" />
                          {order.email}
                        </div>
                        {order.phone && (
                          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                            <Phone className="h-4 w-4 mr-1" />
                            {order.phone}
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Shipping Information */}
                  <Card className={`${
                    theme === 'light' ? 'bg-gray-50 border-gray-200' : 'bg-gray-700 border-gray-600'
                  }`}>
                    <CardHeader className="pb-3">
                      <h3 className={`text-lg font-semibold flex items-center ${
                        theme === 'light' ? 'text-gray-900' : 'text-white'
                      }`}>
                        <MapPin className="h-5 w-5 mr-2" />
                        Shipping Information
                      </h3>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <p className={`text-sm ${
                        theme === 'light' ? 'text-gray-700' : 'text-gray-300'
                      }`}>
                        {order.shippingAddress}
                      </p>
                      {order.trackingNumber && (
                        <div>
                          <p className={`text-sm font-medium ${
                            theme === 'light' ? 'text-gray-900' : 'text-white'
                          }`}>
                            Tracking Number:
                          </p>
                          <p className={`text-sm ${
                            theme === 'light' ? 'text-gray-600' : 'text-gray-400'
                          }`}>
                            {order.trackingNumber}
                          </p>
                        </div>
                      )}
                      {order.estimatedDelivery && (
                        <div>
                          <p className={`text-sm font-medium ${
                            theme === 'light' ? 'text-gray-900' : 'text-white'
                          }`}>
                            Estimated Delivery:
                          </p>
                          <p className={`text-sm ${
                            theme === 'light' ? 'text-gray-600' : 'text-gray-400'
                          }`}>
                            {order.estimatedDelivery}
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>

                <Separator className="my-6" />

                {/* Products */}
                <div>
                  <h3 className={`text-lg font-semibold mb-4 flex items-center ${
                    theme === 'light' ? 'text-gray-900' : 'text-white'
                  }`}>
                    <Package className="h-5 w-5 mr-2" />
                    Products ({order.products.length})
                  </h3>
                  <div className="space-y-3">
                    {order.products.map((product, index) => (
                      <div key={index} className={`flex items-center justify-between p-4 rounded-lg ${
                        theme === 'light' ? 'bg-gray-50' : 'bg-gray-700'
                      }`}>
                        <div className="flex items-center space-x-4">
                          {product.image && (
                            <img
                              src={product.image}
                              alt={product.name}
                              className="h-12 w-12 rounded-lg object-cover"
                            />
                          )}
                          <div>
                            <p className={`font-medium ${
                              theme === 'light' ? 'text-gray-900' : 'text-white'
                            }`}>
                              {product.name}
                            </p>
                            <p className={`text-sm ${
                              theme === 'light' ? 'text-gray-600' : 'text-gray-400'
                            }`}>
                              Quantity: {product.quantity}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className={`font-bold ${
                            theme === 'light' ? 'text-gray-900' : 'text-white'
                          }`}>
                            ${(product.price * product.quantity).toFixed(2)}
                          </p>
                          <p className={`text-sm ${
                            theme === 'light' ? 'text-gray-600' : 'text-gray-400'
                          }`}>
                            ${product.price} each
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator className="my-6" />

                {/* Payment and Total */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className={`${
                    theme === 'light' ? 'bg-gray-50 border-gray-200' : 'bg-gray-700 border-gray-600'
                  }`}>
                    <CardHeader className="pb-3">
                      <h3 className={`text-lg font-semibold flex items-center ${
                        theme === 'light' ? 'text-gray-900' : 'text-white'
                      }`}>
                        <CreditCard className="h-5 w-5 mr-2" />
                        Payment Information
                      </h3>
                    </CardHeader>
                    <CardContent>
                      <p className={`${
                        theme === 'light' ? 'text-gray-700' : 'text-gray-300'
                      }`}>
                        Method: {order.paymentMethod}
                      </p>
                    </CardContent>
                  </Card>

                  <Card className={`${
                    theme === 'light' ? 'bg-gray-50 border-gray-200' : 'bg-gray-700 border-gray-600'
                  }`}>
                    <CardHeader className="pb-3">
                      <h3 className={`text-lg font-semibold ${
                        theme === 'light' ? 'text-gray-900' : 'text-white'
                      }`}>
                        Order Summary
                      </h3>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="flex justify-between">
                        <span className={theme === 'light' ? 'text-gray-600' : 'text-gray-400'}>
                          Subtotal:
                        </span>
                        <span className={theme === 'light' ? 'text-gray-900' : 'text-white'}>
                          ${order.total.toFixed(2)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className={theme === 'light' ? 'text-gray-600' : 'text-gray-400'}>
                          Shipping:
                        </span>
                        <span className={theme === 'light' ? 'text-gray-900' : 'text-white'}>
                          Free
                        </span>
                      </div>
                      <Separator />
                      <div className="flex justify-between font-bold text-lg">
                        <span className={theme === 'light' ? 'text-gray-900' : 'text-white'}>
                          Total:
                        </span>
                        <span className={theme === 'light' ? 'text-gray-900' : 'text-white'}>
                          ${order.total.toFixed(2)}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Return Information */}
                {order.returnStatus && (
                  <>
                    <Separator className="my-6" />
                    <Card className={`${
                      theme === 'light' ? 'bg-red-50 border-red-200' : 'bg-red-900/20 border-red-700'
                    }`}>
                      <CardHeader className="pb-3">
                        <h3 className={`text-lg font-semibold flex items-center text-red-800 dark:text-red-400 ${
                          theme === 'light' ? 'text-red-800' : 'text-red-400'
                        }`}>
                          <RotateCcw className="h-5 w-5 mr-2" />
                          Return Information
                        </h3>
                      </CardHeader>
                      <CardContent>
                        <p className={`${
                          theme === 'light' ? 'text-red-700' : 'text-red-300'
                        }`}>
                          Reason: {order.returnStatus}
                        </p>
                      </CardContent>
                    </Card>
                  </>
                )}

                {/* Action Buttons */}
                <div className="flex justify-end space-x-3 pt-6 border-t">
                  <Button variant="outline" onClick={onClose}>
                    Close
                  </Button>
                  <Button
                    onClick={() => {
                      console.log("Updating order status:", order.id)
                      alert(`Update status for order ${order.id}`)
                    }}
                  >
                    Update Status
                  </Button>
                  {order.status === 'completed' && !order.returnStatus && (
                    <Button
                      variant="outline"
                      className="text-orange-600 border-orange-600 hover:bg-orange-50 dark:hover:bg-orange-900/20"
                      onClick={() => {
                        console.log("Processing return for order:", order.id)
                        alert(`Process return for order ${order.id}`)
                      }}
                    >
                      <RotateCcw className="h-4 w-4 mr-2" />
                      Process Return
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
} 