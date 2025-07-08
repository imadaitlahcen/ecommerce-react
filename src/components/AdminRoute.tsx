"use client"

import { Navigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

interface AdminRouteProps {
  children: React.ReactNode
}

export function AdminRoute({ children }: AdminRouteProps) {
  const { user, isLoading } = useAuth()

  // Si en cours de chargement, afficher un loader
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  // Si pas d'utilisateur connecté, rediriger vers login
  if (!user) {
    return <Navigate to="/login" replace />
  }

  // Si l'utilisateur n'est pas admin, rediriger vers la page d'accueil
  if (user.role !== 'admin') {
    return <Navigate to="/" replace />
  }

  // Si l'utilisateur est admin, afficher le contenu
  return <>{children}</>
} 