import type { ReactNode } from "react"
import { AuthProvider } from "@/components/auth-provider"
import { AuthGuard } from "@/components/auth-guard"

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <AuthGuard>
        <div className="flex min-h-screen flex-col">
          <div className="flex flex-1">
            <main className="flex-1 p-6">{children}</main>
          </div>
        </div>
      </AuthGuard>
    </AuthProvider>
  )
}
