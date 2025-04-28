import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Get the pathname
  const path = request.nextUrl.pathname

  // Define protected paths
  const isAdminPath = path.startsWith("/dashboard")

  // Check for auth token cookie
  const authToken = request.cookies.get("authToken")?.value

  // If accessing admin path without auth token, redirect to login
  if (isAdminPath && !authToken) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  return NextResponse.next()
}

// Configure the middleware to run on specific paths
export const config = {
  matcher: ["/dashboard/:path*"],
}
