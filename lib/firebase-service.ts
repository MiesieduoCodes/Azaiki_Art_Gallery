import {
    collection,
    doc,
    getDocs,
    getDoc,
    addDoc,
    updateDoc,
    deleteDoc,
    type DocumentData,
    type QueryDocumentSnapshot,
  } from "firebase/firestore"
  import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage"
  import { db, storage } from "./firebase"
  
  // Helper function to convert Firestore document to plain object
  const convertDocToObject = (doc: QueryDocumentSnapshot<DocumentData>) => {
    return {
      id: doc.id,
      ...doc.data(),
    }
  }
  
  // Artists
  export const getArtists = async () => {
    const artistsCollection = collection(db, "artists")
    const artistsSnapshot = await getDocs(artistsCollection)
    return artistsSnapshot.docs.map(convertDocToObject)
  }
  
  export const getArtist = async (id: string) => {
    const artistDoc = doc(db, "artists", id)
    const artistSnapshot = await getDoc(artistDoc)
  
    if (!artistSnapshot.exists()) {
      throw new Error("Artist not found")
    }
  
    return {
      id: artistSnapshot.id,
      ...artistSnapshot.data(),
    }
  }
  
  export const createArtist = async (artistData: any) => {
    const artistsCollection = collection(db, "artists")
    const docRef = await addDoc(artistsCollection, {
      ...artistData,
      created_at: new Date().toISOString(),
    })
  
    return {
      id: docRef.id,
      ...artistData,
    }
  }
  
  export const updateArtist = async (id: string, artistData: any) => {
    const artistDoc = doc(db, "artists", id)
    await updateDoc(artistDoc, {
      ...artistData,
      updated_at: new Date().toISOString(),
    })
  
    return {
      id,
      ...artistData,
    }
  }
  
  export const deleteArtist = async (id: string) => {
    const artistDoc = doc(db, "artists", id)
    await deleteDoc(artistDoc)
    return { id }
  }
  
  // Artworks
  export const getArtworks = async () => {
    const artworksCollection = collection(db, "artworks")
    const artworksSnapshot = await getDocs(artworksCollection)
    return artworksSnapshot.docs.map(convertDocToObject)
  }
  
  export const getArtwork = async (id: string) => {
    const artworkDoc = doc(db, "artworks", id)
    const artworkSnapshot = await getDoc(artworkDoc)
  
    if (!artworkSnapshot.exists()) {
      throw new Error("Artwork not found")
    }
  
    return {
      id: artworkSnapshot.id,
      ...artworkSnapshot.data(),
    }
  }
  
  export const createArtwork = async (artworkData: any) => {
    const artworksCollection = collection(db, "artworks")
    const docRef = await addDoc(artworksCollection, {
      ...artworkData,
      created_at: new Date().toISOString(),
    })
  
    return {
      id: docRef.id,
      ...artworkData,
    }
  }
  
  export const updateArtwork = async (id: string, artworkData: any) => {
    const artworkDoc = doc(db, "artworks", id)
    await updateDoc(artworkDoc, {
      ...artworkData,
      updated_at: new Date().toISOString(),
    })
  
    return {
      id,
      ...artworkData,
    }
  }
  
  export const deleteArtwork = async (id: string) => {
    const artworkDoc = doc(db, "artworks", id)
    await deleteDoc(artworkDoc)
    return { id }
  }
  
  // Collections
  export const getCollections = async () => {
    const collectionsCollection = collection(db, "collections")
    const collectionsSnapshot = await getDocs(collectionsCollection)
    return collectionsSnapshot.docs.map(convertDocToObject)
  }
  
  export const getCollection = async (id: string) => {
    const collectionDoc = doc(db, "collections", id)
    const collectionSnapshot = await getDoc(collectionDoc)
  
    if (!collectionSnapshot.exists()) {
      throw new Error("Collection not found")
    }
  
    return {
      id: collectionSnapshot.id,
      ...collectionSnapshot.data(),
    }
  }
  
  export const createCollection = async (collectionData: any) => {
    const collectionsCollection = collection(db, "collections")
    const docRef = await addDoc(collectionsCollection, {
      ...collectionData,
      created_at: new Date().toISOString(),
    })
  
    return {
      id: docRef.id,
      ...collectionData,
    }
  }
  
  export const updateCollection = async (id: string, collectionData: any) => {
    const collectionDoc = doc(db, "collections", id)
    await updateDoc(collectionDoc, {
      ...collectionData,
      updated_at: new Date().toISOString(),
    })
  
    return {
      id,
      ...collectionData,
    }
  }
  
  export const deleteCollection = async (id: string) => {
    const collectionDoc = doc(db, "collections", id)
    await deleteDoc(collectionDoc)
    return { id }
  }
  
  // File uploads
  export const uploadFile = async (file: File, path: string) => {
    const storageRef = ref(storage, path)
    await uploadBytes(storageRef, file)
    const downloadURL = await getDownloadURL(storageRef)
    return downloadURL
  }
  
  export const deleteFile = async (path: string) => {
    const storageRef = ref(storage, path)
    await deleteObject(storageRef)
    return { success: true }
  }
  
  