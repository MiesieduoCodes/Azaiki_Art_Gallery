"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Users, ImageIcon, Settings, LogOut, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Artists", href: "/dashboard/artists", icon: Users },
  { name: "Artworks", href: "/dashboard/artworks", icon: ImageIcon },
]

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <div className="flex min-h-screen pt-16 flex-col bg-white">
      {/* Mobile header */}
      <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-white px-4 sm:px-6 lg:hidden">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button size="icon" className="lg:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] sm:w-[400px] bg-white">
            <nav className="flex flex-col gap-6">
              <Link href="/" className="flex items-center gap-2 font-semibold" onClick={() => setOpen(false)}>
                <ImageIcon className="h-6 w-6" />
                <span className="text-lg font-bold">Art Gallery Admin</span>
              </Link>
              <div className="flex flex-col gap-2">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium ${
                      pathname === item.href || pathname.startsWith(`${item.href}/`)
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-gray-100 hover:text-foreground"
                    }`}
                    onClick={() => setOpen(false)}
                  >
                    <item.icon className="h-5 w-5" />
                    {item.name}
                  </Link>
                ))}
              </div>
            </nav>
          </SheetContent>
        </Sheet>
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <ImageIcon className="h-6 w-6" />
          <span className="text-lg font-bold">Art Gallery Admin</span>
        </Link>
      </header>

      <div className="flex flex-1 flex-col lg:flex-row bg-white">
        {/* Sidebar for desktop */}
        <aside className="hidden w-64 flex-col border-r bg-white lg:flex">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6 bg-white">
            <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
              <ImageIcon className="h-6 w-6" />
              <span className="text-lg font-bold">Art Gallery Admin</span>
            </Link>
          </div>
          <nav className="flex-1 overflow-auto py-4 bg-white">
            <div className="flex flex-col gap-1 px-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium ${
                    pathname === item.href || pathname.startsWith(`${item.href}/`)
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-gray-100 hover:text-foreground"
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  {item.name}
                </Link>
              ))}
            </div>
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 overflow-auto bg-white">
          <div className="container max-w-7xl py-6 bg-white">{children}</div>
        </main>
      </div>
    </div>
  )
}