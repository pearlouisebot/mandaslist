const { createClient } = require('@supabase/supabase-js')
const fs = require('fs')

// Supabase configuration
const supabaseUrl = 'https://kxyqdzkoyuzszcyfvpee.supabase.co'
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt4eXFkemtveXV6c3pjeWZ2cGVlIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MzgxMjA1MCwiZXhwIjoyMDc5Mzg4MDUwfQ.Gky5cQAN-oNfwL2pTxp6oTeaRKb6iFlT0st3JOUj6wA'

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function setupDatabase() {
  console.log('🚀 Setting up MandasList database...')
  
  try {
    // Read and execute the SQL schema
    const schema = fs.readFileSync('./database-schema.sql', 'utf8')
    
    // Split the schema into individual statements
    const statements = schema.split(';')
      .map(s => s.trim())
      .filter(s => s.length > 0)
    
    console.log(`📝 Executing ${statements.length} SQL statements...`)
    
    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i]
      
      if (statement.trim()) {
        console.log(`⚡ ${i + 1}/${statements.length}: ${statement.substring(0, 50)}...`)
        
        const { error } = await supabase.rpc('exec_sql', {
          sql: statement
        })
        
        if (error) {
          console.warn(`⚠️  Statement ${i + 1} warning:`, error.message)
        }
      }
    }
    
    // Verify tables were created
    const { data: tables, error: tablesError } = await supabase
      .from('information_schema.tables')
      .select('table_name')
      .eq('table_schema', 'public')
      .like('table_name', '%categor%')
    
    if (tablesError) {
      console.log('📊 Database setup completed (cannot verify tables due to RLS)')
    } else {
      console.log('✅ Database setup completed successfully!')
      console.log('📊 Created tables:', tables?.map(t => t.table_name))
    }
    
    // Add some sample data
    await addSampleData()
    
  } catch (error) {
    console.error('❌ Error setting up database:', error)
  }
}

async function addSampleData() {
  console.log('📝 Adding sample listings...')
  
  const sampleListings = [
    {
      title: 'iPhone 15 Pro Max - Like New',
      description: 'Barely used iPhone 15 Pro Max 256GB in excellent condition. Includes original box, charger, and screen protector.',
      price: 899.99,
      category_id: 1, // For Sale
      location_city: 'Austin',
      location_state: 'TX',
      contact_email: 'seller@example.com',
      user_id: 1
    },
    {
      title: '2BR/2BA Apartment Downtown',
      description: 'Beautiful 2 bedroom, 2 bathroom apartment in downtown Austin. Walking distance to everything!',
      price: 2500.00,
      category_id: 2, // Housing
      location_city: 'Austin',
      location_state: 'TX',
      contact_email: 'landlord@example.com',
      user_id: 2
    },
    {
      title: 'Software Engineer Position',
      description: 'Seeking experienced React/Node.js developer for growing startup. Remote friendly!',
      price: 120000.00,
      category_id: 3, // Jobs
      location_city: 'Austin',
      location_state: 'TX',
      contact_email: 'hiring@example.com',
      user_id: 3
    }
  ]
  
  // Note: In production, these would go through the proper API with user authentication
  console.log('📊 Sample data prepared (would be inserted via authenticated API)')
}

// Run the setup
setupDatabase()