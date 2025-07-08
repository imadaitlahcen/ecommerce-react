"use client"

import { useState, useEffect } from "react"
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
  AlertCircle,
  Loader2,
  Trash2
} from "lucide-react"
import { useTheme } from "../context/ThemeContext"
import { useToast } from "../context/ToastContext"
import { ordersApi, type AdminOrder } from "../services/adminApi"
import { AdminNavbar } from "../components/AdminNavbar"

export default function AdminOrders() {
  const { theme } = useTheme()
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedOrder, setSelectedOrder] = useState<AdminOrder | null>(null)
  const [orders, setOrders] = useState<AdminOrder[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadOrders()
  }, [])

  const loadOrders = async () => {
    try {
      setLoading(true)
      const data = await ordersApi.getAll()
      setOrders(data)
    } catch (error) {
      console.error('Error loading orders:', error)
      toast({
        title: "Erreur",
        description: "Impossible de charger les commandes",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateStatus = async (orderId: string, newStatus: AdminOrder['status']) => {
    try {
      await ordersApi.updateStatus(orderId, newStatus)
      toast({
        title: "Succès",
        description: "Statut de la commande mis à jour",
        variant: "default"
      })
      loadOrders() // Recharger la liste
    } catch (error) {
      console.error('Error updating order status:', error)
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour le statut",
        variant: "destructive"
      })
    }
  }

  const handleUpdatePaymentStatus = async (orderId: string, newPaymentStatus: AdminOrder['paymentStatus']) => {
    try {
      await ordersApi.updatePaymentStatus(orderId, newPaymentStatus)
      toast({
        title: "Succès",
        description: "Statut de paiement mis à jour",
        variant: "default"
      })
      loadOrders() // Recharger la liste
    } catch (error) {
      console.error('Error updating payment status:', error)
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour le statut de paiement",
        variant: "destructive"
      })
    }
  }

  const handleDeleteOrder = async (orderId: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette commande ?')) {
      return
    }

    try {
      await ordersApi.delete(orderId)
      toast({
        title: "Succès",
        description: "Commande supprimée avec succès",
        variant: "default"
      })
      loadOrders() // Recharger la liste
    } catch (error) {
      console.error('Error deleting order:', error)
      toast({
        title: "Erreur",
        description: "Impossible de supprimer la commande",
        variant: "destructive"
      })
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "delivered":
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
      case "delivered":
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">Delivered</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400">Pending</Badge>
      case "processing":
        return <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400">Processing</Badge>
      case "shipped":
        return <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400">Shipped</Badge>
      case "cancelled":
        return <Badge className="bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400">Cancelled</Badge>
      case "returned":
        return <Badge className="bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400">Returned</Badge>
      default:
        return <Badge className="bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400">Unknown</Badge>
    }
  }

  const getPaymentStatusBadge = (paymentStatus: string) => {
    switch (paymentStatus) {
      case "paid":
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">Paid</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400">Pending</Badge>
      case "failed":
        return <Badge className="bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400">Failed</Badge>
      case "refunded":
        return <Badge className="bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400">Refunded</Badge>
      default:
        return <Badge className="bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400">Unknown</Badge>
    }
  }

  const filteredOrders = orders.filter(order =>
    order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order._id.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const stats = {
    totalOrders: orders.length,
    completedOrders: orders.filter(o => o.status === 'delivered').length,
    pendingOrders: orders.filter(o => o.status === 'pending').length,
    returnedOrders: orders.filter(o => o.status === 'returned').length,
    totalRevenue: orders.filter(o => o.status === 'delivered').reduce((sum, o) => sum + o.total, 0)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <AdminNavbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="flex items-center space-x-2">
            <Loader2 className="h-6 w-6 animate-spin" />
            <span>Chargement des commandes...</span>
          </div>
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
                    ${stats.totalRevenue.toFixed(2)}
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
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search orders..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
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
                          }`}>Order</th>
                          <th className={`text-left py-3 px-4 font-medium ${
                            theme === 'light' ? 'text-gray-600' : 'text-gray-400'
                          }`}>Customer</th>
                          <th className={`text-left py-3 px-4 font-medium ${
                            theme === 'light' ? 'text-gray-600' : 'text-gray-400'
                          }`}>Total</th>
                          <th className={`text-left py-3 px-4 font-medium ${
                            theme === 'light' ? 'text-gray-600' : 'text-gray-400'
                          }`}>Status</th>
                          <th className={`text-left py-3 px-4 font-medium ${
                            theme === 'light' ? 'text-gray-600' : 'text-gray-400'
                          }`}>Payment</th>
                          <th className={`text-left py-3 px-4 font-medium ${
                            theme === 'light' ? 'text-gray-600' : 'text-gray-400'
                          }`}>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredOrders.map((order) => (
                          <tr key={order._id} className={`border-b ${
                            theme === 'light' ? 'border-gray-100' : 'border-gray-800'
                          }`}>
                            <td className="py-4 px-4">
                              <div>
                                <p className={`font-medium ${
                                  theme === 'light' ? 'text-gray-900' : 'text-white'
                                }`}>#{order._id.slice(-8)}</p>
                                <p className={`text-sm ${
                                  theme === 'light' ? 'text-gray-500' : 'text-gray-400'
                                }`}>{new Date(order.createdAt).toLocaleDateString()}</p>
                              </div>
                            </td>
                            <td className="py-4 px-4">
                              <div>
                                <p className={`font-medium ${
                                  theme === 'light' ? 'text-gray-900' : 'text-white'
                                }`}>{order.customerName}</p>
                                <p className={`text-sm ${
                                  theme === 'light' ? 'text-gray-500' : 'text-gray-400'
                                }`}>{order.customerEmail}</p>
                              </div>
                            </td>
                            <td className={`py-4 px-4 font-semibold ${
                              theme === 'light' ? 'text-gray-900' : 'text-white'
                            }`}>
                              ${order.total.toFixed(2)}
                            </td>
                            <td className="py-4 px-4">
                              {getStatusBadge(order.status)}
                            </td>
                            <td className="py-4 px-4">
                              {getPaymentStatusBadge(order.paymentStatus)}
                            </td>
                            <td className="py-4 px-4">
                              <div className="flex items-center space-x-2">
                                <select
                                  value={order.status}
                                  onChange={(e) => handleUpdateStatus(order._id, e.target.value as AdminOrder['status'])}
                                  className={`text-sm border rounded px-2 py-1 ${
                                    theme === 'light' ? 'bg-white border-gray-300' : 'bg-gray-700 border-gray-600'
                                  }`}
                                >
                                  <option value="pending">Pending</option>
                                  <option value="processing">Processing</option>
                                  <option value="shipped">Shipped</option>
                                  <option value="delivered">Delivered</option>
                                  <option value="cancelled">Cancelled</option>
                                  <option value="returned">Returned</option>
                                </select>
                                <select
                                  value={order.paymentStatus}
                                  onChange={(e) => handleUpdatePaymentStatus(order._id, e.target.value as AdminOrder['paymentStatus'])}
                                  className={`text-sm border rounded px-2 py-1 ${
                                    theme === 'light' ? 'bg-white border-gray-300' : 'bg-gray-700 border-gray-600'
                                  }`}
                                >
                                  <option value="pending">Pending</option>
                                  <option value="paid">Paid</option>
                                  <option value="failed">Failed</option>
                                  <option value="refunded">Refunded</option>
                                </select>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleDeleteOrder(order._id)}
                                  className="p-1 text-red-600 hover:text-red-700"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
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
          </div>
        </main>
      </div>
    </>
  )
} 