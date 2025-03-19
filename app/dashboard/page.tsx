"use client"

import { useEffect, useState } from "react"
import { collection, getDocs } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ImageIcon, Users, Clock } from "lucide-react"

export default function DashboardPage() {
  const [stats, setStats] = useState({
    totalArtworks: 0,
    totalArtists: 0,
    recentlyAdded: 0,
  })

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Get artworks count
        const artworksSnapshot = await getDocs(collection(db, "artworks"))
        const artworksCount = artworksSnapshot.size

        // Get artists count
        const artistsSnapshot = await getDocs(collection(db, "artists"))
        const artistsCount = artistsSnapshot.size

        // Calculate recently added (last 7 days)
        const oneWeekAgo = new Date()
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)

        const recentlyAdded = artworksSnapshot.docs.filter((doc) => {
          const data = doc.data()
          return data.createdAt && new Date(data.createdAt.toDate()) > oneWeekAgo
        }).length

        setStats({
          totalArtworks: artworksCount,
          totalArtists: artistsCount,
          recentlyAdded,
        })
      } catch (error) {
        console.error("Error fetching stats:", error)
      }
    }

    fetchStats()
  }, [])

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Total Artworks</CardTitle>
            <ImageIcon className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalArtworks}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Total Artists</CardTitle>
            <Users className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalArtists}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Recently Added</CardTitle>
            <Clock className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.recentlyAdded}</div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

