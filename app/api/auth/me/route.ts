import { NextResponse } from "next/server"
import { verify } from "jsonwebtoken"

export async function GET(request: Request) {
  try {
    // Get the token from the Authorization header
    const authHeader = request.headers.get("Authorization")

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
    }

    const token = authHeader.split(" ")[1]

    // Verify the token
    const decoded = verify(token, process.env.JWT_SECRET || "fallback-secret-do-not-use-in-production") as {
      id: string
      email: string
      role: string
    }

    // In a real app, you would fetch the user from your database
    return NextResponse.json({
      success: true,
      user: {
        id: decoded.id,
        email: decoded.email,
        name: "Admin User", // This would come from your database
        role: decoded.role,
      },
    })
  } catch (error) {
    console.error("Auth verification error:", error)
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
  }
}
