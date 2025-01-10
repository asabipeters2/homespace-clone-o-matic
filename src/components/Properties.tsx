import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Bed, Bath, Square } from "lucide-react";

const properties = [
  {
    id: 1,
    title: "Modern Villa in Lekki",
    price: "₦250,000,000",
    location: "Lekki Phase 1, Lagos",
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.1",
    beds: 5,
    baths: 4,
    sqft: 3500,
  },
  {
    id: 2,
    title: "Luxury Apartment with Ocean View",
    price: "₦180,000,000",
    location: "Victoria Island, Lagos",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.1",
    beds: 3,
    baths: 2,
    sqft: 2200,
  },
  {
    id: 3,
    title: "Contemporary Downtown Loft",
    price: "₦95,000,000",
    location: "Ikoyi, Lagos",
    image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.1",
    beds: 2,
    baths: 2,
    sqft: 1800,
  },
];

export const Properties = () => {
  return (
    <section className="py-20 bg-gray-light">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-secondary mb-4">Featured Properties</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our handpicked selection of premium properties in the most desirable locations
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((property) => (
            <Card key={property.id} className="overflow-hidden group cursor-pointer">
              <div className="relative h-64 overflow-hidden">
                <img
                  src={property.image}
                  alt={property.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <Badge className="absolute top-4 right-4 bg-primary">{property.price}</Badge>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{property.title}</h3>
                <p className="text-gray-600 mb-4">{property.location}</p>
                <div className="flex justify-between text-gray-500">
                  <span className="flex items-center">
                    <Bed className="h-4 w-4 mr-2" /> {property.beds} Beds
                  </span>
                  <span className="flex items-center">
                    <Bath className="h-4 w-4 mr-2" /> {property.baths} Baths
                  </span>
                  <span className="flex items-center">
                    <Square className="h-4 w-4 mr-2" /> {property.sqft} sqft
                  </span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};