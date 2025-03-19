"use client"

import { useState, useEffect } from "react"
import { doc, getDoc, collection, query, where, getDocs } from "firebase/firestore"
import { db } from "@/lib/firebase"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface Artist {
  id: string
  name: string
  bio: string
  nationality: string
  birthYear: string
  website: string
  imageUrl: string
}

interface Artwork {
  id: string
  title: string
  category: string
  year: string
  imageUrl: string
}

export default function ArtistDetailPage({ params }: { params: { id: string } }) {
  const [artist, setArtist] = useState<Artist | null>(null)
  const [artworks, setArtworks] = useState<Artwork[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchArtistAndArtworks = async () => {
      try {
        // Fetch artist
        const artistDoc = await getDoc(doc(db, "artists", params.id))

        if (!artistDoc.exists()) {
          setError("Artist not found")
          return
        }

        const data = artistDoc.data()
        setArtist({
          id: artistDoc.id,
          name: data.name || "",
          bio: data.bio || "",
          nationality: data.nationality || "",
          birthYear: data.birthYear || "",
          website: data.website || "",
          imageUrl: data.imageUrl || "",
        })

        // Fetch artworks by this artist
        const artworksQuery = query(collection(db, "artworks"), where("artistId", "==", params.id))

        const artworksSnapshot = await getDocs(artworksQuery)
        const fetchedArtworks = artworksSnapshot.docs.map((doc) => {
          const data = doc.data()
          return {
            id: doc.id,
            title: data.title || "",
            category: data.category || "",
            year: data.year || "",
            imageUrl: data.imageUrl || "",
          }
        })

        setArtworks(fetchedArtworks)
      } catch (error) {
        console.error("Error fetching artist:", error)
        setError("Failed to load artist")
      } finally {
        setIsLoading(false)
      }
    }

    fetchArtistAndArtworks()
  }, [params.id])

  if (isLoading) {
    return (
      <div className="container mx-auto py-12">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-8" />
          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-1/3 h-80 bg-gray-200 rounded" />
            <div className="w-full md:w-2/3 space-y-4">
              <div className="h-6 bg-gray-200 rounded w-3/4" />
              <div className="h-4 bg-gray-100 rounded w-1/2" />
              <div className="h-32 bg-gray-100 rounded mt-8" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !artist) {
    return (
      <div className="container mx-auto py-12">
        <Link href="/artists">
          <Button variant="outline" size="sm" className="mb-8">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Artists
          </Button>
        </Link>
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">{error || "Artist not found"}</h1>
          <p className="text-gray-600">The artist you're looking for could not be found.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-12">
      <Link href="/artists">
        <Button variant="outline" size="sm" className="mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Artists
        </Button>
      </Link>

      <div className="flex flex-col md:flex-row gap-8 mb-12">
        <div className="w-full md:w-1/3">
          <div className="relative aspect-square w-full rounded-lg overflow-hidden">
            {artist.imageUrl ? (
              <Image
                src={artist.imageUrl || "/placeholder.svg"}
                alt={artist.name}
                fill
                className="object-cover"
                priority
              />
            ) : (
              <div className="h-full w-full bg-gray-200 flex items-center justify-center">
                <span className="text-6xl font-bold text-gray-400">{artist.name.charAt(0)}</span>
              </div>
            )}
          </div>
        </div>

        <div className="w-full md:w-2/3 space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{artist.name}</h1>
            <div className="flex flex-wrap gap-x-2 gap-y-1 mt-2 text-gray-600">
              {artist.nationality && <span>{artist.nationality}</span>}
              {artist.birthYear && (
                <>
                  <span>•</span>
                  <span>b. {artist.birthYear}</span>
                </>
              )}
            </div>
          </div>

          {artist.bio && (
            <div className="prose max-w-none">
              <p>{artist.bio}</p>
            </div>
          )}

          {artist.website && (
            <div>
              <a
                href={artist.website.startsWith("http") ? artist.website : `https://${artist.website}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Visit Artist's Website
              </a>
            </div>
          )}
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Artworks by {artist.name}</h2>

        {artworks.length === 0 ? (
          <p className="text-center py-8 text-gray-500">No artworks found for this artist.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {artworks.map((artwork) => (
              <Link href={`/gallery/${artwork.id}`} key={artwork.id}>
                <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative h-64 w-full">
                    <Image
                      src={artwork.imageUrl || "/placeholder.svg?height=400&width=600"}
                      alt={artwork.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="text-lg font-semibold">{artwork.title}</h3>
                    <div className="flex items-center gap-2 mt-1 text-sm text-gray-500">
                      {artwork.year && <span>{artwork.year}</span>}
                      {artwork.category && (
                        <>
                          <span>•</span>
                          <span>{artwork.category}</span>
                        </>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

