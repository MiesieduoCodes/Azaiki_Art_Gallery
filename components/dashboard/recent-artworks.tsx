"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Loader2, ExternalLink } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { getRecentArtworks } from "@/lib/firebase/artworks"
import type { Artwork } from "@/types"

export function RecentArtworks() {
  const [artworks, setArtworks] = useState<Artwork[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    const fetchRecentArtworks = async () => {
      try {
        const recentArtworks = await getRecentArtworks(5)
        setArtworks(recentArtworks)
      } catch (error) {
        console.error("Error fetching recent artworks:", error)
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    fetchRecentArtworks()
  }, [])

  if (loading) {
    return (
      <div className="flex h-[300px] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex h-[300px] flex-col items-center justify-center gap-2 text-center">
        <p className="text-muted-foreground">Unable to load recent artworks</p>
        <Button asChild variant="outline" size="sm">
          <Link href="/dashboard/artworks/new">Add your first artwork</Link>
        </Button>
      </div>
    )
  }

  if (artworks.length === 0) {
    return (
      <div className="flex h-[300px] flex-col items-center justify-center gap-2 text-center">
        <p className="text-muted-foreground">No recent artworks found</p>
        <Button asChild variant="outline" size="sm">
          <Link href="/dashboard/artworks/new">Add your first artwork</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {artworks.map((artwork) => (
        <div key={artwork.id} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage
              src={artwork.image || "/placeholder.svg?height=36&width=36"}
              alt={artwork.title || "Artwork"}
            />
            <AvatarFallback>{artwork.title ? artwork.title.charAt(0) : "A"}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{artwork.title || "Untitled"}</p>
            <p className="text-sm text-muted-foreground">{artwork.artist || "Unknown Artist"}</p>
          </div>
          <div className="ml-auto font-medium">
            <Button variant="ghost" size="icon" asChild>
              <Link href={`/dashboard/artworks/${artwork.id}`}>
                <ExternalLink className="h-4 w-4" />
                <span className="sr-only">View artwork</span>
              </Link>
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}

