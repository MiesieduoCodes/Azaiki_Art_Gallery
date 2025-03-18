"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"
import { supabase } from "@/lib/supabase"
import { Heart, Clock, User, Settings, ArrowRight } from "lucide-react"

export default function Dashboard() {
  const { user } = useAuth()
  const [favoriteArtworks, setFavoriteArtworks] = useState<any[]>([])
  const [recentVisits, setRecentVisits] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchUserData() {
      if (!user) return

      setIsLoading(true)

      try {
        // Fetch user's favorite artworks
        const { data: favorites } = await supabase
          .from("favorites")
          .select(`
            id,
            created_at,
            artworks:artwork_id (
              id,
              title,
              image_url,
              artists:artist_id (name)
            )
          `)
          .eq("user_id", user.id)
          .order("created_at", { ascending: false })
          .limit(4)

        // Fetch user's recent visits
        const { data: visits } = await supabase
          .from("visit_history")
          .select(`
            id,
            visited_at,
            artworks:artwork_id (
              id,
              title,
              image_url,
              artists:artist_id (name)
            )
          `)
          .eq("user_id", user.id)
          .order("visited_at", { ascending: false })
          .limit(4)

        setFavoriteArtworks(favorites || [])
        setRecentVisits(visits || [])
      } catch (error) {
        console.error("Error fetching user data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchUserData()
  }, [user])

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-700"></div>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Welcome to Your Dashboard</h1>
        <p className="text-gray-600">Manage your profile, favorites, and visit history.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Quick Links */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Quick Links</h2>
          <div className="grid grid-cols-2 gap-4">
            <Link
              href="/dashboard/profile"
              className="flex items-center p-3 rounded-lg border border-gray-200 hover:bg-gray-50"
            >
              <User className="h-5 w-5 text-blue-700 mr-3" />
              <span>Your Profile</span>
            </Link>

            <Link
              href="/dashboard/favorites"
              className="flex items-center p-3 rounded-lg border border-gray-200 hover:bg-gray-50"
            >
              <Heart className="h-5 w-5 text-blue-700 mr-3" />
              <span>Favorites</span>
            </Link>

            <Link
              href="/dashboard/history"
              className="flex items-center p-3 rounded-lg border border-gray-200 hover:bg-gray-50"
            >
              <Clock className="h-5 w-5 text-blue-700 mr-3" />
              <span>Visit History</span>
            </Link>

            <Link
              href="/dashboard/settings"
              className="flex items-center p-3 rounded-lg border border-gray-200 hover:bg-gray-50"
            >
              <Settings className="h-5 w-5 text-blue-700 mr-3" />
              <span>Settings</span>
            </Link>
          </div>
        </div>

        {/* User Info */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Your Account</h2>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-medium">{user?.email}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Member Since</p>
              <p className="font-medium">{user?.created_at ? new Date(user.created_at).toLocaleDateString() : "N/A"}</p>
            </div>

            <div className="pt-2">
              <Link
                href="/dashboard/profile"
                className="text-blue-700 hover:text-blue-800 font-medium flex items-center"
              >
                Complete your profile <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Favorites */}
      <div className="bg-white rounded-lg shadow mb-8">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-lg font-medium text-gray-900">Your Favorites</h2>
          <Link href="/dashboard/favorites" className="text-sm text-blue-600 hover:text-blue-800 flex items-center">
            View all <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>

        <div className="p-6">
          {favoriteArtworks.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {favoriteArtworks.map((favorite) => (
                <Link key={favorite.id} href={`/gallery/${favorite.artworks.id}`} className="group">
                  <div className="relative aspect-square rounded-lg overflow-hidden shadow-sm">
                    <img
                      src={favorite.artworks.image_url || "/placeholder.svg?height=200&width=200"}
                      alt={favorite.artworks.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                        <h3 className="text-sm font-medium">{favorite.artworks.title}</h3>
                        <p className="text-xs text-gray-300">{favorite.artworks.artists?.name}</p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Heart className="h-12 w-12 text-gray-300 mx-auto mb-3" />
              <h3 className="text-lg font-medium text-gray-900 mb-1">No favorites yet</h3>
              <p className="text-gray-500 mb-4">Save artworks you love to access them easily later.</p>
              <Link
                href="/gallery"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-700 hover:bg-blue-800"
              >
                Explore Gallery
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Recent Visits */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-lg font-medium text-gray-900">Recent Visits</h2>
          <Link href="/dashboard/history" className="text-sm text-blue-600 hover:text-blue-800 flex items-center">
            View all <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>

        <div className="p-6">
          {recentVisits.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {recentVisits.map((visit) => (
                <Link key={visit.id} href={`/gallery/${visit.artworks.id}`} className="group">
                  <div className="relative aspect-square rounded-lg overflow-hidden shadow-sm">
                    <img
                      src={visit.artworks.image_url || "/placeholder.svg?height=200&width=200"}
                      alt={visit.artworks.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                        <h3 className="text-sm font-medium">{visit.artworks.title}</h3>
                        <p className="text-xs text-gray-300">{visit.artworks.artists?.name}</p>
                        <p className="text-xs text-gray-400">
                          Visited: {new Date(visit.visited_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Clock className="h-12 w-12 text-gray-300 mx-auto mb-3" />
              <h3 className="text-lg font-medium text-gray-900 mb-1">No visit history</h3>
              <p className="text-gray-500 mb-4">Your recently viewed artworks will appear here.</p>
              <Link
                href="/gallery"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-700 hover:bg-blue-800"
              >
                Explore Gallery
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

