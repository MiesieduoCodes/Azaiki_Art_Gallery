import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { AuthProvider } from "@/contexts/auth-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Azaiki Art Gallery and Museum",
  description: "Explore the world of art through our diverse collections and exhibitions.",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

        {/* Meta Tags for SEO */}
        <meta name="keywords" content="Azaiki Art Gallery, Museum, Art Exhibition, Nigerian Art, Modern Art, Classic Art, Cultural Heritage" />
        <meta name="author" content="Azaiki Art Gallery and Museum" />
        <meta name="robots" content="index, follow" />
        <meta name="theme-color" content="#1e40af" />

        {/* Open Graph / Facebook */}
        <meta property="og:title" content="Azaiki Art Gallery and Museum" />
        <meta property="og:description" content="Discover a collection of timeless art pieces and exhibitions at the Azaiki Art Gallery and Museum." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://azaikiartgallery.com" />
        <meta property="og:image" content="https://azaikiartgallery.com/og-image.jpg" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Azaiki Art Gallery and Museum" />
        <meta name="twitter:description" content="Explore art exhibitions, culture, and heritage at the Azaiki Art Gallery and Museum." />
        <meta name="twitter:image" content="https://azaikiartgallery.com/twitter-image.jpg" />

        {/* Preconnect for Faster Font Loading */}
        <link rel="preconnect" href="https://fonts.cdnfonts.com" />

        {/* Load Fonts Correctly */}
        <link rel="stylesheet" href="https://fonts.cdnfonts.com/css/against-2" />
        <link rel="stylesheet" href="https://fonts.cdnfonts.com/css/lufga" />
      </head>
      <body className={inter.className}>
        <AuthProvider>
          <div className="min-h-screen flex flex-col bg-white">
            <Navbar />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
        </AuthProvider>
      </body>
    </html>
  )
}
