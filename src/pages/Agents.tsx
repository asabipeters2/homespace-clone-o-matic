import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const Agents = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 pt-24 pb-12">
        <h1 className="text-4xl font-bold text-secondary mb-8">Our Expert Agents</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              name: "John Doe",
              role: "Senior Agent",
              image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.1",
              phone: "+234 801 234 5678",
              email: "john.doe@seler.com",
            },
            {
              name: "Jane Smith",
              role: "Property Consultant",
              image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.1",
              phone: "+234 802 345 6789",
              email: "jane.smith@seler.com",
            },
            {
              name: "Mike Johnson",
              role: "Luxury Property Specialist",
              image: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-4.0.1",
              phone: "+234 803 456 7890",
              email: "mike.johnson@seler.com",
            },
          ].map((agent, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img src={agent.image} alt={agent.name} className="w-full h-64 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{agent.name}</h3>
                <p className="text-primary mb-4">{agent.role}</p>
                <div className="space-y-2 text-gray-600">
                  <p>{agent.phone}</p>
                  <p>{agent.email}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Agents;