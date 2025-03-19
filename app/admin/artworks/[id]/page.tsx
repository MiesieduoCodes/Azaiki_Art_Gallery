"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { doc, getDoc, setDoc, serverTimestamp, collection, getDocs } from "firebase/firestore"
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage"
import { db, storage } from "@/lib/firebase"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { ArrowLeft, Upload, Loader2, X } from "lucide-react"
import Image from "next/image"

interface Artist {
  id: string
  name: string
}

interface ArtworkFormData {
  title: string
  artistId: string
  category: string
  description: string
  year: string
  medium: string
  dimensions: string
  price: string
  imageUrl: string
}

export default function ArtworkFormPage({ params }: { params: { id: string } }) {
  const isEditing = params.id !== "new"
  const [formData, setFormData] = useState<ArtworkFormData>({
    title: "",
    artistId: "",
    category: "",
    description: "",
    year: "",
    medium: "",
    dimensions: "",
    price: "",
    imageUrl: "",
  })
  const [artists, setArtists] = useState<Artist[]>([])
  const [isLoading, setIsLoading] = useState(isEditing)
  const [isSaving, setIsSaving] = useState(false)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  const [discardDialogOpen, setDiscardDialogOpen] = useState(false)
  const router = useRouter()

  const categories = ["Contemporary", "African", "Digital", "Sculptures", "Niger Delta"]

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const snapshot = await getDocs(collection(db, "artists"))
        const artistsList = snapshot.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().name,
        }))
        setArtists(artistsList)
      } catch (error) {
        console.error("Error fetching artists:", error)
      }
    }

    fetchArtists()

    if (isEditing) {
      fetchArtwork()
    }
  }, [isEditing, params.id])

  const fetchArtwork = async () => {
    try {
      const docRef = doc(db, "artworks", params.id)
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        const data = docSnap.data()
        setFormData({
          title: data.title || "",
          artistId: data.artistId || "",
          category: data.category || "",
          description: data.description || "",
          year: data.year || "",
          medium: data.medium || "",
          dimensions: data.dimensions || "",
          price: data.price || "",
          imageUrl: data.imageUrl || "",
        })
      } else {
        console.error("Artwork not found")
        router.push("/admin/artworks")
      }
    } catch (error) {
      console.error("Error fetching artwork:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0])
    }
  }

  const uploadImage = async (): Promise<string> => {
    if (!imageFile) return formData.imageUrl

    setIsUploading(true)

    const storageRef = ref(storage, `artworks/${Date.now()}_${imageFile.name}`)
    const uploadTask = uploadBytesResumable(storageRef, imageFile)

    return new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          setUploadProgress(progress)
        },
        (error) => {
          console.error("Error uploading image:", error)
          setIsUploading(false)
          reject("")
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref)
          setIsUploading(false)

          // If updating and there's an existing image, delete the old one
          if (isEditing && formData.imageUrl && formData.imageUrl !== downloadURL) {
            try {
              const oldImageRef = ref(storage, formData.imageUrl)
              await deleteObject(oldImageRef)
            } catch (error) {
              console.error("Error deleting old image:", error)
            }
          }

          resolve(downloadURL)
        },
      )
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)

    try {
      // Upload image if selected
      const imageUrl = await uploadImage()

      const artworkData = {
        ...formData,
        imageUrl,
        updatedAt: serverTimestamp(),
      }

      if (!isEditing) {
        artworkData.createdAt = serverTimestamp()
      }

      const docRef = isEditing ? doc(db, "artworks", params.id) : doc(collection(db, "artworks"))

      await setDoc(docRef, artworkData, { merge: isEditing })

      router.push("/admin/artworks")
    } catch (error) {
      console.error("Error saving artwork:", error)
    } finally {
      setIsSaving(false)
    }
  }

  const handleCancel = () => {
    if (
      formData.title ||
      formData.description ||
      imageFile ||
      (isEditing &&
        JSON.stringify(formData) !==
          JSON.stringify({
            title: "",
            artistId: "",
            category: "",
            description: "",
            year: "",
            medium: "",
            dimensions: "",
            price: "",
            imageUrl: "",
          }))
    ) {
      setDiscardDialogOpen(true)
    } else {
      router.push("/admin/artworks")
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={handleCancel}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-3xl font-bold">{isEditing ? "Edit Artwork" : "Add New Artwork"}</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Artwork Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input id="title" name="title" value={formData.title} onChange={handleInputChange} required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="artistId">Artist *</Label>
                <Select
                  value={formData.artistId}
                  onValueChange={(value) => handleSelectChange("artistId", value)}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select an artist" />
                  </SelectTrigger>
                  <SelectContent>
                    {artists.map((artist) => (
                      <SelectItem key={artist.id} value={artist.id}>
                        {artist.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => handleSelectChange("category", value)}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="year">Year</Label>
                <Input id="year" name="year" value={formData.year} onChange={handleInputChange} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="medium">Medium</Label>
                <Input id="medium" name="medium" value={formData.medium} onChange={handleInputChange} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="dimensions">Dimensions</Label>
                <Input
                  id="dimensions"
                  name="dimensions"
                  value={formData.dimensions}
                  onChange={handleInputChange}
                  placeholder="e.g., 24 x 36 inches"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="price">Price</Label>
                <Input
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="e.g., $1,200"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={5}
              />
            </div>

            <div className="space-y-2">
              <Label>Artwork Image</Label>
              <div className="flex flex-col gap-4">
                {formData.imageUrl && (
                  <div className="relative w-48 h-48 border rounded-md overflow-hidden">
                    <Image
                      src={formData.imageUrl || "/placeholder.svg"}
                      alt={formData.title}
                      fill
                      className="object-cover"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="absolute top-2 right-2"
                      onClick={() => setFormData((prev) => ({ ...prev, imageUrl: "" }))}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                )}

                {!formData.imageUrl && (
                  <div className="flex items-center justify-center w-full">
                    <label
                      htmlFor="image"
                      className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="w-8 h-8 mb-4 text-gray-500" />
                        <p className="mb-2 text-sm text-gray-500">
                          <span className="font-semibold">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-xs text-gray-500">PNG, JPG or WEBP (MAX. 5MB)</p>
                      </div>
                      <Input id="image" type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                    </label>
                  </div>
                )}

                {imageFile && (
                  <div className="flex items-center gap-2">
                    <div className="text-sm">{imageFile.name}</div>
                    <Button type="button" variant="ghost" size="icon" onClick={() => setImageFile(null)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                )}

                {isUploading && (
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-primary h-2.5 rounded-full" style={{ width: `${uploadProgress}%` }}></div>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button type="button" variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSaving || isUploading}>
              {isSaving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Artwork"
              )}
            </Button>
          </CardFooter>
        </Card>
      </form>

      <AlertDialog open={discardDialogOpen} onOpenChange={setDiscardDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Discard changes?</AlertDialogTitle>
            <AlertDialogDescription>
              You have unsaved changes. Are you sure you want to discard them?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => router.push("/admin/artworks")}>Discard</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

