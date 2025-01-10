import { Home, Users, Key, Phone } from "lucide-react";

const services = [
  {
    icon: Home,
    title: "Find Perfect Homes",
    description: "Browse through our curated selection of premium properties in prime locations.",
  },
  {
    icon: Users,
    title: "Expert Agents",
    description: "Work with experienced real estate professionals who know the market inside out.",
  },
  {
    icon: Key,
    title: "Easy Process",
    description: "Our streamlined process makes buying or selling property simple and stress-free.",
  },
  {
    icon: Phone,
    title: "24/7 Support",
    description: "Get assistance whenever you need it with our round-the-clock customer support.",
  },
];

export const Services = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-secondary mb-4">Our Services</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We provide comprehensive real estate services to make your property journey seamless
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div key={index} className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
                <service.icon className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};