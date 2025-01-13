import { useState } from "react";
import { Search, MapPin, Home, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PropertyMap } from "./PropertyMap";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const EnhancedSearch = () => {
  const [searchParams, setSearchParams] = useState({
    location: "",
    propertyType: "",
    priceRange: "",
  });

  const { data: properties } = useQuery({
    queryKey: ["properties"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("properties")
        .select("*")
        .eq("status", "active");
      if (error) throw error;
      return data;
    },
  });

  return (
    <div className="w-full max-w-7xl mx-auto px-4">
      <div className="bg-white/90 backdrop-blur-md rounded-xl shadow-lg p-6 -mt-24 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="relative">
            <Input
              placeholder="Location"
              className="pl-10"
              value={searchParams.location}
              onChange={(e) =>
                setSearchParams({ ...searchParams, location: e.target.value })
              }
            />
            <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          </div>

          <Select
            value={searchParams.propertyType}
            onValueChange={(value) =>
              setSearchParams({ ...searchParams, propertyType: value })
            }
          >
            <SelectTrigger className="pl-10 relative">
              <Home className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <SelectValue placeholder="Property Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="house">House</SelectItem>
              <SelectItem value="apartment">Apartment</SelectItem>
              <SelectItem value="villa">Villa</SelectItem>
              <SelectItem value="land">Land</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={searchParams.priceRange}
            onValueChange={(value) =>
              setSearchParams({ ...searchParams, priceRange: value })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Price Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0-100000">$0 - $100,000</SelectItem>
              <SelectItem value="100000-300000">$100,000 - $300,000</SelectItem>
              <SelectItem value="300000-600000">$300,000 - $600,000</SelectItem>
              <SelectItem value="600000+">$600,000+</SelectItem>
            </SelectContent>
          </Select>

          <Button className="bg-primary hover:bg-primary/90">
            <Search className="mr-2 h-4 w-4" /> Search
          </Button>
        </div>

        <div className="h-[400px] rounded-lg overflow-hidden">
          <PropertyMap properties={properties || []} />
        </div>
      </div>
    </div>
  );
};