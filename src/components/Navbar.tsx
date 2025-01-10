import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Navbar = () => {
  return (
    <nav className="fixed w-full bg-white shadow-sm z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="text-2xl font-bold text-secondary">
            Home<span className="text-primary">space</span>
          </div>
          
          <div className="hidden md:flex space-x-8">
            <a href="#" className="text-secondary hover:text-primary transition-colors">Home</a>
            <a href="#" className="text-secondary hover:text-primary transition-colors">Properties</a>
            <a href="#" className="text-secondary hover:text-primary transition-colors">Agents</a>
            <a href="#" className="text-secondary hover:text-primary transition-colors">About</a>
            <a href="#" className="text-secondary hover:text-primary transition-colors">Contact</a>
          </div>

          <div className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};