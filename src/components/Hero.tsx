import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Hero = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-cover bg-center" 
         style={{ backgroundImage: "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.1')" }}>
      <div className="container mx-auto px-4 text-center text-white">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">Find Your Perfect Home</h1>
        <p className="text-xl mb-8 max-w-2xl mx-auto">Discover the best properties in your favorite locations</p>
        
        <div className="bg-white p-4 rounded-lg shadow-lg max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="Location"
              className="flex-1 p-3 border rounded text-gray-700"
            />
            <select className="flex-1 p-3 border rounded text-gray-700">
              <option>Property Type</option>
              <option>House</option>
              <option>Apartment</option>
              <option>Villa</option>
            </select>
            <Button className="bg-primary hover:bg-primary/90">
              <Search className="mr-2 h-4 w-4" /> Search
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};