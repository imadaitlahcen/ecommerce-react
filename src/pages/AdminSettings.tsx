"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Textarea } from "../components/ui/textarea"
import { Badge } from "../components/ui/badge"
import { 
  Settings, 
  Store,
  Mail,
  Phone,
  MapPin,
  Globe,
  CreditCard,
  Shield,
  Bell,
  Palette,
  Loader2,
  Save
} from "lucide-react"
import { useTheme } from "../context/ThemeContext"
import { useToast } from "../context/ToastContext"
import { settingsApi, type AdminSettings as SettingsType } from "../services/adminApi"
import { AdminNavbar } from "../components/AdminNavbar"

export default function AdminSettings() {
  const { theme } = useTheme()
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("general")
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [settings, setSettings] = useState<SettingsType>({
    storeName: "",
    storeDescription: "",
    contactEmail: "",
    contactPhone: "",
    address: "",
    website: "",
    currency: "USD",
    taxRate: 0,
    stripeEnabled: false,
    paypalEnabled: false,
    cashOnDelivery: false,
    emailNotifications: false,
    orderConfirmations: false,
    lowStockAlerts: false,
    newUserRegistrations: false
  })

  useEffect(() => {
    loadSettings()
  }, [])

  const loadSettings = async () => {
    try {
      setLoading(true)
      const data = await settingsApi.get()
      setSettings(data)
    } catch (error) {
      console.error('Error loading settings:', error)
      toast({
        title: "Erreur",
        description: "Impossible de charger les paramètres",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSaveSettings = async () => {
    try {
      setSaving(true)
      await settingsApi.update(settings)
      toast({
        title: "Succès",
        description: "Paramètres sauvegardés avec succès",
        variant: "default"
      })
    } catch (error) {
      console.error('Error saving settings:', error)
      toast({
        title: "Erreur",
        description: "Impossible de sauvegarder les paramètres",
        variant: "destructive"
      })
    } finally {
      setSaving(false)
    }
  }

  const handleInputChange = (field: keyof SettingsType, value: string | number | boolean) => {
    setSettings(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const tabs = [
    { id: "general", name: "General", icon: Store },
    { id: "payment", name: "Payment", icon: CreditCard },
    { id: "notifications", name: "Notifications", icon: Bell },
    { id: "appearance", name: "Appearance", icon: Palette },
    { id: "security", name: "Security", icon: Shield }
  ]

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <AdminNavbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="flex items-center space-x-2">
            <Loader2 className="h-6 w-6 animate-spin" />
            <span>Chargement des paramètres...</span>
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
              <div className="flex justify-between items-center">
                <div>
                  <h1 className={`text-3xl font-bold mb-2 ${
                    theme === 'light' ? 'text-gray-900' : 'text-white'
                  }`}>
                    Settings
                  </h1>
                  <p className={`${
                    theme === 'light' ? 'text-gray-600' : 'text-gray-400'
                  }`}>
                    Configure your store settings and preferences
                  </p>
                </div>
                <Button 
                  onClick={handleSaveSettings} 
                  disabled={saving}
                  className="flex items-center space-x-2"
                >
                  {saving ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Save className="h-4 w-4" />
                  )}
                  <span>{saving ? 'Saving...' : 'Save Settings'}</span>
                </Button>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Sidebar */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="lg:col-span-1"
              >
                <Card className={`${
                  theme === 'light' ? 'bg-white border-gray-200' : 'bg-gray-800 border-gray-700'
                }`}>
                  <CardContent className="p-4">
                    <nav className="space-y-2">
                      {tabs.map((tab) => {
                        const Icon = tab.icon
                        return (
                          <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                              activeTab === tab.id
                                ? theme === 'light'
                                  ? 'bg-blue-50 text-blue-700 border border-blue-200'
                                  : 'bg-blue-900/20 text-blue-400 border border-blue-800'
                                : theme === 'light'
                                  ? 'text-gray-700 hover:bg-gray-50'
                                  : 'text-gray-300 hover:bg-gray-700'
                            }`}
                          >
                            <Icon className="h-4 w-4" />
                            <span className="font-medium">{tab.name}</span>
                          </button>
                        )
                      })}
                    </nav>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Content */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="lg:col-span-3"
              >
                {activeTab === "general" && (
                  <Card className={`${
                    theme === 'light' ? 'bg-white border-gray-200' : 'bg-gray-800 border-gray-700'
                  }`}>
                    <CardHeader>
                      <CardTitle className={`flex items-center space-x-2 ${
                        theme === 'light' ? 'text-gray-900' : 'text-white'
                      }`}>
                        <Store className="h-5 w-5" />
                        <span>General Settings</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="storeName">Store Name</Label>
                          <Input
                            id="storeName"
                            value={settings.storeName}
                            onChange={(e) => handleInputChange('storeName', e.target.value)}
                            className={theme === 'light' ? 'bg-white' : 'bg-gray-700'}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="contactEmail">Contact Email</Label>
                          <Input
                            id="contactEmail"
                            type="email"
                            value={settings.contactEmail}
                            onChange={(e) => handleInputChange('contactEmail', e.target.value)}
                            className={theme === 'light' ? 'bg-white' : 'bg-gray-700'}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="contactPhone">Contact Phone</Label>
                          <Input
                            id="contactPhone"
                            value={settings.contactPhone}
                            onChange={(e) => handleInputChange('contactPhone', e.target.value)}
                            className={theme === 'light' ? 'bg-white' : 'bg-gray-700'}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="website">Website</Label>
                          <Input
                            id="website"
                            value={settings.website}
                            onChange={(e) => handleInputChange('website', e.target.value)}
                            className={theme === 'light' ? 'bg-white' : 'bg-gray-700'}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="storeDescription">Store Description</Label>
                        <Textarea
                          id="storeDescription"
                          value={settings.storeDescription}
                          onChange={(e) => handleInputChange('storeDescription', e.target.value)}
                          rows={3}
                          className={theme === 'light' ? 'bg-white' : 'bg-gray-700'}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="address">Store Address</Label>
                        <Textarea
                          id="address"
                          value={settings.address}
                          onChange={(e) => handleInputChange('address', e.target.value)}
                          rows={2}
                          className={theme === 'light' ? 'bg-white' : 'bg-gray-700'}
                        />
                      </div>
                    </CardContent>
                  </Card>
                )}

                {activeTab === "payment" && (
                  <Card className={`${
                    theme === 'light' ? 'bg-white border-gray-200' : 'bg-gray-800 border-gray-700'
                  }`}>
                    <CardHeader>
                      <CardTitle className={`flex items-center space-x-2 ${
                        theme === 'light' ? 'text-gray-900' : 'text-white'
                      }`}>
                        <CreditCard className="h-5 w-5" />
                        <span>Payment Settings</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="currency">Currency</Label>
                          <select
                            id="currency"
                            value={settings.currency}
                            onChange={(e) => handleInputChange('currency', e.target.value)}
                            className={`w-full p-2 border rounded-md ${
                              theme === 'light' ? 'bg-white border-gray-300' : 'bg-gray-700 border-gray-600'
                            }`}
                          >
                            <option value="USD">USD ($)</option>
                            <option value="EUR">EUR (€)</option>
                            <option value="GBP">GBP (£)</option>
                            <option value="CAD">CAD (C$)</option>
                          </select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="taxRate">Tax Rate (%)</Label>
                          <Input
                            id="taxRate"
                            type="number"
                            step="0.1"
                            value={settings.taxRate}
                            onChange={(e) => handleInputChange('taxRate', parseFloat(e.target.value) || 0)}
                            className={theme === 'light' ? 'bg-white' : 'bg-gray-700'}
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <h3 className={`font-medium ${
                          theme === 'light' ? 'text-gray-900' : 'text-white'
                        }`}>Payment Methods</h3>
                        
                        <div className="space-y-3">
                          <div className="flex items-center space-x-3">
                            <input
                              type="checkbox"
                              id="stripeEnabled"
                              checked={settings.stripeEnabled}
                              onChange={(e) => handleInputChange('stripeEnabled', e.target.checked)}
                              className="rounded"
                            />
                            <Label htmlFor="stripeEnabled">Enable Stripe Payments</Label>
                          </div>
                          
                          <div className="flex items-center space-x-3">
                            <input
                              type="checkbox"
                              id="paypalEnabled"
                              checked={settings.paypalEnabled}
                              onChange={(e) => handleInputChange('paypalEnabled', e.target.checked)}
                              className="rounded"
                            />
                            <Label htmlFor="paypalEnabled">Enable PayPal</Label>
                          </div>
                          
                          <div className="flex items-center space-x-3">
                            <input
                              type="checkbox"
                              id="cashOnDelivery"
                              checked={settings.cashOnDelivery}
                              onChange={(e) => handleInputChange('cashOnDelivery', e.target.checked)}
                              className="rounded"
                            />
                            <Label htmlFor="cashOnDelivery">Enable Cash on Delivery</Label>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {activeTab === "notifications" && (
                  <Card className={`${
                    theme === 'light' ? 'bg-white border-gray-200' : 'bg-gray-800 border-gray-700'
                  }`}>
                    <CardHeader>
                      <CardTitle className={`flex items-center space-x-2 ${
                        theme === 'light' ? 'text-gray-900' : 'text-white'
                      }`}>
                        <Bell className="h-5 w-5" />
                        <span>Notification Settings</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-4">
                        <h3 className={`font-medium ${
                          theme === 'light' ? 'text-gray-900' : 'text-white'
                        }`}>Email Notifications</h3>
                        
                        <div className="space-y-3">
                          <div className="flex items-center space-x-3">
                            <input
                              type="checkbox"
                              id="emailNotifications"
                              checked={settings.emailNotifications}
                              onChange={(e) => handleInputChange('emailNotifications', e.target.checked)}
                              className="rounded"
                            />
                            <Label htmlFor="emailNotifications">Enable Email Notifications</Label>
                          </div>
                          
                          <div className="flex items-center space-x-3">
                            <input
                              type="checkbox"
                              id="orderConfirmations"
                              checked={settings.orderConfirmations}
                              onChange={(e) => handleInputChange('orderConfirmations', e.target.checked)}
                              className="rounded"
                            />
                            <Label htmlFor="orderConfirmations">Order Confirmations</Label>
                          </div>
                          
                          <div className="flex items-center space-x-3">
                            <input
                              type="checkbox"
                              id="lowStockAlerts"
                              checked={settings.lowStockAlerts}
                              onChange={(e) => handleInputChange('lowStockAlerts', e.target.checked)}
                              className="rounded"
                            />
                            <Label htmlFor="lowStockAlerts">Low Stock Alerts</Label>
                          </div>
                          
                          <div className="flex items-center space-x-3">
                            <input
                              type="checkbox"
                              id="newUserRegistrations"
                              checked={settings.newUserRegistrations}
                              onChange={(e) => handleInputChange('newUserRegistrations', e.target.checked)}
                              className="rounded"
                            />
                            <Label htmlFor="newUserRegistrations">New User Registrations</Label>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {activeTab === "appearance" && (
                  <Card className={`${
                    theme === 'light' ? 'bg-white border-gray-200' : 'bg-gray-800 border-gray-700'
                  }`}>
                    <CardHeader>
                      <CardTitle className={`flex items-center space-x-2 ${
                        theme === 'light' ? 'text-gray-900' : 'text-white'
                      }`}>
                        <Palette className="h-5 w-5" />
                        <span>Appearance Settings</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="text-center py-8">
                        <p className={`${
                          theme === 'light' ? 'text-gray-600' : 'text-gray-400'
                        }`}>
                          Appearance settings will be available soon.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {activeTab === "security" && (
                  <Card className={`${
                    theme === 'light' ? 'bg-white border-gray-200' : 'bg-gray-800 border-gray-700'
                  }`}>
                    <CardHeader>
                      <CardTitle className={`flex items-center space-x-2 ${
                        theme === 'light' ? 'text-gray-900' : 'text-white'
                      }`}>
                        <Shield className="h-5 w-5" />
                        <span>Security Settings</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="text-center py-8">
                        <p className={`${
                          theme === 'light' ? 'text-gray-600' : 'text-gray-400'
                        }`}>
                          Security settings will be available soon.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </motion.div>
            </div>
          </div>
        </main>
      </div>
    </>
  )
} 