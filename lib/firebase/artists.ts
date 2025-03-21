import { ref, get, set, push, remove, query, orderByChild, limitToLast } from "firebase/database"
import { database } from "./config"
import type { Artist } from "@/types"

const artistsRef = ref(database, "artists")

// Get all artists
export async function getArtists(): Promise<Artist[]> {
  try {
    const snapshot = await get(artistsRef)
    if (snapshot.exists()) {
      const data = snapshot.val()
      return Object.entries(data).map(([id, artist]) => ({
        id,
        ...(artist as Omit<Artist, "id">),
      }))
    }
    return []
  } catch (error) {
    console.error("Error getting artists:", error)
    // Return empty array instead of throwing error
    return []
  }
}

// Get artist by ID
export async function getArtistById(id: string): Promise<Artist | null> {
  try {
    const artistRef = ref(database, `artists/${id}`)
    const snapshot = await get(artistRef)
    if (snapshot.exists()) {
      return {
        id,
        ...snapshot.val(),
      }
    }
    return null
  } catch (error) {
    console.error(`Error getting artist with ID ${id}:`, error)
    throw error
  }
}

// Add a new artist
export async function addArtist(artist: Omit<Artist, "id">): Promise<string> {
  try {
    const newArtistRef = push(artistsRef)
    await set(newArtistRef, artist)
    return newArtistRef.key as string
  } catch (error) {
    console.error("Error adding artist:", error)
    throw error
  }
}

// Update an artist
export async function updateArtist(id: string, artist: Partial<Artist>): Promise<void> {
  try {
    const artistRef = ref(database, `artists/${id}`)
    await set(artistRef, artist)
  } catch (error) {
    console.error(`Error updating artist with ID ${id}:`, error)
    throw error
  }
}

// Delete an artist
export async function deleteArtist(id: string): Promise<void> {
  try {
    const artistRef = ref(database, `artists/${id}`)
    await remove(artistRef)
  } catch (error) {
    console.error(`Error deleting artist with ID ${id}:`, error)
    throw error
  }
}

// Get featured artists
export async function getFeaturedArtists(limit = 4): Promise<Artist[]> {
  try {
    const featuredQuery = query(artistsRef, orderByChild("featured"), limitToLast(limit))
    const snapshot = await get(featuredQuery)
    if (snapshot.exists()) {
      const data = snapshot.val()
      return Object.entries(data)
        .map(([id, artist]) => ({
          id,
          ...(artist as Omit<Artist, "id">),
        }))
        .filter((artist) => artist.featured)
    }
    return []
  } catch (error) {
    console.error("Error getting featured artists:", error)
    throw error
  }
}

