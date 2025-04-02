export interface Artist {
  id: string
  name: string
  specialty: string
  country: string
  image: string
  featured: boolean
  bio: string
}

export interface Artwork {
  id: string
  title?: string
  artist?: string
  category?: string
  year?: string
  medium?: string
  dimensions?: string
  description?: string
  image?: string
  artistImage?: string
  artistBio?: string
  views?: string
  price_naira?: number;
  sold?: boolean;
  relatedWorks?: Array<{
    id: number
    title: string
    image: string
  }>
}

