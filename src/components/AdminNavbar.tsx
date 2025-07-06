"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Link, useLocation } from "react-router-dom"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Users, 
  Settings, 
  Bell, 
  Menu,
  X,
  LogOut,
  User,
  Shield,
  Store
} from "lucide-react"
import { useTheme } from "../context/ThemeContext"
import { useAuth } from "../context/AuthContext"

export function AdminNavbar() {
  const { theme, toggleTheme } = useTheme()
  const { user, logout } = useAuth()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()

  const adminNavItems = [
    { 
      name: "Dashboard", 
      icon: LayoutDashboard, 
      path: "/admin"
    },
    { 
      name: "Products", 
      icon: Package, 
      path: "/admin/products"
    },
    { 
      name: "Orders", 
      icon: ShoppingCart, 
      path: "/admin/orders"
    },
    { 
      name: "Users", 
      icon: Users, 
      path: "/admin/users"
    },
    { 
      name: "Settings", 
      icon: Settings, 
      path: "/admin/settings"
    }
  ]

  const isActive = (path: string) => {
    return location.pathname === path
  }

  const handleLogout = () => {
    logout()
  }

  return (
    <nav className={`sticky top-0 z-50 border-b ${
      theme === 'light' 
        ? 'bg-white border-gray-200 shadow-sm' 
        : 'bg-gray-900 border-gray-800 shadow-lg'
    }`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-4">
            <Link to="/admin" className="flex items-center space-x-3">
              <div className={`p-2 rounded-md ${
                theme === 'light' 
                  ? 'bg-blue-50 text-blue-600' 
                  : 'bg-blue-900/30 text-blue-400'
              }`}>
                <Shield className="h-5 w-5" />
              </div>
              <div>
                <h1 className={`font-semibold text-lg ${
                  theme === 'light' ? 'text-gray-900' : 'text-white'
                }`}>
                  Admin
                </h1>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {adminNavItems.map((item) => {
              const Icon = item.icon
              const active = isActive(item.path)
              
              return (
                <Link key={item.name} to={item.path}>
                  <Button
                    variant={active ? "default" : "ghost"}
                    size="sm"
                    className={`h-9 px-3 ${
                      active 
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : theme === 'light'
                          ? 'text-gray-600 hover:bg-gray-100'
                          : 'text-gray-300 hover:bg-gray-800'
                    }`}
                  >
                    <Icon className="h-4 w-4 mr-2" />
                    {item.name}
                  </Button>
                </Link>
              )
            })}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-2">
            {/* Notifications */}
            <Button
              variant="ghost"
              size="sm"
              className={`relative p-2 ${
                theme === 'light' 
                  ? 'text-gray-500 hover:bg-gray-100' 
                  : 'text-gray-400 hover:bg-gray-800'
              }`}
            >
              <Bell className="h-4 w-4" />
              <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 text-xs bg-red-500">
                2
              </Badge>
            </Button>

            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className={`p-2 ${
                theme === 'light' 
                  ? 'text-gray-500 hover:bg-gray-100' 
                  : 'text-gray-400 hover:bg-gray-800'
              }`}
            >
              {theme === 'light' ? '🌙' : '☀️'}
            </Button>

            {/* Back to Store */}
            <Link to="/">
              <Button
                variant="ghost"
                size="sm"
                className={`p-2 ${
                  theme === 'light' 
                    ? 'text-gray-500 hover:bg-gray-100' 
                    : 'text-gray-400 hover:bg-gray-800'
                }`}
              >
                <Store className="h-4 w-4" />
              </Button>
            </Link>

            {/* User Menu */}
            <div className="flex items-center space-x-2">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center ${
                theme === 'light' 
                  ? 'bg-gray-100 text-gray-600' 
                  : 'bg-gray-800 text-gray-300'
              }`}>
                <User className="h-3 w-3" />
              </div>
              <span className={`hidden lg:block text-sm ${
                theme === 'light' ? 'text-gray-700' : 'text-gray-300'
              }`}>
                {user?.name || 'Admin'}
              </span>
            </div>

            {/* Logout */}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className={`p-2 ${
                theme === 'light' 
                  ? 'text-gray-500 hover:bg-gray-100' 
                  : 'text-gray-400 hover:bg-gray-800'
              }`}
            >
              <LogOut className="h-4 w-4" />
            </Button>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`p-2 ${
                  theme === 'light' 
                    ? 'text-gray-500 hover:bg-gray-100' 
                    : 'text-gray-400 hover:bg-gray-800'
                }`}
              >
                {isMobileMenuOpen ? (
                  <X className="h-4 w-4" />
                ) : (
                  <Menu className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className={`md:hidden border-t ${
            theme === 'light' ? 'border-gray-200' : 'border-gray-800'
          }`}>
            <div className="px-2 pt-2 pb-3 space-y-1">
              {adminNavItems.map((item) => {
                const Icon = item.icon
                const active = isActive(item.path)
                
                return (
                  <Link key={item.name} to={item.path}>
                    <Button
                      variant={active ? "default" : "ghost"}
                      className={`w-full justify-start ${
                        active 
                          ? 'bg-blue-600 text-white'
                          : theme === 'light'
                            ? 'text-gray-700 hover:bg-gray-100'
                            : 'text-gray-300 hover:bg-gray-800'
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Icon className="h-4 w-4 mr-3" />
                      {item.name}
                    </Button>
                  </Link>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
} 