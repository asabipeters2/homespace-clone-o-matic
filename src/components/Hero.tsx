import { EnhancedSearch } from "./EnhancedSearch";

export const Hero = () => {
  return (
    <div
      className="relative min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage:
          "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.1')",
      }}
    >
      <div className="container mx-auto px-4 text-center text-white">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Find Your Perfect Home
        </h1>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Discover the best properties in your favorite locations with real-time
          market insights
        </p>
        <EnhancedSearch />
      </div>
    </div>
  );
};