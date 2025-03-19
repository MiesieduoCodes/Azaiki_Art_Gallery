"use client"

import { useState, useEffect } from "react"
import { collection, getDocs, query, orderBy } from "firebase/firestore"
import { db } from "@/lib/firebase"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"

interface Artist {
  id: string
  name: string
  bio: string
  nationality: string
  imageUrl: string
}

export default function ArtistsPage() {
  const [artists, setArtists] = useState<Artist[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const artistsQuery = query(collection(db, "artists"), orderBy("name"))
        const snapshot = await getDocs(artistsQuery)

        const fetchedArtists = snapshot.docs.map((doc) => {
          const data = doc.data()
          return {
            id: doc.id,
            name: data.name || "",
            bio: data.bio || "",
            nationality: data.nationality || "",
            imageUrl: data.imageUrl || "",
          }
        })

        setArtists(fetchedArtists)
      } catch (error) {
        console.error("Error fetching artists:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchArtists()
  }, [])

  if (isLoading) {
    return (
      <div className="container mx-auto py-12">
        <h1 className="text-3xl font-bold mb-8">Artists</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
      <h1 className="text-3xl font-bold mb-8">Artists</h1>

      {artists.length === 0 ? (
        <p className="text-center py-12 text-gray-500">No artists found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {artists.map((artist) => (
            <Link href={`/artists/${artist.id}`} key={artist.id}>
              <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full">
                <div className="relative h-64 w-full">
                  {artist.imageUrl ? (
                    <Image
                      src={artist.imageUrl || "/placeholder.svg"}
                      alt={artist.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="h-full w-full bg-gray-200 flex items-center justify-center">
                      <span className="text-4xl font-bold text-gray-400">{artist.name.charAt(0)}</span>
                    </div>
                  )}
                </div>
                <CardContent className="p-4">
                  <h2 className="text-xl font-semibold">{artist.name}</h2>
                  {artist.nationality && <p className="text-gray-600">{artist.nationality}</p>}
                  {artist.bio && <p className="mt-2 text-gray-700 line-clamp-3">{artist.bio}</p>}
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

