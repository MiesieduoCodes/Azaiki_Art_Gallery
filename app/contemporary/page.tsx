import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

// Sample contemporary art data
const contemporaryArtworks = [
  {
    id: 1,
    title: "Abstract Harmony",
    artist: "Elena Rodriguez",
    period: "2022",
    image: "/placeholder.svg?height=600&width=800",
    description: "This vibrant abstract piece explores the harmony between color and form.",
  },
  {
    id: 8,
    title: "Modern Reflections",
    artist: "Sarah Johnson",
    period: "2021",
    image: "/placeholder.svg?height=600&width=800",
    description: "A contemplative exploration of modern identity through reflective surfaces.",
  },
  {
    id: 3,
    title: "Urban Landscape",
    artist: "Michael Chen",
    period: "2023",
    image: "/placeholder.svg?height=600&width=800",
    description: "A vibrant depiction of city life with dynamic composition and bold colors.",
  },
  {
    id: 12,
    title: "Fragmented Reality",
    artist: "Olivia Martinez",
    period: "2020",
    image: "/placeholder.svg?height=600&width=800",
    description: "An examination of how reality is perceived through fragmented experiences.",
  },
  {
    id: 15,
    title: "Emotional Geometry",
    artist: "David Kim",
    period: "2022",
    image: "/placeholder.svg?height=600&width=800",
    description: "Geometric shapes conveying complex emotional states through color and form.",
  },
  {
    id: 18,
    title: "Digital Dystopia",
    artist: "Alex Wong",
    period: "2023",
    image: "/placeholder.svg?height=600&width=800",
    description: "A commentary on technology's impact on society through contemporary painting.",
  },
]

// Sample themes data
const themes = [
  {
    name: "Abstract Expressionism",
    image: "/placeholder.svg?height=400&width=600",
    description: "Exploring emotion and spontaneity through non-representational forms.",
  },
  {
    name: "Minimalism",
    image: "/placeholder.svg?height=400&width=600",
    description: "Stripping art down to its fundamental features and core essence.",
  },
  {
    name: "Pop Art",
    image: "/placeholder.svg?height=400&width=600",
    description: "Celebrating popular culture and challenging traditional fine art distinctions.",
  },
  {
    name: "Conceptual Art",
    image: "/placeholder.svg?height=400&width=600",
    description: "Prioritizing ideas and concepts over traditional aesthetic concerns.",
  },
]

