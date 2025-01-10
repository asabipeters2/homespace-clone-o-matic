import { Properties as PropertiesList } from "@/components/Properties";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const Properties = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-20">
        <PropertiesList />
      </div>
      <Footer />
    </div>
  );
};

export default Properties;