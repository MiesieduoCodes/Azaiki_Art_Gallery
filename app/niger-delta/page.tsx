import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

// Sample Niger Delta art data
const nigerDeltaArtworks = [
  {
    id: 7,
    title: "River Life",
    artist: "Tunde Adebayo",
    medium: "Oil on canvas",
    period: "2021",
    image: "/placeholder.svg?height=600&width=800",
    description: "A vibrant depiction of daily life along the Niger Delta waterways.",
  },
  {
    id: 11,
    title: "Coastal Traditions",
    artist: "Emmanuel Okon",
    medium: "Mixed media",
    period: "2020",
    image: "/placeholder.svg?height=600&width=800",
    description: "An exploration of traditional practices in coastal Niger Delta communities.",
  },
  {
    id: 16,
    title: "Environmental Impact",
    artist: "Ngozi Eze",
    medium: "Photography",
    period: "2022",
    image: "/placeholder.svg?height=600&width=800",
    description: "A photographic series documenting environmental challenges in the Niger Delta region.",
  },
  {
    id: 19,
    title: "Cultural Heritage",
    artist: "Blessing Okoye",
    medium: "Textile art",
    period: "2021",
    image: "/placeholder.svg?height=600&width=800",
    description: "Traditional patterns and symbols from Niger Delta cultures reimagined in textile form.",
  },
  {
    id: 22,
    title: "Mangrove Rhythms",
    artist: "David Ekpo",
    medium: "Acrylic on canvas",
    period: "2023",
    image: "/placeholder.svg?height=600&width=800",
    description: "Abstract patterns inspired by the mangrove ecosystems of the Niger Delta.",
  },
  {
    id: 25,
    title: "Voices of Resistance",
    artist: "Amara Nwosu",
    medium: "Mixed media installation",
    period: "2022",
    image: "/placeholder.svg?height=600&width=800",
    description: "An installation exploring themes of resistance and resilience in Niger Delta communities.",
  },
]

// Sample themes data
const themes = [
  {
    name: "Cultural Heritage",
    image: "/images/Culture.jpg",
    description: "Artworks celebrating the rich cultural traditions of Niger Delta communities.",
  },
  {
    name: "Environmental Concerns",
    image: "/images/Environment.jpg",
    description: "Works addressing environmental challenges and conservation in the region.",
  },
  {
    name: "Contemporary Life",
    image: "/images/Evolve.jpg",
    description: "Depictions of modern life and social dynamics in the Niger Delta.",
  },
  {
    name: "Traditional Crafts",
    image: "/images/Final.jpg",
    description: "Art inspired by and incorporating traditional craft techniques from the region.",
  },
]

export default function NigerDeltaArt() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative bg-blue-500 text-white py-20">
        <div className="absolute inset-0 opacity-20 bg-[url('/images/nigerdelta.jpg')] bg-cover bg-center"></div>
        <div className="container-custom relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Niger Delta Art Collection</h1>
            <p className="text-xl text-blue-100 mb-6">
              Discover the vibrant artistic expressions from the Niger Delta region, showcasing its rich cultural
              heritage and contemporary voices.
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
                Our Niger Delta Art Collection celebrates the artistic expressions from this culturally rich and
                environmentally diverse region of Nigeria. From traditional crafts to contemporary paintings and
                photography, this collection showcases the unique perspectives of artists from the Niger Delta.
              </p>
              <p className="text-gray-700 mb-4">
                The Niger Delta region has a complex history and faces significant environmental challenges due to oil
                extraction. Many artists from this region engage with these social and ecological issues, creating works
                that document, critique, and imagine alternative futures for their communities.
              </p>
              <p className="text-gray-700">
                Through this collection, we aim to amplify the voices of Niger Delta artists and promote greater
                understanding of this region's cultural richness, environmental significance, and contemporary
                challenges.
              </p>
            </div>
            <div className="relative h-96 rounded-lg overflow-hidden shadow-lg">
              <Image
                src="/images/SideNigerdelta.jpg"
                alt="Niger Delta art exhibition"
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
            {nigerDeltaArtworks.slice(0, 3).map((artwork) => (
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
                  <p className="text-gray-600 text-sm mb-3">
                    {artwork.medium}, {artwork.period}
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
              View All Niger Delta Artworks
            </Link>
          </div>
        </div>
      </section>

      {/* Themes */}
      <section className="py-16">
        <div className="container-custom">
          <h2 className="section-title text-center mb-4">Explore by Theme</h2>
          <p className="text-center text-gray-600 max-w-3xl mx-auto mb-12">
            Discover the diverse themes and subjects explored by Niger Delta artists.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {themes.map((theme, index) => (
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
            ))}
          </div>
        </div>
      </section>

      {/* Collection Highlights */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <h2 className="section-title text-center mb-12">Collection Highlights</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {nigerDeltaArtworks.slice(3, 6).map((artwork) => (
              <div key={artwork.id} className="bg-white rounded-lg overflow-hidden shadow-md">
                <div className="relative h-64">
                  <Image src={artwork.image || "/placeholder.svg"} alt={artwork.title} fill className="object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-blue-900 mb-1">{artwork.title}</h3>
                  <p className="text-blue-700 mb-1">{artwork.artist}</p>
                  <p className="text-gray-600 text-sm mb-3">
                    {artwork.medium}, {artwork.period}
                  </p>
                  <p
                    className="text-blue-700 font-medium flex items-center hover:text-blue-800"
                  >
                    View Details <ArrowRight className="ml-2 h-4 w-4" />
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Artists */}
      <section className="py-16 bg-blue-700 text-white">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Featured Niger Delta Artists</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                name: "Tunde Adebayo",
                specialty: "Painting",
                country: "Nigeria",
                image: "/placeholder.svg?height=400&width=400",
              },
              {
                name: "Emmanuel Okon",
                specialty: "Mixed Media",
                country: "Nigeria",
                image: "/placeholder.svg?height=400&width=400",
              },
              {
                name: "Ngozi Eze",
                specialty: "Photography",
                country: "Nigeria",
                image: "/placeholder.svg?height=400&width=400",
              },
              {
                name: "Blessing Okoye",
                specialty: "Textile Art",
                country: "Nigeria",
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

      {/* Cultural Context */}
      <section className="py-16">
        <div className="container-custom">
          <h2 className="section-title text-center mb-4">Cultural Context</h2>
          <p className="text-center text-gray-600 max-w-3xl mx-auto mb-12">
            Learn about the cultural and historical context of Niger Delta art.
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
                    d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-blue-900 mb-2">Historical Background</h3>
              <p className="text-gray-700 mb-4">
                Explore the rich history and cultural traditions that inform Niger Delta artistic expressions.
              </p>
              <Link href="/resources/niger-delta-history" className="text-blue-700 font-medium hover:text-blue-800">
                Learn More
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
                    d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-blue-900 mb-2">Community Voices</h3>
              <p className="text-gray-700 mb-4">
                Listen to interviews with Niger Delta artists and community members about their artistic traditions.
              </p>
              <Link href="/resources/community-voices" className="text-blue-700 font-medium hover:text-blue-800">
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
                    d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-blue-900 mb-2">Environmental Context</h3>
              <p className="text-gray-700 mb-4">
                Understand the environmental challenges facing the Niger Delta and how they influence artistic
                expression.
              </p>
              <Link href="/resources/environmental-context" className="text-blue-700 font-medium hover:text-blue-800">
                Explore Resources
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

