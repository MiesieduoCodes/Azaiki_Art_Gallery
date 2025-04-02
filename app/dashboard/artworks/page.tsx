"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Plus, Search, MoreHorizontal, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { getArtworks, deleteArtwork } from "@/lib/firebase/artworks"
import type { Artwork } from "@/types"

export default function ArtworksPage() {
  const [artworks, setArtworks] = useState<Artwork[]>([])
  const [filteredArtworks, setFilteredArtworks] = useState<Artwork[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState<string | null>(null)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    const fetchArtworks = async () => {
      try {
        const artworksData = await getArtworks()
        setArtworks(artworksData)
        setFilteredArtworks(artworksData)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching artworks:", error)
        toast({
          title: "Error",
          description: "Failed to load artworks. Please try again.",
          variant: "destructive",
        })
        setLoading(false)
      }
    }

    fetchArtworks()
  }, [toast])

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredArtworks(artworks)
    } else {
      const filtered = artworks.filter(
        (artwork) =>
          artwork.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          artwork.artist?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          artwork.category?.toLowerCase().includes(searchQuery.toLowerCase()),
      )
      setFilteredArtworks(filtered)
    }
  }, [searchQuery, artworks])

  const handleDelete = async (id: string) => {
    try {
      setDeleting(id)
      await deleteArtwork(id)
      setArtworks(artworks.filter((artwork) => artwork.id !== id))
      toast({
        title: "Success",
        description: "Artwork deleted successfully",
      })
    } catch (error) {
      console.error("Error deleting artwork:", error)
      toast({
        title: "Error",
        description: "Failed to delete artwork. Please try again.",
        variant: "destructive",
      })
    } finally {
      setDeleting(null)
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl p-3 font-bold">Artworks</h1>
        <Button asChild>
          <Link href="/dashboard/artworks/new">
            <Plus className="mr-2 h-4 w-4" />
            Add Artwork
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Manage Artworks</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex items-center gap-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search artworks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="max-w-sm"
            />
          </div>

          {loading ? (
            <div className="flex h-[300px] items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : filteredArtworks.length === 0 ? (
            <div className="flex h-[300px] flex-col items-center justify-center gap-2 text-center">
              <p className="text-muted-foreground">No artworks found</p>
              <Button asChild variant="outline" size="sm">
                <Link href="/dashboard/artworks/new">Add your first artwork</Link>
              </Button>
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[80px]">Image</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead className="hidden md:table-cell">Artist</TableHead>
                    <TableHead className="hidden md:table-cell">Category</TableHead>
                    <TableHead className="hidden lg:table-cell">Price</TableHead>
                    <TableHead className="hidden sm:table-cell">Status</TableHead>
                    <TableHead className="hidden sm:table-cell">Views</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredArtworks.map((artwork) => (
                    <TableRow key={artwork.id}>
                      <TableCell>
                        <div className="h-10 w-10 overflow-hidden rounded-md">
                          <img
                            src={artwork.image || "/placeholder.svg?height=40&width=40"}
                            alt={artwork.title || "Artwork"}
                            className="h-full w-full object-cover"
                          />
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">{artwork.title || "Untitled"}</TableCell>
                      <TableCell className="hidden md:table-cell">{artwork.artist || "Unknown"}</TableCell>
                      <TableCell className="hidden md:table-cell">
                        {artwork.category && <Badge variant="outline">{artwork.category}</Badge>}
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">
                        {artwork.price_naira ? `₦${artwork.price_naira.toLocaleString()}` : "-"}
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        {artwork.sold ? (
                          <Badge variant="destructive">Sold</Badge>
                        ) : (
                          <Badge variant="secondary">Available</Badge>
                        )}
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">{artwork.views || "0"}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Open menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => router.push(`/dashboard/artworks/${artwork.id}`)}>
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => router.push(`/dashboard/artworks/${artwork.id}/edit`)}>
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              className="text-destructive focus:text-destructive"
                              onClick={() => handleDelete(artwork.id)}
                              disabled={deleting === artwork.id}
                            >
                              {deleting === artwork.id ? (
                                <>
                                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                  Deleting...
                                </>
                              ) : (
                                "Delete"
                              )}
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}