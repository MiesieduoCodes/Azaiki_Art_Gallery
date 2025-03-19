import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // For Firebase, we'll need to check for the session cookie
  // This is a simplified version - in a real app, you'd verify the Firebase session
  const authCookie = request.cookies.get("__session")

  // Check if the user is trying to access an admin route
  if (request.nextUrl.pathname.startsWith("/admin")) {
    // If there's no auth cookie, redirect to login
    if (!authCookie) {
      const loginUrl = new URL("/auth/login", request.url)
      return NextResponse.redirect(loginUrl)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*"],
}