export default function ContemporaryArt() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative bg-blue-700 text-white py-20">
        <div className="absolute inset-0 opacity-20 bg-[url('/placeholder.svg?height=1080&width=1920')] bg-cover bg-center"></div>
        <div className="container-custom relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Contemporary Art Collection</h1>
            <p className="text-xl text-blue-100 mb-6">
              Discover bold expressions from today's most innovative artists pushing the boundaries of traditional art
              forms.
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
                Our Contemporary Art Collection showcases the diverse and innovative approaches of artists working
                today. From abstract expressionism to digital art, this collection represents the cutting edge of
                artistic expression.
              </p>
              <p className="text-gray-700 mb-4">
                Contemporary art reflects our rapidly changing world, addressing themes of technology, identity,
                globalization, and environmental concerns. These artists use both traditional and experimental
                techniques to create works that challenge and inspire.
              </p>
              <p className="text-gray-700">
                Through this collection, we aim to support living artists and provide a platform for emerging voices in
                the art world, fostering dialogue about the role of art in contemporary society.
              </p>
            </div>
            <div className="relative h-96 rounded-lg overflow-hidden shadow-lg">
              <Image
                src="/placeholder.svg?height=800&width=1200"
                alt="Contemporary art exhibition"
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
          <h2 className="section-title text-center mb-12">Featured Artworks</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {contemporaryArtworks.slice(0, 3).map((artwork) => (
              <div
                key={artwork.id}
                className="bg-white rounded-lg overflow-hidden shadow-md transition-transform hover:shadow-lg hover:-translate-y-1"
              >
                <div className="relative h-64">
                  <Image src={artwork.image || "/placeholder.svg"} alt={artwork.title} fill className="object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-blue-900 mb-1">{artwork.title}</h3>
                  <p className="text-blue-700 mb-1">{artwork.artist}</p>
                  <p className="text-gray-600 text-sm mb-3">{artwork.period}</p>
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
              View All Contemporary Artworks
            </Link>
          </div>
        </div>
      </section>

      {/* Themes */}
      <section className="py-16">
        <div className="container-custom">
          <h2 className="section-title text-center mb-4">Explore by Theme</h2>
          <p className="text-center text-gray-600 max-w-3xl mx-auto mb-12">
            Discover the diverse approaches and movements within contemporary art.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {themes.map((theme, index) => (
              <Link
                key={index}
                href={`/contemporary/${theme.name.toLowerCase().replace(/\s+/g, "-")}`}
                className="group"
              >
                <div className="flex flex-col md:flex-row bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                  <div className="md:w-2/5 relative h-64 md:h-auto">
                    <Image src={theme.image || "/placeholder.svg"} alt={theme.name} fill className="object-cover" />
                  </div>
                  <div className="md:w-3/5 p-6">
                    <h3 className="text-xl font-bold text-blue-900 mb-2">{theme.name}</h3>
                    <p className="text-gray-700 mb-4">{theme.description}</p>
                    <span className="text-blue-700 font-medium flex items-center group-hover:text-blue-800">
                      Explore Theme{" "}
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Collection Highlights */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <h2 className="section-title text-center mb-12">Collection Highlights</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {contemporaryArtworks.slice(3, 6).map((artwork) => (
              <div key={artwork.id} className="bg-white rounded-lg overflow-hidden shadow-md">
                <div className="relative h-64">
                  <Image src={artwork.image || "/placeholder.svg"} alt={artwork.title} fill className="object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-blue-900 mb-1">{artwork.title}</h3>
                  <p className="text-blue-700 mb-1">{artwork.artist}</p>
                  <p className="text-gray-600 text-sm mb-3">{artwork.period}</p>
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
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Featured Contemporary Artists</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                name: "Elena Rodriguez",
                specialty: "Abstract Expressionism",
                country: "Spain",
                image: "/placeholder.svg?height=400&width=400",
              },
              {
                name: "Sarah Johnson",
                specialty: "Mixed Media",
                country: "United Kingdom",
                image: "/placeholder.svg?height=400&width=400",
              },
              {
                name: "Michael Chen",
                specialty: "Urban Landscapes",
                country: "United States",
                image: "/placeholder.svg?height=400&width=400",
              },
              {
                name: "Olivia Martinez",
                specialty: "Conceptual Art",
                country: "Mexico",
                image: "/placeholder.svg?height=400&width=400",
              },
            ].map((artist, index) => (
              <Link key={index} href={`/artists/${artist.name.toLowerCase().replace(/\s+/g, "-")}`} className="group">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg overflow-hidden hover:bg-white/20 transition-colors">
                  <div className="relative h-64">
                    <Image src={artist.image || "/placeholder.svg"} alt={artist.name} fill className="object-cover" />
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

      {/* Educational Resources */}
      <section className="py-16">
        <div className="container-custom">
          <h2 className="section-title text-center mb-4">Educational Resources</h2>
          <p className="text-center text-gray-600 max-w-3xl mx-auto mb-12">
            Deepen your understanding of contemporary art with our educational resources and programs.
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
              <h3 className="text-lg font-semibold text-blue-900 mb-2">Artist Talks</h3>
              <p className="text-gray-700 mb-4">
                Join our regular artist talks where contemporary artists discuss their work, process, and inspirations.
              </p>
              <Link href="/events" className="text-blue-700 font-medium hover:text-blue-800">
                View Schedule
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
              <h3 className="text-lg font-semibold text-blue-900 mb-2">Documentary Series</h3>
              <p className="text-gray-700 mb-4">
                Watch our documentary series exploring contemporary art movements and their cultural impact.
              </p>
              <Link href="/resources/videos" className="text-blue-700 font-medium hover:text-blue-800">
                Watch Videos
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
              <h3 className="text-lg font-semibold text-blue-900 mb-2">Art Workshops</h3>
              <p className="text-gray-700 mb-4">
                Participate in hands-on workshops led by contemporary artists, exploring modern techniques and concepts.
              </p>
              <Link href="/events/workshops" className="text-blue-700 font-medium hover:text-blue-800">
                Register for Workshops
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

