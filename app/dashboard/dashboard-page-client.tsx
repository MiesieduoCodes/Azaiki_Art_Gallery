"use client";

import { useEffect, useState } from "react";
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

    if (currentUser && !loading) {
      init();
    }
  }, [currentUser, loading]);

  if (loading || !currentUser) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

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
            Your database has been initialized with sample data. You can now start managing your artists and artworks.
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