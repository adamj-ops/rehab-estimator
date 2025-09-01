-- Rehab Estimator Database Schema
-- Run this in your Supabase SQL editor

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create rehab_projects table
CREATE TABLE rehab_projects (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    property_id UUID,
    project_name TEXT NOT NULL,
    address_street TEXT NOT NULL,
    address_city TEXT NOT NULL,
    address_state TEXT NOT NULL,
    address_zip TEXT NOT NULL,
    square_feet INTEGER,
    year_built INTEGER,
    property_type TEXT,
    bedrooms INTEGER,
    bathrooms DECIMAL(3,1),
    investment_strategy TEXT,
    target_buyer TEXT,
    hold_period_months INTEGER,
    target_roi DECIMAL(5,2),
    max_budget DECIMAL(12,2),
    arv DECIMAL(12,2),
    purchase_price DECIMAL(12,2),
    neighborhood_comp_avg DECIMAL(12,2),
    status TEXT DEFAULT 'draft',
    total_estimated_cost DECIMAL(12,2) DEFAULT 0,
    total_actual_cost DECIMAL(12,2),
    estimated_days INTEGER DEFAULT 0,
    priority_score INTEGER DEFAULT 0,
    roi_score DECIMAL(5,2) DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create property_assessments table
CREATE TABLE property_assessments (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    project_id UUID REFERENCES rehab_projects(id) ON DELETE CASCADE,
    room_type TEXT NOT NULL,
    room_name TEXT,
    condition TEXT CHECK (condition IN ('excellent', 'good', 'fair', 'poor', 'terrible')),
    components JSONB,
    notes TEXT,
    photos TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create rehab_scope_items table
CREATE TABLE rehab_scope_items (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    project_id UUID REFERENCES rehab_projects(id) ON DELETE CASCADE,
    category TEXT NOT NULL,
    subcategory TEXT,
    item_name TEXT NOT NULL,
    description TEXT,
    location TEXT,
    quantity DECIMAL(10,2) DEFAULT 1,
    unit_of_measure TEXT DEFAULT 'each',
    material_cost DECIMAL(10,2) DEFAULT 0,
    labor_cost DECIMAL(10,2) DEFAULT 0,
    total_cost DECIMAL(10,2) DEFAULT 0,
    priority TEXT CHECK (priority IN ('must', 'should', 'could', 'nice')),
    roi_impact DECIMAL(5,2) DEFAULT 0,
    days_required INTEGER DEFAULT 1,
    depends_on TEXT[],
    phase INTEGER DEFAULT 1,
    included BOOLEAN DEFAULT true,
    completed BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create market_comparables table
CREATE TABLE market_comparables (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    project_id UUID REFERENCES rehab_projects(id) ON DELETE CASCADE,
    address TEXT NOT NULL,
    sale_price DECIMAL(12,2) NOT NULL,
    sale_date DATE NOT NULL,
    square_feet INTEGER,
    features JSONB,
    distance_miles DECIMAL(5,2),
    similarity_score DECIMAL(5,2),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create rehab_recommendations table
CREATE TABLE rehab_recommendations (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    project_id UUID REFERENCES rehab_projects(id) ON DELETE CASCADE,
    type TEXT CHECK (type IN ('add', 'remove', 'upgrade', 'downgrade', 'timing')),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    estimated_cost DECIMAL(10,2),
    roi_impact DECIMAL(5,2),
    time_impact_days INTEGER,
    market_data JSONB,
    confidence_score DECIMAL(5,2),
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected', 'implemented')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_rehab_projects_user_id ON rehab_projects(user_id);
CREATE INDEX idx_rehab_projects_status ON rehab_projects(status);
CREATE INDEX idx_property_assessments_project_id ON property_assessments(project_id);
CREATE INDEX idx_rehab_scope_items_project_id ON rehab_scope_items(project_id);
CREATE INDEX idx_rehab_scope_items_category ON rehab_scope_items(category);
CREATE INDEX idx_market_comparables_project_id ON market_comparables(project_id);
CREATE INDEX idx_rehab_recommendations_project_id ON rehab_recommendations(project_id);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_rehab_projects_updated_at BEFORE UPDATE ON rehab_projects FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_property_assessments_updated_at BEFORE UPDATE ON property_assessments FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_rehab_scope_items_updated_at BEFORE UPDATE ON rehab_scope_items FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_rehab_recommendations_updated_at BEFORE UPDATE ON rehab_recommendations FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE rehab_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE property_assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE rehab_scope_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE market_comparables ENABLE ROW LEVEL SECURITY;
ALTER TABLE rehab_recommendations ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
-- Users can only access their own projects
CREATE POLICY "Users can view own projects" ON rehab_projects FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own projects" ON rehab_projects FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own projects" ON rehab_projects FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own projects" ON rehab_projects FOR DELETE USING (auth.uid() = user_id);

-- Users can only access assessments for their own projects
CREATE POLICY "Users can view own assessments" ON property_assessments FOR SELECT USING (
    EXISTS (SELECT 1 FROM rehab_projects WHERE id = project_id AND user_id = auth.uid())
);
CREATE POLICY "Users can insert own assessments" ON property_assessments FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM rehab_projects WHERE id = project_id AND user_id = auth.uid())
);
CREATE POLICY "Users can update own assessments" ON property_assessments FOR UPDATE USING (
    EXISTS (SELECT 1 FROM rehab_projects WHERE id = project_id AND user_id = auth.uid())
);
CREATE POLICY "Users can delete own assessments" ON property_assessments FOR DELETE USING (
    EXISTS (SELECT 1 FROM rehab_projects WHERE id = project_id AND user_id = auth.uid())
);

-- Users can only access scope items for their own projects
CREATE POLICY "Users can view own scope items" ON rehab_scope_items FOR SELECT USING (
    EXISTS (SELECT 1 FROM rehab_projects WHERE id = project_id AND user_id = auth.uid())
);
CREATE POLICY "Users can insert own scope items" ON rehab_scope_items FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM rehab_projects WHERE id = project_id AND user_id = auth.uid())
);
CREATE POLICY "Users can update own scope items" ON rehab_scope_items FOR UPDATE USING (
    EXISTS (SELECT 1 FROM rehab_projects WHERE id = project_id AND user_id = auth.uid())
);
CREATE POLICY "Users can delete own scope items" ON rehab_scope_items FOR DELETE USING (
    EXISTS (SELECT 1 FROM rehab_projects WHERE id = project_id AND user_id = auth.uid())
);

-- Users can only access market comparables for their own projects
CREATE POLICY "Users can view own market comparables" ON market_comparables FOR SELECT USING (
    EXISTS (SELECT 1 FROM rehab_projects WHERE id = project_id AND user_id = auth.uid())
);
CREATE POLICY "Users can insert own market comparables" ON market_comparables FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM rehab_projects WHERE id = project_id AND user_id = auth.uid())
);
CREATE POLICY "Users can update own market comparables" ON market_comparables FOR UPDATE USING (
    EXISTS (SELECT 1 FROM rehab_projects WHERE id = project_id AND user_id = auth.uid())
);
CREATE POLICY "Users can delete own market comparables" ON market_comparables FOR DELETE USING (
    EXISTS (SELECT 1 FROM rehab_projects WHERE id = project_id AND user_id = auth.uid())
);

-- Users can only access recommendations for their own projects
CREATE POLICY "Users can view own recommendations" ON rehab_recommendations FOR SELECT USING (
    EXISTS (SELECT 1 FROM rehab_projects WHERE id = project_id AND user_id = auth.uid())
);
CREATE POLICY "Users can insert own recommendations" ON rehab_recommendations FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM rehab_projects WHERE id = project_id AND user_id = auth.uid())
);
CREATE POLICY "Users can update own recommendations" ON rehab_recommendations FOR UPDATE USING (
    EXISTS (SELECT 1 FROM rehab_projects WHERE id = project_id AND user_id = auth.uid())
);
CREATE POLICY "Users can delete own recommendations" ON rehab_recommendations FOR DELETE USING (
    EXISTS (SELECT 1 FROM rehab_projects WHERE id = project_id AND user_id = auth.uid())
);
