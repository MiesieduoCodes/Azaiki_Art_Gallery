import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Share2, Heart, Eye } from "lucide-react";

// Complete gallery data with 20 items
const galleryItems = [
  {
    id: 1,
    title: "Abstract Harmony",
    artist: "Elena Rodriguez",
    category: "Contemporary",
    year: "2022",
    medium: "Oil on canvas",
    dimensions: "120 x 90 cm",
    description: "This vibrant abstract piece explores the harmony between color and form. The artist uses bold brushstrokes and a rich palette to create a sense of movement and emotion.",
    image: "/placeholder.svg?height=800&width=1200",
    artistImage: "/placeholder.svg?height=400&width=400",
    artistBio: "Elena Rodriguez is a contemporary artist based in Barcelona, Spain. Her work explores themes of identity, memory, and the subconscious through abstract expressionism.",
    relatedWorks: [
      { id: 3, title: "Urban Landscape", image: "/placeholder.svg?height=400&width=600" },
      { id: 8, title: "Modern Reflections", image: "/placeholder.svg?height=400&width=600" },
      { id: 5, title: "Digital Dreams", image: "/placeholder.svg?height=400&width=600" },
    ],
    views: "1000",
  },
  {
    id: 2,
    title: "Cultural Heritage",
    artist: "Kwame Osei",
    category: "African",
    year: "2021",
    medium: "Acrylic on canvas",
    dimensions: "100 x 70 cm",
    description: "A vibrant representation of African culture and traditions.",
    image: "/placeholder.svg?height=800&width=1200",
    artistImage: "/placeholder.svg?height=400&width=400",
    artistBio: "Kwame Osei is a visionary artist from Ghana known for his colorful depictions of African life.",
    relatedWorks: [
      { id: 1, title: "Abstract Harmony", image: "/placeholder.svg?height=400&width=600" },
      { id: 4, title: "Ancestral Wisdom", image: "/placeholder.svg?height=400&width=600" },
    ],
    views: "850",
  },
  {
    id: 3,
    title: "Urban Landscape",
    artist: "Michael Chen",
    category: "Contemporary",
    year: "2023",
    medium: "Mixed media",
    dimensions: "150 x 100 cm",
    description: "A striking portrayal of modern urban life, capturing the essence of a bustling city.",
    image: "/placeholder.svg?height=800&width=1200",
    artistImage: "/placeholder.svg?height=400&width=400",
    artistBio: "Michael Chen is a contemporary artist known for his dynamic cityscapes and use of mixed media.",
    relatedWorks: [
      { id: 1, title: "Abstract Harmony", image: "/placeholder.svg?height=400&width=600" },
      { id: 8, title: "Modern Reflections", image: "/placeholder.svg?height=400&width=600" },
    ],
    views: "1200",
  },
  {
    id: 4,
    title: "Ancestral Wisdom",
    artist: "Amara Nwosu",
    category: "African",
    year: "2020",
    medium: "Oil on canvas",
    dimensions: "110 x 85 cm",
    description: "This painting reflects the deep-rooted traditions and wisdom passed down through generations.",
    image: "/placeholder.svg?height=800&width=1200",
    artistImage: "/placeholder.svg?height=400&width=400",
    artistBio: "Amara Nwosu is an artist from Nigeria who focuses on themes of heritage and culture.",
    relatedWorks: [
      { id: 2, title: "Cultural Heritage", image: "/placeholder.svg?height=400&width=600" },
      { id: 5, title: "Digital Dreams", image: "/placeholder.svg?height=400&width=600" },
    ],
    views: "900",
  },
  {
    id: 5,
    title: "Digital Dreams",
    artist: "Sophia Lee",
    category: "Digital",
    year: "2021",
    medium: "Digital painting",
    dimensions: "1920 x 1080 pixels",
    description: "A surreal digital artwork that explores the intersection of technology and imagination.",
    image: "/placeholder.svg?height=800&width=1200",
    artistImage: "/placeholder.svg?height=400&width=400",
    artistBio: "Sophia Lee is a digital artist whose work often fuses technology with traditional art forms.",
    relatedWorks: [
      { id: 1, title: "Abstract Harmony", image: "/placeholder.svg?height=400&width=600" },
      { id: 8, title: "Modern Reflections", image: "/placeholder.svg?height=400&width=600" },
    ],
    views: "1100",
  },
  {
    id: 6,
    title: "Stone Expressions",
    artist: "Carlos Mendez",
    category: "Sculpture",
    year: "2019",
    medium: "Marble",
    dimensions: "Height: 150 cm",
    description: "A sculptural piece that captures the essence of human emotion through stone.",
    image: "/placeholder.svg?height=800&width=1200",
    artistImage: "/placeholder.svg?height=400&width=400",
    artistBio: "Carlos Mendez is a sculptor known for his intricate marble works that evoke deep feelings.",
    relatedWorks: [
      { id: 7, title: "River Life", image: "/placeholder.svg?height=400&width=600" },
      { id: 10, title: "Bronze Age", image: "/placeholder.svg?height=400&width=600" },
    ],
    views: "950",
  },
  {
    id: 7,
    title: "River Life",
    artist: "Tunde Adebayo",
    category: "Niger Delta",
    year: "2020",
    medium: "Acrylic on canvas",
    dimensions: "100 x 70 cm",
    description: "A vibrant depiction of life along the rivers of Nigeria, showcasing the beauty of nature.",
    image: "/placeholder.svg?height=800&width=1200",
    artistImage: "/placeholder.svg?height=400&width=400",
    artistBio: "Tunde Adebayo is an artist from the Niger Delta region, focusing on environmental themes.",
    relatedWorks: [
      { id: 6, title: "Stone Expressions", image: "/placeholder.svg?height=400&width=600" },
      { id: 11, title: "Coastal Traditions", image: "/placeholder.svg?height=400&width=600" },
    ],
    views: "800",
  },
  {
    id: 8,
    title: "Modern Reflections",
    artist: "Sarah Johnson",
    category: "Contemporary",
    year: "2023",
    medium: "Mixed media",
    dimensions: "130 x 90 cm",
    description: "An exploration of contemporary life through a blend of various media techniques.",
    image: "/placeholder.svg?height=800&width=1200",
    artistImage: "/placeholder.svg?height=400&width=400",
    artistBio: "Sarah Johnson's work reflects the complexities of modern living and societal changes.",
    relatedWorks: [
      { id: 1, title: "Abstract Harmony", image: "/placeholder.svg?height=400&width=600" },
      { id: 5, title: "Digital Dreams", image: "/placeholder.svg?height=400&width=600" },
    ],
    views: "700",
  },
  {
    id: 9,
    title: "Virtual Reality",
    artist: "Alex Kim",
    category: "Digital",
    year: "2022",
    medium: "Digital installation",
    dimensions: "Variable dimensions",
    description: "A groundbreaking digital installation that immerses viewers in a virtual world.",
    image: "/placeholder.svg?height=800&width=1200",
    artistImage: "/placeholder.svg?height=400&width=400",
    artistBio: "Alex Kim is known for pushing the boundaries of digital art and interactive experiences.",
    relatedWorks: [
      { id: 10, title: "Bronze Age", image: "/placeholder.svg?height=400&width=600" },
      { id: 15, title: "Cyber City", image: "/placeholder.svg?height=400&width=600" },
    ],
    views: "1300",
  },
  {
    id: 10,
    title: "Bronze Age",
    artist: "Isabella Martinez",
    category: "Sculpture",
    year: "2018",
    medium: "Bronze",
    dimensions: "Height: 120 cm",
    description: "A bronze sculpture that symbolizes strength and resilience in the face of adversity.",
    image: "/placeholder.svg?height=800&width=1200",
    artistImage: "/placeholder.svg?height=400&width=400",
    artistBio: "Isabella Martinez creates sculptures that reflect cultural narratives and personal stories.",
    relatedWorks: [
      { id: 9, title: "Virtual Reality", image: "/placeholder.svg?height=400&width=600" },
      { id: 19, title: "Ancient Relics", image: "/placeholder.svg?height=400&width=600" },
    ],
    views: "1100",
  },
  {
    id: 11,
    title: "Coastal Traditions",
    artist: "Emmanuel Okon",
    category: "Niger Delta",
    year: "2019",
    medium: "Acrylic on canvas",
    dimensions: "90 x 60 cm",
    description: "Exploring the rich traditions of coastal communities in Nigeria through art.",
    image: "/placeholder.svg?height=800&width=1200",
    artistImage: "/placeholder.svg?height=400&width=400",
    artistBio: "Emmanuel Okon focuses on the interplay between culture and the environment in his artworks.",
    relatedWorks: [
      { id: 7, title: "River Life", image: "/placeholder.svg?height=400&width=600" },
      { id: 12, title: "Tribal Patterns", image: "/placeholder.svg?height=400&width=600" },
    ],
    views: "920",
  },
  {
    id: 12,
    title: "Tribal Patterns",
    artist: "Ngozi Eze",
    category: "African",
    year: "2021",
    medium: "Textile art",
    dimensions: "80 x 80 cm",
    description: "A textile piece that incorporates traditional patterns and techniques from various African cultures.",
    image: "/placeholder.svg?height=800&width=1200",
    artistImage: "/placeholder.svg?height=400&width=400",
    artistBio: "Ngozi Eze creates vibrant textile artworks that celebrate African heritage and artistry.",
    relatedWorks: [
      { id: 11, title: "Coastal Traditions", image: "/placeholder.svg?height=400&width=600" },
      { id: 20, title: "Savannah Rhythms", image: "/placeholder.svg?height=400&width=600" },
    ],
    views: "670",
  },
  {
    id: 13,
    title: "Golden Sunset",
    artist: "Liam Brown",
    category: "Contemporary",
    year: "2022",
    medium: "Oil on canvas",
    dimensions: "120 x 90 cm",
    description: "A breathtaking landscape that captures the beauty of a sunset over the ocean.",
    image: "/placeholder.svg?height=800&width=1200",
    artistImage: "/placeholder.svg?height=400&width=400",
    artistBio: "Liam Brown's landscapes are known for their vibrant colors and emotional depth.",
    relatedWorks: [
      { id: 3, title: "Urban Landscape", image: "/placeholder.svg?height=400&width=600" },
      { id: 21, title: "Ocean Depths", image: "/placeholder.svg?height=400&width=600" },
    ],
    views: "800",
  },
  {
    id: 14,
    title: "Desert Mirage",
    artist: "Fatima Al-Mansoori",
    category: "African",
    year: "2021",
    medium: "Acrylic on canvas",
    dimensions: "100 x 70 cm",
    description: "A captivating view of the desert, highlighting its beauty and mystery.",
    image: "/placeholder.svg?height=800&width=1200",
    artistImage: "/placeholder.svg?height=400&width=400",
    artistBio: "Fatima Al-Mansoori is an artist from the Middle East, inspired by the landscapes of her homeland.",
    relatedWorks: [
      { id: 2, title: "Cultural Heritage", image: "/placeholder.svg?height=400&width=600" },
      { id: 15, title: "Cyber City", image: "/placeholder.svg?height=400&width=600" },
    ],
    views: "760",
  },
  {
    id: 15,
    title: "Cyber City",
    artist: "Hiroshi Tanaka",
    category: "Digital",
    year: "2023",
    medium: "Digital art",
    dimensions: "1920 x 1080 pixels",
    description: "A futuristic vision of a city thriving in the digital age, blending technology and art.",
    image: "/placeholder.svg?height=800&width=1200",
    artistImage: "/placeholder.svg?height=400&width=400",
    artistBio: "Hiroshi Tanaka is a digital artist who explores themes of technology and society in his work.",
    relatedWorks: [
      { id: 9, title: "Virtual Reality", image: "/placeholder.svg?height=400&width=600" },
      { id: 14, title: "Desert Mirage", image: "/placeholder.svg?height=400&width=600" },
    ],
    views: "1000",
  },
  {
    id: 16,
    title: "Marble Elegance",
    artist: "Giovanni Rossi",
    category: "Sculpture",
    year: "2018",
    medium: "Marble",
    dimensions: "Height: 160 cm",
    description: "A stunning marble sculpture that embodies grace and elegance.",
    image: "/placeholder.svg?height=800&width=1200",
    artistImage: "/placeholder.svg?height=400&width=400",
    artistBio: "Giovanni Rossi is renowned for his exquisite marble sculptures that evoke emotion and beauty.",
    relatedWorks: [
      { id: 6, title: "Stone Expressions", image: "/placeholder.svg?height=400&width=600" },
      { id: 19, title: "Ancient Relics", image: "/placeholder.svg?height=400&width=600" },
    ],
    views: "1200",
  },
  {
    id: 17,
    title: "Mangrove Mysteries",
    artist: "Chinwe Okoro",
    category: "Niger Delta",
    year: "2022",
    medium: "Acrylic on canvas",
    dimensions: "90 x 70 cm",
    description: "An artistic interpretation of the rich biodiversity found in the mangroves of Nigeria.",
    image: "/placeholder.svg?height=800&width=1200",
    artistImage: "/placeholder.svg?height=400&width=400",
    artistBio: "Chinwe Okoro's work captures the essence of nature and its preservation.",
    relatedWorks: [
      { id: 7, title: "River Life", image: "/placeholder.svg?height=400&width=600" },
      { id: 20, title: "Savannah Rhythms", image: "/placeholder.svg?height=400&width=600" },
    ],
    views: "930",
  },
  {
    id: 18,
    title: "Futuristic Visions",
    artist: "Emma Watson",
    category: "Digital",
    year: "2022",
    medium: "Digital illustration",
    dimensions: "1920 x 1080 pixels",
    description: "A digital illustration that explores futuristic landscapes and societies.",
    image: "/placeholder.svg?height=800&width=1200",
    artistImage: "/placeholder.svg?height=400&width=400",
    artistBio: "Emma Watson is a digital illustrator focusing on speculative and futuristic themes.",
    relatedWorks: [
      { id: 9, title: "Virtual Reality", image: "/placeholder.svg?height=400&width=600" },
      { id: 22, title: "Neon Dreams", image: "/placeholder.svg?height=400&width=600" },
    ],
    views: "1100",
  },
  {
    id: 19,
    title: "Ancient Relics",
    artist: "Ahmed Hassan",
    category: "Sculpture",
    year: "2021",
    medium: "Clay",
    dimensions: "Height: 120 cm",
    description: "A sculpture that reflects on the ancient cultures and their artifacts.",
    image: "/placeholder.svg?height=800&width=1200",
    artistImage: "/placeholder.svg?height=400&width=400",
    artistBio: "Ahmed Hassan specializes in creating sculptures that tell stories of ancient civilizations.",
    relatedWorks: [
      { id: 10, title: "Bronze Age", image: "/placeholder.svg?height=400&width=600" },
      { id: 16, title: "Marble Elegance", image: "/placeholder.svg?height=400&width=600" },
    ],
    views: "800",
  },
  {
    id: 20,
    title: "Savannah Rhythms",
    artist: "Amina Diallo",
    category: "African",
    year: "2021",
    medium: "Acrylic on canvas",
    dimensions: "100 x 70 cm",
    description: "A vibrant depiction of life in the African savannah, capturing the rhythms of nature and wildlife.",
    image: "/placeholder.svg?height=800&width=1200",
    artistImage: "/placeholder.svg?height=400&width=400",
    artistBio: "Amina Diallo is an artist from West Africa whose work celebrates the beauty and diversity of the savannah.",
    relatedWorks: [
      { id: 12, title: "Tribal Patterns", image: "/placeholder.svg?height=400&width=600" },
      { id: 17, title: "Mangrove Mysteries", image: "/placeholder.svg?height=400&width=600" },
    ],
    views: "1100",
  },
  {
    id: 21,
    title: "Ocean Depths",
    artist: "Marina Petrova",
    category: "Contemporary",
    year: "2023",
    medium: "Oil on canvas",
    dimensions: "120 x 90 cm",
    description: "An exploration of the ocean’s depths and the beauty of marine life, capturing the vibrant colors and textures of underwater ecosystems.",
    image: "/placeholder.svg?height=800&width=1200",
    artistImage: "/placeholder.svg?height=400&width=400",
    artistBio: "Marina Petrova is a contemporary artist whose work focuses on themes of nature and the environment, often inspired by her coastal surroundings.",
    relatedWorks: [
      { id: 13, title: "Golden Sunset", image: "/placeholder.svg?height=400&width=600" },
      { id: 22, title: "Neon Dreams", image: "/placeholder.svg?height=400&width=600" },
    ],
    views: "1500",
  },
  {
    id: 22,
    title: "Neon Dreams",
    artist: "Ryan Carter",
    category: "Digital",
    year: "2022",
    medium: "Digital illustration",
    dimensions: "1920 x 1080 pixels",
    description: "A vibrant digital artwork that explores the interplay of light and color in a futuristic cityscape, evoking a sense of wonder and imagination.",
    image: "/placeholder.svg?height=800&width=1200",
    artistImage: "/placeholder.svg?height=400&width=400",
    artistBio: "Ryan Carter is a digital artist known for his imaginative works that merge technology with creative expression, often reflecting urban life.",
    relatedWorks: [
      { id: 9, title: "Virtual Reality", image: "/placeholder.svg?height=400&width=600" },
      { id: 15, title: "Cyber City", image: "/placeholder.svg?height=400&width=600" },
    ],
    views: "1800",
  },
  {
    id: 23,
    title: "Clay Creations",
    artist: "Maria Gonzalez",
    category: "Sculpture",
    year: "2021",
    medium: "Clay",
    dimensions: "Height: 50 cm",
    description: "A series of sculpted clay figures that reflect the artist’s interpretation of human emotions and connections, showcasing intricate details and textures.",
    image: "/placeholder.svg?height=800&width=1200",
    artistImage: "/placeholder.svg?height=400&width=400",
    artistBio: "Maria Gonzalez is a sculptor who specializes in clay, exploring themes of identity and emotion through her tactile artworks.",
    relatedWorks: [
      { id: 6, title: "Stone Expressions", image: "/placeholder.svg?height=400&width=600" },
      { id: 19, title: "Ancient Relics", image: "/placeholder.svg?height=400&width=600" },
    ],
    views: "900",
  },
  {
    id: 24,
    title: "Delta Reflections",
    artist: "Obinna Nwankwo",
    category: "Niger Delta",
    year: "2021",
    medium: "Acrylic on canvas",
    dimensions: "100 x 70 cm",
    description: "A reflection on the beauty and challenges of life in the Niger Delta region.",
    image: "/placeholder.svg?height=800&width=1200",
    artistImage: "/placeholder.svg?height=400&width=400",
    artistBio: "Obinna Nwankwo is an artist whose work often highlights environmental issues in Nigeria.",
    relatedWorks: [
      { id: 12, title: "Tribal Patterns", image: "/placeholder.svg?height=400&width=600" },
      { id: 20, title: "Savannah Rhythms", image: "/placeholder.svg?height=400&width=600" },
    ],
    views: "1100",
  },
];

