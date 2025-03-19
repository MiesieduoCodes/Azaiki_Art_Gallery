"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, loading, logout } = useAuth()
  const router = useRouter()
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)

    if (!loading && !user) {
      router.push("/auth/login")
    }
  }, [user, loading, router])

  const handleLogout = async () => {
    await logout()
    router.push("/auth/login")
  }

  // Don't render anything on the server to prevent hydration errors
  if (!isClient) {
    return null
  }

  // Show loading state
  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold">Loading...</h2>
          <p>Please wait while we load your dashboard</p>
        </div>
      </div>
    )
  }

  // If not authenticated, don't render anything (will redirect in useEffect)
  if (!user) {
    return null
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="bg-white shadow">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-500">{user.email}</span>
            <Button variant="outline" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        <aside className="w-64 bg-gray-50 p-4">
          <nav className="space-y-1">
            <Link
              href="/admin"
              className="block rounded-md px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100"
            >
              Dashboard
            </Link>
            <Link
              href="/admin/artists"
              className="block rounded-md px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100"
            >
              Artists
            </Link>
            <Link
              href="/admin/artworks"
              className="block rounded-md px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100"
            >
              Artworks
            </Link>
            <Link
              href="/admin/collections"
              className="block rounded-md px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100"
            >
              Collections
            </Link>
          </nav>
        </aside>

        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  )
}

