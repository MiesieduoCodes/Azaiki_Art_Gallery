"use client";

import { useState, useEffect } from "react";
import { ref, get } from "firebase/database";
import { database } from "@/lib/firebase/config";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface Artwork {
  id: string;
  title: string;
  artist: string;
  material: string;
  period: string;
  imageUrl: string;
  description: string;
  category: string;
}

interface Artist {
  id: string;
  name: string;
  specialty: string;
  country: string;
  imageUrl: string;
  featured: boolean;
  bio: string;
  category: string;
}

export default function SculpturesCollection() {
  const [sculptureArtworks, setSculptureArtworks] = useState<Artwork[]>([]);
  const [sculptureArtists, setSculptureArtists] = useState<Artist[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const artworksRef = ref(database, "artworks");
      const artistsRef = ref(database, "artists");

      try {
        // Fetch artworks
        const artworksSnapshot = await get(artworksRef);
        if (artworksSnapshot.exists()) {
          const artworksData = artworksSnapshot.val();
          const fetchedArtworks = Object.entries(artworksData)
            .map(([id, artwork]: [string, any]) => ({
              id,
              title: artwork.title || "Untitled Sculpture",
              artist: artwork.artist || "Unknown Artist",
              material: artwork.material || "Unknown Material",
              period: artwork.year || "Unknown Period",
              imageUrl: artwork.image || "/placeholder.svg",
              description: artwork.description || "No description available",
              category: artwork.category || "",
            }))
            .filter((artwork) => artwork.category === "Sculpture");
          setSculptureArtworks(fetchedArtworks);
        }

        // Fetch artists
        const artistsSnapshot = await get(artistsRef);
        if (artistsSnapshot.exists()) {
          const artistsData = artistsSnapshot.val();
          const fetchedArtists = Object.entries(artistsData)
            .map(([id, artist]: [string, any]) => ({
              id,
              name: artist.name || "Unknown Artist",
              specialty: artist.specialty || "",
              country: artist.country || "",
              imageUrl: artist.image || "/placeholder.svg",
              featured: artist.featured || false,
              bio: artist.bio || "",
              category: artist.category || "",
            }))
            .filter((artist) => artist.specialty.includes("Sculptures") || artist.category === "Sculptures");
          setSculptureArtists(fetchedArtists);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-700"></div>
        <span className="ml-2">Loading...</span>
      </div>
    );
  }

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative bg-blue-500 text-white pb-10 pt-36">
        <div className="absolute inset-0 opacity-20 bg-[url('https://iili.io/3TDq1dx.jpg')] bg-cover bg-center"></div>
        <div className="container-custom relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Sculpture Collection</h1>
            <p className="text-xl text-blue-100 mb-6">
              Explore three-dimensional masterpieces from classical to modern, showcasing diverse materials and
              techniques.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="#featured" className="btn-primary bg-white text-blue-700 hover:bg-blue-50">
                Explore Collection
              </Link>
              <Link href="/gallery" className="btn-outline border-white text-white hover:bg-blue-800">
                View All Artworks
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="section-title">About the Collection</h2>
              <p className="text-gray-700 mb-4">
                Our Sculpture Collection celebrates the art of three-dimensional form across various materials,
                techniques, and time periods. From classical marble statues to contemporary mixed-media installations,
                this collection showcases the evolution of sculptural practice.
              </p>
              <p className="text-gray-700 mb-4">
                Sculpture has a unique ability to engage with physical space, inviting viewers to experience art from
                multiple perspectives. The works in this collection explore themes of form, balance, texture, and the
                relationship between object and environment.
              </p>
              <p className="text-gray-700">
                Through this diverse collection, we aim to highlight the tactile nature of sculpture and its power to
                transform spaces and evoke emotional responses through physical presence.
              </p>
            </div>
            <div className="relative h-96 rounded-lg overflow-hidden shadow-lg">
              <Image
                src="https://iili.io/3TDFc0v.jpg"
                alt="Sculpture exhibition"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Artworks */}
      <section id="featured" className="py-16 bg-gray-50">
        <div className="container-custom">
          <h2 className="section-title text-center mb-12">Featured Artworks</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sculptureArtworks.slice(0, 3).map((artwork) => (
              <div
                key={artwork.id}
                className="bg-white rounded-lg overflow-hidden shadow-md transition-transform hover:shadow-lg hover:-translate-y-1"
              >
                <div className="relative h-64">
                  <Image 
                    src={artwork.imageUrl} 
                    alt={artwork.title} 
                    fill 
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-blue-900 mb-1">{artwork.title}</h3>
                  <p className="text-blue-700 mb-1">{artwork.artist}</p>
                  <p className="text-gray-600 text-sm mb-3">
                    {artwork.material}, {artwork.period}
                  </p>
                  <p className="text-gray-700 mb-4 line-clamp-3">{artwork.description}</p>
                  <Link
                    href={`/gallery/${artwork.id}`}
                    className="text-blue-700 font-medium flex items-center hover:text-blue-800"
                  >
                    View Details <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link href="/gallery?category=Sculpture" className="btn-primary">
              View All Sculptures
            </Link>
          </div>
        </div>
      </section>

      {/* Collection Highlights */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <h2 className="section-title text-center mb-12">Collection Highlights</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {sculptureArtworks.slice(3, 6).map((artwork) => (
              <div key={artwork.id} className="bg-white rounded-lg overflow-hidden shadow-md">
                <div className="relative h-64">
                  <Image 
                    src={artwork.imageUrl} 
                    alt={artwork.title} 
                    fill 
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-blue-900 mb-1">{artwork.title}</h3>
                  <p className="text-blue-700 mb-1">{artwork.artist}</p>
                  <p className="text-gray-600 text-sm mb-3">
                    {artwork.material}, {artwork.period}
                  </p>
                  <Link
                    href={`/gallery/${artwork.id}`}
                    className="text-blue-700 font-medium flex items-center hover:text-blue-800"
                  >
                    View Details <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Artists */}
      <section className="py-16 bg-blue-700 text-white">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Featured Sculpture Artists</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {sculptureArtists.map((artist) => (
              <Link 
                key={artist.id} 
                href={`/artists/${artist.name.toLowerCase().replace(/\s+/g, "-")}`} 
                className="group"
              >
                <div className="bg-white/10 backdrop-blur-sm rounded-lg overflow-hidden hover:bg-white/20 transition-colors">
                  <div className="relative h-64">
                    <Image 
                      src={artist.imageUrl} 
                      alt={artist.name} 
                      fill 
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    />
                  </div>
                  <div className="p-6 text-white">
                    <h3 className="text-xl font-bold mb-1">{artist.name}</h3>
                    <p className="text-blue-200 mb-1">{artist.specialty}</p>
                    <p className="text-blue-100 text-sm">{artist.country}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link href="/artists?category=Sculpture" className="btn-primary bg-white text-blue-700 hover:bg-blue-50">
              View All Artists
            </Link>
          </div>
        </div>
      </section>

      {/* Educational Resources */}
      <section className="py-16">
        <div className="container-custom">
          <h2 className="section-title text-center mb-4">Educational Resources</h2>
          <p className="text-center text-gray-600 max-w-3xl mx-auto mb-12">
            Deepen your understanding of sculptural art with our educational resources and programs.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-8 h-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-blue-900 mb-2">Sculpture Techniques</h3>
              <p className="text-gray-700 mb-4">
                Learn about different sculptural techniques from carving to casting through our comprehensive guides.
              </p>
              <Link href="/resources/techniques" className="text-blue-700 font-medium hover:text-blue-800">
                View Guides
              </Link>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-8 h-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-blue-900 mb-2">Sculptor Interviews</h3>
              <p className="text-gray-700 mb-4">
                Watch our exclusive interviews with renowned sculptors discussing their process and inspiration.
              </p>
              <Link href="/resources/interviews" className="text-blue-700 font-medium hover:text-blue-800">
                Watch Interviews
              </Link>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-8 h-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-blue-900 mb-2">Sculpture Workshops</h3>
              <p className="text-gray-700 mb-4">
                Join our hands-on sculpture workshops where you can learn various techniques from professional artists.
              </p>
              <Link href="/events/workshops" className="text-blue-700 font-medium hover:text-blue-800">
                Register for Workshops
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}