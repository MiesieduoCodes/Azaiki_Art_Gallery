import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Get the pathname
  const path = request.nextUrl.pathname

  // Define protected paths
  const isAdminPath = path.startsWith("/dashboard")

  // Check for Firebase Auth session cookie
  const session = request.cookies.get("__session")?.value

  // If accessing admin path without session, redirect to login
  if (isAdminPath && !session) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  return NextResponse.next()
}

// Configure the middleware to run on specific paths
export const config = {
  matcher: ["/dashboard/:path*"],
}
