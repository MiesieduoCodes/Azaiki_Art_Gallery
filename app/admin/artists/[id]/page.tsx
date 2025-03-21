"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2 } from "lucide-react"
import { useFirebase } from "@/contexts/firebase-context"
import { useToast } from "@/hooks/use-toast"

const categories = ["african", "contemporary", "sculptures", "digital", "niger-delta"]

export default function EditArtwork() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const { getArtworkById, updateArtwork, artists, loading } = useFirebase()

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [image, setImage] = useState("")
  const [artistId, setArtistId] = useState("")
  const [year, setYear] = useState("")
  const [medium, setMedium] = useState("")
  const [dimensions, setDimensions] = useState("")
  const [category, setCategory] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    if (!loading && params.id) {
      const artwork = getArtworkById(params.id as string)
      if (artwork) {
        setTitle(artwork.title || "")
        setDescription(artwork.description || "")
        setImage(artwork.image || "")
        // Find artist ID by name
        const artist = artists.find((a) => a.name === artwork.artist)
        setArtistId(artist?.id || "")
        setYear(artwork.year || "")
        setMedium(artwork.medium || "")
        setDimensions(artwork.dimensions || "")
        setCategory(artwork.category || "")
        setIsLoaded(true)
      } else {
        toast({
          title: "Error",
          description: "Artwork not found",
          variant: "destructive",
        })
        router.push("/admin/artworks")
      }
    }
  }, [loading, params.id, getArtworkById, artists, router, toast])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const selectedArtist = artists.find((artist) => artist.id === artistId)

      await updateArtwork(params.id as string, {
        title,
        description,
        image,
        artist: selectedArtist?.name,
        artistImage: selectedArtist?.image,
        artistBio: selectedArtist?.bio,
        year,
        medium,
        dimensions,
        category,
      })

      toast({
        title: "Success",
        description: "Artwork has been updated",
        variant: "default",
      })
      router.push("/admin/artworks")
    } catch (error) {
      console.error("Error updating artwork:", error)
      toast({
        title: "Error",
        description: "Failed to update artwork",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (loading || !isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading artwork...</span>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Edit Artwork</h1>

      <Card>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium mb-1">
                  Title
                </label>
                <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
              </div>

              <div>
                <label htmlFor="artist" className="block text-sm font-medium mb-1">
                  Artist
                </label>
                <Select value={artistId} onValueChange={setArtistId} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select artist" />
                  </SelectTrigger>
                  <SelectContent>
                    {artists.map((artist) => (
                      <SelectItem key={artist.id} value={artist.id || ""}>
                        {artist.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label htmlFor="category" className="block text-sm font-medium mb-1">
                  Category
                </label>
                <Select value={category} onValueChange={setCategory} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat.charAt(0).toUpperCase() + cat.slice(1).replace("-", " ")}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label htmlFor="year" className="block text-sm font-medium mb-1">
                  Year
                </label>
                <Input id="year" value={year} onChange={(e) => setYear(e.target.value)} />
              </div>

              <div>
                <label htmlFor="medium" className="block text-sm font-medium mb-1">
                  Medium
                </label>
                <Input
                  id="medium"
                  value={medium}
                  onChange={(e) => setMedium(e.target.value)}
                  placeholder="Oil on canvas, Digital print, etc."
                />
              </div>

              <div>
                <label htmlFor="dimensions" className="block text-sm font-medium mb-1">
                  Dimensions
                </label>
                <Input
                  id="dimensions"
                  value={dimensions}
                  onChange={(e) => setDimensions(e.target.value)}
                  placeholder="100 x 80 cm"
                />
              </div>

              <div>
                <label htmlFor="image" className="block text-sm font-medium mb-1">
                  Image URL
                </label>
                <Input
                  id="image"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  placeholder="/images/artwork.jpg"
                />
              </div>
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium mb-1">
                Description
              </label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                required
              />
            </div>

            <div className="flex gap-2">
              <Button type="button" variant="outline" onClick={() => router.push("/admin/artworks")}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Update Artwork"
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

