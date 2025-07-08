"use client"

import { useState, useEffect } from "react"
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
  AlertTriangle,
  Loader2,
  Star,
  Tag
} from "lucide-react"
import { useTheme } from "../context/ThemeContext"
import { useToast } from "../context/ToastContext"
import { adminProductsApi, type AdminProduct } from "../services/adminApi"
import { AdminProductModal } from "../components/AdminProductModal"
import { AdminNavbar } from "../components/AdminNavbar"

export default function AdminProducts() {
  const { theme } = useTheme()
  const { toast } = useToast()
  const [showProductModal, setShowProductModal] = useState(false)
  const [editingProduct, setEditingProduct] = useState<AdminProduct | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [products, setProducts] = useState<AdminProduct[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadProducts()
  }, [])

  const loadProducts = async () => {
    try {
      setLoading(true)
      const data = await adminProductsApi.getAll()
      setProducts(data)
    } catch (error) {
      console.error('Error loading products:', error)
      toast({
        title: "Erreur",
        description: "Impossible de charger les produits",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  const handleEditProduct = (product: AdminProduct) => {
    setEditingProduct(product)
    setShowProductModal(true)
  }

  const handleAddProduct = () => {
    setEditingProduct(null)
    setShowProductModal(true)
  }

  const handleDeleteProduct = async (productId: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {
      return
    }

    try {
      await adminProductsApi.delete(productId)
      toast({
        title: "Succès",
        description: "Produit supprimé avec succès",
        variant: "default"
      })
      loadProducts() // Recharger la liste
    } catch (error) {
      console.error('Error deleting product:', error)
      toast({
        title: "Erreur",
        description: "Impossible de supprimer le produit",
        variant: "destructive"
      })
    }
  }

  const handleToggleFeatured = async (productId: string) => {
    try {
      await adminProductsApi.toggleFeatured(productId)
      toast({
        title: "Succès",
        description: "Statut mis en avant mis à jour",
        variant: "default"
      })
      loadProducts() // Recharger la liste
    } catch (error) {
      console.error('Error toggling featured:', error)
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour le statut",
        variant: "destructive"
      })
    }
  }

  const handleToggleSale = async (productId: string) => {
    try {
      await adminProductsApi.toggleSale(productId)
      toast({
        title: "Succès",
        description: "Statut en promotion mis à jour",
        variant: "default"
      })
      loadProducts() // Recharger la liste
    } catch (error) {
      console.error('Error toggling sale:', error)
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour le statut",
        variant: "destructive"
      })
    }
  }

  const getStatusBadge = (product: AdminProduct) => {
    if (!product.isActive) {
      return <Badge className="bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400">Inactive</Badge>
    }
    
    if (product.stock <= 0) {
      return <Badge className="bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400">Out of Stock</Badge>
    }
    
    if (product.stock <= product.minStock) {
      return <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400">Low Stock</Badge>
    }
    
    return <Badge className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">Available</Badge>
  }

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.sku.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <AdminNavbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="flex items-center space-x-2">
            <Loader2 className="h-6 w-6 animate-spin" />
            <span>Chargement des produits...</span>
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
                          <tr key={product._id} className={`border-b ${
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
                                  <div className="flex items-center space-x-2">
                                    <p className={`font-medium ${
                                      theme === 'light' ? 'text-gray-900' : 'text-white'
                                    }`}>{product.name}</p>
                                    {product.isFeatured && (
                                      <Star className="h-4 w-4 text-yellow-500" />
                                    )}
                                    {product.isOnSale && (
                                      <Tag className="h-4 w-4 text-red-500" />
                                    )}
                                  </div>
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
                              {product.discountPercentage && (
                                <span className="text-sm text-red-500 ml-1">
                                  (-{product.discountPercentage}%)
                                </span>
                              )}
                            </td>
                            <td className="py-4 px-4">
                              <div className="flex items-center space-x-2">
                                <span className={`${
                                  theme === 'light' ? 'text-gray-700' : 'text-gray-300'
                                }`}>
                                  {product.stock}
                                </span>
                                {product.stock <= product.minStock && (
                                  <AlertTriangle className="h-4 w-4 text-yellow-500" />
                                )}
                              </div>
                            </td>
                            <td className="py-4 px-4">
                              {getStatusBadge(product)}
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
                                  onClick={() => handleToggleFeatured(product._id)}
                                  className={`p-1 ${product.isFeatured ? 'text-yellow-600' : 'text-gray-400'}`}
                                >
                                  <Star className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleToggleSale(product._id)}
                                  className={`p-1 ${product.isOnSale ? 'text-red-600' : 'text-gray-400'}`}
                                >
                                  <Tag className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleDeleteProduct(product._id)}
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
                onSuccess={loadProducts}
              />
            )}
          </div>
        </main>
      </div>
    </>
  )
} 