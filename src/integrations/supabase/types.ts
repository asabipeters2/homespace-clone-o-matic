export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      appointments: {
        Row: {
          agent_id: string | null
          appointment_date: string | null
          client_id: string | null
          created_at: string | null
          id: string
          notes: string | null
          property_id: string | null
          status: string | null
          type: string | null
        }
        Insert: {
          agent_id?: string | null
          appointment_date?: string | null
          client_id?: string | null
          created_at?: string | null
          id?: string
          notes?: string | null
          property_id?: string | null
          status?: string | null
          type?: string | null
        }
        Update: {
          agent_id?: string | null
          appointment_date?: string | null
          client_id?: string | null
          created_at?: string | null
          id?: string
          notes?: string | null
          property_id?: string | null
          status?: string | null
          type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "appointments_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
        ]
      }
      properties: {
        Row: {
          agent_id: string | null
          bathrooms: number | null
          bedrooms: number | null
          coordinates: unknown | null
          created_at: string | null
          description: string | null
          features: Json | null
          id: string
          listing_type: string
          location: string
          price: number
          property_type: string
          square_footage: number | null
          status: string | null
          title: string
          updated_at: string | null
          virtual_tour_url: string | null
        }
        Insert: {
          agent_id?: string | null
          bathrooms?: number | null
          bedrooms?: number | null
          coordinates?: unknown | null
          created_at?: string | null
          description?: string | null
          features?: Json | null
          id?: string
          listing_type: string
          location: string
          price: number
          property_type: string
          square_footage?: number | null
          status?: string | null
          title: string
          updated_at?: string | null
          virtual_tour_url?: string | null
        }
        Update: {
          agent_id?: string | null
          bathrooms?: number | null
          bedrooms?: number | null
          coordinates?: unknown | null
          created_at?: string | null
          description?: string | null
          features?: Json | null
          id?: string
          listing_type?: string
          location?: string
          price?: number
          property_type?: string
          square_footage?: number | null
          status?: string | null
          title?: string
          updated_at?: string | null
          virtual_tour_url?: string | null
        }
        Relationships: []
      }
      property_analytics: {
        Row: {
          favorite_count: number | null
          id: string
          inquiry_count: number | null
          last_viewed_at: string | null
          market_comparison: Json | null
          price_history: Json | null
          property_id: string | null
          views_count: number | null
        }
        Insert: {
          favorite_count?: number | null
          id?: string
          inquiry_count?: number | null
          last_viewed_at?: string | null
          market_comparison?: Json | null
          price_history?: Json | null
          property_id?: string | null
          views_count?: number | null
        }
        Update: {
          favorite_count?: number | null
          id?: string
          inquiry_count?: number | null
          last_viewed_at?: string | null
          market_comparison?: Json | null
          price_history?: Json | null
          property_id?: string | null
          views_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "property_analytics_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
