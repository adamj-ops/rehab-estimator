-- Vendors/Contractors Management Table
CREATE TABLE vendors (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- Basic Information
  company_name VARCHAR(255) NOT NULL,
  contact_name VARCHAR(255),
  email VARCHAR(255),
  phone VARCHAR(50),
  
  -- Address
  address_street VARCHAR(255),
  address_city VARCHAR(100),
  address_state VARCHAR(50),
  address_zip VARCHAR(20),
  
  -- Classification
  vendor_type VARCHAR(50) NOT NULL CHECK (vendor_type IN ('contractor', 'supplier', 'service_provider')),
  specialties TEXT[], -- ['plumbing', 'electrical', 'hvac', 'roofing', etc.]
  
  -- Business Details
  license_number VARCHAR(100),
  insurance_verified BOOLEAN DEFAULT false,
  insurance_expiry DATE,
  rating DECIMAL(2,1) CHECK (rating >= 0 AND rating <= 5.0),
  
  -- Financial
  hourly_rate DECIMAL(10,2),
  markup_percentage DECIMAL(5,2),
  payment_terms VARCHAR(100),
  
  -- Project History
  projects_completed INTEGER DEFAULT 0,
  total_spent DECIMAL(12,2) DEFAULT 0,
  
  -- Notes & Files
  notes TEXT,
  documents JSONB, -- Array of file URLs
  
  -- Status
  is_active BOOLEAN DEFAULT true,
  preferred BOOLEAN DEFAULT false,
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE vendors ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view own vendors" ON vendors
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own vendors" ON vendors
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own vendors" ON vendors
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own vendors" ON vendors
  FOR DELETE USING (auth.uid() = user_id);

-- Indexes for performance
CREATE INDEX idx_vendors_user_id ON vendors(user_id);
CREATE INDEX idx_vendors_type ON vendors(vendor_type);
CREATE INDEX idx_vendors_preferred ON vendors(preferred) WHERE preferred = true;
CREATE INDEX idx_vendors_active ON vendors(is_active) WHERE is_active = true;
CREATE INDEX idx_vendors_specialties ON vendors USING GIN (specialties);

-- Updated timestamp trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_vendors_updated_at BEFORE UPDATE ON vendors
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Comments for documentation
COMMENT ON TABLE vendors IS 'Contractor and supplier database with ratings and project history';
COMMENT ON COLUMN vendors.vendor_type IS 'Type: contractor, supplier, or service_provider';
COMMENT ON COLUMN vendors.specialties IS 'Array of specialty areas (plumbing, electrical, etc.)';
COMMENT ON COLUMN vendors.rating IS 'Rating from 0.0 to 5.0';
COMMENT ON COLUMN vendors.preferred IS 'Marks vendor as preferred/favorite';

