"use client";
import Image from "next/image"
import Link from "next/link"
import { useState } from 'react';
// import { Filter, Search } from "lucide-react"

// Sample gallery data
const galleryItems = [
  {
    id: 1,
    title: "Abstract Harmony",
    artist: "Elena Rodriguez",
    category: "Contemporary",
    image: "/placeholder.svg?height=600&width=800",
  },
  {
    id: 2,
    title: "Cultural Heritage",
    artist: "Kwame Osei",
    category: "African",
    image: "/placeholder.svg?height=600&width=800",
  },
  {
    id: 3,
    title: "Urban Landscape",
    artist: "Michael Chen",
    category: "Contemporary",
    image: "/placeholder.svg?height=600&width=800",
  },
  {
    id: 4,
    title: "Ancestral Wisdom",
    artist: "Amara Nwosu",
    category: "African",
    image: "/placeholder.svg?height=600&width=800",
  },
  {
    id: 5,
    title: "Digital Dreams",
    artist: "Sophia Lee",
    category: "Digital",
    image: "/placeholder.svg?height=600&width=800",
  },
  {
    id: 6,
    title: "Stone Expressions",
    artist: "Carlos Mendez",
    category: "Sculpture",
    image: "/placeholder.svg?height=600&width=800",
  },
  {
    id: 7,
    title: "River Life",
    artist: "Tunde Adebayo",
    category: "Niger Delta",
    image: "/placeholder.svg?height=600&width=800",
  },
  {
    id: 8,
    title: "Modern Reflections",
    artist: "Sarah Johnson",
    category: "Contemporary",
    image: "/placeholder.svg?height=600&width=800",
  },
  {
    id: 9,
    title: "Virtual Reality",
    artist: "Alex Kim",
    category: "Digital",
    image: "/placeholder.svg?height=600&width=800",
  },
  {
    id: 10,
    title: "Bronze Age",
    artist: "Isabella Martinez",
    category: "Sculpture",
    image: "/placeholder.svg?height=600&width=800",
  },
  {
    id: 11,
    title: "Coastal Traditions",
    artist: "Emmanuel Okon",
    category: "Niger Delta",
    image: "/placeholder.svg?height=600&width=800",
  },
  {
    id: 12,
    title: "Tribal Patterns",
    artist: "Ngozi Eze",
    category: "African",
    image: "/placeholder.svg?height=600&width=800",
  },
  {
    id: 13,
    title: "Golden Sunset",
    artist: "Liam Brown",
    category: "Contemporary",
    image: "/placeholder.svg?height=600&width=800",
  },
  {
    id: 14,
    title: "Desert Mirage",
    artist: "Fatima Al-Mansoori",
    category: "African",
    image: "/placeholder.svg?height=600&width=800",
  },
  {
    id: 15,
    title: "Cyber City",
    artist: "Hiroshi Tanaka",
    category: "Digital",
    image: "/placeholder.svg?height=600&width=800",
  },
  {
    id: 16,
    title: "Marble Elegance",
    artist: "Giovanni Rossi",
    category: "Sculpture",
    image: "/placeholder.svg?height=600&width=800",
  },
  {
    id: 17,
    title: "Mangrove Mysteries",
    artist: "Chinwe Okoro",
    category: "Niger Delta",
    image: "/placeholder.svg?height=600&width=800",
  },
  {
    id: 18,
    title: "Futuristic Visions",
    artist: "Emma Watson",
    category: "Digital",
    image: "/placeholder.svg?height=600&width=800",
  },
  {
    id: 19,
    title: "Ancient Relics",
    artist: "Ahmed Hassan",
    category: "Sculpture",
    image: "/placeholder.svg?height=600&width=800",
  },
  {
    id: 20,
    title: "Savannah Rhythms",
    artist: "Amina Diallo",
    category: "African",
    image: "/placeholder.svg?height=600&width=800",
  },
  {
    id: 21,
    title: "Ocean Depths",
    artist: "Marina Petrova",
    category: "Contemporary",
    image: "/placeholder.svg?height=600&width=800",
  },
  {
    id: 22,
    title: "Neon Dreams",
    artist: "Ryan Carter",
    category: "Digital",
    image: "/placeholder.svg?height=600&width=800",
  },
  {
    id: 23,
    title: "Clay Creations",
    artist: "Maria Gonzalez",
    category: "Sculpture",
    image: "/placeholder.svg?height=600&width=800",
  },
  {
    id: 24,
    title: "Delta Reflections",
    artist: "Obinna Nwankwo",
    category: "Niger Delta",
    image: "/placeholder.svg?height=600&width=800",
  },
];



export default function Gallery() {
  const [currentPage, setCurrentPage] = useState(1); // Track current page
  const itemsPerPage = 8; 

  // Calculate total number of pages
  const totalPages = Math.ceil(galleryItems.length / itemsPerPage);

  // Get the items for the current page
  const currentItems = galleryItems.slice(
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
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Art Gallery</h1>
          <p className="text-xl text-blue-100 max-w-3xl">
            Explore our extensive collection of artworks from various periods, styles, and cultures.
          </p>
        </div>
      </section>

      {/* Gallery Filters
      <section className="py-8 bg-gray-50 border-b border-gray-200">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative flex-grow max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search artworks, artists..."
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex flex-wrap gap-3">
              <div className="flex items-center">
                <Filter size={18} className="mr-2 text-blue-700" />
                <span className="text-gray-700 font-medium">Filter by:</span>
              </div>

              <select className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
                <option value="">All Categories</option>
                <option value="contemporary">Contemporary</option>
                <option value="african">African</option>
                <option value="digital">Digital</option>
                <option value="sculpture">Sculpture</option>
                <option value="niger-delta">Niger Delta</option>
              </select>

              <select className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
                <option value="">All Artists</option>
                <option value="elena-rodriguez">Elena Rodriguez</option>
                <option value="kwame-osei">Kwame Osei</option>
                <option value="michael-chen">Michael Chen</option>
                <option value="amara-nwosu">Amara Nwosu</option>
                <option value="sophia-lee">Sophia Lee</option>
              </select>
            </div>
          </div>
        </div>
      </section> */}

    {/* Gallery Grid */}
    <section className="py-12">
        <div className="container-custom">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {currentItems.map((item) => (
              <div key={item.id} className="group">
                <Link href={`/gallery/${item.id}`} className="block">
                  <div className="relative overflow-hidden rounded-lg shadow-md aspect-square">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                        <h3 className="text-lg font-bold">{item.title}</h3>
                        <p className="text-sm text-gray-200">{item.artist}</p>
                        <span className="inline-block mt-2 text-xs bg-blue-700 px-2 py-1 rounded-full">
                          {item.category}
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
                image: "/placeholder.svg?height=400&width=600",
                link: "/african",
              },
              {
                title: "Digital Revolution",
                image: "/placeholder.svg?height=400&width=600",
                link: "/digital",
              },
              {
                title: "Niger Delta Heritage",
                image: "/placeholder.svg?height=400&width=600",
                link: "/niger-delta",
              },
            ].map((collection, index) => (
              <Link key={index} href={collection.link} className="block group">
                <div className="relative h-64 rounded-lg overflow-hidden shadow-md">
                  <Image
                    src={collection.image || "/placeholder.svg"}
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
  )
}

