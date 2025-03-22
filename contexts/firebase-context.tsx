"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { onValue, ref, set, push, remove } from "firebase/database"
import { database } from "@/lib/firebase/config"; // Ensure this import is correct

type Artist = {
  id?: string
  name: string
  bio: string
  imageUrl?: string
  country?: string
}

type Artwork = {
  id?: string
  title: string
  description: string
  imageUrl?: string
  artistId?: string
  artistName?: string
  year?: number
  medium?: string
  dimension?: string
  price?: number
  category?: string
}

interface FirebaseContextType {
  artists: Artist[]
  artworks: Artwork[]
  loading: boolean
  addArtist: (artist: Artist) => Promise<string>
  updateArtist: (id: string, artist: Artist) => Promise<void>
  deleteArtist: (id: string) => Promise<void>
  addArtwork: (artwork: Artwork) => Promise<string>
  updateArtwork: (id: string, artwork: Artwork) => Promise<void>
  deleteArtwork: (id: string) => Promise<void>
  getArtistById: (id: string) => Artist | undefined
  getArtworkById: (id: string) => Artwork | undefined
  getArtworksByArtistId: (artistId: string) => Artwork[]
  getArtworksByCategory: (category: string) => Artwork[]
}

const FirebaseContext = createContext<FirebaseContextType | undefined>(undefined)

export function FirebaseProvider({ children }: { children: ReactNode }) {
  const [artists, setArtists] = useState<Artist[]>([])
  const [artworks, setArtworks] = useState<Artwork[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Fetch artists from Firebase
    const artistsRef = ref(database, "artists")
    const unsubscribeArtists = onValue(artistsRef, (snapshot) => {
      const data = snapshot.val()
      if (data) {
        const artistsArray = Object.entries(data).map(([id, artist]) => ({
          id,
          ...(artist as Omit<Artist, "id">),
        }))
        setArtists(artistsArray)
      } else {
        setArtists([])
      }
    })

    // Fetch artworks from Firebase
    const artworksRef = ref(database, "artworks")
    const unsubscribeArtworks = onValue(artworksRef, (snapshot) => {
      const data = snapshot.val()
      if (data) {
        const artworksArray = Object.entries(data).map(([id, artwork]) => ({
          id,
          ...(artwork as Omit<Artwork, "id">),
        }))
        setArtworks(artworksArray)
      } else {
        setArtworks([])
      }
      setLoading(false)
    })

    return () => {
      unsubscribeArtists()
      unsubscribeArtworks()
    }
  }, [])

  const addArtist = async (artist: Artist): Promise<string> => {
    const artistsRef = ref(database, "artists")
    const newArtistRef = push(artistsRef)
    await set(newArtistRef, artist)
    return newArtistRef.key as string
  }

  const updateArtist = async (id: string, artist: Artist): Promise<void> => {
    const { id: _, ...artistWithoutId } = artist
    const artistRef = ref(database, `artists/${id}`)
    await set(artistRef, artistWithoutId)
  }

  const deleteArtist = async (id: string): Promise<void> => {
    const artistRef = ref(database, `artists/${id}`)
    await remove(artistRef)

    // Also delete all artworks by this artist
    const artistArtworks = getArtworksByArtistId(id)
    for (const artwork of artistArtworks) {
      if (artwork.id) {
        await deleteArtwork(artwork.id)
      }
    }
  }

  const addArtwork = async (artwork: Artwork): Promise<string> => {
    const artworksRef = ref(database, "artworks")
    const newArtworkRef = push(artworksRef)
    await set(newArtworkRef, artwork)
    return newArtworkRef.key as string
  }

  const updateArtwork = async (id: string, artwork: Artwork): Promise<void> => {
    const { id: _, ...artworkWithoutId } = artwork
    const artworkRef = ref(database, `artworks/${id}`)
    await set(artworkRef, artworkWithoutId)
  }

  const deleteArtwork = async (id: string): Promise<void> => {
    const artworkRef = ref(database, `artworks/${id}`)
    await remove(artworkRef)
  }

  const getArtistById = (id: string) => {
    return artists.find((artist) => artist.id === id)
  }

  const getArtworkById = (id: string) => {
    return artworks.find((artwork) => artwork.id === id)
  }

  const getArtworksByArtistId = (artistId: string) => {
    return artworks.filter((artwork) => artwork.artistId === artistId)
  }

  const getArtworksByCategory = (category: string) => {
    return artworks.filter((artwork) => artwork.category === category)
  }

  return (
    <FirebaseContext.Provider
      value={{
        artists,
        artworks,
        loading,
        addArtist,
        updateArtist,
        deleteArtist,
        addArtwork,
        updateArtwork,
        deleteArtwork,
        getArtistById,
        getArtworkById,
        getArtworksByArtistId,
        getArtworksByCategory,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  )
}

export function useFirebase() {
  const context = useContext(FirebaseContext)
  if (context === undefined) {
    throw new Error("useFirebase must be used within a FirebaseProvider")
  }
  return context
  }
