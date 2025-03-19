"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { collection, getDocs, deleteDoc, doc, query, orderBy } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
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
import { Input } from "@/components/ui/input"
import { Plus, Pencil, Trash2, Search } from "lucide-react"
import Image from "next/image"

interface Artist {
  id: string
  name: string
  bio: string
  imageUrl: string
  artworksCount?: number
}

export default function ArtistsPage() {
  const [artists, setArtists] = useState<Artist[]>([])
  const [filteredArtists, setFilteredArtists] = useState<Artist[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [artistToDelete, setArtistToDelete] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    fetchArtists()
  }, [])

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredArtists(artists)
    } else {
      const lowercasedQuery = searchQuery.toLowerCase()
      const filtered = artists.filter(
        (artist) =>
          artist.name.toLowerCase().includes(lowercasedQuery) || artist.bio.toLowerCase().includes(lowercasedQuery),
      )
      setFilteredArtists(filtered)
    }
  }, [searchQuery, artists])

  const fetchArtists = async () => {
    try {
      const artistsQuery = query(collection(db, "artists"), orderBy("name"))
      const snapshot = await getDocs(artistsQuery)

      const fetchedArtists: Artist[] = snapshot.docs.map(
        (doc) =>
          ({
            id: doc.id,
            ...doc.data(),
          }) as Artist,
      )

      // Get artwork counts for each artist
      const artworksSnapshot = await getDocs(collection(db, "artworks"))
      const artworks = artworksSnapshot.docs.map((doc) => doc.data())

      const artistsWithCounts = fetchedArtists.map((artist) => {
        const count = artworks.filter((artwork) => artwork.artistId === artist.id).length
        return { ...artist, artworksCount: count }
      })

      setArtists(artistsWithCounts)
      setFilteredArtists(artistsWithCounts)
    } catch (error) {
      console.error("Error fetching artists:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!artistToDelete) return

    try {
      await deleteDoc(doc(db, "artists", artistToDelete))
      setArtists(artists.filter((artist) => artist.id !== artistToDelete))
      setFilteredArtists(filteredArtists.filter((artist) => artist.id !== artistToDelete))
    } catch (error) {
      console.error("Error deleting artist:", error)
    } finally {
      setDeleteDialogOpen(false)
      setArtistToDelete(null)
    }
  }

  const confirmDelete = (id: string) => {
    const artist = artists.find((a) => a.id === id)
    if (artist && artist.artworksCount && artist.artworksCount > 0) {
      alert(`Cannot delete artist with ${artist.artworksCount} artworks. Please reassign or delete the artworks first.`)
      return
    }

    setArtistToDelete(id)
    setDeleteDialogOpen(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Artists</h1>
        <Button onClick={() => router.push("/admin/artists/new")}>
          <Plus className="mr-2 h-4 w-4" /> Add Artist
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search artists..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {isLoading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : filteredArtists.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          {searchQuery ? "No artists found matching your search." : "No artists found. Add some!"}
        </div>
      ) : (
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Bio</TableHead>
                <TableHead>Artworks</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredArtists.map((artist) => (
                <TableRow key={artist.id}>
                  <TableCell>
                    <div className="relative h-16 w-16 rounded-full overflow-hidden">
                      {artist.imageUrl ? (
                        <Image
                          src={artist.imageUrl || "/placeholder.svg"}
                          alt={artist.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="h-full w-full bg-gray-200 flex items-center justify-center">
                          <span className="text-gray-400 text-xl font-bold">{artist.name.charAt(0)}</span>
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{artist.name}</TableCell>
                  <TableCell className="max-w-xs truncate">{artist.bio}</TableCell>
                  <TableCell>{artist.artworksCount || 0}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="icon" onClick={() => router.push(`/admin/artists/${artist.id}`)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon" onClick={() => confirmDelete(artist.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the artist from the database.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

