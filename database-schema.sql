-- MandasList Database Schema
-- Craigslist Clone with Plaid Verification

-- Categories table (For Sale, Jobs, Housing, etc.)
CREATE TABLE categories (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    icon VARCHAR(100),
    parent_id BIGINT REFERENCES categories(id),
    sort_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Users table
CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20),
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    is_verified BOOLEAN DEFAULT FALSE,
    plaid_access_token TEXT,
    plaid_item_id TEXT,
    verification_date TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Listings table (main content)
CREATE TABLE listings (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT REFERENCES users(id) NOT NULL,
    category_id BIGINT REFERENCES categories(id) NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    price DECIMAL(10,2),
    location_city VARCHAR(100),
    location_state VARCHAR(100),
    location_zip VARCHAR(10),
    contact_email VARCHAR(255),
    contact_phone VARCHAR(20),
    is_active BOOLEAN DEFAULT TRUE,
    is_featured BOOLEAN DEFAULT FALSE,
    expires_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Search optimization
    search_vector TSVECTOR
);

-- Listing images
CREATE TABLE listing_images (
    id BIGSERIAL PRIMARY KEY,
    listing_id BIGINT REFERENCES listings(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    alt_text VARCHAR(255),
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Verification status tracking
CREATE TABLE verification_attempts (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT REFERENCES users(id) NOT NULL,
    plaid_link_token TEXT,
    status VARCHAR(50) DEFAULT 'pending', -- pending, success, failed
    error_message TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Messages/replies system
CREATE TABLE messages (
    id BIGSERIAL PRIMARY KEY,
    listing_id BIGINT REFERENCES listings(id) ON DELETE CASCADE,
    sender_email VARCHAR(255) NOT NULL,
    sender_name VARCHAR(100),
    message TEXT NOT NULL,
    is_from_poster BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default categories (Craigslist style)
INSERT INTO categories (name, slug, description, icon) VALUES
('For Sale', 'for-sale', 'Items for sale', '🛍️'),
('Housing', 'housing', 'Apartments, houses, rooms for rent', '🏠'),
('Jobs', 'jobs', 'Employment opportunities', '💼'),
('Services', 'services', 'Professional services offered', '🔧'),
('Community', 'community', 'Community events and activities', '👥'),
('Personal', 'personal', 'Personal ads and connections', '💕');

-- Insert subcategories for For Sale
INSERT INTO categories (name, slug, description, parent_id) VALUES
('Electronics', 'electronics', 'Phones, computers, gadgets', 1),
('Furniture', 'furniture', 'Home and office furniture', 1),
('Vehicles', 'vehicles', 'Cars, bikes, motorcycles', 1),
('Clothing', 'clothing', 'Apparel and accessories', 1);

-- Insert subcategories for Housing  
INSERT INTO categories (name, slug, description, parent_id) VALUES
('Apartments', 'apartments', 'Apartment rentals', 2),
('Houses', 'houses', 'House rentals and sales', 2),
('Rooms', 'rooms', 'Room rentals and shares', 2);

-- Insert subcategories for Jobs
INSERT INTO categories (name, slug, description, parent_id) VALUES
('Tech', 'tech-jobs', 'Technology and software jobs', 3),
('Sales', 'sales-jobs', 'Sales and marketing positions', 3),
('Admin', 'admin-jobs', 'Administrative and office jobs', 3),
('Gig Work', 'gig-work', 'Freelance and contract work', 3);

-- Create indexes for performance
CREATE INDEX idx_listings_category ON listings(category_id);
CREATE INDEX idx_listings_user ON listings(user_id);
CREATE INDEX idx_listings_location ON listings(location_city, location_state);
CREATE INDEX idx_listings_active ON listings(is_active);
CREATE INDEX idx_listings_created ON listings(created_at DESC);
CREATE INDEX idx_listings_price ON listings(price);

-- Full text search index
CREATE INDEX idx_listings_search ON listings USING gin(search_vector);

-- Function to update search vector
CREATE OR REPLACE FUNCTION update_listings_search_vector()
RETURNS TRIGGER AS $$
BEGIN
    NEW.search_vector := to_tsvector('english', 
        COALESCE(NEW.title, '') || ' ' || 
        COALESCE(NEW.description, '') || ' ' ||
        COALESCE(NEW.location_city, '') || ' ' ||
        COALESCE(NEW.location_state, '')
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to automatically update search vector
CREATE TRIGGER trigger_update_listings_search_vector
    BEFORE INSERT OR UPDATE ON listings
    FOR EACH ROW
    EXECUTE FUNCTION update_listings_search_vector();

-- Enable Row Level Security (RLS)
ALTER TABLE listings ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- RLS Policies
-- Users can view all active listings
CREATE POLICY "Allow public read on active listings" ON listings
    FOR SELECT USING (is_active = TRUE);

-- Users can only edit their own listings
CREATE POLICY "Users can edit own listings" ON listings
    FOR ALL USING (auth.uid()::text = user_id::text);

-- Users can view their own data
CREATE POLICY "Users can view own data" ON users
    FOR ALL USING (auth.uid()::text = id::text);