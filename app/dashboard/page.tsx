import type { Metadata } from "next";
import DashboardPageClient from "./dashboard-page-client";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Admin dashboard for art gallery management",
};

export default function DashboardPage() {
  return <DashboardPageClient />;
}