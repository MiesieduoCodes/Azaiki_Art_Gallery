"use client";

import { useState, useEffect } from "react";
import { ref, onValue } from "firebase/database"; // Use Realtime Database methods
import { database } from "@/lib/firebase/config"; // Import the initialized database
import Image from "next/image";
import Link from "next/link";
import { Search, Filter } from "lucide-react";

interface Artist {
  id: string;
  name: string;
  bio: string;
  nationality: string;
  imageUrl: string;
  specialty?: string;
  featured?: boolean;
}

export default function ArtistsPage() {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  useEffect(() => {
    const fetchArtists = () => {
      const artistsRef = ref(database, "artists"); // Reference to the "artists" node in Realtime Database

      // Listen for changes in the "artists" node
      onValue(artistsRef, (snapshot) => {
        const data = snapshot.val(); // Get the data from the snapshot
        if (data) {
          // Convert the nested object into an array of artists
          const fetchedArtists = Object.keys(data).map((key) => ({
            id: key,
            name: data[key].name || "",
            bio: data[key].bio || "",
            nationality: data[key].country || "", // Assuming "country" is the field in your database
            imageUrl: data[key].image || "/placeholder.svg",
            specialty: data[key].specialty || "",
            featured: data[key].featured || false,
          }));
          setArtists(fetchedArtists);
        }
        setIsLoading(false);
      }, (error) => {
        console.error("Error fetching artists:", error);
        setIsLoading(false);
      });
    };

    fetchArtists();
  }, []);

  const totalPages = Math.ceil(artists.length / itemsPerPage);
  const currentArtists = artists.slice(
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
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Artists</h1>
            <p className="text-xl text-blue-100 max-w-3xl">
              Discover the talented artists whose works are showcased in our collections and exhibitions.
            </p>
          </div>
        </section>

        {/* Loading Skeleton */}
        <div className="container-custom py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white rounded-lg overflow-hidden shadow-md">
                <div className="relative h-64 bg-gray-200 animate-pulse" />
                <div className="p-6">
                  <div className="h-6 bg-gray-200 rounded animate-pulse mb-2" />
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4 mb-2" />
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2" />
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
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Featured Artists</h1>
          <p className="text-xl text-blue-100 max-w-3xl">
            Discover the talented artists whose works are showcased in our collections and exhibitions.
          </p>
        </div>
      </section>

      {/* Featured Artists */}
      <section className="py-12">
        <div className="container-custom">
          <h2 className="section-subtitle mb-8">Featured Artists</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {artists
              .filter((artist) => artist.featured)
              .map((artist) => (
                <Link key={artist.id} href={`/artists/${artist.id}`} className="group">
                  <div className="bg-white rounded-lg overflow-hidden shadow-md transition-transform hover:shadow-lg hover:-translate-y-1">
                    <div className="relative h-64">
                      <Image
                        src={artist.imageUrl}
                        alt={artist.name}
                        fill
                        className="object-cover"
                      />
                      {artist.featured && (
                        <div className="absolute top-0 right-0 bg-blue-700 text-white text-xs font-bold px-2 py-1">
                          Featured
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-blue-900 mb-1">{artist.name}</h3>
                      <p className="text-blue-700 mb-2">{artist.specialty}</p>
                      <p className="text-gray-600 text-sm mb-3">{artist.nationality}</p>
                      <p className="text-gray-700 text-sm line-clamp-3">{artist.bio}</p>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </section>

      {/* All Artists */}
      <section className="py-12 bg-gray-50">
        <div className="container-custom">
          <h2 className="section-subtitle mb-8">All Artists</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {currentArtists.map((artist) => (
              <Link key={artist.id} href={`/artists/${artist.id}`} className="group">
                <div className="bg-white rounded-lg overflow-hidden shadow-md transition-transform hover:shadow-lg hover:-translate-y-1">
                  <div className="relative h-64">
                    <Image
                      src={artist.imageUrl}
                      alt={artist.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-blue-900 mb-1">{artist.name}</h3>
                    <p className="text-blue-700 mb-2">{artist.specialty}</p>
                    <p className="text-gray-600 text-sm">{artist.nationality}</p>
                  </div>
                </div>
              </Link>
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

      {/* Become an Artist */}
      <section className="py-16 bg-blue-700 text-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Are You an Artist?</h2>
            <p className="text-xl text-blue-100 mb-8">
              We're always looking for new talent to showcase in our gallery. If you're interested in exhibiting your
              work, we'd love to hear from you.
            </p>
            <Link href="/contact" className="btn-primary bg-white text-blue-700 hover:bg-blue-50">
              Submit Your Portfolio
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}