'use client'

import { useState } from 'react'
import { Shield, CheckCircle, AlertCircle, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function VerifyPage() {
  const [verificationStep, setVerificationStep] = useState('initial') // initial, connecting, success, error
  const [userInfo, setUserInfo] = useState({
    email: '',
    firstName: '',
    lastName: '',
    phone: ''
  })

  const handlePlaidLink = async () => {
    setVerificationStep('connecting')
    
    // Simulated Plaid integration - replace with actual Plaid Link
    setTimeout(() => {
      // For demo, randomly succeed or fail
      const success = Math.random() > 0.2
      if (success) {
        setVerificationStep('success')
      } else {
        setVerificationStep('error')
      }
    }, 3000)
  }

  const handleSubmitInfo = (e: React.FormEvent) => {
    e.preventDefault()
    handlePlaidLink()
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
          </div>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-12">
        
        {/* Initial Form */}
        {verificationStep === 'initial' && (
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="text-center mb-8">
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <Shield className="h-8 w-8 text-green-600" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Get Verified with Plaid</h1>
              <p className="text-gray-600">
                Verify your identity through your bank account to access MandasList as a trusted seller and buyer.
              </p>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <h3 className="font-semibold text-blue-800 mb-2">Why verify?</h3>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Post unlimited listings</li>
                <li>• Access to verified-only sections</li>
                <li>• Higher buyer trust and response rates</li>
                <li>• Protection against fraud</li>
                <li>• Priority placement in search results</li>
              </ul>
            </div>

            <form onSubmit={handleSubmitInfo} className="space-y-4">
              <div>
                <label className="form-label">Email Address</label>
                <input
                  type="email"
                  required
                  value={userInfo.email}
                  onChange={(e) => setUserInfo({...userInfo, email: e.target.value})}
                  className="form-input"
                  placeholder="your@email.com"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="form-label">First Name</label>
                  <input
                    type="text"
                    required
                    value={userInfo.firstName}
                    onChange={(e) => setUserInfo({...userInfo, firstName: e.target.value})}
                    className="form-input"
                    placeholder="First"
                  />
                </div>
                <div>
                  <label className="form-label">Last Name</label>
                  <input
                    type="text"
                    required
                    value={userInfo.lastName}
                    onChange={(e) => setUserInfo({...userInfo, lastName: e.target.value})}
                    className="form-input"
                    placeholder="Last"
                  />
                </div>
              </div>

              <div>
                <label className="form-label">Phone Number (optional)</label>
                <input
                  type="tel"
                  value={userInfo.phone}
                  onChange={(e) => setUserInfo({...userInfo, phone: e.target.value})}
                  className="form-input"
                  placeholder="(555) 123-4567"
                />
              </div>

              <button
                type="submit"
                className="w-full plaid-verify-button"
              >
                <Shield className="h-5 w-5" />
                Connect Bank Account with Plaid
              </button>
            </form>

            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-sm text-gray-800 mb-2">How it works:</h4>
              <ol className="text-xs text-gray-600 space-y-1">
                <li>1. Click "Connect Bank Account" to open Plaid verification</li>
                <li>2. Select your bank and log in securely</li>
                <li>3. Plaid verifies your identity with your bank</li>
                <li>4. Get instant verification badge on MandasList</li>
              </ol>
              <p className="text-xs text-gray-500 mt-2">
                🔒 Your banking credentials are never shared with MandasList. 
                Plaid uses bank-level security to verify your identity.
              </p>
            </div>
          </div>
        )}

        {/* Connecting State */}
        {verificationStep === 'connecting' && (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="animate-spin mx-auto w-12 h-12 border-4 border-blue-200 border-top-blue-600 rounded-full mb-4"></div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Verifying with Plaid...</h2>
            <p className="text-gray-600">
              Please complete the verification process in the Plaid popup window.
            </p>
            <div className="mt-6 bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-700">
                Having trouble? Make sure popup blockers are disabled and try again.
              </p>
            </div>
          </div>
        )}

        {/* Success State */}
        {verificationStep === 'success' && (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Verification Complete!</h2>
            <p className="text-gray-600 mb-6">
              Congratulations! Your account has been successfully verified with Plaid.
            </p>
            
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <div className="flex items-center justify-center gap-2 text-green-800">
                <Shield className="h-5 w-5" />
                <span className="font-semibold">Verified Account</span>
              </div>
              <p className="text-green-700 text-sm mt-1">
                Your listings will now show the verified badge
              </p>
            </div>

            <div className="space-y-3">
              <Link 
                href="/post" 
                className="block w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700"
              >
                Post Your First Listing
              </Link>
              <Link 
                href="/" 
                className="block w-full bg-gray-200 text-gray-800 py-3 rounded-lg font-semibold hover:bg-gray-300"
              >
                Back to Home
              </Link>
            </div>
          </div>
        )}

        {/* Error State */}
        {verificationStep === 'error' && (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
              <AlertCircle className="h-10 w-10 text-red-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Verification Failed</h2>
            <p className="text-gray-600 mb-6">
              We couldn't verify your account at this time. This might be due to:
            </p>
            
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 text-left">
              <ul className="text-red-700 text-sm space-y-1">
                <li>• Incorrect banking credentials</li>
                <li>• Unsupported bank or account type</li>
                <li>• Technical issues with your bank</li>
                <li>• Temporary Plaid service issues</li>
              </ul>
            </div>

            <div className="space-y-3">
              <button 
                onClick={() => setVerificationStep('initial')}
                className="block w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700"
              >
                Try Again
              </button>
              <Link 
                href="/" 
                className="block w-full bg-gray-200 text-gray-800 py-3 rounded-lg font-semibold hover:bg-gray-300"
              >
                Back to Home
              </Link>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}