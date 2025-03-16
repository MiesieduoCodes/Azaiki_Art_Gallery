"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { Palette, Users, FolderOpen, Calendar, UserCheck, Eye, ArrowUpRight } from "lucide-react"
import Link from "next/link"

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    artworks: 0,
    artists: 0,
    collections: 0,
    events: 0,
    users: 0,
    views: 0,
  })
  const [recentArtworks, setRecentArtworks] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        // Fetch counts
        const [
          { count: artworksCount },
          { count: artistsCount },
          { count: collectionsCount },
          { count: eventsCount },
          { count: usersCount },
        ] = await Promise.all([
          supabase.from("artworks").select("*", { count: "exact", head: true }),
          supabase.from("artists").select("*", { count: "exact", head: true }),
          supabase.from("collections").select("*", { count: "exact", head: true }),
          supabase.from("events").select("*", { count: "exact", head: true }),
          supabase.from("profiles").select("*", { count: "exact", head: true }),
        ])

        // Fetch recent artworks
        const { data: artworks } = await supabase
          .from("artworks")
          .select(`
            id, 
            title, 
            image_url,
            created_at,
            artists:artist_id (name)
          `)
          .order("created_at", { ascending: false })
          .limit(5)

        setStats({
          artworks: artworksCount || 0,
          artists: artistsCount || 0,
          collections: collectionsCount || 0,
          events: eventsCount || 0,
          users: usersCount || 0,
          views: 1245, // Placeholder for view count
        })

        setRecentArtworks(artworks || [])
      } catch (error) {
        console.error("Error fetching dashboard data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchDashboardData()
  }, [])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-700"></div>
      </div>
    )
  }

  const statCards = [
    { title: "Total Artworks", value: stats.artworks, icon: Palette, color: "bg-blue-500" },
    { title: "Total Artists", value: stats.artists, icon: Users, color: "bg-purple-500" },
    { title: "Collections", value: stats.collections, icon: FolderOpen, color: "bg-amber-500" },
    { title: "Events", value: stats.events, icon: Calendar, color: "bg-emerald-500" },
    { title: "Registered Users", value: stats.users, icon: UserCheck, color: "bg-rose-500" },
    { title: "Total Views", value: stats.views, icon: Eye, color: "bg-cyan-500" },
  ]

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600">Welcome to the ArtVista admin dashboard. Manage your gallery content here.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {statCards.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className={`${stat.color} text-white p-3 rounded-lg`}>
                <stat.icon className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Artworks */}
      <div className="bg-white rounded-lg shadow mb-8">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-lg font-medium text-gray-900">Recently Added Artworks</h2>
          <Link href="/admin/artworks" className="text-sm text-blue-600 hover:text-blue-800 flex items-center">
            View all <ArrowUpRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Artwork
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Artist
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date Added
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentArtworks.length > 0 ? (
                  recentArtworks.map((artwork) => (
                    <tr key={artwork.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0">
                            <img
                              className="h-10 w-10 rounded-md object-cover"
                              src={artwork.image_url || "/placeholder.svg?height=40&width=40"}
                              alt={artwork.title}
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{artwork.title}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{artwork.artists?.name || "Unknown"}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{new Date(artwork.created_at).toLocaleDateString()}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Link href={`/admin/artworks/${artwork.id}`} className="text-blue-600 hover:text-blue-900">
                          Edit
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="px-6 py-4 text-center text-sm text-gray-500">
                      No artworks found. Add some artworks to get started.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Quick Actions</h2>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            href="/admin/artworks/new"
            className="bg-blue-50 hover:bg-blue-100 text-blue-700 p-4 rounded-lg flex flex-col items-center justify-center text-center"
          >
            <Palette className="h-8 w-8 mb-2" />
            <span className="font-medium">Add New Artwork</span>
          </Link>

          <Link
            href="/admin/artists/new"
            className="bg-purple-50 hover:bg-purple-100 text-purple-700 p-4 rounded-lg flex flex-col items-center justify-center text-center"
          >
            <Users className="h-8 w-8 mb-2" />
            <span className="font-medium">Add New Artist</span>
          </Link>

          <Link
            href="/admin/collections/new"
            className="bg-amber-50 hover:bg-amber-100 text-amber-700 p-4 rounded-lg flex flex-col items-center justify-center text-center"
          >
            <FolderOpen className="h-8 w-8 mb-2" />
            <span className="font-medium">Add New Collection</span>
          </Link>

          <Link
            href="/admin/events/new"
            className="bg-emerald-50 hover:bg-emerald-100 text-emerald-700 p-4 rounded-lg flex flex-col items-center justify-center text-center"
          >
            <Calendar className="h-8 w-8 mb-2" />
            <span className="font-medium">Add New Event</span>
          </Link>
        </div>
      </div>
    </div>
  )
}

