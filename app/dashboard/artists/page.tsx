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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { getArtists, deleteArtist } from "@/lib/firebase/artists"
import type { Artist } from "@/types"

export default function ArtistsPage() {
  const [artists, setArtists] = useState<Artist[]>([])
  const [filteredArtists, setFilteredArtists] = useState<Artist[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState<string | null>(null)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const artistsData = await getArtists()
        setArtists(artistsData)
        setFilteredArtists(artistsData)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching artists:", error)
        toast({
          title: "Error",
          description: "Failed to load artists. Please try again.",
          variant: "destructive",
        })
        setLoading(false)
      }
    }

    fetchArtists()
  }, [toast])

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredArtists(artists)
    } else {
      const filtered = artists.filter(
        (artist) =>
          artist.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          artist.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
          artist.country.toLowerCase().includes(searchQuery.toLowerCase()),
      )
      setFilteredArtists(filtered)
    }
  }, [searchQuery, artists])

  const handleDelete = async (id: string) => {
    try {
      setDeleting(id)
      await deleteArtist(id)
      setArtists(artists.filter((artist) => artist.id !== id))
      toast({
        title: "Success",
        description: "Artist deleted successfully",
      })
    } catch (error) {
      console.error("Error deleting artist:", error)
      toast({
        title: "Error",
        description: "Failed to delete artist. Please try again.",
        variant: "destructive",
      })
    } finally {
      setDeleting(null)
    }
  }

  return (
    <div className="flex flex-col pt-24 gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl p-2 font-bold">Artists</h1>
        <Button asChild>
          <Link href="/dashboard/artists/new">
            <Plus className="mr-2 h-4 w-4" />
            Add Artist
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Manage Artists</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex items-center gap-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search artists..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="max-w-sm"
            />
          </div>

          {loading ? (
            <div className="flex h-[300px] items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : filteredArtists.length === 0 ? (
            <div className="flex h-[300px] flex-col items-center justify-center gap-2 text-center">
              <p className="text-muted-foreground">No artists found</p>
              <Button asChild variant="outline" size="sm">
                <Link href="/dashboard/artists/new">Add your first artist</Link>
              </Button>
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[80px]">Image</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead className="hidden md:table-cell">Specialty</TableHead>
                    <TableHead className="hidden md:table-cell">Country</TableHead>
                    <TableHead className="hidden sm:table-cell">Featured</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredArtists.map((artist) => (
                    <TableRow key={artist.id}>
                      <TableCell>
                        <Avatar>
                          <AvatarImage src={artist.image} alt={artist.name} />
                          <AvatarFallback>
                            {artist.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                      </TableCell>
                      <TableCell className="font-medium">{artist.name}</TableCell>
                      <TableCell className="hidden md:table-cell">{artist.specialty}</TableCell>
                      <TableCell className="hidden md:table-cell">{artist.country}</TableCell>
                      <TableCell className="hidden sm:table-cell">
                        {artist.featured ? (
                          <Badge variant="default">Featured</Badge>
                        ) : (
                          <Badge variant="outline">No</Badge>
                        )}
                      </TableCell>
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
                            <DropdownMenuItem onClick={() => router.push(`/dashboard/artists/${artist.id}`)}>
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => router.push(`/dashboard/artists/${artist.id}/edit`)}>
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              className="text-destructive focus:text-destructive"
                              onClick={() => handleDelete(artist.id)}
                              disabled={deleting === artist.id}
                            >
                              {deleting === artist.id ? (
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

