"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { supabase } from "@/lib/supabase"
import { Plus, Search, Filter, Edit, Trash2, ChevronLeft, ChevronRight, Star, StarOff } from "lucide-react"
import type { Artist } from "@/lib/supabase"

export default function ArtistsManagement() {
  const [artists, setArtists] = useState<Artist[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [selectedCountry, setSelectedCountry] = useState<string>("")
  const [countries, setCountries] = useState<string[]>([])
  const itemsPerPage = 10

  useEffect(() => {
    async function fetchCountries() {
      const { data } = await supabase.from("artists").select("country").not("country", "is", null)

      if (data) {
        // Extract unique countries
        const uniqueCountries = [...new Set(data.map((item) => item.country).filter(Boolean))]
        setCountries(uniqueCountries)
      }
    }

    fetchCountries()
  }, [])

  useEffect(() => {
    async function fetchArtists() {
      setIsLoading(true)

      try {
        // Build query
        let query = supabase.from("artists").select("*").order("created_at", { ascending: false })

        // Apply filters
        if (searchQuery) {
          query = query.ilike("name", `%${searchQuery}%`)
        }

        if (selectedCountry) {
          query = query.eq("country", selectedCountry)
        }

        // Get count for pagination
        const { count } = await query.select("id", { count: "exact", head: true })
        setTotalPages(Math.ceil((count || 0) / itemsPerPage))

        // Get paginated data
        const from = (currentPage - 1) * itemsPerPage
        const to = from + itemsPerPage - 1

        const { data, error } = await query.range(from, to)

        if (error) {
          throw error
        }

        setArtists(data || [])
      } catch (error) {
        console.error("Error fetching artists:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchArtists()
  }, [searchQuery, currentPage, selectedCountry])

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this artist? This action cannot be undone.")) {
      return
    }

    try {
      const { error } = await supabase.from("artists").delete().eq("id", id)

      if (error) {
        throw error
      }

      // Remove from local state
      setArtists(artists.filter((artist) => artist.id !== id))
    } catch (error) {
      console.error("Error deleting artist:", error)
      alert("Failed to delete artist. Please try again.")
    }
  }

  const toggleFeatured = async (id: number, currentValue: boolean) => {
    try {
      const { error } = await supabase.from("artists").update({ featured: !currentValue }).eq("id", id)

      if (error) {
        throw error
      }

      // Update local state
      setArtists(artists.map((artist) => (artist.id === id ? { ...artist, featured: !currentValue } : artist)))
    } catch (error) {
      console.error("Error updating artist:", error)
      alert("Failed to update artist. Please try again.")
    }
  }

  return (
    <div>
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold text-gray-900 mb-4 sm:mb-0">Artists Management</h1>
        <Link
          href="/admin/artists/new"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add New Artist
        </Link>
      </div>

      {/* Filters */}
      <div className="mb-6 bg-white p-4 rounded-lg shadow">
        <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex-1">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search artists..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value)
                  setCurrentPage(1) // Reset to first page on new search
                }}
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Filter className="h-5 w-5 text-gray-400" />
            <select
              className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={selectedCountry}
              onChange={(e) => {
                setSelectedCountry(e.target.value)
                setCurrentPage(1) // Reset to first page on new filter
              }}
            >
              <option value="">All Countries</option>
              {countries.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Artists Table */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-700"></div>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Artist
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Specialty
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Country
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Featured
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {artists.length > 0 ? (
                    artists.map((artist) => (
                      <tr key={artist.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-10 w-10 flex-shrink-0">
                              <img
                                className="h-10 w-10 rounded-full object-cover"
                                src={artist.image_url || "/placeholder.svg?height=40&width=40"}
                                alt={artist.name}
                              />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{artist.name}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{artist.specialty || "Not specified"}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{artist.country || "Not specified"}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button
                            onClick={() => toggleFeatured(artist.id, artist.featured)}
                            className={`inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded ${
                              artist.featured
                                ? "text-amber-700 bg-amber-100 hover:bg-amber-200"
                                : "text-gray-700 bg-gray-100 hover:bg-gray-200"
                            }`}
                          >
                            {artist.featured ? (
                              <>
                                <Star className="h-4 w-4 mr-1" />
                                Featured
                              </>
                            ) : (
                              <>
                                <StarOff className="h-4 w-4 mr-1" />
                                Not Featured
                              </>
                            )}
                          </button>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-end space-x-2">
                            <Link href={`/admin/artists/${artist.id}`} className="text-blue-600 hover:text-blue-900">
                              <Edit className="h-5 w-5" />
                              <span className="sr-only">Edit</span>
                            </Link>
                            <button onClick={() => handleDelete(artist.id)} className="text-red-600 hover:text-red-900">
                              <Trash2 className="h-5 w-5" />
                              <span className="sr-only">Delete</span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500">
                        No artists found. Try adjusting your search or filters.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
                <div className="flex-1 flex justify-between sm:hidden">
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </div>
                <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm text-gray-700">
                      Showing <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> to{" "}
                      <span className="font-medium">
                        {Math.min(currentPage * itemsPerPage, totalPages * itemsPerPage)}
                      </span>{" "}
                      of <span className="font-medium">{totalPages * itemsPerPage}</span> results
                    </p>
                  </div>
                  <div>
                    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                      <button
                        onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                        disabled={currentPage === 1}
                        className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <span className="sr-only">Previous</span>
                        <ChevronLeft className="h-5 w-5" />
                      </button>

                      {/* Page numbers */}
                      {[...Array(totalPages)].map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setCurrentPage(i + 1)}
                          className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                            currentPage === i + 1
                              ? "z-10 bg-blue-50 border-blue-500 text-blue-600"
                              : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                          }`}
                        >
                          {i + 1}
                        </button>
                      ))}

                      <button
                        onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                        disabled={currentPage === totalPages}
                        className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <span className="sr-only">Next</span>
                        <ChevronRight className="h-5 w-5" />
                      </button>
                    </nav>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

