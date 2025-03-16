import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  // Check if the request is for the admin dashboard
  if (req.nextUrl.pathname.startsWith("/admin")) {
    if (!session) {
      // Redirect to login if not authenticated
      return NextResponse.redirect(new URL("/auth/login", req.url))
    }

    // Check if user is admin
    const { data: profile } = await supabase.from("profiles").select("role").eq("id", session.user.id).single()

    if (profile?.role !== "admin") {
      // Redirect to dashboard if not admin
      return NextResponse.redirect(new URL("/dashboard", req.url))
    }
  }

  // Check if the request is for the user dashboard
  if (req.nextUrl.pathname.startsWith("/dashboard") && !session) {
    // Redirect to login if not authenticated
    return NextResponse.redirect(new URL("/auth/login", req.url))
  }

  // Check if the request is for auth pages
  if (
    (req.nextUrl.pathname.startsWith("/auth/login") || req.nextUrl.pathname.startsWith("/auth/register")) &&
    session
  ) {
    // Redirect to dashboard if already authenticated
    return NextResponse.redirect(new URL("/dashboard", req.url))
  }

  return res
}

export const config = {
  matcher: ["/admin/:path*", "/dashboard/:path*", "/auth/:path*"],
}

