import type * as admin from "firebase-admin"
import * as fs from "fs"
import * as path from "path"
import fetch from "node-fetch"

export class ImageUploader {
  private bucket: admin.storage.Bucket

  constructor(bucket: admin.storage.Bucket) {
    this.bucket = bucket
  }

  /**
   * Upload an image from a local file path
   */
  async uploadFromLocalPath(localPath: string, destination: string): Promise<string> {
    try {
      // Check if file exists
      if (!fs.existsSync(localPath)) {
        throw new Error(`File not found: ${localPath}`)
      }

      // Upload file to Firebase Storage
      await this.bucket.upload(localPath, {
        destination,
        metadata: {
          contentType: this.getContentType(localPath),
        },
      })

      // Get public URL
      const publicUrl = `https://storage.googleapis.com/${this.bucket.name}/${destination}`
      console.log(`Uploaded image to: ${publicUrl}`)
      return publicUrl
    } catch (error) {
      console.error(`Error uploading image from ${localPath}:`, error)
      throw error
    }
  }

  /**
   * Upload an image from a URL
   */
  async uploadFromUrl(imageUrl: string, destination: string): Promise<string> {
    try {
      console.log(`Downloading image from: ${imageUrl}`)
      const response = await fetch(imageUrl)

      if (!response.ok) {
        throw new Error(`Failed to fetch image: ${response.statusText}`)
      }

      const buffer = await response.arrayBuffer()
      const contentType = response.headers.get("content-type") || "image/jpeg"

      // Upload to Firebase Storage
      const file = this.bucket.file(destination)
      await file.save(Buffer.from(buffer), {
        metadata: {
          contentType,
        },
      })

      // Get public URL
      const publicUrl = `https://storage.googleapis.com/${this.bucket.name}/${destination}`
      console.log(`Uploaded image to: ${publicUrl}`)
      return publicUrl
    } catch (error) {
      console.error(`Error uploading image from URL ${imageUrl}:`, error)
      throw error
    }
  }

  /**
   * Determine content type based on file extension
   */
  private getContentType(filePath: string): string {
    const extension = path.extname(filePath).toLowerCase()
    switch (extension) {
      case ".jpg":
      case ".jpeg":
        return "image/jpeg"
      case ".png":
        return "image/png"
      case ".gif":
        return "image/gif"
      case ".webp":
        return "image/webp"
      default:
        return "application/octet-stream"
    }
  }
}

