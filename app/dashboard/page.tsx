"use client";

import { Heart, Clock, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Dashboard() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Welcome to ArtVista</h1>
        <p className="text-gray-600">Explore and manage your art journey.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Quick Links */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Quick Links</h2>
          <div className="grid grid-cols-2 gap-4">
            <Link
              href="/dashboard/favorites"
              className="flex items-center p-3 rounded-lg border border-gray-200 hover:bg-gray-50"
            >
              <Heart className="h-5 w-5 text-blue-700 mr-3" />
              <span>Favorites</span>
            </Link>

            <Link
              href="/dashboard/history"
              className="flex items-center p-3 rounded-lg border border-gray-200 hover:bg-gray-50"
            >
              <Clock className="h-5 w-5 text-blue-700 mr-3" />
              <span>Visit History</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Favorites */}
      <div className="bg-white rounded-lg shadow mb-8">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-lg font-medium text-gray-900">Featured Artworks</h2>
          <Link href="/gallery" className="text-sm text-blue-600 hover:text-blue-800 flex items-center">
            View all <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>

        <div className="p-6">
          <div className="text-center py-8">
            <Heart className="h-12 w-12 text-gray-300 mx-auto mb-3" />
            <h3 className="text-lg font-medium text-gray-900 mb-1">Explore Artworks</h3>
            <p className="text-gray-500 mb-4">Discover amazing artworks from talented artists.</p>
            <Link
              href="/gallery"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-700 hover:bg-blue-800"
            >
              Explore Gallery
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}