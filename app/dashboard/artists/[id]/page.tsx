"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, Edit, Trash2, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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
import { getArtistById, deleteArtist } from "@/lib/firebase/artists"
import type { Artist } from "@/types"

export default function ArtistDetailsPage({ params }: { params: { id: string } }) {
  const [artist, setArtist] = useState<Artist | null>(null)
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    const fetchArtist = async () => {
      try {
        const artistData = await getArtistById(params.id)
        if (!artistData) {
          toast({
            title: "Error",
            description: "Artist not found",
            variant: "destructive",
          })
          router.push("/dashboard/artists")
          return
        }
        setArtist(artistData)
      } catch (error) {
        console.error("Error fetching artist:", error)
        toast({
          title: "Error",
          description: "Failed to load artist details. Please try again.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchArtist()
  }, [params.id, router, toast])

  const handleDelete = async () => {
    try {
      setDeleting(true)
      await deleteArtist(params.id)
      toast({
        title: "Success",
        description: "Artist deleted successfully",
      })
      router.push("/dashboard/artists")
    } catch (error) {
      console.error("Error deleting artist:", error)
      toast({
        title: "Error",
        description: "Failed to delete artist. Please try again.",
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

  if (!artist) {
    return (
      <div className="flex h-[70vh] flex-col pt-24 items-center justify-center gap-4">
        <h1 className="text-2xl font-bold">Artist not found</h1>
        <Button asChild>
          <Link href="/dashboard/artists">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Artists
          </Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="flex flex-col pt-24 gap-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" asChild>
            <Link href="/dashboard/artists">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="text-2xl font-bold">Artist Details</h1>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link href={`/dashboard/artists/${params.id}/edit`}>
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
                  This action cannot be undone. This will permanently delete the artist and all associated data.
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
            <CardTitle>Profile</CardTitle>
            <CardDescription>Artist information and details</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
              <Avatar className="h-24 w-24">
                <AvatarImage src={artist.image} alt={artist.name} />
                <AvatarFallback className="text-2xl">
                  {artist.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-1 flex-col gap-1 text-center sm:text-left">
                <h3 className="text-xl font-semibold">{artist.name}</h3>
                <p className="text-muted-foreground">{artist.specialty}</p>
                <div className="flex flex-wrap justify-center gap-2 sm:justify-start">
                  <Badge variant="outline">{artist.country}</Badge>
                  {artist.featured && <Badge>Featured</Badge>}
                </div>
              </div>
            </div>

            <Separator className="my-6" />

            <div className="space-y-4">
              <div>
                <h4 className="mb-2 font-medium">Biography</h4>
                <p className="text-sm text-muted-foreground">{artist.bio}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Artworks</CardTitle>
            <CardDescription>Artworks by this artist</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex h-[200px] items-center justify-center rounded-md border border-dashed p-4">
              <div className="flex flex-col items-center gap-2 text-center">
                <p className="text-sm text-muted-foreground">Artworks by this artist will appear here</p>
                <Button asChild variant="outline" size="sm">
                  <Link href="/dashboard/artworks">View All Artworks</Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

