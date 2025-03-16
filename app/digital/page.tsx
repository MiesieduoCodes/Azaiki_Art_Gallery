import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

// Sample digital art data
const digitalArtworks = [
  {
    id: 5,
    title: "Digital Dreams",
    artist: "Sophia Lee",
    technique: "3D Rendering",
    period: "2022",
    image: "/placeholder.svg?height=600&width=800",
    description: "An immersive 3D environment exploring the boundaries between reality and digital space.",
  },
  {
    id: 9,
    title: "Virtual Reality",
    artist: "Alex Kim",
    technique: "VR Installation",
    period: "2023",
    image: "/placeholder.svg?height=600&width=800",
    description: "A virtual reality experience that challenges perceptions of physical space.",
  },
  {
    id: 14,
    title: "Algorithmic Patterns",
    artist: "Raj Patel",
    technique: "Generative Art",
    period: "2021",
    image: "/placeholder.svg?height=600&width=800",
    description: "Computer-generated patterns created through custom algorithms and code.",
  },
  {
    id: 17,
    title: "Pixel Portraits",
    artist: "Emma Wilson",
    technique: "Digital Painting",
    period: "2022",
    image: "/placeholder.svg?height=600&width=800",
    description: "Contemporary portraits created using digital painting techniques.",
  },
  {
    id: 20,
    title: "Data Visualization",
    artist: "Marcus Johnson",
    technique: "Interactive Media",
    period: "2023",
    image: "/placeholder.svg?height=600&width=800",
    description: "An interactive visualization of climate data transformed into an aesthetic experience.",
  },
  {
    id: 23,
    title: "Augmented Reality",
    artist: "Leila Nguyen",
    technique: "AR Installation",
    period: "2022",
    image: "/placeholder.svg?height=600&width=800",
    description: "An augmented reality installation that overlays digital elements onto physical spaces.",
  },
]

// Sample techniques data
const techniques = [
  {
    name: "Digital Painting",
    image: "/placeholder.svg?height=400&width=600",
    description: "Creating artwork using digital tools that simulate traditional painting techniques.",
  },
  {
    name: "3D Modeling & Rendering",
    image: "/placeholder.svg?height=400&width=600",
    description: "Building three-dimensional digital models and creating realistic or stylized renderings.",
  },
  {
    name: "Generative Art",
    image: "/placeholder.svg?height=400&width=600",
    description: "Using algorithms, autonomous systems, and AI to create art through code.",
  },
  {
    name: "VR & AR Installations",
    image: "/placeholder.svg?height=400&width=600",
    description: "Immersive experiences using virtual and augmented reality technologies.",
  },
]

export default function DigitalArt() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative bg-blue-700 text-white py-20">
        <div className="absolute inset-0 opacity-20 bg-[url('/placeholder.svg?height=1080&width=1920')] bg-cover bg-center"></div>
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
                src="/placeholder.svg?height=800&width=1200"
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
                  <Image src={artwork.image || "/placeholder.svg"} alt={artwork.title} fill className="object-cover" />
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

      {/* Techniques */}
      <section className="py-16">
        <div className="container-custom">
          <h2 className="section-title text-center mb-4">Explore by Technique</h2>
          <p className="text-center text-gray-600 max-w-3xl mx-auto mb-12">
            Discover the diverse digital techniques artists use to create innovative works.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {techniques.map((technique, index) => (
              <Link
                key={index}
                href={`/digital/${technique.name.toLowerCase().replace(/\s+/g, "-").replace(/&/g, "and")}`}
                className="group"
              >
                <div className="flex flex-col md:flex-row bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                  <div className="md:w-2/5 relative h-64 md:h-auto">
                    <Image
                      src={technique.image || "/placeholder.svg"}
                      alt={technique.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="md:w-3/5 p-6">
                    <h3 className="text-xl font-bold text-blue-900 mb-2">{technique.name}</h3>
                    <p className="text-gray-700 mb-4">{technique.description}</p>
                    <span className="text-blue-700 font-medium flex items-center group-hover:text-blue-800">
                      Explore Technique{" "}
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
            {digitalArtworks.slice(3, 6).map((artwork) => (
              <div key={artwork.id} className="bg-white rounded-lg overflow-hidden shadow-md">
                <div className="relative h-64">
                  <Image src={artwork.image || "/placeholder.svg"} alt={artwork.title} fill className="object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-blue-900 mb-1">{artwork.title}</h3>
                  <p className="text-blue-700 mb-1">{artwork.artist}</p>
                  <p className="text-gray-600 text-sm mb-3">
                    {artwork.technique}, {artwork.period}
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

      {/* Featured Digital Artists */}
      <section className="py-16 bg-blue-700 text-white">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Featured Digital Artists</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                name: "Sophia Lee",
                specialty: "3D Art & Animation",
                country: "South Korea",
                image: "/placeholder.svg?height=400&width=400",
              },
              {
                name: "Alex Kim",
                specialty: "VR Installations",
                country: "United States",
                image: "/placeholder.svg?height=400&width=400",
              },
              {
                name: "Raj Patel",
                specialty: "Generative Art",
                country: "India",
                image: "/placeholder.svg?height=400&width=400",
              },
              {
                name: "Emma Wilson",
                specialty: "Digital Painting",
                country: "Canada",
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
  )
}

