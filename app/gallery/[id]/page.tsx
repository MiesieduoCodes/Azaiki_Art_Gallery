"use client"

import { useParams, useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { useFirebase } from "@/contexts/firebase-context"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Loader2 } from "lucide-react"
import Link from "next/link"

export default function ArtworkPage() {
  const { id } = useParams()
  const router = useRouter()
  const { getArtworkById, getArtistById, loading } = useFirebase()
  const [artwork, setArtwork] = useState<any>(null)
  const [artist, setArtist] = useState<any>(null)

  useEffect(() => {
    if (!loading && id) {
      const foundArtwork = getArtworkById(id as string)
      if (foundArtwork) {
        setArtwork(foundArtwork)

        if (foundArtwork.artistId) {
          const foundArtist = getArtistById(foundArtwork.artistId)
          if (foundArtist) {
            setArtist(foundArtist)
          }
        }
      } else {
        router.push("/gallery")
      }
    }
  }, [id, loading, getArtworkById, getArtistById, router])

  if (loading || !artwork) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading artwork...</span>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-16 px-4">
      <Button variant="outline" asChild className="mb-8">
        <Link href="/gallery">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Gallery
        </Link>
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="relative aspect-square w-full overflow-hidden rounded-lg">
          {artwork.imageUrl ? (
            <Image
              src={artwork.imageUrl || "/placeholder.svg"}
              alt={artwork.title}
              fill
              className="object-contain"
              priority
            />
          ) : (
            <div className="w-full h-full bg-muted flex items-center justify-center">No Image</div>
          )}
        </div>

        <div>
          <h1 className="text-3xl font-bold mb-2">{artwork.title}</h1>
          <p className="text-xl mb-4">
            By{" "}
            {artist ? (
              <Link href={`/artists/${artist.id}`} className="hover:underline font-medium">
                {artist.name}
              </Link>
            ) : (
              artwork.artistName || "Unknown Artist"
            )}
          </p>

          {artwork.year && <p className="text-lg mb-6">Created in {artwork.year}</p>}

          <div className="mb-8">
            <p className="whitespace-pre-line">{artwork.description}</p>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-8">
            {artwork.medium && (
              <div>
                <h3 className="font-semibold text-sm text-muted-foreground">Medium</h3>
                <p>{artwork.medium}</p>
              </div>
            )}

            {artwork.dimension && (
              <div>
                <h3 className="font-semibold text-sm text-muted-foreground">Dimensions</h3>
                <p>{artwork.dimension}</p>
              </div>
            )}

            {artwork.category && (
              <div>
                <h3 className="font-semibold text-sm text-muted-foreground">Category</h3>
                <p>{artwork.category.charAt(0).toUpperCase() + artwork.category.slice(1).replace("-", " ")}</p>
              </div>
            )}

            {artwork.price && (
              <div>
                <h3 className="font-semibold text-sm text-muted-foreground">Price</h3>
                <p>${artwork.price.toLocaleString()}</p>
              </div>
            )}
          </div>

          {artist && (
            <div className="mt-8 p-6 bg-muted rounded-lg">
              <h2 className="text-xl font-bold mb-4">About the Artist</h2>
              <p className="line-clamp-4">{artist.bio}</p>
              <Link href={`/artists/${artist.id}`} className="text-primary hover:underline block mt-4">
                View Artist Profile
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

