# MandasList Deployment Guide

## 🚀 Quick Deploy Steps

### 1. GitHub Repository ✅
- **Repository**: `https://github.com/pearlouisebot/mandaslist`
- **Branch**: `main`
- **Status**: Ready for deployment

### 2. Vercel Deployment

1. Go to [vercel.com](https://vercel.com) 
2. Connect GitHub account
3. Import `pearlouisebot/mandaslist` repository
4. Configure environment variables:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://kxyqdzkoyuzszcyfvpee.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt4eXFkemtveXV6c3pjeWZ2cGVlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM4MTIwNTAsImV4cCI6MjA3OTM4ODA1MH0.Ewj9y9Bdv96Z0e_HkoY0fUjDdl1euHOKWJIoB0XMSLg
   PLAID_CLIENT_ID=(get from Plaid dashboard)
   PLAID_SECRET=(get from Plaid dashboard)
   PLAID_ENV=sandbox
   ```
5. Deploy!

### 3. Domain Setup (GoDaddy)

**Domain**: `mandaslist.com` (owned by Amanda Bradford)

**DNS Records needed**:
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com

Type: A
Name: @
Value: 76.76.19.61
```

**DNS Setup for mandaslist.com**:
```
Type: A
Name: @  
Value: 76.76.19.61

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

*Note: mandaslist.com may be under different registrar - configure DNS manually if needed.*

### 4. Database Setup

Run the database setup script:
```bash
node setup-database.js
```

## 🎯 Final Result

- **Live URL**: https://mandaslist.com
- **Features**: Craigslist clone with Plaid verification
- **Stack**: Next.js 14 + Supabase + Tailwind CSS
- **Verification**: Plaid Link integration ready

---

**Status**: Ready to deploy! 🚀