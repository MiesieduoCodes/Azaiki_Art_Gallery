import { ref, set, get } from "firebase/database"
import { database } from "./config"
import { sampleArtists, sampleArtworks } from "./sample-data"

export async function initializeDatabase() {
  try {
    // Check if artists exist
    const artistsRef = ref(database, "artists")
    const artistsSnapshot = await get(artistsRef)

    // Check if artworks exist
    const artworksRef = ref(database, "artworks")
    const artworksSnapshot = await get(artworksRef)

    // If both are empty, initialize with sample data
    if (!artistsSnapshot.exists() && !artworksSnapshot.exists()) {
      console.log("Initializing database with sample data...")

      // Add sample artists
      await set(artistsRef, sampleArtists)

      // Add sample artworks
      await set(artworksRef, sampleArtworks)

      console.log("Database initialized successfully!")
      return true
    }

    return false
  } catch (error) {
    console.error("Error initializing database:", error)
    return false
  }
}

