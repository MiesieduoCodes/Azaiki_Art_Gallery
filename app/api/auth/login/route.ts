import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { sign } from "jsonwebtoken"

// This is a mock implementation - replace with your actual authentication logic
export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    // In a real app, you would validate credentials against your database
    if (email === "admin@example.com" && password === "password") {
      // Create a JWT token
      const token = sign(
        {
          id: "1",
          email,
          role: "admin",
        },
        process.env.JWT_SECRET || "fallback-secret-do-not-use-in-production",
        { expiresIn: "7d" },
      )

      // Set the token in a cookie
      cookies().set({
        name: "auth-token",
        value: token,
        httpOnly: true,
        path: "/",
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 7, // 1 week
        sameSite: "strict",
      })

      return NextResponse.json({
        success: true,
        user: {
          id: "1",
          email,
          name: "Admin User",
          role: "admin",
        },
        token,
      })
    }

    return NextResponse.json({ success: false, message: "Invalid credentials" }, { status: 401 })
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ success: false, message: "Authentication failed" }, { status: 500 })
  }
}