// Function to get artwork by ID
const getArtwork = (id: string) => {
  return galleryItems.find(item => item.id === Number(id));
}

export default function ArtworkDetail({ params }: { params: { id: string } }) {
  const artwork = getArtwork(params.id);

  if (!artwork) {
    return <div>Artwork not found</div>;
  }

  return (
    <div className="bg-white">
      <div className="container-custom py-12">
        {/* Breadcrumb */}
        <div className="mb-8">
          <Link href="/gallery" className="text-blue-700 hover:text-blue-800 flex items-center">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Gallery
          </Link>
        </div>

        {/* Artwork Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Artwork Image */}
          <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-lg">
            <Image
              src={artwork.image || "/placeholder.svg"}
              alt={artwork.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Artwork Info */}
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-blue-900 mb-2">{artwork.title}</h1>
            <h2 className="text-xl text-blue-700 mb-6">by {artwork.artist}</h2>

            <div className="flex items-center space-x-4 mb-8">
              <button className="flex items-center text-gray-600 hover:text-blue-700">
                <Heart className="h-5 w-5 mr-1" />
                <span>Save</span>
              </button>
              <button className="flex items-center text-gray-600 hover:text-blue-700">
                <Share2 className="h-5 w-5 mr-1" />
                <span>Share</span>
              </button>
              <div className="flex items-center text-gray-600">
                <Eye className="h-5 w-5 mr-1" />
                <span>{artwork.views}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Year</h3>
                <p className="text-gray-900">{artwork.year}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Medium</h3>
                <p className="text-gray-900">{artwork.medium}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Dimensions</h3>
                <p className="text-gray-900">{artwork.dimensions}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Category</h3>
                <p className="text-gray-900">{artwork.category}</p>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-lg font-semibold text-blue-900 mb-3">Description</h3>
              <p className="text-gray-700 leading-relaxed">{artwork.description}</p>
            </div>

            <div className="p-6 bg-gray-50 rounded-lg">
              <div className="flex items-center mb-4">
                <div className="relative w-16 h-16 rounded-full overflow-hidden mr-4">
                  <Image
                    src={artwork.artistImage || "/placeholder.svg"}
                    alt={artwork.artist}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-blue-900">{artwork.artist}</h3>
                  <Link
                    href={`/artists/${artwork.artist.toLowerCase().replace(/\s+/g, "-")}`}
                    className="text-blue-700 text-sm hover:text-blue-800"
                  >
                    View Profile
                  </Link>
                </div>
              </div>
              <p className="text-gray-700 text-sm">{artwork.artistBio}</p>
            </div>
          </div>
        </div>

        {/* Related Works */}
        <div className="mt-16">
          <h2 className="section-subtitle mb-6">Related Artworks</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {artwork.relatedWorks.map((work) => (
              <Link key={work.id} href={`/gallery/${work.id}`} className="group">
                <div className="relative aspect-square rounded-lg overflow-hidden shadow-md">
                  <Image
                    src={work.image || "/placeholder.svg"}
                    alt={work.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                      <h3 className="text-lg font-bold">{work.title}</h3>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}