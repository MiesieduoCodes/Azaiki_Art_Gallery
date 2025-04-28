"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Loader2, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { addArtwork } from "@/lib/firebase/artworks"

export default function NewArtworkPage() {
  const [formData, setFormData] = useState({
    title: "",
    artist: "",
    category: "",
    year: "",
    medium: "",
    dimensions: "",
    description: "",
    image: "",
  })
  const [saving, setSaving] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setSaving(true)
      const newArtworkId = await addArtwork(formData)
      toast({
        title: "Success",
        description: "Artwork added successfully",
      })
      router.push(`/dashboard/artworks/${newArtworkId}`)
    } catch (error) {
      console.error("Error adding artwork:", error)
      toast({
        title: "Error",
        description: "Failed to add artwork. Please try again.",
        variant: "destructive",
      })
      setSaving(false)
    }
  }

  return (
    <div className="flex flex-col gap-6 pt-24">
      <div className="flex items-center gap-2">
        <Button size="icon" asChild>
          <Link href="/dashboard/artworks">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-2xl font-bold">Add New Artwork</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Artwork Information</CardTitle>
            <CardDescription>Enter the details for the new artwork</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input id="title" name="title" value={formData.title} onChange={handleChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="artist">Artist</Label>
                <Input id="artist" name="artist" value={formData.artist} onChange={handleChange} />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Input id="category" name="category" value={formData.category} onChange={handleChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="year">Year</Label>
                <Input id="year" name="year" value={formData.year} onChange={handleChange} />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="medium">Medium</Label>
                <Input id="medium" name="medium" value={formData.medium} onChange={handleChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dimensions">Dimensions</Label>
                <Input id="dimensions" name="dimensions" value={formData.dimensions} onChange={handleChange} />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="image">Image URL</Label>
              <Input
                id="image"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={5}
              />
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline" asChild>
                <Link href="/dashboard/artworks">Cancel</Link>
              </Button>
              <Button type="submit" disabled={saving}>
                {saving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Artwork
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  )
}

