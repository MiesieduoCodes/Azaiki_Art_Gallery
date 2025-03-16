import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react";
// Sample African art data
const africanArtworks = [
  {
    id: 1,
    title: "Another Day Another Tale",
    artist: "Millicent Osumuo Onuegbu",
    region: "West Africa",
    period: "Contemporary",
    image: "/images/IMG-20250101-WA0024.jpg",
    description: "This artwork captures a fleeting moment in the everyday journey of two siblings on an errand for their mama. Their backs are to the viewer, yet the scene speaks volumes about their bond, their world, and the stories they share along the way. With each passing day, these errands become adventures, with the children weaving fresh tales and playful stories, their imaginations running wild as they move through the familiar sights and sounds of their community. The piece captures the essence of childhood wonder, the innocence of sibling companionship, and the beauty of African life, where each day offers the promise of a new adventure, and every errand becomes a story waiting to unfold.",
  },
  {
    id: 2,
    title: "Tribal Patterns",
    artist: "Kwame Osei",
    region: "Ghana",
    period: "2010s",
    image: "/placeholder.svg?height=600&width=800",
    description: "Intricate patterns inspired by traditional Ghanaian textiles and symbols.",
  },
  {
    id: 3,
    title: "Defined Identity",
    artist: "Millicent Osumuo Onuegbu",
    region: "East Africa",
    period: "Contemporary",
    image: "/images/IMG-20250101-WA0023.jpg",
    description: "Defined Identity represents the clarity and strength that comes from embracing one's true self. It is the powerful understanding of who we are, free from external expectations and judgments. In the gaze of the subject, we see not just a reflection of physical appearance, but the deep-rooted certainty of a woman who has shaped her own path. Her eyes, though not directly engaging the viewer, seem to look beyond, as if lost in thought, yet there is an undeniable firmness in her expression. The subtle distraction adds a layer of complexity to her identity—she is neither fully present nor detached, but grounded in her own world, confident in her own thoughts. Through the lenses of her glasses, her perspective is sharpened, her identity clear, and her presence undeniable. This is a woman who knows her worth, stands firm in her truth, and embodies the essence of self-assurance.",
  },
  {
    id: 4,
    title: "Ngala - Embracing Beauty and Positivity in Womanhood",
    artist: "Millicent Osumuo Onuegbu",
    region: "Nigeria",
    period: "2015",
    image: "/placeholder.svg?height=600&width=800",
    description: "Millicent's acrylic painting series, Ngala, is a mesmerizing portrayal of a woman's strength and beauty through a colorful depiction of flowers. The title of this magnificent body of work means 'pride' in Igbo language, spoken by the Igbo people of Nigeria. The painting series features busts of women adorned with loads of thick paste of colorful flowers on their heads, cascading down their faces and necks. The flowers symbolize the woman's willingness to replace the burdens and challenges of life with positivity and beauty. It is a message of hope for women to embrace their struggles and challenges and find strength in their beauty. Through the use of vibrant colors, intricate patterns, and delicate strokes, Millicent's artwork celebrates the diversity and uniqueness of womanhood. Each piece conveys a distinct emotional theme, yet they all have a common cultural representation of the African woman. The women in her paintings exude grace, elegance, and a strong feminine spirit. The Ngala series also conveys a message of self-love and empowerment to women. The women in the paintings wear their thorns as crowns, reminding us that the struggles we face in life are also a part of our journey, and we should embrace them without fear or shame. It is a call to every woman to wear her struggles as a badge of honor and use it as a tool for growth and positivity. Millicent's artwork is a beautiful celebration of the resilience and strength of women. It encourages every woman to embrace her beauty and positivity, even amidst life's challenges. Her artwork is a reminder that true strength comes from embracing our struggles and challenges and finding beauty in them. In conclusion, Ngala is a powerful and inspiring body of work that celebrates the beauty and strength of womanhood. It encourages women to wear their struggles with pride, embracing their journey with positivity and beauty. Through her artwork, Millicent inspires women to be proud of themselves, their culture, and their unique journey, reminding them that they are beautiful, strong, and worthy of pride",
  },
  {
    id: 5,
    title: "Urban Africa",
    artist: "Zainab Musa",
    region: "North Africa",
    period: "Contemporary",
    image: "/placeholder.svg?height=600&width=800",
    description: "A contemporary look at rapidly changing urban landscapes across North Africa.",
  },
  {
    id: 6,
    title: "Spirit Dancers",
    artist: "Kofi Mensah",
    region: "West Africa",
    period: "2018",
    image: "/placeholder.svg?height=600&width=800",
    description: "Dynamic figures capturing the energy and spirituality of traditional dance.",
  },
]

// Sample regions data
const regions = [
  {
    name: "West Africa",
    image: "/placeholder.svg?height=400&width=600",
    description: "Featuring art from Nigeria, Ghana, Senegal, and neighboring countries.",
  },
  {
    name: "East Africa",
    image: "/placeholder.svg?height=400&width=600",
    description: "Showcasing works from Kenya, Ethiopia, Tanzania, and the Horn of Africa.",
  },
  {
    name: "North Africa",
    image: "/placeholder.svg?height=400&width=600",
    description: "Art from Egypt, Morocco, Algeria, and the Mediterranean coast.",
  },
  {
    name: "Central Africa",
    image: "/placeholder.svg?height=400&width=600",
    description: "Diverse works from the Congo Basin, Cameroon, and surrounding regions.",
  },
]

