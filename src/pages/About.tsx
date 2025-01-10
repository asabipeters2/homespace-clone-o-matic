import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const About = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-secondary mb-8">About Seler</h1>
          <div className="prose prose-lg">
            <p className="text-gray-600 mb-6">
              Seler is Nigeria's premier real estate platform, connecting property seekers with their dream homes since 2020. Our mission is to make property hunting simple, transparent, and accessible to everyone.
            </p>
            <p className="text-gray-600 mb-6">
              With a vast network of verified properties and professional agents, we ensure that every client finds exactly what they're looking for in the Nigerian real estate market.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-12">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Our Mission</h3>
                <p className="text-gray-600">
                  To revolutionize the Nigerian real estate market by providing transparent, efficient, and reliable property solutions.
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Our Vision</h3>
                <p className="text-gray-600">
                  To be the most trusted name in Nigerian real estate, setting the standard for excellence and innovation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;