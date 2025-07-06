"use client"

import { Link } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "./ui/button"
import { ShoppingCart, Menu, X, Sun, Moon, User, LogOut, Heart } from "lucide-react"
import { useState, useEffect, useRef } from "react"
import { useTheme } from "../context/ThemeContext"
import { useAuth } from "../context/AuthContext"
import { useLikes } from "../context/LikesContext"
import { useCart } from "../context/CartContext"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { theme, toggleTheme } = useTheme()
  const { user, logout } = useAuth()
  const { getLikedCount } = useLikes()
  const { getItemCount } = useCart()
  const userMenuRef = useRef<HTMLDivElement>(null)

  const handleLogout = () => {
    logout()
    setUserMenuOpen(false)
  }

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false)
      }
    }

    if (userMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [userMenuOpen])

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ]

  return (
    <motion.header
      className={`sticky top-0 z-50 w-full backdrop-blur-sm transition-all duration-200 ${
        scrolled
          ? theme === 'light'
            ? 'bg-white/95 border-b border-gray-200 shadow-sm'
            : 'bg-gray-900/95 border-b border-gray-800 shadow-sm'
          : theme === 'light'
            ? 'bg-white/90 border-b border-gray-100'
            : 'bg-gray-900/90 border-b border-gray-800'
      }`}
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <div className="container flex h-16 items-center justify-between">
        {/* Logo Section */}
        <motion.div 
          whileHover={{ scale: 1.02 }} 
          transition={{ duration: 0.2 }}
          className="relative"
        >
          <Link to="/" className="flex items-center space-x-3 group">
            <img src="/images/logo.svg" alt="Shop Logo" className="h-8 w-8" />
            <span className={`font-semibold text-xl tracking-tight ${
              theme === 'light' ? 'text-gray-900' : 'text-white'
            }`}>
              Shop
            </span>
          </Link>
        </motion.div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
            >
              <Link
                to={item.path}
                className={`relative text-sm font-medium transition-colors duration-200 ${
                  theme === 'light'
                    ? 'text-gray-700 hover:text-gray-900'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                {item.name}
                <motion.div
                  className={`absolute -bottom-1 left-0 h-0.5 ${
                    theme === 'light' ? 'bg-gray-900' : 'bg-white'
                  }`}
                  initial={{ width: 0 }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.2 }}
                />
              </Link>
            </motion.div>
          ))}
        </nav>

        <div className="flex items-center space-x-4">
          {/* Theme Toggle Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className={`h-9 w-9 rounded-lg transition-colors duration-200 ${
              theme === 'light'
                ? 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                : 'text-gray-400 hover:text-white hover:bg-gray-800'
            }`}
            aria-label="Toggle theme"
          >
            {theme === "light" ? (
              <Moon className="h-4 w-4" />
            ) : (
              <Sun className="h-4 w-4" />
            )}
          </Button>

          {/* Likes Button */}
          <Link to="/liked">
            <Button
              variant="ghost"
              size="icon"
              className={`relative h-9 w-9 rounded-lg transition-colors duration-200 ${
                theme === 'light'
                  ? 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800'
              }`}
              aria-label="Voir les favoris"
            >
              <Heart className="h-4 w-4" />
              {getLikedCount() > 0 && (
                <motion.span 
                  className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white rounded-full text-xs flex items-center justify-center font-medium"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {getLikedCount()}
                </motion.span>
              )}
            </Button>
          </Link>

          {/* Cart Button */}
          <Link to="/cart">
            <Button
              variant="ghost"
              size="icon"
              className={`relative h-9 w-9 rounded-lg transition-colors duration-200 ${
                theme === 'light'
                  ? 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800'
              }`}
              aria-label="Voir le panier"
            >
              <ShoppingCart className="h-4 w-4" />
              {getItemCount() > 0 && (
                <motion.span 
                  className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white rounded-full text-xs flex items-center justify-center font-medium"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {getItemCount()}
                </motion.span>
              )}
            </Button>
          </Link>

          {/* Auth Buttons / User Menu */}
          {user ? (
            // User is logged in - show user menu
            <div className="relative" ref={userMenuRef}>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className={`h-9 w-9 rounded-lg transition-colors duration-200 ${
                  theme === 'light'
                    ? 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800'
                }`}
                aria-label="User menu"
              >
                <User className="h-4 w-4" />
              </Button>

              {/* User Dropdown Menu */}
              <AnimatePresence>
                {userMenuOpen && (
                  <motion.div
                    className={`absolute right-0 top-full mt-2 w-48 rounded-lg shadow-lg py-1 z-50 ${
                      theme === 'light'
                        ? 'bg-white border border-gray-200'
                        : 'bg-gray-800 border border-gray-700'
                    }`}
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.15 }}
                  >
                    <div className={`px-3 py-2 border-b ${
                      theme === 'light' ? 'border-gray-100' : 'border-gray-700'
                    }`}>
                      <p className={`text-sm font-medium ${
                        theme === 'light' ? 'text-gray-900' : 'text-white'
                      }`}>{user.name}</p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                    <div className="py-1">
                      <Link
                        to="/profile"
                        className={`block px-3 py-2 text-sm transition-colors duration-150 ${
                          theme === 'light'
                            ? 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                            : 'text-gray-300 hover:text-white hover:bg-gray-700'
                        }`}
                        onClick={() => setUserMenuOpen(false)}
                      >
                        Profile
                      </Link>
                      <Link
                        to="/admin"
                        className={`block px-3 py-2 text-sm transition-colors duration-150 ${
                          theme === 'light'
                            ? 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                            : 'text-gray-300 hover:text-white hover:bg-gray-700'
                        }`}
                        onClick={() => setUserMenuOpen(false)}
                      >
                        Admin Dashboard
                      </Link>
                      <button
                        onClick={handleLogout}
                        className={`w-full text-left px-3 py-2 text-sm transition-colors duration-150 flex items-center ${
                          theme === 'light'
                            ? 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                            : 'text-gray-300 hover:text-white hover:bg-gray-700'
                        }`}
                      >
                        <LogOut className="w-3 h-3 mr-2" />
                        Logout
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            // User is not logged in - show auth buttons
            <div className="hidden md:flex items-center space-x-3">
              <Link to="/login">
                <Button
                  variant="ghost"
                  size="sm"
                  className={`h-8 px-3 text-sm font-medium transition-colors duration-200 ${
                    theme === 'light'
                      ? 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                      : 'text-gray-300 hover:text-white hover:bg-gray-800'
                  }`}
                >
                  Sign In
                </Button>
              </Link>
              <Link to="/register">
                <Button
                  size="sm"
                  className="h-8 px-4 text-sm font-medium bg-gray-900 hover:bg-gray-800 text-white transition-colors duration-200"
                >
                  Sign Up
                </Button>
              </Link>
            </div>
          )}

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className={`md:hidden h-9 w-9 rounded-lg transition-colors duration-200 ${
              theme === 'light'
                ? 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                : 'text-gray-400 hover:text-white hover:bg-gray-800'
            }`}
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={`md:hidden border-t ${
              theme === 'light' ? 'border-gray-100' : 'border-gray-800'
            }`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{ overflow: "hidden" }}
          >
            <div className="container py-4 space-y-1">
              {/* Mobile Navigation Links */}
              <nav className="space-y-1">
                {navItems.map((item, index) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`block px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-150 ${
                      theme === 'light'
                        ? 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                        : 'text-gray-300 hover:text-white hover:bg-gray-800'
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>

              {/* Mobile Auth Buttons */}
              {!user && (
                <div className="flex flex-col space-y-2 pt-4 border-t border-gray-200">
                  <Link to="/login">
                    <Button
                      variant="ghost"
                      className={`w-full justify-start h-9 text-sm font-medium ${
                        theme === 'light'
                          ? 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                          : 'text-gray-300 hover:text-white hover:bg-gray-800'
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      Sign In
                    </Button>
                  </Link>
                  <Link to="/register">
                    <Button
                      className="w-full justify-start h-9 text-sm font-medium bg-gray-900 hover:bg-gray-800 text-white transition-colors duration-200"
                      onClick={() => setIsOpen(false)}
                    >
                      Sign Up
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
