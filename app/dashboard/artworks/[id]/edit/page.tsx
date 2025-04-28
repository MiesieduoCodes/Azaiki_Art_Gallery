"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Loader2, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { getArtworkById, updateArtwork } from "@/lib/firebase/artworks"
import type { Artwork } from "@/types"
import { Switch } from "@/components/ui/switch"
import { useParams } from "next/navigation"

export default function EditArtworkPage() {
  const params = useParams() // Use useParams hook instead of getting params from props
  const [artwork, setArtwork] = useState<Artwork | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    artist: "",
    category: "",
    year: "",
    medium: "",
    dimensions: "",
    description: "",
    image: "",
    price_naira: 0,
    sold: false,
  })
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    const fetchArtwork = async () => {
      try {
        // Access params.id directly since we're using useParams()
        const artworkData = await getArtworkById(params.id as string)
        if (!artworkData) {
          toast({
            title: "Error",
            description: "Artwork not found",
            variant: "destructive",
          })
          router.push("/dashboard/artworks")
          return
        }
        setArtwork(artworkData)
        setFormData({
          title: artworkData.title || "",
          artist: artworkData.artist || "",
          category: artworkData.category || "",
          year: artworkData.year || "",
          medium: artworkData.medium || "",
          dimensions: artworkData.dimensions || "",
          description: artworkData.description || "",
          image: artworkData.image || "",
          price_naira: artworkData.price_naira || 0,
          sold: artworkData.sold || false,
        })
      } catch (error) {
        console.error("Error fetching artwork:", error)
        toast({
          title: "Error",
          description: "Failed to load artwork details. Please try again.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchArtwork()
  }, [params.id, router, toast]) // params.id is now properly accessed

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: Number(value) }))
  }

  const handleSwitchChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, sold: checked }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setSaving(true)
      await updateArtwork(params.id as string, formData)
      toast({
        title: "Success",
        description: "Artwork updated successfully",
      })
      router.push(`/dashboard/artworks/${params.id}`)
    } catch (error) {
      console.error("Error updating artwork:", error)
      toast({
        title: "Error",
        description: "Failed to update artwork. Please try again.",
        variant: "destructive",
      })
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!artwork) {
    return (
      <div className="flex h-[70vh] flex-col pt-24 items-center justify-center gap-4">
        <h1 className="text-2xl font-bold">Artwork not found</h1>
        <Button asChild>
          <Link href="/dashboard/artworks">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Artworks
          </Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="flex flex-col pt-24 gap-6">
      <div className="flex items-center gap-2">
        <Button size="icon" asChild>
          <Link href={`/dashboard/artworks/${params.id}`}>
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-2xl font-bold">Edit Artwork</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Artwork Information</CardTitle>
            <CardDescription>Update the artwork's details</CardDescription>
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

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="price_naira">Price (Naira)</Label>
                <Input
                  id="price_naira"
                  name="price_naira"
                  type="number"
                  value={formData.price_naira}
                  onChange={handleNumberChange}
                  min="0"
                />
              </div>
              <div className="flex items-center justify-between space-y-2">
  <Label htmlFor="sold" className="text-lg font-medium text-gray-700">
    Sold
  </Label>
  <Switch
    id="sold"
    checked={formData.sold}
    onCheckedChange={handleSwitchChange}
    className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors duration-200 ease-in-out 
      ${formData.sold ? 'bg-green-600' : 'bg-red-400'}`}
  >
    <span
      className={`inline-block w-5 h-5 transform transition-transform duration-200 ease-in-out 
        ${formData.sold ? 'translate-x-6 bg-white' : 'translate-x-1 bg-gray-200'} rounded-full`}
    />
  </Switch>
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
                <Link href={`/dashboard/artworks/${params.id}`}>Cancel</Link>
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
                    Save Changes
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