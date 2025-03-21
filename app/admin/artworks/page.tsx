"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import Image from "next/image"
import { useFirebase } from "@/contexts/firebase-context"
import { Pencil, Trash2, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const categories = ["african", "contemporary", "sculptures", "digital", "niger-delta"]

export default function ArtworksAdmin() {
  const { artworks, artists, addArtwork, deleteArtwork, loading } = useFirebase()
  const { toast } = useToast()

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [imageUrl, setImageUrl] = useState("")
  const [artistId, setArtistId] = useState("")
  const [year, setYear] = useState<string>("")
  const [medium, setMedium] = useState("")
  const [dimension, setDimension] = useState("")
  const [price, setPrice] = useState<string>("")
  const [category, setCategory] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const selectedArtist = artists.find((artist) => artist.id === artistId)

      await addArtwork({
        title,
        description,
        imageUrl,
        artistId,
        artistName: selectedArtist?.name,
        year: year ? Number.parseInt(year) : undefined,
        medium,
        dimension,
        price: price ? Number.parseFloat(price) : undefined,
        category,
      })

      setTitle("")
      setDescription("")
      setImageUrl("")
      setArtistId("")
      setYear("")
      setMedium("")
      setDimension("")
      setPrice("")
      setCategory("")

      toast({
        title: "Success",
        description: "Artwork has been created",
        variant: "default",
      })
    } catch (error) {
      console.error("Error adding artwork:", error)
      toast({
        title: "Error",
        description: "Failed to create artwork",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this artwork?")) {
      try {
        await deleteArtwork(id)
        toast({
          title: "Success",
          description: "Artwork has been deleted",
          variant: "default",
        })
      } catch (error) {
        console.error("Error deleting artwork:", error)
        toast({
          title: "Error",
          description: "Failed to delete artwork",
          variant: "destructive",
        })
      }
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading artworks...</span>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Artworks Management</h1>

      <Card className="mb-8">
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
                <Input
                  id="year"
                  type="number"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  min="1900"
                  max={new Date().getFullYear().toString()}
                />
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
                <label htmlFor="dimension" className="block text-sm font-medium mb-1">
                  Dimensions
                </label>
                <Input
                  id="dimension"
                  value={dimension}
                  onChange={(e) => setDimension(e.target.value)}
                  placeholder="100 x 80 cm"
                />
              </div>

              <div>
                <label htmlFor="price" className="block text-sm font-medium mb-1">
                  Price
                </label>
                <Input
                  id="price"
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  min="0"
                  step="0.01"
                />
              </div>

              <div>
                <label htmlFor="imageUrl" className="block text-sm font-medium mb-1">
                  Image URL
                </label>
                <Input
                  id="imageUrl"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://example.com/image.jpg"
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

            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Add Artwork"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      <h2 className="text-2xl font-bold mb-4">Artworks List</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {artworks.map((artwork) => (
          <Card key={artwork.id} className="overflow-hidden">
            <div className="relative aspect-video w-full overflow-hidden">
              {artwork.imageUrl ? (
                <Image src={artwork.imageUrl || "/placeholder.svg"} alt={artwork.title} fill className="object-cover" />
              ) : (
                <div className="w-full h-full bg-muted flex items-center justify-center">No Image</div>
              )}
            </div>
            <CardContent className="p-4">
              <h3 className="text-xl font-semibold mb-1">{artwork.title}</h3>
              <p className="text-sm text-muted-foreground mb-2">
                By {artwork.artistName || "Unknown Artist"}
                {artwork.year ? `, ${artwork.year}` : ""}
              </p>
              <p className="text-sm line-clamp-3 mb-4">{artwork.description}</p>
              {artwork.category && (
                <p className="text-xs text-muted-foreground mb-4">
                  Category: {artwork.category.charAt(0).toUpperCase() + artwork.category.slice(1).replace("-", " ")}
                </p>
              )}
              <div className="flex gap-2">
                <Button asChild variant="outline" size="sm">
                  <Link href={`/admin/artworks/${artwork.id}`}>
                    <Pencil className="h-4 w-4 mr-1" />
                    Edit
                  </Link>
                </Button>
                <Button variant="destructive" size="sm" onClick={() => artwork.id && handleDelete(artwork.id)}>
                  <Trash2 className="h-4 w-4 mr-1" />
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {artworks.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No artworks found. Add your first artwork using the form above.</p>
        </div>
      )}
    </div>
  )
}

