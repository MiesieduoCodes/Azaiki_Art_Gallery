"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import Link from "next/link"
import Image from "next/image"
import { useFirebase } from "@/contexts/firebase-context"
import { Pencil, Trash2, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function ArtistsAdmin() {
  const { artists, addArtist, deleteArtist, loading } = useFirebase()
  const { toast } = useToast()
  const [name, setName] = useState("")
  const [specialty, setSpecialty] = useState("")
  const [bio, setBio] = useState("")
  const [image, setImage] = useState("")
  const [country, setCountry] = useState("")
  const [featured, setFeatured] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await addArtist({
        name,
        specialty,
        bio,
        image,
        country,
        featured,
      })

      setName("")
      setSpecialty("")
      setBio("")
      setImage("")
      setCountry("")
      setFeatured(false)

      toast({
        title: "Success",
        description: "Artist has been created",
        variant: "default",
      })
    } catch (error) {
      console.error("Error adding artist:", error)
      toast({
        title: "Error",
        description: "Failed to create artist",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this artist? All associated artworks will also be deleted.")) {
      try {
        await deleteArtist(id)
        toast({
          title: "Success",
          description: "Artist has been deleted",
          variant: "default",
        })
      } catch (error) {
        console.error("Error deleting artist:", error)
        toast({
          title: "Error",
          description: "Failed to delete artist",
          variant: "destructive",
        })
      }
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading artists...</span>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Artists Management</h1>

      <Card className="mb-8">
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1">
                Name
              </label>
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>

            <div>
              <label htmlFor="specialty" className="block text-sm font-medium mb-1">
                Specialty
              </label>
              <Input
                id="specialty"
                value={specialty}
                onChange={(e) => setSpecialty(e.target.value)}
                placeholder="Contemporary, Abstract, etc."
              />
            </div>

            <div>
              <label htmlFor="country" className="block text-sm font-medium mb-1">
                Country
              </label>
              <Input id="country" value={country} onChange={(e) => setCountry(e.target.value)} />
            </div>

            <div>
              <label htmlFor="image" className="block text-sm font-medium mb-1">
                Image URL
              </label>
              <Input
                id="image"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="/images/artist.jpg"
              />
            </div>

            <div>
              <label htmlFor="bio" className="block text-sm font-medium mb-1">
                Biography
              </label>
              <Textarea id="bio" value={bio} onChange={(e) => setBio(e.target.value)} rows={4} required />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="featured"
                checked={featured}
                onCheckedChange={(checked) => setFeatured(checked as boolean)}
              />
              <label
                htmlFor="featured"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Featured Artist
              </label>
            </div>

            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Add Artist"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      <h2 className="text-2xl font-bold mb-4">Artists List</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {artists.map((artist) => (
          <Card key={artist.id} className="overflow-hidden">
            <div className="relative aspect-video w-full overflow-hidden">
              {artist.image ? (
                <Image
                  src={artist.image || "/placeholder.svg?height=400&width=400"}
                  alt={artist.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full bg-muted flex items-center justify-center">No Image</div>
              )}
            </div>
            <CardContent className="p-4">
              <h3 className="text-xl font-semibold mb-2">{artist.name}</h3>
              {artist.specialty && <p className="text-sm text-muted-foreground mb-1">{artist.specialty}</p>}
              {artist.country && <p className="text-sm text-muted-foreground mb-2">{artist.country}</p>}
              <p className="text-sm line-clamp-3 mb-4">{artist.bio}</p>
              {artist.featured && <p className="text-xs text-primary mb-4">Featured Artist</p>}
              <div className="flex gap-2">
                <Button asChild variant="outline" size="sm">
                  <Link href={`/admin/artists/${artist.id}`}>
                    <Pencil className="h-4 w-4 mr-1" />
                    Edit
                  </Link>
                </Button>
                <Button variant="destructive" size="sm" onClick={() => artist.id && handleDelete(artist.id)}>
                  <Trash2 className="h-4 w-4 mr-1" />
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {artists.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No artists found. Add your first artist using the form above.</p>
        </div>
      )}
    </div>
  )
}

