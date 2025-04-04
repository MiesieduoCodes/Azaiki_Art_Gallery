"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Overview } from "@/components/dashboard/overview";
import { RecentArtworks } from "@/components/dashboard/recent-artworks";
import { DashboardStats } from "@/components/dashboard/dashboard-stats";
import { initializeDatabase } from "@/lib/firebase/init-data";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export default function DashboardPageClient() {
  const [initializing, setInitializing] = useState(true);
  const [initialized, setInitialized] = useState(false);
  const { currentUser, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // If not loading and no user, redirect to login
    if (!loading && !currentUser) {
      router.push("/login");
    }
  }, [currentUser, loading, router]);

  // Show only loading indicator if still checking auth state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  // If not loading but no user (will redirect from useEffect above)
  if (!currentUser) {
    return null; // or a very brief loading indicator
  }

  // Rest of your component logic for when user is authenticated
  useEffect(() => {
    const init = async () => {
      try {
        const wasInitialized = await initializeDatabase();
        setInitialized(wasInitialized);
      } catch (error) {
        console.error("Error initializing database:", error);
      } finally {
        setInitializing(false);
      }
    };

    init();
  }, []);

  return (
    <div className="flex flex-col pt-24 gap-4">
      {initializing ? (
        <div className="flex items-center justify-center p-8">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : initialized ? (
        <Alert className="mb-4">
          <AlertTitle>Database Initialized</AlertTitle>
          <AlertDescription>
            Your database has been initialized with sample data.
          </AlertDescription>
        </Alert>
      ) : null}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <DashboardStats />
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
            <CardDescription>Gallery views in the last 30 days</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <Overview />
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recent Artworks</CardTitle>
            <CardDescription>Latest additions to the gallery</CardDescription>
          </CardHeader>
          <CardContent>
            <RecentArtworks />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}