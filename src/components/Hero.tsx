

import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";

const Hero = () => {
  const { user } = useAuth();
  
  return (
    <div className="relative overflow-hidden flex justify-center items-center min-h-[100vh]">
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
      <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32 text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white max-w-3xl mx-auto drop-shadow-lg">
          Join the <span className="green-metallic-text">Green Movement</span>
        </h1>
        <p className="mt-6 max-w-2xl mx-auto text-xl text-white drop-shadow-md">
          Turn your trash into cash while helping save the planet. Connect with waste collection services and get rewarded for your eco-friendly actions.
        </p>
        <div className="mt-8">
          <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg" asChild>
            <Link to={user ? "/upload" : "/auth"}>
              Get Started
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Hero;

