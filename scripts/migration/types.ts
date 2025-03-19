// Define types for our data structures
export interface ArtistData {
  id?: string
  name: string
  bio?: string
  birthYear?: string
  nationality?: string
  website?: string
  imageUrl?: string
  localImagePath?: string
}

export interface ArtworkData {
  id?: string
  title: string
  artistId: string
  category?: string
  description?: string
  year?: string
  medium?: string
  dimensions?: string
  price?: string
  imageUrl?: string
  localImagePath?: string
}

export interface MigrationData {
  artists: ArtistData[]
  artworks: ArtworkData[]
}

