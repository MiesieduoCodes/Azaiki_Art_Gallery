"use client";
import Image from "next/image"
import { useState } from 'react';
import Link from "next/link"
import { Search, Filter } from "lucide-react"

// Sample artists data
const artists = [
  {
    id: 1,
    name: "Milicent Osumuo Onuegbu",
    specialty: "Contemporary , Abstract",
    country: "Nigeria",
    image: "/images/IMG-20250207-WA0018.jpg",
    featured: true,
    bio: "Millicent Osumuo Onuegbu is a Nigerian contemporary artist and artpreneur. Growing up in a home influenced by her father, a self-taught artist, Millicent's early exposure to art ignited her passion for painting and drawing. She honed her skills at the University of Uyo, Akwa-Ibom State, where she earned a Bachelor of Arts (BA) in Painting in 2002. In 2005, Millicent established Colourmimi Studio in Abuja, where she has continued her full-time artistic practice. Her work reflects her diverse life experiences and explores a range of themes, resulting in a vibrant and dynamic portfolio that has earned her numerous exhibitions, collaborations, and accolades. Millicent also pursued further business education, completing an Owner Manager Programme at the Lagos Business School in 2022 and currently studying Strategy and Innovation. This blend of artistic and business expertise allows her to approach her creative practice with a well-rounded perspective, strengthening her position as a leading contemporary artist and entrepreneur.",
  },
  {
    id: 2,
    name: "Kwame Osei",
    specialty: "Traditional African Art",
    country: "Ghana",
    image: "/placeholder.svg?height=400&width=400",
    featured: false,
    bio: "Kwame Osei draws inspiration from traditional Ghanaian art forms, creating pieces that bridge ancient techniques with contemporary themes.",
  },
  {
    id: 3,
    name: "Michael Chen",
    specialty: "Urban Landscapes",
    country: "United States",
    image: "/placeholder.svg?height=400&width=400",
    featured: false,
    bio: "Michael Chen's urban landscapes capture the energy and complexity of city life, using bold colors and dynamic compositions.",
  },
  {
    id: 4,
    name: "Amara Nwosu",
    specialty: "Mixed Media, Sculpture",
    country: "Nigeria",
    image: "/placeholder.svg?height=400&width=400",
    featured: false,
    bio: "Amara Nwosu creates powerful mixed media works and sculptures that explore themes of cultural heritage, diaspora, and identity.",
  },
  {
    id: 5,
    name: "Sophia Lee",
    specialty: "Digital Art",
    country: "South Korea",
    image: "/placeholder.svg?height=400&width=400",
    featured: false,
    bio: "Sophia Lee is at the forefront of digital art, creating immersive experiences that challenge our perception of reality and technology.",
  },
  {
    id: 6,
    name: "Carlos Mendez",
    specialty: "Sculpture, Installation",
    country: "Mexico",
    image: "/placeholder.svg?height=400&width=400",
    featured: false,
    bio: "Carlos Mendez's sculptures and installations explore the relationship between natural and built environments, often incorporating sustainable materials.",
  },
  {
    id: 7,
    name: "Tunde Adebayo",
    specialty: "Niger Delta Art",
    country: "Nigeria",
    image: "/placeholder.svg?height=400&width=400",
    featured: true,
    bio: "Tunde Adebayo's work documents the cultural and environmental landscape of the Niger Delta region through vibrant paintings and photography.",
  },
  {
    id: 8,
    name: "Sarah Johnson",
    specialty: "Contemporary, Portraiture",
    country: "United Kingdom",
    image: "/placeholder.svg?height=400&width=400",
    featured: false,
    bio: "Sarah Johnson's portraits capture the essence of her subjects through a contemporary lens, exploring themes of vulnerability and strength.",
  },
]

export default function Artists() {
  const [currentPage, setCurrentPage] = useState(1); // Track current page
  const itemsPerPage = 4; // Number of items to display per page

  // Calculate total number of pages
  const totalPages = Math.ceil(artists.length / itemsPerPage);

  // Get the items for the current page
  const currentArtists = artists.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-blue-700 text-white py-16">
        <div className="container-custom">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Featured Artists</h1>
          <p className="text-xl text-blue-100 max-w-3xl">
            Discover the talented artists whose works are showcased in our collections and exhibitions.
          </p>
        </div>
      </section>

      {/* Search and Filter
      <section className="py-8 bg-gray-50 border-b border-gray-200">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative flex-grow max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search artists by name..."
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex flex-wrap gap-3">
              <div className="flex items-center">
                <Filter size={18} className="mr-2 text-blue-700" />
                <span className="text-gray-700 font-medium">Filter by:</span>
              </div>

              <select className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
                <option value="">All Specialties</option>
                <option value="contemporary">Contemporary</option>
                <option value="african">African Art</option>
                <option value="digital">Digital Art</option>
                <option value="sculpture">Sculpture</option>
                <option value="mixed-media">Mixed Media</option>
              </select>

              <select className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
                <option value="">All Countries</option>
                <option value="spain">Spain</option>
                <option value="ghana">Ghana</option>
                <option value="nigeria">Nigeria</option>
                <option value="united-states">United States</option>
                <option value="south-korea">South Korea</option>
                <option value="mexico">Mexico</option>
                <option value="united-kingdom">United Kingdom</option>
              </select>
            </div>
          </div>
        </div>
      </section> */}

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
                      <Image src={artist.image || "/placeholder.svg"} alt={artist.name} fill className="object-cover" />
                      <div className="absolute top-0 right-0 bg-blue-700 text-white text-xs font-bold px-2 py-1">
                        Featured
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-blue-900 mb-1">{artist.name}</h3>
                      <p className="text-blue-700 mb-2">{artist.specialty}</p>
                      <p className="text-gray-600 text-sm mb-3">{artist.country}</p>
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
                    <Image src={artist.image || "/placeholder.svg"} alt={artist.name} fill className="object-cover" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-blue-900 mb-1">{artist.name}</h3>
                    <p className="text-blue-700 mb-2">{artist.specialty}</p>
                    <p className="text-gray-600 text-sm">{artist.country}</p>
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
  )
}

