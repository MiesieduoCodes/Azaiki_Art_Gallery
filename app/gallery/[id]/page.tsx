"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { ref, onValue } from "firebase/database";
import { database } from "@/lib/firebase/config";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";

interface Artwork {
  id: string;
  title: string;
  artistId?: string;
  artistName?: string;
  description: string;
  year?: string;
  medium?: string;
  dimension?: string;
  category?: string;
  price?: number;
  imageUrl: string;
}

interface Artist {
  id: string;
  name: string;
  bio: string;
  imageUrl: string;
}

export default function ArtworkPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [artwork, setArtwork] = useState<Artwork | null>(null);
  const [artist, setArtist] = useState<Artist | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      router.push("/gallery");
      return;
    }

    // Fetch artwork data
    const artworkRef = ref(database, `artworks/${id}`);
    onValue(artworkRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const fetchedArtwork: Artwork = {
          id: id as string,
          title: data.title || "",
          artistId: data.artistId || "",
          artistName: data.artist || "",
          description: data.description || "",
          year: data.year || "",
          medium: data.medium || "",
          dimension: data.dimensions || "",
          category: data.category || "",
          price: data.price || 0,
          imageUrl: data.image || "/placeholder.svg",
        };
        setArtwork(fetchedArtwork);

        // Fetch artist data if artistId exists
        if (fetchedArtwork.artistId) {
          const artistRef = ref(database, `artists/${fetchedArtwork.artistId}`);
          onValue(artistRef, (artistSnapshot) => {
            const artistData = artistSnapshot.val();
            if (artistData) {
              const fetchedArtist: Artist = {
                id: fetchedArtwork.artistId!,
                name: artistData.name || "",
                bio: artistData.bio || "",
                imageUrl: artistData.image || "/placeholder.svg",
              };
              setArtist(fetchedArtist);
            }
          }, (error) => {
            console.error("Error fetching artist:", error);
          });
        }
      } else {
        router.push("/gallery");
      }
      setLoading(false);
    }, (error) => {
      console.error("Error fetching artwork:", error);
      setLoading(false);
    });
  }, [id, router]);

  const handleBuyClick = () => {
    if (!artwork?.price || artwork.price <= 0) {
      alert("This artwork is not available for purchase");
      return;
    }
    router.push(`/payment/${id}`);
  };

  if (loading || !artwork) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading artwork...</span>
      </div>
    );
  }

  return (
    <div className="container mx-auto pt-28 py-16 px-4">
      <Button variant="outline" asChild className="mb-8">
        <Link href="/gallery">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Gallery
        </Link>
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Artwork Image */}
        <div className="relative aspect-square w-full overflow-hidden rounded-lg">
          {artwork.imageUrl ? (
            <Image
              src={artwork.imageUrl}
              alt={artwork.title}
              fill
              className="object-contain"
              priority
            />
          ) : (
            <div className="w-full h-full bg-muted flex items-center justify-center">
              No Image
            </div>
          )}
        </div>

        {/* Artwork Details */}
        <div>
          <h1 className="text-3xl font-bold mb-2">{artwork.title}</h1>
          <p className="text-xl mb-4">
            By{" "}
            {artist ? (
              <Link href={`/artists/${artist.id}`} className="hover:underline font-medium">
                {artist.name}
              </Link>
            ) : (
              artwork.artistName || "Unknown Artist"
            )}
          </p>

          {artwork.year && <p className="text-lg mb-6">Created in {artwork.year}</p>}

          <div className="mb-8">
            <p className="whitespace-pre-line">{artwork.description}</p>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-8">
            {artwork.medium && (
              <div>
                <h3 className="font-semibold text-sm text-muted-foreground">Medium</h3>
                <p>{artwork.medium}</p>
              </div>
            )}

            {artwork.dimension && (
              <div>
                <h3 className="font-semibold text-sm text-muted-foreground">Dimensions</h3>
                <p>{artwork.dimension}</p>
              </div>
            )}

            {artwork.category && (
              <div>
                <h3 className="font-semibold text-sm text-muted-foreground">Category</h3>
                <p>{artwork.category.charAt(0).toUpperCase() + artwork.category.slice(1).replace("-", " ")}</p>
              </div>
            )}

            {artwork.price && (
              <div>
                <h3 className="font-semibold text-sm text-muted-foreground">Price</h3>
                <p>${artwork.price.toLocaleString()}</p>
              </div>
            )}
          </div>

          {/* Buy Button - Positioned prominently */}
          <div className="mb-8">
            <Button
              size="lg"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-6 text-lg"
              onClick={handleBuyClick}
              disabled={!artwork.price || artwork.price <= 0}
            >
              {artwork.price && artwork.price > 0 ? (
                `Buy Now - $${artwork.price.toLocaleString()}`
              ) : (
                "Not Available for Purchase"
              )}
            </Button>
          </div>

          {artist && (
            <div className="mt-8 p-6 bg-muted rounded-lg">
              <h2 className="text-xl font-bold mb-4">About the Artist</h2>
              <p className="line-clamp-4">{artist.bio}</p>
              <Link href={`/artists/${artist.id}`} className="text-primary hover:underline block mt-4">
                View Artist Profile
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}