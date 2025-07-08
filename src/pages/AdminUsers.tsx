"use client"

import { useState, useEffect } from "react"
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
  UserX,
  Loader2,
  Trash2
} from "lucide-react"
import { useTheme } from "../context/ThemeContext"
import { useToast } from "../context/ToastContext"
import { usersApi, type AdminUser } from "../services/adminApi"
import { AdminNavbar } from "../components/AdminNavbar"

export default function AdminUsers() {
  const { theme } = useTheme()
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null)
  const [users, setUsers] = useState<AdminUser[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadUsers()
  }, [])

  const loadUsers = async () => {
    try {
      setLoading(true)
      const data = await usersApi.getAll()
      setUsers(data)
    } catch (error) {
      console.error('Error loading users:', error)
      toast({
        title: "Erreur",
        description: "Impossible de charger les utilisateurs",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  const handleToggleStatus = async (userId: string) => {
    try {
      await usersApi.toggleStatus(userId)
      toast({
        title: "Succès",
        description: "Statut utilisateur mis à jour",
        variant: "default"
      })
      loadUsers() // Recharger la liste
    } catch (error) {
      console.error('Error toggling user status:', error)
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour le statut",
        variant: "destructive"
      })
    }
  }

  const handleDeleteUser = async (userId: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
      return
    }

    try {
      await usersApi.delete(userId)
      toast({
        title: "Succès",
        description: "Utilisateur supprimé avec succès",
        variant: "default"
      })
      loadUsers() // Recharger la liste
    } catch (error) {
      console.error('Error deleting user:', error)
      toast({
        title: "Erreur",
        description: "Impossible de supprimer l'utilisateur",
        variant: "destructive"
      })
    }
  }

  const getStatusBadge = (isActive: boolean) => {
    if (isActive) {
      return <Badge className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">Active</Badge>
    } else {
      return <Badge className="bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400">Inactive</Badge>
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
    activeUsers: users.filter(u => u.isActive).length,
    inactiveUsers: users.filter(u => !u.isActive).length,
    adminUsers: users.filter(u => u.role === 'admin').length,
    totalRevenue: users.reduce((sum, u) => sum + (u.totalSpent || 0), 0)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <AdminNavbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="flex items-center space-x-2">
            <Loader2 className="h-6 w-6 animate-spin" />
            <span>Chargement des utilisateurs...</span>
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
                    Inactive Users
                  </CardTitle>
                  <UserX className="h-4 w-4 text-gray-600" />
                </CardHeader>
                <CardContent>
                  <div className={`text-2xl font-bold ${
                    theme === 'light' ? 'text-gray-900' : 'text-white'
                  }`}>
                    {stats.inactiveUsers}
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
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
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
                    User Accounts ({filteredUsers.length} users)
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
                          }`}>Role</th>
                          <th className={`text-left py-3 px-4 font-medium ${
                            theme === 'light' ? 'text-gray-600' : 'text-gray-400'
                          }`}>Status</th>
                          <th className={`text-left py-3 px-4 font-medium ${
                            theme === 'light' ? 'text-gray-600' : 'text-gray-400'
                          }`}>Activity</th>
                          <th className={`text-left py-3 px-4 font-medium ${
                            theme === 'light' ? 'text-gray-600' : 'text-gray-400'
                          }`}>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredUsers.map((user) => (
                          <tr key={user._id} className={`border-b ${
                            theme === 'light' ? 'border-gray-100' : 'border-gray-800'
                          }`}>
                            <td className="py-4 px-4">
                              <div>
                                <p className={`font-medium ${
                                  theme === 'light' ? 'text-gray-900' : 'text-white'
                                }`}>{user.name}</p>
                                <p className={`text-sm ${
                                  theme === 'light' ? 'text-gray-500' : 'text-gray-400'
                                }`}>Joined {new Date(user.createdAt).toLocaleDateString()}</p>
                              </div>
                            </td>
                            <td className="py-4 px-4">
                              <div className="space-y-1">
                                <div className="flex items-center space-x-2">
                                  <Mail className="h-3 w-3 text-gray-400" />
                                  <span className={`text-sm ${
                                    theme === 'light' ? 'text-gray-700' : 'text-gray-300'
                                  }`}>{user.email}</span>
                                </div>
                                {user.phone && (
                                  <div className="flex items-center space-x-2">
                                    <Phone className="h-3 w-3 text-gray-400" />
                                    <span className={`text-sm ${
                                      theme === 'light' ? 'text-gray-700' : 'text-gray-300'
                                    }`}>{user.phone}</span>
                                  </div>
                                )}
                              </div>
                            </td>
                            <td className="py-4 px-4">
                              {getRoleBadge(user.role)}
                            </td>
                            <td className="py-4 px-4">
                              {getStatusBadge(user.isActive)}
                            </td>
                            <td className="py-4 px-4">
                              <div className="space-y-1">
                                <p className={`text-sm ${
                                  theme === 'light' ? 'text-gray-700' : 'text-gray-300'
                                }`}>
                                  {user.totalOrders || 0} orders
                                </p>
                                <p className={`text-sm ${
                                  theme === 'light' ? 'text-gray-700' : 'text-gray-300'
                                }`}>
                                  ${(user.totalSpent || 0).toFixed(2)} spent
                                </p>
                                {user.lastLogin && (
                                  <p className={`text-xs ${
                                    theme === 'light' ? 'text-gray-500' : 'text-gray-400'
                                  }`}>
                                    Last: {new Date(user.lastLogin).toLocaleDateString()}
                                  </p>
                                )}
                              </div>
                            </td>
                            <td className="py-4 px-4">
                              <div className="flex items-center space-x-2">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleToggleStatus(user._id)}
                                  className={`p-1 ${user.isActive ? 'text-green-600' : 'text-gray-400'}`}
                                >
                                  {user.isActive ? <UserCheck className="h-4 w-4" /> : <UserX className="h-4 w-4" />}
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleDeleteUser(user._id)}
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