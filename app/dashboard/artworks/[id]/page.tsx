"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, Edit, Trash2, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/components/ui/use-toast"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { getArtworkById, deleteArtwork } from "@/lib/firebase/artworks"
import type { Artwork } from "@/types"

export default function ArtworkDetailsPage({ params }: { params: { id: string } }) {
  const [artwork, setArtwork] = useState<Artwork | null>(null)
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    const fetchArtwork = async () => {
      try {
        const artworkData = await getArtworkById(params.id)
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
  }, [params.id, router, toast])

  const handleDelete = async () => {
    try {
      setDeleting(true)
      await deleteArtwork(params.id)
      toast({
        title: "Success",
        description: "Artwork deleted successfully",
      })
      router.push("/dashboard/artworks")
    } catch (error) {
      console.error("Error deleting artwork:", error)
      toast({
        title: "Error",
        description: "Failed to delete artwork. Please try again.",
        variant: "destructive",
      })
      setDeleting(false)
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
      <div className="flex h-[70vh] flex-col items-center justify-center gap-4">
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
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button size="icon" asChild>
            <Link href="/dashboard/artworks">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="text-2xl font-bold">Artwork Details</h1>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link href={`/dashboard/artworks/${params.id}/edit`}>
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </Link>
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete the artwork and all associated data.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDelete}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  disabled={deleting}
                >
                  {deleting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Deleting...
                    </>
                  ) : (
                    "Delete"
                  )}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Artwork Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center gap-4">
              <div className="relative aspect-square w-full max-w-md overflow-hidden rounded-lg border">
                <img
                  src={artwork.image || "/placeholder.svg?height=400&width=400"}
                  alt={artwork.title || "Artwork"}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex flex-wrap justify-center gap-2">
                {artwork.views && <Badge variant="outline">{artwork.views} views</Badge>}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Artwork Information</CardTitle>
            <CardDescription>Details about this artwork</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="text-xl font-semibold">{artwork.title || "Untitled"}</h3>
              <p className="text-muted-foreground">By {artwork.artist || "Unknown Artist"}</p>
            </div>

            <div className="flex flex-wrap gap-2">
              {artwork.category && <Badge>{artwork.category}</Badge>}
              {artwork.year && <Badge variant="outline">{artwork.year}</Badge>}
            </div>

            <Separator />

            <div className="grid gap-2">
              {artwork.medium && (
                <div className="grid grid-cols-3">
                  <span className="font-medium">Medium:</span>
                  <span className="col-span-2">{artwork.medium}</span>
                </div>
              )}
              {artwork.dimensions && (
                <div className="grid grid-cols-3">
                  <span className="font-medium">Dimensions:</span>
                  <span className="col-span-2">{artwork.dimensions}</span>
                </div>
              )}
            </div>

            {artwork.description && (
              <>
                <Separator />
                <div>
                  <h4 className="mb-2 font-medium">Description</h4>
                  <p className="text-sm text-muted-foreground">{artwork.description}</p>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

