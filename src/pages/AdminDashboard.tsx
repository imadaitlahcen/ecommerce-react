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
import { AdminProductModal } from "../components/AdminProductModal"
import { AdminNavbar } from "../components/AdminNavbar"
import { useState, useEffect } from "react"
import { dashboardApi} from "../services/adminApi"
import { useToast } from "../context/ToastContext"
import type { AdminStats } from '../services/adminApi'
import { Loader } from "../components/Loader"

export default function AdminDashboard() {
  const { theme } = useTheme()
  const { toast } = useToast()
  const [showProductModal, setShowProductModal] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [stats, setStats] = useState<AdminStats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadStats()
  }, [])

  const loadStats = async () => {
    try {
      setLoading(true)
      const data = await dashboardApi.getStats()
      setStats(data)
    } catch (error) {
      console.error('Error loading dashboard stats:', error)
      toast({
        title: "Erreur",
        description: "Impossible de charger les statistiques du dashboard",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
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

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <AdminNavbar />
        <main className="flex-1 flex items-center justify-center">
          <Loader />
        </main>
      </div>
    )
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
              {stats ? stats.totalUsers.toLocaleString() : 0}
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
              {stats ? stats.totalProducts.toLocaleString() : 0}
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
              {stats ? stats.totalOrders.toLocaleString() : 0}
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
              ${stats ? stats.totalRevenue.toLocaleString() : 0}
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
              }`}>
                {stats && stats.stockStats ? stats.stockStats.totalItems : 0}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className={`${
                theme === 'light' ? 'text-gray-600' : 'text-gray-400'
              }`}>Available</span>
              <span className="font-semibold text-green-600">{stats && stats.stockStats ? stats.stockStats.availableItems : 0}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className={`${
                theme === 'light' ? 'text-gray-600' : 'text-gray-400'
              }`}>Low Stock</span>
              <span className="font-semibold text-yellow-600">{stats && stats.stockStats ? stats.stockStats.lowStockItems : 0}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className={`${
                theme === 'light' ? 'text-gray-600' : 'text-gray-400'
              }`}>Out of Stock</span>
              <span className="font-semibold text-red-600">{stats && stats.stockStats ? stats.stockStats.outOfStockItems : 0}</span>
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
              {stats && stats.recentOrders && stats.recentOrders.length > 0 ? (
                stats.recentOrders.map((order) => (
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
                ))
              ) : (
                <div className="text-center text-gray-400">No recent orders</div>
              )}
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
                }`}>
                  Add a new product to your inventory
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Modals */}
      {showProductModal && (
        <AdminProductModal
          isOpen={showProductModal}
          onClose={() => setShowProductModal(false)}
          product={editingProduct}
          onSuccess={loadStats}
        />
      )}
    </div>
  </main>
</div>
</>
  )
}
