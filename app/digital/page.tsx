"use client";

import { useState, useEffect } from "react";
import { ref, get } from "firebase/database";
import { database } from "@/lib/firebase/config"; // Import the initialized database
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface Artwork {
  id: string;
  title: string;
  artist: string;
  technique: string;
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
}

export default function DigitalArt() {
  const [digitalArtworks, setDigitalArtworks] = useState<Artwork[]>([]);
  const [digitalArtists, setDigitalArtists] = useState<Artist[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const artworksRef = ref(database, "artworks"); // Reference to the "artworks" node
      const artistsRef = ref(database, "artists"); // Reference to the "artists" node

      try {
        // Fetch artworks
        const artworksSnapshot = await get(artworksRef);
        if (artworksSnapshot.exists()) {
          const artworksData = artworksSnapshot.val();
          const fetchedArtworks = Object.entries(artworksData)
            .map(([id, artwork]: [string, any]) => ({
              id,
              title: artwork.title || "",
              artist: artwork.artist || "Unknown Artist",
              technique: artwork.medium || "",
              period: artwork.year || "",
              imageUrl: artwork.image || "/placeholder.svg",
              description: artwork.description || "",
              category: artwork.category || "",
            }))
            .filter((artwork) => artwork.category === "Digital"); // Filter for Digital artworks
          setDigitalArtworks(fetchedArtworks);
        } else {
          console.log("No artworks found.");
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
            }))
            .filter((artist) => artist.specialty.includes("Digital Art")); // Filter for Digital artists
          setDigitalArtists(fetchedArtists);
        } else {
          console.log("No artists found.");
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
      <section className="relative bg-blue-700 text-white pt-36 pb-10">
        <div className="absolute inset-0 opacity-20 bg-[url('/images/IMG-20250314-WA0025.jpg')] bg-cover bg-center"></div>
        <div className="container-custom relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Digital Art Collection</h1>
            <p className="text-xl text-blue-100 mb-6">
              Explore innovative works at the intersection of art and technology, from digital paintings to immersive
              installations.
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
                Our Digital Art Collection showcases works created with digital technologies, representing the cutting
                edge of contemporary artistic practice. From digital paintings and 3D renderings to interactive
                installations and AI-generated art, this collection explores how technology is transforming artistic
                expression.
              </p>
              <p className="text-gray-700 mb-4">
                Digital art challenges traditional notions of materiality and permanence, often existing in virtual
                spaces or as ephemeral experiences. These works engage with themes of technology, virtuality, data, and
                the increasingly blurred boundaries between physical and digital realms.
              </p>
              <p className="text-gray-700">
                Through this collection, we aim to highlight the innovative ways artists are using new technologies to
                create meaningful aesthetic experiences and comment on our rapidly evolving digital culture.
              </p>
            </div>
            <div className="relative h-96 rounded-lg overflow-hidden shadow-lg">
              <Image
                src="/images/IMG-20250314-WA0037.jpg"
                alt="Digital art exhibition"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Artworks */}
      <section id="featured" className="py-16 bg-gray-50">
        <div className="container-custom">
          <h2 className="section-title text-center mb-12">Featured Digital Artworks</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {digitalArtworks.slice(0, 3).map((artwork) => (
              <div
                key={artwork.id}
                className="bg-white rounded-lg overflow-hidden shadow-md transition-transform hover:shadow-lg hover:-translate-y-1"
              >
                <div className="relative h-64">
                  <Image src={artwork.imageUrl} alt={artwork.title} fill className="object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-blue-900 mb-1">{artwork.title}</h3>
                  <p className="text-blue-700 mb-1">{artwork.artist}</p>
                  <p className="text-gray-600 text-sm mb-3">
                    {artwork.technique}, {artwork.period}
                  </p>
                  <p className="text-gray-700 mb-4">{artwork.description}</p>
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
            <Link href="/gallery" className="btn-primary">
              View All Digital Artworks
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Digital Artists */}
      <section className="py-16 bg-blue-700 text-white">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Featured Digital Artists</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {digitalArtists.map((artist) => (
              <Link key={artist.id} href={`/artists/${artist.name.toLowerCase().replace(/\s+/g, "-")}`} className="group">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg overflow-hidden hover:bg-white/20 transition-colors">
                  <div className="relative h-64">
                    <Image src={artist.imageUrl} alt={artist.name} fill className="object-cover" />
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
            <Link href="/artists" className="btn-primary bg-white text-blue-700 hover:bg-blue-50">
              View All Artists
            </Link>
          </div>
        </div>
      </section>

      {/* Interactive Experiences */}
      <section className="py-16">
        <div className="container-custom">
          <h2 className="section-title text-center mb-4">Interactive Experiences</h2>
          <p className="text-center text-gray-600 max-w-3xl mx-auto mb-12">
            Experience digital art through our interactive installations and virtual exhibitions.
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
                    d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-blue-900 mb-2">Virtual Gallery</h3>
              <p className="text-gray-700 mb-4">
                Explore our digital art collection in an immersive 3D virtual gallery environment.
              </p>
              <Link href="/digital/virtual-gallery" className="text-blue-700 font-medium hover:text-blue-800">
                Enter Virtual Gallery
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
                    d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-blue-900 mb-2">AR Exhibitions</h3>
              <p className="text-gray-700 mb-4">
                Download our app to view augmented reality exhibitions in your own space.
              </p>
              <Link href="/digital/ar-app" className="text-blue-700 font-medium hover:text-blue-800">
                Get AR App
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
                    d="M6 13.5V3.75m0 9.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 3.75V16.5m12-3V3.75m0 9.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 3.75V16.5m-6-9V3.75m0 3.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 9.75V10.5"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-blue-900 mb-2">Interactive Installations</h3>
              <p className="text-gray-700 mb-4">
                Visit our museum to experience our interactive digital art installations in person.
              </p>
              <Link href="/visit" className="text-blue-700 font-medium hover:text-blue-800">
                Plan Your Visit
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}