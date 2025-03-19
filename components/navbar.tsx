"use client";

import { useState, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";

const navigation = [
  { name: "About", href: "/about" },
  { name: "Gallery", href: "/gallery" },
  {
    name: "Collection",
    href: "#",
    children: [
      { name: "African Art", href: "/african" },
      { name: "Contemporary", href: "/contemporary" },
      { name: "Sculptures", href: "/sculptures" },
      { name: "Digital Art", href: "/digital" },
      { name: "Niger Delta", href: "/niger-delta" },
    ],
  },
  { name: "Artists", href: "/artists" },
  { name: "The Founder", href: "/founder" },
  {
    name: "More",
    href: "#",
    children: [
      { name: "Public Library", href: "https://www.azaikipubliclibrary.org.ng/" },
      { name: "Science Institute", href: "/" },
    ],
  },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleDropdown = (name: string) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? "bg-white shadow-md" : "bg-transparent"}`}>
      <div className="container-custom">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <a href="/" className={`flex items-center ${scrolled ? "text-black" : "text-white"}`}>
              <span className="text-2xl font-bold">Azaiki Art Gallery <br></br> And Museum</span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) =>
              !item.children ? (
                <a
                  key={item.name}
                  href={item.href}
                  className={`font-medium transition-colors ${scrolled ? "text-black hover:text-blue-700" : "text-white hover:text-gray-300"}`}
                >
                  {item.name}
                </a>
              ) : (
                <div key={item.name} className="relative group">
                  <button
                    onClick={() => toggleDropdown(item.name)}
                    className={`flex items-center font-medium transition-colors ${scrolled ? "text-black hover:text-blue-700" : "text-white hover:text-gray-300"}`}
                  >
                    {item.name}
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </button>

                  {openDropdown === item.name && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 transform transition-all duration-300 ease-in-out translate-x-0 opacity-100">
                      {item.children.map((child) => (
                        <a
                          key={child.name}
                          href={child.href}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700"
                        >
                          {child.name}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ),
            )}
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className={scrolled ? "text-black" : "text-white"}>
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 bg-white">
            <div className="flex flex-col space-y-3">
              {navigation.map((item) =>
                !item.children ? (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-gray-800 hover:text-blue-700 font-medium px-2 py-1"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </a>
                ) : (
                  <div key={item.name} className="flex flex-col">
                    <button
                      onClick={() => toggleDropdown(item.name)}
                      className="flex items-center justify-between text-gray-800 hover:text-blue-700 font-medium px-2 py-1"
                    >
                      {item.name}
                      <ChevronDown className="h-4 w-4" />
                    </button>

                    {openDropdown === item.name && (
                      <div className="ml-4 mt-1 flex flex-col space-y-2">
                        {item.children.map((child) => (
                          <a
                            key={child.name}
                            href={child.href}
                            className="text-gray-700 hover:text-blue-700 py-1"
                            onClick={() => setIsOpen(false)}
                          >
                            {child.name}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ),
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}