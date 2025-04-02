"use client"

import { createContext, useContext, useEffect, useState, ReactNode } from "react"
import { onAuthStateChanged, signInWithEmailAndPassword, signOut, User } from "firebase/auth"
import { auth } from "@/lib/firebase/config"

// Define the context type
interface AuthContextType {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<User>
  logout: () => Promise<void>
}

// Create context with proper typing
const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  login: async () => {
    // This is just a placeholder that matches the type
    throw new Error("Login function not implemented")
  },
  logout: async () => {
    throw new Error("Logout function not implemented")
  },
})

// Define props for AuthProvider
interface AuthProviderProps {
  children: ReactNode
}

export const useAuth = () => useContext(AuthContext)

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const login = async (email: string, password: string): Promise<User> => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      return userCredential.user
    } catch (error) {
      throw error
    }
  }

  const logout = async (): Promise<void> => {
    try {
      await signOut(auth)
    } catch (error) {
      throw error
    }
  }

  const value = {
    user,
    loading,
    login,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}