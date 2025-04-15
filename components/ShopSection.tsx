"use client";

import { useState, useEffect } from "react";
import { ref, get } from "firebase/database";
import { database } from "@/lib/firebase/config"; // Import the initialized database
import Image from "next/image";
import Link from "next/link";

interface Artwork {
  id: string;
  title: string;
  artist: string;
  category: string;
  imageUrl: string;
  year: string;
  medium: string;
}

export default function GalleryPage() {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    const fetchArtworks = async () => {
      const artworksRef = ref(database, "artworks"); // Use the initialized database

      try {
        const snapshot = await get(artworksRef);
        if (snapshot.exists()) {
          const data = snapshot.val();
          const fetchedArtworks = Object.entries(data).map(([id, artwork]: [string, any]) => ({
            id,
            title: artwork.title || "",
            artist: artwork.artist || "Unknown Artist",
            category: artwork.category || "",
            imageUrl: artwork.image || "/placeholder.svg",
            year: artwork.year || "",
            medium: artwork.medium || "",
          }));
          setArtworks(fetchedArtworks);
        } else {
          console.log("No artworks found.");
        }
      } catch (error) {
        console.error("Error fetching gallery data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArtworks();
  }, []);

  const totalPages = Math.ceil(artworks.length / itemsPerPage);
  const currentArtworks = artworks.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (isLoading) {
    return (
      <div className="bg-white">

        {/* Loading Skeleton */}
        <div className="container-custom py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="rounded-lg overflow-hidden">
                <div className="h-64 bg-gray-200 animate-pulse" />
                <div className="p-4 space-y-2">
                  <div className="h-4 bg-gray-200 rounded animate-pulse" />
                  <div className="h-3 bg-gray-100 rounded animate-pulse w-2/3" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white">
      {/* Gallery Grid */}
      <section className="py-12">
      <div className="container-custom">
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
    {currentArtworks.map((artwork) => (
      <div key={artwork.id}>
        <Link href={`/gallery/${artwork.id}`} className="block">
          <div className="relative overflow-hidden rounded-lg shadow-md aspect-square">
            <Image
              src={artwork.imageUrl}
              alt={artwork.title}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent">
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <h3 className="text-lg font-bold">{artwork.title}</h3>
                <p className="text-sm text-gray-200">{artwork.artist}</p>
                <span className="inline-block mt-2 text-xs bg-blue-700 px-2 py-1 rounded-full">
                  {artwork.category}
                </span>
              </div>
            </div>
          </div>
        </Link>
      </div>
    ))}
  </div>

  {/* Pagination */}
  <div className="mt-12 flex justify-center">
    <nav className="flex items-center gap-1">
      {/* Previous Button - Always visible */}
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1 border border-gray-300 rounded-md text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span className="sr-only md:not-sr-only">Previous</span>
        <span className="md:sr-only">←</span>
      </button>

      {/* First Page - Always visible */}
      <button
        onClick={() => handlePageChange(1)}
        className={`px-3 py-1 border border-gray-300 rounded-md ${
          currentPage === 1
            ? "bg-blue-700 text-white"
            : "text-gray-600"
        }`}
      >
        1
      </button>

      {/* Ellipsis for large page ranges */}
      {currentPage > 3 && totalPages > 5 && (
        <span className="px-2">...</span>
      )}

      {/* Dynamic middle pages - shown on larger screens */}
      {Array.from({ length: totalPages }, (_, index) => {
        const page = index + 1;
        // Show only relevant pages on mobile
        if (
          (page >= currentPage - 1 && page <= currentPage + 1) ||
          page === totalPages ||
          page === 1
        ) {
          // Skip if we've already handled first/last page or it's out of range
          if (page === 1 || page === totalPages) return null;
          
          return (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`hidden sm:block px-3 py-1 border border-gray-300 rounded-md ${
                currentPage === page
                  ? "bg-blue-700 text-white"
                  : "text-gray-600"
              }`}
            >
              {page}
            </button>
          );
        }
        return null;
      })}

      {/* Ellipsis for large page ranges */}
      {currentPage < totalPages - 2 && totalPages > 5 && (
        <span className="px-2 hidden sm:block">...</span>
      )}

      {/* Last Page - Always visible if different from first */}
      {totalPages > 1 && (
        <button
          onClick={() => handlePageChange(totalPages)}
          className={`px-3 py-1 border border-gray-300 rounded-md ${
            currentPage === totalPages
              ? "bg-blue-700 text-white"
              : "text-gray-600"
          }`}
        >
          {totalPages}
        </button>
      )}

      {/* Next Button - Always visible */}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 border border-gray-300 rounded-md text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span className="sr-only md:not-sr-only">Next</span>
        <span className="md:sr-only">→</span>
      </button>
    </nav>
  </div>
</div>
      </section>
    </div>
  );
}