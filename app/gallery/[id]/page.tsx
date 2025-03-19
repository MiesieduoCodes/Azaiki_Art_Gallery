"use client"

import { useState, useEffect } from "react"
import { doc, getDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

interface Artwork {
  id: string
  title: string
  artist: string
  artistId: string
  category: string
  description: string
  year: string
  medium: string
  dimensions: string
  price: string
  imageUrl: string
}

export default function ArtworkDetailPage({ params }: { params: { id: string } }) {
  const [artwork, setArtwork] = useState<Artwork | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchArtwork = async () => {
      try {
        const artworkDoc = await getDoc(doc(db, "artworks", params.id))

        if (!artworkDoc.exists()) {
          setError("Artwork not found")
          return
        }

        const data = artworkDoc.data()

        // Get artist name
        let artistName = "Unknown Artist"
        if (data.artistId) {
          const artistDoc = await getDoc(doc(db, "artists", data.artistId))
          if (artistDoc.exists()) {
            artistName = artistDoc.data().name
          }
        }

        setArtwork({
          id: artworkDoc.id,
          title: data.title || "",
          artist: artistName,
          artistId: data.artistId || "",
          category: data.category || "",
          description: data.description || "",
          year: data.year || "",
          medium: data.medium || "",
          dimensions: data.dimensions || "",
          price: data.price || "",
          imageUrl: data.imageUrl || "",
        })
      } catch (error) {
        console.error("Error fetching artwork:", error)
        setError("Failed to load artwork")
      } finally {
        setIsLoading(false)
      }
    }

    fetchArtwork()
  }, [params.id])

  if (isLoading) {
    return (
      <div className="container mx-auto py-12">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-8" />
          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-1/2 h-96 bg-gray-200 rounded" />
            <div className="w-full md:w-1/2 space-y-4">
              <div className="h-6 bg-gray-200 rounded w-3/4" />
              <div className="h-4 bg-gray-100 rounded w-1/2" />
              <div className="h-4 bg-gray-100 rounded w-1/4" />
              <div className="h-32 bg-gray-100 rounded mt-8" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !artwork) {
    return (
      <div className="container mx-auto py-12">
        <Link href="/gallery">
          <Button variant="outline" size="sm" className="mb-8">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Gallery
          </Button>
        </Link>
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">{error || "Artwork not found"}</h1>
          <p className="text-gray-600">The artwork you're looking for could not be found.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-12">
      <Link href="/gallery">
        <Button variant="outline" size="sm" className="mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Gallery
        </Button>
      </Link>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/2">
          <div className="relative aspect-square w-full rounded-lg overflow-hidden">
            <Image
              src={artwork.imageUrl || "/placeholder.svg?height=800&width=800"}
              alt={artwork.title}
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>

        <div className="w-full md:w-1/2 space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{artwork.title}</h1>
            <Link href={`/artists/${artwork.artistId}`} className="text-xl text-primary hover:underline">
              {artwork.artist}
            </Link>
            <div className="flex flex-wrap gap-x-2 gap-y-1 mt-2 text-sm text-gray-600">
              {artwork.year && <span>{artwork.year}</span>}
              {artwork.medium && (
                <>
                  <span>•</span>
                  <span>{artwork.medium}</span>
                </>
              )}
              {artwork.dimensions && (
                <>
                  <span>•</span>
                  <span>{artwork.dimensions}</span>
                </>
              )}
              {artwork.category && (
                <>
                  <span>•</span>
                  <span>{artwork.category}</span>
                </>
              )}
            </div>
          </div>

          {artwork.description && (
            <div className="prose max-w-none">
              <p>{artwork.description}</p>
            </div>
          )}

          {artwork.price && (
            <div className="pt-4 border-t">
              <div className="text-lg font-medium">Price: {artwork.price}</div>
            </div>
          )}

          <div className="pt-6">
            <Button size="lg">Inquire About This Piece</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