export default function AfricanArt() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative bg-blue-700 text-white py-20">
        <div className="absolute inset-0 opacity-20 bg-[url('/placeholder.svg?height=1080&width=1920')] bg-cover bg-center"></div>
        <div className="container-custom relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">African Art Collection</h1>
            <p className="text-xl text-blue-100 mb-6">
              Explore the rich artistic traditions and contemporary expressions from across the African continent.
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
                Our African Art Collection celebrates the incredible diversity and creativity of artistic expressions
                from across the African continent. From traditional sculptures and masks to contemporary paintings and
                digital art, this collection spans centuries of artistic innovation.
              </p>
              <p className="text-gray-700 mb-4">
                The collection highlights both historical pieces that showcase traditional techniques and cultural
                significance, as well as works by contemporary African artists who are redefining and expanding upon
                these traditions in the modern world.
              </p>
              <p className="text-gray-700">
                Through this collection, we aim to promote a deeper understanding and appreciation of Africa's rich
                cultural heritage and its ongoing contribution to global art movements.
              </p>
            </div>
            <div className="relative h-96 rounded-lg overflow-hidden shadow-lg">
              <Image
                src="/placeholder.svg?height=800&width=1200"
                alt="African art exhibition"
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
            {africanArtworks.slice(0, 3).map((artwork) => (
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
                    {artwork.region}, {artwork.period}
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
              View All African Artworks
            </Link>
          </div>
        </div>
      </section>

      {/* Regions */}
      <section className="py-16">
        <div className="container-custom">
          <h2 className="section-title text-center mb-4">Explore by Region</h2>
          <p className="text-center text-gray-600 max-w-3xl mx-auto mb-12">
            Discover the unique artistic traditions and contemporary expressions from different regions across Africa.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {regions.map((region, index) => (
              <Link key={index} href={`/african/${region.name.toLowerCase().replace(/\s+/g, "-")}`} className="group">
                <div className="flex flex-col md:flex-row bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                  <div className="md:w-2/5 relative h-64 md:h-auto">
                    <Image src={region.image || "/placeholder.svg"} alt={region.name} fill className="object-cover" />
                  </div>
                  <div className="md:w-3/5 p-6">
                    <h3 className="text-xl font-bold text-blue-900 mb-2">{region.name}</h3>
                    <p className="text-gray-700 mb-4">{region.description}</p>
                    <span className="text-blue-700 font-medium flex items-center group-hover:text-blue-800">
                      Explore Region{" "}
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
            {africanArtworks.slice(3, 6).map((artwork) => (
              <div key={artwork.id} className="bg-white rounded-lg overflow-hidden shadow-md">
                <div className="relative h-64">
                  <Image src={artwork.image || "/placeholder.svg"} alt={artwork.title} fill className="object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-blue-900 mb-1">{artwork.title}</h3>
                  <p className="text-blue-700 mb-1">{artwork.artist}</p>
                  <p className="text-gray-600 text-sm mb-3">
                    {artwork.region}, {artwork.period}
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
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Featured African Artists</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                name: "Amara Nwosu",
                specialty: "Mixed Media, Sculpture",
                country: "Nigeria",
                image: "/placeholder.svg?height=400&width=400",
              },
              {
                name: "Kwame Osei",
                specialty: "Traditional Art",
                country: "Ghana",
                image: "/placeholder.svg?height=400&width=400",
              },
              {
                name: "Ngozi Eze",
                specialty: "Contemporary Painting",
                country: "Nigeria",
                image: "/placeholder.svg?height=400&width=400",
              },
              {
                name: "Tunde Adebayo",
                specialty: "Niger Delta Art",
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

      {/* Educational Resources */}
      <section className="py-16">
        <div className="container-custom">
          <h2 className="section-title text-center mb-4">Educational Resources</h2>
          <p className="text-center text-gray-600 max-w-3xl mx-auto mb-12">
            Deepen your understanding of African art with our educational resources and programs.
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
              <h3 className="text-lg font-semibold text-blue-900 mb-2">Guided Tours</h3>
              <p className="text-gray-700 mb-4">
                Join our expert guides for specialized tours of the African Art Collection, offered daily at 11:00 AM
                and 2:00 PM.
              </p>
              <Link href="/visit" className="text-blue-700 font-medium hover:text-blue-800">
                Book a Tour
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
              <h3 className="text-lg font-semibold text-blue-900 mb-2">Video Series</h3>
              <p className="text-gray-700 mb-4">
                Watch our educational video series exploring the history, techniques, and cultural significance of
                African art.
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
              <h3 className="text-lg font-semibold text-blue-900 mb-2">Workshops</h3>
              <p className="text-gray-700 mb-4">
                Participate in hands-on workshops led by African artists and educators, exploring traditional and
                contemporary techniques.
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

