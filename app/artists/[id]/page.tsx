"use client"

import { useParams, useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { useFirebase } from "@/contexts/firebase-context"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Loader2 } from "lucide-react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"

export default function ArtistPage() {
  const { id } = useParams()
  const router = useRouter()
  const { getArtistById, getArtworksByArtistId, loading } = useFirebase()
  const [artist, setArtist] = useState<any>(null)
  const [artworks, setArtworks] = useState<any[]>([])

  useEffect(() => {
    if (!loading && id) {
      const foundArtist = getArtistById(id as string)
      if (foundArtist) {
        setArtist(foundArtist)
        const artistArtworks = getArtworksByArtistId(id as string)
        setArtworks(artistArtworks)
      } else {
        router.push("/artists")
      }
    }
  }, [id, loading, getArtistById, getArtworksByArtistId, router])

  if (loading || !artist) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading artist profile...</span>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-16 px-4">
      <Button variant="outline" asChild className="mb-8">
        <Link href="/artists">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Artists
        </Link>
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
        <div className="lg:col-span-1">
          <div className="relative aspect-square w-full overflow-hidden rounded-lg mb-4">
            {artist.imageUrl ? (
              <Image
                src={artist.imageUrl || "/placeholder.svg"}
                alt={artist.name}
                fill
                className="object-cover"
                priority
              />
            ) : (
              <div className="w-full h-full bg-muted flex items-center justify-center">No Image</div>
            )}
          </div>
        </div>

        <div className="lg:col-span-2">
          <h1 className="text-3xl font-bold mb-2">{artist.name}</h1>

          {artist.country && <p className="text-xl mb-6">{artist.country}</p>}

          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Biography</h2>
            <p className="whitespace-pre-line">{artist.bio}</p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-6">Artworks by {artist.name}</h2>

        {artworks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {artworks.map((artwork) => (
              <Link key={artwork.id} href={`/gallery/${artwork.id}`}>
                <Card className="h-full overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                  <div className="relative w-full h-64">
                    {artwork.imageUrl ? (
                      <Image
                        src={artwork.imageUrl || "/placeholder.svg"}
                        alt={artwork.title}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-muted flex items-center justify-center">No Image</div>
                    )}
                  </div>
                  <CardContent className="p-4">
                    <h3 className="text-xl font-semibold">{artwork.title}</h3>
                    {artwork.year && <p className="text-sm text-muted-foreground">{artwork.year}</p>}
                    <p className="text-sm line-clamp-2 mt-2">{artwork.description}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No artworks found for this artist.</p>
          </div>
        )}
      </div>
    </div>
  )
}

