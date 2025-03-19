"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { getArtist, createArtist, updateArtist, uploadFile } from "@/lib/firebase-service"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface Artist {
  name: string
  biography: string
  country: string
  birth_year: string
  image_url: string
}

export default function ArtistFormPage({ params }: { params: { id: string } }) {
  const isNew = params.id === "new"
  const router = useRouter()
  const [artist, setArtist] = useState<Artist>({
    name: "",
    biography: "",
    country: "",
    birth_year: "",
    image_url: "",
  })
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(!isNew)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!isNew) {
      const fetchArtist = async () => {
        try {
          const data = await getArtist(params.id)
          setArtist({
            name: data.name || "",
            biography: data.biography || "",
            country: data.country || "",
            birth_year: data.birth_year || "",
            image_url: data.image_url || "",
          })
        } catch (err) {
          console.error("Error fetching artist:", err)
          setError("Failed to load artist details. Please try again.")
        } finally {
          setLoading(false)
        }
      }

      fetchArtist()
    }
  }, [isNew, params.id])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setArtist((prev) => ({ ...prev, [name]: value }))
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0])
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError(null)

    try {
      let imageUrl = artist.image_url

      // Upload image if a new file is selected
      if (imageFile) {
        const path = `artists/${isNew ? "new" : params.id}/${imageFile.name}`
        imageUrl = await uploadFile(imageFile, path)
      }

      const artistData = {
        ...artist,
        image_url: imageUrl,
      }

      if (isNew) {
        await createArtist(artistData)
      } else {
        await updateArtist(params.id, artistData)
      }

      router.push("/admin/artists")
    } catch (err) {
      console.error("Error saving artist:", err)
      setError("Failed to save artist. Please try again.")
      setSaving(false)
    }
  }

  if (loading) {
    return <div>Loading artist details...</div>
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>{isNew ? "Create New Artist" : "Edit Artist"}</CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">
                Name
              </label>
              <Input id="name" name="name" value={artist.name} onChange={handleChange} required />
            </div>

            <div className="space-y-2">
              <label htmlFor="biography" className="text-sm font-medium">
                Biography
              </label>
              <Textarea id="biography" name="biography" value={artist.biography} onChange={handleChange} rows={5} />
            </div>

            <div className="space-y-2">
              <label htmlFor="country" className="text-sm font-medium">
                Country
              </label>
              <Input id="country" name="country" value={artist.country} onChange={handleChange} />
            </div>

            <div className="space-y-2">
              <label htmlFor="birth_year" className="text-sm font-medium">
                Birth Year
              </label>
              <Input
                id="birth_year"
                name="birth_year"
                value={artist.birth_year}
                onChange={handleChange}
                type="number"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="image" className="text-sm font-medium">
                Artist Image
              </label>
              {artist.image_url && (
                <div className="mb-2">
                  <img
                    src={artist.image_url || "/placeholder.svg"}
                    alt={artist.name}
                    className="h-40 w-auto object-cover rounded-md"
                  />
                </div>
              )}
              <Input id="image" name="image" type="file" accept="image/*" onChange={handleImageChange} />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button type="button" variant="outline" onClick={() => router.push("/admin/artists")} disabled={saving}>
              Cancel
            </Button>
            <Button type="submit" disabled={saving}>
              {saving ? "Saving..." : "Save Artist"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}