import { createClientComponentClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClientComponentClient({
  supabaseUrl,
  supabaseAnonKey,
})

export type Database = {
  public: {
    Tables: {
      rehab_projects: {
        Row: {
          id: string
          user_id: string
          property_id: string | null
          project_name: string
          address_street: string
          address_city: string
          address_state: string
          address_zip: string
          square_feet: number | null
          year_built: number | null
          property_type: string | null
          investment_strategy: string | null
          target_buyer: string | null
          hold_period_months: number | null
          target_roi: number | null
          max_budget: number | null
          arv: number | null
          purchase_price: number | null
          neighborhood_comp_avg: number | null
          status: string | null
          total_estimated_cost: number | null
          total_actual_cost: number | null
          estimated_days: number | null
          priority_score: number | null
          roi_score: number | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          user_id: string
          property_id?: string | null
          project_name: string
          address_street: string
          address_city: string
          address_state: string
          address_zip: string
          square_feet?: number | null
          year_built?: number | null
          property_type?: string | null
          investment_strategy?: string | null
          target_buyer?: string | null
          hold_period_months?: number | null
          target_roi?: number | null
          max_budget?: number | null
          arv?: number | null
          purchase_price?: number | null
          neighborhood_comp_avg?: number | null
          status?: string | null
          total_estimated_cost?: number | null
          total_actual_cost?: number | null
          estimated_days?: number | null
          priority_score?: number | null
          roi_score?: number | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          property_id?: string | null
          project_name?: string
          address_street?: string
          address_city?: string
          address_state?: string
          address_zip?: string
          square_feet?: number | null
          year_built?: number | null
          property_type?: string | null
          investment_strategy?: string | null
          target_buyer?: string | null
          hold_period_months?: number | null
          target_roi?: number | null
          max_budget?: number | null
          arv?: number | null
          purchase_price?: number | null
          neighborhood_comp_avg?: number | null
          status?: string | null
          total_estimated_cost?: number | null
          total_actual_cost?: number | null
          estimated_days?: number | null
          priority_score?: number | null
          roi_score?: number | null
          created_at?: string | null
          updated_at?: string | null
        }
      }
    }
  }
}
