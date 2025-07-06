"use client"

import { useState } from "react"
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
  Palette
} from "lucide-react"
import { useTheme } from "../context/ThemeContext"
import { AdminNavbar } from "../components/AdminNavbar"

export default function AdminSettings() {
  const { theme } = useTheme()
  const [activeTab, setActiveTab] = useState("general")

  // Mock settings data
  const settings = {
    general: {
      storeName: "TechStore",
      storeDescription: "Your one-stop shop for all things tech",
      contactEmail: "contact@techstore.com",
      contactPhone: "+1 (555) 123-4567",
      address: "123 Tech Street, Silicon Valley, CA 94025",
      website: "https://techstore.com"
    },
    payment: {
      stripeEnabled: true,
      paypalEnabled: true,
      cashOnDelivery: true,
      currency: "USD",
      taxRate: 8.5
    },
    notifications: {
      emailNotifications: true,
      orderConfirmations: true,
      lowStockAlerts: true,
      newUserRegistrations: true
    }
  }

  const tabs = [
    { id: "general", name: "General", icon: Store },
    { id: "payment", name: "Payment", icon: CreditCard },
    { id: "notifications", name: "Notifications", icon: Bell },
    { id: "appearance", name: "Appearance", icon: Palette },
    { id: "security", name: "Security", icon: Shield }
  ]

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
                Settings
              </h1>
              <p className={`${
                theme === 'light' ? 'text-gray-600' : 'text-gray-400'
              }`}>
                Configure your store settings and preferences
              </p>
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
                            defaultValue={settings.general.storeName}
                            className={theme === 'light' ? 'bg-white' : 'bg-gray-700'}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="contactEmail">Contact Email</Label>
                          <Input
                            id="contactEmail"
                            type="email"
                            defaultValue={settings.general.contactEmail}
                            className={theme === 'light' ? 'bg-white' : 'bg-gray-700'}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="contactPhone">Contact Phone</Label>
                          <Input
                            id="contactPhone"
                            defaultValue={settings.general.contactPhone}
                            className={theme === 'light' ? 'bg-white' : 'bg-gray-700'}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="website">Website</Label>
                          <Input
                            id="website"
                            defaultValue={settings.general.website}
                            className={theme === 'light' ? 'bg-white' : 'bg-gray-700'}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="storeDescription">Store Description</Label>
                        <Textarea
                          id="storeDescription"
                          defaultValue={settings.general.storeDescription}
                          rows={3}
                          className={theme === 'light' ? 'bg-white' : 'bg-gray-700'}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="address">Store Address</Label>
                        <Textarea
                          id="address"
                          defaultValue={settings.general.address}
                          rows={2}
                          className={theme === 'light' ? 'bg-white' : 'bg-gray-700'}
                        />
                      </div>
                      <div className="flex justify-end">
                        <Button>Save Changes</Button>
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
                      <div className="space-y-4">
                        <h3 className={`font-semibold ${
                          theme === 'light' ? 'text-gray-900' : 'text-white'
                        }`}>Payment Methods</h3>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between p-3 border rounded-lg">
                            <div className="flex items-center space-x-3">
                              <input type="checkbox" defaultChecked={settings.payment.stripeEnabled} />
                              <span className={`font-medium ${
                                theme === 'light' ? 'text-gray-900' : 'text-white'
                              }`}>Stripe</span>
                            </div>
                            <Badge className="bg-green-100 text-green-800">Enabled</Badge>
                          </div>
                          <div className="flex items-center justify-between p-3 border rounded-lg">
                            <div className="flex items-center space-x-3">
                              <input type="checkbox" defaultChecked={settings.payment.paypalEnabled} />
                              <span className={`font-medium ${
                                theme === 'light' ? 'text-gray-900' : 'text-white'
                              }`}>PayPal</span>
                            </div>
                            <Badge className="bg-green-100 text-green-800">Enabled</Badge>
                          </div>
                          <div className="flex items-center justify-between p-3 border rounded-lg">
                            <div className="flex items-center space-x-3">
                              <input type="checkbox" defaultChecked={settings.payment.cashOnDelivery} />
                              <span className={`font-medium ${
                                theme === 'light' ? 'text-gray-900' : 'text-white'
                              }`}>Cash on Delivery</span>
                            </div>
                            <Badge className="bg-green-100 text-green-800">Enabled</Badge>
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="currency">Currency</Label>
                          <Input
                            id="currency"
                            defaultValue={settings.payment.currency}
                            className={theme === 'light' ? 'bg-white' : 'bg-gray-700'}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="taxRate">Tax Rate (%)</Label>
                          <Input
                            id="taxRate"
                            type="number"
                            defaultValue={settings.payment.taxRate}
                            className={theme === 'light' ? 'bg-white' : 'bg-gray-700'}
                          />
                        </div>
                      </div>
                      <div className="flex justify-end">
                        <Button>Save Changes</Button>
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
                        <h3 className={`font-semibold ${
                          theme === 'light' ? 'text-gray-900' : 'text-white'
                        }`}>Email Notifications</h3>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between p-3 border rounded-lg">
                            <div className="flex items-center space-x-3">
                              <input type="checkbox" defaultChecked={settings.notifications.emailNotifications} />
                              <div>
                                <span className={`font-medium ${
                                  theme === 'light' ? 'text-gray-900' : 'text-white'
                                }`}>Email Notifications</span>
                                <p className={`text-sm ${
                                  theme === 'light' ? 'text-gray-600' : 'text-gray-400'
                                }`}>Receive notifications via email</p>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center justify-between p-3 border rounded-lg">
                            <div className="flex items-center space-x-3">
                              <input type="checkbox" defaultChecked={settings.notifications.orderConfirmations} />
                              <div>
                                <span className={`font-medium ${
                                  theme === 'light' ? 'text-gray-900' : 'text-white'
                                }`}>Order Confirmations</span>
                                <p className={`text-sm ${
                                  theme === 'light' ? 'text-gray-600' : 'text-gray-400'
                                }`}>Send order confirmation emails</p>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center justify-between p-3 border rounded-lg">
                            <div className="flex items-center space-x-3">
                              <input type="checkbox" defaultChecked={settings.notifications.lowStockAlerts} />
                              <div>
                                <span className={`font-medium ${
                                  theme === 'light' ? 'text-gray-900' : 'text-white'
                                }`}>Low Stock Alerts</span>
                                <p className={`text-sm ${
                                  theme === 'light' ? 'text-gray-600' : 'text-gray-400'
                                }`}>Get notified when products are low in stock</p>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center justify-between p-3 border rounded-lg">
                            <div className="flex items-center space-x-3">
                              <input type="checkbox" defaultChecked={settings.notifications.newUserRegistrations} />
                              <div>
                                <span className={`font-medium ${
                                  theme === 'light' ? 'text-gray-900' : 'text-white'
                                }`}>New User Registrations</span>
                                <p className={`text-sm ${
                                  theme === 'light' ? 'text-gray-600' : 'text-gray-400'
                                }`}>Notify when new users register</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-end">
                        <Button>Save Changes</Button>
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
                      <div className="space-y-4">
                        <h3 className={`font-semibold ${
                          theme === 'light' ? 'text-gray-900' : 'text-white'
                        }`}>Theme Settings</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Label>Primary Color</Label>
                            <div className="flex items-center space-x-2">
                              <input type="color" defaultValue="#3B82F6" className="w-12 h-10 rounded border" />
                              <Input defaultValue="#3B82F6" className={theme === 'light' ? 'bg-white' : 'bg-gray-700'} />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label>Secondary Color</Label>
                            <div className="flex items-center space-x-2">
                              <input type="color" defaultValue="#6B7280" className="w-12 h-10 rounded border" />
                              <Input defaultValue="#6B7280" className={theme === 'light' ? 'bg-white' : 'bg-gray-700'} />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <h3 className={`font-semibold ${
                          theme === 'light' ? 'text-gray-900' : 'text-white'
                        }`}>Logo & Branding</h3>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label>Store Logo</Label>
                            <div className="flex items-center space-x-4">
                              <div className="w-20 h-20 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                                <span className="text-gray-500">Logo</span>
                              </div>
                              <Button variant="outline">Upload Logo</Button>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label>Favicon</Label>
                            <div className="flex items-center space-x-4">
                              <div className="w-8 h-8 border-2 border-dashed border-gray-300 rounded flex items-center justify-center">
                                <span className="text-xs text-gray-500">F</span>
                              </div>
                              <Button variant="outline">Upload Favicon</Button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-end">
                        <Button>Save Changes</Button>
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
                      <div className="space-y-4">
                        <h3 className={`font-semibold ${
                          theme === 'light' ? 'text-gray-900' : 'text-white'
                        }`}>Password Policy</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Label htmlFor="minPasswordLength">Minimum Password Length</Label>
                            <Input
                              id="minPasswordLength"
                              type="number"
                              defaultValue="8"
                              className={theme === 'light' ? 'bg-white' : 'bg-gray-700'}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="passwordExpiry">Password Expiry (days)</Label>
                            <Input
                              id="passwordExpiry"
                              type="number"
                              defaultValue="90"
                              className={theme === 'light' ? 'bg-white' : 'bg-gray-700'}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <h3 className={`font-semibold ${
                          theme === 'light' ? 'text-gray-900' : 'text-white'
                        }`}>Two-Factor Authentication</h3>
                        <div className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center space-x-3">
                            <input type="checkbox" />
                            <div>
                              <span className={`font-medium ${
                                theme === 'light' ? 'text-gray-900' : 'text-white'
                              }`}>Enable 2FA for Admin</span>
                              <p className={`text-sm ${
                                theme === 'light' ? 'text-gray-600' : 'text-gray-400'
                              }`}>Require two-factor authentication for admin access</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <h3 className={`font-semibold ${
                          theme === 'light' ? 'text-gray-900' : 'text-white'
                        }`}>Session Management</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                            <Input
                              id="sessionTimeout"
                              type="number"
                              defaultValue="30"
                              className={theme === 'light' ? 'bg-white' : 'bg-gray-700'}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="maxLoginAttempts">Max Login Attempts</Label>
                            <Input
                              id="maxLoginAttempts"
                              type="number"
                              defaultValue="5"
                              className={theme === 'light' ? 'bg-white' : 'bg-gray-700'}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-end">
                        <Button>Save Changes</Button>
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