"use client"

import { useEffect, useState } from "react"
import { Users, Image, Eye, TrendingUp } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getStats } from "@/lib/firebase/stats"

type Stats = {
  totalArtists: number
  totalArtworks: number
  totalViews: number
  viewsGrowth: number
}

export function DashboardStats() {
  const [stats, setStats] = useState<Stats>({
    totalArtists: 0,
    totalArtworks: 0,
    totalViews: 0,
    viewsGrowth: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const statsData = await getStats()
        setStats(statsData)
      } catch (error) {
        console.error("Error fetching stats:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  const statCards = [
    {
      title: "Total Artists",
      value: stats.totalArtists,
      icon: Users,
      description: "Active artists in the gallery",
    },
    {
      title: "Total Artworks",
      value: stats.totalArtworks,
      icon: Image,
      description: "Artworks in the collection",
    },
    {
      title: "Total Views",
      value: stats.totalViews,
      icon: Eye,
      description: "Gallery page views",
    },
    {
      title: "Growth",
      value: `${stats.viewsGrowth}%`,
      icon: TrendingUp,
      description: "Increase in views this month",
      positive: stats.viewsGrowth > 0,
    },
  ]

  return (
    <>
      {statCards.map((stat, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {loading ? <div className="h-8 w-16 animate-pulse rounded-md bg-muted"></div> : stat.value}
            </div>
            <p className="text-xs text-muted-foreground">{stat.description}</p>
            {stat.positive !== undefined && (
              <p className={`mt-1 text-xs ${stat.positive ? "text-green-500" : "text-red-500"}`}>
                {stat.positive ? "↑" : "↓"} {Math.abs(stats.viewsGrowth)}% from last month
              </p>
            )}
          </CardContent>
        </Card>
      ))}
    </>
  )
}

