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
import { Plus, Pencil, Trash2, Search, ImageIcon } from "lucide-react"
import Image from "next/image"

interface Artwork {
  id: string
  title: string
  artist: string
  category: string
  imageUrl: string
  createdAt: any
}

export default function ArtworksPage() {
  const [artworks, setArtworks] = useState<Artwork[]>([])
  const [filteredArtworks, setFilteredArtworks] = useState<Artwork[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [artworkToDelete, setArtworkToDelete] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    fetchArtworks()
  }, [])

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredArtworks(artworks)
    } else {
      const lowercasedQuery = searchQuery.toLowerCase()
      const filtered = artworks.filter(
        (artwork) =>
          artwork.title.toLowerCase().includes(lowercasedQuery) ||
          artwork.artist.toLowerCase().includes(lowercasedQuery) ||
          artwork.category.toLowerCase().includes(lowercasedQuery),
      )
      setFilteredArtworks(filtered)
    }
  }, [searchQuery, artworks])

  const fetchArtworks = async () => {
    try {
      const artworksQuery = query(collection(db, "artworks"), orderBy("createdAt", "desc"))
      const snapshot = await getDocs(artworksQuery)

      const fetchedArtworks: Artwork[] = snapshot.docs.map(
        (doc) =>
          ({
            id: doc.id,
            ...doc.data(),
          }) as Artwork,
      )

      setArtworks(fetchedArtworks)
      setFilteredArtworks(fetchedArtworks)
    } catch (error) {
      console.error("Error fetching artworks:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!artworkToDelete) return

    try {
      await deleteDoc(doc(db, "artworks", artworkToDelete))
      setArtworks(artworks.filter((artwork) => artwork.id !== artworkToDelete))
      setFilteredArtworks(filteredArtworks.filter((artwork) => artwork.id !== artworkToDelete))
    } catch (error) {
      console.error("Error deleting artwork:", error)
    } finally {
      setDeleteDialogOpen(false)
      setArtworkToDelete(null)
    }
  }

  const confirmDelete = (id: string) => {
    setArtworkToDelete(id)
    setDeleteDialogOpen(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Artworks</h1>
        <Button onClick={() => router.push("/admin/artworks/new")}>
          <Plus className="mr-2 h-4 w-4" /> Add Artwork
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search artworks..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {isLoading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : filteredArtworks.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          {searchQuery ? "No artworks found matching your search." : "No artworks found. Add some!"}
        </div>
      ) : (
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Image</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Artist</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredArtworks.map((artwork) => (
                <TableRow key={artwork.id}>
                  <TableCell>
                    <div className="relative h-16 w-16 rounded overflow-hidden">
                      {artwork.imageUrl ? (
                        <Image
                          src={artwork.imageUrl || "/placeholder.svg"}
                          alt={artwork.title}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="h-full w-full bg-gray-200 flex items-center justify-center">
                          <ImageIcon className="h-6 w-6 text-gray-400" />
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{artwork.title}</TableCell>
                  <TableCell>{artwork.artist}</TableCell>
                  <TableCell>{artwork.category}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => router.push(`/admin/artworks/${artwork.id}`)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon" onClick={() => confirmDelete(artwork.id)}>
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
              This action cannot be undone. This will permanently delete the artwork from the database.
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

