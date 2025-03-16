import Image from "next/image"
import Link from "next/link"
import { Clock, MapPin, Phone, Mail } from "lucide-react"

export default function About() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-blue-700 text-white py-16">
        <div className="container-custom">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About Azaiki Art Gallery And Museum

          </h1>
          <p className="text-xl text-blue-100 max-w-3xl">
            Discover our story, mission, and the people behind our museum and gallery.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="section-title">Our Story</h2>
              <p className="text-gray-700 mb-4">
                Founded in 2019, Azaiki Museum & Gallery has grown from a small local exhibition space to one of the
                most respected art institutions in the region. Our journey began with a simple mission: to make art
                accessible to everyone and to preserve cultural heritage for future generations.
              </p>
              <p className="text-gray-700 mb-4">
                Over the decades, we have expanded our collections, renovated our facilities, and developed educational
                programs that reach thousands of visitors each year. Today, Our Museum stands as a beacon of artistic
                excellence and cultural dialogue.
              </p>
              <p className="text-gray-700">
                Our commitment to showcasing diverse artistic expressions has allowed us to build bridges between
                different cultures, generations, and perspectives. We believe that art has the power to transform lives
                and communities, and we strive to harness that power through thoughtful curation and engaging
                programming.
              </p>
            </div>
            <div className="relative h-96 rounded-lg overflow-hidden shadow-lg">
              <Image src="/images/OutsideMuseum.jpg"
               alt="Museum building" fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="section-title">Our Mission</h2>
            <p className="text-gray-700 mb-8">
              At The Gallery, our mission is to inspire, educate, and enrich lives through the power of art. We are
              dedicated to:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
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
                <h3 className="text-lg font-semibold text-blue-900 mb-2">Preserving Heritage</h3>
                <p className="text-gray-700">
                  Collecting, preserving, and interpreting significant works of art from diverse cultures and time
                  periods.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
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
                      d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-blue-900 mb-2">Education</h3>
                <p className="text-gray-700">
                  Providing educational opportunities that foster understanding, appreciation, and engagement with art.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
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
                      d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-blue-900 mb-2">Community Engagement</h3>
                <p className="text-gray-700">
                  Creating inclusive spaces and programs that welcome diverse audiences and foster community
                  connections.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Team
      <section className="py-16">
        <div className="container-custom">
          <h2 className="section-title text-center mb-12">Our Team</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                name: "Dr. Sarah Johnson",
                title: "Museum Director",
                image: "/placeholder.svg?height=400&width=400",
                bio: "With over 20 years of experience in museum management, Dr. Johnson has transformed ArtVista into a leading cultural institution.",
              },
              {
                name: "Michael Chen",
                title: "Chief Curator",
                image: "/placeholder.svg?height=400&width=400",
                bio: "An expert in contemporary and digital art, Michael brings innovative perspectives to our exhibition programming.",
              },
              {
                name: "Dr. Amara Okonkwo",
                title: "Head of African Art",
                image: "/placeholder.svg?height=400&width=400",
                bio: "Specializing in traditional and contemporary African art, Dr. Okonkwo has expanded our African collection significantly.",
              },
              {
                name: "Carlos Mendez",
                title: "Education Director",
                image: "/placeholder.svg?height=400&width=400",
                bio: "Carlos develops our award-winning educational programs, making art accessible to visitors of all ages.",
              },
            ].map((member, index) => (
              <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md">
                <div className="relative h-64">
                  <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-blue-900">{member.name}</h3>
                  <p className="text-blue-700 mb-3">{member.title}</p>
                  <p className="text-gray-700 text-sm">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Visit Us */}
      <section className="py-16 bg-blue-700 text-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-6">Visit Us</h2>
              <p className="text-xl text-blue-100 mb-8">
                We invite you to experience our collections and exhibitions in person. Our museum offers a welcoming
                environment for art lovers of all ages.
              </p>

              <div className="space-y-6">
                <div className="flex items-start">
                  <Clock className="h-6 w-6 mr-3 text-blue-300 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-lg">Opening Hours</h3>
                    <p className="text-blue-100">
                      Tuesday - Sunday: 10:00 AM - 6:00 PM
                      <br />
                      Monday: Closed
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <MapPin className="h-6 w-6 mr-3 text-blue-300 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-lg">Location</h3>
                    <p className="text-blue-100">
                      123 Art Street, Gallery District
                      <br />
                      City, Country
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Phone className="h-6 w-6 mr-3 text-blue-300 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-lg">Phone</h3>
                    <p className="text-blue-100">+1 (234) 567-8900</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Mail className="h-6 w-6 mr-3 text-blue-300 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-lg">Email</h3>
                    <p className="text-blue-100">info@artvista.com</p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <Link href="/contact" className="btn-primary bg-white text-blue-700 hover:bg-blue-50">
                  Contact Us
                </Link>
              </div>
            </div>

            <div className="relative h-96 rounded-lg overflow-hidden">
              <Image src="/images/visitusHere.jpg" alt="Museum interior" fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

