"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { 
  Users, 
  Package, 
  ShoppingCart, 
  DollarSign, 
  TrendingUp, 
  Settings,
  Plus,
  Edit,
  Trash2,
  Eye,
  Search,
  Filter,
  Clock,
  Truck,
  RotateCcw
} from "lucide-react"
import { useTheme } from "../context/ThemeContext"
import { products } from "../data/products"
import { AdminProductModal } from "../components/AdminProductModal"
import { AdminNavbar } from "../components/AdminNavbar"
import { useState } from "react"

export default function AdminDashboard() {
  const { theme } = useTheme()
  const [showProductModal, setShowProductModal] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)

  // Mock data for admin dashboard
  const stats = {
    totalUsers: 1247,
    totalProducts: products.length,
    totalOrders: 89,
    totalRevenue: 15420.50,
    stockStats: {
      totalItems: products.reduce((sum, p) => sum + p.stockQuantity, 0),
      lowStockItems: products.filter(p => p.status === 'low-stock').length,
      outOfStockItems: products.filter(p => p.status === 'out-of-stock').length,
      availableItems: products.filter(p => p.status === 'available').length
    },
    recentOrders: [
      { id: 1, customer: "John Doe", amount: 299.99, status: "completed", date: "2024-01-15" },
      { id: 2, customer: "Jane Smith", amount: 149.99, status: "pending", date: "2024-01-14" },
      { id: 3, customer: "Mike Johnson", amount: 89.99, status: "shipped", date: "2024-01-13" },
      { id: 4, customer: "Sarah Wilson", amount: 199.99, status: "completed", date: "2024-01-12" },
    ]
  }

  const handleEditProduct = (product: any) => {
    setEditingProduct(product)
    setShowProductModal(true)
  }

  const handleAddProduct = () => {
    setEditingProduct(null)
    setShowProductModal(true)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
      case "pending": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400"
      case "shipped": return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400"
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400"
    }
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
          Dashboard
        </h1>
        <p className={`${
          theme === 'light' ? 'text-gray-600' : 'text-gray-400'
        }`}>
          Overview of your e-commerce store performance
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
              Total Users
            </CardTitle>
            <Users className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${
              theme === 'light' ? 'text-gray-900' : 'text-white'
            }`}>
              {stats.totalUsers.toLocaleString()}
            </div>
            <p className={`text-xs ${
              theme === 'light' ? 'text-gray-600' : 'text-gray-400'
            }`}>
              +12% from last month
            </p>
          </CardContent>
        </Card>

        <Card className={`${
          theme === 'light' ? 'bg-white border-gray-200' : 'bg-gray-800 border-gray-700'
        }`}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className={`text-sm font-medium ${
              theme === 'light' ? 'text-gray-600' : 'text-gray-400'
            }`}>
              Total Products
            </CardTitle>
            <Package className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${
              theme === 'light' ? 'text-gray-900' : 'text-white'
            }`}>
              {stats.totalProducts}
            </div>
            <p className={`text-xs ${
              theme === 'light' ? 'text-gray-600' : 'text-gray-400'
            }`}>
              +3 new this week
            </p>
          </CardContent>
        </Card>

        <Card className={`${
          theme === 'light' ? 'bg-white border-gray-200' : 'bg-gray-800 border-gray-700'
        }`}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className={`text-sm font-medium ${
              theme === 'light' ? 'text-gray-600' : 'text-gray-400'
            }`}>
              Total Orders
            </CardTitle>
            <ShoppingCart className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${
              theme === 'light' ? 'text-gray-900' : 'text-white'
            }`}>
              {stats.totalOrders}
            </div>
            <p className={`text-xs ${
              theme === 'light' ? 'text-gray-600' : 'text-gray-400'
            }`}>
              +8% from last week
            </p>
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
            <DollarSign className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${
              theme === 'light' ? 'text-gray-900' : 'text-white'
            }`}>
              ${stats.totalRevenue.toLocaleString()}
            </div>
            <p className={`text-xs ${
              theme === 'light' ? 'text-gray-600' : 'text-gray-400'
            }`}>
              +15% from last month
            </p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Stock Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8"
      >
        <Card className={`${
          theme === 'light' ? 'bg-white border-gray-200' : 'bg-gray-800 border-gray-700'
        }`}>
          <CardHeader>
            <CardTitle className={`${
              theme === 'light' ? 'text-gray-900' : 'text-white'
            }`}>
              Stock Overview
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className={`${
                theme === 'light' ? 'text-gray-600' : 'text-gray-400'
              }`}>Total Items</span>
              <span className={`font-semibold ${
                theme === 'light' ? 'text-gray-900' : 'text-white'
              }`}>{stats.stockStats.totalItems}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className={`${
                theme === 'light' ? 'text-gray-600' : 'text-gray-400'
              }`}>Available</span>
              <span className="font-semibold text-green-600">{stats.stockStats.availableItems}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className={`${
                theme === 'light' ? 'text-gray-600' : 'text-gray-400'
              }`}>Low Stock</span>
              <span className="font-semibold text-yellow-600">{stats.stockStats.lowStockItems}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className={`${
                theme === 'light' ? 'text-gray-600' : 'text-gray-400'
              }`}>Out of Stock</span>
              <span className="font-semibold text-red-600">{stats.stockStats.outOfStockItems}</span>
            </div>
          </CardContent>
        </Card>

        <Card className={`${
          theme === 'light' ? 'bg-white border-gray-200' : 'bg-gray-800 border-gray-700'
        }`}>
          <CardHeader>
            <CardTitle className={`${
              theme === 'light' ? 'text-gray-900' : 'text-white'
            }`}>
              Recent Orders
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {stats.recentOrders.map((order) => (
                <div key={order.id} className="flex justify-between items-center">
                  <div>
                    <p className={`font-medium ${
                      theme === 'light' ? 'text-gray-900' : 'text-white'
                    }`}>{order.customer}</p>
                    <p className={`text-sm ${
                      theme === 'light' ? 'text-gray-500' : 'text-gray-400'
                    }`}>{order.date}</p>
                  </div>
                  <div className="text-right">
                    <p className={`font-semibold ${
                      theme === 'light' ? 'text-gray-900' : 'text-white'
                    }`}>${order.amount}</p>
                    <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        <Card className={`${
          theme === 'light' ? 'bg-white border-gray-200' : 'bg-gray-800 border-gray-700'
        }`}>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Plus className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h3 className={`font-semibold ${
                  theme === 'light' ? 'text-gray-900' : 'text-white'
                }`}>Add Product</h3>
                <p className={`text-sm ${
                  theme === 'light' ? 'text-gray-600' : 'text-gray-400'
                }`}>Create new product listing</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className={`${
          theme === 'light' ? 'bg-white border-gray-200' : 'bg-gray-800 border-gray-700'
        }`}>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Users className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <h3 className={`font-semibold ${
                  theme === 'light' ? 'text-gray-900' : 'text-white'
                }`}>View Users</h3>
                <p className={`text-sm ${
                  theme === 'light' ? 'text-gray-600' : 'text-gray-400'
                }`}>Manage customer accounts</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className={`${
          theme === 'light' ? 'bg-white border-gray-200' : 'bg-gray-800 border-gray-700'
        }`}>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <ShoppingCart className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <h3 className={`font-semibold ${
                  theme === 'light' ? 'text-gray-900' : 'text-white'
                }`}>View Orders</h3>
                <p className={`text-sm ${
                  theme === 'light' ? 'text-gray-600' : 'text-gray-400'
                }`}>Process and track orders</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Product Modal */}
      {showProductModal && (
        <AdminProductModal
          isOpen={showProductModal}
          onClose={() => setShowProductModal(false)}
          product={editingProduct}
        />
      )}
          </div>
        </main>
      </div>
    </>
  )
} 