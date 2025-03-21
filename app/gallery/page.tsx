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
        {/* Hero Section */}
        <section className="bg-blue-700 text-white pt-36 pb-10">
          <div className="container-custom">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Art Gallery</h1>
            <p className="text-xl text-blue-100 max-w-3xl">
              Explore our extensive collection of artworks from various periods, styles, and cultures.
            </p>
          </div>
        </section>

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
      {/* Hero Section */}
      <section className="bg-blue-700 text-white pt-36 pb-10">
        <div className="container-custom">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Art Gallery</h1>
          <p className="text-xl text-blue-100 max-w-3xl">
            Explore our extensive collection of artworks from various periods, styles, and cultures.
          </p>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-12">
        <div className="container-custom">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {currentArtworks.map((artwork) => (
              <div key={artwork.id} className="group">
                <Link href={`/gallery/${artwork.id}`} className="block">
                  <div className="relative overflow-hidden rounded-lg shadow-md aspect-square">
                    <Image
                      src={artwork.imageUrl}
                      alt={artwork.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
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
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index + 1}
                  onClick={() => handlePageChange(index + 1)}
                  className={`px-3 py-1 border border-gray-300 rounded-md ${
                    currentPage === index + 1
                      ? "bg-blue-700 text-white"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  {index + 1}
                </button>
              ))}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-1 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </nav>
          </div>
        </div>
      </section>

      {/* Featured Collections */}
      <section className="py-12 bg-gray-50">
        <div className="container-custom">
          <h2 className="section-title text-center">Featured Collections</h2>
          <p className="text-center text-gray-600 max-w-3xl mx-auto mb-8">
            Explore our curated collections highlighting specific themes, periods, and artistic movements.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "African Masterpieces",
                image: "/images/IMG-20250314-WA0052.jpg",
                link: "/african",
              },
              {
                title: "Digital Revolution",
                image: "/images/IMG-20250314-WA0054.jpg",
                link: "/digital",
              },
              {
                title: "Niger Delta Heritage",
                image: "/images/nigerdelta.jpg",
                link: "/niger-delta",
              },
            ].map((collection, index) => (
              <Link key={index} href={collection.link} className="block group">
                <div className="relative h-64 rounded-lg overflow-hidden shadow-md">
                  <Image
                    src={collection.image}
                    alt={collection.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                    <h3 className="text-white text-xl font-bold p-6">{collection.title}</h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}