'use client'

import Link from 'next/link'
import { Shield, MapPin, Search } from 'lucide-react'
import { useState } from 'react'

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedLocation, setSelectedLocation] = useState('austin')

  const categories = [
    {
      name: 'for sale',
      subcategories: [
        'electronics', 'furniture', 'vehicles', 'clothing', 'books', 'sporting goods'
      ]
    },
    {
      name: 'housing',
      subcategories: [
        'apartments', 'houses', 'rooms', 'vacation rentals', 'real estate'
      ]
    },
    {
      name: 'jobs',
      subcategories: [
        'tech', 'sales', 'admin', 'gig work', 'part-time', 'internships'
      ]
    },
    {
      name: 'services',
      subcategories: [
        'automotive', 'beauty', 'computer', 'creative', 'legal', 'labor'
      ]
    },
    {
      name: 'community',
      subcategories: [
        'events', 'volunteers', 'classes', 'groups', 'local news'
      ]
    },
    {
      name: 'personal',
      subcategories: [
        'dating', 'platonic', 'missed connections', 'rants', 'advice'
      ]
    }
  ]

  const locations = [
    'austin', 'dallas', 'houston', 'san antonio', 'denver', 'seattle', 'portland'
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Header - Craigslist style */}
      <header className="bg-purple-800 text-white">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <h1 className="text-4xl font-bold">
              <Link href="/" className="hover:text-purple-200">
                mandaslist
              </Link>
            </h1>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-purple-700 px-3 py-1 rounded-full">
                <Shield className="h-4 w-4" />
                <span className="text-sm">Plaid Verified</span>
              </div>
              <Link href="/post" className="bg-white text-purple-800 px-4 py-2 rounded font-semibold hover:bg-gray-100">
                post
              </Link>
              <Link href="/verify" className="bg-green-600 px-4 py-2 rounded font-semibold hover:bg-green-700">
                get verified
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Location and Search Bar */}
      <div className="bg-gray-100 border-b">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <select 
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="bg-white border rounded px-3 py-1"
              >
                {locations.map(location => (
                  <option key={location} value={location}>
                    {location}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex-1 flex gap-2">
              <input
                type="text"
                placeholder="search mandaslist"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 px-3 py-1 border rounded"
              />
              <button className="bg-purple-600 text-white px-4 py-1 rounded hover:bg-purple-700">
                <Search className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column - Categories */}
          <div className="lg:col-span-2">
            <h2 className="text-xl font-bold mb-4 text-purple-800">browse by category</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {categories.map((category) => (
                <div key={category.name} className="bg-white border rounded-lg p-4">
                  <h3 className="text-lg font-bold text-purple-700 mb-3 border-b pb-2">
                    <Link href={`/category/${category.name.replace(' ', '-')}`} className="hover:underline">
                      {category.name}
                    </Link>
                  </h3>
                  <ul className="space-y-1">
                    {category.subcategories.map((sub) => (
                      <li key={sub}>
                        <Link 
                          href={`/category/${category.name.replace(' ', '-')}/${sub.replace(' ', '-')}`}
                          className="text-purple-600 hover:underline text-sm"
                        >
                          {sub}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Info/Actions */}
          <div className="space-y-6">
            
            {/* Verification Notice */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="h-5 w-5 text-green-600" />
                <h3 className="font-bold text-green-800">Verified Marketplace</h3>
              </div>
              <p className="text-sm text-green-700 mb-3">
                All sellers are verified through Plaid bank verification for your safety and security.
              </p>
              <Link 
                href="/verify" 
                className="block w-full text-center bg-green-600 text-white py-2 rounded hover:bg-green-700"
              >
                Get Verified Now
              </Link>
            </div>

            {/* Recent Activity */}
            <div className="bg-white border rounded-lg p-4">
              <h3 className="font-bold mb-3">recent activity</h3>
              <ul className="space-y-2 text-sm">
                <li>• <span className="text-green-600">✓</span> iPhone 15 Pro - $800 (verified seller)</li>
                <li>• <span className="text-green-600">✓</span> 2BR Apartment - $2500/mo (verified)</li>
                <li>• <span className="text-green-600">✓</span> MacBook Air M2 - $900 (verified seller)</li>
                <li>• <span className="text-green-600">✓</span> Tesla Model 3 - $35K (verified seller)</li>
              </ul>
            </div>

            {/* Quick Stats */}
            <div className="bg-white border rounded-lg p-4">
              <h3 className="font-bold mb-3">marketplace stats</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Active listings:</span>
                  <span className="font-semibold">1,247</span>
                </div>
                <div className="flex justify-between">
                  <span>Verified users:</span>
                  <span className="font-semibold">892</span>
                </div>
                <div className="flex justify-between">
                  <span>Completed deals:</span>
                  <span className="font-semibold">3,421</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-100 border-t mt-12">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-gray-600">
              © 2026 MandasList - Verified Classifieds Platform
            </div>
            <div className="flex gap-6 text-sm">
              <Link href="/about" className="text-purple-600 hover:underline">about</Link>
              <Link href="/safety" className="text-purple-600 hover:underline">safety</Link>
              <Link href="/terms" className="text-purple-600 hover:underline">terms</Link>
              <Link href="/privacy" className="text-purple-600 hover:underline">privacy</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}