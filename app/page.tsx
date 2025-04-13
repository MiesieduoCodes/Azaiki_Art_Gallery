"use client";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar, Clock, MapPin } from "lucide-react";
import { motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer";
import {DonationSection} from "@/components/DonateSection"; 
import { useEffect, ReactNode } from "react";

// Reusable Animated Section Component
const AnimatedSection = ({ children, delay = 0 }: { children: ReactNode; delay?: number }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        visible: { opacity: 1, y: 0 },
        hidden: { opacity: 0, y: 50 },
      }}
      transition={{ duration: 0.5, delay }}
    >
      {children}
    </motion.div>
  );
};

export default function Home() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative text-white">
        {/* Video Background */}
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src="/videos/VID-20250314-WA0106.mp4"
          autoPlay
          loop
          muted
          playsInline
        />

        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>

        {/* Content */}
        <div className="container-custom relative z-10 py-20 md:py-32">
          <AnimatedSection>
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Discover the World of Art
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-blue-100">
                Explore our diverse collections spanning centuries of artistic expression and cultural heritage.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/gallery" className="btn-primary bg-white text-blue-700 hover:bg-blue-50">
                  Explore Gallery
                </Link>
                <Link href="/artists" className="btn-outline border-white text-white hover:bg-blue-800">
                  See Artists
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Featured Collections */}
      <AnimatedSection delay={0.2}>
        <section className="py-16 bg-gray-50">
          <div className="container-custom">
            <h2 className="section-title text-center">Featured Collections</h2>
            <p className="text-center text-gray-600 max-w-3xl mx-auto mb-12">
              Discover our most celebrated art collections, showcasing diverse styles, periods, and cultural expressions.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "African Art",
                  image: "/images/AfricanArt.jpg",
                  description: "Traditional and contemporary works from across the African continent.",
                  link: "/african",
                },
                {
                  title: "Contemporary Art",
                  image: "/images/ContemporaryArt.jpg",
                  description: "Bold expressions from today's most innovative artists.",
                  link: "/contemporary",
                },
                {
                  title: "Sculptures",
                  image: "/images/Sculpture.jpg",
                  description: "Three-dimensional masterpieces from classical to modern.",
                  link: "/sculptures",
                },
              ].map((collection, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg overflow-hidden shadow-md transition-transform hover:shadow-lg hover:-translate-y-1"
                >
                  <div className="relative h-64">
                    <Image
                      src={collection.image || "/placeholder.svg"}
                      alt={collection.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-blue-900 mb-2">{collection.title}</h3>
                    <p className="text-gray-600 mb-4">{collection.description}</p>
                    <Link
                      href={collection.link}
                      className="text-blue-700 font-medium flex items-center hover:text-blue-800"
                    >
                      Explore Collection <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link href="/" className="btn-primary">
                View All Collections
              </Link>
            </div>
          </div>
        </section>
      </AnimatedSection>


      <AnimatedSection>
      <DonationSection/>
        </AnimatedSection>


      {/* Visit Us */}
      <AnimatedSection delay={0.4}>
        <section className="py-16 bg-blue-700 text-white">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Plan Your Visit</h2>
                <p className="text-xl text-blue-100 mb-8">
                  Experience art in person at our museum. We offer guided tours, educational programs, and special events.
                </p>

                <div className="space-y-4 mb-8">
                  <div className="flex items-start">
                    <Clock className="h-6 w-6 mr-3 text-blue-300 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-lg">Opening Hours</h3>
                      <p className="text-blue-100">
                      Monday - Friday: 09:00 AM - 04:00 PM
                      <br />
                      Saturday: 08:00 AM - 02:00 PM
                      <br />
                      Sunday: Closed
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <MapPin className="h-6 w-6 mr-3 text-blue-300 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-lg">Location</h3>
                      <p className="text-blue-100">
                        Beside Azaiki Public Library, Imgbi Road 
                        <br />
                        Yenagoa, Bayelsa State
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4">
                  <Link href="/contact" className="btn-primary bg-white text-blue-700 hover:bg-blue-50">
                    Plan Your Visit
                  </Link>
                  <Link href="/contact" className="btn-outline border-white text-white hover:bg-blue-800">
                    Contact Us
                  </Link>
                </div>
              </div>

              <div className="relative h-80 md:h-96 rounded-lg overflow-hidden">
                <Image src="/images/InteriorMuseum.jpg" alt="Museum interior" fill className="object-cover" />
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Newsletter */}
      <AnimatedSection delay={0.6}>
        <section className="py-16 bg-gray-50">
          <div className="container-custom max-w-4xl text-center">
            <h2 className="section-title">Stay Updated</h2>
            <p className="text-gray-600 mb-8">
              Subscribe to our newsletter to receive updates on new exhibitions, events, and special offers.
            </p>

            <form className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-grow px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <button type="submit" className="btn-primary whitespace-nowrap">
                Subscribe
              </button>
            </form>
          </div>
        </section>
      </AnimatedSection>
    </div>
  );
}
