import { createClient } from "@supabase/supabase-js"

// Read environment variables safely
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

// Log environment variable status (but not their values for security)
console.log("🔍 Supabase URL:", supabaseUrl ? "✅ Loaded" : "❌ Missing")
console.log("🔍 Supabase Anon Key:", supabaseAnonKey ? "✅ Loaded" : "❌ Missing")
console.log("🔍 Supabase Service Key:", supabaseServiceKey ? "✅ Loaded (Server Only)" : "❌ Missing")

// Ensure required keys are defined
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("🚨 Missing Supabase environment variables. Check your .env.local file.")
}

// Create a standard client with anonymous key (for public access)
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Create an admin client with service role key (server-side only)
export const supabaseAdmin =
  typeof window === "undefined" && supabaseServiceKey
    ? createClient(supabaseUrl, supabaseServiceKey)
    : null // Prevent exposing service key on the client side

// Database table types
export type Artwork = {
  id: number
  title: string
  artist_id: number
  collection_id: number
  year: string
  medium: string
  dimensions: string
  description: string
  image_url: string
  created_at: string
  featured: boolean
}

export type Artist = {
  id: number
  name: string
  specialty: string
  country: string
  bio: string
  image_url: string
  featured: boolean
  created_at: string
}

export type Collection = {
  id: number
  name: string
  description: string
  image_url: string
  created_at: string
}

export type Event = {
  id: number
  title: string
  description: string
  start_date: string
  end_date: string
  location: string
  image_url: string
  created_at: string
}

export type Profile = {
  id: string
  user_id: string
  full_name: string
  avatar_url: string
  website: string
  created_at: string
}
