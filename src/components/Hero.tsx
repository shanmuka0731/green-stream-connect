
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";

const Hero = () => {
  const { user } = useAuth();
  
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center">
      {/* Background Image with Dark Overlay */}
      <div 
        className="absolute inset-0 z-0" 
        style={{
          backgroundImage: `url('/lovable-uploads/9b5e39cf-e084-4d01-a6f0-9987a621d562.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundBlendMode: 'overlay',
          backgroundColor: 'rgba(14, 18, 16, 0.7)'
        }}
      >
      </div>
      
      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 bg-transparent">
        <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-gray-200 via-gray-400 to-gray-600 bg-clip-text drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] text-gray-200 md:text-6xl">
          Join the Green Movement
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-gray-200 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
          Join the green revolution and earn rewards for recycling
        </p>
        <div>
          <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg" asChild>
            <Link to={user ? "/upload" : "/auth"}>
              Get Started
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
