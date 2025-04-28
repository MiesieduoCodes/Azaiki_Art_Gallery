"use client"

import { useAuth } from "@/components/auth-provider"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function DashboardPageClient() {
  const { user } = useAuth()

  return (
    <div className="space-y-6 pt-24">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Dashboard</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Welcome, {user?.displayName || user?.email}</CardTitle>
          <CardDescription>You are logged in to the admin dashboard</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Link href="/dashboard/artists" className="block">
              <Card className="h-full transition-colors hover:bg-muted/50">
                <CardHeader>
                  <CardTitle>Artists</CardTitle>
                  <CardDescription>Manage artists in your gallery</CardDescription>
                </CardHeader>
              </Card>
            </Link>
            <Link href="/dashboard/artworks" className="block">
              <Card className="h-full transition-colors hover:bg-muted/50">
                <CardHeader>
                  <CardTitle>Artworks</CardTitle>
                  <CardDescription>Manage artworks in your gallery</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
