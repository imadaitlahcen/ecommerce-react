import { Routes, Route } from "react-router-dom"
import { CartProvider } from "./context/CartContext"
import { AuthProvider } from "./context/AuthContext"
import { ToastProvider } from "./context/ToastContext"
import { ThemeProvider } from "./context/ThemeContext"
import { LikesProvider } from "./context/LikesContext"
import Home from "./pages/Home"
import Shop from "./pages/Shop"
import ProductDetail from "./pages/ProductDetail"
import Cart from "./pages/Cart"
import Checkout from "./pages/Checkout"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Profile from "./pages/Profile"
import LikedProducts from "./pages/LikedProducts"
import Admin from "./pages/Admin"
import AdminDashboard from "./pages/AdminDashboard"
import AdminProducts from "./pages/AdminProducts"
import AdminOrders from "./pages/AdminOrders"
import AdminUsers from "./pages/AdminUsers"
import AdminSettings from "./pages/AdminSettings"
import NotFound from "./pages/NotFound"

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <CartProvider>
          <LikesProvider>
            <ToastProvider>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/liked" element={<LikedProducts />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path="/admin/products" element={<AdminProducts />} />
                <Route path="/admin/orders" element={<AdminOrders />} />
                <Route path="/admin/users" element={<AdminUsers />} />
                <Route path="/admin/settings" element={<AdminSettings />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </ToastProvider>
          </LikesProvider>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
