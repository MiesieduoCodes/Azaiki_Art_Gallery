"use client";

import React from "react";
import { AuthProvider } from "@/contexts/AuthContext"; // adjust path if needed
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <DashboardLayout>{children}</DashboardLayout>
    </AuthProvider>
  );
}
