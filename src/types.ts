export interface Property {
  id: string;
  title: string;
  description?: string;
  price: number;
  location: string;
  coordinates?: string;
  property_type: string;
  listing_type: string;
  bedrooms?: number;
  bathrooms?: number;
  square_footage?: number;
  features?: Record<string, any>;
  virtual_tour_url?: string;
  status: string;
  agent_id: string;
  created_at?: string;
  updated_at?: string;
}