
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Hero = () => {
  return (
    <div className="relative overflow-hidden flex justify-center items-center min-h-[80vh]">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/lovable-uploads/cf20c708-c79c-4b2c-8316-1ff3f749c336.png"
          alt="Eco City Background"
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Content overlay with slight transparency */}
      <div className="absolute inset-0 bg-black/10 z-10"></div>

      <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white max-w-3xl mx-auto drop-shadow-lg">
            Join the <span className="green-metallic-text">Green Movement</span>
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-xl text-white drop-shadow-md">
            Turn your trash into cash while helping save the planet. Connect with waste collection services and get rewarded for your eco-friendly actions.
          </p>
          <div className="mt-10">
            <Link to="/upload">
              <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg rounded-md shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
