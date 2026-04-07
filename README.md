# MandasList - Verified Classifieds Platform

A Craigslist clone with Plaid verification for trusted transactions.

## 🚀 Features

- **Plaid Verification**: All sellers verified through bank account verification
- **Category-based Listings**: For Sale, Housing, Jobs, Services, Community, Personal
- **Verified Badges**: Visual trust indicators for verified users
- **Responsive Design**: Works on all devices
- **Search & Filter**: Find listings by category, location, price
- **Image Upload**: Multiple photos per listing
- **Contact System**: Direct messaging between buyers/sellers

## 🛠 Tech Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Backend**: Supabase (PostgreSQL + Auth + Storage)
- **Verification**: Plaid Link API
- **Deployment**: Vercel
- **Styling**: Tailwind CSS with Craigslist-inspired design

## 🎯 Quick Start

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Set up environment variables**:
   Copy `.env.local.example` to `.env.local` and fill in:
   ```bash
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   PLAID_CLIENT_ID=your_plaid_client_id
   PLAID_SECRET=your_plaid_secret
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Visit**: http://localhost:3000

## 📊 Database Schema

The app uses the following main tables:
- `categories` - Listing categories and subcategories
- `users` - User accounts with verification status
- `listings` - Posted items/services
- `listing_images` - Photo attachments
- `messages` - Buyer-seller communications
- `verification_attempts` - Plaid verification tracking

## 🔐 Verification Flow

1. User signs up and provides basic info
2. Plaid Link opens for bank account verification
3. Upon successful verification, user gets verified badge
4. Verified users can post unlimited listings
5. Listings from verified users get priority placement

## 🌐 Deployment

Deployed to Vercel with automatic deployments from main branch.

**Live URL**: https://mandaslist.com

## 🛡 Security

- Bank verification through Plaid (PCI compliant)
- Row Level Security (RLS) on Supabase
- Input validation and sanitization
- Secure image upload handling

## 📱 Mobile Responsive

Optimized for:
- Desktop (1440px+)
- Tablet (768px - 1439px) 
- Mobile (320px - 767px)

---

Built with ❤️ for the verified community.