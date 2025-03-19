"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { getArtists, getArtworks, getCollections } from "@/lib/firebase-service"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    artists: 0,
    artworks: 0,
    collections: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [artists, artworks, collections] = await Promise.all([getArtists(), getArtworks(), getCollections()])

        setStats({
          artists: artists.length,
          artworks: artworks.length,
          collections: collections.length,
        })
      } catch (error) {
        console.error("Error fetching stats:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  if (loading) {
    return <div>Loading dashboard data...</div>
  }

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">Dashboard</h2>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Artists</CardTitle>
            <CardDescription>Total number of artists</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">{stats.artists}</div>
            <Link href="/admin/artists" className="mt-2 inline-block text-sm text-primary hover:underline">
              View all artists
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Artworks</CardTitle>
            <CardDescription>Total number of artworks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">{stats.artworks}</div>
            <Link href="/admin/artworks" className="mt-2 inline-block text-sm text-primary hover:underline">
              View all artworks
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Collections</CardTitle>
            <CardDescription>Total number of collections</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">{stats.collections}</div>
            <Link href="/admin/collections" className="mt-2 inline-block text-sm text-primary hover:underline">
              View all collections
            </Link>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-semibold">Quick Actions</h3>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Link href="/admin/artists/new">
            <Card className="cursor-pointer hover:bg-gray-50">
              <CardContent className="p-4 text-center">
                <p className="font-medium">Add New Artist</p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/admin/artworks/new">
            <Card className="cursor-pointer hover:bg-gray-50">
              <CardContent className="p-4 text-center">
                <p className="font-medium">Add New Artwork</p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/admin/collections/new">
            <Card className="cursor-pointer hover:bg-gray-50">
              <CardContent className="p-4 text-center">
                <p className="font-medium">Add New Collection</p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  )
}

