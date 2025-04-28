"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth"
import { auth } from "@/lib/firebase/config"

type User = {
  uid: string
  email: string | null
  displayName: string | null
  photoURL: string | null
}

type AuthContextType = {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Enable persistent auth state
    setPersistence(auth, browserLocalPersistence)
      .then(() => {
        console.log("Firebase persistence set to LOCAL")
      })
      .catch((error) => {
        console.error("Error setting persistence:", error)
      })

    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        console.log("User authenticated:", firebaseUser.email)
        setUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName,
          photoURL: firebaseUser.photoURL,
        })

        // Store auth status in localStorage for middleware check
        localStorage.setItem("isAuthenticated", "true")
      } else {
        console.log("No authenticated user")
        setUser(null)
        localStorage.removeItem("isAuthenticated")
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const login = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      console.log("Login successful:", userCredential.user.email)

      // Get the token and store it for the middleware
      const token = await userCredential.user.getIdToken()
      document.cookie = `authToken=${token}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax`

      return userCredential.user
    } catch (error: any) {
      console.error("Login error:", error)
      throw error
    }
  }

  const logout = async () => {
    try {
      await signOut(auth)
      // Clear auth cookie
      document.cookie = "authToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
      localStorage.removeItem("isAuthenticated")
      console.log("Logged out successfully")
    } catch (error) {
      console.error("Logout error:", error)
      throw error
    }
  }

  return <AuthContext.Provider value={{ user, loading, login, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
