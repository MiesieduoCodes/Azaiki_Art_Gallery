"use client"

import { useState, useEffect } from "react"
import { collection, getDocs, query, orderBy } from "firebase/firestore"
import { db } from "@/lib/firebase"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"

interface Artwork {
  id: string
  title: string
  artist: string
  artistId: string
  category: string
  imageUrl: string
  year: string
  medium: string
}

export default function GalleryPage() {
  const [artworks, setArtworks] = useState<Artwork[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchArtworks = async () => {
      try {
        // Get artworks
        const artworksQuery = query(collection(db, "artworks"), orderBy("createdAt", "desc"))
        const artworksSnapshot = await getDocs(artworksQuery)

        // Get artists for lookup
        const artistsSnapshot = await getDocs(collection(db, "artists"))
        const artistsMap = new Map()
        artistsSnapshot.docs.forEach((doc) => {
          artistsMap.set(doc.id, doc.data().name)
        })

        // Map artworks with artist names
        const fetchedArtworks = artworksSnapshot.docs.map((doc) => {
          const data = doc.data()
          return {
            id: doc.id,
            title: data.title || "",
            artistId: data.artistId || "",
            artist: artistsMap.get(data.artistId) || "Unknown Artist",
            category: data.category || "",
            imageUrl: data.imageUrl || "",
            year: data.year || "",
            medium: data.medium || "",
          }
        })

        setArtworks(fetchedArtworks)
      } catch (error) {
        console.error("Error fetching gallery data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchArtworks()
  }, [])

  if (isLoading) {
    return (
      <div className="container mx-auto py-12">
        <h1 className="text-3xl font-bold mb-8">Gallery</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="rounded-lg overflow-hidden">
              <div className="h-64 bg-gray-200 animate-pulse" />
              <div className="p-4 space-y-2">
                <div className="h-4 bg-gray-200 rounded animate-pulse" />
                <div className="h-3 bg-gray-100 rounded animate-pulse w-2/3" />
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl font-bold mb-8">Gallery</h1>

      {artworks.length === 0 ? (
        <p className="text-center py-12 text-gray-500">No artworks found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                  <h2 className="text-xl font-semibold">{artwork.title}</h2>
                  <p className="text-gray-600">{artwork.artist}</p>
                  <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
                    <span>{artwork.year}</span>
                    {artwork.medium && (
                      <>
                        <span>•</span>
                        <span>{artwork.medium}</span>
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
  )
}

