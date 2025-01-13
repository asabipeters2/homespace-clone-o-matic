export interface Property {
  id: string;
  title: string;
  description?: string;
  price: number;
  location: string;
  coordinates?: unknown;  // Updated to match database type
  property_type: string;
  listing_type: string;
  bedrooms?: number;
  bathrooms?: number;
  square_footage?: number;
  features?: Json;  // Updated to match database type
  virtual_tour_url?: string;
  status: string;
  agent_id: string;
  created_at?: string;
  updated_at?: string;
}

// Add Json type to match Supabase's Json type
type Json = string | number | boolean | null | { [key: string]: Json } | Json[];