import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { auth as adminAuth } from "firebase-admin"
import { getFirebaseAdminApp } from "@/lib/firebase-admin"

// Initialize Firebase Admin if it hasn't been initialized
getFirebaseAdminApp()

export async function POST(request: Request) {
  try {
    const { idToken } = await request.json()

    // Create a session cookie
    const expiresIn = 60 * 60 * 24 * 7 * 1000 // 1 week
    const sessionCookie = await adminAuth().createSessionCookie(idToken, { expiresIn })

    // Set cookie for future requests
    cookies().set({
      name: "firebase-auth-token",
      value: sessionCookie,
      maxAge: expiresIn / 1000,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      sameSite: "strict",
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Session creation error:", error)
    return NextResponse.json({ success: false, error: "Failed to create session" }, { status: 401 })
  }
}

export async function DELETE() {
  cookies().delete("firebase-auth-token")
  return NextResponse.json({ success: true })
}
