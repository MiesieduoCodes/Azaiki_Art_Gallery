import { getArtists } from "@/lib/firebase/artists"
import { getArtworks } from "@/lib/firebase/artworks"

// Get dashboard stats
export async function getStats() {
  try {
    // Try to get artists and artworks data
    let artists = []
    let artworks = []

    try {
      artists = await getArtists()
    } catch (error) {
      console.error("Error getting artists for stats:", error)
      // Continue with empty artists array
    }

    try {
      artworks = await getArtworks()
    } catch (error) {
      console.error("Error getting artworks for stats:", error)
      // Continue with empty artworks array
    }

    // Calculate total views from available artwork data
    const totalViews = artworks.reduce((sum, artwork) => {
      return sum + (Number.parseInt(artwork.views || "0") || 0)
    }, 0)

    // Random growth between -10 and 30
    const viewsGrowth = Math.floor(Math.random() * 40) - 10

    return {
      totalArtists: artists.length,
      totalArtworks: artworks.length,
      totalViews,
      viewsGrowth,
    }
  } catch (error) {
    console.error("Error getting stats:", error)
    // Return default values in case of error
    return {
      totalArtists: 0,
      totalArtworks: 0,
      totalViews: 0,
      viewsGrowth: 0,
    }
  }
}

