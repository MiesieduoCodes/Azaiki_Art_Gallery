import type { ArtistData, ArtworkData, MigrationData } from "./types"

export class DataValidator {
  /**
   * Validate the entire migration dataset
   */
  validateMigrationData(data: MigrationData): { valid: boolean; errors: string[] } {
    const errors: string[] = []

    // Check if artists array exists
    if (!Array.isArray(data.artists)) {
      errors.push("Missing or invalid artists array")
      return { valid: false, errors }
    }

    // Check if artworks array exists
    if (!Array.isArray(data.artworks)) {
      errors.push("Missing or invalid artworks array")
      return { valid: false, errors }
    }

    // Validate each artist
    data.artists.forEach((artist, index) => {
      const artistErrors = this.validateArtist(artist)
      if (artistErrors.length > 0) {
        errors.push(`Artist at index ${index} has errors: ${artistErrors.join(", ")}`)
      }
    })

    // Validate each artwork
    data.artworks.forEach((artwork, index) => {
      const artworkErrors = this.validateArtwork(artwork)
      if (artworkErrors.length > 0) {
        errors.push(`Artwork at index ${index} has errors: ${artworkErrors.join(", ")}`)
      }
    })

    // Check for artist references in artworks
    const artistIds = new Set(data.artists.map((artist) => artist.id))
    data.artworks.forEach((artwork, index) => {
      if (artwork.artistId && !artistIds.has(artwork.artistId)) {
        errors.push(`Artwork at index ${index} references non-existent artist ID: ${artwork.artistId}`)
      }
    })

    return {
      valid: errors.length === 0,
      errors,
    }
  }

  /**
   * Validate a single artist
   */
  private validateArtist(artist: ArtistData): string[] {
    const errors: string[] = []

    if (!artist.name) {
      errors.push("Missing required field: name")
    }

    if (artist.imageUrl && !this.isValidUrl(artist.imageUrl)) {
      errors.push("Invalid imageUrl format")
    }

    if (artist.website && !this.isValidUrl(artist.website)) {
      errors.push("Invalid website format")
    }

    return errors
  }

  /**
   * Validate a single artwork
   */
  private validateArtwork(artwork: ArtworkData): string[] {
    const errors: string[] = []

    if (!artwork.title) {
      errors.push("Missing required field: title")
    }

    if (!artwork.artistId) {
      errors.push("Missing required field: artistId")
    }

    if (artwork.imageUrl && !this.isValidUrl(artwork.imageUrl)) {
      errors.push("Invalid imageUrl format")
    }

    return errors
  }

  /**
   * Check if a string is a valid URL
   */
  private isValidUrl(url: string): boolean {
    try {
      new URL(url)
      return true
    } catch (error) {
      return false
    }
  }
}

