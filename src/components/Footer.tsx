import { Mail, Phone, MapPin } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-secondary text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">Home<span className="text-primary">space</span></h3>
            <p className="text-gray-300">
              Your trusted partner in finding the perfect property. We make real estate simple and accessible.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-primary transition-colors">About Us</a></li>
              <li><a href="#" className="text-gray-300 hover:text-primary transition-colors">Properties</a></li>
              <li><a href="#" className="text-gray-300 hover:text-primary transition-colors">Agents</a></li>
              <li><a href="#" className="text-gray-300 hover:text-primary transition-colors">Blog</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <ul className="space-y-4">
              <li className="flex items-center">
                <MapPin className="h-5 w-5 mr-2 text-primary" />
                <span>123 Real Estate Ave, CA 90210</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-2 text-primary" />
                <span>+1 234 567 8900</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-primary" />
                <span>info@homespace.com</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Newsletter</h4>
            <p className="text-gray-300 mb-4">Subscribe to get the latest property news and updates.</p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 p-2 rounded-l text-gray-900"
              />
              <button className="bg-primary px-4 py-2 rounded-r hover:bg-primary/90 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-300">
          <p>&copy; 2024 Homespace. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};