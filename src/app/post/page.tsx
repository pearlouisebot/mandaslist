'use client'

import { useState } from 'react'
import { ArrowLeft, Upload, Shield, AlertTriangle } from 'lucide-react'
import Link from 'next/link'

export default function PostPage() {
  const [formData, setFormData] = useState({
    category: '',
    subcategory: '',
    title: '',
    description: '',
    price: '',
    location: 'austin',
    contactEmail: '',
    contactPhone: '',
    images: [] as File[]
  })
  
  const [isVerified, setIsVerified] = useState(false) // This would come from user session
  const [isSubmitting, setIsSubmitting] = useState(false)

  const categories = {
    'for-sale': ['electronics', 'furniture', 'vehicles', 'clothing', 'books', 'sporting-goods'],
    'housing': ['apartments', 'houses', 'rooms', 'vacation-rentals', 'real-estate'],
    'jobs': ['tech', 'sales', 'admin', 'gig-work', 'part-time', 'internships'],
    'services': ['automotive', 'beauty', 'computer', 'creative', 'legal', 'labor'],
    'community': ['events', 'volunteers', 'classes', 'groups', 'local-news'],
    'personal': ['dating', 'platonic', 'missed-connections', 'rants', 'advice']
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...files].slice(0, 8) // Max 8 images
    }))
  }

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!isVerified) {
      alert('Please get verified before posting listings')
      return
    }

    setIsSubmitting(true)
    
    // Simulate API call
    setTimeout(() => {
      alert('Listing posted successfully!')
      setIsSubmitting(false)
      // In real app, redirect to listing view
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-purple-800 text-white">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2 hover:text-purple-200">
              <ArrowLeft className="h-4 w-4" />
              <span>back to mandaslist</span>
            </Link>
            <div className="flex-1"></div>
            <div className="flex items-center gap-2 bg-purple-700 px-3 py-1 rounded-full text-sm">
              <Shield className="h-4 w-4" />
              <span>{isVerified ? 'Verified Account' : 'Unverified'}</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        
        {/* Verification Warning */}
        {!isVerified && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="h-5 w-5 text-yellow-600" />
              <h3 className="font-bold text-yellow-800">Verification Required</h3>
            </div>
            <p className="text-yellow-700 text-sm mb-3">
              You need to verify your account with Plaid before posting listings. 
              Verified accounts get better visibility and buyer trust.
            </p>
            <Link 
              href="/verify" 
              className="inline-block bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700"
            >
              Get Verified Now
            </Link>
          </div>
        )}

        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Post a Listing</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Category Selection */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="form-label">Category *</label>
                <select
                  required
                  value={formData.category}
                  onChange={(e) => setFormData(prev => ({
                    ...prev, 
                    category: e.target.value,
                    subcategory: '' // Reset subcategory when category changes
                  }))}
                  className="form-input"
                >
                  <option value="">Select a category</option>
                  <option value="for-sale">For Sale</option>
                  <option value="housing">Housing</option>
                  <option value="jobs">Jobs</option>
                  <option value="services">Services</option>
                  <option value="community">Community</option>
                  <option value="personal">Personal</option>
                </select>
              </div>

              <div>
                <label className="form-label">Subcategory *</label>
                <select
                  required
                  value={formData.subcategory}
                  onChange={(e) => setFormData(prev => ({...prev, subcategory: e.target.value}))}
                  className="form-input"
                  disabled={!formData.category}
                >
                  <option value="">Select a subcategory</option>
                  {formData.category && categories[formData.category as keyof typeof categories]?.map(sub => (
                    <option key={sub} value={sub}>{sub.replace('-', ' ')}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Title */}
            <div>
              <label className="form-label">Listing Title *</label>
              <input
                type="text"
                required
                maxLength={70}
                value={formData.title}
                onChange={(e) => setFormData(prev => ({...prev, title: e.target.value}))}
                className="form-input"
                placeholder="What are you selling/offering?"
              />
              <p className="text-xs text-gray-500 mt-1">{formData.title.length}/70 characters</p>
            </div>

            {/* Description */}
            <div>
              <label className="form-label">Description *</label>
              <textarea
                required
                rows={6}
                maxLength={2000}
                value={formData.description}
                onChange={(e) => setFormData(prev => ({...prev, description: e.target.value}))}
                className="form-input resize-none"
                placeholder="Describe your item or service in detail..."
              />
              <p className="text-xs text-gray-500 mt-1">{formData.description.length}/2000 characters</p>
            </div>

            {/* Price and Location */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="form-label">Price</label>
                <div className="relative">
                  <span className="absolute left-3 top-2 text-gray-500">$</span>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData(prev => ({...prev, price: e.target.value}))}
                    className="form-input pl-7"
                    placeholder="0.00"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">Leave blank if not applicable</p>
              </div>

              <div>
                <label className="form-label">Location *</label>
                <select
                  required
                  value={formData.location}
                  onChange={(e) => setFormData(prev => ({...prev, location: e.target.value}))}
                  className="form-input"
                >
                  <option value="austin">Austin</option>
                  <option value="dallas">Dallas</option>
                  <option value="houston">Houston</option>
                  <option value="san-antonio">San Antonio</option>
                  <option value="denver">Denver</option>
                  <option value="seattle">Seattle</option>
                  <option value="portland">Portland</option>
                </select>
              </div>
            </div>

            {/* Contact Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="form-label">Contact Email *</label>
                <input
                  type="email"
                  required
                  value={formData.contactEmail}
                  onChange={(e) => setFormData(prev => ({...prev, contactEmail: e.target.value}))}
                  className="form-input"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="form-label">Contact Phone (optional)</label>
                <input
                  type="tel"
                  value={formData.contactPhone}
                  onChange={(e) => setFormData(prev => ({...prev, contactPhone: e.target.value}))}
                  className="form-input"
                  placeholder="(555) 123-4567"
                />
              </div>
            </div>

            {/* Image Upload */}
            <div>
              <label className="form-label">Photos (up to 8)</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                />
                <label
                  htmlFor="image-upload"
                  className="cursor-pointer flex flex-col items-center gap-2"
                >
                  <Upload className="h-8 w-8 text-gray-400" />
                  <span className="text-gray-600">Click to upload images</span>
                  <span className="text-xs text-gray-500">JPG, PNG, GIF up to 10MB each</span>
                </label>
              </div>
              
              {/* Image Preview */}
              {formData.images.length > 0 && (
                <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                  {formData.images.map((file, index) => (
                    <div key={index} className="relative">
                      <img
                        src={URL.createObjectURL(file)}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-24 object-cover rounded"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="border-t pt-6">
              <button
                type="submit"
                disabled={!isVerified || isSubmitting}
                className={`w-full py-3 rounded-lg font-bold ${
                  isVerified && !isSubmitting
                    ? 'bg-purple-600 hover:bg-purple-700 text-white'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {isSubmitting ? 'Posting...' : 'Post Listing'}
              </button>
              
              {!isVerified && (
                <p className="text-center text-red-600 text-sm mt-2">
                  Account verification required to post listings
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}