"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Badge } from "../components/ui/badge"
import { Input } from "../components/ui/input"
import { 
  ShoppingCart, 
  Search,
  Filter,
  Eye,
  Truck,
  RotateCcw,
  CheckCircle,
  Clock,
  AlertCircle
} from "lucide-react"
import { useTheme } from "../context/ThemeContext"
import { AdminNavbar } from "../components/AdminNavbar"

export default function AdminOrders() {
  const { theme } = useTheme()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedOrder, setSelectedOrder] = useState(null)

  // Mock orders data
  const orders = [
    {
      id: "ORD-001",
      customer: "John Doe",
      email: "john@example.com",
      date: "2024-01-15",
      status: "completed",
      total: 299.99,
      items: [
        { name: "Wireless Headphones", quantity: 1, price: 199.99 },
        { name: "Phone Case", quantity: 2, price: 50.00 }
      ],
      shippingAddress: "123 Main St, City, State 12345",
      paymentMethod: "Credit Card",
      returnInfo: null
    },
    {
      id: "ORD-002",
      customer: "Jane Smith",
      email: "jane@example.com",
      date: "2024-01-14",
      status: "pending",
      total: 149.99,
      items: [
        { name: "Smart Watch", quantity: 1, price: 149.99 }
      ],
      shippingAddress: "456 Oak Ave, City, State 12345",
      paymentMethod: "PayPal",
      returnInfo: null
    },
    {
      id: "ORD-003",
      customer: "Mike Johnson",
      email: "mike@example.com",
      date: "2024-01-13",
      status: "shipped",
      total: 89.99,
      items: [
        { name: "Bluetooth Speaker", quantity: 1, price: 89.99 }
      ],
      shippingAddress: "789 Pine Rd, City, State 12345",
      paymentMethod: "Credit Card",
      returnInfo: null
    },
    {
      id: "ORD-004",
      customer: "Sarah Wilson",
      email: "sarah@example.com",
      date: "2024-01-12",
      status: "returned",
      total: 199.99,
      items: [
        { name: "Laptop Stand", quantity: 1, price: 199.99 }
      ],
      shippingAddress: "321 Elm St, City, State 12345",
      paymentMethod: "Credit Card",
      returnInfo: {
        reason: "Defective product",
        returnDate: "2024-01-20",
        refundAmount: 199.99
      }
    }
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-600" />
      case "shipped":
        return <Truck className="h-4 w-4 text-blue-600" />
      case "returned":
        return <RotateCcw className="h-4 w-4 text-red-600" />
      default:
        return <AlertCircle className="h-4 w-4 text-gray-600" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">Completed</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400">Pending</Badge>
      case "shipped":
        return <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400">Shipped</Badge>
      case "returned":
        return <Badge className="bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400">Returned</Badge>
      default:
        return <Badge className="bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400">Unknown</Badge>
    }
  }

  const filteredOrders = orders.filter(order =>
    order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.id.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const stats = {
    totalOrders: orders.length,
    completedOrders: orders.filter(o => o.status === 'completed').length,
    pendingOrders: orders.filter(o => o.status === 'pending').length,
    returnedOrders: orders.filter(o => o.status === 'returned').length,
    totalRevenue: orders.filter(o => o.status === 'completed').reduce((sum, o) => sum + o.total, 0)
  }

  return (
    <>
      <div className="min-h-screen flex flex-col">
        <AdminNavbar />
        <main className="flex-1">
          <div className="container py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className={`text-3xl font-bold mb-2 ${
          theme === 'light' ? 'text-gray-900' : 'text-white'
        }`}>
          Orders
        </h1>
        <p className={`${
          theme === 'light' ? 'text-gray-600' : 'text-gray-400'
        }`}>
          Manage customer orders and returns
        </p>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
      >
        <Card className={`${
          theme === 'light' ? 'bg-white border-gray-200' : 'bg-gray-800 border-gray-700'
        }`}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className={`text-sm font-medium ${
              theme === 'light' ? 'text-gray-600' : 'text-gray-400'
            }`}>
              Total Orders
            </CardTitle>
            <ShoppingCart className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${
              theme === 'light' ? 'text-gray-900' : 'text-white'
            }`}>
              {stats.totalOrders}
            </div>
          </CardContent>
        </Card>

        <Card className={`${
          theme === 'light' ? 'bg-white border-gray-200' : 'bg-gray-800 border-gray-700'
        }`}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className={`text-sm font-medium ${
              theme === 'light' ? 'text-gray-600' : 'text-gray-400'
            }`}>
              Completed
            </CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${
              theme === 'light' ? 'text-gray-900' : 'text-white'
            }`}>
              {stats.completedOrders}
            </div>
          </CardContent>
        </Card>

        <Card className={`${
          theme === 'light' ? 'bg-white border-gray-200' : 'bg-gray-800 border-gray-700'
        }`}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className={`text-sm font-medium ${
              theme === 'light' ? 'text-gray-600' : 'text-gray-400'
            }`}>
              Pending
            </CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${
              theme === 'light' ? 'text-gray-900' : 'text-white'
            }`}>
              {stats.pendingOrders}
            </div>
          </CardContent>
        </Card>

        <Card className={`${
          theme === 'light' ? 'bg-white border-gray-200' : 'bg-gray-800 border-gray-700'
        }`}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className={`text-sm font-medium ${
              theme === 'light' ? 'text-gray-600' : 'text-gray-400'
            }`}>
              Total Revenue
            </CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${
              theme === 'light' ? 'text-gray-900' : 'text-white'
            }`}>
              ${stats.totalRevenue.toLocaleString()}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Search */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mb-6"
      >
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search orders by customer or order ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline" className="flex items-center space-x-2">
            <Filter className="h-4 w-4" />
            <span>Filter</span>
          </Button>
        </div>
      </motion.div>

      {/* Orders Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Card className={`${
          theme === 'light' ? 'bg-white border-gray-200' : 'bg-gray-800 border-gray-700'
        }`}>
          <CardHeader>
            <CardTitle className={`${
              theme === 'light' ? 'text-gray-900' : 'text-white'
            }`}>
              Order Management ({filteredOrders.length} orders)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className={`border-b ${
                    theme === 'light' ? 'border-gray-200' : 'border-gray-700'
                  }`}>
                    <th className={`text-left py-3 px-4 font-medium ${
                      theme === 'light' ? 'text-gray-600' : 'text-gray-400'
                    }`}>Order ID</th>
                    <th className={`text-left py-3 px-4 font-medium ${
                      theme === 'light' ? 'text-gray-600' : 'text-gray-400'
                    }`}>Customer</th>
                    <th className={`text-left py-3 px-4 font-medium ${
                      theme === 'light' ? 'text-gray-600' : 'text-gray-400'
                    }`}>Date</th>
                    <th className={`text-left py-3 px-4 font-medium ${
                      theme === 'light' ? 'text-gray-600' : 'text-gray-400'
                    }`}>Total</th>
                    <th className={`text-left py-3 px-4 font-medium ${
                      theme === 'light' ? 'text-gray-600' : 'text-gray-400'
                    }`}>Status</th>
                    <th className={`text-left py-3 px-4 font-medium ${
                      theme === 'light' ? 'text-gray-600' : 'text-gray-400'
                    }`}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((order) => (
                    <tr key={order.id} className={`border-b ${
                      theme === 'light' ? 'border-gray-100' : 'border-gray-800'
                    }`}>
                      <td className={`py-4 px-4 font-mono ${
                        theme === 'light' ? 'text-gray-900' : 'text-white'
                      }`}>
                        {order.id}
                      </td>
                      <td className="py-4 px-4">
                        <div>
                          <p className={`font-medium ${
                            theme === 'light' ? 'text-gray-900' : 'text-white'
                          }`}>{order.customer}</p>
                          <p className={`text-sm ${
                            theme === 'light' ? 'text-gray-500' : 'text-gray-400'
                          }`}>{order.email}</p>
                        </div>
                      </td>
                      <td className={`py-4 px-4 ${
                        theme === 'light' ? 'text-gray-700' : 'text-gray-300'
                      }`}>
                        {order.date}
                      </td>
                      <td className={`py-4 px-4 font-semibold ${
                        theme === 'light' ? 'text-gray-900' : 'text-white'
                      }`}>
                        ${order.total}
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(order.status)}
                          {getStatusBadge(order.status)}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setSelectedOrder(order)}
                            className="p-1"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          {order.status === 'pending' && (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="p-1 text-green-600 hover:text-green-700"
                            >
                              <CheckCircle className="h-4 w-4" />
                            </Button>
                          )}
                          {order.status === 'completed' && (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="p-1 text-blue-600 hover:text-blue-700"
                            >
                              <Truck className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className={`max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto rounded-lg ${
            theme === 'light' ? 'bg-white' : 'bg-gray-800'
          }`}>
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className={`text-xl font-bold ${
                  theme === 'light' ? 'text-gray-900' : 'text-white'
                }`}>
                  Order Details - {selectedOrder.id}
                </h2>
                <Button
                  variant="ghost"
                  onClick={() => setSelectedOrder(null)}
                  className="p-1"
                >
                  ✕
                </Button>
              </div>

              <div className="space-y-6">
                {/* Customer Info */}
                <div>
                  <h3 className={`font-semibold mb-2 ${
                    theme === 'light' ? 'text-gray-900' : 'text-white'
                  }`}>Customer Information</h3>
                  <div className={`p-3 rounded-lg ${
                    theme === 'light' ? 'bg-gray-50' : 'bg-gray-700'
                  }`}>
                    <p className={`${
                      theme === 'light' ? 'text-gray-700' : 'text-gray-300'
                    }`}>
                      <strong>Name:</strong> {selectedOrder.customer}
                    </p>
                    <p className={`${
                      theme === 'light' ? 'text-gray-700' : 'text-gray-300'
                    }`}>
                      <strong>Email:</strong> {selectedOrder.email}
                    </p>
                    <p className={`${
                      theme === 'light' ? 'text-gray-700' : 'text-gray-300'
                    }`}>
                      <strong>Shipping Address:</strong> {selectedOrder.shippingAddress}
                    </p>
                  </div>
                </div>

                {/* Order Items */}
                <div>
                  <h3 className={`font-semibold mb-2 ${
                    theme === 'light' ? 'text-gray-900' : 'text-white'
                  }`}>Order Items</h3>
                  <div className={`p-3 rounded-lg ${
                    theme === 'light' ? 'bg-gray-50' : 'bg-gray-700'
                  }`}>
                    {selectedOrder.items.map((item, index) => (
                      <div key={index} className="flex justify-between items-center py-2">
                        <div>
                          <p className={`font-medium ${
                            theme === 'light' ? 'text-gray-900' : 'text-white'
                          }`}>{item.name}</p>
                          <p className={`text-sm ${
                            theme === 'light' ? 'text-gray-600' : 'text-gray-400'
                          }`}>Qty: {item.quantity}</p>
                        </div>
                        <p className={`font-semibold ${
                          theme === 'light' ? 'text-gray-900' : 'text-white'
                        }`}>${item.price}</p>
                      </div>
                    ))}
                    <div className={`border-t pt-2 mt-2 ${
                      theme === 'light' ? 'border-gray-200' : 'border-gray-600'
                    }`}>
                      <div className="flex justify-between items-center">
                        <span className={`font-bold ${
                          theme === 'light' ? 'text-gray-900' : 'text-white'
                        }`}>Total:</span>
                        <span className={`font-bold text-lg ${
                          theme === 'light' ? 'text-gray-900' : 'text-white'
                        }`}>${selectedOrder.total}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Return Information */}
                {selectedOrder.returnInfo && (
                  <div>
                    <h3 className={`font-semibold mb-2 ${
                      theme === 'light' ? 'text-gray-900' : 'text-white'
                    }`}>Return Information</h3>
                    <div className={`p-3 rounded-lg ${
                      theme === 'light' ? 'bg-red-50' : 'bg-red-900/20'
                    }`}>
                      <p className={`${
                        theme === 'light' ? 'text-red-800' : 'text-red-400'
                      }`}>
                        <strong>Reason:</strong> {selectedOrder.returnInfo.reason}
                      </p>
                      <p className={`${
                        theme === 'light' ? 'text-red-800' : 'text-red-400'
                      }`}>
                        <strong>Return Date:</strong> {selectedOrder.returnInfo.returnDate}
                      </p>
                      <p className={`${
                        theme === 'light' ? 'text-red-800' : 'text-red-400'
                      }`}>
                        <strong>Refund Amount:</strong> ${selectedOrder.returnInfo.refundAmount}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
          </div>
        </main>
      </div>
    </>
  )
} 