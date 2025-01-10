import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Properties } from "@/components/Properties";
import { Services } from "@/components/Services";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Properties />
      <Services />
      <Footer />
    </div>
  );
};

export default Index;