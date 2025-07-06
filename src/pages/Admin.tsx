"use client"

import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export default function Admin() {
  const navigate = useNavigate()

  useEffect(() => {
    navigate("/admin/dashboard")
  }, [navigate])

  return null
}