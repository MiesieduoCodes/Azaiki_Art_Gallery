import Link from "next/link"
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-blue-900 text-white">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Azaiki Art Gallery And Museum</h3>
            <p className="text-blue-100 mb-4">
              Explore the world of art through our diverse collections and exhibitions.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-blue-200 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-blue-200 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-blue-200 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-blue-200 hover:text-white transition-colors">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-blue-200 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/exhibitions" className="text-blue-200 hover:text-white transition-colors">
                  Exhibitions
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="text-blue-200 hover:text-white transition-colors">
                  Gallery
                </Link>
              </li>
              <li>
                <Link href="/events" className="text-blue-200 hover:text-white transition-colors">
                  Events
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-blue-200 hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Collections</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/african" className="text-blue-200 hover:text-white transition-colors">
                  African Art
                </Link>
              </li>
              <li>
                <Link href="/contemporary" className="text-blue-200 hover:text-white transition-colors">
                  Contemporary
                </Link>
              </li>
              <li>
                <Link href="/sculptures" className="text-blue-200 hover:text-white transition-colors">
                  Sculptures
                </Link>
              </li>
              <li>
                <Link href="/digital" className="text-blue-200 hover:text-white transition-colors">
                  Digital Art
                </Link>
              </li>
              <li>
                <Link href="/niger-delta" className="text-blue-200 hover:text-white transition-colors">
                  Niger Delta
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="mr-2 h-5 w-5 text-blue-300 flex-shrink-0 mt-0.5" />
                <span className="text-blue-100"><p>123 Art Street, Gallery District, Yenagoa ,Bayelsa State</p></span>
              </li>
              <li className="flex items-center">
                <Phone className="mr-2 h-5 w-5 text-blue-300 flex-shrink-0" />
                <span className="text-blue-100"><p> +1 (234) 567-8900</p>       </span>
              </li>
              <li className="flex items-center">
                <Mail className="mr-2 h-5 w-5 text-blue-300 flex-shrink-0" />
                <span className="text-blue-100"><p>info@artvista.com</p></span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-blue-800 mt-8 pt-8 text-center text-blue-200">
          <p>&copy; {new Date().getFullYear()} Azaiki Museum & Gallery. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

