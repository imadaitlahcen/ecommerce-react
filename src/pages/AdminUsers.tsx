"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Badge } from "../components/ui/badge"
import { Input } from "../components/ui/input"
import { 
  Users, 
  Search,
  Filter,
  Eye,
  Mail,
  Phone,
  Calendar,
  Shield,
  UserCheck,
  UserX
} from "lucide-react"
import { useTheme } from "../context/ThemeContext"
import { AdminNavbar } from "../components/AdminNavbar"

export default function AdminUsers() {
  const { theme } = useTheme()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedUser, setSelectedUser] = useState(null)

  // Mock users data
  const users = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      phone: "+1 (555) 123-4567",
      joinDate: "2023-01-15",
      status: "active",
      role: "customer",
      totalOrders: 12,
      totalSpent: 1247.50,
      lastLogin: "2024-01-20"
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "+1 (555) 234-5678",
      joinDate: "2023-03-22",
      status: "active",
      role: "customer",
      totalOrders: 8,
      totalSpent: 892.30,
      lastLogin: "2024-01-19"
    },
    {
      id: 3,
      name: "Mike Johnson",
      email: "mike@example.com",
      phone: "+1 (555) 345-6789",
      joinDate: "2023-06-10",
      status: "inactive",
      role: "customer",
      totalOrders: 3,
      totalSpent: 245.00,
      lastLogin: "2023-12-15"
    },
    {
      id: 4,
      name: "Sarah Wilson",
      email: "sarah@example.com",
      phone: "+1 (555) 456-7890",
      joinDate: "2023-08-05",
      status: "active",
      role: "admin",
      totalOrders: 0,
      totalSpent: 0,
      lastLogin: "2024-01-21"
    },
    {
      id: 5,
      name: "David Brown",
      email: "david@example.com",
      phone: "+1 (555) 567-8901",
      joinDate: "2023-11-18",
      status: "active",
      role: "customer",
      totalOrders: 15,
      totalSpent: 2103.75,
      lastLogin: "2024-01-20"
    }
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">Active</Badge>
      case "inactive":
        return <Badge className="bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400">Inactive</Badge>
      default:
        return <Badge className="bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400">Unknown</Badge>
    }
  }

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "admin":
        return <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400">Admin</Badge>
      case "customer":
        return <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400">Customer</Badge>
      default:
        return <Badge className="bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400">Unknown</Badge>
    }
  }

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const stats = {
    totalUsers: users.length,
    activeUsers: users.filter(u => u.status === 'active').length,
    inactiveUsers: users.filter(u => u.status === 'inactive').length,
    adminUsers: users.filter(u => u.role === 'admin').length,
    totalRevenue: users.reduce((sum, u) => sum + u.totalSpent, 0)
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
          Users
        </h1>
        <p className={`${
          theme === 'light' ? 'text-gray-600' : 'text-gray-400'
        }`}>
          Manage customer accounts and user permissions
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
              {stats.totalUsers}
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
              Active Users
            </CardTitle>
            <UserCheck className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${
              theme === 'light' ? 'text-gray-900' : 'text-white'
            }`}>
              {stats.activeUsers}
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
              Admin Users
            </CardTitle>
            <Shield className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${
              theme === 'light' ? 'text-gray-900' : 'text-white'
            }`}>
              {stats.adminUsers}
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
            <UserCheck className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${
              theme === 'light' ? 'text-gray-900' : 'text-white'
            }`}>
              ${stats.totalRevenue.toLocaleString()}
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
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search users by name or email..."
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

      {/* Users Table */}
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
              User Management ({filteredUsers.length} users)
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
                    }`}>User</th>
                    <th className={`text-left py-3 px-4 font-medium ${
                      theme === 'light' ? 'text-gray-600' : 'text-gray-400'
                    }`}>Contact</th>
                    <th className={`text-left py-3 px-4 font-medium ${
                      theme === 'light' ? 'text-gray-600' : 'text-gray-400'
                    }`}>Join Date</th>
                    <th className={`text-left py-3 px-4 font-medium ${
                      theme === 'light' ? 'text-gray-600' : 'text-gray-400'
                    }`}>Orders</th>
                    <th className={`text-left py-3 px-4 font-medium ${
                      theme === 'light' ? 'text-gray-600' : 'text-gray-400'
                    }`}>Status</th>
                    <th className={`text-left py-3 px-4 font-medium ${
                      theme === 'light' ? 'text-gray-600' : 'text-gray-400'
                    }`}>Role</th>
                    <th className={`text-left py-3 px-4 font-medium ${
                      theme === 'light' ? 'text-gray-600' : 'text-gray-400'
                    }`}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className={`border-b ${
                      theme === 'light' ? 'border-gray-100' : 'border-gray-800'
                    }`}>
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-3">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            theme === 'light' 
                              ? 'bg-gray-100 text-gray-600' 
                              : 'bg-gray-700 text-gray-300'
                          }`}>
                            <Users className="h-5 w-5" />
                          </div>
                          <div>
                            <p className={`font-medium ${
                              theme === 'light' ? 'text-gray-900' : 'text-white'
                            }`}>{user.name}</p>
                            <p className={`text-sm ${
                              theme === 'light' ? 'text-gray-500' : 'text-gray-400'
                            }`}>ID: {user.id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div>
                          <p className={`text-sm ${
                            theme === 'light' ? 'text-gray-700' : 'text-gray-300'
                          }`}>{user.email}</p>
                          <p className={`text-sm ${
                            theme === 'light' ? 'text-gray-500' : 'text-gray-400'
                          }`}>{user.phone}</p>
                        </div>
                      </td>
                      <td className={`py-4 px-4 ${
                        theme === 'light' ? 'text-gray-700' : 'text-gray-300'
                      }`}>
                        {user.joinDate}
                      </td>
                      <td className="py-4 px-4">
                        <div>
                          <p className={`font-semibold ${
                            theme === 'light' ? 'text-gray-900' : 'text-white'
                          }`}>{user.totalOrders}</p>
                          <p className={`text-sm ${
                            theme === 'light' ? 'text-gray-500' : 'text-gray-400'
                          }`}>${user.totalSpent}</p>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        {getStatusBadge(user.status)}
                      </td>
                      <td className="py-4 px-4">
                        {getRoleBadge(user.role)}
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setSelectedUser(user)}
                            className="p-1"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          {user.status === 'active' ? (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="p-1 text-red-600 hover:text-red-700"
                            >
                              <UserX className="h-4 w-4" />
                            </Button>
                          ) : (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="p-1 text-green-600 hover:text-green-700"
                            >
                              <UserCheck className="h-4 w-4" />
                            </Button>
                          )}
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

      {/* User Details Modal */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className={`max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto rounded-lg ${
            theme === 'light' ? 'bg-white' : 'bg-gray-800'
          }`}>
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className={`text-xl font-bold ${
                  theme === 'light' ? 'text-gray-900' : 'text-white'
                }`}>
                  User Details - {selectedUser.name}
                </h2>
                <Button
                  variant="ghost"
                  onClick={() => setSelectedUser(null)}
                  className="p-1"
                >
                  ✕
                </Button>
              </div>

              <div className="space-y-6">
                {/* Basic Info */}
                <div>
                  <h3 className={`font-semibold mb-2 ${
                    theme === 'light' ? 'text-gray-900' : 'text-white'
                  }`}>Basic Information</h3>
                  <div className={`p-3 rounded-lg ${
                    theme === 'light' ? 'bg-gray-50' : 'bg-gray-700'
                  }`}>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className={`text-sm ${
                          theme === 'light' ? 'text-gray-600' : 'text-gray-400'
                        }`}>Name</p>
                        <p className={`font-medium ${
                          theme === 'light' ? 'text-gray-900' : 'text-white'
                        }`}>{selectedUser.name}</p>
                      </div>
                      <div>
                        <p className={`text-sm ${
                          theme === 'light' ? 'text-gray-600' : 'text-gray-400'
                        }`}>User ID</p>
                        <p className={`font-medium ${
                          theme === 'light' ? 'text-gray-900' : 'text-white'
                        }`}>{selectedUser.id}</p>
                      </div>
                      <div>
                        <p className={`text-sm ${
                          theme === 'light' ? 'text-gray-600' : 'text-gray-400'
                        }`}>Email</p>
                        <p className={`font-medium ${
                          theme === 'light' ? 'text-gray-900' : 'text-white'
                        }`}>{selectedUser.email}</p>
                      </div>
                      <div>
                        <p className={`text-sm ${
                          theme === 'light' ? 'text-gray-600' : 'text-gray-400'
                        }`}>Phone</p>
                        <p className={`font-medium ${
                          theme === 'light' ? 'text-gray-900' : 'text-white'
                        }`}>{selectedUser.phone}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Account Info */}
                <div>
                  <h3 className={`font-semibold mb-2 ${
                    theme === 'light' ? 'text-gray-900' : 'text-white'
                  }`}>Account Information</h3>
                  <div className={`p-3 rounded-lg ${
                    theme === 'light' ? 'bg-gray-50' : 'bg-gray-700'
                  }`}>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className={`text-sm ${
                          theme === 'light' ? 'text-gray-600' : 'text-gray-400'
                        }`}>Join Date</p>
                        <p className={`font-medium ${
                          theme === 'light' ? 'text-gray-900' : 'text-white'
                        }`}>{selectedUser.joinDate}</p>
                      </div>
                      <div>
                        <p className={`text-sm ${
                          theme === 'light' ? 'text-gray-600' : 'text-gray-400'
                        }`}>Last Login</p>
                        <p className={`font-medium ${
                          theme === 'light' ? 'text-gray-900' : 'text-white'
                        }`}>{selectedUser.lastLogin}</p>
                      </div>
                      <div>
                        <p className={`text-sm ${
                          theme === 'light' ? 'text-gray-600' : 'text-gray-400'
                        }`}>Status</p>
                        <div className="mt-1">{getStatusBadge(selectedUser.status)}</div>
                      </div>
                      <div>
                        <p className={`text-sm ${
                          theme === 'light' ? 'text-gray-600' : 'text-gray-400'
                        }`}>Role</p>
                        <div className="mt-1">{getRoleBadge(selectedUser.role)}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Purchase History */}
                <div>
                  <h3 className={`font-semibold mb-2 ${
                    theme === 'light' ? 'text-gray-900' : 'text-white'
                  }`}>Purchase History</h3>
                  <div className={`p-3 rounded-lg ${
                    theme === 'light' ? 'bg-gray-50' : 'bg-gray-700'
                  }`}>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className={`text-sm ${
                          theme === 'light' ? 'text-gray-600' : 'text-gray-400'
                        }`}>Total Orders</p>
                        <p className={`text-2xl font-bold ${
                          theme === 'light' ? 'text-gray-900' : 'text-white'
                        }`}>{selectedUser.totalOrders}</p>
                      </div>
                      <div>
                        <p className={`text-sm ${
                          theme === 'light' ? 'text-gray-600' : 'text-gray-400'
                        }`}>Total Spent</p>
                        <p className={`text-2xl font-bold ${
                          theme === 'light' ? 'text-gray-900' : 'text-white'
                        }`}>${selectedUser.totalSpent}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
          </div>
        </main>
      </div>
    </>
  )
} 