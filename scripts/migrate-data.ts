import * as admin from "firebase-admin"
import * as fs from "fs/promises"
import path from "path"

// Initialize Firebase Admin SDK
// You'll need to download your service account key from Firebase Console
// Project settings > Service accounts > Generate new private key
const serviceAccount = require("../path-to-your-service-account.json")

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  })
}

const db = admin.firestore()
const bucket = admin.storage().bucket()

async function migrateData() {
  try {
    // Read your existing data
    const dataPath = path.join(process.cwd(), "data.json")
    const rawData = await fs.readFile(dataPath, "utf8")
    const data = JSON.parse(rawData)

    // Map to store original artist IDs to new Firebase IDs
    const artistIdMap = new Map()

    // Migrate artists
    console.log("Migrating artists...")
    for (const artist of data.artists) {
      const originalId = artist.id // Your original ID

      // Create a new document with a specific ID if needed
      const artistRef = originalId ? db.collection("artists").doc(originalId) : db.collection("artists").doc()

      await artistRef.set({
        name: artist.name,
        bio: artist.bio || "",
        nationality: artist.nationality || "",
        birthYear: artist.birthYear || "",
        website: artist.website || "",
        imageUrl: artist.imageUrl || "",
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      })

      // Store the mapping between original ID and Firebase ID
      if (originalId) {
        artistIdMap.set(originalId, artistRef.id)
      }

      console.log(`Migrated artist: ${artist.name} (ID: ${artistRef.id})`)

      // If you need to upload images from local files
      if (artist.localImagePath) {
        const imagePath = path.join(process.cwd(), artist.localImagePath)
        const destination = `artists/${artistRef.id}_${path.basename(artist.localImagePath)}`

        await bucket.upload(imagePath, {
          destination,
          metadata: {
            contentType: "image/jpeg", // Adjust based on your image type
          },
        })

        const imageUrl = `https://storage.googleapis.com/${bucket.name}/${destination}`
        await artistRef.update({ imageUrl })
        console.log(`Uploaded image for ${artist.name}`)
      }
    }

    // Migrate artworks
    console.log("Migrating artworks...")
    for (const artwork of data.artworks) {
      const originalId = artwork.id // Your original ID

      // Map the artist ID if needed
      let artistId = artwork.artistId
      if (artistIdMap.has(artistId)) {
        artistId = artistIdMap.get(artistId)
      }

      // Create a new document with a specific ID if needed
      const artworkRef = originalId ? db.collection("artworks").doc(originalId) : db.collection("artworks").doc()

      await artworkRef.set({
        title: artwork.title,
        artistId: artistId,
        category: artwork.category || "Other",
        description: artwork.description || "",
        year: artwork.year || "",
        medium: artwork.medium || "",
        dimensions: artwork.dimensions || "",
        price: artwork.price || "",
        imageUrl: artwork.imageUrl || "",
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      })

      console.log(`Migrated artwork: ${artwork.title} (ID: ${artworkRef.id})`)

      // If you need to upload images from local files
      if (artwork.localImagePath) {
        const imagePath = path.join(process.cwd(), artwork.localImagePath)
        const destination = `artworks/${artworkRef.id}_${path.basename(artwork.localImagePath)}`

        await bucket.upload(imagePath, {
          destination,
          metadata: {
            contentType: "image/jpeg", // Adjust based on your image type
          },
        })

        const imageUrl = `https://storage.googleapis.com/${bucket.name}/${destination}`
        await artworkRef.update({ imageUrl })
        console.log(`Uploaded image for ${artwork.title}`)
      }
    }

    console.log("Migration completed successfully!")
  } catch (error) {
    console.error("Error during migration:", error)
  }
}

migrateData()

