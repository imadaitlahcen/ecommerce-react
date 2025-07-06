"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Badge } from "../components/ui/badge"
import { Input } from "../components/ui/input"
import { 
  Package, 
  Plus,
  Edit,
  Trash2,
  Eye,
  Search,
  Filter,
  AlertTriangle
} from "lucide-react"
import { useTheme } from "../context/ThemeContext"
import { products } from "../data/products"
import { AdminProductModal } from "../components/AdminProductModal"
import { AdminNavbar } from "../components/AdminNavbar"

export default function AdminProducts() {
  const { theme } = useTheme()
  const [showProductModal, setShowProductModal] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")

  const handleEditProduct = (product: any) => {
    setEditingProduct(product)
    setShowProductModal(true)
  }

  const handleAddProduct = () => {
    setEditingProduct(null)
    setShowProductModal(true)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "available":
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">Available</Badge>
      case "low-stock":
        return <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400">Low Stock</Badge>
      case "out-of-stock":
        return <Badge className="bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400">Out of Stock</Badge>
      default:
        return <Badge className="bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400">Unknown</Badge>
    }
  }

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  )

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
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className={`text-3xl font-bold mb-2 ${
              theme === 'light' ? 'text-gray-900' : 'text-white'
            }`}>
              Products
            </h1>
            <p className={`${
              theme === 'light' ? 'text-gray-600' : 'text-gray-400'
            }`}>
              Manage your product inventory
            </p>
          </div>
          <Button onClick={handleAddProduct} className="flex items-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>Add Product</span>
          </Button>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search products..."
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

      {/* Products Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card className={`${
          theme === 'light' ? 'bg-white border-gray-200' : 'bg-gray-800 border-gray-700'
        }`}>
          <CardHeader>
            <CardTitle className={`${
              theme === 'light' ? 'text-gray-900' : 'text-white'
            }`}>
              Product Inventory ({filteredProducts.length} items)
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
                    }`}>Product</th>
                    <th className={`text-left py-3 px-4 font-medium ${
                      theme === 'light' ? 'text-gray-600' : 'text-gray-400'
                    }`}>Category</th>
                    <th className={`text-left py-3 px-4 font-medium ${
                      theme === 'light' ? 'text-gray-600' : 'text-gray-400'
                    }`}>Price</th>
                    <th className={`text-left py-3 px-4 font-medium ${
                      theme === 'light' ? 'text-gray-600' : 'text-gray-400'
                    }`}>Stock</th>
                    <th className={`text-left py-3 px-4 font-medium ${
                      theme === 'light' ? 'text-gray-600' : 'text-gray-400'
                    }`}>Status</th>
                    <th className={`text-left py-3 px-4 font-medium ${
                      theme === 'light' ? 'text-gray-600' : 'text-gray-400'
                    }`}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map((product) => (
                    <tr key={product.id} className={`border-b ${
                      theme === 'light' ? 'border-gray-100' : 'border-gray-800'
                    }`}>
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-3">
                          <img 
                            src={product.image} 
                            alt={product.name}
                            className="w-10 h-10 rounded-lg object-cover"
                          />
                          <div>
                            <p className={`font-medium ${
                              theme === 'light' ? 'text-gray-900' : 'text-white'
                            }`}>{product.name}</p>
                            <p className={`text-sm ${
                              theme === 'light' ? 'text-gray-500' : 'text-gray-400'
                            }`}>SKU: {product.sku}</p>
                          </div>
                        </div>
                      </td>
                      <td className={`py-4 px-4 ${
                        theme === 'light' ? 'text-gray-700' : 'text-gray-300'
                      }`}>
                        {product.category}
                      </td>
                      <td className={`py-4 px-4 font-semibold ${
                        theme === 'light' ? 'text-gray-900' : 'text-white'
                      }`}>
                        ${product.price}
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-2">
                          <span className={`${
                            theme === 'light' ? 'text-gray-700' : 'text-gray-300'
                          }`}>
                            {product.stockQuantity}
                          </span>
                          {product.stockQuantity <= product.minStockLevel && (
                            <AlertTriangle className="h-4 w-4 text-yellow-500" />
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        {getStatusBadge(product.status)}
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEditProduct(product)}
                            className="p-1"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
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