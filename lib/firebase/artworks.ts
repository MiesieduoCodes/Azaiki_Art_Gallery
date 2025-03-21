import { ref, get, set, push, remove, query, orderByChild, limitToLast } from "firebase/database"
import { database } from "./config"
import type { Artwork } from "@/types/index"

const artworksRef = ref(database, "artworks")

// Get all artworks
export async function getArtworks(): Promise<Artwork[]> {
  try {
    const snapshot = await get(artworksRef)
    if (snapshot.exists()) {
      const data = snapshot.val()
      return Object.entries(data).map(([id, artwork]) => ({
        id,
        ...(artwork as Omit<Artwork, "id">),
      }))
    }
    return []
  } catch (error) {
    console.error("Error getting artworks:", error)
    // Return empty array instead of throwing error
    return []
  }
}

// Get artwork by ID
export async function getArtworkById(id: string): Promise<Artwork | null> {
  try {
    const artworkRef = ref(database, `artworks/${id}`)
    const snapshot = await get(artworkRef)
    if (snapshot.exists()) {
      return {
        id,
        ...snapshot.val(),
      }
    }
    return null
  } catch (error) {
    console.error(`Error getting artwork with ID ${id}:`, error)
    throw error
  }
}

// Add a new artwork
export async function addArtwork(artwork: Omit<Artwork, "id">): Promise<string> {
  try {
    const newArtworkRef = push(artworksRef)
    await set(newArtworkRef, artwork)
    return newArtworkRef.key as string
  } catch (error) {
    console.error("Error adding artwork:", error)
    throw error
  }
}

// Update an artwork
export async function updateArtwork(id: string, artwork: Partial<Artwork>): Promise<void> {
  try {
    const artworkRef = ref(database, `artworks/${id}`)
    await set(artworkRef, artwork)
  } catch (error) {
    console.error(`Error updating artwork with ID ${id}:`, error)
    throw error
  }
}

// Delete an artwork
export async function deleteArtwork(id: string): Promise<void> {
  try {
    const artworkRef = ref(database, `artworks/${id}`)
    await remove(artworkRef)
  } catch (error) {
    console.error(`Error deleting artwork with ID ${id}:`, error)
    throw error
  }
}

// Get recent artworks
export async function getRecentArtworks(limit = 5): Promise<Artwork[]> {
  try {
    // In a real app, you might want to order by timestamp
    const recentQuery = query(artworksRef, limitToLast(limit))
    const snapshot = await get(recentQuery)
    if (snapshot.exists()) {
      const data = snapshot.val()
      return Object.entries(data).map(([id, artwork]) => ({
        id,
        ...(artwork as Omit<Artwork, "id">),
      }))
    }
    return []
  } catch (error) {
    console.error("Error getting recent artworks:", error)
    // Return empty array instead of throwing error
    return []
  }
}

// Get artworks by category
export async function getArtworksByCategory(category: string): Promise<Artwork[]> {
  try {
    const categoryQuery = query(artworksRef, orderByChild("category"))
    const snapshot = await get(categoryQuery)
    if (snapshot.exists()) {
      const data = snapshot.val()
      return Object.entries(data)
        .map(([id, artwork]) => ({
          id,
          ...(artwork as Omit<Artwork, "id">),
        }))
        .filter((artwork) => artwork.category === category)
    }
    return []
  } catch (error) {
    console.error(`Error getting artworks by category ${category}:`, error)
    throw error
  }
}

// Get artworks by artist
export async function getArtworksByArtist(artistName: string): Promise<Artwork[]> {
  try {
    const artistQuery = query(artworksRef, orderByChild("artist"))
    const snapshot = await get(artistQuery)
    if (snapshot.exists()) {
      const data = snapshot.val()
      return Object.entries(data)
        .map(([id, artwork]) => ({
          id,
          ...(artwork as Omit<Artwork, "id">),
        }))
        .filter((artwork) => artwork.artist === artistName)
    }
    return []
  } catch (error) {
    console.error(`Error getting artworks by artist ${artistName}:`, error)
    throw error
  }
}

