"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "./ui/button"
import { Card, CardContent, CardHeader } from "./ui/card"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Textarea } from "./ui/textarea"
import { X, Upload, Save, Loader2, AlertTriangle, Check } from "lucide-react"
import { useTheme } from "../context/ThemeContext"
import type { Product } from "../data/products"

interface AdminProductModalProps {
  isOpen: boolean
  onClose: () => void
  product: Product | null
}

export function AdminProductModal({ isOpen, onClose, product }: AdminProductModalProps) {
  const { theme } = useTheme()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    rating: "",
    image: "",
    originalPrice: "",
    inStock: true,
    discount: "",
    stockQuantity: "",
    minStockLevel: "",
    sku: "",
    weight: "",
    dimensions: "",
    brand: "",
    tags: "",
    isActive: true
  })

  const categories = [
    "Electronics",
    "Clothing",
    "Home & Garden",
    "Sports",
    "Books",
    "Beauty",
    "Toys",
    "Automotive"
  ]

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        description: product.description,
        price: product.price.toString(),
        category: product.category,
        rating: product.rating.toString(),
        image: product.image,
        originalPrice: product.originalPrice?.toString() || "",
        inStock: product.inStock,
        discount: product.discount?.toString() || "",
        stockQuantity: product.stockQuantity?.toString() || "",
        minStockLevel: product.minStockLevel?.toString() || "",
        sku: product.sku || "",
        weight: product.weight?.toString() || "",
        dimensions: product.dimensions || "",
        brand: product.brand || "",
        tags: product.tags?.join(", ") || "",
        isActive: product.isActive
      })
    } else {
      setFormData({
        name: "",
        description: "",
        price: "",
        category: "",
        rating: "",
        image: "",
        originalPrice: "",
        inStock: true,
        discount: "",
        stockQuantity: "",
        minStockLevel: "",
        sku: "",
        weight: "",
        dimensions: "",
        brand: "",
        tags: "",
        isActive: true
      })
    }
  }, [product])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    console.log("Saving product:", formData)
    setIsLoading(false)
    onClose()
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
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
            <Card className={`w-full max-w-2xl max-h-[90vh] overflow-hidden shadow-2xl ${
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

                <motion.h2
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className={`text-xl font-bold ${
                    theme === 'light' ? 'text-gray-900' : 'text-white'
                  }`}
                >
                  {product ? 'Edit Product' : 'Add New Product'}
                </motion.h2>
              </CardHeader>

              <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Product Name */}
                    <div className="space-y-2">
                      <Label htmlFor="name">Product Name</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        placeholder="Enter product name"
                        required
                      />
                    </div>

                    {/* SKU */}
                    <div className="space-y-2">
                      <Label htmlFor="sku">SKU (Stock Keeping Unit)</Label>
                      <Input
                        id="sku"
                        value={formData.sku}
                        onChange={(e) => handleInputChange('sku', e.target.value)}
                        placeholder="e.g., PROD-001"
                        required
                      />
                    </div>

                    {/* Category */}
                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Brand */}
                    <div className="space-y-2">
                      <Label htmlFor="brand">Brand</Label>
                      <Input
                        id="brand"
                        value={formData.brand}
                        onChange={(e) => handleInputChange('brand', e.target.value)}
                        placeholder="Enter brand name"
                      />
                    </div>

                    {/* Price */}
                    <div className="space-y-2">
                      <Label htmlFor="price">Price ($)</Label>
                      <Input
                        id="price"
                        type="number"
                        step="0.01"
                        value={formData.price}
                        onChange={(e) => handleInputChange('price', e.target.value)}
                        placeholder="0.00"
                        required
                      />
                    </div>

                    {/* Original Price */}
                    <div className="space-y-2">
                      <Label htmlFor="originalPrice">Original Price ($)</Label>
                      <Input
                        id="originalPrice"
                        type="number"
                        step="0.01"
                        value={formData.originalPrice}
                        onChange={(e) => handleInputChange('originalPrice', e.target.value)}
                        placeholder="0.00 (optional)"
                      />
                    </div>

                    {/* Stock Quantity */}
                    <div className="space-y-2">
                      <Label htmlFor="stockQuantity">Stock Quantity</Label>
                      <Input
                        id="stockQuantity"
                        type="number"
                        min="0"
                        value={formData.stockQuantity}
                        onChange={(e) => handleInputChange('stockQuantity', e.target.value)}
                        placeholder="0"
                        required
                      />
                    </div>

                    {/* Minimum Stock Level */}
                    <div className="space-y-2">
                      <Label htmlFor="minStockLevel">Minimum Stock Level</Label>
                      <Input
                        id="minStockLevel"
                        type="number"
                        min="0"
                        value={formData.minStockLevel}
                        onChange={(e) => handleInputChange('minStockLevel', e.target.value)}
                        placeholder="5 (for low stock alerts)"
                      />
                    </div>

                    {/* Rating */}
                    <div className="space-y-2">
                      <Label htmlFor="rating">Rating</Label>
                      <Input
                        id="rating"
                        type="number"
                        step="0.1"
                        min="0"
                        max="5"
                        value={formData.rating}
                        onChange={(e) => handleInputChange('rating', e.target.value)}
                        placeholder="0.0"
                        required
                      />
                    </div>

                    {/* Discount */}
                    <div className="space-y-2">
                      <Label htmlFor="discount">Discount (%)</Label>
                      <Input
                        id="discount"
                        type="number"
                        min="0"
                        max="100"
                        value={formData.discount}
                        onChange={(e) => handleInputChange('discount', e.target.value)}
                        placeholder="0 (optional)"
                      />
                    </div>

                    {/* Weight */}
                    <div className="space-y-2">
                      <Label htmlFor="weight">Weight (kg)</Label>
                      <Input
                        id="weight"
                        type="number"
                        step="0.01"
                        min="0"
                        value={formData.weight}
                        onChange={(e) => handleInputChange('weight', e.target.value)}
                        placeholder="0.00"
                      />
                    </div>

                    {/* Dimensions */}
                    <div className="space-y-2">
                      <Label htmlFor="dimensions">Dimensions (L x W x H cm)</Label>
                      <Input
                        id="dimensions"
                        value={formData.dimensions}
                        onChange={(e) => handleInputChange('dimensions', e.target.value)}
                        placeholder="10 x 5 x 2"
                      />
                    </div>
                  </div>

                  {/* Description */}
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      placeholder="Enter product description"
                      rows={4}
                      required
                    />
                  </div>

                  {/* Tags */}
                  <div className="space-y-2">
                    <Label htmlFor="tags">Tags (comma separated)</Label>
                    <Input
                      id="tags"
                      value={formData.tags}
                      onChange={(e) => handleInputChange('tags', e.target.value)}
                      placeholder="electronics, wireless, bluetooth"
                    />
                  </div>

                  {/* Image URL */}
                  <div className="space-y-2">
                    <Label htmlFor="image">Image URL</Label>
                    <div className="flex space-x-2">
                      <Input
                        id="image"
                        value={formData.image}
                        onChange={(e) => handleInputChange('image', e.target.value)}
                        placeholder="https://example.com/image.jpg"
                        required
                      />
                      <Button type="button" variant="outline" size="icon">
                        <Upload className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Stock Status and Active Status */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex items-center space-x-2">
                      <input
                        id="inStock"
                        type="checkbox"
                        checked={formData.inStock}
                        onChange={(e) => handleInputChange('inStock', e.target.checked)}
                        className="rounded border-gray-300"
                      />
                      <Label htmlFor="inStock">In Stock</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        id="isActive"
                        type="checkbox"
                        checked={formData.isActive}
                        onChange={(e) => handleInputChange('isActive', e.target.checked)}
                        className="rounded border-gray-300"
                      />
                      <Label htmlFor="isActive">Active Product</Label>
                    </div>
                  </div>

                  {/* Stock Alert Preview */}
                  {formData.stockQuantity && formData.minStockLevel && (
                    <div className={`p-4 rounded-lg border ${
                      parseInt(formData.stockQuantity) <= parseInt(formData.minStockLevel)
                        ? 'bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-700'
                        : 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-700'
                    }`}>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className={`font-medium ${
                            parseInt(formData.stockQuantity) <= parseInt(formData.minStockLevel)
                              ? 'text-red-800 dark:text-red-400'
                              : 'text-green-800 dark:text-green-400'
                          }`}>
                            Stock Status
                          </p>
                          <p className={`text-sm ${
                            parseInt(formData.stockQuantity) <= parseInt(formData.minStockLevel)
                              ? 'text-red-700 dark:text-red-300'
                              : 'text-green-700 dark:text-green-300'
                          }`}>
                            {parseInt(formData.stockQuantity) <= parseInt(formData.minStockLevel)
                              ? `Low stock alert! Only ${formData.stockQuantity} items remaining.`
                              : `${formData.stockQuantity} items in stock (above minimum level of ${formData.minStockLevel})`
                            }
                          </p>
                        </div>
                        <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
                          parseInt(formData.stockQuantity) <= parseInt(formData.minStockLevel)
                            ? 'bg-red-100 dark:bg-red-900/20'
                            : 'bg-green-100 dark:bg-green-900/20'
                        }`}>
                          {parseInt(formData.stockQuantity) <= parseInt(formData.minStockLevel) ? (
                            <AlertTriangle className="h-4 w-4 text-red-600 dark:text-red-400" />
                          ) : (
                            <Check className="h-4 w-4 text-green-600 dark:text-green-400" />
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex justify-end space-x-3 pt-6 border-t">
                    <Button type="button" variant="outline" onClick={onClose}>
                      Cancel
                    </Button>
                    <Button type="submit" disabled={isLoading}>
                      {isLoading ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save className="h-4 w-4 mr-2" />
                          {product ? 'Update Product' : 'Add Product'}
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
} 