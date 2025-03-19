import * as admin from "firebase-admin"
import * as fs from "fs/promises"
import * as path from "path"
import type { MigrationData } from "./types"
import { ImageUploader } from "./image-uploader"
import { DataValidator } from "./data-validator"

// Initialize Firebase Admin SDK
// You'll need to create a serviceAccountKey.json file
const serviceAccountPath = path.join(process.cwd(), "serviceAccountKey.json")

// Initialize Firebase Admin
function initializeFirebase() {
  if (admin.apps.length === 0) {
    try {
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccountPath),
        storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      })
      console.log("Firebase Admin SDK initialized successfully")
    } catch (error) {
      console.error("Error initializing Firebase Admin SDK:", error)
      process.exit(1)
    }
  }
  return {
    db: admin.firestore(),
    bucket: admin.storage().bucket(),
  }
}

// Main migration function
async function migrateData() {
  try {
    // Initialize Firebase
    const { db, bucket } = initializeFirebase()
    const imageUploader = new ImageUploader(bucket)
    const dataValidator = new DataValidator()

    // Read data file
    const dataPath = path.join(process.cwd(), "data.json")
    console.log(`Reading data from ${dataPath}`)
    const rawData = await fs.readFile(dataPath, "utf8")
    const data: MigrationData = JSON.parse(rawData)

    // Validate data
    console.log("Validating data...")
    const validation = dataValidator.validateMigrationData(data)
    if (!validation.valid) {
      console.error("Data validation failed:")
      validation.errors.forEach((error) => console.error(`- ${error}`))
      process.exit(1)
    }
    console.log("Data validation passed")

    // Map to store original artist IDs to new Firebase IDs
    const artistIdMap = new Map<string, string>()

    // Migrate artists
    console.log(`Migrating ${data.artists.length} artists...`)
    for (const artist of data.artists) {
      const originalId = artist.id

      // Create a new document with a specific ID if provided
      const artistRef = originalId ? db.collection("artists").doc(originalId) : db.collection("artists").doc()

      // Process image if needed
      let imageUrl = artist.imageUrl || ""

      if (artist.localImagePath) {
        // Upload local image
        const localPath = path.join(process.cwd(), artist.localImagePath)
        const destination = `artists/${artistRef.id}_${path.basename(artist.localImagePath)}`
        imageUrl = await imageUploader.uploadFromLocalPath(localPath, destination)
      } else if (artist.imageUrl && artist.imageUrl.startsWith("http")) {
        // Upload from URL if needed (optional)
        // Uncomment if you want to transfer images from external URLs to Firebase Storage
        /*
        const destination = `artists/${artistRef.id}_${Date.now()}.jpg`;
        imageUrl = await imageUploader.uploadFromUrl(artist.imageUrl, destination);
        */
      }

      // Prepare artist data
      const artistData = {
        name: artist.name,
        bio: artist.bio || "",
        nationality: artist.nationality || "",
        birthYear: artist.birthYear || "",
        website: artist.website || "",
        imageUrl: imageUrl,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      }

      // Save to Firestore
      await artistRef.set(artistData)

      // Store the mapping between original ID and Firebase ID
      if (originalId) {
        artistIdMap.set(originalId, artistRef.id)
      }

      console.log(`Migrated artist: ${artist.name} (ID: ${artistRef.id})`)
    }

    // Migrate artworks
    console.log(`Migrating ${data.artworks.length} artworks...`)
    for (const artwork of data.artworks) {
      const originalId = artwork.id

      // Map the artist ID if needed
      let artistId = artwork.artistId
      if (artistIdMap.has(artistId)) {
        artistId = artistIdMap.get(artistId)!
      }

      // Create a new document with a specific ID if provided
      const artworkRef = originalId ? db.collection("artworks").doc(originalId) : db.collection("artworks").doc()

      // Process image if needed
      let imageUrl = artwork.imageUrl || ""

      if (artwork.localImagePath) {
        // Upload local image
        const localPath = path.join(process.cwd(), artwork.localImagePath)
        const destination = `artworks/${artworkRef.id}_${path.basename(artwork.localImagePath)}`
        imageUrl = await imageUploader.uploadFromLocalPath(localPath, destination)
      } else if (artwork.imageUrl && artwork.imageUrl.startsWith("http")) {
        // Upload from URL if needed (optional)
        // Uncomment if you want to transfer images from external URLs to Firebase Storage
        /*
        const destination = `artworks/${artworkRef.id}_${Date.now()}.jpg`;
        imageUrl = await imageUploader.uploadFromUrl(artwork.imageUrl, destination);
        */
      }

      // Prepare artwork data
      const artworkData = {
        title: artwork.title,
        artistId: artistId,
        category: artwork.category || "Other",
        description: artwork.description || "",
        year: artwork.year || "",
        medium: artwork.medium || "",
        dimensions: artwork.dimensions || "",
        price: artwork.price || "",
        imageUrl: imageUrl,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      }

      // Save to Firestore
      await artworkRef.set(artworkData)

      console.log(`Migrated artwork: ${artwork.title} (ID: ${artworkRef.id})`)
    }

    console.log("Migration completed successfully!")
  } catch (error) {
    console.error("Error during migration:", error)
    process.exit(1)
  }
}

// Run the migration
migrateData()

